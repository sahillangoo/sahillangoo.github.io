---
title: 'AgencyPulse | Marketing Operations Dashboard & Go Event Gateway'
resumeTitle: 'Agency Marketing Dashboard & Go CAPI Engine'
description: 'High-throughput marketing operations dashboard and event dispatch engine engineered in Go, optimizing multi-client lead intake, form validation, and server-side Meta CAPI streaming.'
summary: 'Marketing operations dashboard and server-side event gateway built in Go, handling agency client form submissions, SHA-256 PII hashing, and low-latency Meta CAPI event delivery.'
category: 'systems'
tags:
  - go
  - meta-capi
  - postgresql
  - redis
  - rest-api
  - docker
  - typescript
  - tailwindcss
featured: false
year: 2026
role: 'Lead Backend & Systems Architect'
order: 13
publishDate: '2026-09-22'
highlights:
  - 'High-Throughput Go Event Service: Architected a concurrent REST API service in Go, ingesting client marketing lead forms with sub-15ms p99 response times.'
  - 'Server-Side Meta CAPI Streaming: Engineered direct asynchronous event dispatching to Meta Conversions API (CAPI) with SHA-256 PII hashing, bypassing client ad-blockers and securing measurement fidelity.'
  - 'Idempotent Form Processing: Integrated Redis queues and PostgreSQL transactions to prevent duplicate lead submissions and guarantee resilient webhook retries.'
  - 'Operational Telemetry & Multi-Client Access: Built agency client dashboards with scoped multi-client access, event reconciliation logs, and real-time delivery tracking.'
---

## Project Overview

**AgencyPulse** is a specialized marketing operations dashboard and server-side event streaming platform engineered for digital agencies managing high-volume client ad spend and lead generation funnels.

> **Status Notice (Pre-Release / In Development)**: This platform is currently in active development and internal staging for agency client deployment. Public production endpoints and client administrative consoles are scheduled for release following end-to-end security audits.

Modern digital marketing agencies face a critical measurement crisis: browser-side tracking scripts (Meta Pixel, Google Tag) experience between 25% and 40% signal degradation due to Safari Intelligent Tracking Prevention (ITP), aggressive ad-blockers, and mobile network disconnects. AgencyPulse addresses this by moving lead intake and attribution tracking entirely to a dedicated Go backend.

---

## Architectural Challenges

1. **High-Concurrency Form Intake**: Marketing campaigns launch synchronized bursts of ad traffic that generate thousands of simultaneous form submissions during peak hours. The intake tier must accept payloads instantly without dropping requests or exhausting server resources.
2. **Attribution Loss & Ad-Blocker Resistance**: Traditional client-side pixels fail silently when blocked by browser extensions. Attribution data must be captured server-side and matched against ad platform APIs using deterministic first-party signals.
3. **PII Protection & Regulatory Compliance**: Contact details, telephone numbers, and email addresses must be cryptographically hashed (SHA-256) prior to upstream transmission to prevent sensitive customer data leaks.
4. **Queue Durability & Webhook Idempotency**: Network timeouts from third-party advertising APIs must not cause lost leads. The system requires durable queuing and exponential backoff retry semantics.

---

## System Architecture & Event Pipeline

```
[Agency Client Web Forms]
           │
           │ (HTTPS / JSON POST)
           ▼
┌──────────────────────────────────────────────┐
│       Go Ingestion Daemon (Fiber / Chi)      │
│  - Input Sanitization & Zod/Schema Validation│
│  - SHA-256 Normalization for PII Signals     │
│  - Token Bucket Rate Limiting                │
└──────────────────────────────────────────────┘
           │
           ├─── (Asynchronous Push) ───> [Redis Task Queue]
           │                                    │
           ▼                                    ▼
┌──────────────────────┐             ┌────────────────────────────────┐
│  PostgreSQL Storage  │             │   Go Worker Pool (Goroutines)  │
│  - Client Leads Log  │             │   - Batch Event Assembly       │
│  - Form Metadata     │             │   - Exponential Backoff Retries│
│  - Attribution State │             └────────────────────────────────┘
└──────────────────────┘                                │
                                                        ▼
                                         ┌────────────────────────────┐
                                         │   Meta Conversions API     │
                                         │   (Server-Side CAPI Graph) │
                                         └────────────────────────────┘
```

---

## Key Technical Decisions

### Why Go for the Ingestion Engine?

While traditional agency portals rely on monolithic CMS installations or interpreted scripts, AgencyPulse utilizes a compiled Go binary:

- **Minimal Memory Footprint**: Goroutine concurrency allows thousands of concurrent form submissions to be buffered in memory with a baseline consumption of under 40MB RAM.
- **Predictable Garbage Collection**: Sub-millisecond GC pauses ensure that client-side form submissions receive instantaneous acknowledgment without perceptible latency.
- **Standard Library Robustness**: Go's native HTTP primitives and crypto packages enable zero-dependency cryptographic hashing (SHA-256) and connection pooling.

### Redis Queue & Idempotent Worker Pool

Form submissions are written immediately to a persistent Redis list before external network requests occur. A pool of background Go worker routines pulls jobs off the queue, constructs Meta Graph API payloads, and dispatches them in parallel. If Meta's API returns a 429 (rate limited) or 5xx response, jobs are rescheduled with jittered exponential backoff, guaranteeing zero dropped conversions.

---

## Planned Capabilities & Roadmap

- **Live Client Agency Console**: Multi-tenant dashboard providing agencies with visual event match quality (EMQ) indicators, deduplication rates, and real-time form volume charts.
- **Multi-Destination Dispatch**: Extending server-side event routing to support Google Ads Offline Conversions, TikTok Events API, and LinkedIn Conversion API from a single form submission.
- **Automated Anomaly Detection**: Slack and Telegram alerting daemons triggered when form submission volume drops below statistical thresholds during active ad campaigns.
