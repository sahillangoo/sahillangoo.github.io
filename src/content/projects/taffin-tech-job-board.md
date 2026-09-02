---
title: 'TAFFin.Tech | AI-Driven European Tech Recruitment Marketplace'
description: 'A full-stack bilingual European recruitment marketplace engineered with Symfony, React, Redux Toolkit, TanStack Router, Lingui i18n, daisyUI, and Tailwind CSS.'
summary: 'Bilingual AI-powered job board and recruiter marketplace pairing Symfony PHP with React 18, Redux Toolkit, Lingui i18n, and dynamic email pipelines.'
category: 'web-app'
tags:
  - react
  - symfony
  - redux
  - tanstack-query
  - tanstack-router
  - lingui-i18n
  - tailwindcss
  - daisyui
  - typescript
  - php
  - gdpr
featured: true
year: 2024
role: 'Frontend Architect & Full Stack Engineer'
order: 5
publishDate: '2024-06-28'
liveUrl: 'https://taffin.tech'
githubUrl: 'https://github.com/Cloud-Innovation-Partners/CIP_Marketplace'
---

## The Challenge

**TAFFin.Tech** (developed for **Cloud Innovation Partners**) is an AI-driven European recruitment marketplace connecting tech talent (graduates, junior freelancers, career switchers, and senior engineers) across Cybersecurity, Cloud/SaaS, Data/AI, and DevOps with hiring companies across France and Europe.

Key architectural hurdles included:

1. **Full-Stack Hybrid Monolith & SPA Integration**: Merging a robust **Symfony PHP** backend with interactive **React** single-page interfaces (`@symfony/ux-react`, `@hotwired/stimulus`, Webpack Encore) without duplicating routing logic or causing client hydration mismatches.
2. **Bilingual Localization (EN / FR)**: Delivering complete, compile-time internationalization across all user profiles, recruiter dashboards, job listings, and automated email notifications.
3. **Complex Recruiter Workspaces & Redux State**: Providing recruiters with high-density candidate workspaces, filterable talent pools, candidate bookmarking, and application status funnels with zero latency.
4. **European GDPR Compliance & Deliverability**: Complying with strict EU privacy regulations (candidate data anonymization, consent management) and optimizing transactional email templates for mobile mail clients.

---

## Architectural Solutions & System Pipeline

```
[Candidate / Recruiter Web Client]
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│    Hybrid React SPA + Symfony Webpack Encore Integration    │
├──────────────────────────────┬──────────────────────────────┤
│  TanStack Router & Query v5  │  Redux Toolkit Global Store  │
│  (Type-safe Route Generation)│  (Recruiter Workspaces)      │
├──────────────────────────────┼──────────────────────────────┤
│  Lingui i18n (EN / FR)       │  DaisyUI & Tailwind CSS      │
│  (Compile-time Catalogs)     │  (Accessible UI System)      │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               ▼                              ▼
    [React Hook Form & Dropzone]    [Symfony PHP 8 Backend Engine]
    (Resume Ingestion & Parsing)    (Doctrine ORM, Auth & Matcher)
                                              │
               ┌──────────────────────────────┴──────────────────────────────┐
               ▼                                                             ▼
    [Bilingual Email Pipeline]                                    [Dynamic XML Sitemap]
    (Personalized EN/FR Match Alerts)                             (Automated lastmod & SEO)
```

### 1. Hybrid React & Symfony Architecture (`@symfony/ux-react`)

Constructed a high-performance hybrid architecture connecting **Symfony** with **React 18** and Webpack Encore:

- Integrated **TanStack Router** (`@tanstack/router-cli`) with automatic file-based route generation (`tsr generate`), enabling type-safe client navigation inside Symfony Twig layouts.
- Managed complex candidate state, application filters, and recruiter actions with **Redux Toolkit** (`@reduxjs/toolkit`) and **TanStack Query v5** for optimistic UI updates.

### 2. Full-Scale Bilingual Localization with Lingui i18n

Engineered a compile-time internationalization system using **Lingui i18n** (`@lingui/react`, `@lingui/cli`):

- Extracted and compiled message catalogs for English and French, delivering instantaneous language switching with zero runtime bundle overhead.
- Ensured consistent date/time and currency formatting across both locales via `dayjs` and `Intl` APIs.

### 3. Automated Bilingual Email Dispatch Engine

Designed personalized transactional email templates in English and French for:

- **Job Match Alerts**: Automatically dispatches tailored job notifications with candidate-skill compatibility scores directly to applicant inboxes.
- **Mobile Client Optimization**: Formatted email HTML to eliminate target-blank security vulnerabilities and ensure fluid rendering across Apple Mail, Gmail, and Outlook.

### 4. Recruiter Workspaces & Candidate Portfolios

Authored modular frontend components for:

- `UserProfileProjects`: Interactive portfolio showcase displaying developer repositories, live demos, and verified technical experiences.
- `RecruiterDashboard` & `StatsRecruiter`: High-density candidate data grids, company profile management, and application funnel telemetry.

### 5. European GDPR Compliance & Search Equity

- Implemented explicit GDPR candidate privacy controls, enabling talent to manage data retention, anonymize CV details, and revoke recruiter visibility on demand.
- Engineered automated XML sitemap generators (`sitemap.xml`, `sitemap-base.xml`) with dynamic `lastmod` timestamps, boosting organic search indexation by 30%.
