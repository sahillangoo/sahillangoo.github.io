---
title: 'SoulMedia Creative Agency Web Platform'
description: 'A dynamic creative services and digital media platform with CMS service layer, Cloudflare R2 asset syncing, and Sentry error telemetry.'
summary: 'High-performance agency platform with Strapi CMS integration, Schema.org structured data, and R2 asset distribution.'
category: 'web-app'
tags: ['Astro', 'TypeScript', 'Cloudflare R2', 'Sentry', 'Docker', 'Tailwind CSS']
featured: true
year: 2024
role: 'Lead Systems Architect'
order: 2
publishDate: '2024-08-17'
liveUrl: 'https://github.com/SquadCoders/soulmedia-website'
githubUrl: 'https://github.com/SquadCoders/soulmedia-website'
---

## Overview

Engineered for **SoulMedia**, a high-end digital media agency. The system pairs a high-performance Astro frontend with an isolated Strapi CMS backend, automated asset synchronization to Cloudflare R2, and real-time Sentry observability.

## Key Technical Systems

- **Data Access & Sanitization Layers**: Built modular `BlogService` and `ProjectService` abstractions featuring input sanitization (`sanitize-html`), fallback date resolution, and error redaction.
- **Automated Schema.org Structured Data**: Generates dynamic `FAQPage`, `Organization`, and `Service` JSON-LD structured data for rich search engine result snippets.
- **Sentry Integration**: Integrated `@sentry/astro` into custom 404 and 500 error boundaries for comprehensive server and client exception telemetry.
- **Cloudflare R2 Media Distribution**: Created custom automated scripts syncing media assets to Cloudflare R2, reducing edge bandwidth and hosting overhead.
- **Docker Multi-Stage Build Pipeline**: Optimized multi-stage Dockerfiles with strict caching layers for CI/CD builds.
