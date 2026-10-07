/**
 * Cloudflare Pages Function: First-Party Google Analytics Proxy for Partytown
 *
 * Intercepts requests from the Partytown Web Worker to bypass strict cross-origin
 * browser restrictions (CORS) on googletagmanager.com and google-analytics.com.
 *
 * Supports GET (gtag.js script loading) and POST (telemetry event beacons).
 */

const ALLOWED_HOSTS = new Set([
  'www.googletagmanager.com',
  'www.google-analytics.com',
  'analytics.google.com',
  'region1.google-analytics.com',
]);

export async function onRequest(context) {
  const request = context.request;
  const requestUrl = new URL(request.url);

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const targetParam = requestUrl.searchParams.get('url');
  if (!targetParam) {
    return new Response('Missing target url query parameter.', { status: 400 });
  }

  let targetUrl;
  try {
    targetUrl = new URL(targetParam);
  } catch {
    return new Response('Invalid target URL.', { status: 400 });
  }

  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response('Method is not permitted.', { status: 405 });
  }

  if (!ALLOWED_HOSTS.has(targetUrl.hostname)) {
    return new Response('Target host is not permitted.', { status: 403 });
  }

  try {
    const forwardHeaders = new Headers(request.headers);
    for (const name of [
      'host',
      'cookie',
      'authorization',
      'connection',
      'content-length',
      'accept-encoding',
    ]) {
      forwardHeaders.delete(name);
    }

    const response = await fetch(targetUrl.href, {
      method: request.method,
      headers: forwardHeaders,
      body: request.method === 'POST' ? request.body : undefined,
      redirect: 'follow',
    });

    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (request.method === 'GET') {
      headers.set('Cache-Control', 'public, max-age=7200, stale-while-revalidate=86400');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch {
    return new Response('Proxy dispatch failed.', { status: 502 });
  }
}
