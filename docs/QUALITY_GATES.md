# QUALITY_GATES.md: Verification Scripts & Quality Gates

This document outlines the strict quality verification gates required before shipping changes to the **Sahil Langoo Portfolio**.

---

## 1. Automated Verification Pipeline

Run all checks sequentially from Windows PowerShell (`pwsh`):

```powershell
# 1. Format Compliance Check (Prettier)
pnpm format:check

# 2. Ultra-Fast Static Analysis (Oxlint)
pnpm lint:ox

# 3. AI Slop, Anti-Pattern & Em-Dash Analyzer
pnpm lint:ai

# 4. ESLint AST-Aware Linting
pnpm lint:eslint

# 5. Dead Code & Supply Chain Verification
pnpm lint:deps

# 6. Astro TypeScript Diagnostics & Component Checks
pnpm check

# 7. Production Static Build & Link Audit
pnpm build

# 8. Schema.org JSON-LD & Google Rich Results Static Validation
pnpm audit:schema

# 9. Linkinator Internal Link & Fragment Anchor Crawler
pnpm audit:links

# 10. Production Readiness & Domain Verification
pnpm verify:prod
```

---

## 2. Gate Criteria & Enforcement

| Quality Gate          | Command             | Passing Threshold                                                                    |
| :-------------------- | :------------------ | :----------------------------------------------------------------------------------- |
| **Formatting**        | `pnpm format:check` | 100% Prettier rule compliance on all `.astro`, `.ts`, `.md`, `.json`, `.css`.        |
| **Static Linting**    | `pnpm lint:ox`      | 0 errors, 0 warnings (<50ms execution).                                              |
| **AI Slop / Copy**    | `pnpm lint:ai`      | 0 em dashes, 0 hallucinated patterns, 0 forbidden buzzwords.                         |
| **Typecheck**         | `pnpm check`        | 0 TypeScript errors, 0 Astro diagnostics, 0 hints.                                   |
| **Schema Validation** | `pnpm audit:schema` | 100% valid Schema.org graphs and Google Rich Results compliance across all 73 pages. |
| **Link Crawler**      | `pnpm audit:links`  | 0 dead links (404), 0 broken fragment anchors (#...) across all HTML pages.          |
| **Build Artifacts**   | `pnpm build`        | Compiles 73 static routes and outputs `sitemap-index.xml` in `dist/`.                |
| **Production Ready**  | `pnpm verify:prod`  | All 2,400+ domain, canonical, and security header checks passed.                     |

---

## 3. On-Demand Audit Commands

| Audit Target               | Command                    | Purpose                                                                       |
| :------------------------- | :------------------------- | :---------------------------------------------------------------------------- |
| **Multi-Page Lighthouse**  | `pnpm audit:lighthouse`    | Spawns local preview server and audits all pages with Unlighthouse visual UI. |
| **Headless Lighthouse CI** | `pnpm audit:lighthouse:ci` | Runs headless Lighthouse CI and asserts budget thresholds (90+).              |
| **Full External Links**    | `pnpm audit:links:all`     | Crawls all internal links and external third-party URLs.                      |
| **Unified SEO Audit**      | `pnpm audit:seo`           | Runs Schema validator, Linkinator crawler, and production verification.       |

---

## 4. Deployment Command

```powershell
pnpm run deploy
```
