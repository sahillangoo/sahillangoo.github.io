---
title: 'Type-Safe Content Pipelines with Zod & Astro'
description: 'How to construct schema-validated Markdown and JSON pipelines that catch data anomalies at compile-time.'
publishDate: '2024-05-12'
category: 'TypeScript'
tags: ['TypeScript', 'Zod', 'Content Collections', 'Astro']
featured: false
draft: false
readingTime: '5 min read'
---

Handling content in static websites frequently suffers from schema drift. A missing frontmatter date or a misformatted enum can quietly slip into production, resulting in broken layouts or runtime null reference exceptions.

## Leveraging Zod Schema Validation

By defining strict Zod schemas inside Astro's Content Collections, every document is validated during the build step. Any missing required property immediately halts the build with an informative error message.

```typescript
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blog = defineCollection({
  schema: z.object({
    title: z.string().min(1),
    publishDate: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});
```

This guarantees complete type-safety from filesystem to UI templates.
