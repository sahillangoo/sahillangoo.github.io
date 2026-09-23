import type { APIRoute } from 'astro';
import { SITE } from '@const/site.ts';
import { colophonCopy } from '@copy/colophon.ts';

export const GET: APIRoute = async () => {
  const specs = colophonCopy.sections.specifications
    .map((s) => `- **${s.label}**: ${s.value}`)
    .join('\n');

  const principles = colophonCopy.sections.principles
    .map((p) => `### ${p.title}\n\n${p.description}`)
    .join('\n\n');

  const content = `---
title: "${colophonCopy.seo.title.replace(/"/g, '\\"')}"
description: "${colophonCopy.seo.description.replace(/"/g, '\\"')}"
canonicalUrl: "${SITE.url}/colophon/"
author: "${SITE.name}"
---

# Technical Colophon & Architecture Specifications

> ${colophonCopy.header.description}

- **Site Name**: ${SITE.name}
- **Author**: ${SITE.author}
- **Canonical URL**: ${SITE.url}/colophon/

## System Specifications & Technical Stack

${specs}

## Design & Performance Principles

${principles}
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
