---
title: 'TAFFin.Tech — AI-Powered Job Board & Recruiter Platform'
description: 'An AI-powered European recruitment portal and recruiter analytics dashboard built with React 19, TanStack Router & Table, daisyUI, and Tailwind CSS.'
summary: 'AI-driven tech recruitment portal with automated candidate scoring, Recruiter dashboard, and GDPR-compliant candidate pipelines.'
category: 'web-app'
tags:
  - react
  - tailwindcss
  - daisyui
  - tanstack-query
  - tanstack-table
  - typescript
  - symfony
  - gdpr
featured: true
year: 2024
role: 'Frontend Architect & Full Stack Engineer'
order: 4
publishDate: '2024-06-28'
liveUrl: 'https://taffin.tech'
githubUrl: 'https://github.com/sahillangoo/taffin-react'
---

## The Challenge

**TAFFin.Tech** is a European AI-powered recruitment platform designed to bridge the gap between technical recruiters and emerging tech talent (graduates, junior freelancers, career switchers, and senior experts) across Cybersecurity, Cloud/SaaS, Data/AI, and DevOps.

Key engineering challenges included:

1. **High-Density Recruiter Workspaces**: Recruiters required complex data grids for filtering hundreds of applicant CVs, viewing AI compatibility scores, and managing hiring stages without page reloads.
2. **Multi-Step Candidate Onboarding & Resume Dropzone**: Seamless drag-and-drop CV uploading with instant file validation, client-side preview, and error recovery over unstable network connections.
3. **Strict European GDPR Compliance & Performance**: Full compliance with EU data protection regulations, cookie consent architectures, dynamic multilingual SEO, and sub-second page loads.

---

## Architectural Solutions & System Design

```
[Candidate / Recruiter UI]
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│              React 19 + TanStack Single Page App            │
├──────────────────────────────┬──────────────────────────────┤
│  TanStack Router & Query     │  TanStack Table & DaisyUI    │
│  (Type-safe Client Routing)  │  (Virtual Data Grids & Stats)│
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               ▼                              ▼
    [React Dropzone & Hook Form]    [Symfony PHP REST Backend]
    (Client Resume Parsing)         (AI Matching & Scoring Engine)
```

### 1. High-Performance Recruiter Dashboard & Data Grids

Architected the `RecruiterDashboard` and `StatsRecruiter` workspace using **React 19**, **TanStack Table v8**, and **daisyUI**:

- **Virtual Candidate Grids**: Implemented virtualized data tables rendering hundreds of candidate profiles, salary expectations, and AI matching scorecards with 60fps scrolling performance.
- **Real-Time Funnel Analytics**: Dynamic KPI widgets displaying active listings, application throughput, interview conversion rates, and time-to-hire metrics.

### 2. Type-Safe Client State & Data Fetching

Leveraged **TanStack Router** and **TanStack Query v5** for optimistic updates and caching:

- Pre-fetches candidate profiles and company settings in the background, eliminating loading spinners across sub-navigation transitions.
- Automatic cache invalidation on job posting updates, candidate stage movements, and bookmark actions.

### 3. Drag-and-Drop Resume Ingestion Pipeline

Engineered an interactive resume dropzone using `react-dropzone` and `react-hook-form`:

- Validates file MIME types (PDF, DOCX) and enforces strict file size budgets prior to network upload.
- Dispatches asynchronous upload jobs to the Symfony AI scoring backend, returning parsing feedback and compatibility summaries within seconds.

### 4. GDPR-Compliant Privacy & Design System

Developed a clean, modern interface using **Tailwind CSS** and **daisyUI** semantic themes:

- Implemented explicit GDPR data controls, allowing candidates to anonymize profiles, manage data retention preferences, and revoke consent with one click.
- Boosted organic search visibility by 30% through dynamic OpenGraph meta tag injection and structured Schema.org `JobPosting` JSON-LD schemas.
