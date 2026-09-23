import type { APIRoute } from 'astro';
import { SITE, ROBOTS_DISALLOWED_PATHS } from '@const/site.ts';

export const GET: APIRoute = () => {
  const disallowDirectives = ROBOTS_DISALLOWED_PATHS.map((path) => `Disallow: ${path}`).join('\n');

  const content = `# ==============================================================================
# Robots.txt for sahillangoo.in
# Production SEO, AI LLM Citations & Search Crawler Policy (RFC 9309 Compliant)
# LLM Knowledge Base & Extended Context (llmstxt.org v2):
# ${SITE.url}/llms.txt
# ${SITE.url}/llms-full.txt
# ==============================================================================

# Global Crawler Directives (Applies to all search, social & AI grounding agents)
User-agent: *
Allow: /
${disallowDirectives}

# ------------------------------------------------------------------------------
# Authorized AI Search, Retrieval & Grounding Crawlers:
# - OpenAI (GPTBot, ChatGPT-User, OAI-SearchBot)
# - Perplexity (PerplexityBot)
# - Anthropic (ClaudeBot, anthropic-ai)
# - Google (Google-Extended, Googlebot)
# - Microsoft Copilot (Bingbot)
# - Meta (Meta-ExternalAgent)
# All authorized crawlers inherit root indexability above.
# ------------------------------------------------------------------------------

# ------------------------------------------------------------------------------
# Sitemaps
# ------------------------------------------------------------------------------
Sitemap: ${SITE.url}/sitemap-index.xml
Sitemap: ${SITE.url}/sitemap.xml
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
