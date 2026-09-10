import type { APIRoute } from 'astro';
import { SITE, NON_INDEXABLE_PATHS } from '@const/site.ts';

export const GET: APIRoute = () => {
  const disallowPaths = Array.from(
    new Set([...NON_INDEXABLE_PATHS.filter((path) => !path.endsWith('.xml')), '/api/', '/private/'])
  );

  const disallowDirectives = disallowPaths.map((path) => `Disallow: ${path}`).join('\n');

  const content = `# ==============================================================================
# Robots.txt for sahillangoo.in
# Production SEO, AI LLM Citations & Social Preview Policy
# LLM Knowledge Base & Extended Context (llmstxt.org v2):
# ${SITE.url}/llms.txt
# ${SITE.url}/llms-full.txt
# ==============================================================================

User-agent: *
Allow: /
${disallowDirectives}

# ------------------------------------------------------------------------------
# 1. Traditional Search Engines
# ------------------------------------------------------------------------------
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /

# ------------------------------------------------------------------------------
# 2. AI Search, Retrieval & LLM Grounding Crawlers (Authorized for Citations)
# ------------------------------------------------------------------------------
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Diffbot
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bytespider
Allow: /

# ------------------------------------------------------------------------------
# 3. Social Media & Professional Link Preview Crawlers
# ------------------------------------------------------------------------------
User-agent: LinkedInBot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Facebot
Allow: /

User-agent: Slackbot
Allow: /

User-agent: TelegramBot
Allow: /

User-agent: Discordbot
Allow: /

# ------------------------------------------------------------------------------
# 4. Sitemaps
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
