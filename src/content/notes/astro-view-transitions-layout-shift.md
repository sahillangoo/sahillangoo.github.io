---
title: 'Eliminating Layout Shifts in Astro View Transitions'
description: 'How to avoid subtle 15px horizontal shifts and bounding box distortions when transitioning between static pages in Astro.'
publishDate: '2026-08-21'
topic: 'Astro & CSS'
tags:
  - astro
  - view-transitions
  - web-perf
  - css
order: 1
---

When implementing `<ClientRouter />` with Astro View Transitions, two common pitfalls cause jarring layout shifts on route changes:

### 1. The Scrollbar Gutter Pop (15px Horizontal Jump)

When navigating from a long page with a vertical scrollbar to a short page without one, the browser scrollbar disappears. This shifts the layout container by 15-17px to the right.

**Fix**: Always declare stable scrollbar gutters on `html`:

```css
html {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}
```

### 2. Viewport Scale Distortion

Avoid animating `transform: scale(0.995)` or `scale(1.005)` on `::view-transition-old(root)` or `::view-transition-new(root)`. Scaling the entire root viewport stretches and shrinks fixed elements (like headers and floating action buttons) during cross-fades.

**Fix**: Stick to clean, zero-scale opacity fades:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 160ms;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}

::view-transition-old(root) {
  animation-name: page-fade-out;
}
::view-transition-new(root) {
  animation-name: page-fade-in;
}

@keyframes page-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes page-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### 3. Header Persistence

Keep fixed navigational headers stationary by assigning a persistent transition directive:

```astro
<header id="site-header" transition:persist="main-header">
  <!-- Nav items -->
</header>
```
