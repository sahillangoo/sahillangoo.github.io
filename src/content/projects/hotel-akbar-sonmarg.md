---
title: 'Hotel Akbar Sonamarg Web Platform'
description: 'A high-performance luxury hospitality web platform engineered with Astro 7.2, DaisyUI v5, and full legacy WordPress-to-Astro 301 redirection matrix.'
summary: 'High-performance static hospitality web portal with dynamic room collections, tour booking inquiries, and automated link verification.'
category: 'web-app'
tags:
  - astro
  - tailwindcss
  - daisyui
  - typescript
  - cloudflare-pages
featured: false
year: 2024
role: 'Lead Frontend Architect'
order: 7
publishDate: '2024-08-15'
liveUrl: 'https://hotelakbarsonamarg.com/'
---

## The Challenge

Hotel Akbar Sonamarg, a premier luxury hotel in the Kashmir Himalayas, was suffering from an aging, slow WordPress website. Mobile load times frequently exceeded 4.5 seconds due to bloated plugins, causing high bounce rates among international travelers attempting to book rooms and excursions over intermittent cellular networks.

---

## Architectural Solutions

```
[Astro 7.2 Static Compiler] ──> [HTML & OKLCH CSS] ──> [Cloudflare Global Edge]
                                           │
                                           ▼
                                 [0.00 CLS / < 0.2s TTFB]
```

### 1. WordPress to Astro SSG Migration

Migrated the entire content architecture to static site generation with **Astro 7.2**, eliminating database cold starts and achieving **100/100 Lighthouse scores** across Performance, Accessibility, Best Practices, and SEO.

### 2. Structured Zod Content Collections

Engineered type-safe schema models for luxury room tiers, seasonal pricing packages, dining amenities, local Sonamarg travel itineraries, and guest FAQs.

### 3. Build-Time Link & Asset Enforcer

Created the `astroSiteQualityEnforcer` integration to scan rendered HTML in `dist/` at build time, verifying every internal link, anchor fragment, and image asset physically exists before deployment.

### 4. Search Equity Preservation Matrix

Mapped over 120 legacy WordPress query parameters and permalinks into an immutable 301 redirect matrix (`_redirects`), preventing crawl errors and maintaining search ranking positions.
