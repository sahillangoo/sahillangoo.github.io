---
title: 'Enterprise LegalTech Infrastructure & Edge API Gateways'
description: 'Distributed Hono API proxies, Experian credit-report OTP gateways, Sentry OpenTelemetry, and server-side Meta CAPI pipelines for high-throughput enterprise portals.'
summary: 'Multi-brand legal inquiry engine, Experian OTP edge verification, and server-side advertising telemetry.'
category: 'systems'
tags:
  - hono
  - typescript
  - cloudflare-workers
  - sentry
  - meta-capi
  - playwright
  - zod
  - razorpay
featured: true
year: 2024
role: 'Backend & Systems Architect'
order: 3
publishDate: '2024-09-02'
liveUrl: 'https://github.com/ecspl/websites'
githubUrl: 'https://github.com/ecspl/websites'
---

## The Challenge

At **ECSPL**, high-volume financial and legal inquiry platforms (`expertpanel.org`, `lawyerpanel.org`, `stopharassment.in`) process thousands of real-time legal inquiries and sensitive credit-report evaluations daily.

Key architectural hurdles included:

1. **Third-Party Attribution Loss**: Browser-side tracking scripts (Meta Pixel, Google Analytics) experienced up to 38% signal degradation due to Safari Intelligent Tracking Prevention (ITP) and client-side ad blockers.
2. **PII Security & Bureau Isolation**: Direct browser communication with bureau APIs (Experian) exposed risk vectors and required server-side OTP token orchestration.
3. **Multi-Brand Template & Observability Complexity**: Operating multiple distinct brand identities across shared infrastructure resulted in duplicated email templates, intermittent client-side form race conditions, and unmonitored error boundaries.

---

## Architectural Solutions & System Pipeline

```
[Client Inquiry Form] ──> [Cloudflare Edge Proxy (Hono)]
                                     │
       ┌─────────────────────────────┼─────────────────────────────┐
       ▼                             ▼                             ▼
[Experian OTP Gateway]      [Dual Meta CAPI]            [Sentry OpenTelemetry]
(SendExpOtp / VerifyExpOtp) (SHA-256 Web Crypto)        (Journey & Error Tracing)
       │                             │                             │
       └─────────────────────────────┼─────────────────────────────┘
                                     ▼
                [Multi-Tenant Hono JSX + Juice Mailer]
                                     │
                                     ▼
                   [Zoho CRM / Razorpay Payment Hand-off]
```

### 1. Experian OTP Edge Verification Gateway

Engineered dedicated serverless API proxies using **Hono** on Cloudflare Workers for Experian credit-report OTP generation (`SendExpOtp`) and verification (`VerifyExpOtp`).

- Sensitive API keys, OAuth tokens, and HMAC signing secrets remain encrypted inside edge environment bindings.
- Direct browser access to bureau infrastructure is completely eliminated, neutralizing credential exposure risks.

### 2. Dual-Channel Meta Conversions API (CAPI) Pipeline

Built an environment-aware CAPI routing module that executes parallel server-side conversion logging:

- **Web Crypto SHA-256 Normalization**: Hashes and canonicalizes user phone numbers, emails, and client IP addresses prior to transmission.
- **Deterministic Deduplication**: Generates synchronized `event_id` keys matching browser-side pixels to eliminate double counting.
- **Measurable Impact**: Increased Meta Event Match Quality (EMQ) from **4.8/10** to **8.9/10**, reducing blended Customer Acquisition Cost (CAC) by 22%.

### 3. Multi-Tenant Hono JSX + Juice Email Templating Engine

Designed a unified server-side transactional email pipeline using **Hono JSX** and **Juice** inline CSS injection:

- Dynamically generates brand-specific HTML templates for `lawyerpanel.org`, `expertpanel.org`, and `stopharassment.in` from a single typed component schema.
- Embeds **Schema.org action markup** (`EmailMessage`, `ConfirmAction`) for rich interactive quick-actions in Gmail and Apple Mail.

### 4. Distributed Observability with Sentry & OpenTelemetry

Integrated `@sentry/hono` and OpenTelemetry diagnostic spans across edge routes and background workers:

- Traced end-to-end user journeys from initial form load through OTP validation to Zoho CRM lead creation.
- Eliminated intermittent Alpine.js store hydration race conditions, improving form submission completion rates to **99.7%**.

### 5. Automated End-to-End Testing with Playwright

Constructed automated CI regression test suites with Playwright running across Vercel and Cloudflare preview deployments, validating form validation, OTP error handling, and Razorpay payment gateways prior to every production merge.
