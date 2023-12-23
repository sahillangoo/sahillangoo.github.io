import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './remark-reading-time.mjs';
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import lighthouse from 'astro-lighthouse'

export default defineConfig({
	repo: 'https://github.com/sahillangoo/sahillangoo.github.io',
  site: 'https://sahillangoo.com',
  author: 'Sahil Langoo',
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    mdx({
      optimize: true,
    }),
    tailwind({}),
    sitemap(),
    compress(),
    lighthouse(),
  ],
  markdown: {
		remarkPlugins: [remarkReadingTime],
		    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' }
        }
      ],
    ]
  },
})
