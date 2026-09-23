import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { SITE } from '@const/site.ts';
import { resumeCopy } from '@copy/resume.ts';

export const GET: APIRoute = async () => {
  const [experiences, siteData, allProjects] = await Promise.all([
    getCollection('experience'),
    getEntry('site', 'profile'),
    getCollection('projects'),
  ]);

  const skills = siteData?.data.skills;
  const sortedExp = [...experiences].sort((a, b) => a.data.order - b.data.order);

  const expLines = sortedExp
    .map((exp) => {
      const resp = exp.data.highlights.map((r: string) => `  - ${r}`).join('\n');
      return `### ${exp.data.role} | ${exp.data.company}
- **Period**: ${exp.data.period}
- **Location**: ${exp.data.location}
- **Key Responsibilities & Highlights**:
${resp}`;
    })
    .join('\n\n');

  const targetProjectIds = [
    'taffin-tech-job-board',
    'enterprise-lead-funnels',
    'school-management-saas',
  ];
  const resumeProjects = targetProjectIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const projLines = resumeProjects
    .map((p) => `- **${p.data.title}**: ${p.data.description} (Stack: ${p.data.tags.join(', ')})`)
    .join('\n');

  const certLines = SITE.certifications
    .map((c) => `- **${c.name}** - ${c.issuer} (${c.year})`)
    .join('\n');

  const content = `---
title: "${resumeCopy.seo.title.replace(/"/g, '\\"')}"
description: "${resumeCopy.seo.description.replace(/"/g, '\\"')}"
canonicalUrl: "${SITE.url}/resume/"
author: "${SITE.name}"
---

# Sahil Langoo - Curriculum Vitae

> ${resumeCopy.seo.description}

- **Role**: Full Stack Systems Engineer & Systems Architect
- **Location**: ${SITE.detailedLocation}
- **Website**: ${SITE.url}
- **Email**: ${SITE.email}
- **GitHub**: ${SITE.social.github}
- **LinkedIn**: ${SITE.social.linkedin}
- **daily.dev**: ${SITE.social.dailydev} (5.4k+ reads)
- **Google Developer**: ${SITE.social.googleDev}
- **Direct PDF Download**: ${SITE.url}/resumes/Resume-Sahil-Langoo.pdf

## Technical Core Competencies

- **Languages**: ${skills?.languages?.join(', ') || 'TypeScript, JavaScript, PHP, Go, Python, SQL, HTML5/CSS'}
- **Frameworks & Web Architecture**: ${skills?.frameworks?.join(', ') || 'Astro, Next.js, React, Hono'}
- **Cloud & Edge Infrastructure**: ${skills?.cloud?.join(', ') || 'Cloudflare Workers, Cloudflare Pages, Edge Computing, Docker, Git'}
- **Databases & Tooling**: ${skills?.databases?.join(', ') || 'PostgreSQL, MySQL, SQLite, Cloudflare KV & R2, Redis'}

## Professional Experience

${expLines}

## Key Technical Projects

${projLines}

## Education & Certifications

- **Bachelor of Technology (B.Tech) in Computer Science Engineering**
  - University of Kashmir (CGPA: 7.07, Capstone: Listify)
- **3-Year Diploma in Computer Science Engineering**
  - Kashmir Govt Polytechnic

### Verified Certifications
${certLines}
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
