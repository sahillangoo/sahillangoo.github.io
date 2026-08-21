---
title: 'Enterprise Conversion Funnels & Edge API Proxies'
description: 'Distributed Hono API proxies, Experian credit-report OTP verification, and server-side Meta CAPI dispatching for high-throughput enterprise portals.'
summary: 'Edge API gateways, OTP verification proxies on Hono, and advertising telemetry pipelines.'
category: 'systems'
tags: ['Hono', 'TypeScript', 'Cloudflare Workers', 'Sentry', 'Meta CAPI', 'Playwright']
featured: false
year: 2024
role: 'Backend & Systems Engineer'
order: 5
publishDate: '2024-08-13'
liveUrl: 'https://github.com/ecspl/websites'
githubUrl: 'https://github.com/ecspl/websites'
---

## Overview

Architected and maintained high-throughput advertising funnels, backend proxies, and payment integration pipelines for consumer financial and legal platforms at **@ecspl** (`expertpanel.org`, `lawyerpanel.org`).

## Core Engineering Implementations

- **Experian OTP Gateway on Hono**: Engineered secure edge proxies for Experian credit-report OTP generation and verification (`SendExpOtp` / `VerifyExpOtp`), isolating sensitive API credentials and eliminating direct browser-to-credit-bureau requests.
- **Server-Side Meta Conversions API (CAPI)**: Built an environment-aware CAPI routing module that validates preview vs. production domains, dispatches server-side purchase and lead events, and prevents duplicate conversions.
- **Production Sentry Exception Triage**: Conducted deep triages of unresolved Sentry errors, diagnosing and fixing Alpine.js client race conditions and unblocking payment checkout flows.
- **Automated Playwright E2E Testing**: Developed automated browser test suites verifying checkout, Zoho form lead capture, and OTP verification flows across Netlify and Vercel webservers.
