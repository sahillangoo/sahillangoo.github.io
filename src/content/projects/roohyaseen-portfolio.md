---
title: 'Rooh Yaseen Editorial Cinematography Showcase'
description: 'An ultra-minimalist, high-contrast cinematography & photography portfolio built for UK Director of Photography Rooh Yaseen.'
summary: 'Editorial luxury portfolio website with Facade video embedding, zero CLS, and bespoke OKLCH dark theme.'
category: 'web-app'
tags:
  - astro
  - tailwindcss
  - lenis
  - motion
  - zod
  - cloudflare-pages
featured: false
year: 2024
role: 'Creative Technologist & Lead Engineer'
order: 9
publishDate: '2024-08-15'
liveUrl: 'https://roohyaseen.com'
githubUrl: 'https://github.com/SquadCoders/roohyaseen-portfolio'
---

## The Challenge

UK Director of Photography Rooh Yaseen (_Wolf of Watford_, Apple TV, commercial filmography) required a digital portfolio that reflected the uncompromising aesthetic quality of cinematic film.

Typical portfolio themes fail on three fronts:

1. Video embeds (YouTube/Vimeo iframes) destroy Core Web Vitals by downloading 3MB+ of third-party player code before the user clicks play.
2. High-resolution imagery triggers visible layout shifts (CLS) as files decode.
3. Heavy animation libraries create micro-stuttering on mobile screens.

---

## Architectural Solutions

```
[Static Editorial Canvas] ──> [Facade Video Placeholder] ──(Click)──> [Async iframe Stream]
                                         │
                                         ▼
                            [0.00 CLS / 0ms Initial TBT]
```

### 1. Facade Pattern for Video Embeds

Implemented a high-performance video facade pattern. Videos render as crisp, pre-compressed WebP poster frames with hardware-accelerated SVG play triggers. The heavy video `<iframe>` executes only upon explicit user click, saving 4.2MB of payload per page load and keeping Total Blocking Time (TBT) at 0ms.

### 2. Obsidian OKLCH Color Architecture

Developed a luxury dark color space using OKLCH math (`#0A0A0B` obsidian canvas, `#F4F4F5` crisp chalk text, muted warm zinc borders), completely eliminating noisy neon accents and gradient text tropes.

### 3. Hardware-Accelerated Kinetic Scrolling

Configured a custom **Lenis** smooth scroll engine synchronized with Astro View Transitions, delivering smooth 60fps kinetic scrolling without hijacking native browser accessibility.

### 4. Zero Layout Shift Guarantee (CLS = 0.00)

All dynamic image and video frames declare explicit CSS `aspect-ratio` containers (`16/9`, `4/5`, `1/1`), ensuring fluid responsiveness with zero layout shifts during image hydration.
