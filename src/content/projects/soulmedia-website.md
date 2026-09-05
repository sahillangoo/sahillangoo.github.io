---
title: 'SoulMedia Creative Agency Web Platform'
description: 'A dynamic creative services and digital media platform with CMS service layer, Cloudflare R2 asset syncing, and Sentry error telemetry.'
summary: 'High-performance agency platform with Strapi CMS integration, Schema.org structured data, and R2 asset distribution.'
category: 'web-app'
tags:
  - astro
  - typescript
  - cloudflare-r2
  - sentry
  - docker
  - tailwindcss
featured: false
year: 2024
role: 'Lead Systems Architect'
order: 8
publishDate: '2024-08-17'
liveUrl: 'https://soulmedia.uk/'
---

## The Challenge

SoulMedia required a digital platform capable of showcasing 4K video reels and agency case studies while maintaining instant page loads and zero layout shifts.

The system needed to support content management via a headless CMS (Strapi) without exposing the internal CMS infrastructure to public traffic, while also distributing heavy media assets cost-effectively across global edge points.

---

## Architectural Solutions

```
[Strapi Headless CMS] ──> [Astro SSG Build Runner] ──> [Cloudflare R2 Bucket]
                                     │
                                     ▼
                           [Edge Global CDN]
```

### 1. Data Access & Sanitization Layers

Constructed robust `BlogService` and `ProjectService` abstractions in TypeScript featuring HTML input sanitization (`sanitize-html`), fallback date resolution, and error redaction to prevent broken builds during CMS schema migrations.

### 2. Automated Schema.org Structured Data

Engineered programmatic JSON-LD generators producing `FAQPage`, `Organization`, and `Service` structured data schemas for Google rich results and AI search engine visibility.

### 3. Sentry Observability & Telemetry

Integrated `@sentry/astro` across error boundaries and client interactive islands to capture uncaught exceptions and network latency bottlenecks in real time.

### 4. Cloudflare R2 Media Distribution

Configured automated asset pipelines synchronizing media assets directly to **Cloudflare R2 Object Storage**, slashing egress bandwidth costs to zero and accelerating image delivery.

### 5. Multi-Stage Docker Build Pipelines

Authored optimized multi-stage Dockerfiles that isolate dependency installation, build artifact generation, and deployment layers for rapid CI/CD deployment cycles.
