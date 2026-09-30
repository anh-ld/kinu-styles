```yaml
font: VT323 + Share Tech Mono
font_stack: "Share Tech Mono, system-ui, sans-serif; headings: VT323, sans-serif"
radius: 0
moodboard: https://trends.daisyui.com/trend/terminal-cli-ui/
palette:
  light:
    background: 120 25% 97%
    foreground: 150 30% 12%
    primary: 140 70% 35%
    muted: 120 20% 92%
    border: 150 20% 80%
  dark:
    background: 150 40% 4%
    foreground: 130 40% 88%
    primary: 140 80% 55%
    muted: 150 25% 12%
    border: 150 30% 20%
```

# Terminal / CLI UI

## Signature
monospace typography, command prompts, blinking cursor, phosphor glow, text logs
keyboard-first interaction

## Suited for
developer products, security tools, technical portfolios, games,
retro-computing experiences

## Layout
structure the screen as a command stream or split terminal panes
keep the active prompt anchored and obvious
preserve chronological output

## Colors
- primary: phosphor green or amber
- secondary: restrained cyan
- base-100: deep charcoal
- base-200: near-black
- base-300: true black
- plus restrained ANSI colors for errors, warnings, diffs, executable tokens

## Imagery
ASCII diagrams, pixel glyphs, code output, terminal captures
decorative graphics converted into text-native marks where possible

## Density
high vertical density with disciplined line height, stable indentation,
collapsible logs
visible command boundaries; use `*-sm` size variants

## Motion
cursor blink, prompt focus, type-on introductions, rapid output reveal
completed command results appear without theatrical delay

## Shape
rectangular panes, one-pixel borders, brackets, rules
text characters instead of rounded cards or floating controls; `--radius-*`
set to 0 or 0.25rem

## Typography
one legible monospace family, syntax distinguished through restrained color
and weight
columns aligned at every responsive width
Suggested: VT323, IBM Plex Mono, Share Tech Mono, Fira Code, Space Mono

## Origins
early 1960s–present; time-sharing computer laboratories in the US and Europe
CTSS at MIT (1961) widely identified as the first true CLI
Louis Pouzin introduced the shell concept and name on Multics (~1964)
the command-interpreter model later Unix terminals still echo
Sources: en.wikipedia.org/wiki/Command-line_interface