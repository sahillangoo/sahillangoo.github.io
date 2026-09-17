---
title: 'EduCore | Full-Stack School Management SaaS & Automated Fee Platform'
resumeTitle: 'Full-Stack School Management Application'
description: 'Enterprise school management platform engineered with Next.js 16 standalone build, Shadcn UI, TanStack ecosystem, Drizzle ORM, MySQL, Better Auth RBAC, and Cloudflare edge services.'
summary: 'Full-stack school management SaaS with Next.js 16 standalone build on Hostinger VPS, TanStack grids, Drizzle ORM, Better Auth RBAC, and automated Telegram/email fee alerts.'
category: 'web-app'
tags:
  - nextjs
  - react
  - shadcn-ui
  - tanstack-table
  - tanstack-query
  - tanstack-router
  - tanstack-form
  - zod
  - drizzle-orm
  - mysql
  - better-auth
  - cloudflare-waf
  - cloudflare-r2
  - telegram-api
  - nodemailer
  - razorpay
  - tailwindcss
  - typescript
  - sentry
featured: true
year: 2024
role: 'Lead Full Stack & Systems Architect'
order: 2
publishDate: '2024-08-18'
liveUrl: 'http://kwschool.in/'
highlights:
  - 'Full-Stack Architecture & Deployment: Architected and deployed an enterprise-grade school management platform using Next.js 16 configured with a standalone output build hosted on Hostinger VPS, reducing runtime memory overhead and optimizing server-side execution.'
  - 'Student Data Management: Engineered scalable administrative data grids using TanStack Table and Shadcn UI to smoothly manage 500+ student profiles, enrollment records, academic standings, and attendance logs with zero UI latency.'
  - 'Client-Side State & Async Data: Utilized TanStack Query and TanStack Router to establish responsive data caching, optimistic UI updates, and intelligent prefetching, reducing API request redundancy by 40%.'
  - 'Type-Safe Forms & Validation: Standardized all institutional data intake pipelines using TanStack Form with strict Zod schema validation, eliminating client-server schema drifts across complex multi-step student admission and grading forms.'
  - 'Relational Data Modeling & ORM: Designed and normalized relational schemas in MySQL using Drizzle ORM, crafting type-safe queries, composite indexes, and automated migrations that maintained sub-50ms execution times across complex joins.'
  - 'Authentication & Role-Based Access (RBAC): Integrated Better Auth to implement strict session-based authentication and role-based access control, securing sensitive student and administrative data across distinct permission tiers (Admin, Teacher, Student, Parent).'
  - 'Edge Security & Cloud Asset Storage: Integrated Cloudflare CDN and WAF rules to ensure high availability and defense against malicious traffic, utilizing Cloudflare R2 object buckets for cost-effective, high-throughput storage of documents, profile photos, and report cards.'
  - 'Fee Processing & Automated Multi-Channel Alerts: Built an end-to-end fee tracking and payment reconciliation pipeline, featuring automated real-time receipt generation and multi-channel notifications dispatched via Telegram Bot API and transactional email.'
---

## The Challenge

Educational institutions manage hundreds of complex daily operations across student lifecycles, fee billing schedules, examination grading, and parent communications.

Key architectural hurdles included:

1. **Hostinger VPS Runtime Optimization**: Deploying a complex Next.js application on memory-constrained VPS infrastructure while preventing OOM errors and maintaining snappy server responses.
2. **High-Density Student Data Records**: Rendering and searching 500+ student profiles, enrollment histories, and attendance logs without client-side UI latency.
3. **Multi-Step Form Validation & Schema Drift**: Preventing inconsistencies between frontend user input and database schemas across complex admission, grading, and fee setup workflows.
4. **Multi-Tier Role-Based Security**: Restricting sensitive records across distinct tiers (Super Admin, Teacher, Student, Parent) with zero permission leakage.
5. **Fee Calculation Complexity & Ledger Reconciliation**: Automating multi-term fee calculations, sibling discounts, Razorpay payment verification, and multi-channel payment alerts.
6. **High-Throughput Document & Media Storage**: Storing and serving thousands of high-resolution student photos, report cards, and identity documents cost-effectively.

