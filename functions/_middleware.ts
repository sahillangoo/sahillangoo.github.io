/**
 * Cloudflare Pages Middleware: functions/_middleware.ts
 *
 * Edge Content Negotiation & AI Agent Protocol Layer:
 * 1. Checks incoming Accept header for 'text/markdown'.
 * 2. Rewrites / routes to clean, pre-rendered Markdown resources for AI agents and LLM crawlers.
 * 3. Enforces RFC 8288 Link headers, Vary: Accept, and Content-Signal metadata.
 */

interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
  env: {
    ASSETS: {
      fetch: (req: Request | string) => Promise<Response>;
    };
  };
}

const STATIC_EXT_REGEX =
  /\.(?:png|jpg|jpeg|webp|avif|gif|svg|ico|woff2|woff|ttf|css|js|mjs|map|txt|xml|json|pdf|webmanifest)$/i;

function getMarkdownRoute(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, '');

  if (clean === '' || clean === '/index.html') return '/llms.txt';
  if (clean === '/services') return '/services.md';
  if (clean === '/pricing') return '/pricing.md';
  if (clean === '/about') return '/about.md';
  if (clean === '/resume') return '/resume.md';
  if (clean === '/now') return '/now.md';
  if (clean === '/uses') return '/uses.md';
  if (clean === '/colophon') return '/colophon.md';
  if (clean === '/privacy') return '/privacy.md';

  // Content items: /blog/<slug> and /projects/<slug>
  const blogMatch = clean.match(/^\/blog\/([^/]+)$/);
  if (blogMatch && blogMatch[1] && !['category', 'tag', '2', '3'].includes(blogMatch[1])) {
    return `${clean}.md`;
  }

  const projectMatch = clean.match(/^\/projects\/([^/]+)$/);
  if (projectMatch && projectMatch[1]) {
    return `${clean}.md`;
  }

  return null;
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Skip static assets and internal paths
  if (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    STATIC_EXT_REGEX.test(pathname)
  ) {
    return next();
  }

  const acceptHeader = request.headers.get('accept') || '';
  const wantsMarkdown = acceptHeader.toLowerCase().includes('text/markdown');

  if (wantsMarkdown) {
    const mdRoute = getMarkdownRoute(pathname);
    if (mdRoute) {
      const mdUrl = new URL(mdRoute, url.origin);
      try {
        const assetRes = env?.ASSETS
          ? await env.ASSETS.fetch(mdUrl.toString())
          : await fetch(mdUrl.toString());
        if (assetRes.status === 200) {
          const newHeaders = new Headers(assetRes.headers);
          newHeaders.set('Content-Type', 'text/markdown; charset=utf-8');
          newHeaders.set('Vary', 'Accept');
          newHeaders.set('Content-Signal', 'ai-train=yes, ai-input=yes, search=yes');
          newHeaders.set('Link', '</llms.txt>; rel="describedby"; type="text/markdown"');
          return new Response(assetRes.body, {
            status: 200,
            headers: newHeaders,
          });
        }
      } catch (err) {
        console.warn('Error fetching markdown route at edge:', err);
      }
    }
  }

  // Regular HTML handling
  const response = await next();
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('text/html')) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Vary', 'Accept');
    newHeaders.set('Link', '</llms.txt>; rel="describedby"; type="text/markdown"');
    newHeaders.set('Content-Signal', 'ai-train=yes, ai-input=yes, search=yes');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
}
