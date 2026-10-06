import type { APIRoute } from 'astro';
import { SITE } from '@const/site.ts';
import { privacyCopy } from '@copy/privacy.ts';

export const GET: APIRoute = async () => {
  const cookiesList = privacyCopy.cookies
    .map(
      (c) =>
        `- **${c.name}** (${c.provider})\n  - Category: ${c.category}\n  - Lifespan: ${c.lifespan}\n  - Purpose: ${c.purpose}`
    )
    .join('\n\n');

  const sectionsContent = privacyCopy.sections
    .map((sec) => {
      const paras = sec.paragraphs.join('\n\n');
      const subs =
        sec.subsections
          ?.map((sub) => {
            const bullets =
              sub.bullets && sub.bullets.length > 0
                ? '\n' + sub.bullets.map((b) => `  - ${b}`).join('\n')
                : '';
            return `### ${sub.title}\n\n${sub.description}${bullets}`;
          })
          .join('\n\n') ?? '';
      return `## ${sec.title}\n\n${paras}${subs ? `\n\n${subs}` : ''}`;
    })
    .join('\n\n---\n\n');

  const rightsContent = privacyCopy.rights
    .map((r) => `### ${r.title}\n\n${r.description}`)
    .join('\n\n');

  const content = `---
title: "${privacyCopy.seo.title.replace(/"/g, '\\"')}"
description: "${privacyCopy.seo.description.replace(/"/g, '\\"')}"
canonicalUrl: "${SITE.url}/privacy/"
author: "${SITE.name}"
effectiveDate: "${privacyCopy.header.effectiveDate}"
lastUpdated: "${privacyCopy.header.lastUpdated}"
---

# ${privacyCopy.header.title} & Telemetry Disclosures

> ${privacyCopy.header.description}

- **Data Controller**: ${privacyCopy.overview.controller}
- **Compliance Inquiries**: ${privacyCopy.overview.contact}
- **Effective Date**: ${privacyCopy.header.effectiveDate}
- **Last Updated**: ${privacyCopy.header.lastUpdated}
- **Canonical URL**: ${SITE.url}/privacy/

## 1. Architectural Scope & Data Minimization

${privacyCopy.overview.summary}

## 2. Storage Identifiers & Tracking Technologies Inventory

${privacyCopy.cookiesTableDescription}

${cookiesList}

---

${sectionsContent}

---

## Data Subject Rights & Statutory Protections

${privacyCopy.rightsDescription}

${rightsContent}

---

## Privacy Compliance Inquiries

${privacyCopy.contactSection.description}

- **Direct Inquiries**: [${privacyCopy.contactSection.email}](mailto:${privacyCopy.contactSection.email})
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
