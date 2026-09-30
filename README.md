# kinu-styles

Custom CSS themes for [kinu](https://kinu.sh), one per [daisyUI design trend](https://trends.daisyui.com/). Import a theme after kinu's stylesheet and the whole app takes on that trend's design language — tokens, component styling, typography, light and dark — with zero component changes.

Browse all themes live in the [preview portal](#preview-portal).

## Install

```bash
bun add kinu kinu-styles
```

## Usage

```js
import 'kinu/style.css';
import 'kinu-styles/millennial-beige.css';
```

That's it. The trend applies to the whole app, in light and dark:

- **Light** — the theme's light palette is the default.
- **Auto dark** — the theme's dark palette follows `prefers-color-scheme`.
- **Explicit dark** — set `data-color-scheme="dark"` on any container (the `<html>` element for the whole page) to force the dark palette.

Importing a second theme file simply replaces the first — the later import wins.

## Fonts and bundlers

Theme files load their signature typefaces via a leading Google Fonts `@import`, which bundlers must hoist to the top of the merged CSS output. Vite, esbuild, and Tailwind do this automatically. If your bundler does not hoist external imports, the theme still renders correctly — it falls back to the documented system font stacks instead of the signature faces.

## Themes

One CSS file per daisyUI design trend. Every theme covers the same component surface (actions, data display, data input, feedback, navigation, layout) and ships its own typography via Google Fonts with system fallbacks.

### Minimal & functional

Millennial Beige · Clean UI · Minimalism · Flat Design · Metro / Modern UI · Fluent Design · Monochrome UI · Data-Dense Utilitarian UI · Terminal / CLI UI · Swiss Style · Quiet Luxury · Scandinavian Modern · Japanese Minimalism · Cyberminimalism

### Material & dimensional

Material Design · Skeuomorphism · Neumorphism · Glassmorphism · Claymorphism · Aqua UI · Mesh Gradient / Aurora UI · Holographic / Iridescent UI · Chrome / Liquid Metal · Spatial UI · Low-Poly UI · Historical Manuscript Skeuomorphism · Real-Wood Skeuomorphism · Luminous Eco-Skeuomorphism · Y2K Techno-Skeuomorphism

### Editorial & art-inspired

Editorial Design · Type-First Design · Kinetic Typography · Bauhaus · Constructivism · Heroic Realism · Art Nouveau · Art Deco · Streamline Moderne · Mid-Century Modern · Pop Art · Gothic / Neo-Gothic · Dark Academia · Utopian Scholastic

### Bold & experimental

Geometric Abstract · Collage · Dopamine Design · Maximalism · Sports Brutalism · Psychedelic Design · Postmodern Eclecticism · Memphis Design · Brutalism · Neubrutalism · Punk / Zine · Grunge · Acid Graphics · Glitch Art · Superflat Pop

### Playful & illustrated

Scrapbook / Sticker UI · Hand-Drawn UI · Lo-fi Art · Pixel Art · RPG Pixel Art · Halftone / Comic Book · Corporate Memphis · Kawaii UI · Whimsigothic

### Organic & atmospheric

Organic / Blob Design · Biophilic Design · Wabi-Sabi · Cottagecore · Elvish Aesthetic · Solarpunk · Surf Crush · Frutiger Aero · Seapunk · Global Village Coffeehouse

### Retro & nostalgic

American Kitsch · Jet Age Optimism · Gen-X Soft Club · Y2K · 2K1 · McBling · UrBling · DORFic · Vectordelia (Frutiger Metro) · Web 1.0 / Webcore · Retro Computing · PC-98 · Vaporwave · Indie Sleaze

### Futuristic & speculative

FUI / HUD · Retro-Futurism · Cassette Futurism · Steampunk · Dieselpunk · Cyberpunk · Afrofuturism · Cybercore · Synthwave / Outrun · Cyberdelia

## Preview portal

A live gallery — built with Preact and kinu itself — shows every theme applied to the full kinu component showcase, in light and dark, with each trend's design spec (palette, fonts, radius). [Open the portal](https://kinu-styles.pages.dev).

## Contributing a theme

Every theme lives in `package/<category>/<slug>/` as `style.css` (the shipped stylesheet) and `spec.md` (the design source) — the tree is the source of truth, the portal and tooling read it directly. Authored from a shared template and spec sheet derived from the trend's design rules on trends.daisyui.com:

```bash
bun scaffold new <category> <slug>          # scaffold a theme folder
bun verify                                  # structural gate: blocks, surfaces, tokens, imports
```

A theme ships only when its portal page matches the trend's visual direction at a glance. The aesthetics are reimplemented from each trend's design rules — never copied from daisyUI's CSS.

## Browser support

Modern browsers with CSS custom properties, `:where()`, and `@media (prefers-color-scheme: dark)`.