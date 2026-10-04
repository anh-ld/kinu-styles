# kinu-styles

CSS themes for [kinu](https://github.com/developit/kinu).

Browse all themes in the [preview portal](https://anh-ld.github.io/kinu-styles/).

Styling your app with an AI agent? Hand it [this file](AI.md).

## Install

```bash
echo '@anh-ld:registry=https://npm.pkg.github.com' >> .npmrc
npm install @anh-ld/kinu-styles
```

The GitHub registry requires a token: add `//npm.pkg.github.com/:_authToken=<token>` to `.npmrc` (a token with `read:packages` scope).

## Usage

```js
import 'kinu/style.css';
import '@anh-ld/kinu-styles/millennial-beige.css';
```

- Light = default.
- Auto dark = follows `prefers-color-scheme`.
- Force dark = `data-color-scheme="dark"` on container.
- Import another theme → replaces first. Later import wins.

## Caveat

- Theme fonts load via Google Fonts `@import`: bundler must hoist it to the top of the merged CSS (Vite, esbuild, Tailwind do). No hoist → falls back to system font stacks, still renders.
- Modern browsers only: CSS custom properties, `:where()`, `prefers-color-scheme`.

## Credits

- [kinu](https://kinu.sh) — Preact component kit the themes restyle.
- [daisyUI trends](https://trends.daisyui.com/) — design trend source.