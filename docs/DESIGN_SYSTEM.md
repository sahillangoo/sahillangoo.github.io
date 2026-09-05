# DESIGN_SYSTEM.md — Design Tokens, Typography, Layout & Aesthetics

This document specifies the authoritative design system, OKLCH color palettes, typography scale, 4-tier layout architecture, component sizing hierarchy, spacing rhythms, icon dimensions, and tactile micro-interaction rules for the **Sahil Langoo Portfolio**.

---

## 1. Design Philosophy: "Less, But Better"

- **Minimalist Editorial Theme**: Obsidian dark mode by default (`editorialDark`) with high-contrast crisp foreground typography and warm paper light mode (`editorialLight`).
- **No Over-Engineering**: Avoid gratuitous animations (>300ms), avoid gradient text fills on headlines, avoid neon border glows, and avoid layout shifts.
- **60:30:10 Color Rule**: 60% dominant background canvas (`base-100`), 30% structural card surfaces & borders (`base-200` / `base-300`), 10% purposeful accent highlights (`accent`).
- **Micro-Interactions**: Subtle scale press state (`scale(0.98)` to `scale(0.99)` on `:active` with `cubic-bezier(0.23, 1, 0.32, 1)`) for all buttons and interactive cards.
- **Zero Layout Shifts (CLS = 0.00)**: Persistent `scrollbar-gutter: stable`, fixed navigation header with `transition:persist="main-header"`, explicit aspect ratios on all media/icons, and pure opacity view transitions.

---

## 2. OKLCH Theme Tokens (`src/styles/global.css`)

The portfolio uses Tailwind CSS v4 `@theme` and daisyUI 5 CSS variables mapped to calibrated OKLCH color spaces:

| Token Name               | DaisyUI Class              | `editorialDark` (Obsidian Default) | `editorialLight` (Paper Minimal) | Role                           |
| :----------------------- | :------------------------- | :--------------------------------- | :------------------------------- | :----------------------------- |
| **Canvas**               | `bg-base-100`              | `#0c0d0f` (Obsidian Canvas)        | `#fafafa` (Paper Canvas)         | Page background                |
| **Card Surface**         | `bg-base-200`              | `#141619` (Graphite Surface)       | `#f4f4f5` (Card Surface)         | Card & module container        |
| **Borders & Dividers**   | `border-base-300`          | `#24272c` (Steel Border)           | `#e4e4e7` (Muted Divider)        | Structural borders & lines     |
| **Primary Typography**   | `text-base-content`        | `#f4f4f6` (Crisp Chalk)            | `#09090b` (Deep Charcoal)        | Primary headlines & body text  |
| **Secondary Typography** | `text-base-content/75`     | `#9aa0a6` (Slate Muted)            | `#52525b` (Muted Charcoal)       | Descriptions, bios, subtitles  |
| **Muted Metadata**       | `text-base-content/60`     | `#71717a` (Zinc 500)               | `#71717a` (Zinc 500)             | Timestamps, dates, labels      |
| **Accent / Brand**       | `text-accent`, `bg-accent` | `#38bdf8` (Calibrated Sky Cyan)    | `#0284c7` (Deep Sky Blue)        | Eyebrows, active links, badges |

---

## 3. Typography Design System Architecture

### Font Stacks & Astro Font Provider Architecture

Fonts are managed using the **Astro Font Provider API** (`astro/config` with `fontProviders.google()`), self-hosted and preloaded with zero third-party network blocking:

- **Primary Sans Font**: `var(--ff-sans)` (`'Plus Jakarta Sans'`) with `font-display: swap`, weights `[400, 500, 600, 700, 800]`, and automatic Capsize zero-CLS fallback metrics.
  - OpenType features: `font-feature-settings: "cv02", "cv03", "cv04", "cv11", "ss01", "ss02"` (curved alternates, balanced figures, legible glyphs).
  - Body tracking: `-0.011em` (`letter-spacing: -0.011em`) with `line-height: 1.65` and `text-wrap: pretty`.
  - Max readable line length: `65–75ch`.
- **Monospace Code & Telemetry**: `var(--ff-mono)` (`'JetBrains Mono'`) with `font-display: swap`, weights `[400, 500, 600]`, and monospace fallback metrics.
  - OpenType features: `font-feature-settings: "calt", "zero", "liga"` (slashed zero, contextual code ligatures).

### Typographic Scale Hierarchy

