```yaml
font: Archivo
font_stack: "Archivo, system-ui, sans-serif"
radius: 0.125rem
moodboard: https://trends.daisyui.com/trend/monochrome-ui/
palette:
  light:
    background: 0 0% 100%
    foreground: 0 0% 10%
    primary: 0 0% 10%
    muted: 0 0% 95%
    border: 0 0% 85%
  dark:
    background: 0 0% 7%
    foreground: 0 0% 94%
    primary: 0 0% 94%
    muted: 0 0% 17%
    border: 0 0% 24%
```

# Monochrome UI

## Signature
single-hue palette, tonal hierarchy, strong contrast, texture variation,
restrained imagery
shape-led composition

## Suited for
editorial products, luxury brands, portfolios, focus tools, art-directed
experiences

## Layout
create hierarchy through scale, spacing, cropping, and tonal blocks
using strong silhouette changes where other systems rely on multiple colors

## Colors
- primary: clearest chromatic step of the one hue or neutral family
- secondary: quieter neighboring step
- base-100/base-200/base-300: three reliably separated values from the same family
- texture: `--noise: 1`

## Imagery
black-and-white, duotone, or single-ink imagery with deliberate grain
and contrast so photographs belong to the same tonal system

## Density
density chosen by task; separate information through rhythm and tone
not extra accent colors for convenience

## Motion
opacity reveals, tonal inversions, masks, crop transitions that preserve the
one-color discipline

## Shape
bold silhouettes, cutouts, rules, field boundaries carry structure
avoid ornamental shapes that need extra color to make sense; `--radius-*` set
to 0 or 0.25rem

## Typography
one flexible family or a sharply contrasted editorial pair; hierarchy by
size, width,
and weight instead of colored text
Suggested: Instrument Sans, Archivo, IBM Plex Sans, Inter, Space Grotesk

## Origins
recurring throughout screen-interface history; early single-color displays
and modernist graphic systems
— early terminals physically limited to one phosphor color
later black-and-white or single-hue systems chosen for hierarchy and focus
contemporary versions fuse that technical memory with International
Typographic Style grids
Sources: nb.admin.ch/en/the-international-style-1950-1970
computerhistory.org/collections/catalog/102716145