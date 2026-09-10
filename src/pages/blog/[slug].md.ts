import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '@const/site.ts';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const published = posts.filter((post) => !post.data.draft);

  return published.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<'blog'>;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const { post } = props;
  const { data, body } = post;

  const content = `---
title: "${data.title.replace(/"/g, '\\"')}"
description: "${data.description.replace(/"/g, '\\"')}"
publishDate: "${data.publishDate}"
category: "${data.category}"
tags: [${data.tags.map((t) => `"${t}"`).join(', ')}]
canonicalUrl: "${SITE.url}/blog/${post.id}/"
---

# ${data.title}

> ${data.description}

- **Published**: ${data.publishDate}
- **Category**: ${data.category}
- **Tags**: ${data.tags.join(', ')}
${data.readingTime ? `- **Reading Time**: ${data.readingTime}\n` : ''}
${body?.trim() ?? ''}
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
