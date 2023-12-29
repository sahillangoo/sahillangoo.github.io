import { defineConfig } from 'astro/config'
import { SITE } from '/src/consts.ts'
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import sitemap from '@astrojs/sitemap'

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
		tailwind(),
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
