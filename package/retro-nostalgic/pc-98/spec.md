```yaml
font: DotGothic16 + IBM Plex Mono
font_stack: "IBM Plex Mono, system-ui, sans-serif; headings: DotGothic16, sans-serif"
radius: 0
moodboard: https://trends.daisyui.com/trend/pc-98/
palette:
  light:
    background: 45 40% 90%
    foreground: 240 30% 18%
    primary: 0 100% 45%
    muted: 240 15% 75%
    border: 240 15% 65%
  dark:
    background: 240 35% 7%
    foreground: 45 40% 90%
    primary: 0 100% 55%
    muted: 240 25% 24%
    border: 240 25% 30%
```

# PC-98

## Signature
640×400 pixel scenes, sixteen-color palettes, patterned dithering, detailed
anime portraits
scenic visual-novel backgrounds, rectangular dialogue and command windows;
`--noise: 1`
`--depth: 1`

## Suited for
visual novels, games, music releases, retro technology projects, narrative
portfolios
Japanese-computing archives

## Layout
8:5 landscape scene: a large character or location image behind a bottom
dialogue box
side command list
portrait inset, or narrow status strip

## Colors
scene-specific indexed palette of roughly sixteen simultaneous colors from a
broader bank
shade ramps built through checker, line, and noise dithers rather than smooth
gradients
- primary: the clearest action or dialogue-highlight swatch
- secondary: a contrasting scene swatch
- base-100/200/300: three exact indexed navy, gray, or cream panel values
- texture: `--noise: 1`
- depth: `--depth: 1`

## Imagery
late-1980s or 1990s anime characters, detailed interiors, city streets,
landscapes, machinery
dramatic close-ups with deliberate pixel clusters and hand-controlled
patterned shading

## Density
high pictorial detail with compact interface chrome; each dialogue page
short, command lists narrow
selection state unmistakable; use the `*-sm` component size variants for
compact working density

## Motion
sparse stepped character frames, blinking cursors, paced text crawl, palette
cycling
hard scene wipes
small status changes instead of modern smooth interpolation

## Shape
sharp pixel frames, one-pixel rules, inset status bands, tiled corners,
rectangular command windows
dithered shadow fields with no anti-aliased vector curves; `--radius-*` 0 or
0.25rem

## Typography
crisp Japanese-capable bitmap or monospace face at integer scale
preserving enough pixels for complex glyphs
dialogue and commands aligned to the native grid
Suggested: DotGothic16, IBM Plex Mono, M PLUS 1 Code, Pixelify Sans, Kosugi Maru

## Origins
hardware platform from 1982–2003; peak cultural influence in the 1980s–1990s
NEC personal computers in Japan
PC-98 refers to NEC's PC-9800 family, launched with the PC-9801 in 1982
and dominant in Japan's personal-computer market for much of the following
decade
high-resolution Japanese text display and game ecosystem encouraged detailed
dithered pixel art
dense menus, and distinctive typography
today's "PC-98 aesthetic" is a retrospective focus on that platform's visual
output
Sources: museum.ipsj.or.jp/en/computer/personal/0011.html
sts.kahaku.go.jp/english/material/2016pdf/no221.pdf