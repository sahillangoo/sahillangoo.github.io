# Sahil Langoo — Personal Portfolio & Engineering Journal

Ultra-fast, high-performance static website, digital garden, and engineering portfolio built with [Astro 7.2](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), [daisyUI 5](https://daisyui.com), and TypeScript. Deployed globally to [Cloudflare Pages](https://pages.cloudflare.com).

[![Live Site](https://img.shields.io/badge/Live%20Site-sahillangoo.com-38bdf8?style=flat-square&logo=cloudflare)](https://sahillangoo.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)
[![Built with Astro](https://img.shields.io/badge/Astro-7.2.x-orange.svg?style=flat-square&logo=astro)](https://astro.build)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![daisyUI 5](https://img.shields.io/badge/daisyUI-v5.7-1ad1a5?style=flat-square&logo=daisyui)](https://daisyui.com)

---

## ⚡ Tech Stack & Architecture Highlights

- **Static Site Generation (SSG)**: Zero-JavaScript by default with Astro 7.2, compiling 35+ fully static, pre-rendered routes.
- **Zero-Layout-Shift View Transitions**: Integrated with Astro's `<ClientRouter />`, permanent `scrollbar-gutter: stable`, persistent fixed header (`transition:persist="main-header"`), and pure opacity cross-fades without root scale distortion (CLS = 0.00).
- **Styling Architecture**: Tailwind CSS v4 (`@tailwindcss/vite`) + daisyUI 5 with curated OKLCH dark (`editorialDark`) and light (`editorialLight`) themes.
- **DaisyUI Swap Theme Switcher**: Accessible, animated `swap swap-rotate` checkbox toggle using Phosphor icons (`ph:sun-bold` / `ph:moon-bold`) and anti-flash `localStorage` persistence.
- **Type-Safe Content Collections**: Zod schemas validating 9 authentic case studies, 7 long-form technical essays, 7 digital garden notes, and verified work history in `src/content.config.ts`.
- **Git Activity & Commit Stream**: Live commit telemetry across `@SquadCoders`, `@ecspl`, and personal open-source repositories.
- **Smooth Scrolling & Micro-Interactions**: Lenis smooth scroll singleton synchronized across page swaps, paired with responsive tactile click feedback (`scale(0.98)` on `:active`).
- **Site Quality Enforcement**: Custom build-time integration (`astroSiteQualityEnforcer`) that audits compiled HTML in `dist/` to prevent broken links, 404s, and trailing slash violations.
- **SEO & Edge Deployment**: Full Schema.org JSON-LD structured data (`Person`, `WebSite`, `TechArticle`), `@astrojs/sitemap`, RSS feed (`/rss.xml`), and Cloudflare security headers.

---

## 🚀 Quick Start & CLI Workflows

Ensure you have [pnpm](https://pnpm.io) installed (v11+):

```powershell
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Check TypeScript diagnostics and Astro components
pnpm check

# Run ESLint 10 flat configuration
pnpm lint

# Check formatting compliance (Prettier)
pnpm format:check

# Format all files
pnpm format

# Production static build with link and asset verification
pnpm build

# Deploy directly to Cloudflare Pages via Wrangler
pnpm exec wrangler pages deploy ./dist --project-name sahillangoo-portfolio --branch main
```

---

## 📂 Repository Structure

```
sahillangoo-portfolio/
├── docs/                    # Technical architecture & design documentation
│   ├── ARCHITECTURE.md      # Tech stack & directory layout
│   ├── CONTENT_MODEL.md     # Zod schemas & frontmatter rules
│   ├── DESIGN_SYSTEM.md     # OKLCH tokens, typography & micro-interactions
│   ├── QUALITY_GATES.md     # Verification gates & thresholds
│   └── RESEARCH_NOTES.md    # Developer profile intelligence & commit research
├── public/                  # Static assets, Cloudflare _headers & _redirects, robots.txt, llms.txt
├── src/
│   ├── components/
│   │   ├── common/          # SeoHead, NavigationBar, MobileNavigation, SiteFooter, ThemeToggle, CommandPalette
│   │   └── portfolio/       # ProjectCard, ArticleCard, NoteCard, GitHubActivityWidget, ExperienceTimeline, ContactForm
│   ├── const/               # Site constants, navigation links, and social metadata (`src/const/site.ts`)
│   ├── content/             # Zod Content collections:
│   │   ├── blog/            # 7 Technical essays (Meta CAPI, Partytown, Local SLMs/Gemma, Turnstile, Astro systems)
│   │   ├── notes/           # 7 Digital Garden notes (View Transitions, DaisyUI OKLCH, PWA offline, Schema JSON-LD)
│   │   ├── projects/        # 9 Case studies (SoulMedia, Lead Funnels, Hotel Akbar, Rooh Yaseen, Smart IMG CLI, etc.)
│   │   ├── experience/      # Verified roles at SquadCoders and ECSPL
│   │   ├── site/            # Profile metadata and core engineering principles
│   │   └── links/           # Curated link hub directory
│   ├── layouts/             # BaseLayout with SEO, Lenis smooth scrolling, and View Transitions router
│   ├── plugins/             # Native Astro integrations (`astro-site-quality.ts`)
│   ├── styles/              # Global CSS, OKLCH palettes, and daisyUI theme configuration
│   └── pages/               # 35 static routes (/, /projects/, /blog/, /notes/, /resume/, /about/, /contact/, /now/, /uses/, /colophon/, /links/, /404/)
├── astro.config.mjs         # Astro configuration & integrations
├── eslint.config.mjs        # ESLint 10 flat configuration
├── wrangler.toml            # Cloudflare Pages deployment configuration
└── tsconfig.json            # Strict TypeScript compiler options & path aliases
```

---

## 📜 Documentation Reference Map

For in-depth specifications, refer to [docs/](file:///d:/sandbox/work-box/sahillangoo-portfolio/docs):

| Document                                               | Topic                      | Description                                                                                             |
| :----------------------------------------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------ |
| [**`docs/ARCHITECTURE.md`**](docs/ARCHITECTURE.md)     | **Architecture & Stack**   | Framework details, Cloudflare Pages, Astro integrations, and directory conventions.                     |
| [**`docs/CONTENT_MODEL.md`**](docs/CONTENT_MODEL.md)   | **Content Schemas**        | Zod schemas, Content Collections, and frontmatter definitions.                                          |
| [**`docs/DESIGN_SYSTEM.md`**](docs/DESIGN_SYSTEM.md)   | **Design System**          | OKLCH obsidian dark/light themes, typography scale, and micro-interactions.                             |
| [**`docs/QUALITY_GATES.md`**](docs/QUALITY_GATES.md)   | **Quality Gates**          | Pre-flight checks, ESLint 10, TypeScript diagnostics, and build rules.                                  |
| [**`docs/RESEARCH_NOTES.md`**](docs/RESEARCH_NOTES.md) | **Developer Intelligence** | Developer profile research, organization commitments (`@SquadCoders`, `@ecspl`), and commit discipline. |

---

## 📜 License

MIT © [Sahil Langoo](https://sahillangoo.com)
