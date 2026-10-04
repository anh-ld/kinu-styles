# kinu-styles: agent brief

You are styling the user's app with **kinu-styles**, CSS themes for the [kinu](https://github.com/developit/kinu) component kit. Install it, pick a theme that fits, adapt it, verify. Steps run in order. Stop at every step that needs the user.

## 1. Install

1. Scope the registry. If `.npmrc` lacks it, add:

   ```bash
   echo '@anh-ld:registry=https://npm.pkg.github.com' >> .npmrc
   ```

2. Check for `//npm.pkg.github.com/:_authToken` in the project or user `.npmrc`. Missing: ask the user for a GitHub token with `read:packages`, add it, and warn them not to commit `.npmrc`.

3. Install:

   ```bash
   npm install @anh-ld/kinu-styles
   ```

4. Import kinu first, then one theme. One theme per page; a later theme import wins.

   ```js
   import 'kinu/style.css';
   import '@anh-ld/kinu-styles/<slug>.css';
   ```

## 2. Scheme

Ask: light, dark, or auto. Default light.

- **Light**: default. To force it on a dark-mode OS, set `data-color-scheme="light"` on the app container or `<html>`.
- **Auto**: follows `prefers-color-scheme`. Nothing to do.
- **Dark**: set `data-color-scheme="dark"` on the app container or `<html>`.

## 3. Pick a theme

1. **Interview.** Ask:
   - What is the product? (store, dashboard, portfolio, game, wellness, dev tool, campaign…)
   - Who uses it? (consumers, enterprise, gamers, creators, kids…)
   - Three words for the feel? (calm, bold, playful, luxurious, technical, warm…)
2. **Scan.** In an existing project, read current colors, fonts, logo, imagery, copy tone. Clear brand cues outweigh the interview.
3. **Narrow.** Match answers and scan to 1–2 categories below.
4. **Read.** List the themes in those categories and read every `spec.md`:

   ```
   https://api.github.com/repos/anh-ld/kinu-styles/contents/package/<category>
   https://raw.githubusercontent.com/anh-ld/kinu-styles/main/package/<category>/<slug>/spec.md
   ```

5. **Shortlist.** Show the user the 3 themes whose "Suited for" fits best, one line each on why. The user picks. Never skip this.
6. **Apply.** Import the pick (1.4), then adapt (4).

| Category | Vibe | Fits |
| --- | --- | --- |
| bold-experimental | Loud, type-led | Music, fashion, streetwear, sports, startups, campaigns, artist portfolios, countercultural brands |
| editorial-art-inspired | Art-movement print, luxurious | Publishing, fashion, portfolios, museums, premium commerce, luxury, hospitality, literary brands |
| futuristic-speculative | Sci-fi, cinematic | Games, security, crypto, nightlife, sci-fi experiences, tech campaigns, entertainment, exhibitions |
| material-dimensional | Systematic UI kits or skeuomorphic surfaces | Dashboards, finance, media players, wellness, smart home, AI products, SaaS landing pages; or music tools, simulations, creative software with physical metaphors |
| minimal-functional | Restrained, useful. Safe default | Dashboards, admin, enterprise, dev tools, data products, landing pages, portfolios, premium commerce, reading |
| organic-atmospheric | Natural, warm, calm | Wellness, sustainability, hospitality, healthcare, lifestyle, food, craft, community, climate |
| playful-illustrated | Hand-drawn, friendly | Education, journaling, creative tools, kids, games, social, stationery, personal brands; friendly SaaS onboarding, fintech, HR |
| retro-nostalgic | Past eras, webcore | Music, gaming, digital art, nostalgic campaigns, experimental portfolios, fashion, beauty, social, personal sites, youth brands |

Preview: https://anh-ld.github.io/kinu-styles/#<slug>

## 4. Adapt

Theme scheme blocks use selectors like `:root:root:not([data-color-scheme=dark])`. A plain `:root` override loses, so add `!important`. That wins in light, auto dark, and forced dark.

**Palette.** HSL tokens: `--k-background`, `--k-foreground`, `--k-card`, `--k-primary`, `--k-muted`, `--k-border`, and more in the theme file.

```css
:root {
  --k-background: 210 50% 98% !important;
  --k-primary: 220 70% 45% !important;
  --k-radius: 0.5rem !important;
}
```

Keep text pairs at 4.5:1 or better (`--k-foreground` on `--k-background`, each `-foreground` on its fill). Link buttons use `--k-link`, falling back to `--k-primary`: after changing primary, set `--k-link` if primary is too light or dark to read as text on the background.

**Radius.** `--k-radius`, same rule.

**Fonts.** Each theme starts with a Google Fonts `@import`, sets the body font on `:root:root`, and heading fonts on `:where(h1, …)`. To swap: replace the `@import` URL, override the body `font-family` with `!important`, override headings with a plain later rule.

## 5. Verify

Check the built CSS:

1. Google Fonts `@import` is hoisted to the top.
2. `--k-background`, `--k-foreground`, `--k-primary`, `--k-muted`, `--k-border` are present.
3. Order is kinu, then theme, then your overrides.
4. Every override value appears in the output. Missing means it lost the cascade: add `!important`, re-check.

A check fails twice: tell the user which one and ask how to proceed. Not done.

All pass: ask the user to look at the page. Theme applied, scheme right, fonts loaded. Done only after they confirm.

## Caveats

- **Fonts** need a bundler that hoists `@import` (Vite, esbuild, Tailwind do). Without it, system fonts load and the page still works.
- **Modern browsers only**: custom properties, `:where()`, `prefers-color-scheme`.
