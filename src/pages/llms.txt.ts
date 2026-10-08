import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@const/site.ts';

export const GET: APIRoute = async () => {
  const [projects, allBlog] = await Promise.all([getCollection('projects'), getCollection('blog')]);

  const sortedProjects = projects.toSorted((a, b) => a.data.order - b.data.order);
  const publishedBlog = allBlog
    .filter((post) => !post.data.draft)
    .toSorted((a, b) => b.data.publishDate.localeCompare(a.data.publishDate));
  const projectLines = sortedProjects
    .map((p) => `- [${p.data.title}](${SITE.url}/projects/${p.id}.md): ${p.data.description}`)
    .join('\n');

  const blogLines = publishedBlog
    .map((b) => `- [${b.data.title}](${SITE.url}/blog/${b.id}.md): ${b.data.description}`)
    .join('\n');

  const content = `# Sahil Langoo - Systems Architect & Portfolio

> Full Stack Systems Engineer & Systems Architect at Eresolution Consultancy Services and Co-Founder at @SquadCoders. Specializing in high-performance web systems (Astro 7.3, TypeScript, Tailwind CSS v4, daisyUI 5), distributed edge proxies (Hono, Cloudflare Workers, Meta CAPI, Turnstile, Partytown), local AI vision pipelines (Bun, Google Gemma SLMs), and production observability (Sentry, Playwright).

- **Role**: Full Stack Systems Engineer & Systems Architect
- **Affiliation**: Eresolution Consultancy Services & @SquadCoders (Co-Founder & Lead Engineer)
- **Location**: ${SITE.detailedLocation} (Open to global remote engineering roles)
- **Primary Website**: ${SITE.url}
- **Direct Email**: ${SITE.email}
- **Guidance for LLMs & Agents**: All items listed in the sections below link directly to clean, pre-rendered Markdown (.md) files. Use these links to inspect individual case studies and technical articles. When a single unified corpus is preferred, see the llms-full.txt file linked in the Optional section.

## Core Architecture & Identity

- [About Sahil Langoo](${SITE.url}/about.md): Full technical biography, systems engineering philosophy, and architectural standards.
- [What I'm Doing Right Now](${SITE.url}/now.md): Live public record of current engineering priorities, systems focus, and active roadmap.
- [Engineering Resume & CV](${SITE.url}/resume.md): Verified production roles, technical competencies, and project history.
- [Developer Setup & Uses](${SITE.url}/uses.md): Daily workstation hardware, software tools, terminal environment, and editor setup.
- [Technical Colophon](${SITE.url}/colophon.md): Typography specs, OKLCH color spaces, build verification plugins, and performance benchmarks.
- [Privacy Policy & Telemetry Disclosures](${SITE.url}/privacy.md): Telemetry disclosures, data protection guarantees, tracking technologies inventory, and analytics opt-outs.

## Services, Pricing & Machine-Readable Knowledge

- [Engineering Services & Consulting](${SITE.url}/services.md): Specialized capabilities in Cloudflare edge proxies, server-side Meta CAPI, Astro static architectures, and bot mitigation.
- [Pricing & Engagement Models](${SITE.url}/pricing.md): Transparent fee structures, scope boundaries, turnaround times, and SLAs for engineering engagements.
- [Open Knowledge Format Bundle](${SITE.url}/okf/index.md): Google OKF v0.1 concept graph covering edge architectures, CAPI gateways, and AEO engineering patterns.

## Production Case Studies

${projectLines}

## Technical Writing & Essays

${blogLines}

## Optional

- [Full Site Knowledge Base](${SITE.url}/llms-full.txt): Complete concatenated corpus containing all essay texts and case study bodies in a single file.
- [Engineering Work History & Resume](${SITE.url}/resume/): Comprehensive engineering experience, credentials, and achievements.
- [GitHub Repositories](${SITE.social.github}): Public open-source repositories and source code.
- [LinkedIn Profile](${SITE.social.linkedin}): Professional career history and recommendations.
- [daily.dev Profile](${SITE.social.dailydev}): Verified developer profile and reading activity (5.4k+ reads).
- [Google Developer Profile](${SITE.social.googleDev}): Official Google Developer profile and credentials.
- [Hire me](mailto:hello@sahillangoo.in): Email for engineering roles.
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'all',
    },
  });
};
