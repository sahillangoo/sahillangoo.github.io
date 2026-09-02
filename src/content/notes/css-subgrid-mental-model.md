---
title: 'CSS Subgrid Mental Model'
description: 'Align card headers and footers across independent grid tracks without layout hacks.'
publishDate: '2024-09-14'
topic: 'CSS'
tags: ['CSS', 'Subgrid', 'Layout']
order: 2
---

CSS `grid-template-rows: subgrid` allows child elements inside grid items to align with the parent grid tracks:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

Now all headers, body excerpts, and action buttons align horizontally across every card in a row, regardless of text length.
