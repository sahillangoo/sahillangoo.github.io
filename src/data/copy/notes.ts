import type { NotesPageCopy } from './types';

export const notesCopy: NotesPageCopy = {
  seo: {
    title: 'Digital Garden & Technical Notes | Sahil Langoo',
    pageTitleSuffix: (page: number) => ` | Page ${page}`,
    description:
      'Atomic notes, TILs, code patterns, and architectural mental models by Sahil Langoo.',
  },
  header: {
    badgePrefix: 'Digital Garden',
    title: 'Notes, Snippets & Mental Models',
    description:
      'A lightweight digital garden for atomic thoughts, CSS subgrid mental models, OKLCH theming, PWA caching recipes, and production debugging notes.',
  },
};
