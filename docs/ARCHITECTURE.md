# ARCHITECTURE.md — Technical Architecture & Systems Guide

This document specifies the technical architecture, technology stack, directory conventions, and operational patterns for the **Sahil Langoo Personal Portfolio & Engineering Journal**.

---

## 1. Core Principles

- **Zero-JS by Default**: Static Site Generation (SSG) via Astro 7.2. Client-side JavaScript is shipped only for essential interactions (e.g. Lenis smooth scrolling singleton, theme toggle, and mobile menu).
- **Zero Layout Shifts (CLS = 0.00)**: All image containers, SVG vector icons, and typography blocks declare explicit dimensions and aspect ratios. The `html` element enforces `scrollbar-gutter: stable` and `overflow-y: scroll` to eliminate horizontal page width jumps across route transitions.
- **Persistent Header View Transitions**: `<ClientRouter />` cross-fades page bodies while keeping the fixed `<header id="site-header" transition:persist="main-header">` docked in place.
- **Predictable Type Safety**: Strict TypeScript compiler options with comprehensive path aliases (`@/*`, `@components/*`, `@content/*`) and compile-time schema validation with Zod.
- **Supply-Chain Integrity**: Exclusive use of `pnpm` (v11+) with locked package scripts and explicit `allowBuilds` in `pnpm-workspace.yaml`.

---

## 2. Technology Stack

| Layer                         | Technology             | Details                                                                                                |
| :---------------------------- | :--------------------- | :----------------------------------------------------------------------------------------------------- |
| **Framework**                 | Astro `v7.2.x`         | Static SSG mode (`output: 'static'`), Content Collections loader API, and View Transitions router.     |
| **Styling**                   | Tailwind CSS `v4.3.x`  | `@tailwindcss/vite` plugin with `@tailwindcss/typography`.                                             |
| **UI Component Library**      | daisyUI `v5.7.x`       | Curated OKLCH semantic theme tokens (`editorialDark` and `editorialLight`) + `swap swap-rotate`.       |
| **Icons & Media**             | `astro-icon` + Iconify | Phosphor (`ph:*`) and Line MD (`line-md:*`) SVG icons with zero layout shift.                          |
| **Smooth Scrolling & Motion** | `lenis`                | Persistent singleton on `window` synchronized with `astro:after-swap` and `astro:page-load`.           |
| **Schema Validation**         | `astro:content` + Zod  | Schema validation across 9 case studies, 7 blog essays, and 7 garden notes in `src/content.config.ts`. |
| **Linter & Formatter**        | ESLint 10 + Prettier   | Flat configuration with `astro-eslint-parser`, `typescript-eslint`, and `eslint-plugin-lockfile`.      |
| **Edge Host**                 | Cloudflare Pages       | Global edge CDN deployment via `wrangler` and custom `_headers` / `_redirects`.                        |

---

## 3. Directory Layout

```
sahillangoo-portfolio/
├── docs/                   # Architectural, design, and content documentation
│   ├── ARCHITECTURE.md
│   ├── CONTENT_MODEL.md
│   ├── DESIGN_SYSTEM.md
│   ├── QUALITY_GATES.md
│   └── RESEARCH_NOTES.md
├── public/                 # Static assets, Cloudflare headers/redirects, robots, llms.txt
│   ├── _headers
│   ├── _redirects
│   ├── favicon.svg
│   ├── llms.txt
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/         # Layout & shell UI (NavigationBar, SeoHead, SiteFooter, ThemeToggle, CommandPalette, BackToTop)
│   │   └── portfolio/      # Domain UI (ProjectCard, ArticleCard, NoteCard, GitHubActivityWidget, ExperienceTimeline, ContactForm)
│   ├── const/              # Site constants & social URLs (`src/const/site.ts`)
│   ├── content/            # Markdown & JSON collections (`projects/`, `blog/`, `notes/`, `experience/`, `site/`, `links/`)
│   ├── layouts/            # BaseLayout with SEO, Lenis smooth scrolling, and View Transitions router
│   ├── plugins/            # Native Astro integrations (`astro-site-quality.ts`)
│   ├── styles/              # Global CSS and daisyUI OKLCH theme configuration
│   └── pages/              # 35 static routes (/, /projects/, /blog/, /notes/, /resume/, /about/, /contact/, /now/, /uses/, /colophon/, /links/, /404/)
├── astro.config.mjs        # Astro configuration & integrations
├── eslint.config.mjs       # ESLint 10 flat configuration
├── package.json            # Manifest & scripts
├── pnpm-workspace.yaml     # Package manager & build policy enforcement
├── tsconfig.json           # TypeScript strict settings & path aliases
└── wrangler.toml           # Cloudflare Pages deployment definition
```

---

## 4. Build-Time Quality Enforcer (`astro-site-quality.ts`)

A zero-dependency custom Astro integration hooks into the Vite and Astro build lifecycle:

1. **`buildStart`**: Audits all image references in Markdown/Astro files to guarantee target assets physically exist in `public/` or `src/assets/`.
2. **`astro:build:done`**: Scans all compiled HTML files in `dist/` to verify every internal link (`href`) resolves to a generated static route, failing the build immediately on any 404 or trailing slash mismatch.
