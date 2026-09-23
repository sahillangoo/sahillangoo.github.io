import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@const/site.ts';

export const GET: APIRoute = async () => {
  const [projects, allBlog, notes] = await Promise.all([
    getCollection('projects'),
    getCollection('blog'),
    getCollection('notes'),
  ]);

  const sortedProjects = [...projects].sort((a, b) => a.data.order - b.data.order);
  const publishedBlog = allBlog
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
    );
  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  const projectSections = sortedProjects
    .map((p, index) => {
      const details = [
        `- **Title**: ${p.data.title}`,
        `- **Canonical URL**: ${SITE.url}/projects/${p.id}/`,
        `- **Markdown Resource**: ${SITE.url}/projects/${p.id}.md`,
        `- **Role**: ${p.data.role}`,
        `- **Year**: ${p.data.year}`,
        `- **Category**: ${p.data.category}`,
        `- **Tech Stack**: ${p.data.tags.join(', ')}`,
        p.data.liveUrl ? `- **Live Platform**: ${p.data.liveUrl}` : null,
        p.data.githubUrl ? `- **Source Code**: ${p.data.githubUrl}` : null,
        p.data.summary ? `- **Executive Summary**: ${p.data.summary}` : null,
        `- **Description**: ${p.data.description}`,
      ]
        .filter(Boolean)
        .join('\n');

      const bodyText = p.body?.trim()
        ? `\n\n#### Case Study & Technical Implementation\n\n${p.body.trim()}`
        : '';

      return `### 3.${index + 1} ${p.data.title}\n\n${details}${bodyText}`;
    })
    .join('\n\n---\n\n');

  const blogSections = publishedBlog
    .map((b, index) => {
      const details = [
        `- **Title**: ${b.data.title}`,
        `- **Canonical URL**: ${SITE.url}/blog/${b.id}/`,
        `- **Markdown Resource**: ${SITE.url}/blog/${b.id}.md`,
        `- **Published Date**: ${b.data.publishDate}`,
        b.data.readingTime ? `- **Reading Time**: ${b.data.readingTime}` : null,
        `- **Category**: ${b.data.category}`,
        `- **Tags**: ${b.data.tags.join(', ')}`,
        `- **Abstract**: ${b.data.description}`,
      ]
        .filter(Boolean)
        .join('\n');

      const bodyText = b.body?.trim() ? `\n\n#### Article Content\n\n${b.body.trim()}` : '';

      return `### 4.${index + 1} ${b.data.title}\n\n${details}${bodyText}`;
    })
    .join('\n\n---\n\n');

  const noteSections = sortedNotes
    .map((n, index) => {
      const details = [
        `- **Title**: ${n.data.title}`,
        `- **Canonical URL**: ${SITE.url}/notes/${n.id}/`,
        `- **Markdown Resource**: ${SITE.url}/notes/${n.id}.md`,
        `- **Published Date**: ${n.data.publishDate}`,
        `- **Topic**: ${n.data.topic}`,
        `- **Tags**: ${n.data.tags.join(', ')}`,
        n.data.description ? `- **Summary**: ${n.data.description}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      const bodyText = n.body?.trim() ? `\n\n#### Note Content\n\n${n.body.trim()}` : '';

      return `### 5.${index + 1} ${n.data.title}\n\n${details}${bodyText}`;
    })
    .join('\n\n---\n\n');

  const content = `# Sahil Langoo - Comprehensive Systems Knowledge Base & Corpus

> Complete concatenated documentation corpus for autonomous LLM agents, research assistants, and AI retrieval systems. Conforms to the llmstxt.org extended full context specification.

## 1. Identity & Overview
- **Name**: ${SITE.name} (${SITE.legalName})
- **Role**: Full Stack Systems Engineer & Systems Architect
- **Affiliation**: Eresolution Consultancy Services & @SquadCoders (Co-Founder & Lead Engineer)
- **Enterprise Engineering**: Contributor to high-throughput monorepos at @ecspl
- **Location**: ${SITE.detailedLocation} (Open to global remote engineering & architecture consulting)
- **Primary Website**: ${SITE.url}
- **Verified Repositories**: ${SITE.social.github}
- **LinkedIn**: ${SITE.social.linkedin}
- **Twitter / X**: ${SITE.social.twitter}
- **daily.dev Profile**: ${SITE.social.dailydev} (5.4k+ reads)
- **Google Developer Profile**: ${SITE.social.googleDev}
- **Direct Email**: ${SITE.email}
- **Personal Email**: ${SITE.personalEmail}

---

## 2. Core Technical Competencies & Stacks
- **Frontend Architecture**: Astro 7.3, Next.js, React, TypeScript, Tailwind CSS v4, daisyUI 5, Partytown Web Workers, Lenis Smooth Scroll.
- **Backend & Edge Systems**: Cloudflare Workers, Hono, Node.js, Go, Python, Meta Conversions API (CAPI), Cloudflare Turnstile, Cloudflare R2, Cloudflare KV, SQLite / D1, PostgreSQL, Redis.
- **AI & Automation Tooling**: Local Small Language Models (Google Gemma 2B Vision via LM Studio), Bun runtime zero-copy scripting, automated vision image optimization (smart-img-cli).
- **Quality Gates & Observability**: Sentry real-time exception telemetry, Playwright E2E browser automation, ESLint 10 flat config, Prettier, Zod runtime schema validation, zero-dependency build-time quality hooks.

---

## 3. Academic Background & Certifications
- **Bachelor of Technology in Computer Science Engineering (B.Tech CSE)**: University of Kashmir (North Campus), Baramulla, Kashmir, India (2021 - 2023, Graduated Dec 2023, CGPA: 7.07 / 10.0). Coursework: Data Structures & Algorithms, Object Oriented Programming, Cloud Computing, Software Engineering, Web Technologies.
- **3-Year Diploma in Computer Science Engineering**: Kashmir Govt Polytechnic, Srinagar, Kashmir, India (2016 - 2019, Graduated July 2019, CGPA: 6.22 / 10.0).
- **Meta Front-End Developer Professional Certificate**: Meta (Facebook) / Coursera
- **Complete Next.js Developer**: Frontend Masters (Scott Moss)
- **Ecommerce Platform Using React**: Scaler Masterclass
- **Crash Course in Python**: Google / Coursera
- **Full Stack Web Development**: Zero To Mastery (Andrei Neagoie)

---

## 4. Key Engineering Philosophy
- **KISS & YAGNI**: Reject premature abstraction. Build straightforward systems with minimal moving parts.
- **Performance by Default**: Ship static HTML first; isolate interactive widgets to Astro islands; offload third-party tracking scripts to Web Workers via Partytown.
- **Tactile UI Craft**: High-contrast typography, calibrated OKLCH color spaces, zero neon fluff, and responsive micro-interactions.
- **Type Safety & Supply Chain Integrity**: End-to-end type safety, Zod schema validation across all content pipelines, and strict pnpm supply-chain pinning.

---

## 5. Production Case Studies & Deployed Systems

${projectSections}

---

## 6. Technical Writing & Systems Architecture Essays

${blogSections}

---

## 7. Digital Garden Notes & Mental Models

${noteSections}

---

## 8. Contact & Consulting
- **Email**: ${SITE.email}
- **Consulting**: Open for high-impact architecture, web performance, and edge systems consulting.
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
