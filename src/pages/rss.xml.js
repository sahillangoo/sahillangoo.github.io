import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, BLOG } from '@consts'; // import your constants

const LANGUAGE = 'en-us';
const TTL = '60';

export async function GET(context) {
  const blog = await getCollection('blog');
  const items = blog
    .filter(({ data }) => !data.draft) // Exclude draft posts
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate)) // Sort by publication date
    .map(({ data, slug }) => ({
      title: data.title,
      link: `${BLOG.URL}/${slug}/`,
      description: data.description,
      category: data.category,
      pubDate: data.pubDate,
      updatedDate: data.updatedDate,
      author: data.author,
      Enclosure: data.image
        ? {
            url: data.image,
            length: data.image.length,
            type: 'image/jpeg',
          }
        : undefined,
    }));

  return rss({
    stylesheet: '/rss/rss.xsl',
    title: BLOG.TITLE ?? SITE.TITLE,
    description: BLOG.DESCRIPTION,
    site: context.site,
    items,
    Language: LANGUAGE,
    Copyright: {
      name: SITE.AUTHOR,
      url: SITE.URL,
    },
    WebMaster: SITE.AUTHOR,
    ManagingEditor: SITE.AUTHOR,
    ttl: TTL,
    generator: 'Astro',
  });
}
