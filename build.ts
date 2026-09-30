import { rm, mkdir } from 'node:fs/promises';

const genOnly = process.argv.includes('--gen');
const libOnly = process.argv.includes('--lib');
const buildLib = !genOnly;
const buildGen = !libOnly;

if (buildLib) {
  await rm('lib', { recursive: true, force: true });
  await mkdir('lib', { recursive: true });
}

const compat = await Bun.file('package/_compat.css').text();
const glob = new Bun.Glob('package/*/*/style.css');
const files = Array.from(glob.scanSync('.')).sort();

const themes: Record<string, { category: string; css: string; spec: string }> = {};

await Promise.all(
  files.map(async (file) => {
    const [, category, slug] = file.split('/');
    const dir = `package/${category}/${slug}`;

    const [style, spec] = await Promise.all([
      Bun.file(file).text(),
      Bun.file(`${dir}/spec.md`).text(),
    ]);

    const css = style + compat;

    if (buildGen) {
      themes[slug] = { category, css, spec };
    }

    if (buildLib) {
      await Bun.write(`lib/${slug}.css`, css);
    }
  })
);

if (buildGen) {
  await Bun.write('portal/themes.json', JSON.stringify(themes, null, 2) + '\n');
}

console.log(`✓ Built ${files.length} themes${buildLib ? ' (lib)' : ''}${buildGen ? ' (themes.json)' : ''}`);
