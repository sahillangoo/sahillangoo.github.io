import type { ServicesPageCopy } from './types';

export const servicesCopy: ServicesPageCopy = {
  seo: {
    title: 'Engineering Services & Systems Architecture Consulting | Sahil Langoo',
    description:
      'Specialized engineering consulting for engineering teams and digital agencies: Cloudflare edge proxies, server-side Meta CAPI, Astro static architectures, and technical SEO/AEO.',
    image: '/og/default.png',
  },
  header: {
    badge: 'Capabilities & Consulting',
    title: 'Engineering Services & Systems Consulting',
    description:
      'Specialized systems engineering, distributed edge architectures, and turnkey implementations for technology startups, agencies, and engineering teams.',
  },
  offerings: [
    {
      id: 'server-side-capi',
      title: 'Server-Side Meta Conversions API (CAPI) & Edge Proxies',
      summary:
        'Architecting resilient edge conversion tracking pipelines on Cloudflare Workers and Hono. Bypasses client ad-blockers and Safari ITP limitations to secure 8.5+ Event Match Quality (EMQ) scores with deterministic deduplication and SHA-256 data hashing.',
      turnaround: '10 to 14 business days',
      pricing: '$3,500 flat fee',
      metrics: '8.5+ Event Match Quality (EMQ) | Sub-15ms edge compute latency',
      scope: [
        'Edge tracking proxy deployed on Cloudflare Workers using Hono framework.',
        'Deterministic event deduplication pairing browser pixels with server-side events using unique event_id.',
        'Cryptographic normalization and SHA-256 hashing of all client PII parameters.',
        'Edge bot filtering and Cloudflare Turnstile token validation.',
      ],
      deliverables: [
        'Production Cloudflare Worker codebase with full TypeScript definitions.',
        'GitHub Actions CI/CD deployment workflow and staging verification suite.',
        'Edge observability dashboards and real-time error logging.',
      ],
    },
    {
      id: 'astro-static-systems',
      title: 'High-Performance Static Web Architecture & Astro Migration',
      summary:
        'Building or migrating web applications to Astro 7.3 static architectures shipping zero runtime JavaScript by default. Delivers sub-50ms TTFB across global edge nodes, 0.00 Cumulative Layout Shift, and perfect 100/100 Core Web Vitals audits.',
      turnaround: '3 to 4 weeks',
      pricing: '$4,500 to $7,500',
      metrics: '100/100 Core Web Vitals | 0.00 Cumulative Layout Shift (CLS)',
      scope: [
        'Complete architectural audit and migration from legacy SPAs or WordPress.',
        'Zero client-side JavaScript default runtime with selective islands architecture.',
        'Strict type-safe Content Collections with Zod runtime schema validation.',
        'Automated Schema.org JSON-LD structured data (Person, WebSite, TechArticle, Breadcrumbs).',
      ],
      deliverables: [
        'Complete Astro 7.3 repository with strict pnpm dependencies.',
        'Cloudflare Pages build configuration with security headers and redirects.',
        'Automated CI build verification, link crawler, and schema validation tests.',
      ],
    },
    {
      id: 'edge-security-turnstile',
      title: 'Edge Security, WAF Hardening & Bot Mitigation',
      summary:
        'Replacing friction-heavy legacy CAPTCHAs with invisible Cloudflare Turnstile verification executed directly at the edge. Hardening HTTP security headers, CORS policies, and rate limits to block automated crawlers without penalizing legitimate users.',
      turnaround: '5 to 7 business days',
      pricing: '$2,000 flat fee',
      metrics: '99.9% automated spam reduction | Zero user puzzle friction',
      scope: [
        'Non-interactive Cloudflare Turnstile widget integration for forms and actions.',
        'Edge token verification middleware running on Cloudflare Pages Functions.',
        'Content Security Policy (CSP), HSTS preload, and permissions policy hardening.',
        'WAF rate limiting rules and automated scraper challenge barriers.',
      ],
      deliverables: [
        'Edge verification function and client form component.',
        'Hardened _headers configuration and Cloudflare security ruleset.',
        'Verification test suite simulating headless bot challenges.',
      ],
    },
    {
      id: 'technical-seo-aeo',
      title: 'Technical SEO, Generative Engine Optimization (GEO) & AEO',
      summary:
        'Structuring web properties to rank in traditional search and get cited as primary sources across AI answer engines including Google AI Overviews, Perplexity, and ChatGPT. Implements connected schema graphs, extractable answer blocks, and protocol files.',
      turnaround: '7 to 10 business days',
      pricing: '$2,500 flat fee',
      metrics: '+40% empirical AI citation lift via Princeton GEO structuring',
      scope: [
        'Comprehensive technical crawl audit: canonicals, sitemap indexes, and indexability.',
        'Schema.org graph architecture (ProfessionalService, FAQPage, TechArticle, Person).',
        'Implementation of machine-readable files: llms.txt, llms-full.txt, pricing.md, and OKF.',
        'RFC 9309 crawler policy configuring specific AI search and retrieval agents.',
      ],
      deliverables: [
        'Production-tested structured data injection and metadata pipelines.',
        'Validated XML sitemaps, robots.txt, and Open Knowledge Format bundle.',
        'Search Console indexation audit and agent-readiness scorecard.',
      ],
    },
    {
      id: 'fractional-systems-engineering',
      title: 'Fractional Systems Engineering & Architecture Advisory',
      summary:
        'Direct weekly engineering bandwidth and architectural guidance for growing engineering teams and technical founders. Providing high-throughput systems design, code reviews, performance profiling, and production incident remediation.',
      turnaround: 'Monthly retainer (1-month minimum)',
      pricing: '$5,000 / month (or $1,500 / week)',
      metrics: '15 hours / week dedicated bandwidth | Direct Slack and GitHub PR review',
      scope: [
        'Architecture design reviews for edge proxies, microservices, and web platforms.',
        'Hands-on implementation across TypeScript, Astro, Go, and Cloudflare Workers.',
        'Profiling Core Web Vitals, server latency bottlenecks, and database query costs.',
        'Direct async communication via Slack, Discord, and code review comments.',
      ],
      deliverables: [
        'Weekly architectural review summaries and pull requests.',
        'Direct pairing sessions and asynchronous technical triage.',
        'Continuously updated system architecture documentation.',
      ],
    },
  ],
  faqs: [
    {
      question: 'What types of companies or teams do you work with?',
      answer:
        'I partner with technology startups, software engineering teams, and digital agencies seeking specialized expertise in edge computing, Cloudflare Workers, Astro static platforms, and technical search infrastructure.',
    },
    {
      question: 'How do you ensure zero impact on Core Web Vitals?',
      answer:
        'By utilizing static site generation (Astro 7.3), shipping zero client JavaScript by default, preloading critical self-hosted web fonts, and offloading third-party scripts to Web Workers via Partytown. Every build runs automated headless Chrome audits.',
    },
    {
      question: 'How does server-side Meta CAPI handle ad-blockers and Safari ITP?',
      answer:
        'Safari ITP restricts client-side cookies set by JavaScript to 1 to 7 days, and ad-blockers intercept client network calls. By proxying tracking requests through your custom Cloudflare domain directly to Meta Graph API, first-party cookie longevity and 8.5+ Event Match Quality are preserved.',
    },
    {
      question: 'What is Generative Engine Optimization (GEO) and why is it necessary?',
      answer:
        'Generative Engine Optimization structures web content so AI systems (Google AI Overviews, Perplexity, ChatGPT Search) can parse and cite your site as an authoritative source. Grounded in the Princeton GEO study, it uses extractable answer blocks, citations, statistics, and structured schema.',
    },
    {
      question: 'What are your payment terms and engagement contracts?',
      answer:
        'Fixed-scope projects require 50% upfront deposit and 50% upon verified production deployment. Monthly retainers are billed at the beginning of each billing cycle. Mutual non-disclosure agreements (NDAs) and standard Statements of Work (SOW) are executed before kickoff.',
    },
  ],
  inquiry: {
    title: 'Ready to build high-performance systems together?',
    description:
      'Send a note outlining your project goals, current technology stack, and timeline. I review all inquiries within 24 business hours.',
    cta: {
      label: 'Send Project Inquiry',
      href: '#inquiry-form',
      icon: 'ph:paper-plane-tilt-bold',
    },
  },
};
