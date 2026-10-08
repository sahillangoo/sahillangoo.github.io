import type { NavigationCopy } from './types';

export const navigationCopy: NavigationCopy = {
  brand: {
    name: 'Sahil Langoo',
    tagline:
      'Engineering high-performance web systems, distributed edge architectures, and minimalist interfaces.',
  },
  footerNav: [
    { label: 'Work', href: '/projects/' },
    { label: 'Services', href: '/services/' },
    { label: 'Writing', href: '/blog/' },
    { label: 'Resume', href: '/resume/' },
    { label: 'About', href: '/about/' },
    { label: 'Now', href: '/now/' },
    { label: 'Uses', href: '/uses/' },
    { label: 'Colophon', href: '/colophon/' },
    { label: 'Links', href: '/links/' },
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Hire me', href: 'mailto:hello@sahillangoo.in' },
  ],
  footerSections: {
    navigation: {
      title: 'Navigation',
      links: [
        { label: 'Work', href: '/projects/' },
        { label: 'Services', href: '/services/' },
        { label: 'Writing', href: '/blog/' },
        { label: 'Resume', href: '/resume/' },
        { label: 'About', href: '/about/' },
        { label: 'Hire me', href: 'mailto:hello@sahillangoo.in' },
      ],
    },
    system: {
      title: 'System',
      links: [
        { label: 'Now', href: '/now/' },
        { label: 'Uses', href: '/uses/' },
        { label: 'Colophon', href: '/colophon/' },
        { label: 'Links', href: '/links/' },
        { label: 'Privacy', href: '/privacy/' },
      ],
    },
    connect: {
      title: 'Activity & Connect',
    },
  },
  footerTelemetry: {
    copyright: (year: number) => `© ${year} Sahil Langoo. All rights reserved.`,
  },
};
