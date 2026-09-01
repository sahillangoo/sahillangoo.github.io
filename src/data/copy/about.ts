import type { AboutPageCopy } from './types';

export const aboutCopy: AboutPageCopy = {
  seo: {
    title: 'About Me — Engineering with Intent & Craft',
    description:
      'Full Stack Systems Engineer and Co-Founder at SquadCoders. Learn about my technical background, core engineering philosophy, and architectural standards.',
    image: '/og/about.png',
  },
  hero: {
    eyebrow: 'About',
    headline: 'Engineering with Intent, Precision & Craft',
    paragraphs: [
      'I am Sahil Langoo, a Full Stack Systems Engineer and Co-Founder at SquadCoders based in Kashmir, India. I hold a Bachelor of Technology in Computer Science Engineering (CGPA: 7.07) from the University of Kashmir and a 3-Year Diploma in Computer Science Engineering from Kashmir Govt Polytechnic.',
      'My engineering philosophy is rooted in minimalism: building software that is fast by default, respectful of user resources, and designed with zero unnecessary runtime bloat. I prioritize static generation first, minimal client-side JavaScript, and strict end-to-end type safety.',
      'Across SquadCoders, Taffin.Tech, and enterprise consulting systems, I have engineered AI-integrated applications, high-concurrency Cloudflare Worker API gateways (Hono, Meta CAPI, Turnstile), and zero-dependency build-time quality verification pipelines.',
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
        value: 'TypeScript, JavaScript (ES6+), Go, Python, Node.js, Bun, HTML5, SQL.',
      },
      {
        label: 'Frameworks & Architecture',
        value: 'Astro 7, Next.js, React, Hono, Cloudflare Workers, Partytown.',
      },
      {
        label: 'Styling & Design Craft',
        value: 'Tailwind CSS v4, daisyUI 5, OKLCH perceptual color spaces, Figma.',
      },
      {
        label: 'Databases & Storage',
        value: 'PostgreSQL, SQLite / D1, Redis, Cloudflare KV & R2, MongoDB.',
      },
      {
        label: 'Tooling & Quality Gates',
        value:
          'pnpm, ESLint 10 Flat Config, Prettier, Zod, Sentry, Playwright, Docker, Git / GitHub CLI.',
      },
    ],
  },
  connectCta: {
    title: 'Interested in collaborating or discussing architecture?',
    description:
      "Whether exploring edge architectures, open source systems, or high-impact engineering roles — let's connect.",
    cta: {
      label: 'Get in Touch',
      href: '/contact/',
      icon: 'ph:paper-plane-tilt-bold',
    },
  },
};
