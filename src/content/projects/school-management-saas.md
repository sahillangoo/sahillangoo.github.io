---
title: 'EduCore | Enterprise School Management & Fee Billing SaaS Platform'
description: 'A comprehensive Next.js 16 App Router school ERP and automated fee billing platform featuring Drizzle ORM, Better Auth, Razorpay reconciliation, pdfmake generation, and public guardian portals.'
summary: 'Enterprise school management SaaS with automated fee calculation, Razorpay webhook reconciliation, exam rankings, printable ID cards, and guardian portals.'
category: 'web-app'
tags:
  - nextjs
  - react
  - drizzle-orm
  - mysql
  - better-auth
  - razorpay
  - pdfmake
  - visx
  - tailwindcss
  - typescript
  - sentry
featured: true
year: 2024
role: 'Lead Full Stack & Systems Architect'
order: 2
publishDate: '2024-08-18'
liveUrl: 'http://kwschool.in/'
---

## The Challenge

Educational institutions manage hundreds of complex daily operations across student lifecycles, complex fee billing schedules, examination grading, and parent communications.

Traditional legacy school software suffers from three critical bottlenecks:

1. **Fee Calculation Complexity & Payment Leakage**: Schools operate multi-tiered fee structures with student-specific overrides, sibling discounts, and partial payment installments. Manual ledger tracking leads to missed dues, un-reconciled bank transfers, and billing errors.
2. **Disconnected Parent Experience**: Parents face long administrative queues to pay fees or check report cards due to the absence of secure, mobile-first self-service portals.
3. **Data Silos & Scalability Bottlenecks**: Fragmentation between student records, grade calculations, fee collections, and identity card generation requires redundant data entry across disparate tools.

---

## Architectural Solutions & Systems Pipeline

```
[Public Landing / Guardian /pay-fees]          [Admin & Teacher Dashboard]
                   │                                        │
                   ▼                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Next.js 16 App Router + React 19                     │
├────────────────────────────┬───────────────────────────────────────────┤
│ Better Auth Session Guard  │ TanStack Query v5 + React Form + Nuqs     │
│ (RBAC: Super Admin/Staff)  │ (Optimistic Mutations & URL Table State)  │
└──────────────┬─────────────┴─────────────────────────────┬─────────────┘
               │                                           │
               ▼                                           ▼
┌────────────────────────────┐              ┌────────────────────────────┐
│   Automated Fee Engine     │              │  Exam, Grading & ID Print  │
│  (Plans, Overrides, Ledger)│              │  (visx Charts, pdfmake)    │
└──────────────┬─────────────┘              └──────────────┬─────────────┘
               │                                           │
               ▼                                           ▼
┌────────────────────────────┐              ┌────────────────────────────┐
│ Razorpay Webhook Gateway   │              │   Drizzle ORM + MySQL      │
│ (SHA-256 Idempotency)      │              │   (Connection Pool & R2)   │
└────────────────────────────┘              └────────────────────────────┘
```

### 1. High-Performance Full-Stack Next.js 16 & React 19 Core

Engineered a modular, multi-tier enterprise SaaS using the **Next.js 16 App Router** with **React 19** and the **React Compiler**:

- **Strict Role-Based Access Control (RBAC)**: Integrated **Better Auth** with type-safe session guards (`requireRole`, `requireAdminSession`), isolating super-admin privileges, teacher grading views, and parent portals.
- **Type-Safe Drizzle ORM + MySQL Data Layer**: Designed normalized schemas across 20+ relational tables with automated migration pipelines (`drizzle-kit`).

### 2. Automated Fee Billing & Razorpay Webhook Engine

Constructed a flexible fee computation and reconciliation engine:

- **Dynamic Fee Engine**: Automatically calculates effective balances per student by combining base class fee plans, fee head items, and student-specific discount overrides.
- **Idempotent Razorpay Webhook Reconciliation**: Validates cryptographic payment signatures, locks invoice state transitions, handles payment reversals, and triggers automated SMS/Telegram alerts.
- **Overdue Risk Analytics**: Built cron jobs and `@visx` financial charts tracking collection velocity, aged delinquencies, and projected revenue.

### 3. Public Self-Service Guardian Portal (`/pay-fees`)

Developed a secure, zero-friction portal for parents:

- **PIN & Admission Authentication**: Generates stateless encrypted session tokens (`jose`) without requiring permanent account creation.
- **Instant Checkout & PDF Receipts**: Enables one-click fee payments via Razorpay and renders cryptographic, printable fee receipts directly in the browser via **`pdfmake`**.

### 4. Examination Management & Analytics Suite

Built an end-to-end examination lifecycle manager:

- **Bulk CSV/Excel Marks Ingestion**: Validates and imports hundreds of student score sheets using `papaparse` with immediate error reporting.
- **Automatic Grading & Ranking**: Computes class percentiles, grade boundaries, and subject distributions in sub-second database transactions.

### 5. High-Resolution ID Card & Document Print Engine

Implemented a dedicated client-side print engine under `src/app/(print)`:

- Renders pixel-perfect, double-sided student ID cards, report cards, and fee ledgers utilizing custom Canvas fonts (Times New Roman), `html2canvas-pro`, and `jspdf`.

### 6. Production Observability & Standalone Containerization

- Integrated **Sentry (`@sentry/nextjs`)** capturing server action exceptions and database query latency.
- Authored multi-stage standalone Docker builds deploying reliably to **Coolify** and Cloudflare R2 object storage.
