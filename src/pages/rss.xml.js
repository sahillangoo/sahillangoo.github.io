import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
	const blog = await getCollection('blog')
	const items = blog
		.filter((post) => !post.data.draft) // Exclude draft posts
		.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate)) // Sort by publication date
		.map((post) => ({
			title: post.data.title,
			link: `/blog/${post.slug}/`,
			description: post.data.description,
			category: post.data.category,
			pubDate: post.data.pubDate,
			updatedDate: post.data.updatedDate,
			author: post.data.author,
			Enclosure: post.data.image
				? {
						url: post.data.image,
						length: post.data.image.length,
						type: 'image/jpeg',
					}
				: undefined,
		}))

	return rss({
		stylesheet: '/rss/rss.xsl',
		title: 'SL Infinity Blog',
		description: 'My thoughts here, I write about random stuff, tech, and life in general.',
		site: context.site,
		items,
		Language: 'en-us',
		Copyright: {
			name: 'Sahil Langoo',
			url: 'https://sahillangoo.com',
		},
		WebMaster: 'Sahil Langoo',
		ManagingEditor: 'Sahil Langoo',
		ttl: '60',
		generator: 'Astro',
	})
}
