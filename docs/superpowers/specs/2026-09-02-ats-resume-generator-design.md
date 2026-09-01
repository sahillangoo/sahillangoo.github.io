# ATS Multi-Role Resume Generator System — Design Specification

**Date:** 2026-09-02  
**Author:** Sahil Langoo & Antigravity  
**Target Roles:** Frontend Engineer, Full-Stack Engineer, Forward Deployed Engineer (FDE), Cloud & CI/CD DevOps Engineer  
**Output Target:** `public/resumes/` (Optimized, ATS-compliant 1-page PDFs)

---

## 1. Executive Overview & Goals

The objective is to establish an automated, data-driven, ATS-bulletproof resume generation pipeline. Rather than manually creating or hardcoding PDF resumes in third-party tools, the portfolio repository will feature a dedicated offline generator command (`pnpm generate:resumes`) that compiles structured JSON/TypeScript data into 4 role-tailored, single-page engineering resumes using **Typst**.

### Key Architectural Pillars

1. **Single Source of Truth:** Shared contact info, education, and credentials reside in `src/const/site.ts` and `src/data/resumes/base.json`.
2. **Role Specialization:** 4 distinct datasets highlight role-specific skills, architectures, and Google XYZ impact bullets.
3. **Harvard / Google XYZ Impact Standard:** Bullet formulation strictly follows `[Action Verb] + [Technical Tool/Architecture] + [Mechanism] -> [Quantified Delta]`.
4. **ATS & CMap Unicode Compliance:** Single-column layout, standard US-Letter 1-page budget (<450 words), native Unicode font embedding (Latin Modern / TeX Gyre), zero Type 3 bitmap fonts or ligature parsing bugs.
5. **Clean Separation of Concerns:** Generator scripts, templates, and raw datasets live in `scripts/resume-generator/` and `src/data/resumes/`, completely excluded from the public client bundle. Only final compiled PDFs are emitted to `public/resumes/`.

---

