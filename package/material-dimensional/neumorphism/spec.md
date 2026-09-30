```yaml
font: Nunito Sans
font_stack: "Nunito Sans, system-ui, sans-serif"
radius: 1rem
moodboard: https://trends.daisyui.com/trend/neumorphism/
palette:
  light:
    background: 222 25% 88%
    foreground: 226 35% 25%
    primary: 222 85% 55%
    muted: 222 25% 84%
    border: 222 25% 82%
  dark:
    background: 230 25% 18%
    foreground: 228 30% 88%
    primary: 222 80% 62%
    muted: 230 25% 24%
    border: 230 20% 30%
```

# Neumorphism

## Signature
monochromatic surfaces, soft outer shadows, inset shadows, low contrast,
rounded controls
embossed appearance

## Suited for
wellness apps, calculators, smart-home controls, low-density utilities

## Layout
a small number of controls placed directly on one continuous base surface
wide gaps keep paired light and dark shadows visually distinct

## Colors
- narrow monochromatic range around a mid-light base
- accessible dark text plus one restrained accent for active or safety-critical
  states
- token mapping: `primary` = restrained active-state hue, `secondary` = darker
  low-chroma version
  `base-100`/`base-200`/`base-300` = clearly distinguishable steps within the same pale monochromatic family
- `--depth: 1`

## Imagery
imagery kept rare; softly embossed glyphs, monochrome product cutouts
or low-detail illustrations sharing the surface lighting

## Density
low; one control cluster per region; no dense tables, long forms, or deeply
nested panels

## Motion
outer shadows reverse into inset shadows on press; gentle spring release
feedback slow enough for the material change to register

## Shape
circular dials, rounded rectangles, and broad pills with consistent extrusion
depth
and a single upper-left light direction; `--radius-*` between 0.75rem and 1.5rem

## Typography
rounded sans-serif at medium weight; contrast increased beyond the
surrounding relief
no thin gray labels on the base color
Suggested: Nunito Sans, Quicksand, Varela Round, Manrope, Urbanist

## Origins
late 2019–early 2020s; online UI design community
fused minimal surfaces with soft skeuomorphic relief
Jason Kelley used "Neuomorphism" in December 2019
Michał Malewicz's "Neumorphism" formulation spread afterward
accessibility criticism followed because low-contrast controls are hard to
perceive
Sources: en.wiktionary.org/wiki/neumorphism,
figma.com/resource-library/what-is-skeuomorphism