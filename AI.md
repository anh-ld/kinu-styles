# Style your app with kinu-styles — AI agent brief

You are styling the user's app with **kinu-styles**, a CSS theme library for the [kinu](https://github.com/developit/kinu) component kit. Your job: install the library, pick a theme that genuinely fits the user's project, adapt it to their project, and verify your own work — in one shot, without needing corrections.

Follow the steps in order. Stop where a step needs the user (interview, shortlist pick, final look); never skip a user step.

## 1. Install

1. Make sure the GitHub npm registry is scoped. If the project `.npmrc` has no `@anh-ld:registry=https://npm.pkg.github.com` line, add it:

   ```bash
   echo '@anh-ld:registry=https://npm.pkg.github.com' >> .npmrc
   ```

2. Check that `//npm.pkg.github.com/:_authToken` exists in the project or user `.npmrc`. If it is missing, ask the user for a GitHub token with `read:packages` scope, add it to `.npmrc`, and tell the user not to commit `.npmrc`.

3. Install the library:

   ```bash
   npm install @anh-ld/kinu-styles
   ```

4. Import the base kit first, then one theme:

   ```js
   import 'kinu/style.css';
   import '@anh-ld/kinu-styles/<theme-slug>.css';
   ```

   Importing another theme later replaces the first — the later import wins. Use one theme per page.

## 2. Choose the scheme

Ask the user whether they want light, dark, or auto; default to light. The library's scheme model:

- **Light** is the default. To force light on any machine (including one whose OS is in dark mode), set `data-color-scheme="light"` on the app container (or `document.documentElement`).
- **Auto dark** follows the system via `prefers-color-scheme` — no extra work needed.
- **Force dark** — set `data-color-scheme="dark"` on the app container (or `document.documentElement`).

## 3. Pick the theme

### 3a. Interview the user

Ask these questions (or the closest fit for their project) and note the answers:

1. What kind of product or project is this? (e-commerce, dashboard, portfolio, game, wellness app, developer tool, campaign…)
2. Who is it for? (consumers, enterprises, gamers, creators, children…)
3. Which three words describe the desired feel? (calm, bold, playful, luxurious, technical, warm, futuristic…)
4. Light, dark, or auto?

### 3b. Scan the project

When the user has an existing project, look at its code for signals: current colors, fonts, and brand cues (logo, imagery, copy tone). If the project has clear brand cues, let the scan dominate the theme choice.

### 3c. Narrow via the cheat-sheet

Match the interview answers and scan signals to the 1-2 best-fitting categories in the cheat-sheet (section 4).

### 3d. Enumerate and read the candidates

Follow the enumeration instruction in section 4: list the themes in the narrowed categories, read every `spec.md` of those themes, and shortlist the 3 whose "Suited for" sections match the interview and scan answers best.

### 3e. Present the shortlist

Show the user 3 themes, each with a one-line reason (what fits, what it does to their look). Let the user pick one. Do not skip this step.

### 3f. Apply

Import the chosen theme's CSS (section 1, step 4), then adapt it (section 5).

## 4. Category cheat-sheet and enumeration

| Category | Vibe | Typical fits |
| --- | --- | --- |
| bold-experimental | Loud, energetic, experimental visuals — type-led statements | Music, fashion, streetwear, sports, startups, campaigns, artist portfolios, cultural and countercultural brands |
| editorial-art-inspired | Art-movement print aesthetics — editorial, luxurious, cultural | Publishing, fashion, portfolios, cultural institutions, premium e-commerce, luxury products, hospitality, education and literary brands |
| futuristic-speculative | Sci-fi and speculative tech — futuristic, cinematic | Games, security tools, crypto products, nightlife, science-fiction experiences, tech campaigns, entertainment, exhibitions |
| material-dimensional | Dimensional materials — two poles: systematic UI kits, and skeuomorphic surfaces | Dashboards, finance apps, media players, wellness apps, smart-home controls, AI products, SaaS landing pages, Android-style products; or music tools, simulations, games, creative software built around physical metaphors |
| minimal-functional | Restraint and utility — the safe default pick | Dashboards, admin panels, enterprise software, developer tools, data products, focused tools, landing pages, portfolios, premium commerce, reading experiences, wellness and lifestyle commerce |
| organic-atmospheric | Nature and warmth — organic, calm, atmospheric | Wellness, sustainability, hospitality, healthcare, lifestyle products, food, craft, community and climate products |
| playful-illustrated | Hand-crafted playfulness — illustrated, friendly | Education, journaling, creative tools, children's products, games, social apps, stationery, personal brands; or friendly corporate: SaaS onboarding, fintech, HR |
| retro-nostalgic | Past-era nostalgia — retro, webcore, nostalgic | Music, gaming, digital art, nostalgic campaigns, experimental portfolios, fashion, beauty, social products, personal sites, youth brands |

Preview any theme in the portal: https://anh-ld.github.io/kinu-styles/ (themes open with a `#<slug>` hash).

**Enumeration instruction.** List the theme directories of the narrowed categories via the GitHub API contents endpoint:

```
https://api.github.com/repos/anh-ld/kinu-styles/contents/package/<category>
```

Then read every `spec.md` in those categories via raw URLs:

```
https://raw.githubusercontent.com/anh-ld/kinu-styles/main/package/<category>/<slug>/spec.md
```

Shortlist the 3 themes with the strongest "Suited for" fit against the interview and scan answers.

## 5. Adapt the theme to the project

### Palette

The theme defines its palette as HSL custom properties on the scheme blocks, e.g. `--k-background`, `--k-foreground`, `--k-card`, `--k-primary`, `--k-muted`, `--k-border`. Override any of them after importing the theme CSS — later rules win:

```css
:root {
  --k-background: 210 50% 98%;
  --k-primary: 220 70% 45%;
}
```

The five signature colors are `--k-background`, `--k-foreground`, `--k-primary`, `--k-muted`, `--k-border`.

### Radius

Override `--k-radius` after the theme import (each theme sets its own default).

### Fonts

Each theme loads its fonts via a Google Fonts `@import` at the top of its CSS and applies them with `font-family` rules — the body font on `:root:root`, the heading font on `:where(h1, h2, h3, h4)`. To change fonts: replace the `@import` URL with the Google Fonts URL for the new families, and override the two `font-family` declarations after the theme import.

### Forced dark mode

To make the app always dark, set `data-color-scheme="dark"` on a container covering the app (or `document.documentElement`).

## 6. Verify before you are done

From the built CSS, confirm all three:

1. The Google Fonts `@import` is hoisted to the top of the merged CSS.
2. The theme's five signature tokens are present: `--k-background`, `--k-foreground`, `--k-primary`, `--k-muted`, `--k-border`.
3. The import order is right: `kinu/style.css` first, then the theme, then any of your overrides.

If a check fails, re-verify against the actual built output once; if it still fails, report the failing check to the user with the relevant caveat (fonts fall back to system stacks and the page still renders) and ask how to proceed — do not declare the work done.

Then ask the user to look at the rendered page and confirm in one glance: the page renders with the theme applied, dark mode behaves as requested, and the fonts loaded. Only after the checks and the user's look pass, declare the work done.

## Caveats

- **Fonts:** the bundler must hoist the Google Fonts `@import` to the top of the merged CSS (Vite, esbuild, Tailwind do). Without hoisting, fonts fall back to system font stacks and the page still renders.
- **Modern browsers only:** the themes rely on CSS custom properties, `:where()`, and `prefers-color-scheme`.