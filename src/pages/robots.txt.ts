import type { APIRoute } from 'astro';
import { SITE } from '@const/site.ts';

export const GET: APIRoute = () => {
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

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Cohere-ai
Allow: /

User-agent: Amazonbot
Allow: /

# ------------------------------------------------------------------------------
# Sitemaps
# ------------------------------------------------------------------------------
Sitemap: ${SITE.url}/sitemap-index.xml
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
