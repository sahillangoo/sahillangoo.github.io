import type { AboutPageCopy } from './types';

export const aboutCopy: AboutPageCopy = {
  seo: {
    title: 'About Me | Engineering with Intent & Craft',
    description:
      'Full Stack Systems Engineer at Eresolution Consultancy Services & SquadCoders. Background, core engineering philosophy, and architecture standards of Sahil Langoo.',
    image: '/og/about.png',
  },
  hero: {
    eyebrow: 'About',
    headline: 'Engineering with Intent, Precision & Craft',
    paragraphs: [
      'I am Sahil Langoo, a Full Stack Systems Engineer at Eresolution Consultancy Services & Co-Founder at SquadCoders based in Kashmir, India. I hold a Bachelor of Technology in Computer Science Engineering (CGPA: 7.07, Capstone: Listify) from the University of Kashmir and a 3-Year Diploma in Computer Science Engineering from Kashmir Govt Polytechnic.',
      'My engineering philosophy is rooted in minimalism: building software that is fast by default, respectful of user resources, and designed with zero unnecessary runtime bloat. I prioritize static generation first, minimal client-side JavaScript, and strict end-to-end type safety.',
      'Across Eresolution Consultancy Services, SquadCoders, and Taffin.Tech, I have engineered AI-integrated applications, high-concurrency Cloudflare Worker API gateways (Hono, Meta CAPI, Turnstile), programmatic SEO taxonomies, and telemetry pipelines (Google Search Console, GA4, Clarity, Sentry).',
    ],
  },
  principles: {
    title: 'Core Operating Principles',
  },
  dailyStack: {
    title: 'Daily Tools & Technical Arsenal',
    groups: [
      {
        label: 'Languages & Runtimes',
        value:
          'TypeScript, JavaScript (ES2023+), PHP, Typst, Go, Python, Node.js, Bun, HTML5, SQL.',
      },
      {
        label: 'Frameworks & Architecture',
        value: 'Astro 7.3, Next.js, React, Hono, Cloudflare Workers, Partytown.',
      },
      {
        label: 'Styling & Design Craft',
        value: 'Tailwind CSS v4, daisyUI 5, OKLCH perceptual color spaces, Figma.',
      },
      {
        label: 'Databases & Storage',
        value: 'PostgreSQL, MySQL, SQLite / D1, Redis, Cloudflare KV & R2.',
      },
      {
        label: 'Tooling & Quality Gates',
        value:
          'pnpm, ESLint 10 Flat Config, Prettier, Zod, Sentry, Google Search Console, GA4 / GTM, Microsoft Clarity, Schema.org JSON-LD, Playwright, Docker, Git / GitHub CLI.',
      },
    ],
  },
  connectCta: {
    title: 'Interested in collaborating or discussing architecture?',
    description:
      "Whether exploring edge architectures, open source systems, or high-impact engineering roles - let's connect.",
    cta: {
      label: 'Connect & Links',
      href: '/links/',
      icon: 'ph:link-bold',
    },
  },
};
