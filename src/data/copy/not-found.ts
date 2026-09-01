import type { NotFoundPageCopy } from './types';

export const notFoundCopy: NotFoundPageCopy = {
  seo: {
    title: '404 — Page Not Found — Sahil Langoo',
    description: 'The requested document or resource could not be located in this namespace.',
    noindex: true,
  },
  code: '404',
  title: 'Route Not Found',
  description: 'The requested document or resource could not be located in this namespace.',
  homeButton: {
    label: 'Return Home',
    href: '/',
    icon: 'ph:house-bold',
  },
};
