```yaml
font: Press Start 2P + Pixelify Sans
font_stack: "Pixelify Sans, system-ui, sans-serif; headings: Press Start 2P, sans-serif"
radius: 0
moodboard: https://trends.daisyui.com/trend/pixel-art/
palette:
  light:
    background: 0 0% 95%
    foreground: 225 35% 16%
    primary: 355 65% 47%
    secondary: 150 55% 45%
    border: 225 30% 30%
  dark:
    background: 235 35% 12%
    foreground: 200 40% 88%
    primary: 355 60% 52%
    secondary: 150 50% 48%
    border: 225 30% 28%
```

# Pixel Art

## Signature
pixel grid, limited palette, bitmap icons, blocky typography, hard-edged sprites
low-resolution animation

## Suited for
games, developer portfolios, entertainment products, retro communities,
playful utilities

## Layout
align every panel and sprite to an integer pixel or tile grid; organize
controls like a game HUD
scale modules only by whole-number factors

## Colors
- primary: clearest action or protagonist swatch
- secondary: contrasting environment or status swatch
- base-100: one exact indexed panel value
- base-200: one exact indexed panel value
- base-300: one exact indexed panel value
- compact indexed palette with explicit light, midtone, shadow, and status colors
  disable smoothing, avoid accidental intermediate hues

## Imagery
sprites, tile maps, bitmap icons, dithered scenes
low-resolution portraits drawn at a consistent native scale

## Density
medium density through inventories, dialogue boxes, and HUD panels
each pixel icon given enough cells to stay recognizable

## Motion
authored frame sequences, stepped movement, palette swaps, sprite cycles
no smooth vector interpolation

## Shape
hard stair-stepped edges, tiled borders, pixel corners
block-built silhouettes with no anti-aliased curves
`--radius-*` set to `0` or `0.25rem`

## Typography
bitmap face designed for the target resolution; integer sizes
all-caps arcade lettering reserved for short labels
Suggested: Press Start 2P, Pixelify Sans, Silkscreen, Tiny5, Jersey 10

## Origins
1970s roots; term documented in 1982
Origin: computer research labs, arcade games, early home computers
Artists built images pixel by pixel by the early 1970s
including work on Richard Shoup's SuperPaint system
the term "pixel art" was published by Xerox PARC researchers Adele Goldberg
and Robert Flegal in 1982
limited display resolution made the method central to games
while later designers preserved the visible grid as an intentional style
Sources: en.wikipedia.org