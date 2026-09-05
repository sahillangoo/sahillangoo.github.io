# Design Specification: Multi-Page Lighthouse, Google Rich Results & Link Crawler Tooling

**Date**: 2026-09-05  
**Topic**: Lighthouse Multi-Page Auditing, Google Rich Results / JSON-LD Validation & Linkinator Link Crawler  
**Author**: Sahil Langoo & Antigravity  
**Status**: Draft for User Review  

---

## 1. Executive Summary

This specification outlines the architecture and integration of three specialized verification tools for the Sahil Langoo portfolio (`sahillangoo.in`):
1. **Lighthouse Multi-Page Audit (`unlighthouse`)**: On-demand parallel auditing across all 73 static pages with a visual dashboard report in `.unlighthouse/`.
2. **Google Rich Results & JSON-LD Validator (`scripts/audit-rich-results.mjs`)**: High-speed, zero-network, static analysis of Schema.org graph structures across every HTML file in `dist/`.
3. **Link & Anchor SEO Crawler (`linkinator`)**: Automated detection of broken internal URLs, redirects, and missing fragment/hash targets (`#...`).

---

## 2. Architecture & Tooling Selection

### 2.1 Tool Matrix

| Capability | Selected Tool | Execution Frequency | Integration Point | Output / Report |
| :--- | :--- | :--- | :--- | :--- |
| **Multi-Page Lighthouse** | `unlighthouse` | On-demand | `pnpm audit:lighthouse` | HTML/Bento Dashboard in `.unlighthouse/` |
| **Rich Results / JSON-LD** | In-repo `scripts/audit-rich-results.mjs` | Automated & On-demand | `pnpm audit:schema`, `pnpm verify:prod` | Terminal summary with schema graph counts |
| **Link & Anchor Crawler** | `linkinator` | Automated & On-demand | `pnpm audit:links`, `pnpm audit:links:all` | Terminal list of checked links, status codes |
| **Unified SEO Quality Gate** | In-repo unified pipeline | On-demand / Pre-release | `pnpm audit:seo` | Runs schema validation, Linkinator, and production verification |

---

## 3. Detailed Component Designs

### 3.1 Multi-Page Lighthouse Audit (`unlighthouse`)

#### Purpose
Scan all 73 static pages generated in `dist/` without slowing down the primary static build or CI cycle.

#### Configuration & Execution
- Dependency: `unlighthouse` installed as a devDependency.
- Targeted directory: Local static build directory `./dist` or preview server `http://127.0.0.1:4321`.
- Router discovery: Automatically parses `dist/sitemap-index.xml` and `dist/sitemap-0.xml` to discover all static routes.
- Script:
  ```json
  "audit:lighthouse": "unlighthouse --dir ./dist"
  ```

---

### 3.2 Google Rich Results & JSON-LD Validator (`scripts/audit-rich-results.mjs`)

#### Purpose
Validate every `<script type="application/ld+json">` block across all 73 HTML files in `dist/` against Google Rich Snippet and Schema.org standards in <100ms.

#### Validation Rules
1. **Root Graph Structure**:
   - Must contain `@context: "https://schema.org"`.
   - Must contain `@graph` array.
2. **WebSite Schema**:
   - Valid `@id` matching `https://sahillangoo.in/#website`.
   - Non-empty `name`, `url`, and `publisher`.
3. **Person Schema**:
   - Valid `@id` matching `https://sahillangoo.in/#author`.
   - Valid `name: "Sahil Langoo"`, `jobTitle`, and `sameAs` social links.
4. **BreadcrumbList Schema** (on non-home routes):
   - Valid `@type: "BreadcrumbList"`.
   - Array of `itemListElement` items with sequential `position` (1, 2, ...), valid `name`, and valid `item` URL.
5. **BlogPosting / Article Schema** (on `/blog/[slug]/` routes):
   - Valid `@type: "BlogPosting"`.
   - Required fields: `headline`, `description`, `datePublished`, `author`, `publisher`, `image`, and `mainEntityOfPage`.
6. **Project / SoftwareApplication / CreativeWork Schema** (on `/projects/[slug]/` routes):
   - Valid `@type` (`CreativeWork` or `SoftwareApplication`).
   - Required fields: `name`, `description`, `url`, `author`.
7. **Negative Checks**:
   - Zero occurrences of `undefined` or `null` in strings.
   - Zero references to legacy domains (`sahillangoo.com`, `localhost`, `127.0.0.1`).
   - Strict trailing slash enforcement on all internal URLs.

---

### 3.3 Link & Anchor SEO Crawler (`linkinator`)

#### Purpose
Verify that all internal URLs and fragment hash identifiers (`href="#section-id"`) resolve with HTTP 200 and valid DOM target IDs.

#### Configuration & Execution
- Dependency: `linkinator` installed as devDependency.
- Commands:
  - `pnpm audit:links`:
    ```bash
    linkinator "dist/**/*.html" --recurse --skip "^(https?://(?!localhost|127\\.0\\.0\\.1|sahillangoo\\.in))" --verbosity error
    ```
    - Skips external links to guarantee determinism and avoid rate-limiting from external services.
    - Fails if any internal page returns a 404 or broken fragment anchor.
  - `pnpm audit:links:all`:
    ```bash
    linkinator "dist/**/*.html" --recurse --verbosity error
    ```
    - Crawls all links including external third-party links on demand.

---

### 3.4 Integration & NPM Scripts

Add the following npm scripts in `package.json`:

```json
{
  "scripts": {
    "audit:lighthouse": "unlighthouse --dir ./dist",
    "audit:schema": "node scripts/audit-rich-results.mjs",
    "audit:links": "linkinator \"dist/**/*.html\" --recurse --skip \"^(https?://(?!localhost|127\\.0\\.0\\.1|sahillangoo\\.in))\" --verbosity error",
    "audit:links:all": "linkinator \"dist/**/*.html\" --recurse --verbosity error",
    "audit:seo": "node scripts/audit-rich-results.mjs && pnpm audit:links && node scripts/verify-production.mjs"
  }
}
```

Hook `node scripts/audit-rich-results.mjs` into `pnpm verify:prod` so production deployments automatically enforce rich snippet validity on every release.

---

## 4. Verification Plan

1. **Dependency Installation**:
   - `pnpm add -D unlighthouse linkinator`
2. **Schema Audit Execution**:
   - Run `pnpm build`
   - Run `pnpm audit:schema` -> All 73 HTML pages validated, 0 schema errors.
3. **Linkinator Crawl Execution**:
   - Run `pnpm audit:links` -> Crawls all HTML files, verifies anchors, 0 broken links.
4. **Lighthouse Multi-Page Run**:
   - Run `pnpm audit:lighthouse` -> Verifies report generation in `.unlighthouse/`.
5. **Unified SEO Pipeline Execution**:
   - Run `pnpm audit:seo` -> Schema validation, link crawling, and production readiness all pass cleanly.
