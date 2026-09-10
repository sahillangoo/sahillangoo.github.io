# Design Specification: LLMs.txt & LLMs-Full.txt Standard Compliance

**Date**: 2026-09-08  
**Topic**: llmstxt.org v2 Standard Compliance, Machine-Readable Markdown Endpoints & Discovery  
**Author**: Sahil Langoo & Antigravity  
**Status**: Approved (Transitioning to Implementation)

---

## 1. Executive Summary

This specification defines the complete implementation of the **[llmstxt.org v2](https://llmstxt.org/)** specification for the Sahil Langoo portfolio (`sahillangoo.in`).

The goal is to provide autonomous LLM agents (ChatGPT, Claude, Perplexity, Cursor, Antigravity, etc.) with deterministic, structured, token-efficient access to portfolio assets, engineering case studies, technical essays, and digital garden notes via:

1. **`/llms.txt`**: A curated manifest/index conforming strictly to llmstxt.org v2 formatting.
2. **`/llms-full.txt`**: A comprehensive single-file corpus containing the complete markdown body texts of all published articles, notes, and case studies for zero-roundtrip ingestion.
3. **Individual `.md` Endpoints**: Clean markdown representations for each blog post, digital garden note, and project case study (`/blog/[slug].md`, `/notes/[slug].md`, `/projects/[slug].md`).
4. **Global Discovery**: Automated `<link rel="describedby">` and `<link rel="alternate" type="text/markdown">` discovery tags in HTML `<head>`, alongside `robots.txt` annotations.

---

## 2. Standard Specification & Architecture

### 2.1 The llmstxt.org v2 Format (`/llms.txt`)

Following the specification at [llmstxt.org](https://llmstxt.org/):

- **H1 Header**: Site / Project title (`# Sahil Langoo - Systems Architect & Portfolio`)
- **Blockquote**: Executive summary (`> Full Stack Systems Engineer & Co-Founder at @SquadCoders...`)
- **Guidance Section**: Paragraphs/lists explaining how agents should navigate the index.
- **H2 Sections ("File Lists")**:
  - `## Production Case Studies`
  - `## Technical Writing & Essays`
  - `## Digital Garden Notes & Mental Models`
  - Each list item formatted strictly as:
    `- [Title](https://sahillangoo.in/<collection>/<slug>.md): Description`
- **`## Optional` Section**:
  - Secondary resources and links agents can skip when context window is constrained (e.g. `/llms-full.txt`, GitHub repositories, LinkedIn profile, DEV.to).

### 2.2 Comprehensive Corpus (`/llms-full.txt`)

Per user directive (Full Corpus Ingestion):

- Complete profile overview (Identity, Stacks, Academic History, Experience, Certifications).
- Complete text concatenation of all published content items:
  - All 9 Production Case Studies (Problem, Solution, Architecture, Deliverables, Metrics).
  - All 7 Technical Writing Essays (Complete article bodies in clean markdown).
  - All 7 Digital Garden Notes (Complete mental models and code snippets).
- Structured section hierarchy with clear separators (`---`) to enable reliable chunking by RAG parsers.

### 2.3 Individual Clean Markdown Routes

For every item in `src/content/blog`, `src/content/notes`, and `src/content/projects`:

- Route endpoints:
  - `src/pages/blog/[slug].md.ts`
  - `src/pages/notes/[slug].md.ts`
  - `src/pages/projects/[slug].md.ts`
- Output: Pre-rendered static markdown file with standard metadata header (Title, Canonical URL, Published Date, Category, Tags) followed by the pristine markdown content (`entry.body`).

### 2.4 Discoverability Headers & Tags

- **Global Head Injection (`src/components/common/SeoHead.astro`)**:
  - `<link rel="describedby" href={`${SITE.url}/llms.txt`} />` added to every page.
  - `<link rel="alternate" type="text/markdown" href={`${pageUrl.replace(/\/$/, '')}.md`} />` added conditionally on blog, notes, and project pages.
- **Robots.txt (`src/pages/robots.txt.ts`)**:
  - Explicit comments and directives for AI agents:
    ```
    # LLM & Agent Knowledge Base:
    # https://sahillangoo.in/llms.txt
    # https://sahillangoo.in/llms-full.txt
    ```

---

## 3. Verification & Quality Gates

1. **Astro Diagnostics**: `pnpm check` to ensure zero TypeScript errors in all `.ts` endpoint handlers.
2. **Production Build**: `pnpm build` to verify all `.txt` and `.md` static files are generated into `dist/`.
3. **Endpoint Inspection**: Curl / read generated files in `dist/` to verify format correctness and valid markdown.
4. **Link Crawler**: `pnpm audit:links` to ensure no 404s or broken internal links.
