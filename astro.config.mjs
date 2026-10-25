// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import astroSiteQualityEnforcer from './src/plugins/astro-site-quality.ts';
import { NON_INDEXABLE_PATHS, SITE } from './src/const/site.ts';
import { createSitemapSerializer } from './src/utils/sitemap.ts';

const BUILD_DATE = new Date().toISOString().split('T')[0];

// Pre-compiled sitemap filtering constants
const SITEMAP_PAGINATION_REGEX = /\/blog\/\d+\/?$/;
const NON_INDEXABLE_SET = new Set([
  ...NON_INDEXABLE_PATHS,
  ...NON_INDEXABLE_PATHS.map((p) => p.replace(/\/$/, '')),
]);

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    dangerouslyProcessSVG: true,
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: true,
      },
    },
    domains: ['sahillangoo.in'],
  },
  experimental: {
    clientPrerender: true,
    chromeDevtoolsWorkspace: true,
    incrementalBuild: true,
    svgOptimizer: svgoOptimizer(),
  },
  security: {
    checkOrigin: true,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2023',
      cssCodeSplit: true,
    },
    optimizeDeps: {
      exclude: ['@astrojs/sitemap', 'sharp'],
    },
    ssr: {
      external: ['sharp'],
    },
    server: {
      watch: {
        ignored: ['**/.git/**', '**/dist/**'],
      },
    },
  },
  fonts: [
    {
      name: 'Instrument Serif',
      provider: fontProviders.google(),
      cssVariable: '--ff-display',
      display: 'swap',
      styles: ['normal', 'italic'],
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['ui-serif', 'Georgia', 'serif'],
    },
    {
      name: 'Geist',
      provider: fontProviders.google(),
      cssVariable: '--ff-sans',
      display: 'swap',
      styles: ['normal'],
      weights: ['400 700'],
      subsets: ['latin'],
      fallbacks: ['Arial', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
    },
    {
      name: 'Geist',
      provider: fontProviders.google(),
      cssVariable: '--ff-sans',
      display: 'swap',
      styles: ['italic'],
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['Arial', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
    },
    {
      name: 'Geist Mono',
      provider: fontProviders.google(),
      cssVariable: '--ff-mono',
      display: 'swap',
      styles: ['normal'],
      weights: ['400 700'],
      subsets: ['latin'],
      fallbacks: ['Courier New', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
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
      filter: (page) => {
        try {
          const path = new URL(page).pathname;
          if (NON_INDEXABLE_SET.has(path) || path.includes('/blog/tag/')) {
            return false;
          }
          return !SITEMAP_PAGINATION_REGEX.test(path);
        } catch {
          return false;
        }
      },
      serialize: createSitemapSerializer(BUILD_DATE),
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    astroSiteQualityEnforcer(),
  ],
});