## 2. System Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER (Source of Truth)                     │
├───────────────────────────────────┬─────────────────────────────────────┤
│ • src/const/site.ts (Contact)     │ • src/data/resumes/base.json (Edu)  │
│ • src/data/resumes/roles/         │ • src/content/experience/*.json     │
│   ├── frontend.json               │ • src/content/projects/*.md         │
│   ├── fullstack.json              │                                     │
│   ├── forward-deployed.json       │                                     │
│   └── devops.json                 │                                     │
└─────────────────┬─────────────────┴──────────────────┬──────────────────┘
                  │                                    │
                  ▼                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     GENERATOR PIPELINE (Typst Engine)                   │
├─────────────────────────────────────────────────────────────────────────┤
│ • scripts/resume-generator/template.typ (Clean 1-page Typst DSL)        │
│ • scripts/resume-generator/generate.ts (Data merging & compilation)     │
│ • scripts/resume-generator/validate.ts (ATS & Page Budget validation)   │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        OUTPUT (public/resumes/)                         │
├─────────────────────────────────────────────────────────────────────────┤
│ 📄 Resume-Sahil-Langoo-Frontend.pdf                                     │
│ 📄 Resume-Sahil-Langoo-FullStack.pdf                                    │
│ 📄 Resume-Sahil-Langoo-Forward-Deployed.pdf                             │
│ 📄 Resume-Sahil-Langoo-DevOps.pdf                                       │
│ 📄 Resume-Sahil-Langoo.pdf (Canonical / Default)                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Schema & Directory Structure

```
sahillangoo-portfolio/
├── src/
│   ├── const/
│   │   └── site.ts                      # Updated with full contact & phone metadata
│   └── data/
│       └── resumes/
│           ├── types.ts                 # TypeScript types for resume data schemas
│           ├── base.json                # Shared Education, Certifications, Personal metadata
│           └── roles/
│               ├── frontend.json        # Frontend Engineer profile
│               ├── fullstack.json       # Full Stack Systems Engineer profile
│               ├── forward-deployed.json# Forward Deployed Engineer profile
│               └── devops.json          # Cloud & CI/CD DevOps Engineer profile
├── scripts/
│   └── resume-generator/
│       ├── template.typ                 # Modern Typst 1-page template
│       ├── generate.ts                  # Main generator script (CLI runner)
│       └── validate.ts                  # ATS text extraction & page count checker
└── public/
    └── resumes/
        ├── Resume-Sahil-Langoo-Frontend.pdf
        ├── Resume-Sahil-Langoo-FullStack.pdf
        ├── Resume-Sahil-Langoo-Forward-Deployed.pdf
        ├── Resume-Sahil-Langoo-DevOps.pdf
        └── Resume-Sahil-Langoo.pdf      # Canonical copy (linked from /resume)
```

---

## 4. Role Profiles & Keyword Matrices

### 1. Frontend Engineer

- **Target Roles:** Senior Frontend Engineer, UI/UX Systems Engineer, Web Performance Specialist.
- **Top Competencies:** TypeScript, React, Next.js, Astro 7, Tailwind CSS v4, daisyUI 5, HTML5/CSS3 (OKLCH, CSS Container Queries), Web Performance (LCP < 800ms, 0.00 CLS), State Management, Responsive Design, PWA/TWA.
- **Experience Highlights:**
  - Sub-50ms global TTFB, 0.00 CLS, and 100/100 Lighthouse on client platforms via Astro SSG and zero-JS baselines.
  - Component system design with daisyUI/Tailwind, reducing bundle payload by 65%.
  - PWA and Trusted Web App conversion for mobile multi-store deployment.

### 2. Full Stack Systems Engineer

- **Target Roles:** Full Stack Engineer, Systems Architect, Software Engineer.
- **Top Competencies:** TypeScript, Go, Python, React, Astro, Node.js, Hono, PostgreSQL, SQLite / D1, Cloudflare Workers / Pages, Redis, REST & GraphQL APIs, Docker.
- **Experience Highlights:**
  - Distributed Hono API gateways on Cloudflare Workers for credit OTP proxies and server-side tracking (99.99% uptime, <100ms p99 latency).
  - High-throughput web systems architecture across production client platforms.
  - End-to-end type safety with Zod and automated build-time link/quality enforcers.

### 3. Forward Deployed Engineer (FDE)

- **Target Roles:** Forward Deployed Engineer, Solutions Architect, Technical Integration Lead.
- **Top Competencies:** Full-Stack Architecture, Rapid Prototyping, API Gateways (Meta CAPI, Payment Gateways, Turnstile), Client Integration, Systems Debugging, Sentry Telemetry, Python, Go, TypeScript, Cloudflare.
- **Experience Highlights:**
  - Delivered 6+ bespoke client platforms (SoulMedia, Hotel Akbar, TravelKit) with 100% on-time deployment and quantified client conversion gains (+15% to +20%).
  - Architected and debugged mission-critical third-party integrations (Experian OTP proxy, Meta CAPI, Razorpay), reducing transaction failure rates by 14%.
  - Rapid root-cause analysis across Sentry error telemetry, resolving production bottlenecks.

### 4. Cloud & CI/CD DevOps Engineer

- **Target Roles:** Cloud Engineer, DevOps / SRE, Infrastructure & Release Engineer.
- **Top Competencies:** Cloudflare (Workers, Pages, R2, KV, Turnstile), Docker multi-stage builds, GitHub Actions CI/CD pipelines, Playwright E2E automation, Shell/Bash scripting, Linux, Sentry, pnpm supply-chain lockfile security.
- **Experience Highlights:**
  - Engineered zero-downtime GitHub Actions deployment workflows across Cloudflare Pages and Vercel with automated Playwright regression testing, slashing build cycles by 35%.
  - Implemented Cloudflare edge WAF rules, spam mitigations, and Turnstile challenges across client applications.
  - Authored custom zero-dependency build-time quality hooks and supply-chain lockfile validation.

---

## 5. Typst Template Design & Typography Guardrails

1. **Page Geometry:** Standard US-Letter (`paper: "us-letter"`) with 0.5-inch margins (`margin: (x: 0.5in, y: 0.5in)`).
2. **Typography:** Latin Modern Roman or TeX Gyre Termes (10pt base, 9pt metadata/bullets, 11pt bold smallcaps for section headers).
3. **ATS Unicode Compliance:** Native CMap font embedding in Typst ensures 100% accurate text extraction without ligature merging or unreadable glyphs.
4. **Header Block:**
   - Full Name: Sahil Langoo (Sahil Ahmad Langoo)
   - Contact Bar: Srinagar, J&K, India • +91 7006 588 022 • sahilahmed3066@gmail.com • sahillangoo.com • linkedin.com/in/sahillangoo • github.com/sahillangoo
5. **Section Structure:**
   1. Education (B.Tech CSE - Univ of Kashmir; Diploma CSE - Kashmir Govt Poly)
   2. Technical Skills (Languages, Frameworks & UI, Cloud & Infrastructure, Databases & Tools)
   3. Experience (SquadCoders, Enterprise Web Systems / ECSPL, Taffin.Tech / Elance)
   4. Technical Projects (Listify, BreedersHub, XpressSys / Portfolio Systems)
   5. Certifications (Meta Front-End Developer, Next.js Masterclass, Google Python)

---

## 6. Verification & Quality Gates

The generator script will include an automated post-compilation verification gate:

1. **File Existence & Non-Empty Check:** Confirms all 5 PDF files are generated and valid.
2. **Page Count Gate:** Verifies that every PDF is strictly **1 page** (0 overflow).
3. **Text Searchability & ATS Check:** Extracts text stream from each PDF and verifies key token presence (Name, Email, GitHub, Skills, Experience metrics).
