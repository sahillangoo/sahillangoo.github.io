# AI Code Quality Standards & Anti-Pattern Guardrails

This document establishes the official engineering guardrails, code quality standards, and anti-pattern prevention directives for all **AI coding agents, assistants, and human engineers** working on the Sahil Langoo portfolio repository.

---

## 🏛️ Core Engineering Philosophy

1. **KISS & YAGNI First**: Never introduce abstractions, design patterns, factories, or wrappers for problems that do not yet exist. Code should be as simple and direct as possible.
2. **Intentional Over Automated**: Do not generate boilerplate for the sake of looking "complete." Every line of code, property, and class must serve an explicit, verified purpose.
3. **Zero Layout Shifts & Instant Paints**: UI must achieve CLS = 0.00 and sub-50ms global TTFB. Never trigger layout recalculations with unbounded animations or unconstrained elements.
4. **Humanized Editorial Craft**: All written copy and documentation must sound human, direct, and technically grounded. Zero em dashes (`—`), zero filler words, and zero formulaic AI transition clichés.

---

## 🚫 The 10 Hallmark AI Code Anti-Patterns

### 1. Boundary Confusion in Astro (Server vs. Client)

- **The Mistake**: Importing Node.js modules (`node:fs`, `node:path`) inside client-side `<script>` tags, or attempting to access browser globals (`window`, `document`, `localStorage`) in Astro frontmatter without checking for runtime context.
- **The Rule**:
  - Astro frontmatter (`---`) runs **exclusively on the server / build-time**. Never reference `window` or `document` in frontmatter.
  - Astro `<script>` tags run in the browser. Never import server-only modules or private environment variables (`import.meta.env.*` without `PUBLIC_`).

### 2. View Transitions Lifecycle Failures (`astro:page-load`)

- **The Mistake**: Attaching event listeners (`addEventListener('click')`) inside `<script>` without accounting for Astro's ClientRouter / View Transitions (`<ClientRouter />`). Upon client navigation, listeners fail to bind to the newly swapped DOM.
- **The Rule**: Always bind client-side interactive logic to `astro:page-load`:
  ```typescript
  function init() {
    const btn = document.getElementById('my-btn');
    if (!btn) return;
    // setup logic
  }
  init();
  document.addEventListener('astro:page-load', init);
  ```

### 3. TypeScript Degradation (`any` & Non-Null Assertions)

- **The Mistake**: Using `any`, `as any`, or sprinkling non-null assertions (`foo!.bar!.baz!`) whenever TypeScript flags a type mismatch.
- **The Rule**:
  - `any` is strictly banned (`@typescript-eslint/no-explicit-any: error`).
  - Use proper type guards (`if (typeof x === 'string')`, `if (item && 'title' in item)`) or Zod schema validation.
  - Import types explicitly with `import type { ... }`.

### 4. Swallowed Errors & Silent Catch Blocks

- **The Mistake**: Writing `try { ... } catch (e) {}` where errors disappear silently into the ether, leaving bugs untraceable in production.
- **The Rule**: Catch blocks must either log with context, recover gracefully, or rethrow:
  ```typescript
  // ❌ BANNED
  try {
    doWork();
  } catch (e) {}

  // ✅ REQUIRED
  try {
    doWork();
  } catch (error) {
    console.error('Failed to execute doWork:', error);
    // or return fallback default
  }
  ```

### 5. Async Inside Array Methods (`forEach(async ...)`)

- **The Mistake**: Writing `items.forEach(async (item) => { await save(item); })`. `forEach` does not await promises, causing race conditions, unhandled rejections, and silent task dropping.
- **The Rule**:
  - For sequential execution: Use `for (const item of items) { await save(item); }`.
  - For concurrent execution: Use `await Promise.all(items.map((item) => save(item)))`.

### 6. Hallucinated Packages & API Confabulation

- **The Mistake**: Importing npm libraries that do not exist or are not installed in `package.json` (e.g. `lodash`, `date-fns`), or calling non-existent framework methods.
- **The Rule**:
  - Never import external packages without checking `package.json`.
  - All bare imports are verified by `knip` and `scripts/lint-ai-slop.mjs`.

### 7. Obsolete Tailwind v3 Syntax in Tailwind v4

- **The Mistake**: Using legacy Tailwind v3 patterns or arbitrary bracketed values:
  - `bg-opacity-*`, `text-opacity-*` (legacy opacity modifiers)
  - `flex-grow`, `flex-shrink` (legacy flex property names)
  - Arbitrary bracket classes: `text-[11px]`, `text-[10px]`, `scale-[0.99]`, `w-[2.5px]`, `max-h-[80vh]`
  - `@apply` with arbitrary non-theme values
- **The Rule**:
  - Use Tailwind v4 modern slash opacity: `bg-accent/20`, `text-base-content/80`.
  - Use modern flex shortcuts: `grow`, `shrink`.
  - Zero arbitrary bracket classes: use semantic `@theme` tokens (`text-2xs`, `text-3xs`, `scale-99`, `max-h-modal`) or standard scale (`h-2.5`, `w-2.5`, `gap-0.5`).
  - Always use `cn()` from `@/utils/cn` when merging conditional classes.

### 8. Punctuation Slop: Em-Dash Overuse (`—`)

