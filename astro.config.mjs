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
  vite: {
    build: {
      // assetsInlineLimit: 1024,
      // inlineStylesheets: 'never',
    }
  },
   experimental: {
     directRenderScript: true,
     contentCollectionCache: true,
  },
  integrations: [
    mdx({
    optimize: true
    }),
    tailwind({
    // Example: Allow writing nested CSS declarations
    // alongside Tailwind's syntax
    nesting: true,
    //  Enable nesting, like Sass
    applyBaseStyles: false
    //  Apply Tailwind's base styles
  }),
    sitemap(),
    icon({
    iconDir: "src/assets/icons"
    }),
    minify(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [[rehypeExternalLinks, {
      content: {
        type: 'text',
        value: ' 🔗'
      }
    }]]
  }
});
