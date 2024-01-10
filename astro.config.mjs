import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs'
import { SITE } from '/src/consts.ts'

const repo = SITE.REPO
const site = SITE.URL
const author = SITE.AUTHOR
// https://astro.build/config
export default defineConfig({
	repo,
	site,
	author,
	integrations: [
		mdx({
			optimize: true,
		}),
		tailwind({
			nesting: false, //  Enable nesting, like Sass
      applyBaseStyles: false,
    }),
		sitemap(),
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
})
