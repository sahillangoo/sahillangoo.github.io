import type { APIRoute } from 'astro';
import { SITE } from '@const/site.ts';
import { usesCopy } from '@copy/uses.ts';

export const GET: APIRoute = async () => {
  const sectionsContent = usesCopy.sections
    .map((sec) => {
      const items = sec.items.map((it) => `- **${it.name}**: ${it.description}`).join('\n');
      return `## ${sec.title}\n\n${items}`;
    })
    .join('\n\n');

  const content = `---
title: "${usesCopy.seo.title.replace(/"/g, '\\"')}"
description: "${usesCopy.seo.description.replace(/"/g, '\\"')}"
canonicalUrl: "${SITE.url}/uses/"
author: "${SITE.name}"
---

# Uses & Developer Setup

> ${usesCopy.header.description}

- **Author**: ${SITE.name}
- **Website**: ${SITE.url}
- **Canonical URL**: ${SITE.url}/uses/

${sectionsContent}
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
