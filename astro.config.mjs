// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import astroSiteQualityEnforcer from './src/plugins/astro-site-quality.ts';
import { NON_INDEXABLE_PATHS } from './src/const/site.ts';
import { createSitemapSerializer } from './src/utils/sitemap.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://sahillangoo.in',
  trailingSlash: 'always',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  experimental: {
    clientPrerender: true,
    chromeDevtoolsWorkspace: true,
    svgOptimizer: svgoOptimizer(),
  },
  security: {
    checkOrigin: true,
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['motion'],
      exclude: ['@astrojs/sitemap', 'sharp'],
    },
  },
  fonts: [
    {
      name: 'Plus Jakarta Sans',
      provider: fontProviders.google(),
      cssVariable: '--ff-sans',
      display: 'swap',
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
    },
    {
      name: 'JetBrains Mono',
      provider: fontProviders.google(),
      cssVariable: '--ff-mono',
      display: 'swap',
      weights: [400, 500, 600],
      subsets: ['latin'],
    },
  ],
  integrations: [
    icon({
      include: {
        lucide: ['*'],
        ph: ['*'],
        'line-md': ['*'],
      },
    }),
    sitemap({
      filter: (page) =>
        !NON_INDEXABLE_PATHS.some(
          (p) =>
            page === p ||
            page === p.slice(0, -1) ||
            page.endsWith(p) ||
            page.endsWith(p.slice(0, -1)) ||
            page.includes('/blog/tag/') ||
            page.match(/\/blog\/\d+\/?$/) ||
            page.match(/\/notes\/\d+\/?$/)
        ),
      serialize: createSitemapSerializer(),
    }),
    astroSiteQualityEnforcer(),
  ],
});
