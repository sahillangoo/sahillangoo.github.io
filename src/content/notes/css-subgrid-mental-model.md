---
title: 'CSS Subgrid Mental Model'
description: 'Align card headers, bodies, and footers across independent grid tracks without layout hacks.'
publishDate: '2024-09-14'
topic: 'CSS'
tags: ['CSS', 'Subgrid', 'Layout']
order: 2
---

A recurring design problem in responsive web development is aligning internal card components (headers, metadata badges, body excerpts, and call-to-action footers) across sibling cards in a multi-column row. When titles span varying line counts, traditional flexbox layouts push footers to the bottom using `margin-top: auto`, but internal elements across neighboring cards remain unevenly aligned.

CSS Subgrid solves this layout issue by allowing nested grid items to inherit and participate directly in the tracks defined on their parent grid container.

### The Two-Level Grid Structure

Instead of creating isolated, independent flex columns inside each card, configure the parent grid with explicit row patterns, then instruct child cards to span those rows while delegating row sizing to the parent:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* Three rows per card row: header, body, footer */
  grid-auto-rows: auto 1fr auto;
  gap: 1.5rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

### Why This Outperforms Flexbox

1. **Semantic HTML preservation**: You do not need artificial container `div` wrappers or synchronized JavaScript `ResizeObserver` calculations.
2. **Unified track sizing**: If card one has a two-line title while card two has a single-line title, the parent grid track expands to accommodate the tallest header. All sibling cards in that row align to that exact track boundary.
3. **Progressive enhancement**: Browsers lacking subgrid support can fall back gracefully via `@supports not (grid-template-rows: subgrid)` to standard flex columns with `display: flex; flex-direction: column`.

Subgrid turns nested component composition into a clean, declarative layout tree without JavaScript overhead.
