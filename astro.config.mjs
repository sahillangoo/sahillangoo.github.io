import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import minify from 'astro-min';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';
import { SITE } from '/src/consts.ts';

const repo = SITE.REPO;
const site = SITE.URL;
const author = SITE.AUTHOR;

// https://astro.build/config
export default defineConfig({
  repo,
  site,
  author,
build: {
    inlineStylesheets: `never`,
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  experimental: {
    directRenderScript: true,
    contentCollectionCache: true,
    clientPrerender: true,
  },
  //  image: {
  //   // Example: Enable the Sharp-based image service with a custom config
  //   service: {
  //      entrypoint: 'astro/assets/services/sharp',
  //      config: {
  //        limitInputPixels: false,
  //     },
  //    },
  // },
  integrations: [
    tailwind({
      // Example: Allow writing nested CSS declarations
      // alongside Tailwind's syntax
      nesting: true,
      //  Enable nesting, like Sass
      applyBaseStyles: false,
      //  Apply Tailwind's base styles
    }),
    mdx({
      optimize: true,
    }),
    icon({
      iconDir: 'src/assets/icons',
    }),
    sitemap(),
    minify(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: {
            type: 'text',
            value: ' 🔗',
          },
        },
      ],
    ],
  },
  shikiConfig: {
    theme: 'one-dark-pro',
    wrap: true,
  },
});
