---
title: 'Enterprise Conversion Funnels & Edge API Proxies'
description: 'Distributed Hono API proxies, Experian credit-report OTP verification, and server-side Meta CAPI dispatching for high-throughput enterprise portals.'
summary: 'Edge API gateways, OTP verification proxies on Hono, and advertising telemetry pipelines.'
category: 'systems'
tags:
  - hono
  - typescript
  - cloudflare-workers
  - sentry
  - meta-capi
  - playwright
featured: false
year: 2024
role: 'Backend & Systems Engineer'
order: 5
publishDate: '2024-08-13'
liveUrl: 'https://github.com/ecspl/websites'
githubUrl: 'https://github.com/ecspl/websites'
---

## The Challenge

High-volume financial and legal inquiry platforms (`expertpanel.org`, `lawyerpanel.org`) handle thousands of real-time credit-report inquiries and user registrations daily. Key challenges included:

1. **Third-Party Signal Loss**: Safari ITP and content blockers were stripping up to 35% of client-side advertising conversion signals, inflating acquisition costs.
2. **Security & PII Isolation**: Direct browser communication with credit bureau APIs (Experian) exposed credentials and risk vectors.
3. **Frontend Runtime Errors**: Unmonitored client-side race conditions in legacy form scripts were intermittently interrupting checkout conversions.

---

## Architectural Solutions

```
[User Browser] ──> [Cloudflare Edge Proxy (Hono)]
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    [Experian OTP]   [Meta CAPI]     [Sentry Telemetry]
    (/api/exp-otp)   (SHA-256 PII)   (Real-time Triage)
```

### 1. Experian OTP Edge Verification Gateway

Built dedicated serverless proxies on **Hono** and Cloudflare Workers for Experian credit-report OTP generation (`SendExpOtp`) and validation (`VerifyExpOtp`). Sensitive API credentials and HMAC secrets remain locked in encrypted edge worker environment bindings, completely isolating the browser from raw bureau endpoints.

### 2. Dual-Channel Meta Conversions API (CAPI)

Engineered an environment-aware CAPI routing module that validates preview vs. production domains, normalizes user data with Web Crypto SHA-256 hashing, and matches deterministic `event_id` parameters to prevent duplicate attribution. Increased Event Match Quality (EMQ) from **4.8/10** to **8.9/10**.

### 3. Production Exception Triage with Sentry

Conducted systematic triages of production exception streams in Sentry, identifying and resolving Alpine.js race conditions during form submissions and unblocking Razorpay checkout flows.

### 4. End-to-End Test Automation with Playwright

Developed comprehensive Playwright test suites executing across netlify/vercel preview webservers to validate checkout integrity, Zoho CRM lead handoffs, and OTP verification flows prior to production release.
