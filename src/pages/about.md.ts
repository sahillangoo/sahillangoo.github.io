import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { SITE } from '@const/site.ts';
import { aboutCopy } from '@copy/about.ts';

export const GET: APIRoute = async () => {
  const siteData = await getEntry('site', 'profile');
  const principles = siteData?.data.principles || [];

  const principlesText = principles.map((p) => `### ${p.title}\n\n${p.description}`).join('\n\n');

  const toolsText = aboutCopy.dailyStack.groups
    .map((g) => `- **${g.label}**: ${g.value}`)
    .join('\n');

  const content = `---
title: "${aboutCopy.seo.title.replace(/"/g, '\\"')}"
description: "${aboutCopy.seo.description.replace(/"/g, '\\"')}"
canonicalUrl: "${SITE.url}/about/"
author: "${SITE.name}"
---

# About Sahil Langoo

> ${aboutCopy.seo.description}

- **Name**: Sahil Langoo
- **Role**: Full Stack Systems Engineer & Systems Architect
- **Location**: ${SITE.detailedLocation}
- **Website**: ${SITE.url}
- **Email**: ${SITE.email}
- **GitHub**: ${SITE.social.github}
- **LinkedIn**: ${SITE.social.linkedin}
- **daily.dev**: ${SITE.social.dailydev} (5.4k+ reads)
- **Google Developer**: ${SITE.social.googleDev}

## Background & Engineering Intent

${aboutCopy.hero.paragraphs.join('\n\n')}

## Core Operating Principles

${principlesText}

## Daily Tools & Technical Arsenal

${toolsText}

## Inquiries & Collaboration

Interested in collaborating on edge architectures, static web systems, or performance optimization? Reach out at [${SITE.email}](mailto:${SITE.email}) or explore [${SITE.url}/links/](${SITE.url}/links/).
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
