```yaml
font: Sora
font_stack: "Sora, system-ui, sans-serif"
radius: 1rem
moodboard: https://trends.daisyui.com/trend/glassmorphism/
palette:
  light:
    background: 222 45% 88%
    foreground: 226 40% 22%
    primary: 262 60% 55%
    muted: 226 25% 85%
    border: 220 30% 95%
  dark:
    background: 228 35% 10%
    foreground: 220 30% 94%
    primary: 262 80% 70%
    muted: 228 25% 18%
    border: 228 40% 60%
```

# Glassmorphism

## Signature
frosted panels, background blur, translucent fills, thin light borders,
layered depth
luminous gradients

## Suited for
premium dashboards, finance apps, media players, navigation overlays

## Layout
stack a few frosted planes over a visually rich backdrop; obvious
front-to-back order
no translucent cards nested inside one another

## Colors
- glass tinted with cool or neutral translucency; thin luminous borders
  opaque contrast layers behind text whenever the backdrop is busy
- token mapping: `primary` = luminous cyan or violet, `secondary` = softer rose
  or blue
  `base-100`/`base-200`/`base-300` = opaque charcoal-to-black or pearl-to-gray steps beneath the glass
- `--depth: 1`

## Imagery
atmospheric photography, soft-focus light
or broad gradients behind panels so blur creates depth without obscuring the
subject

## Density
each glass panel moderately sparse
only closely related metrics or controls grouped so translucency never
competes with dense reading

## Motion
crossfade opacity and blur; slide panes on separate depth tracks
restrained pointer parallax without continuously drifting the background

## Shape
medium-to-large radii, thin highlight strokes
shallow floating shadows that read each pane as a separate sheet
`--radius-*` between 0.75rem and 1.5rem

## Typography
clean geometric sans-serif with firm weights; no translucent text
every label tested against the brightest and darkest backdrop regions
Suggested: Sora, Outfit, Manrope, Space Grotesk, Exo 2

## Origins
late 2020–early 2020s; online UI design community drawing on operating-system
glass effects
translucent layers are older — Windows Vista's Aero Glass and later Apple
and Microsoft systems used blur, tint
and depth; the 2020 wave packaged those precedents into frosted panels,
bright backgrounds,
and fine borders
Sources:
openaccess-api.cms-conferences.org/articles/download/978-1-958651-49-0_20
blogs.windows.com/windowsexperience/2017/05/11/build-2017-sparking-the-next-wave-of-creativity-with-the-windows-10-fall-creators-update