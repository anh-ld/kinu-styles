import { render } from 'preact';
import { useEffect, useLayoutEffect, useMemo, useState } from 'preact/hooks';
import 'kinu/style.css';
import './portal.css';
import THEMES from './themes.json';

const CATEGORY_LABELS = {
  'minimal-functional': 'Minimal & functional',
  'material-dimensional': 'Material & dimensional',
  'editorial-art-inspired': 'Editorial & art-inspired',
  'bold-experimental': 'Bold & experimental',
  'playful-illustrated': 'Playful & illustrated',
  'organic-atmospheric': 'Organic & atmospheric',
  'retro-nostalgic': 'Retro & nostalgic',
  'futuristic-speculative': 'Futuristic & speculative',
};

// themes.json is generated from the package/ tree: slug + category from the
// paths, the display name from each spec's H1.
const themes = {};
for (const [slug, t] of Object.entries(THEMES)) {
  const nameMatch = t.spec.match(/^# (.+)$/m);
  themes[slug] = { category: t.category, name: nameMatch ? nameMatch[1] : slug };
}
const slugs = Object.keys(themes);
const groupedByCategory = Object.fromEntries(
  Object.keys(CATEGORY_LABELS).map((c) => [c, slugs.filter((s) => themes[s].category === c)])
);
const parsedSpecs = {};

function parseFrontmatter(raw) {
  const match = raw.match(/^```yaml\n([\s\S]*?)\n```/);
  if (!match) return {};
  const out = {};
  const palette = { light: {}, dark: {} };
  let inPalette = false;
  let scheme = null;
  for (const line of match[1].split('\n')) {
    const keyMatch = line.match(/^([a-z_]+):\s*(.*)$/);
    if (keyMatch && keyMatch[1] === 'palette') {
      inPalette = true;
      continue;
    }
    if (inPalette) {
      const schemeMatch = line.match(/^\s{2}(light|dark):\s*$/);
      if (schemeMatch) {
        scheme = schemeMatch[1];
        continue;
      }
      const pair = line.match(/^\s{4}([a-z-]+):\s*(.+)$/);
      if (pair && scheme) palette[scheme][pair[1]] = pair[2];
      continue;
    }
    if (keyMatch) {
      let v = keyMatch[2];
      if (/^(['"]).*\1$/.test(v)) v = v.slice(1, -1);
      out[keyMatch[1]] = v;
    }
  }
  out.palette = palette;
  return out;
}

function Swatch({ triplet }) {
  return <span class="swatch" style={{ background: `hsl(${triplet})` }} title={triplet} />;
}

function SpecPanel({ slug }) {
  const spec = useMemo(() => {
    if (!parsedSpecs[slug]) parsedSpecs[slug] = parseFrontmatter(THEMES[slug]?.spec || '');
    return parsedSpecs[slug];
  }, [slug]);
  if (!Object.keys(spec).length) return <p class="muted">No spec sheet yet for {slug}.</p>;
  return (
    <div class="spec-panel">
      <h3>Design spec</h3>
      <p>
        <strong>Fonts:</strong> {spec.font_stack}
      </p>
      <p>
        <strong>Radius:</strong> {spec.radius}
      </p>
      <p>
        <strong>Source:</strong>{' '}
        <a href={spec.moodboard} target="_blank" rel="noreferrer">
          trends.daisyui.com
        </a>
      </p>
      <div>
        <strong>Palette (light)</strong>
        <div class="swatches">
          {Object.entries(spec.palette.light || {}).map(([k, v]) => (
            <span key={k} class="swatch-row">
              <Swatch triplet={v} /> {k}
            </span>
          ))}
        </div>
        <strong>Palette (dark)</strong>
        <div class="swatches">
          {Object.entries(spec.palette.dark || {}).map(([k, v]) => (
            <span key={k} class="swatch-row">
              <Swatch triplet={v} /> {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Showcase() {
  return (
    <div class="showcase">
      <section>
        <h2>Actions</h2>
        <div class="row">
          <button k="button" variant="primary">
            Primary button
          </button>
          <button k="button" variant="secondary">
            Secondary button
          </button>
          <span k="chip">Chip</span>
        </div>
      </section>
      <section>
        <h2>Data display</h2>
        <div k="card">
          <h3>Card title</h3>
          <p>Card body text with the theme's tokens applied.</p>
        </div>
        <span k="badge">Badge</span>
        <table k="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rows</td>
              <td>101</td>
            </tr>
          </tbody>
        </table>
        <div k="progress">
          <div class="progress-fill" style={{ width: '60%' }} />
        </div>
      </section>
      <section>
        <h2>Data input</h2>
        <div class="row">
          <input k="input" placeholder="Type something" name="demo-input" />
          <select k="select" name="demo-select">
            <option>Option one</option>
            <option>Option two</option>
          </select>
          <label>
            <input k="checkbox" type="checkbox" name="demo-checkbox" /> Checkbox
          </label>
          <button k="switch" role="switch" aria-checked="false" name="demo-switch">
            <span class="switch-thumb" />
          </button>
        </div>
      </section>
      <section>
        <h2>Feedback</h2>
        <div k="alert">
          <strong>Heads up</strong> — this is an alert under the active theme.
        </div>
        <div class="row">
          <button k="button" variant="secondary" data-tooltip="A tooltip">
            Hover me
          </button>
          <span k="spinner" />
        </div>
      </section>
      <section>
        <h2>Navigation</h2>
        <div k="tablist" role="tablist">
          <button k="tab" role="tab" aria-selected="true">
            One
          </button>
          <button k="tab" role="tab" aria-selected="false">
            Two
          </button>
        </div>
        <nav k="breadcrumb" aria-label="Breadcrumb">
          <ol class="breadcrumb-list">
            <li k="breadcrumb-item">
              <a k="breadcrumb-link" href="#">
                Home
              </a>
            </li>
            <li k="breadcrumb-item" aria-current="page">
              Trends
            </li>
          </ol>
        </nav>
        <div k="list">
          <div k="item">List item one</div>
          <div k="item">List item two</div>
        </div>
      </section>
      <section>
        <h2>Layout</h2>
        <div class="row">
          <div k="popover">
            <div>Popover content</div>
          </div>
          <hr k="separator" />
          <div k="scroll-area">Scrollable surface</div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [slug, setSlug] = useState(() => {
    const fromHash = location.hash.slice(1);
    return slugs.includes(fromHash) ? fromHash : 'millennial-beige';
  });
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const next = location.hash.slice(1);
      setSlug(slugs.includes(next) ? next : 'millennial-beige');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Applied before paint so the first frame is themed, not kinu's default.
  useLayoutEffect(() => {
    const text = THEMES[slug]?.css;
    if (!text) return;
    let style = document.querySelector('style[data-kinu-theme]');
    if (!style) {
      style = document.createElement('style');
      style.dataset.kinuTheme = '';
      document.head.appendChild(style);
    }
    style.textContent = text;
  }, [slug]);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) html.dataset.colorScheme = 'dark';
    else delete html.dataset.colorScheme;
  }, [dark]);

  const select = (next) => {
    setSlug(next);
    location.hash = `#${next}`;
  };

  return (
    <div class="app-shell">
      <header class="topbar">
        <h1>
          Custom CSS themes for kinu <span class="muted">— {themes[slug].name}</span>
        </h1>
        <label class="dark-toggle">
          <input type="checkbox" checked={dark} onChange={(e) => setDark(e.currentTarget.checked)} />
          Dark
        </label>
      </header>
      <aside class="switcher">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <div key={key} class="category">
            <h4>{label}</h4>
            {groupedByCategory[key].map((s) => (
                <button
                  key={s}
                  class={s === slug ? 'trend active' : 'trend'}
                  onClick={() => select(s)}
                  aria-pressed={s === slug}
                >
                  {themes[s].name}
                </button>
              ))}
          </div>
        ))}
      </aside>
      <main class="content">
        <Showcase />
        <SpecPanel slug={slug} />
      </main>
    </div>
  );
}

render(<App />, document.getElementById('app'));