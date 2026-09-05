---
title: 'Configuring Custom OKLCH Themes with DaisyUI 5 and Tailwind CSS v4'
description: 'How to construct accessible, high-contrast dark and light themes using OKLCH color space and CSS @plugin directives in Tailwind v4.'
publishDate: '2026-08-19'
topic: 'Design Systems'
tags:
  - daisyui
  - tailwindcss
  - oklch
  - css
order: 2
---

Tailwind CSS v4 introduces CSS-first configuration via `@import "tailwindcss";` and `@plugin "daisyui"`. In DaisyUI 5, custom themes are defined directly in CSS using `@plugin "daisyui/theme"`.

### Modern OKLCH Theme Definition

```css
@import 'tailwindcss';
@plugin 'daisyui' {
  themes:
    editorialDark --default,
    editorialLight;
}

@plugin 'daisyui/theme' {
  name: 'editorialDark';
  default: true;
  prefersdark: true;
  color-scheme: dark;

  /* Deep Obsidian Background & Slate Panels */
  --color-base-100: #0c0d0f;
  --color-base-200: #141619;
  --color-base-300: #24272c;
  --color-base-content: #f4f4f6;

  /* Accent & Foreground */
  --color-primary: #f4f4f6;
  --color-primary-content: #0c0d0f;
  --color-accent: #38bdf8;
  --color-accent-content: #0c0d0f;

  /* Accessible Semantic Feedback Tokens */
  --color-success: oklch(65% 0.16 150);
  --color-error: oklch(60% 0.22 28);
  --color-warning: oklch(78% 0.15 75);

  --radius-box: 0.5rem;
  --border: 1px;
}
```

### Key Principles

1. **Perceptual Uniformity**: OKLCH keeps perceived lightness consistent across hues, preventing dark mode yellow from appearing brighter than dark mode blue.
2. **60-30-10 Rule**: 60% dominant base canvas (`--color-base-100`), 30% surface cards (`--color-base-200`/`300`), 10% purposeful accent (`--color-accent`).
