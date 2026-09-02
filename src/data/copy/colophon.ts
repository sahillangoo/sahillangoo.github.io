import type { ColophonPageCopy } from './types';

export const colophonCopy: ColophonPageCopy = {
  seo: {
    title: 'Colophon | Technical Specifications | Sahil Langoo',
    description:
      'Technical colophon detailing the typography, OKLCH color science, build architecture, and performance standards of this website.',
    image: '/og/colophon.png',
  },
  header: {
    badge: 'Site Anatomy & Architecture',
    title: 'Technical Colophon',
    description:
      'An exhaustive technical disclosure of the typography, perceptual color science, build pipelines, and performance guardrails powering this site.',
  },
  sections: {
    specificationsTitle: 'System Specifications & Stack',
    specifications: [
      { label: 'Framework', value: 'Astro 7.2 (Static Site Generation)' },
      { label: 'Styling Architecture', value: 'Tailwind CSS v4 + daisyUI 5' },
      { label: 'Color System', value: 'OKLCH (editorialDark & editorialLight)' },
      { label: 'Primary Typeface', value: 'Plus Jakarta Sans (Variable)' },
      { label: 'Monospace Typeface', value: 'JetBrains Mono' },
      { label: 'Motion & Scroll', value: 'Lenis Smooth Scroll + Hardware Transforms' },
      { label: 'Hosting & CDN', value: 'Cloudflare Pages Global Edge' },
      { label: 'Asset Verification', value: 'astroSiteQualityEnforcer (Zero 404s)' },
      { label: 'Package Manager', value: 'pnpm with strict lockfile compliance' },
      { label: 'Linter & Quality', value: 'ESLint 10 Flat Config + Prettier' },
      { label: 'Runtime Client JS', value: '0.00 KB baseline (Hydration only on demand)' },
      { label: 'Cumulative Layout Shift', value: '0.00 CLS guaranteed' },
    ],
    principlesTitle: 'Design & Performance Principles',
    principles: [
      {
        title: 'Typography & Color Science',
        description:
          'Set in Plus Jakarta Sans for crisp editorial hierarchy and JetBrains Mono for code blocks. The color palette is calibrated in perceptual OKLCH color space for consistent visual contrast across dark and light modes.',
      },
      {
        title: 'Zero-Dependency Quality Hook',
        description:
          'Integrated with a custom build-time verification plugin (astroSiteQualityEnforcer) that crawls all rendered HTML in dist/ to prevent broken links, missing assets, and trailing slash discrepancies before deployment.',
      },
    ],
  },
};
