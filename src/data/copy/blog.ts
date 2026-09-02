import type { BlogPageCopy } from './types';

export const blogCopy: BlogPageCopy = {
  seo: {
    title: 'Engineering Journal & Technical Essays | Sahil Langoo',
    pageTitleSuffix: (page: number) => ` | Page ${page}`,
    description:
      'Technical writings, edge systems architecture, performance benchmarks, and minimalist software engineering principles by Sahil Langoo.',
  },
  header: {
    badgePrefix: 'Articles',
    title: 'Systems Engineering & Architecture Journal',
    description:
      'Deep dives into Astro static architecture, server-side Meta CAPI, edge proxies, type-safe content pipelines, and zero-JS performance engineering.',
    topicsLabel: 'Topics:',
  },
};
