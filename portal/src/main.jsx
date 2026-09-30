import { render } from 'preact';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
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

// themes.json: generated from package/ tree; slug + category from paths, name from spec H1.
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

const PALETTE_ORDER = ['background', 'foreground', 'primary', 'secondary', 'accent', 'muted', 'border'];

function PaletteBlock({ label, palette, order }) {
  const entries = order.filter((k) => palette[k]).map((k) => [k, palette[k]]);
  if (!entries.length) return null;
  return (
    <div class="palette-block">
      <div class="palette-head">
        <span class="palette-label">{label}</span>
        <span class="palette-count">{entries.length} tokens</span>
      </div>
      <div
        class="palette-strip"
        style={{ background: `linear-gradient(90deg, ${entries.map(([, v]) => `hsl(${v})`).join(', ')})` }}
      />
      <div class="palette-rows">
        {entries.map(([k, v]) => (
          <div class="palette-row" key={k}>
            <span class="palette-dot" style={{ background: `hsl(${v})` }} />
            <span class="palette-name">{k}</span>
            <code class="palette-value">{v}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

function primaryFontName(stack) {
  const first = (stack || '').split(';')[0].split(',')[0].trim().replace(/^['"]|['"]$/g, '');
  return /^(system-ui|ui-sans-serif|sans-serif|serif|monospace|inherit)$/i.test(first) ? null : first;
}

function SpecPanel({ slug }) {
  const spec = useMemo(() => {
    if (!parsedSpecs[slug]) parsedSpecs[slug] = parseFrontmatter(THEMES[slug]?.spec || '');
    return parsedSpecs[slug];
  }, [slug]);
  if (!Object.keys(spec).length) return <p class="muted">No spec sheet yet for {slug}.</p>;
  const fontName = primaryFontName(spec.font_stack);
  return (
    <div class="spec-panel">
      <h3>Design spec</h3>

      <div class="spec-font">
        {fontName && (
          <span class="spec-font-glyph" style={{ fontFamily: `'${fontName}', sans-serif` }}>
            Aa
          </span>
        )}
        <div class="spec-font-info">
          {fontName && (
            <span class="spec-font-name" style={{ fontFamily: `'${fontName}', sans-serif` }}>
              {fontName}
            </span>
          )}
          <span class="spec-font-stack">{spec.font_stack}</span>
        </div>
      </div>

      <div class="spec-divider" />

      <div class="spec-row">
        <span>Radius</span>
        <code class="spec-value">{spec.radius}</code>
      </div>

      <div class="spec-divider" />

      <PaletteBlock label="Light" palette={spec.palette.light} order={PALETTE_ORDER} />
      <PaletteBlock label="Dark" palette={spec.palette.dark} order={PALETTE_ORDER} />
    </div>
  );
}

function AdoptionBlock({ slug }) {
  return (
    <div class="adopt">
      <h3>How to adopt</h3>
      <pre class="code">{`import 'kinu/style.css';
import 'kinu-styles/${slug}.css';`}</pre>
      <p class="adopt-note">
        Order matters: kinu first, theme after. Dark mode:{' '}
        <code>data-color-scheme="dark"</code> on <code>&lt;html&gt;</code> — or{' '}
        <code>prefers-color-scheme</code>.
      </p>
    </div>
  );
}

function Section({ title, hint, children }) {
  return (
    <section class="component-section">
      <h2>{title}</h2>
      {hint && <p class="hint">{hint}</p>}
      {children}
    </section>
  );
}

function V({ label, children }) {
  return (
    <div class="variant">
      {label && <span class="variant-label">{label}</span>}
      <div class="row">{children}</div>
    </div>
  );
}

function CalendarDemo() {
  const year = 2026;
  const month = 8; // September
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const dows = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(<span key={`blank-${i}`} />);
  for (let d = 1; d <= days; d++) cells.push(<span key={d} class={d === 30 ? 'today' : ''}>{d}</span>);
  return (
    <div class="calendar-demo">
      <div k="calendar">
        <div class="calendar-head">September 2026</div>
        <div class="calendar-grid">
          {dows.map((d) => (
            <span key={d} class="dow">
              {d}
            </span>
          ))}
          {cells}
        </div>
      </div>
    </div>
  );
}

const SEARCH_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const SYNC_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </svg>
);

// Toggle native dialog show()/close(); trigger anchor-name feeds kinu anchor-position CSS; commandfor unreliable, Chrome show-modal only.
function OverlayDemo({ wrapper, content, id, trigger, children }) {
  const dialogRef = useRef(null);
  const toggle = () => {
    const d = dialogRef.current;
    if (d.open) d.close();
    else d.show();
  };
  const onDialogClick = (e) => {
    if (e.target.closest('[k=dropdown-menu-item]')) dialogRef.current.close();
  };
  return (
    <div k={wrapper}>
      <button k="button" variant="outline" onClick={toggle} style={{ anchorName: '--k-trigger' }}>
        {trigger}
      </button>
      <dialog k={content} id={id} ref={dialogRef} onClick={onDialogClick}>
        {children}
      </dialog>
    </div>
  );
}

function ComboboxDemo() {
  const listRef = useRef(null);
  const toggle = () => {
    const list = listRef.current;
    if (list.open) list.close();
    else list.show();
  };
  return (
    <div k="combobox" class="overlay-slot">
      <input k="combobox-input" placeholder="Pick a fruit…" name="demo-combobox" aria-label="Combobox" onClick={toggle} />
      <dialog k="combobox-list" id="demo-combobox-list" ref={listRef}>
        <button k="combobox-option" onClick={toggle}>Apple</button>
        <button k="combobox-option" onClick={toggle}>Banana</button>
        <div k="separator" />
        <button k="combobox-option" onClick={toggle}>Cherry</button>
      </dialog>
    </div>
  );
}

function CarouselDemo() {
  const carouselRef = useRef(null);
  const slide = (dir) => {
    const el = carouselRef.current;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };
  // Nav buttons in wrapper, not scroller: Chrome scrolls absolute children with content.
  return (
    <div class="carousel-demo">
      <div k="carousel" ref={carouselRef}>
        <div k="carousel-item">Slide 1</div>
        <div k="carousel-item">Slide 2</div>
        <div k="carousel-item">Slide 3</div>
      </div>
      <button k="carousel-previous" aria-label="Previous slide" onClick={() => slide(-1)}>‹</button>
      <button k="carousel-next" aria-label="Next slide" onClick={() => slide(1)}>›</button>
    </div>
  );
}

function DashboardDemo() {
  return (
    <div class="demo-dashboard">
      <p class="hint">Sample dashboard — real kinu components under the current theme.</p>

      <header class="demo-header">
        <nav k="breadcrumb" aria-label="Breadcrumb">
          <ol k="breadcrumb-list" class="breadcrumb-list">
            <li k="breadcrumb-item">
              <a k="breadcrumb-link" href="#">Home</a>
            </li>
            <li k="breadcrumb-item" aria-current="page">Analytics</li>
          </ol>
        </nav>
        <div class="demo-header-actions">
          <button k="button" variant="ghost" size="icon" aria-label="Sync">{SYNC_ICON}</button>
          <div k="input-group" class="demo-search">
            <input k="input" placeholder="Search reports…" name="demo-dash-search" aria-label="Search reports" />
            <button k="button" size="icon" aria-label="Search">{SEARCH_ICON}</button>
          </div>
          <OverlayDemo
            wrapper="dropdown"
            content="dropdown-content"
            id="demo-dash-notifs"
            trigger={
              <span class="demo-trigger">
                <span k="badge" variant="destructive">3</span> Notifications
              </span>
            }
          >
            <button k="dropdown-menu-item">Deployment finished</button>
            <button k="dropdown-menu-item">2 new signups</button>
            <button k="dropdown-menu-item">Weekly report ready</button>
          </OverlayDemo>
          <OverlayDemo
            wrapper="dropdown"
            content="dropdown-content"
            id="demo-dash-user"
            trigger={
              <span class="demo-trigger">
                <span k="avatar" alt="AL" style={{ width: '22px', height: '22px' }} /> Anh L.
              </span>
            }
          >
            <button k="dropdown-menu-item">Profile</button>
            <button k="dropdown-menu-item">Settings</button>
            <div k="separator" />
            <button k="dropdown-menu-item">Sign out</button>
          </OverlayDemo>
        </div>
      </header>

      <ul k="navigation-menu-list" class="demo-nav">
        <li>
          <a k="navigation-menu-link" href="#">Overview</a>
        </li>
        <li>
          <a k="navigation-menu-link" href="#">Reports</a>
        </li>
        <li>
          <a k="navigation-menu-link" href="#">Customers</a>
        </li>
        <li>
          <a k="navigation-menu-link" href="#">Settings</a>
        </li>
      </ul>

      <div k="alert" class="demo-status">
        <span>
          <strong>All systems operational</strong> — synced 2 min ago
        </span>
        <span k="spinner" size="sm" />
      </div>
      <div class="demo-tabs-row">
        <div k="tablist" role="tablist">
          <button k="tab" role="tab" aria-selected="true">Daily</button>
          <button k="tab" role="tab" aria-selected="false">Weekly</button>
          <button k="tab" role="tab" aria-selected="false">Monthly</button>
        </div>
      </div>

      <div class="stats-grid">
        <div k="card">
          <div class="stat-label">Revenue</div>
          <div class="stat-value">$48.2k</div>
          <div class="stat-meta">
            <span k="badge" variant="secondary">+12.4%</span>
          </div>
          <progress k="progress" max="100" value="72" />
        </div>
        <div k="card">
          <div class="stat-label">Active users</div>
          <div class="stat-value">2,847</div>
          <div class="stat-meta">
            <span k="badge" variant="secondary">+4.1%</span>
          </div>
          <progress k="progress" max="100" value="58" />
        </div>
        <div k="card">
          <div class="stat-label">Conversion</div>
          <div class="stat-value">3.6%</div>
          <div class="stat-meta">
            <span k="badge" variant="outline">0.2 pt</span>
          </div>
          <progress k="progress" max="100" value="41" />
        </div>
        <div k="card">
          <div class="stat-label">Churn</div>
          <div class="stat-value">1.2%</div>
          <div class="stat-meta">
            <span k="badge" variant="destructive">+0.3 pt</span>
          </div>
          <progress k="progress" max="100" value="24" />
        </div>
      </div>

      <div class="demo-main">
        <div k="card" class="table-card">
          <div class="table-toolbar">
            <div class="row">
              <select k="select" name="demo-dash-period" aria-label="Period">
                <option>All time</option>
                <option>Last 30 days</option>
              </select>
              <input k="input" class="table-filter" placeholder="Filter customers…" name="demo-dash-filter" aria-label="Filter customers" />
            </div>
            <button k="button" variant="outline" size="sm">Export</button>
          </div>
          <table k="table">
            <thead>
              <tr>
                <th style={{ width: '36px' }}>
                  <input k="checkbox" type="checkbox" name="demo-dash-select-all" aria-label="Select all rows" />
                </th>
                <th>Customer</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input k="checkbox" type="checkbox" checked name="demo-dash-row1" aria-label="Select row 1" />
                </td>
                <td>Acme Corp</td>
                <td>
                  <span k="badge" variant="secondary">Pro</span>
                </td>
                <td>
                  <span k="badge">Active</span>
                </td>
                <td>
                  <progress k="progress" max="100" value="82" />
                </td>
              </tr>
              <tr>
                <td>
                  <input k="checkbox" type="checkbox" name="demo-dash-row2" aria-label="Select row 2" />
                </td>
                <td>Northwind</td>
                <td>
                  <span k="badge" variant="outline">Starter</span>
                </td>
                <td>
                  <span k="badge" variant="secondary">Trial</span>
                </td>
                <td>
                  <progress k="progress" max="100" value="40" />
                </td>
              </tr>
              <tr>
                <td>
                  <input k="checkbox" type="checkbox" name="demo-dash-row3" aria-label="Select row 3" />
                </td>
                <td>Globex</td>
                <td>
                  <span k="badge" variant="secondary">Pro</span>
                </td>
                <td>
                  <span k="badge">Active</span>
                </td>
                <td>
                  <progress k="progress" max="100" value="64" />
                </td>
              </tr>
              <tr>
                <td>
                  <input k="checkbox" type="checkbox" name="demo-dash-row4" aria-label="Select row 4" />
                </td>
                <td>Initech</td>
                <td>
                  <span k="badge" variant="outline">Free</span>
                </td>
                <td>
                  <span k="badge" variant="destructive">Overdue</span>
                </td>
                <td>
                  <progress k="progress" max="100" value="12" />
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-demo" aria-label="Pagination">
            <ul k="pagination-list">
              <li>
                <button k="pagination-link">1</button>
              </li>
              <li>
                <button k="pagination-link">2</button>
              </li>
              <li>
                <button k="pagination-link" aria-current="page">3</button>
              </li>
              <li>
                <button k="pagination-link">4</button>
              </li>
              <li>
                <button k="pagination-link">…</button>
              </li>
            </ul>
          </nav>
        </div>

        <div class="side-stack">
          <div k="card">
            <h3 class="demo-card-title">Activity</h3>
            <div k="scroll-area" class="activity-scroll">
              <div class="activity-item">
                <span k="badge" variant="outline">deploy</span> v2.4.1 shipped
              </div>
              <div class="activity-item">
                <span k="badge" variant="outline">user</span> 2 new signups
              </div>
              <div class="activity-item">
                <span k="badge" variant="outline">report</span> Weekly report ready
              </div>
              <div class="activity-item">
                <span k="badge" variant="outline">alert</span> Churn threshold passed
              </div>
            </div>
          </div>

          <div k="card">
            <h3 class="demo-card-title">Monthly goal</h3>
            <div class="goal-row">
              <span class="goal-label">Revenue</span>
              <progress k="progress" max="100" value="72" />
            </div>
            <div class="goal-row">
              <span class="goal-label">Signups</span>
              <progress k="progress" max="100" value="48" />
            </div>
            <div class="goal-row">
              <span class="goal-label">Retention</span>
              <progress k="progress" max="100" value="86" />
            </div>
          </div>

          <div k="card">
            <h3 class="demo-card-title">Calendar</h3>
            <CalendarDemo />
          </div>

          <div k="card">
            <h3 class="demo-card-title">Preferences</h3>
            <div class="settings-row">
              <label>Email notifications</label>
              <input k="switch" type="checkbox" checked name="demo-dash-switch" aria-label="Email notifications" />
            </div>
            <div class="settings-row">
              <label>Daily digest</label>
              <input k="switch" type="checkbox" name="demo-dash-switch2" aria-label="Daily digest" />
            </div>
            <div class="goal-row">
              <span class="goal-label">Volume</span>
              <input k="slider" type="range" min="0" max="100" value="60" name="demo-dash-slider" aria-label="Volume" style={{ '--progress': '60%' }} />
            </div>
            <div k="radio-group" class="demo-radio">
              <label>
                <input k="radio" type="radio" name="demo-dash-plan" aria-label="Starter plan" checked /> Starter
              </label>
              <label>
                <input k="radio" type="radio" name="demo-dash-plan" aria-label="Pro plan" /> Pro
              </label>
            </div>
          </div>
        </div>
      </div>

      <div k="card">
        <h3 class="demo-card-title">Reports archive</h3>
        <details k="accordion" open>
          <summary>Q3 2026 — quarterly report</summary>
          <p class="muted">
            Revenue up 12% QoQ; churn flat; NPS 54.{' '}
            <button k="button" variant="link" size="sm">Open report</button>
          </p>
        </details>
        <details k="accordion">
          <summary>August — monthly recap</summary>
          <p class="muted">2,847 active users, 412 new signups.</p>
        </details>
      </div>
    </div>
  );
}

function Preview() {
  return (
    <div class="showcase">
      <div class="category-heading">Actions</div>

      <Section title="Button">
        <V label="Variants">
          <button k="button">Primary</button>
          <button k="button" variant="secondary">Secondary</button>
          <button k="button" variant="destructive">Destructive</button>
          <button k="button" variant="outline">Outline</button>
          <button k="button" variant="ghost">Ghost</button>
          <button k="button" variant="link">Link</button>
        </V>
        <V label="Sizes">
          <button k="button" size="sm">Small</button>
          <button k="button">Default</button>
          <button k="button" size="lg">Large</button>
          <button k="button" size="icon">+</button>
        </V>
        <V label="States">
          <button k="button" loading>Loading</button>
          <button k="button" disabled>Disabled</button>
          <button k="button" variant="outline" disabled>Disabled outline</button>
        </V>
      </Section>

      <Section title="Toggle">
        <V label="States">
          <button k="toggle">Bold</button>
          <button k="toggle" aria-pressed="true">Active</button>
          <button k="toggle" disabled>Disabled</button>
        </V>
      </Section>

      <div class="category-heading">Data display</div>

      <Section title="Badge">
        <V label="Variants">
          <span k="badge">Badge</span>
          <span k="badge" variant="secondary">Secondary</span>
          <span k="badge" variant="destructive">Destructive</span>
          <span k="badge" variant="outline">Outline</span>
        </V>
      </Section>

      <Section title="Avatar">
        <V label="Sizes">
          <div k="avatar" alt="JD" style={{ width: '24px', height: '24px' }} />
          <div k="avatar" alt="MK" style={{ width: '32px', height: '32px' }} />
          <div k="avatar" alt="AL" style={{ width: '40px', height: '40px' }} />
        </V>
      </Section>

      <Section title="Card">
        <V label="Padding">
          <div class="card-grid">
            <div k="card" padding="none">none</div>
            <div k="card" padding="sm">sm</div>
            <div k="card">default</div>
            <div k="card" padding="lg">lg</div>
          </div>
        </V>
      </Section>

      <Section title="Table">
        <table k="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Plan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Acme Corp</td>
              <td>Pro</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Northwind</td>
              <td>Starter</td>
              <td>Trial</td>
            </tr>
            <tr>
              <td>Globex</td>
              <td>Pro</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Progress">
        <V label="Values">
          <div class="flow">
            <progress k="progress" max="100" value="25" />
            <progress k="progress" max="100" value="60" />
            <progress k="progress" max="100" value="90" />
          </div>
        </V>
      </Section>

      <Section title="Skeleton">
        <V label="Shapes">
          <div class="flow" style={{ maxWidth: '260px' }}>
            <div k="skeleton" style={{ width: '100%', height: '1rem' }} />
            <div k="skeleton" style={{ width: '80%', height: '1rem' }} />
            <div class="row">
              <div k="skeleton" style={{ width: '48px', height: '48px', borderRadius: '999px' }} />
              <div k="skeleton" style={{ width: '120px', height: '2.5rem' }} />
            </div>
          </div>
        </V>
      </Section>

      <Section title="Separator">
        <V label="Orientation">
          <div class="row">
            <div k="separator" style={{ width: '160px' }} />
            <div k="separator" style={{ width: '1px', height: '56px' }} />
          </div>
        </V>
      </Section>

      <Section title="Aspect ratio">
        <div k="aspect-ratio" style={{ '--ratio': '16 / 9', maxWidth: '280px' }}>
          <div class="aspect-demo">16:9</div>
        </div>
      </Section>

      <Section title="Calendar">
        <CalendarDemo />
      </Section>

      <div class="category-heading">Data input</div>

      <Section title="Input">
        <V label="Sizes">
          <div class="flow" style={{ maxWidth: '320px' }}>
            <input k="input" size="sm" placeholder="Small input" name="demo-input-sm" aria-label="Small input" />
            <input k="input" placeholder="Default input" name="demo-input" aria-label="Default input" />
            <input k="input" size="lg" placeholder="Large input" name="demo-input-lg" aria-label="Large input" />
            <input k="input" placeholder="Disabled input" disabled name="demo-input-disabled" aria-label="Disabled input" />
          </div>
        </V>
      </Section>

      <Section title="Textarea">
        <div class="flow" style={{ maxWidth: '320px' }}>
          <textarea k="textarea" rows="3" placeholder="Long-form text…" name="demo-textarea" aria-label="Textarea" />
        </div>
      </Section>

      <Section title="Select">
        <V label="States">
          <select k="select" name="demo-select" aria-label="Select">
            <option>Option one</option>
            <option>Option two</option>
          </select>
          <select k="select" disabled name="demo-select-disabled" aria-label="Disabled select">
            <option>Disabled</option>
          </select>
        </V>
      </Section>

      <Section title="Checkbox">
        <V label="States">
          <label>
            <input k="checkbox" type="checkbox" name="demo-checkbox" /> Unchecked
          </label>
          <label>
            <input k="checkbox" type="checkbox" name="demo-checkbox-checked" checked /> Checked
          </label>
          <label>
            <input k="checkbox" type="checkbox" name="demo-checkbox-disabled" disabled /> Disabled
          </label>
        </V>
      </Section>

      <Section title="Radio group">
        <div k="radio-group">
          <label>
            <input k="radio" type="radio" name="demo-radio" checked /> Apples
          </label>
          <label>
            <input k="radio" type="radio" name="demo-radio" /> Bananas
          </label>
          <label>
            <input k="radio" type="radio" name="demo-radio" disabled /> Cherries
          </label>
        </div>
      </Section>

      <Section title="Switch">
        <V label="States">
          <label>
            <input k="switch" type="checkbox" name="demo-switch" /> Off
          </label>
          <label>
            <input k="switch" type="checkbox" name="demo-switch-on" checked /> On
          </label>
          <label>
            <input k="switch" type="checkbox" name="demo-switch-disabled" checked disabled /> Disabled
          </label>
        </V>
      </Section>

      <Section title="Slider">
        <V label="States">
          <div class="flow" style={{ maxWidth: '320px' }}>
            <input k="slider" type="range" min="0" max="100" value="60" name="demo-slider" aria-label="Slider" style={{ '--progress': '60%' }} />
            <input k="slider" type="range" min="0" max="100" value="30" disabled name="demo-slider-disabled" aria-label="Disabled slider" style={{ '--progress': '30%' }} />
          </div>
        </V>
      </Section>

      <Section title="Input group">
        <div k="input-group" style={{ maxWidth: '360px' }}>
          <input k="input" placeholder="Search…" name="demo-search" aria-label="Search" />
          <button k="button">Go</button>
        </div>
      </Section>

      <Section title="File upload">
        <input type="file" k="file-upload" name="demo-file" aria-label="File upload" />
      </Section>

      <Section title="Color picker">
        <V label="States">
          <input type="color" k="color-picker" value="#7c3aed" name="demo-color" aria-label="Color picker" />
          <input type="color" k="color-picker" value="#7c3aed" disabled name="demo-color-disabled" aria-label="Disabled color picker" />
        </V>
      </Section>

      <Section title="Combobox" hint="Click the input to open the list.">
        <ComboboxDemo />
      </Section>

      <div class="category-heading">Feedback</div>

      <Section title="Alert">
        <V label="Variants">
          <div class="flow">
            <div k="alert">
              <strong>Heads up</strong> — the deployment finished successfully.
            </div>
            <div k="alert" variant="destructive">
              <strong>Error</strong> — the build failed. Check the logs.
            </div>
          </div>
        </V>
      </Section>

      <Section title="Spinner">
        <V label="Types">
          <div class="spinner-grid">
            {['turn', 'concentric', 'ripple', 'light', 'radar', 'bubble', 'fold', 'circle', 'dots'].map((type) => (
              <div class="spinner-cell" key={type}>
                <span k="spinner" type={type} />
                {type}
              </div>
            ))}
          </div>
        </V>
        <V label="Sizes">
          <span k="spinner" size="sm" />
          <span k="spinner" />
          <span k="spinner" size="lg" />
        </V>
        <V label="Variants">
          <span k="spinner" variant="primary" />
          <span k="spinner" variant="secondary" />
          <span k="spinner" variant="destructive" />
        </V>
      </Section>

      <Section title="Tooltip" hint="Hover a trigger to reveal its tooltip.">
        <div class="tooltip-row">
          {['top', 'bottom', 'left', 'right'].map((side) => (
            <span k="tooltip" title={`Tooltip on ${side}`} side={side} class="tooltip-trigger" key={side}>
              {side}
            </span>
          ))}
        </div>
      </Section>

      <div class="category-heading">Navigation</div>

      <Section title="Tabs">
        <div k="tablist" role="tablist">
          <button k="tab" role="tab" aria-selected="true">Overview</button>
          <button k="tab" role="tab" aria-selected="false">Settings</button>
          <button k="tab" role="tab" aria-selected="false">Billing</button>
        </div>
        <div k="tab-panel">Content for the selected tab.</div>
      </Section>

      <Section title="Breadcrumb">
        <nav k="breadcrumb" aria-label="Breadcrumb">
          <ol k="breadcrumb-list" class="breadcrumb-list">
            <li k="breadcrumb-item">
              <a k="breadcrumb-link" href="#">Home</a>
            </li>
            <li k="breadcrumb-item">
              <a k="breadcrumb-link" href="#">Trends</a>
            </li>
            <li k="breadcrumb-item" aria-current="page">Current page</li>
          </ol>
        </nav>
      </Section>

      <Section title="Pagination">
        <nav aria-label="Pagination" class="pagination-demo">
          <ul k="pagination-list">
            <li>
              <button k="pagination-link">1</button>
            </li>
            <li>
              <button k="pagination-link">2</button>
            </li>
            <li>
              <button k="pagination-link" aria-current="page">3</button>
            </li>
            <li>
              <button k="pagination-link">4</button>
            </li>
          </ul>
        </nav>
      </Section>

      <Section title="Navigation menu">
        <ul k="navigation-menu-list">
          <li>
            <a k="navigation-menu-link" href="#">Home</a>
          </li>
          <li>
            <a k="navigation-menu-link" href="#">Docs</a>
          </li>
          <li>
            <a k="navigation-menu-link" href="#">Pricing</a>
          </li>
        </ul>
      </Section>

      <Section title="Menubar">
        <div k="menubar">
          <button k="menubar-item">File</button>
          <button k="menubar-item">Edit</button>
          <button k="menubar-item">View</button>
          <button k="menubar-item">Help</button>
        </div>
      </Section>

      <Section title="Accordion">
        <div class="flow" style={{ maxWidth: '360px' }}>
          <details k="accordion" open>
            <summary>What is kinu?</summary>
            <p class="muted">A CSS-driven Preact component kit — props render as attributes, styling lives in CSS.</p>
          </details>
          <details k="accordion">
            <summary>How do themes work?</summary>
            <p class="muted">Each theme file overrides the --k-* tokens and component styles.</p>
          </details>
        </div>
      </Section>

      <Section title="Collapsible">
        <details k="collapsible" open>
          <div class="muted">Collapsible body — the trigger is hidden without JS.</div>
        </details>
      </Section>

      <Section title="Tree">
        <div k="tree" class="flow" style={{ maxWidth: '300px' }}>
          <details k="tree-item" open>
            <summary k="tree-label">Components</summary>
            <div k="tree-group">
              <button k="tree-leaf">Button</button>
              <button k="tree-leaf">Card</button>
            </div>
          </details>
          <details k="tree-item">
            <summary k="tree-label">Pages</summary>
            <div k="tree-group">
              <button k="tree-leaf">Home</button>
              <button k="tree-leaf">Settings</button>
            </div>
          </details>
        </div>
      </Section>

      <div class="category-heading">Overlays</div>

      <Section title="Dropdown menu" hint="Click the trigger to open the menu.">
        <OverlayDemo wrapper="dropdown" content="dropdown-content" id="demo-dropdown" trigger="Actions">
          <button k="dropdown-menu-item">Edit</button>
          <button k="dropdown-menu-item">Duplicate</button>
          <div k="separator" />
          <button k="dropdown-menu-item">Delete</button>
        </OverlayDemo>
      </Section>

      <Section title="Popover" hint="Click the trigger to open it.">
        <OverlayDemo wrapper="popover" content="popover-content" id="demo-popover" trigger="Open popover">
          <div class="popover-body">Popover content — a short annotation attached to the trigger.</div>
        </OverlayDemo>
      </Section>

      <Section title="Hover card" hint="Hover the trigger to reveal the card.">
        <div k="hover-card">
          <button k="button" variant="ghost">Hover me</button>
          <div k="hover-card-content">
            <strong>@kinu</strong>
            <p class="muted" style={{ margin: 0 }}>CSS-driven Preact components.</p>
          </div>
        </div>
      </Section>

      <Section title="Dialog" hint="Dialog surface shown in its open state.">
        <div k="dialog-content" open class="dialog-demo">
          <h3 style={{ margin: 0 }}>Delete file?</h3>
          <p class="muted" style={{ margin: 0 }}>This action cannot be undone.</p>
          <div class="row">
            <button k="button" variant="outline">Cancel</button>
            <button k="button" variant="destructive">Delete</button>
          </div>
        </div>
      </Section>

      <Section title="Toast" hint="Toast shown in its mounted state.">
        <div class="toast-stage">
          <div k="toast" data-mounted>
            <span k="toast-title">Saved</span>
            <p k="toast-content">Your changes have been saved.</p>
            <button k="toast-action">Undo</button>
          </div>
        </div>
      </Section>

      <div class="category-heading">Layout</div>

      <Section title="Scroll area">
        <div k="scroll-area" class="scroll-demo">
          <p class="muted">
            Scrollable surface. Line one. Line two. Line three. Line four. Line five. Line six. Line
            seven. Line eight.
          </p>
        </div>
      </Section>

      <Section title="Carousel" hint="Use the arrows — or drag — to move between slides.">
        <CarouselDemo />
      </Section>
    </div>
  );
}

function App() {
  const [slug, setSlug] = useState(() => {
    const fromHash = location.hash.slice(1);
    return slugs.includes(fromHash) ? fromHash : 'millennial-beige';
  });
  // Two-sided scheme: data-color-scheme="light" forces light; removing it lets theme @media (prefers-color-scheme: dark) take over on dark OSes.
  const [scheme, setScheme] = useState(() =>
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  const [view, setView] = useState('components');

  useEffect(() => {
    const onHashChange = () => {
      const next = location.hash.slice(1);
      setSlug(slugs.includes(next) ? next : 'millennial-beige');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Applied pre-paint: first frame themed, not kinu default.
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

  useLayoutEffect(() => {
    document.documentElement.dataset.colorScheme = scheme;
  }, [scheme]);

  const select = (next) => {
    setSlug(next);
    location.hash = `#${next}`;
  };

  return (
    <div class="app-shell">
      <header class="topbar">
        <h1>
          kinu-styles <span class="muted">— {themes[slug].name}</span>
        </h1>
        <div class="topbar-actions">
          <div k="toggle-group" class="scheme-toggle" role="group" aria-label="Color scheme">
            <button k="toggle" aria-pressed={scheme === 'light'} onClick={() => setScheme('light')}>
              Light
            </button>
            <button k="toggle" aria-pressed={scheme === 'dark'} onClick={() => setScheme('dark')}>
              Dark
            </button>
          </div>
          <div k="toggle-group" role="group" aria-label="Preview view">
            <button k="toggle" aria-pressed={view === 'components'} onClick={() => setView('components')}>
              Components
            </button>
            <button k="toggle" aria-pressed={view === 'demo'} onClick={() => setView('demo')}>
              Demo
            </button>
          </div>
        </div>
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
      <main class="content">{view === 'demo' ? <DashboardDemo /> : <Preview />}</main>
      <aside class="spec-sidebar">
        <AdoptionBlock slug={slug} />
        <SpecPanel slug={slug} />
      </aside>
    </div>
  );
}

render(<App />, document.getElementById('app'));