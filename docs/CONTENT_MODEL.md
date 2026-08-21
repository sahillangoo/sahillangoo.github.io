# CONTENT_MODEL.md — Zod Content Schemas & Data Architecture

This document defines the content models, Zod validation schemas, and frontmatter definitions used across the **Sahil Langoo Portfolio**.

---

## 1. Content Collections Summary (`src/content.config.ts`)

```typescript
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
```

### Collection 1: `projects` (9 Case Studies)

- **Location**: `src/content/projects/**/*.{md,mdx}`
- **Schema**:
  - `title` (`string`): Project name.
  - `description` (`string`): Summary for card previews & meta tags.
  - `summary` (`string.optional`): Compact single-line summary.
  - `category` (`enum`): `'web-app' | 'open-source' | 'cli-tool' | 'systems' | 'design-engineering'`.
  - `tags` (`array(string)`): Associated technologies (e.g. `['Bun', 'TypeScript', 'LM Studio']`).
  - `featured` (`boolean`): Determines priority placement on homepage.
  - `featuredImage` (`string.optional`): Preview thumbnail URL.
  - `liveUrl` (`string.optional`): URL to live deployed application.
  - `githubUrl` (`string.optional`): Repository URL.
  - `year` (`number`): Year completed/published.
  - `role` (`string`): Architectural role (e.g. `Lead Engineer`).
  - `order` (`number`): Numerical sort index.
  - `publishDate` (`string`): ISO date (`YYYY-MM-DD`).

---

### Collection 2: `blog` (7 Technical Essays)

- **Location**: `src/content/blog/**/*.{md,mdx}`
- **Schema**:
  - `title` (`string`): Essay headline.
  - `description` (`string`): Article synopsis.
  - `publishDate` (`string`): ISO date.
  - `updatedDate` (`string.optional`): ISO date of last revision.
  - `category` (`string`): Domain category (e.g. `Backend & Edge`, `Performance`, `AI & Tooling`, `Security`, `Architecture`).
  - `tags` (`array(string)`): Topic tags.
  - `featured` (`boolean`): High-priority spotlight.
  - `coverImage` (`string.optional`): Banner image path.
  - `draft` (`boolean`): Suppresses publication when true.
  - `readingTime` (`string.optional`): Estimated reading time (e.g. `5 min read`).

---

### Collection 3: `notes` (7 Digital Garden Notes)

- **Location**: `src/content/notes/**/*.{md,mdx}`
- **Schema**:
  - `title` (`string`): Atomic note title.
  - `description` (`string.optional`): Brief excerpt.
  - `publishDate` (`string`): ISO date.
  - `topic` (`string`): Sub-discipline (e.g. `Astro & CSS`, `Design Systems`, `PWA & Edge`, `SEO & Structured Data`).
  - `tags` (`array(string)`): Search tags.
  - `order` (`number`): Sort priority.

---

### Collection 4: `experience` (Work History)

- **Location**: `src/content/experience/**/*.json`
- **Schema**:
  - `role` (`string`): Title/position.
  - `company` (`string`): Organization or company name.
  - `companyUrl` (`string.optional`): Website or repo link.
  - `location` (`string`): City, Country or Remote.
  - `period` (`string`): Duration string (e.g. `2023 — Present`).
  - `current` (`boolean`): Highlights active engagement.
  - `highlights` (`array(string)`): Key accomplishments.
  - `skills` (`array(string)`): Core technologies utilized.
  - `order` (`number`): Chronological order.

---

### Collection 5: `site` (Profile Data)

- **Location**: `src/content/site/profile.json`
- **Schema**:
  - `name`, `title`, `bio`, `about` (`string`).
  - `skills` (`object`): Categorized lists (`languages`, `frameworks`, `databases`, `cloud`, `tools`).
  - `principles` (`array(object)`): Array of `{ title, description }`.

---

### Collection 6: `links` (Quick Access Hub)

- **Location**: `src/content/links/**/*.json`
- **Schema**:
  - `title`, `url` (`string`).
  - `category` (`enum`): `'social' | 'work' | 'writing' | 'resource' | 'contact'`.
  - `order` (`number`).
  - `highlight` (`boolean`).
  - `description` (`string.optional`).
