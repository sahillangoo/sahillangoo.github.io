---
title: 'Why OKLCH is Superior for UI Color Systems'
description: 'Perceptual uniformity in modern web design and predictable contrast accessibility.'
publishDate: '2024-07-22'
topic: 'Design Engineering'
tags: ['CSS', 'OKLCH', 'Color', 'A11y']
order: 3
---

Unlike HSL or RGB, OKLCH aligns with human visual perception:

- **Lightness (L)**: 0% is true black, 100% is pure white. Two colors with the same Lightness value have identical perceived brightness across all hues.
- **Chroma (C)**: Controls saturation predictably without skewing contrast.
- **Hue (H)**: Angle (0–360) representing color family.

```css
:root {
  --color-primary: oklch(75% 0.18 260);
  --color-surface: oklch(20% 0.01 260);
}
```
