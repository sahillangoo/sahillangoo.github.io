# Sahil Langoo - Personal Portfolio & Engineering Journal

Ultra-fast, high-performance static website and engineering portfolio built with [Astro 7.3](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), [daisyUI 5](https://daisyui.com), and TypeScript. Deployed globally to [Cloudflare Pages](https://pages.cloudflare.com).

[![Live Site](https://img.shields.io/badge/Live%20Site-sahillangoo.in-38bdf8?style=flat-square&logo=cloudflare)](https://sahillangoo.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)
[![Built with Astro](https://img.shields.io/badge/Astro-7.3.x-orange.svg?style=flat-square&logo=astro)](https://astro.build)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![daisyUI 5](https://img.shields.io/badge/daisyUI-v5.7-1ad1a5?style=flat-square&logo=daisyui)](https://daisyui.com)

---

## Tech Stack & Architecture Highlights

- **Static Site Generation (SSG)**: Zero-JavaScript by default with Astro 7.3.
- **Zero-Layout-Shift View Transitions**: Integrated with Astro's `<ClientRouter />`, permanent `scrollbar-gutter: stable`, persistent fixed header (`transition:persist="main-header"`), and pure opacity cross-fades without root scale distortion (CLS = 0.00).
- **Styling Architecture**: Tailwind CSS v4 (`@tailwindcss/vite`) + daisyUI 5 with curated OKLCH dark (`editorialDark`) and light (`editorialLight`) themes.
- **Theme toggle**: `editorialLight`, `editorialDark`, or system, stored in `localStorage`.
- **Type-Safe Content Collections**: Zod schemas for projects, essays, and work history in `src/content.config.ts`.
- **Smooth Scrolling & Micro-Interactions**: Lenis smooth scroll singleton synchronized across page swaps, paired with responsive tactile click feedback (`scale(0.98)` on `:active`).
- **Site Quality Enforcement**: Custom build-time integration (`astroSiteQualityEnforcer`) that audits compiled HTML in `dist/` to prevent broken links, 404s, and trailing slash violations.
- **SEO & Edge Deployment**: Full Schema.org JSON-LD structured data (`Person`, `WebSite`, `TechArticle`), `@astrojs/sitemap`, RSS feed (`/rss.xml`), and Cloudflare security headers.

---

## Quick Start & CLI Workflows

Use [pnpm](https://pnpm.io). The version is `packageManager` in `package.json`.

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

# Deploy to Cloudflare Pages
pnpm deploy
```

---

## License

MIT © [Sahil Langoo](https://sahillangoo.in)
