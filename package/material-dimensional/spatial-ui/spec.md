```yaml
font: Manrope
font_stack: "Manrope, system-ui, sans-serif"
radius: 1rem
moodboard: https://trends.daisyui.com/trend/spatial-ui/
palette:
  light:
    background: 220 25% 93%
    foreground: 224 30% 22%
    primary: 215 95% 49%
    muted: 220 20% 90%
    border: 220 20% 86%
  dark:
    background: 225 25% 12%
    foreground: 215 25% 93%
    primary: 215 95% 62%
    muted: 225 20% 20%
    border: 225 18% 26%
```

# Spatial UI

## Signature
floating panels, depth hierarchy, environmental anchoring, gaze affordances,
gesture targets
volumetric spacing

## Suited for
AR, VR, mixed reality, spatial computing, training, immersive collaboration

## Layout
panels anchored at comfortable depth along a gentle viewing arc
essential controls within easy gaze range
no content stacked along the same sightline

## Colors
- environment-aware neutral materials with luminous focus rings
- opacity and contrast adapt as the real or rendered background changes
- token mapping: `primary` = luminous focus blue, `secondary` = soft violet or
  teal
  `base-100`/`base-200`/`base-300` = adaptive neutral glass, smoke,
  and shadow tones with dependable text contrast
- `--depth: 1`

## Imagery
volumetric models, stereoscopic media, panoramic environments
spatial annotations with clear scale and occlusion cues

## Density
each plane kept sparse; gesture and gaze targets enlarged
complex workflows distributed across depth or progressive steps

## Motion
objects move through depth with stable world anchoring; gaze-responsive focus
and gentle spring placement
no camera-relative jitter

## Shape
rounded floating plates, volumetric buttons, soft focus halos
handles whose depth and orientation reveal how they can be manipulated
`--radius-*` between 0.75rem and 1.5rem

## Typography
high-x-height sans-serif; text sized for physical viewing angle rather than
pixels
no long paragraphs on distant or curved planes
Suggested: Inter, Sora, Manrope, Roboto Flex, Noto Sans

## Origins
research lineage from the early 2000s; consumer platform launch 2023–2024
human-computer interaction research and mixed-reality platforms
researcher Simon Greenwold used "spatial computing" in an MIT thesis in 2003
Apple mainstreamed the term with Vision Pro in 2023 and formalized windows,
volumes
immersive spaces, gaze
gesture, and depth for visionOS
Sources: developer.apple.com/design/human-interface-guidelines/spatial-layout
apnews.com/article/7ec545a42403cf12e799200864e47d94