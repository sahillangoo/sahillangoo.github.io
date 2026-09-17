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

  const projectLines = sortedProjects
    .map((p) => `- [${p.data.title}](${SITE.url}/projects/${p.id}.md): ${p.data.description}`)
    .join('\n');

  const blogLines = publishedBlog
    .map((b) => `- [${b.data.title}](${SITE.url}/blog/${b.id}.md): ${b.data.description}`)
    .join('\n');

  const noteLines = sortedNotes
    .map(
      (n) =>
        `- [${n.data.title}](${SITE.url}/notes/${n.id}.md): ${n.data.description || n.data.topic}`
    )
    .join('\n');

  const content = `# Sahil Langoo - Systems Architect & Portfolio

> Full Stack Systems Engineer & Systems Architect at Eresolution Consultancy Services and Co-Founder at @SquadCoders. Specializing in high-performance web systems (Astro 7.3, TypeScript, Tailwind CSS v4, daisyUI 5), distributed edge proxies (Hono, Cloudflare Workers, Meta CAPI, Turnstile, Partytown), local AI vision pipelines (Bun, Google Gemma SLMs), and production observability (Sentry, Playwright).

- **Role**: Full Stack Systems Engineer & Systems Architect
- **Affiliation**: Eresolution Consultancy Services & @SquadCoders (Co-Founder & Lead Engineer)
- **Location**: ${SITE.detailedLocation} (Open to global remote engineering & consulting)
- **Primary Website**: ${SITE.url}
- **Direct Email**: ${SITE.email}
- **Guidance for LLMs & Agents**: All items listed in the sections below link directly to clean, pre-rendered Markdown (.md) files. Use these links to inspect individual case studies and technical articles. When a single unified corpus is preferred, see the llms-full.txt file linked in the Optional section.

## Production Case Studies

${projectLines}

## Technical Writing & Essays

${blogLines}

## Digital Garden Notes & Mental Models

${noteLines}

## Optional

- [Full Site Knowledge Base](${SITE.url}/llms-full.txt): Complete concatenated corpus containing all essay texts, notes, and case study bodies in a single file.
- [Engineering Work History & Resume](${SITE.url}/resume/): Comprehensive engineering experience, credentials, and achievements.
- [GitHub Repositories](${SITE.social.github}): Public open-source repositories and source code.
- [LinkedIn Profile](${SITE.social.linkedin}): Professional career history and recommendations.
- [Direct Contact](mailto:${SITE.email}): Inquiries for high-impact architecture, web performance, and edge consulting.
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
};
