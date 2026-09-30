```yaml
font: Jura
font_stack: "system body, system-ui, sans-serif; headings: Jura, sans-serif"
radius: 0.25rem
moodboard: https://trends.daisyui.com/trend/low-poly-ui/
palette:
  light:
    background: 220 25% 94%
    foreground: 232 35% 18%
    primary: 258 50% 45%
    muted: 220 20% 86%
    border: 220 15% 72%
  dark:
    background: 235 30% 14%
    foreground: 230 25% 92%
    primary: 258 60% 62%
    muted: 235 25% 24%
    border: 235 20% 34%
```

# Low-Poly UI

## Signature
faceted geometry, flat-shaded surfaces, angular silhouettes, polygonal
models, limited detail
crisp lighting

## Suited for
games, data stories, educational tools, experimental portfolios, lightweight
3D experiences

## Layout
one faceted landscape or model centered; angular information panels support it
composition kept broad enough for polygon silhouettes to read

## Colors
- limited flat-shaded palette with distinct light, mid, and shadow faces
- no smooth gradients that erase facet structure
- token mapping: `primary` = hero object's dominant facet hue
  `secondary` = contrasting object or environment hue
  `base-100`/`base-200`/`base-300` = neutral light, mid, and shadow-face colors
- `--depth: 1`

## Imagery
polygonal characters, terrain, products, and icons with economical detail
and a consistent face count and lighting model

## Density
low to medium; large visual regions
and concise annotations rather than intricate controls over the model

## Motion
models rotate in measured steps; lighting shifts across facets
geometry transitions through crisp folds or controlled vertex movement

## Shape
triangles, chamfered cards, angular cutouts
crystal-like silhouettes with deliberately visible planar changes
`--radius-*` set to 0 or 0.25rem

## Typography
angular geometric display face for headings, paired with a plain sans-serif
for explanation
no faceting on small text
Suggested: Jura, Exo 2, Quantico, Orbitron, Teko

## Origins
mid-1990s roots; stylized revival in the 2010s; real-time 3D games and
computer graphics
visible facets began as a technical necessity of limited polygon counts
then shifted from constraint to deliberate style as hardware improved; 2010s
games, illustration
and UI reused the geometry for clarity, nostalgia, and inexpensive motion
Sources: killscreen.com/poly-generational