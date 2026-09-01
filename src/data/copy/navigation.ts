import type { NavigationCopy } from './types';

export const navigationCopy: NavigationCopy = {
  brand: {
    name: 'Sahil Langoo',
    tagline:
      'Engineering high-performance web systems, distributed edge architectures, and minimalist interfaces.',
  },
  headerNav: [
    { label: 'Work', href: '/projects/' },
    { label: 'Writing', href: '/blog/' },
    { label: 'Notes', href: '/notes/' },
    { label: 'Resume', href: '/resume/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  footerNav: [
    { label: 'Work', href: '/projects/' },
    { label: 'Writing', href: '/blog/' },
    { label: 'Garden', href: '/notes/' },
    { label: 'Resume', href: '/resume/' },
    { label: 'Now', href: '/now/' },
    { label: 'Uses', href: '/uses/' },
    { label: 'Colophon', href: '/colophon/' },
    { label: 'Links', href: '/links/' },
    { label: 'Contact', href: '/contact/' },
  ],
  footerTelemetry: {
    copyright: (year: number) =>
      `© ${year} Sahil Langoo. Built statically with Astro 7.2 & Tailwind CSS v4.`,
    metrics: '0.00 CLS • Sub-50ms Global TTFB • Cloudflare Edge',
  },
};
