# QUALITY_GATES.md — Verification Scripts & Quality Gates

This document outlines the strict quality verification gates required before shipping changes to the **Sahil Langoo Portfolio**.

---

## 1. Automated Verification Pipeline

Run all checks sequentially from Windows PowerShell (`pwsh`):

```powershell
# 1. Format Compliance Check (Prettier)
pnpm format:check

# 2. ESLint 10 AST-aware Linting
pnpm lint

# 3. Astro TypeScript Diagnostics & Component Checks
pnpm check

# 4. Production Static Build & Link Audit
pnpm build
```

---

## 2. Gate Criteria & Enforcement

| Quality Gate        | Command             | Passing Threshold                                                                                |
| :------------------ | :------------------ | :----------------------------------------------------------------------------------------------- |
| **Formatting**      | `pnpm format:check` | 100% Prettier rule compliance on all `.astro`, `.ts`, `.md`, `.json`, `.css`.                    |
| **Linting**         | `pnpm lint`         | 0 errors, 0 warnings across JS/TS/Astro and lockfile integrity.                                  |
| **Typecheck**       | `pnpm check`        | 0 TypeScript errors, 0 Astro diagnostics, 0 hints across all 40 files.                           |
| **Link Integrity**  | `pnpm build`        | `astroSiteQualityEnforcer` passes with 0 broken links, 0 missing assets, valid trailing slashes. |
| **Build Artifacts** | `pnpm build`        | Compiles 35 static routes and outputs `sitemap-index.xml` in `dist/`.                            |

---

## 3. Deployment Command

```powershell
pnpm exec wrangler pages deploy ./dist --project-name sahillangoo-portfolio --branch main
```
