```yaml
font: IBM Plex Sans + IBM Plex Mono
font_stack: "IBM Plex Sans, system-ui, sans-serif; headings: IBM Plex Mono, sans-serif"
radius: 0.375rem
moodboard: https://trends.daisyui.com/trend/skeuomorphism/
palette:
  light:
    background: 32 38% 33%
    foreground: 40 45% 88%
    primary: 350 45% 35%
    muted: 30 30% 35%
    border: 30 30% 22%
  dark:
    background: 220 15% 18%
    foreground: 210 20% 90%
    primary: 350 55% 45%
    muted: 220 15% 24%
    border: 220 12% 30%
```

# Skeuomorphism

## Signature
layered control panels, raised buttons, recessed slots, rotary controls,
toggle switches
indicator lights
realistic material finishes, beveled edges, calibration markings, stitched or
perforated seams
taped or pinned notes, folded paper corners, fasteners, layered cast shadows

## Suited for
music tools, simulations, games, creative software, interfaces built around
physical metaphors

## Layout
interface modeled as a believable instrument, desk, console, folio, or container
compact modules on a precise physical grid
functional asymmetry places controls where their real counterparts would sit
and operate; tape
pins, stitches, screws, tabs, and folded corners only at believable junctions
never uniform ornament

## Colors
- colors derived from machined, molded, painted, worn, or brushed materials:
  walnut, steel
  leather, enamel, glass
- realistic shadow temperature and wear plus focused indicator lamps or
  restrained futuristic
  illumination
- token mapping: `primary` = dominant painted-enamel or leather hue
  `secondary` = indicator-lamp color, `base-100`/`base-200`/`base-300` = material's lit, midtone
  and shadow colors
- `--noise: 1`, `--depth: 1`

## Imagery
high-resolution textures, photographed objects, rendered hardware
or generated surface patterns with consistent lighting and perspective;
leather grain
paper fibers, ruled sheets
perforation, brushed metal, fine dust; panel thickness, seams, fasteners,
engraved markings
reflections
inner shadows, ambient occlusion shown as construction

## Density
compact, information-dense control clusters with rotary controls, switches,
readouts
calibration ticks
and technical micro-labels; functions separated by layered panel modules instead
of minimalist uniformity or generic cards; `*-sm` size variants preserve the
working density

## Motion
material response per control: buttons travel and rebound, knobs rotate,
needles sweep
switches snap
indicator lamps warm up, drawers open
softly modeled surfaces compress or recess with believable inertia; tape
stitches, and screws stay anchored unless the interaction explicitly
manipulates them

## Shape
one light direction preserved across cast shadows, inset shadows, bevel
highlights, reflective edges
overlapping layers; stacked panels with realistic thickness, stitched or
dashed seams
taped paper, folded corners
beveled housings, recessed slots, raised buttons, rotary controls, molded
handles, exposed screws
`--radius-*` between 0.25rem and 1rem

## Typography
functional instrument labels paired with material-appropriate display
lettering, engraved legends
compact technical microcopy, fine calibration marks
aligned monospaced measurements that read like real equipment
Suggested: IBM Plex Sans, IBM Plex Mono, Barlow Condensed, Roboto Slab, Bitter

## Origins
1980s precedents; dominant in consumer UI during the 2000s; early graphical
computing
especially consumer desktop and mobile interfaces
richly textured versions especially visible in Apple's early iPhone era
flat design shift around 2012–2013 reduced textures without eliminating
familiar metaphors such
as folders and trash cans
Sources: figma.com/resource-library/what-is-skeuomorphism