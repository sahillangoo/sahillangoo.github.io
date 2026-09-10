import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '@const/site.ts';

export async function getStaticPaths() {
  const notes = await getCollection('notes');

  return notes.map((note) => ({
    params: { slug: note.id },
    props: { note },
  }));
}

interface Props {
  note: CollectionEntry<'notes'>;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const { note } = props;
  const { data, body } = note;

  const content = `---
title: "${data.title.replace(/"/g, '\\"')}"
publishDate: "${data.publishDate}"
topic: "${data.topic}"
tags: [${data.tags.map((t) => `"${t}"`).join(', ')}]
canonicalUrl: "${SITE.url}/notes/${note.id}/"
---

# ${data.title}

${data.description ? `> ${data.description}\n\n` : ''}- **Published**: ${data.publishDate}
- **Topic**: ${data.topic}
- **Tags**: ${data.tags.join(', ')}

${body?.trim() ?? ''}
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
