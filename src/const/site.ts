export const SITE = {
  name: 'Sahil Langoo',
  title: 'Sahil Langoo — Full Stack Engineer & Creative Technologist',
  tagline: 'Engineering high-performance web systems, creative interfaces, and robust software.',
  bio: 'A man of mystery and power, whose power is exceeded only by his mystery. I design, code & sometimes dream about making art.',
  description:
    'Personal portfolio, engineering journal, and digital garden of Sahil Langoo. Specializing in TypeScript, Astro, modern web architecture, edge systems, and minimalist UI craft.',
  url: 'https://sahillangoo.in',
  author: 'Sahil Langoo',
  location: 'Kashmir, India',
  email: 'hello@sahillangoo.in',
  status: 'Open to high-impact engineering opportunities & select consulting',
  social: {
    github: 'https://github.com/sahillangoo',
    linkedin: 'https://linkedin.com/in/sahillangoo',
    twitter: 'https://twitter.com/kashurgeek',
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

export const NON_INDEXABLE_PATHS = ['/404/'] as const;
