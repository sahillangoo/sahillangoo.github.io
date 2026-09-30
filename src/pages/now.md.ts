import type { APIRoute } from 'astro';
import { SITE } from '@const/site.ts';
import { nowCopy } from '@copy/now.ts';

export const GET: APIRoute = async () => {
  const sectionsText = nowCopy.sections
    .map((s) => `## ${s.category}\n\n${s.items.map((item) => `- ${item}`).join('\n')}`)
    .join('\n\n');

  const content = `---
title: "${nowCopy.seo.title.replace(/"/g, '\\"')}"
description: "${nowCopy.seo.description.replace(/"/g, '\\"')}"
canonicalUrl: "${SITE.url}/now/"
author: "${SITE.name}"
---

# What I'm Doing Right Now

> ${nowCopy.header.description}

- **Name**: ${SITE.name}
- **Role**: Full Stack Systems Engineer & Systems Architect
- **Location**: ${SITE.detailedLocation}
- **Website**: ${SITE.url}
- **Last Updated**: October 2026

${sectionsText}

## Availability & Contact

- **Status**: ${nowCopy.availabilityCard.title} - ${nowCopy.availabilityCard.description}
- **Links**: [${SITE.url}/links/](${SITE.url}/links/)
- **Email**: [${SITE.email}](mailto:${SITE.email})
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
