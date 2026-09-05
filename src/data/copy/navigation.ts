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
    { label: 'Links', href: '/links/' },
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
  ],
  footerSections: {
    navigation: {
      title: 'Navigation',
      links: [
        { label: 'Work', href: '/projects/' },
        { label: 'Writing', href: '/blog/' },
        { label: 'Garden', href: '/notes/' },
        { label: 'Resume', href: '/resume/' },
      ],
    },
    system: {
      title: 'System',
      links: [
        { label: 'Now', href: '/now/' },
        { label: 'Uses', href: '/uses/' },
        { label: 'Colophon', href: '/colophon/' },
        { label: 'Links', href: '/links/' },
      ],
    },
    connect: {
      title: 'Activity & Connect',
    },
  },
  footerTelemetry: {
    copyright: (year: number) => `© ${year} Sahil Langoo. All rights reserved.`,
    metrics: '0.00 CLS • Sub-50ms Global TTFB • Cloudflare Edge',
  },
};
