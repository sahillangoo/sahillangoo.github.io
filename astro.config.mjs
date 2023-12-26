import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './src/remark-reading-time.mjs'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'

const repo = 'https://github.com/sahillangoo/sahillangoo.github.io'
const site = 'https://sahillangoo.com'
const author = 'Sahil Langoo'

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
		partytown(),
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
