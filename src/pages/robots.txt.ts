import type { APIRoute } from 'astro';
import { SITE, ROBOTS_DISALLOWED_PATHS } from '@const/site.ts';

export const GET: APIRoute = () => {
  const disallowDirectives = ROBOTS_DISALLOWED_PATHS.map((path) => `Disallow: ${path}`).join('\n');

  const content = `# ==============================================================================
# Robots.txt for sahillangoo.in
# Production SEO, AI LLM Citations & Search Crawler Policy (RFC 9309 Compliant)
# LLM Knowledge Base & Extended Context (llmstxt.org v2 & Google OKF v0.1):
# ${SITE.url}/llms.txt
# ${SITE.url}/llms-full.txt
# ${SITE.url}/pricing.md
# ${SITE.url}/services.md
# ${SITE.url}/okf/index.md
# ==============================================================================

# Global Crawler Directives (Applies to all search, social & general indexing bots)
User-agent: *
Allow: /
${disallowDirectives}

# ------------------------------------------------------------------------------
# Authorized AI Search, Retrieval & Grounding Crawlers:
# - OpenAI Search & Training: OAI-SearchBot, ChatGPT-User, GPTBot
# - Perplexity Search: PerplexityBot, Perplexity-User
# - Anthropic Claude: Claude-SearchBot, ClaudeBot
# - Google AI & Search: Googlebot, Google-Extended
# - Apple Intelligence: Applebot-Extended, Applebot
# - Microsoft Copilot: Bingbot
# - Meta AI: Meta-ExternalAgent
# - Other LLM Crawlers: Cohere-ai, Amazonbot
# ------------------------------------------------------------------------------

User-agent: GPTBot
Allow: /
${disallowDirectives}

User-agent: ChatGPT-User
Allow: /
${disallowDirectives}

User-agent: OAI-SearchBot
Allow: /
${disallowDirectives}

User-agent: PerplexityBot
Allow: /
${disallowDirectives}

User-agent: Perplexity-User
Allow: /
${disallowDirectives}

User-agent: ClaudeBot
Allow: /
${disallowDirectives}

User-agent: Claude-SearchBot
Allow: /
${disallowDirectives}

User-agent: Google-Extended
Allow: /
${disallowDirectives}

User-agent: Applebot-Extended
Allow: /
${disallowDirectives}

User-agent: Meta-ExternalAgent
Allow: /
${disallowDirectives}

User-agent: Cohere-ai
Allow: /
${disallowDirectives}

User-agent: Amazonbot
Allow: /
${disallowDirectives}

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