- **The Mistake**: Using em dashes (`—` / `\u2014`) as default separators or parenthetical connectors across website copy, titles, and content collections.
- **The Rule**:
  - Em dashes are **strictly forbidden** in this repository.
  - For page titles and meta headlines: Use clean pipe separators: `|` (e.g. `About Me | Sahil Langoo`).
  - For date and period ranges: Use spaced hyphens: `-` (e.g. `2023 - Present`).
  - For prose sentences: Restructure into clean, punchy sentences or use commas/hyphens.

### 9. Statistical AI Buzzwords & Tropes

- **The Mistake**: Relying on generic AI buzzwords:
  - _"delve into"_, _"rich tapestry"_, _"testament to"_, _"beacon of"_
  - _"pivotal role"_, _"crucial to remember"_, _"in today's digital landscape"_
  - _"harness the power of"_, _"game-changer"_, _"plethora of"_
  - _"not only ..., but also ..."_
- **The Rule**:
  - Use concrete nouns, direct verbs, and specific metrics.
  - Cut opening summary fluff and closing formulaic conclusions.

### 10. Code Slop & Narrative Filler Comments

- **The Mistake**: Cluttering source files with redundant narrative comments:
  - `// Start of component`
  - `// Loop through the items and display them`
  - `// TODO: implement later`
- **The Rule**: Write self-describing variable and function names. Comments are reserved for non-obvious algorithmic trade-offs or architectural constraints.

---

## ✍️ AI Copywriting, Content Strategy & SEO Standards

To rank in Google search and get cited in AI answer engines (Google AI Overviews, Perplexity, ChatGPT, Claude), all content must exhibit **high information gain** and authentic **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness).

### The 8 Sins of AI Content Generation

1. **Formulaic Openings & Filler Meta-Commentary**:
   - _Bad_: _"In today's fast-paced digital world, web performance is more crucial than ever..."_
   - _Good_: _"We reduced initial JavaScript payload by 44% by migrating third-party trackers to Web Workers via Partytown."_
2. **AI Vocabulary Clusters**:
   - Strictly avoid: _delve_, _tapestry_, _testament_, _beacon_, _pivotal_, _harness_, _leverage the power of_, _seamless_, _elevate_, _game-changer_, _plethora_, _foster_.
3. **Monotonous Rhythm & Missing Burstiness**:
   - AI outputs uniform 15-to-20 word sentences. Human prose mixes short, impactful statements with detailed technical explanations.
4. **Vague Claims vs. Concrete Metrics**:
   - Never write _"dramatically improved performance."_ State the numbers: _"dropped p99 API latency from 140ms to 18ms and cut memory usage by 35%."_
5. **Superficial Contrastive Clauses**:
   - Avoid reflexive filler: _"Not only does it optimize speed, but it also improves security."_
6. **Em-Dash Overuse (`—`)**:
   - Replace with clean pipes (`|`) in page titles and spaced hyphens (`-`) in date ranges and prose.
7. **Low Information Gain**:
   - Never restate textbook definitions. Technical readers want implementation trade-offs, edge-case failures, and architectural insights.
8. **Hallucinated or Outdated References**:
   - Verify every tool, API, and syntax version. (e.g. Tailwind v4 syntax, Astro 5/6/7 Content Collections, Cloudflare Workers APIs).

### AI Vocabulary Humanization Dictionary

| AI Trope / Buzzword            | Humanized Replacement                     |
| :----------------------------- | :---------------------------------------- |
| `delve into`                   | `explore / analyze / examine`             |
| `rich tapestry`                | `broad collection / diverse ecosystem`    |
| `a testament to`               | `evidence of / reflects`                  |
| `seamless / seamlessly`        | `consistent / direct / reliable / smooth` |
| `elevate`                      | `improve / increase / optimize`           |
| `in today's digital landscape` | _(Cut phrase entirely)_ or `currently`    |
| `pivotal role`                 | `primary function / key role`             |
| `game-changer`                 | `major breakthrough / significant shift`  |
| `harness the power of`         | `using / adopting`                        |
| `plethora of`                  | `numerous / varied`                       |
| `foster innovation`            | `build systems / advance technology`      |

### Search & AI Engine Optimization (AEO / GEO)

- **Direct Answer First (First 40-60 Words)**: Every blog post or technical note must answer the core search query immediately below the H1 before diving into background details.
- **Title Tag Discipline**: Format as `Primary Topic | Sahil Langoo` (under 60 characters).
- **Meta Description Density**: 110-155 characters packed with concrete value propositions and keywords without fluff.
- **Machine-Readable Discovery**: Keep `public/llms.txt` and `public/llms-full.txt` updated whenever routes or content collections change.

---

## 🛠️ Automated Quality Gates

Before any branch merge or deployment, the following pipeline must execute with **zero errors**:

```powershell
pnpm lint:ox      # Oxlint ultra-fast parallel check (<50ms)
pnpm lint:deps    # Knip dependency & supply chain verification
pnpm lint:ai      # AI slop, anti-pattern & em-dash static analyzer
pnpm lint:eslint  # ESLint 9+ flat config with Astro & TypeScript rules
pnpm format:check # Prettier style formatting check
pnpm check        # Astro TypeScript compiler diagnostics
pnpm build        # Full production static build
pnpm verify:prod  # Domain, SEO, and link integrity verification
```
