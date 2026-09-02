---
title: 'Template Astro Daisy — Production Starter Boilerplate'
description: 'A production-ready starter template pairing Astro 7, daisyUI 5, Tailwind CSS v4, and OKLCH theming with strict ESLint 10 standards.'
summary: 'Developer boilerplate combining Astro 7, Tailwind CSS v4, daisyUI 5, and automated linting pipelines.'
category: 'open-source'
tags:
  - astro
  - daisyui
  - tailwindcss
  - typescript
  - eslint
  - open-source
featured: false
year: 2024
role: 'Creator & Maintainer'
order: 7
publishDate: '2024-01-14'
liveUrl: 'https://github.com/sahillangoo/template-astro-daisy'
githubUrl: 'https://github.com/sahillangoo/template-astro-daisy'
---

## The Challenge

When bootstrapping new content-driven websites with modern UI libraries, developers frequently encounter friction points:

1. **Tooling Fragmentation**: Setting up Tailwind CSS v4 alongside daisyUI 5, ESLint 10 flat configs, Prettier Astro plugins, and strict TypeScript compiler settings requires dozens of delicate configuration files.
2. **Theme Jumps & Flash of Unstyled Content (FOUC)**: Naive client-side theme toggles cause noticeable white screen flashes on dark-mode page refreshes.
3. **Inconsistent Component Standards**: Absence of semantic UI patterns leads to duplicated inline utility classes and poor maintainability across pages.

---

## Architectural Solutions & Features

```
[Astro 7 SSG Core] ──> [Tailwind CSS v4 @ Vite] ──> [daisyUI 5 Semantic Tokens]
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
[OKLCH Theme Controller]             [ESLint 10 Strict Flat Config]
(Zero FOUC Inline Script)            (astro-eslint-parser + typescript-eslint)
```

### 1. Astro 7 + daisyUI 5 Semantic Design Tokens

Engineered an opinionated design architecture utilizing **daisyUI 5** component primitives styled with OKLCH color spaces. Provides curated dark (`editorialDark`) and light (`editorialLight`) themes mapped to semantic CSS custom properties.

### 2. Zero-FOUC Theme Controller

Implemented an inline theme initialization script that executes synchronously inside `<head>` before the DOM renders:

- Reads the user's stored preference from `localStorage` or queries `prefers-color-scheme`.
- Injects the appropriate `data-theme` attribute immediately, completely eliminating dark-mode screen flashes.

### 3. ESLint 10 Flat Configuration & Prettier Pipeline

Pre-configured with modern **ESLint 10 Flat Config** (`eslint.config.mjs`) featuring:

- `astro-eslint-parser` for strict Astro component syntax validation.
- `typescript-eslint` enforcing strict null checks and type safety.
- `prettier-plugin-astro` formatting code automatically on save.

### 4. Zero Layout Shift Navigation & Shell

Includes responsive navigation layouts with sticky headers, mobile drawer menus, and accessible command palettes maintaining a perfect **CLS = 0.00** score across all viewport sizes.
