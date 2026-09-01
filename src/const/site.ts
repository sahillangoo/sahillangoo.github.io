export const SITE = {
  name: 'Sahil Langoo',
  title: 'Sahil Langoo — Full Stack Systems Engineer & Systems Architect',
  tagline:
    'Engineering resilient edge systems, high-throughput web architectures & minimalist interfaces.',
  bio: 'Full Stack Systems Engineer and Co-Founder at @SquadCoders. Specializing in TypeScript, Astro static architectures, distributed edge proxies, and minimalist UI craft.',
  description:
    'Personal portfolio, engineering journal, and systems catalog of Sahil Langoo. Specializing in TypeScript, Astro 7, modern web architecture, edge proxies, and minimalist UI craft.',
  url: 'https://sahillangoo.in',
  author: 'Sahil Langoo',
  location: 'Kashmir, India',
  email: 'hello@sahillangoo.in',
  status: 'Open to high-impact engineering opportunities & select consulting',
  social: {
    github: 'https://github.com/sahillangoo',
    linkedin: 'https://linkedin.com/in/sahillangoo',
    twitter: 'https://x.com/kashurgeek',
    facebook: 'https://www.facebook.com/sahillangoojs/',
    instagram: 'https://www.instagram.com/sahillangoo.in',
    devto: 'https://dev.to/sahillangoo',
    dailydev: 'https://app.daily.dev/sahillangoo',
    email: 'mailto:hello@sahillangoo.in',
    rss: '/rss.xml',
  },
  nav: [
    { label: 'Work', href: '/projects/' },
    { label: 'Writing', href: '/blog/' },
    { label: 'Notes', href: '/notes/' },
    { label: 'Resume', href: '/resume/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
} as const;

export const NON_INDEXABLE_PATHS = ['/404/', '/rss.xml', '/blog/tag/'] as const;
