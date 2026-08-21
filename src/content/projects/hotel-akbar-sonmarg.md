---
title: 'Hotel Akbar Sonamarg Web Platform'
description: 'A high-performance luxury hospitality web platform engineered with Astro 7.2, DaisyUI v5, and full legacy WordPress-to-Astro 301 redirection matrix.'
summary: 'High-performance static hospitality web portal with dynamic room collections, tour booking inquiries, and automated link verification.'
category: 'web-app'
tags: ['Astro 7.2', 'Tailwind CSS v4', 'daisyUI 5', 'TypeScript', 'Cloudflare Pages']
featured: true
year: 2024
role: 'Lead Frontend Architect'
order: 3
publishDate: '2024-08-15'
liveUrl: 'https://akbarsonamarg.com'
githubUrl: 'https://github.com/SquadCoders/hotel-akbar-sonmarg'
---

## Overview

A bespoke web platform engineered for **Hotel Akbar Sonamarg**, a premier luxury hotel located in the Sonamarg valley of Kashmir. The objective was to replace an antiquated, slow WordPress setup with a modern, ultra-fast static architecture delivering instant load times and zero layout shifts for international travelers.

## Architectural Highlights

- **Static Site Generation & Zero Client JS**: Compiled 100% statically to HTML/CSS via Astro, eliminating server-side database bottlenecks and security vulnerabilities.
- **Dynamic Content Collections**: Structured Zod schemas governing luxury room tiers, seasonal pricing matrices, dining amenities, local Sonamarg travel itineraries, and interactive FAQs.
- **Zero-Dependency Quality Enforcer**: Developed `astroSiteQualityEnforcer` as a native build integration to crawl compiled routes in `dist/`, guaranteeing 0 broken links and 0 missing image assets.
- **Complete WordPress Migration**: Implemented a comprehensive 301 redirection matrix (`_redirects` and server middleware) preserving organic search equity across legacy URLs.
- **Lighthouse Performance**: Achieved 100/100 across Performance, Accessibility, Best Practices, and SEO.
