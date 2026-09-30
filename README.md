# kinu-styles

CSS themes for [kinu](https://kinu.sh) — one per [daisyUI design trend](https://trends.daisyui.com/).

Import theme after kinu stylesheet → whole app takes on the trend: tokens, components, typography, light + dark. Zero component changes.

Browse all themes in the [preview portal](https://kinu-styles.pages.dev).

## Install

```bash
bun add kinu kinu-styles
```

## Usage

```js
import 'kinu/style.css';
import 'kinu-styles/millennial-beige.css';
```

- Light = default.
- Auto dark = follows `prefers-color-scheme`.
- Force dark = `data-color-scheme="dark"` on container.
- Import another theme → replaces first. Later import wins.

## Caveat

- Theme fonts load via Google Fonts `@import` — bundler must hoist it to the top of the merged CSS (Vite, esbuild, Tailwind do). No hoist → falls back to system font stacks, still renders.
- Modern browsers only: CSS custom properties, `:where()`, `prefers-color-scheme`.

## Credits

- [kinu](https://kinu.sh) — Preact component kit the themes restyle.
- [daisyUI trends](https://trends.daisyui.com/) — design trend source.