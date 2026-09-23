---
title: 'Multi-Tenant Ad-Driven Platform & Enterprise Edge API Infrastructure'
resumeTitle: 'Multi-Tenant Ad-Driven Platform'
description: 'Multi-tenant ad-driven platform with isolated client branding, Git branch Vercel CI/CD, Meta Pixel and server-side CAPI tracking, SHA-256 PII protection, and Razorpay subscription workflows.'
summary: 'Multi-tenant ad platform featuring Git branch Vercel CI/CD, hybrid Meta CAPI attribution, SHA-256 PII protection, and Razorpay webhook reconciliation.'
category: 'systems'
tags:
  - nextjs
  - react
  - vercel
  - git-branch-workflows
  - meta-pixel
  - meta-capi
  - razorpay
  - sha256-hashing
  - typescript
  - cloudflare-workers
  - hono
  - sentry
  - playwright
  - zod
featured: true
year: 2025
role: 'Backend & Systems Architect'
order: 3
publishDate: '2025-05-10'
liveUrl: 'https://www.expertsupport.org/'
highlights:
  - 'Multi-Tenant Architecture: Developed and scaled a multi-tenant ad-driven web application with isolated tenant configuration, dynamic branding, and scoped data access across client environments.'
  - 'Automated CI/CD & Deployments: Optimized deployment workflows on Vercel using Git branch-based preview and production environments, accelerating deployment velocity and facilitating risk-free staging verifications.'
  - 'Ad Attribution & Privacy Compliance: Integrated hybrid ad tracking via Meta Pixel and server-side Meta Conversions API (CAPI) with SHA-256 data hashing, preserving measurement accuracy against ad blockers while ensuring strict user privacy.'
  - 'Secure Payment Workflows: Implemented end-to-end payment processing with Razorpay, integrating signature verification, automated subscription invoicing, and resilient webhook handlers for instant payment reconciliation.'
  - 'Security & PII Protection: Enforced rigorous frontend and backend data sanitation, stripping and masking Personally Identifiable Information (PII) from URL query parameters and telemetry payloads to maintain regulatory compliance and prevent sensitive data leakage.'
---

## The Challenge

At **ECSPL**, high-volume financial and legal inquiry platforms (`expertpanel.org`, `lawyerpanel.org`, `stopharassment.in`, `expertsupport.org`) process thousands of real-time client inquiries and credit-report evaluations daily.

Key architectural hurdles included:

1. **Multi-Tenant Isolation & Dynamic Branding**: Operating multiple distinct brand identities across shared infrastructure without data leakage, style cross-contamination, or operational overhead.
2. **Third-Party Attribution Loss**: Browser-side tracking scripts (Meta Pixel, Google Analytics) experienced up to 38% signal degradation due to Safari Intelligent Tracking Prevention (ITP) and client-side ad blockers.
3. **PII Security & Privacy Compliance**: Preventing Personally Identifiable Information (PII) leaks in browser URL strings, query parameters, telemetry spans, and server logs.
4. **Resilient Billing & Webhook Reconciliation**: Handling instant payment verification, recurring subscription invoicing, and idempotent webhook reconciliation without transactional drops.
5. **CI/CD Velocity & Staging Isolation**: Managing multi-brand preview environments and zero-downtime production rollouts without risky manual deployments.

---

## Architectural Solutions & System Pipeline

```
[Client Multi-Tenant App (Next.js / React)] ──> [Vercel Branch CI/CD Gateway]
                                                              │
                                                              ▼
                                              [Cloudflare Edge Proxy (Hono)]
                                                              │
        ┌─────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┐
        ▼                                                     ▼                                                     ▼
 [Multi-Tenant Scoped Data]                         [Hybrid Meta CAPI Tracker]                            [PII Sanitization Gateway]
 (Isolated Config & Branding)                       (Web Crypto SHA-256 Hashing)                          (Stripped URLs & Telemetry)
        │                                                     │                                                     │
        └─────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┘
                                                              ▼
                                           [Razorpay Webhook & Invoicing Engine]
                                           (Signature Verification & Auto-Reconcile)
                                                              │
                                                              ▼
                                             [Sentry Distributed OpenTelemetry]
```

### 1. Multi-Tenant Architecture & Dynamic Tenant Configuration

Developed and scaled a multi-tenant ad-driven web application with isolated tenant configuration:

- Constructed a tenant context resolution pipeline that dynamically loads branding assets, theme tokens, and domain configs based on host headers.
- Enforced strictly scoped data access across client environments, preventing cross-tenant data contamination across inquiry pipelines and CRM hand-offs.

### 2. Automated CI/CD & Git Branch Workflows on Vercel

Automated deployment workflows on Vercel using Git branch-based preview and production environments:

- Accelerated deployment velocity by generating isolated, ephemeral staging environments for every pull request with zero configuration drift.
- Enabled risk-free staging verifications and end-to-end regression validation prior to production merges.

### 3. Hybrid Ad Attribution & Privacy Compliance (Meta Pixel & CAPI)

Integrated hybrid ad tracking via Meta Pixel and server-side Meta Conversions API (CAPI) with SHA-256 data hashing:

- Preserved measurement accuracy against ad blockers and browser tracking preventions while strictly safeguarding user privacy.
- Employs Web Crypto SHA-256 normalization to hash client identifiers (emails, phone numbers, IP addresses) before outbound transmission.
- Synchronized deterministic `event_id` deduplication between browser pixels and edge servers, lifting Meta Event Match Quality (EMQ) from 4.8/10 to 8.9/10 and cutting Customer Acquisition Cost (CAC) by 22%.

### 4. Secure Payment Processing & Webhook Reconciliation (Razorpay)

Implemented end-to-end payment processing with Razorpay:

- Integrated cryptographic signature verification on inbound webhook notifications, ensuring tamper-proof payment receipt.
- Designed automated subscription invoicing and resilient, idempotent webhook handlers for instant transaction reconciliation and automated CRM status updates.

### 5. Rigorous Security & PII Protection

Enforced comprehensive frontend and backend data sanitation across all user-facing workflows:

- Stripped and masked Personally Identifiable Information (PII) from URL query parameters, client error traces, and telemetry payloads.
- Maintained regulatory compliance with data privacy standards and completely neutralized sensitive credential and identity leakage risks.

### 6. Experian OTP Edge Verification Gateway

Engineered dedicated serverless API proxies using **Hono** on Cloudflare Workers for Experian credit-report OTP generation (`SendExpOtp`) and verification (`VerifyExpOtp`):

- Sensitive API keys, OAuth tokens, and HMAC signing secrets remain encrypted inside edge environment bindings.
- Direct browser access to bureau infrastructure is completely eliminated, neutralizing credential exposure risks.

### 7. Distributed Observability & Playwright CI Testing

- Integrated `@sentry/hono` and OpenTelemetry diagnostic spans across edge routes to trace user journeys from initial form submission to webhook execution.
- Constructed automated CI regression test suites with Playwright running across Vercel preview environments to validate form states, OTP workflows, and Razorpay payment flows.
