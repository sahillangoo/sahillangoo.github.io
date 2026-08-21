import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/const/site.ts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');
  const publishedBlog = blog
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
    );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site || SITE.url,
    items: publishedBlog.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
