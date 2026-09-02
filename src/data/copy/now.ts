import type { NowPageCopy } from './types';

export const nowCopy: NowPageCopy = {
  seo: {
    title: "Now | What I'm Doing Right Now | Sahil Langoo",
    description:
      'A live declaration of what Sahil Langoo is currently working on, engineering architectures, studying, reading, and building.',
    image: '/og/now.png',
  },
  header: {
    badge: 'Now Page (Public Declaration)',
    title: "What I'm Doing Right Now",
    description:
      'A live public record of my current engineering focus, technical investigations, reading queue, and active priorities.',
  },
  sections: [
    {
      category: 'Engineering & Systems Architecture at Eresolution Consultancy Services',
      icon: 'ph:code-bold',
      items: [
        'Engineering distributed API gateways, edge proxies, and server-side event streaming at Eresolution Consultancy Services.',
        'Refining zero-dependency build-time quality gates (verifying asset references, internal links, and SEO redirects).',
        'Implementing resilient edge proxies and payment integrations on Cloudflare Workers and Hono.',
      ],
    },
    {
      category: 'Exploring & Learning',
      icon: 'ph:sparkle-bold',
      items: [
        'Deepening systems programming with Go: concurrent network APIs, micro-proxies, and CLI tooling.',
        'Local AI workflows: Experimenting with local vision models (Gemma 2B via Bun) and offline embedding pipelines.',
        'Fine-tuning CSS Subgrid patterns and multi-tier OKLCH color spaces in Tailwind CSS v4.',
      ],
    },
    {
      category: 'Reading & Technical Literature',
      icon: 'ph:book-open-bold',
      items: [
        'Designing Data-Intensive Applications by Martin Kleppmann.',
        'Refactoring UI by Adam Wathan & Steve Schoger.',
        'Distributed systems, edge caching, and database query optimization research papers.',
      ],
    },
  ],
  availabilityCard: {
    title: 'Based in Kashmir, India',
    description:
      'Operating globally across UTC+5:30 (IST), UTC, and EST time zones with asynchronous discipline.',
    cta: {
      label: 'Inquire Availability',
      href: '/contact/',
      icon: 'ph:paper-plane-tilt-bold',
    },
  },
};
