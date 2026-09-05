---
title: 'TravelKit Modular Platform & Lead Scoring Engine'
description: 'A modular travel agency architecture pairing static Astro frontend portals with a high-throughput Flight PHP lead scoring and queue dispatching backend.'
summary: 'Multi-tenant travel platform generator with dynamic itineraries and high-performance Flight PHP REST API backend.'
category: 'web-app'
tags:
  - astro
  - php
  - redis
  - tailwindcss
  - typescript
  - cloudflare-pages
featured: false
year: 2024
role: 'Lead Full Stack Architect'
order: 10
publishDate: '2024-08-18'
liveUrl: 'https://travelarc.in/'
---

## The Challenge

Travel and tour operators require rapid deployment of multi-destination portals with complex itinerary layouts, seasonal pricing tiers, and real-time lead capture pipelines.

Key technical challenges included:

1. **High Lead Processing Latency**: Legacy form endpoints suffered from slow email delivery and lack of prioritization for high-value group inquiries.
2. **Attribution Loss on Ad Campaigns**: Multi-channel paid campaigns (Google Ads, Meta) required server-side conversion validation to combat signal loss.
3. **Template Scalability**: Generating separate customized websites for different travel agencies while sharing a unified lead management engine.

---

## Architectural Solutions & System Pipeline

```
[Astro Static Agency Portal] ──(Inquiry Submission)──> [Flight PHP REST API]
                                                               │
                ┌──────────────────────────────────────────────┼──────────────────────────────┐
                ▼                                              ▼                              ▼
     [Weighted Lead Scoring]                          [Async Redis Queue]            [Dual CAPI & GA4 MP]
     (Budget, Group Size, Urgency)                    (Twig Mailer & Telegram)       (SHA-256 Attribution)
```

### 1. Modular Astro Content Collections Frontend

Built modular frontend components using **Astro** and **Tailwind CSS**:

- **Zod Schema Modeling**: Validates tour itineraries, dynamic photo galleries, customer reviews, and pricing options at build time.
- **Sub-50ms Global Delivery**: Pre-rendered static assets deployed on Cloudflare Pages ensure instant page loads for travelers on mobile networks.

### 2. High-Performance Flight PHP REST API Backend

Engineered the `travel-backend-server-php` microservice using the lightweight **Flight PHP** framework:

- **Weighted Lead Scoring Engine**: Evaluates inquiry payload attributes (estimated traveler count, departure date urgency, accommodation budget) and categorizes leads into Hot/Warm/Cold tiers for sales agents.
- **Async Queue Dispatcher**: Offloads transactional notifications to background workers, decoupling user responses from external SMTP servers and cutting API latency to **< 35ms**.

### 3. Server-Side Meta CAPI & GA4 Measurement Protocol

Dispatches synchronized conversion events directly to Meta Graph API and Google Analytics 4 via server-side HTTP calls with Web Crypto SHA-256 parameter hashing, ensuring 100% campaign attribution accuracy.

### 4. Real-Time Telegram Webhook Alerts

Integrated instantaneous Telegram webhook dispatchers configured with robust HTML formatting guards, alerting on-duty tour coordinators within seconds of high-priority booking submissions.
