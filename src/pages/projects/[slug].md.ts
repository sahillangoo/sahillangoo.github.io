import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '@const/site.ts';

export async function getStaticPaths() {
  const projects = await getCollection('projects');

  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

interface Props {
  project: CollectionEntry<'projects'>;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const { project } = props;
  const { data, body } = project;

  const content = `---
title: "${data.title.replace(/"/g, '\\"')}"
description: "${data.description.replace(/"/g, '\\"')}"
year: ${data.year}
role: "${data.role}"
category: "${data.category}"
tags: [${data.tags.map((t) => `"${t}"`).join(', ')}]
canonicalUrl: "${SITE.url}/projects/${project.id}/"
---

# ${data.title}

> ${data.description}

- **Role**: ${data.role}
- **Year**: ${data.year}
- **Category**: ${data.category}
- **Tech Stack**: ${data.tags.join(', ')}
${data.liveUrl ? `- **Live Platform**: ${data.liveUrl}\n` : ''}${data.githubUrl ? `- **Source Code**: ${data.githubUrl}\n` : ''}
${body?.trim() ?? ''}
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
