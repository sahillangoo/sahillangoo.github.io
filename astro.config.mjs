// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import astroSiteQualityEnforcer from './src/plugins/astro-site-quality.ts';
import { NON_INDEXABLE_PATHS } from './src/const/site.ts';
import { createSitemapSerializer } from './src/utils/sitemap.ts';

const BUILD_TIME = new Date().toISOString();
const BUILD_DATE = BUILD_TIME.split('T')[0];

// https://astro.build/config
export default defineConfig({
  site: 'https://sahillangoo.in',
  trailingSlash: 'always',
  output: 'static',
  redirects: {
    '/contact/': '/links/',
  },
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
    define: {
      __BUILD_TIME__: JSON.stringify(BUILD_TIME),
      __BUILD_DATE__: JSON.stringify(BUILD_DATE),
    },
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
      styles: ['normal'],
      weights: [400, 500, 600, 700, 800],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'JetBrains Mono',
      provider: fontProviders.google(),
      cssVariable: '--ff-mono',
      display: 'swap',
      styles: ['normal'],
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
  integrations: [
    icon({
      include: {
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
      serialize: createSitemapSerializer(BUILD_DATE),
    }),
    astroSiteQualityEnforcer(),
  ],
});
