```yaml
font: DotGothic16 + IBM Plex Mono
font_stack: "IBM Plex Mono, system-ui, sans-serif; headings: DotGothic16, sans-serif"
radius: 0.25rem
moodboard: https://trends.daisyui.com/trend/rpg-pixel-art/
palette:
  light:
    background: 210 45% 88%
    foreground: 235 40% 18%
    primary: 0 65% 50%
    secondary: 175 55% 32%
    border: 235 20% 65%
  dark:
    background: 250 35% 8%
    foreground: 45 35% 90%
    primary: 0 70% 55%
    secondary: 175 60% 50%
    border: 235 25% 32%
```

# RPG Pixel Art

## Signature
top-down tile maps, party sprites, ornate dialogue boxes, inventory grids,
fantasy item icons
turn-based battle effects

## Suited for
games, interactive storytelling, fantasy products, game communities, gamified
learning
playful progress trackers

## Layout
explorable tile map or battle stage as the main canvas; dialogue, commands,
party status
and inventory attached to predictable perimeter panels that preserve the
current scene

## Colors
- primary: party or interaction highlight
- secondary: spell-school or biome counter-color
- base-100: exact dark menu-panel swatch
- base-200: exact dark menu-panel swatch
- base-300: exact dark menu-panel swatch
- compact color ramps per biome, material, character, and spell school
  clearest contrasts reserved for party members, interactable objects, health, and status

## Imagery
chibi or small-proportion character sprites, repeatable terrain tiles,
monsters, item icons
portraits
spell effects at one coherent pixel density and perspective

## Density
medium scene density, high menu density; walkable routes, targets, selections
and party state stay instantly distinguishable pixel clusters
use `*-sm` daisyUI size variants to preserve compact working density

## Motion
authored walk cycles, battle anticipation and impact frames, stepped damage
numbers
palette flashes, spell bursts
short victory poses

## Shape
repeatable square tiles; menus with pixel corners, inset borders, inventory
slots, health bars
small heraldic ornaments; `--radius-*` set to `0` or `0.25rem`

## Typography
highly legible bitmap face at integer scale; generous dialogue line height
compact capitals for commands, stats
and item abbreviations
Suggested: Micro 5, DotGothic16, Silkscreen, Pixelify Sans, IBM Plex Mono

## Origins
1980s–1990s game roots; continuing revival
Origin: Japanese and Western computer and console role-playing games
A genre-specific branch of pixel art, not a separate movement; memory, palette
and resolution limits in 1980s and 1990s RPGs encouraged tile maps, sprite
sheets, icon inventories
dialogue windows, and compact status panels
contemporary UI reuses that grammar even when hardware no longer requires it
Sources: en.wikipedia.org, museumofplay.org