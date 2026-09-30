```yaml
font: Orbitron + Share Tech Mono
font_stack: "Share Tech Mono, system-ui, sans-serif; headings: Orbitron, sans-serif"
radius: 0.25rem
moodboard: https://trends.daisyui.com/trend/fui-hud/
palette:
  light:
    background: 200 35% 96%
    foreground: 160 30% 12%
    primary: 150 60% 40%
    muted: 200 20% 90%
    border: 200 20% 80%
  dark:
    background: 220 45% 4%
    foreground: 150 30% 92%
    primary: 150 70% 50%
    muted: 220 30% 12%
    border: 220 25% 18%
```

# FUI / HUD

## Signature
telemetry readouts, targeting reticles, radial gauges, technical grids,
scanning lines
translucent overlays

## Suited for
science-fiction games, simulations, film experiences, defense-themed fiction
immersive installations

## Layout
wrap edge telemetry, radial instruments, and targeting data around a clear
central viewport
aligning every readout to an underlying technical grid

## Colors
- primary: dominant display color — cyan, amber, or green
- secondary: second restrained readout hue
- base-100 → base-300: stepped from deep blue-black to near-black
- translucent cyan, amber, or green layered over deep blue-black; red reserved
  for lock, danger
  or failure states with strict semantic meaning

## Imagery
maps, wireframes, schematics, thermal feeds, orbital plots
scanned subjects integrated directly into the instrumentation

## Density
high visual density with three signal tiers
mission-critical values stay bright while secondary telemetry recedes
`*-sm` size variants preserve this compact working density

## Motion
scanning sweeps, gauge interpolation, targeting locks, waveform motion
brief data ticks tied to simulated system events

## Shape
reticles, angular brackets, clipped polygons, segmented rings
thin technical linework rather than conventional cards; `--radius-*` between
0 and 0.25rem

## Typography
condensed uppercase technical type for headings; monospaced numerals for data
wide tracking only for short labels
Suggested: Orbitron, Oxanium, Chakra Petch, Rajdhani, Share Tech Mono

## Origins
military precedents before World War II; screen-fiction boom from the late
20th century
aviation instrumentation
film, television, and game production; HUD graphics descend from pre-WWII
reflector gunsights
and postwar aviation head-up displays; FUI is a later screen-design practice
that adapted radar
cockpit, medical, and industrial readouts into readable dramatic props
communicating story as
much as plausible operation
Sources: ntrs.nasa.gov (Head-up display research),
wikipedia.org/wiki/Head-up_display