---

## Architectural Solutions & Systems Pipeline

```
[Guardian /pay-fees & Public Portal]           [Admin & Teacher Dashboard]
                   │                                        │
                   ▼                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│     Next.js 16 Standalone Output Build (Hosted on Hostinger VPS)       │
├────────────────────────────┬───────────────────────────────────────────┤
│ Better Auth Session Guard  │ Shadcn UI + TanStack Form (Zod)           │
│ (RBAC: Admin/Teacher/Parent)│ TanStack Table + Query + Router           │
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
│ Razorpay & Alerts Pipeline │              │   Drizzle ORM + MySQL      │
│ (Telegram Bot & Nodemailer)│              │   (Cloudflare CDN, WAF, R2)│
└────────────────────────────┘              └────────────────────────────┘
```

### 1. Full-Stack Architecture & Hostinger Standalone Deployment

Architected and deployed an enterprise-grade school management platform using **Next.js 16**:

- Configured with a standalone output build hosted on a Hostinger VPS, reducing runtime memory overhead and optimizing server-side execution.
- Configured Node.js process managers and connection pooling to ensure reliable multi-tenant uptime with minimal infrastructure cost.

### 2. High-Performance Student Data Management (TanStack Table & Shadcn UI)

Engineered scalable administrative data grids using **TanStack Table** and **Shadcn UI**:

- Efficiently manages 500+ student profiles, enrollment records, academic standings, and attendance logs with zero UI latency.
- Implemented multi-column sorting, fuzzy search indexing, and class-level facet filters for instant student record retrieval.

### 3. Client-Side State & Async Data (TanStack Query & TanStack Router)

Utilized **TanStack Query** and **TanStack Router** to establish a responsive client architecture:

- Configured optimistic UI mutations, intelligent cache invalidation, and route prefetching, cutting redundant API requests by 40%.
- Synchronized table pagination and filter states with URL search parameters for linkable administrative views.

### 4. Type-Safe Forms & Schema Validation (TanStack Form with Zod)

Standardized all institutional data intake pipelines using **TanStack Form** with strict **Zod** schema validation:

- Eliminated client-server schema drifts across complex multi-step student admission and examination grading forms.
- Enforced instant field-level validation and asynchronous validation checks for duplicate student admission numbers and identity credentials.

### 5. Relational Data Modeling & ORM (Drizzle ORM & MySQL)

Designed and normalized relational database schemas in **MySQL** using **Drizzle ORM**:

- Modeled student lifecycles, parent-student relationships, fee schedules, and academic marks across 20+ normalized tables.
- Crafted type-safe queries, composite indexes, and automated migrations via `drizzle-kit` that maintained sub-50ms execution times across complex multi-table joins.

### 6. Authentication & Role-Based Access Control (Better Auth RBAC)

Integrated **Better Auth** to implement strict session-based authentication and role-based access control:

- Secured sensitive student and administrative data across distinct permission tiers: **Admin**, **Teacher**, **Student**, and **Parent**.
- Enforced type-safe server action guards and layout middleware, preventing unauthorized horizontal or vertical privilege escalations.

### 7. Edge Security & Cloud Asset Storage (Cloudflare CDN, WAF & R2)

Integrated Cloudflare infrastructure to protect and scale school operations:

- Configured Cloudflare CDN caching and WAF security rules to ensure high availability and defense against malicious traffic and automated bot probes.
- Utilized **Cloudflare R2** object storage buckets for cost-effective, high-throughput storage and delivery of documents, student profile photos, and report cards.

### 8. Fee Processing & Automated Multi-Channel Alerts

Built an end-to-end fee tracking and payment reconciliation pipeline:

- Integrated Razorpay webhook handlers with cryptographic signature verification for instant payment reconciliation.
- Automated real-time receipt generation and multi-channel notifications dispatched via **Telegram Bot API** and transactional email using **Nodemailer**.
- Provided parents with a self-service `/pay-fees` portal featuring stateless PIN authentication and instant printable PDF receipts.