| Element                   | Tailwind & DaisyUI Classes                                                                                          | Line Height / Kerning                 | Usage                            |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------ | :------------------------------- |
| **Section Eyebrow**       | `text-accent font-mono text-xs font-semibold tracking-widest uppercase`                                             | `tracking-widest`                     | Section label across all pages   |
| **Hero Display Headline** | `text-base-content text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl`                                  | `leading-tight`, `-0.025em`           | Homepage hero headline           |
| **Page Title (h1)**       | `text-base-content text-2xl font-bold tracking-tight sm:text-3xl`                                                   | `leading-tight`, `text-wrap: balance` | Standard sub-page title          |
| **Article Title (h1)**    | `text-base-content text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl`                                       | `leading-tight`, `text-wrap: balance` | Blog post & project case study   |
| **Lead / Summary**        | `text-base-content/80 text-base leading-relaxed sm:text-lg`                                                         | `leading-relaxed` (1.65)              | Lead bio, post description       |
| **Section Heading (h2)**  | `text-base-content text-xl font-bold tracking-tight sm:text-2xl`                                                    | `leading-snug`, `-0.025em`            | Major page sections              |
| **Card Heading (h2/h3)**  | `text-base-content group-hover:text-accent text-lg sm:text-xl font-bold tracking-tight transition-colors`           | `leading-snug`                        | Project, article, and note cards |
| **Monospace Badges**      | `bg-accent/10 text-accent rounded px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider uppercase`           | `tracking-wider`                      | Category, topic, status chips    |
| **Action Buttons**        | `btn bg-base-content text-base-100 hover:bg-base-content/90 font-mono text-xs font-medium tracking-wider uppercase` | `tracking-wider`                      | Primary & secondary CTA buttons  |

---

## 4. Layout Architecture & 4-Tier Container System

The portfolio enforces a unified 4-tier horizontal container hierarchy to ensure visual balance:

```
┌────────────────────────────────────────────────────────────┐
│ Tier 1: Multi-Column Catalog & Showcase (max-w-6xl = 1152px)│
│ Used by: Home (/), Projects (/projects/), Notes (/notes/)  │
└────────────────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│ Tier 2: Standard Editorial Pages (max-w-4xl = 896px)       │
│ Used by: About, Contact, Resume, Uses, Now, Colophon,      │
│          Blog Listing, Category/Tag Archives, Project Detail│
└────────────────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│ Tier 3: Long-Form Reading Columns (max-w-3xl = 768px)       │
│ Used by: Blog Article (/blog/[slug]), Note Detail (/notes/)│
└────────────────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│ Tier 4: Utility & Standalone Views (max-w-lg / max-w-md)   │
│ Used by: Links Portal (/links/ = max-w-lg), 404 (max-w-md) │
└────────────────────────────────────────────────────────────┘
```

### Page Outer Padding Standards

- **Horizontal Outer Padding**: `px-4 sm:px-6` (declared on all page wrappers, headers, and footers).
- **Vertical Page Padding**: `py-8 sm:py-12` (standard content sub-pages); `py-24` (404 error page).
- **Header Top Offset**: `pt-20 md:pt-24` in `src/layouts/BaseLayout.astro` for non-obtrusive sticky navbar clearance.

---

## 5. Spacing Scale, Margins & Section Rhythms

| Rhythm Context              | Tailwind Classes                                       | Purpose                           |
| :-------------------------- | :----------------------------------------------------- | :-------------------------------- |
| **Homepage Major Sections** | `space-y-20 sm:space-y-24`                             | Generous editorial breathing room |
| **Standard Page Sections**  | `space-y-10 sm:space-y-12`                             | Sub-page section vertical cadence |
| **Detail Page Header**      | `space-y-4 border-b border-base-300 pb-8`              | Article & case study header block |
| **2-Column Bento Grid**     | `grid grid-cols-1 gap-6 sm:grid-cols-2`                | Principles, uses, projects grid   |
| **3-Column Garden Grid**    | `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3` | Digital garden notes catalog      |
| **Inline Chips / Pills**    | `flex flex-wrap items-center gap-2` or `gap-1.5`       | Tech tags, filter buttons, topics |

---

## 6. Component Sizing & 4-Tier Card Padding Scale

Cards compose pure Tailwind CSS utility classes directly in templates (`rounded-xl border border-base-300 bg-base-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 active:scale-99`) and apply padding from one of four standardized tiers:

| Tier                               | Padding Classes | Examples                                                                                           |
| :--------------------------------- | :-------------- | :------------------------------------------------------------------------------------------------- |
| **Tier A (Hero / Lead Modules)**   | `p-6 sm:p-8`    | `ContactForm.astro`, `Colophon` specs matrix, `Now` availability card, `About` connect banner      |
| **Tier B (Standard Entity Cards)** | `p-6 sm:p-7`    | `ProjectCard.astro`, `ArticleCard.astro`, `GitHubActivityWidget.astro`, `ExperienceTimeline.astro` |
| **Tier C (Compact Detail Cards)**  | `p-5 sm:p-6`    | `NoteCard.astro`, `About` skill categories, `Uses` equipment cards, `Links` social items           |
| **Tier D (Dense Micro Modules)**   | `p-3 sm:p-4`    | `SpotifyWidget.astro`, `TimeAvailabilityWidget.astro`, Pagination controls                         |

---

## 7. 4-Tier Icon Sizing Token Matrix

