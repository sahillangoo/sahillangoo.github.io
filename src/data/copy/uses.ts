import type { UsesPageCopy } from './types';

export const usesCopy: UsesPageCopy = {
  seo: {
    title: 'Uses & Developer Setup — Sahil Langoo',
    description:
      'A living inventory of hardware, software, editors, terminal tools, and cloud services used daily by Sahil Langoo.',
    image: '/og/uses.png',
  },
  header: {
    badge: 'Gear & Tech Stack',
    title: 'Uses & Developer Setup',
    description:
      'A curated inventory of the hardware, software, terminal setup, and cloud infrastructure I rely on daily to engineer resilient systems.',
  },
  sections: [
    {
      title: 'Workstation & Hardware',
      icon: 'ph:laptop-bold',
      items: [
        {
          name: 'Custom Developer Rig',
          description:
            'Multi-core AMD Ryzen workstation with 32GB RAM and ultra-fast NVMe storage.',
        },
        {
          name: 'Primary Display',
          description: 'High-density calibrated display with accurate color reproduction.',
        },
        {
          name: 'Keyboards & Input',
          description:
            'Custom mechanical keyboard with tactile switches & precision ergonomic mouse.',
        },
        {
          name: 'Audio',
          description: 'Studio monitoring headphones for uninterrupted deep work sessions.',
        },
      ],
    },
    {
      title: 'Development Environment & Software',
      icon: 'ph:code-bold',
      items: [
        {
          name: 'Editor & IDE',
          description:
            'VS Code & Cursor with strict TypeScript, ESLint 10, Prettier, and custom high-contrast obsidian dark themes.',
        },
        {
          name: 'Terminal & Shell',
          description:
            'Windows PowerShell (pwsh) + Windows Terminal with Starship cross-shell prompt.',
        },
        {
          name: 'Package Managers & Runtimes',
          description:
            'pnpm (configured strictly with lockfile immutability), Bun, Node.js (nvm), and Go.',
        },
        {
          name: 'Version Control',
          description: 'Git CLI with conventional commit discipline & GitHub CLI (gh).',
        },
      ],
    },
    {
      title: 'Cloud, Edge & Observability',
      icon: 'ph:cloud-bold',
      items: [
        {
          name: 'Edge Hosting & CDN',
          description:
            'Cloudflare Pages & Workers for static site generation and distributed API gateways.',
        },
        {
          name: 'CI/CD & Quality Gates',
          description:
            'GitHub Actions with strict lockfile integrity checks, type-checking, and asset verification.',
        },
        {
          name: 'Observability & Telemetry',
          description:
            'Sentry for real-time frontend/backend exception triage and performance telemetry.',
        },
      ],
    },
    {
      title: 'Design & Workflow Tools',
      icon: 'ph:palette-bold',
      items: [
        {
          name: 'Figma',
          description: 'Interface layout, responsive design tokens, and rapid wireframing.',
        },
        {
          name: 'Local AI & SLMs',
          description:
            'LM Studio with local vision (Gemma 2B) and code models for offline workflows.',
        },
        {
          name: 'Browser Suite',
          description:
            'Brave & Chrome DevTools for Core Web Vitals profiling and network waterfall analysis.',
        },
      ],
    },
  ],
};
