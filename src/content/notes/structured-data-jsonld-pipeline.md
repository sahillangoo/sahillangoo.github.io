---
title: 'Programmatic Schema.org JSON-LD Generation in Astro'
description: 'How to automatically generate Google rich-result Person, WebSite, BlogPosting, and Service schemas using Astro Content Collections and Zod schemas.'
publishDate: '2026-08-12'
topic: 'SEO & Structured Data'
tags:
  - seo
  - schema-org
  - json-ld
  - astro
order: 4
---

Search engine crawlers and generative AI answer engines (Perplexity, ChatGPT, Google AI Overviews) rely heavily on Schema.org structured data to disambiguate entities, author authority, and content relationships.

### Type-Safe Article Schema Generator

In Astro, we can extract Zod-validated frontmatter directly from `CollectionEntry<'blog'>` to generate RFC-compliant JSON-LD without manual duplication:

```astro
---
// src/components/seo/ArticleSchema.astro
import type { CollectionEntry } from 'astro:content';
import { SITE } from '@/const/site';

export interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { data, id } = post;
const postUrl = `${SITE.url}/blog/${id}/`;

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: data.title,
  description: data.description,
  url: postUrl,
  datePublished: data.publishDate,
  dateModified: data.updatedDate || data.publishDate,
  author: {
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.twitter],
  },
  publisher: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  },
  keywords: data.tags.join(', '),
};
---

<script is:inline type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Validation

Always verify generated markup against the [Google Rich Results Test](https://search.google.com/test/rich-results) and Schema.org Validator to confirm zero syntax warnings.
