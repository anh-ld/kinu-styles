// Token contrast checks for theme CSS. Used by scripts/build.ts to fail on regressions.

type Tokens = Record<string, string>;

const LIGHT_RE = /:root:root:not\(\[data-color-scheme=dark\]\)[^{]*\{[^}]*\}/;
const DARK_RE = /\n\[data-color-scheme=dark\]\s*\{[^}]*\}/;

// [text, surface, min ratio]. Text pairs mirror what kinu paints; ring is a non-text focus indicator.
export const PAIRS: [string, string, number][] = [
  ['foreground', 'background', 4.5],
  ['card-foreground', 'card', 4.5],
  ['popover-foreground', 'popover', 4.5],
  ['muted-foreground', 'background', 4.5],
  ['muted-foreground', 'muted', 4.5],
  ['muted-foreground', 'card', 4.5],
  ['primary-foreground', 'primary', 4.5],
  ['primary-foreground', 'primary-hover', 4.5],
  ['secondary-foreground', 'secondary', 4.5],
  ['secondary-foreground', 'secondary-hover', 4.5],
  ['destructive-foreground', 'destructive', 4.5],
  ['destructive-foreground', 'destructive-hover', 4.5],
  ['accent-foreground', 'accent', 4.5],
  ['info-foreground', 'info', 4.5],
  ['link', 'background', 4.5],
  ['link', 'card', 4.5],
  ['ring', 'background', 3],
];

// Minimum OKLab distance so destructive never reads as primary.
export const MIN_PRIMARY_DESTRUCTIVE_DE = 0.08;

export function blocks(css: string): { light: Tokens; dark: Tokens } {
  const read = (re: RegExp) => {
    const out: Tokens = {};
    for (const m of css.match(re)?.[0].matchAll(/--k-([\w-]+):\s*([^;]+);/g) ?? []) out[m[1]] = m[2].trim();
    return out;
  };
  return { light: read(LIGHT_RE), dark: read(DARK_RE) };
}

export function hsl(v: string): [number, number, number] {
  const m = v.match(/^(-?[\d.]+)(?:deg)?\s+([\d.]+)%\s+([\d.]+)%$/);
  if (!m) throw new Error(`unparseable hsl token: ${v}`);
  return [+m[1], +m[2], +m[3]];
}

function rgb([h, s, l]: [number, number, number]) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  return [0, 8, 4].map((n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))).map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  );
}

const luminance = (v: string) => {
  const [r, g, b] = rgb(hsl(v));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

function oklab(v: string) {
  const [r, g, b] = rgb(hsl(v));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

export function deltaE(a: string, b: string) {
  const [x, y] = [oklab(a), oklab(b)];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}

export function violations(t: Tokens): string[] {
  t = { ...t, link: t.link ?? t.primary }; // _compat.css falls back to primary
  const out: string[] = [];
  for (const [fg, bg, min] of PAIRS) {
    if (!t[fg] || !t[bg]) continue;
    const r = contrast(t[fg], t[bg]);
    if (r < min - 0.005) out.push(`${fg} on ${bg} ${r.toFixed(2)} < ${min}`);
  }
  if (t.primary && t.destructive) {
    const d = deltaE(t.primary, t.destructive);
    if (d < MIN_PRIMARY_DESTRUCTIVE_DE) out.push(`primary vs destructive ΔE ${d.toFixed(3)} < ${MIN_PRIMARY_DESTRUCTIVE_DE}`);
  }
  return out;
}

export function audit(css: string): string[] {
  const { light, dark } = blocks(css);
  return [...violations(light).map((v) => `light: ${v}`), ...violations(dark).map((v) => `dark: ${v}`)];
}
