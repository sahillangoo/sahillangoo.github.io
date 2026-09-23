---
title: 'Listify: Business Discovery & Ratings Platform'
resumeTitle: 'Listify Business Discovery Platform'
description: 'A server-rendered business directory and rating platform built in core PHP and Bootstrap with Argon2id authentication, MySQL relational schema, and Playwright test coverage.'
summary: 'Server-rendered local business discovery, rating, and directory management platform built in core PHP and MariaDB.'
category: 'web-app'
tags:
  - php
  - mysql
  - bootstrap
  - javascript
  - playwright
  - ssr
featured: false
year: 2023
role: 'Lead Developer (B.Tech Capstone Project)'
order: 14
publishDate: '2023-12-15'
liveUrl: 'https://github.com/sahillangoo/listify-php'
githubUrl: 'https://github.com/sahillangoo/listify-php'
highlights:
  - 'Engineered a relational business catalog schema with foreign key constraints, cascade operations, and indexed geo-coordinates for local discovery.'
  - 'Implemented server-rendered MVC architecture using core PHP 8.2 and MariaDB with Argon2id password hashing and session tokens.'
  - 'Integrated interactive business reviews and star rating calculation pipelines linking users, listings, and moderation states.'
  - 'Constructed automated end-to-end regression suites using Playwright covering authentication, listing lifecycle, and edge navigation.'
---

## The Challenge

During undergraduate engineering studies, local commercial establishments, healthcare clinics, and educational institutions in Kashmir lacked a unified, searchable web directory. Small businesses relied primarily on informal social messaging groups without persistent physical addresses, verified contact information, operating categories, or structured customer feedback mechanisms.

---

## Architectural Solutions & Server-Side Rendering

```
[Browser Client]
       │
       ▼
 [Apache / Nginx] ──(FastCGI)──> [Core PHP 8.2 Runtime]
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
       [Session & Auth Engine]                      [MySQL / MariaDB]
      (Argon2id Hash / Cookies)                 (Indexed Catalog Schema)
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         ▼
                             [Bootstrap 5 SSR HTML]
```

### 1. Relational Database Modeling & Cascade Integrity

Designed a normalized relational schema in MySQL/MariaDB consisting of structured entities for users, business listings, customer reviews, and persistent authentication sessions:

- **Cascade Referential Integrity**: Implemented foreign key constraints with `ON DELETE CASCADE` across sessions and listings, ensuring orphaned records are purged automatically upon user deletion.
- **Spatial Coordinates**: Preserved double-precision `latitude` and `longitude` fields per listing to support geographic mapping, radius filtering, and navigation.
- **Database Indexing**: Positioned index keys across `user_id`, active status flags, and listing categories to maintain fast lookup times as record counts scale.

### 2. Authentication & Session Security

Rather than relying on vulnerable legacy hashing functions, the authentication module was built around modern cryptographic standards:

- **Argon2id Password Hashing**: Utilized PHP's native `password_hash()` implementing the memory-hard `PASSWORD_ARGON2ID` algorithm to defend against GPU-accelerated brute-force attacks.
- **Session Tokens**: Built a dedicated database-backed `sessions` table tracking cryptographically random hex tokens, user associations, and explicit datetime expirations.
- **Role-Based Access Control**: Structured two distinct permission tiers (`user` vs `admin`) governing listing approvals, review moderation, and catalog edits.

### 3. Business Discovery, Categorization & Ratings

Engineered dynamic server-side rendering routes displaying curated category channels:

- **Categorized Catalogs**: Built targeted views for restaurants, banks, educational institutions, hospitals, pharmacies, and ATMs.
- **Aggregated Ratings Engine**: Linked authenticated user reviews to specific business listing identifiers, calculating average rating scores dynamically during server-side template assembly.

### 4. End-to-End Test Automation with Playwright

To verify form submission validation, session state persistence, and cross-browser rendering reliability, an end-to-end test suite was built using **Playwright**:

- Automated browser test suites covering Chromium, Firefox, and WebKit rendering engines.
- Test workflows validating user registration, session authentication, listing creation, and review dispatch.
