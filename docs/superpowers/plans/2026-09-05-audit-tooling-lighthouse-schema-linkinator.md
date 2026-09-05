# Multi-Page Lighthouse, Schema JSON-LD & Linkinator Tooling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure and integrate Unlighthouse for full-site multi-page audits, build a static Google Rich Results JSON-LD validator, and configure Linkinator for internal link and fragment anchor audits across all 73 static pages.

**Architecture:** Install `unlighthouse` and `linkinator` as dev dependencies, build a zero-network static validator `scripts/audit-rich-results.mjs` verifying Schema.org graphs across all HTML outputs in `dist/`, add npm audit scripts to `package.json`, and hook JSON-LD schema verification into `pnpm verify:prod`.

**Tech Stack:** Node.js (ESM), Astro 7, `unlighthouse`, `linkinator`, Prettier, Oxlint.

## Global Constraints

- Package manager: `pnpm` exclusively (never npm/yarn/bun).
- Shell: Windows PowerShell (`pwsh`).
- Zero AI slop / no em dashes (`—`) in code, comments, or documentation.
- No arbitrary Tailwind bracket classes.
- Non-blocking: Lighthouse runs on-demand without slowing down standard builds.
- Deterministic: Linkinator skips external third-party links by default to avoid rate limits and flaky CI.

---

### Task 1: Install `unlighthouse` and `linkinator` Dev Dependencies

**Files:**

- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**

- Consumes: Nothing
- Produces: CLI binaries `unlighthouse` and `linkinator` in `node_modules/.bin/`

- [ ] **Step 1: Install dev dependencies using pnpm**

Run: `pnpm add -D unlighthouse linkinator`

- [ ] **Step 2: Verify binaries are accessible**

Run: `pnpm exec unlighthouse --version` and `pnpm exec linkinator --version`
Expected: Output version numbers for both packages without errors.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add unlighthouse and linkinator for multi-page auditing"
```

---

### Task 2: Build Google Rich Results & JSON-LD Validator Script

**Files:**

- Create: `scripts/audit-rich-results.mjs`
- Test: Execute script against `dist/`

**Interfaces:**

- Consumes: Static `.html` files in `dist/`
- Produces: Exit code 0 on all valid schemas, Exit code 1 on invalid schemas, missing required properties, or legacy domain strings.

- [ ] **Step 1: Implement `scripts/audit-rich-results.mjs`**

The script must:

1. Scan all HTML files in `dist/`.
2. Extract all `<script type="application/ld+json">` contents.
3. Validate JSON parseability.
4. Verify root `@context === 'https://schema.org'` and `@graph` array.
5. Validate `WebSite` schema (`@id`, `name`, `url`, `publisher`).
6. Validate `Person` schema (`@id`, `name: "Sahil Langoo"`, `jobTitle`).
7. Validate `BreadcrumbList` schema (`itemListElement` with consecutive 1-indexed `position`, `name`, `item` URL).
8. Validate `BlogPosting` schema on `/blog/[slug]/` (`headline`, `datePublished`, `author`, `publisher`, `image`).
9. Validate `CreativeWork` / `SoftwareApplication` schema on `/projects/[slug]/`.
10. Ensure zero occurrences of `undefined`, `null`, or legacy `sahillangoo.com`.
11. Output a formatted summary of verified pages and schema nodes.

- [ ] **Step 2: Run test against `dist/`**

Run: `node scripts/audit-rich-results.mjs`
Expected: "All 73 pages passed Schema.org JSON-LD and Google Rich Results validation!" with exit code 0.

- [ ] **Step 3: Commit**

```bash
git add scripts/audit-rich-results.mjs
git commit -m "feat(seo): add high-speed google rich results and json-ld validator script"
```

---

### Task 3: Configure NPM Scripts in `package.json` and Integrate with Production Verification

**Files:**

- Modify: `package.json`
- Modify: `scripts/verify-production.mjs`

**Interfaces:**

- Consumes: `scripts/audit-rich-results.mjs`, `linkinator`, `unlighthouse`
- Produces: `pnpm audit:lighthouse`, `pnpm audit:schema`, `pnpm audit:links`, `pnpm audit:links:all`, `pnpm audit:seo`

- [ ] **Step 1: Update `package.json` scripts**

Add:

```json
"audit:lighthouse": "unlighthouse --dir ./dist",
"audit:schema": "node scripts/audit-rich-results.mjs",
"audit:links": "linkinator \"dist/**/*.html\" --recurse --skip \"^(https?://(?!localhost|127\\.0\\.0\\.1|sahillangoo\\.in))\" --verbosity error",
"audit:links:all": "linkinator \"dist/**/*.html\" --recurse --verbosity error",
"audit:seo": "node scripts/audit-rich-results.mjs && pnpm audit:links && node scripts/verify-production.mjs"
```

- [ ] **Step 2: Update `scripts/verify-production.mjs` to invoke the schema audit**

Import or run the schema validator assertions directly in `scripts/verify-production.mjs` or delegate via subroutine so `pnpm verify:prod` automatically guarantees rich results validity.

- [ ] **Step 3: Test `pnpm audit:schema`, `pnpm audit:links`, and `pnpm verify:prod`**

Run:

```powershell
pnpm audit:schema
pnpm audit:links
pnpm verify:prod
```

Expected: All three commands exit with 0.

- [ ] **Step 4: Commit**

```bash
git add package.json scripts/verify-production.mjs
git commit -m "feat(seo): configure npm audit scripts and integrate schema verification into verify:prod"
```

---

### Task 4: Configure Unlighthouse Configuration & Run End-to-End Verification

**Files:**

- Create: `unlighthouse.config.ts` (optional/standard for budgets and route filtering)
- Modify: `docs/QUALITY_GATES.md` (documenting the new audit commands)
- Modify: `AGENTS.md` (adding audit scripts to quality gates table)

**Interfaces:**

- Consumes: `dist/` directory
- Produces: Visual audit report in `.unlighthouse/`

- [ ] **Step 1: Create `unlighthouse.config.ts`**

Configure budgets:

```ts
export default {
  site: 'https://sahillangoo.in',
  scanner: {
    device: 'desktop',
    samples: 1,
  },
  ci: {
    budget: {
      performance: 90,
      accessibility: 95,
      'best-practices': 95,
      seo: 95,
    },
  },
};
```

- [ ] **Step 2: Update documentation in `docs/QUALITY_GATES.md` and `AGENTS.md`**

Add `pnpm audit:schema`, `pnpm audit:links`, `pnpm audit:lighthouse`, and `pnpm audit:seo` to the Quality Gates tables.

- [ ] **Step 3: Run full verification suite**

Run:

```powershell
pnpm format:check
pnpm lint:ox
pnpm lint:ai
pnpm check
pnpm audit:schema
pnpm audit:links
pnpm verify:prod
```

Expected: 100% pass across all tools.

- [ ] **Step 4: Commit**

```bash
git add unlighthouse.config.ts docs/QUALITY_GATES.md AGENTS.md
git commit -m "docs(quality): document lighthouse, schema, and linkinator audit commands"
```
