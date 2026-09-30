```yaml
font: Roboto
font_stack: "Roboto, system-ui, sans-serif"
radius: 1rem
moodboard: https://trends.daisyui.com/trend/material-design/
palette:
  light:
    background: 222 30% 97%
    foreground: 225 35% 15%
    primary: 265 55% 45%
    muted: 222 20% 93%
    border: 222 18% 88%
  dark:
    background: 226 45% 8%
    foreground: 210 30% 96%
    primary: 265 60% 65%
    muted: 226 30% 18%
    border: 226 30% 20%
```

# Material Design

## Signature
dynamic color schemes, tonal surface hierarchy, large rounded containers,
pill-shaped controls
floating action buttons, segmented buttons, bottom navigation, state layers,
icon-led controls
contrasting shape families, oversized display type, spring-based transitions

## Suited for
Android apps, Google-style products, cross-platform productivity tools,
consumer services
dashboards
settings interfaces, accessible apps needing a comprehensive component system

## Layout
responsive panes, containers, navigation regions,
and predictable component patterns rather than decorative composition; spacing
and surface roles group related content; strong touch targets; navigation and
columns adapt
to available width; primary actions stay prominent
expressive screens may use controlled asymmetry and overlapping forms

## Colors
- coordinated tonal palettes generated from one or more source colors; semantic
  roles: primary
  secondary, tertiary, surface, container, outline, error
- hierarchy via tonal surface changes rather than heavy shadows
- token mapping: `primary` = source-color family, `secondary` = its
  lower-chroma companion
  `base-100`/`base-200`/`base-300` = three progressively deeper source-tinted surface tones
- `--depth: 1`

## Imagery
imagery inside clearly shaped, cropped, or edge-aligned containers that
participate in layout
approachable photography, bold illustrations, product imagery, simple graphic
compositions
crops coordinated with curves, typography, and tonal surfaces; readable overlays
and accessible contrast

## Density
medium density with comfortable spacing, large touch targets, clearly
separated interaction zones
data-heavy contexts use compact component variants and responsive panes
never shrink controls or collapse hierarchy just to fit more content

## Motion
explains navigation, state changes, container transformations, selection,
spatial relationships
shared-axis transitions, shape morphing, expanding containers, fading state
layers
spring-like coordinated acceleration and deceleration
expressive variants may use greater overshoot
and rhythmic sequencing while routine interactions stay restrained

## Shape
rounded rectangles, capsules, circles, selectively contrasting geometric or
organic silhouettes
corner families applied systematically to communicate hierarchy, emphasis,
grouping
interaction state
`--radius-*` between 0.75rem and 1.5rem

## Typography
role-based type scale for display, headline, title, body, label — each role
defining size
weight, line height
tracking; weight and scale rather than excessive decoration
labels aligned closely with controls; variable width
weight, or emphasized display for expressive moments
Suggested: Roboto, Roboto Flex, Noto Sans, Roboto Serif, Roboto Mono

## Origins
2012 research, public launch 2014; Google, California
screen treated as layered responsive paper governed by light, shadow, motion,
and consistent cross-device behavior
later generations expanded well beyond the first paper metaphor
Sources: design.google/library/material-design-launch-2014
design.google/library/material-design-eras