All icons use Phosphor icons (`astro-icon` with `ph:*`) in bold weight for consistent visual stroke weight:

| Icon Tier       | Dimension Classes     | Pixel Size | Usage Context                                                                                                                             |
| :-------------- | :-------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Micro**       | `h-3.5 w-3.5`         | 14px       | Inline action arrows (`ph:arrow-right-bold`), external link indicators (`ph:arrow-up-right-bold`), verified badge icons, RSS icon         |
| **Standard UI** | `h-4 w-4`             | 16px       | Action buttons, search trigger (`ph:magnifying-glass-bold`), theme/audio toggle icons (`ph:sun-bold`, `ph:moon-bold`), live clock/weather |
| **Prominent**   | `h-5 w-5`             | 20px       | Mobile drawer open/close (`ph:list-bold`, `ph:x-bold`), audio player play/pause button, GitHub commit stream icon                         |
| **Display**     | `h-6 w-6` / `h-8 w-8` | 24px–32px  | Principle cards icon anchors, initials brand avatar                                                                                       |

---

## 8. Tailwind CSS & DaisyUI Utility Reference

### Standard Button Styles

```html
<!-- Primary Editorial Button -->
<a
  href="/projects/"
  class="btn bg-base-content text-base-100 hover:bg-base-content/90 hover:text-base-100 flex items-center gap-2 rounded-md border-0 px-4 font-mono text-xs font-medium tracking-wider uppercase"
>
  <span>Explore Work</span>
  <Icon name="ph:arrow-right-bold" class="h-3.5 w-3.5" />
</a>

<!-- Secondary Outline Button -->
<a
  href="/resume/"
  class="btn btn-outline border-base-300 hover:bg-base-200 text-base-content flex items-center gap-2 rounded-md font-mono text-xs font-medium tracking-wider uppercase"
>
  <Icon name="ph:file-text-bold" class="h-4 w-4" />
  <span>View Resume</span>
</a>
```

### Standard Category / Status Badge

```html
<!-- Accent Monospace Chip -->
<span
  class="bg-accent/10 text-accent rounded px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider uppercase"
>
  Full Stack Architecture
</span>

<!-- Status Indicator Pill -->
<div
  class="border-base-300 bg-base-200 text-base-content/80 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs"
>
  <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
  <span>Available for select projects</span>
</div>
```

## 9. Zero-Arbitrary-Value Policy & Semantic Token Scale

Arbitrary Tailwind classes (e.g. `text-[11px]`, `w-[320px]`, `scale-[0.99]`, `left-[-31px]`) are **strictly prohibited**. They fragment the design system, bloat generated CSS, and create visual inconsistencies across components.

### Semantic Scale Substitutions

All arbitrary values must use either Tailwind standard scales or our formalized `@theme` tokens in `src/styles/global.css`:

| Deprecated Arbitrary Class               | Semantic Utility                         | Origin / Rationale                                                         |
| :--------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------- |
| `text-[11px]`                            | `text-2xs`                               | Formalized `@theme` micro-typography token (11px / 14px line-height).      |
| `text-[10px]`, `text-[9px]`              | `text-3xs`                               | Formalized `@theme` badge/telemetry token (10px / 12px line-height).       |
| `scale-[0.99]`                           | `scale-99`                               | Formalized `@theme` tactile press state (`active:scale-99`).               |
| `h-[10px]`, `w-[10px]`                   | `h-2.5`, `w-2.5`                         | Standard Tailwind scale (2.5 * 4px = 10px).                                |
| `h-[11px]`, `w-[11px]`                   | `h-3`, `w-3`                             | Standard Tailwind scale (3 * 4px = 12px).                                  |
| `h-[2px]`                                | `h-0.5`                                  | Standard Tailwind scale (0.5 * 4px = 2px).                                 |
| `w-[2.5px]`                              | `w-0.5`                                  | Standard Tailwind scale (2px bar width).                                   |
| `gap-[2px]`, `gap-[3px]`                 | `gap-0.5`                                | Standard Tailwind scale (2px grid gap).                                    |
| `rounded-[2px]`                          | `rounded-xs`                             | Tailwind v4 standard micro-radius (2px).                                   |
| `max-h-modal`                            | `max-h-modal`                            | Formalized `@theme` modal viewport height constraint (80vh).               |
| `min-w-[700px]`                          | `min-w-max`                              | Semantic intrinsic sizing for wide content tables/heatmaps.                |
| `left-[-31px]`, `md:left-[-39px]`        | `-left-8`, `md:-left-10`                 | Exact mathematical centering of 16px dot on `pl-6` (24px) / `pl-8` (32px). |
| `text-github-active`, `bg-github-active` | `text-github-active`, `bg-github-active` | Formalized `@theme` semantic contribution matrix green.                    |
| `animate-[equalizer_...]`                | `animate-equalizer`                      | Formalized `@theme` keyframe animation token.                              |
