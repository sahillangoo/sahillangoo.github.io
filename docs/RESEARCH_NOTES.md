# Comprehensive Developer Profile & Organization Research: Sahil Langoo

This document captures the synthesized intelligence gathered from GitHub (`@sahillangoo`), organizations (`@SquadCoders`, `@ecspl`, `@HackerForceDev`), git commit logs, PR reviews, public repos, dev.to, and Twitter (`@kashurgeek`).

---

## 1. Persona & Identity

- **Full Name**: Sahil Langoo
- **Online Handles**: `sahillangoo` (GitHub, DEV, Daily.dev), `kashurgeek` (Twitter/X)
- **Location**: Kashmir, India (Open to global remote engineering & consulting)
- **Email**: `hey@sahillangoo.com` / `sahillangoo@pm.com`
- **Core Organizations**:
  - **`@SquadCoders`**: Co-Founder & Lead Software Engineer (Srinagar, Kashmir).
  - **`@ecspl`**: Systems & Backend Integration Engineer (Enterprise Monorepos).
  - **`@HackerForceDev`**: Security & Tactical Developer Training.
- **Tagline & Bio**: _"A man of mystery and power, whose power is exceeded only by his mystery. <I design, code & sometimes dream about making art./>"_

---

## 2. Organization Repositories & Engineering Analysis

### A. SquadCoders (`@SquadCoders`)

1. **`soulmedia-website`** (Astro, TypeScript, Sentry, Cloudflare R2, Docker):
   - Creative services & digital media agency platform with Strapi CMS integration.
   - Dynamic `BlogService` & `ProjectService` data layers with `sanitize-html`.
   - Automated `FAQPage` and `Service` Schema.org JSON-LD generation.
   - Sentry error logging on custom 404 and 500 error pages.
   - Multi-stage Docker builds with Cloudflare R2 asset synchronization.
2. **`hotel-akbar-sonmarg`** (Astro 7.2, DaisyUI v5, Tailwind CSS v4):
   - Luxury hospitality platform with dynamic room collections, tour booking inquiries, local travel guides, and zero-dependency build-time quality hooks (`astroSiteQualityEnforcer`).
3. **`roohyaseen-portfolio`** (Astro, Tailwind CSS, Lenis, Motion, Zod):
   - High-end editorial portfolio for UK Director of Photography Rooh Yaseen with Facade video embedding, zero CLS, and custom OKLCH dark theme.
4. **`travel_kit_websites`** (Astro, JavaScript, Tailwind CSS):
   - Modular travel agency template generator and booking inquiry engine.
5. **`school_management`** (TypeScript, React):
   - Modern educational management web portal.

### B. Enterprise Systems (`@ecspl`)

1. **`websites`** (TypeScript Monorepo, Hono, Astro, Cloudflare Workers, Playwright, Sentry):
   - High-traffic advertising funnels (`/offer-cr-tab/`, `/offer-cr-hs/`).
   - Secure Experian credit-report OTP verification proxies on Hono (`SendExpOtp` / `VerifyExpOtp`).
   - Server-side Meta Conversions API (CAPI) event routing with preview vs. production allowlisting.
   - Production Sentry exception triage, resolving client noise and unblocking Razorpay checkout flows.
   - Automated Playwright E2E testing pipelines with configurable build skips (`PLAYWRIGHT_SKIP_BUILD`).
2. **`websites-backend` & `zoho-worker`**:
   - Cloudflare Workers microservices handling CRM lead capture, data handoff, and analytics dispatching.
3. **`astro_ui`**:
   - Internal UI component library for Astro with Tailwind v4, daisyUI 5, and Phosphor icons.

### C. Personal Tooling (`@sahillangoo`)

1. **`smart-img-cli`** (Bun, LM Studio, JavaScript):
   - Lightning-fast image compression and local AI-powered SEO image renaming CLI using offline Small Language Models (Google Gemma 2B Vision).
2. **`hackforce-storefront`** (Astro, Pagefind, Tailwind CSS):
   - Tactical cybersecurity storefront with static search indexing.
3. **`template-astro-daisy`** (Astro, DaisyUI 5, Tailwind CSS):
   - Open-source developer starter kit with daisyUI v5 and Tailwind v4.
4. **`ku-result`** (Python, Cron):
   - Automated university examination result notification daemon.

---

## 3. Git Commit & Review Discipline

- **Commit Style**: Consistent conventional commit syntax (`feat:`, `fix:`, `chore:`, `refactor:`, `ci:`).
- **PR Rigor**: Detailed pull request summaries documenting root-cause analysis, production error triage, and security hardening (e.g. Sentry issue triage, CAPI isolation, Corepack pnpm supply chain pinning).
