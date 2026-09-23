---
title: 'The Complete Playbook: Hosting Astro with View Transitions on Cloudflare Pages'
description: 'A step-by-step engineering guide to deploying Astro with View Transitions and hover prefetching on Cloudflare Pages without broken scripts, duplicate requests, or stale chunk errors.'
publishDate: '2026-09-19'
category: 'Engineering'
tags:
  - astro
  - cloudflare
  - view-transitions
  - performance
  - edge-computing
featured: true
readingTime: '8 min read'
draft: false
---

Astro's View Transitions router transforms static multi-page sites into fluid, single-page application experiences. Clicking a link swaps the page body and animates elements instantly without a jarring browser reload.

Deploy that same site to Cloudflare Pages with default settings, and things often break down quickly.

Scripts stop executing on navigated pages. Form submission handlers go dead. Dark mode toggles stop responding. In worst-case setups, deployments trigger infinite redirect loops or 404 errors on deleted hashed bundles.

These bugs are not caused by defects in Astro. They happen because Cloudflare's default edge optimization suite was built a decade ago for traditional server-rendered websites. When those edge features encounter modern client-side routers, they interfere with DOM swapping, script lifecycles, and cache validation.

Here is the complete step-by-step playbook to configure Astro and Cloudflare Pages for instant transitions, zero layout shifts, and reliable edge caching.

---

## 1. Setting Up Astro View Transitions from Scratch

Astro provides native view transitions via the `<ClientRouter />` component (formerly `<ViewTransitions />`). It uses the browser's native View Transitions API under the hood and falls back to an intelligent DOM-swapping script in unsupported browsers.

### Step 1.1: Add the ClientRouter to Your Root Layout

Import `<ClientRouter />` from `astro:transitions` in your root layout and place it inside the `<head>` tag:

```astro
---
// src/layouts/BaseLayout.astro
import { ClientRouter } from 'astro:transitions';
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Astro View Transitions Router -->
    <ClientRouter />
  </head>
  <body class="bg-base-100 text-base-content min-h-screen">
    <nav>
      <a href="/">Home</a>
      <a href="/blog/">Blog</a>
      <a href="/projects/">Projects</a>
    </nav>
    <main>
      <slot />
    </main>
  </body>
</html>
```

Placing `<ClientRouter />` inside `<head>` enables client-side navigation. Whenever a visitor clicks an internal anchor tag, Astro intercepts the click with `event.preventDefault()`, fetches the destination page's HTML in the background, diffs the new document with the current one, and updates the DOM inside `document.startViewTransition()`.

### Step 1.2: Enable Hover-Based Prefetching in Astro Config

Human reaction time between hovering a link and completing a click is roughly 100ms to 300ms. If you fetch the target page on hover, the HTML arrives before the user's finger leaves the mouse button.

Configure prefetching in `astro.config.mjs`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sahillangoo.in',
  trailingSlash: 'always',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  experimental: {
    clientPrerender: true,
  },
});
```

- `prefetchAll: true`: Automatically injects prefetch behavior into all local internal links.
- `defaultStrategy: 'hover'`: Triggers prefetch when the cursor hovers over a link or on touchstart for mobile devices.
- `clientPrerender: true`: Instructs supporting browsers to use the Speculation Rules API for near-instant client prerendering.

---

## 2. Adapting Client Scripts for the View Transitions Lifecycle

A classic bug developers hit after adding `<ClientRouter />` is that client-side JavaScript (like theme toggles, scroll trackers, or mobile menu toggles) works on first load, but stops working as soon as they navigate to another page.

In a traditional multi-page app, navigating to a new route triggers `window.onload` and runs all `<script>` tags from scratch.

With `<ClientRouter />`, the page never reloads. The router replaces the `<body>` elements, while scripts in `<head>` stay initialized. Scripts that rely on running once on initial load will not bind event listeners to newly swapped elements.

### The Fix: Listen for `astro:page-load`

Replace `window.addEventListener('DOMContentLoaded', ...)` or bare script execution with Astro's synthetic lifecycle events:

```html
<script>
  function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Runs on initial document load AND after every client-side page transition
  document.addEventListener('astro:page-load', setupThemeToggle);
</script>
```

Astro provides four core transition lifecycle events:

1. `astro:before-preparation`: Fired immediately after clicking a link, before fetching destination HTML. Ideal for showing loading spinners.
2. `astro:after-preparation`: Fired when the destination HTML has finished loading.
3. `astro:before-swap`: Fired right before the new DOM replaces the old DOM. Use this to clean up timers, disconnect observers, or stop animation instances.
4. `astro:page-load`: Fired at the end of every navigation after the new DOM is mounted and painted. This is where all UI event listeners should be attached.

---

## 3. Deploying to Cloudflare Pages

Cloudflare Pages is an excellent host for Astro static sites, offering global edge distribution and zero-config Git deployments.

### Step 3.1: Configure Wrangler Output

Add a minimal `wrangler.toml` at your repository root to configure the Pages build directory:

```toml
name = "my-astro-portfolio"
compatibility_date = "2026-08-15"
pages_build_output_dir = "dist"
```

### Step 3.2: Configure Build Scripts in `package.json`

Add production deployment commands to your `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "pages:deploy": "wrangler pages deploy ./dist --project-name my-astro-portfolio"
  }
}
```

Run your build and deploy:

```bash
pnpm build
pnpm run pages:deploy
```

---

## 4. The Critical Cache Setting That Protects View Transitions

Once your site is live on Cloudflare Pages, there is one critical caching setting you must configure in the dashboard to prevent broken client-side transitions.

### Fixed Browser Cache TTL Trap (Set to "Respect Existing Headers")

- **Location**: Caching > Configuration > Browser Cache TTL
- **What it does**: Overrides the cache duration sent by your origin and forces visitors' browsers to store HTML files locally for a fixed time (like 4 hours or 1 day).
- **Why it breaks View Transitions**: Every Astro build generates unique content-hashed filenames for JavaScript and CSS bundles (for example, `/_astro/chunk.k9z2a.js`). If you instruct browsers to cache HTML for hours, a returning visitor will load stale HTML from disk that references old hashed filenames that were deleted in your latest deployment. Clicking links results in console 404 errors and broken transitions.
- **Fix**: Set Browser Cache TTL to **Respect Existing Headers**.

---

## 5. The Dual-Tier Caching Strategy (`public/_headers`)

To deliver 60fps view transitions on link hover, the destination HTML must arrive in under 50ms.

However, you cannot let the browser cache HTML because of hashed asset dependencies.

The solution is a **dual-tier caching architecture**:

1. The **browser** must always revalidate HTML (`max-age=0, must-revalidate`).
2. The **Cloudflare edge** must cache HTML in edge memory (`Cloudflare-CDN-Cache-Control: max-age=86400, stale-while-revalidate=86400`).

Create or update `public/_headers`:

```http
# Global Baseline: Security & Dual-Tier Edge Caching
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Cache-Control: public, max-age=0, must-revalidate
  Cloudflare-CDN-Cache-Control: max-age=86400, stale-while-revalidate=86400

# Immutable Hashed Assets (Astro bundles change hash on every edit)
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# Static Fonts (Immutable)
/*.woff2
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

# Static Images (30 Days with Stale-While-Revalidate)
/*.webp
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400
/*.png
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400
```

### How Dual-Tier Caching Works:

- When Cloudflare serves HTML, it reads `Cloudflare-CDN-Cache-Control`, stores the response in edge memory across all 300+ global PoPs, and strips the header before sending the response to the user.
- The visitor's browser only sees `Cache-Control: public, max-age=0, must-revalidate`. It will never hold stale HTML or broken bundle references.
- When a visitor hovers a link, Astro's background `fetch()` reaches the local Cloudflare edge data center and returns an edge `HIT` in **5ms to 15ms**, ensuring instant navigation when clicked.

---

## 6. Complete Free-Tier Cloudflare Dashboard Checklist

Here is the master configuration checklist for hosting Astro with View Transitions on the Cloudflare Free tier:

| Section                     | Feature Name                 | Setting                      | Why                                                              |
| :-------------------------- | :--------------------------- | :--------------------------- | :--------------------------------------------------------------- |
| **Caching > Tiered Cache**  | Smart Tiered Cache           | **Enabled (ON)**             | Routes cache misses through regional hub PoPs (>95% hit ratio).  |
| **Caching > Configuration** | Browser Cache TTL            | **Respect Existing Headers** | Prevents stale HTML and 404 errors on hashed bundles.            |
| **Caching > Configuration** | Crawler Hints                | **Enabled (ON)**             | Uses IndexNow to notify search engines when pages change.        |
| **Caching > Configuration** | Always Online                | **Disabled (OFF)**           | Pages has no origin to fail; avoids stale historical snapshots.  |
| **Network**                 | HTTP/3 (QUIC)                | **Enabled (ON)**             | Prevents transport Head-of-Line packet blocking during prefetch. |
| **Network**                 | 0-RTT Resumption             | **Enabled (ON)**             | 0ms handshake overhead for returning visitors.                   |
| **Network**                 | WebSockets & gRPC            | **Disabled (OFF)**           | Pure static SSG site; reduces protocol attack surface.           |
| **Transform Rules**         | Remove X-Powered-By          | **Enabled (ON)**             | Good security hygiene; strips backend identity headers.          |
| **Transform Rules**         | Add security headers         | **Disabled (OFF)**           | Keep off. Managed in `public/_headers` with modern standards.    |
| **Transform Rules**         | All Request Headers          | **Disabled (OFF)**           | Client IP and location headers are unneeded for static SSG.      |
| **SSL/TLS > Overview**      | Encryption Mode              | **Full (strict)**            | Verified end-to-end encryption to Cloudflare Pages edge.         |
| **SSL/TLS > Edge Certs**    | Always Use HTTPS             | **Enabled (ON)**             | Immediate edge 301 redirect for port 80 requests.                |
| **SSL/TLS > Edge Certs**    | Minimum TLS Version          | **TLS 1.2**                  | Modern security standard while keeping 99.9% device reach.       |
| **SSL/TLS > Edge Certs**    | TLS 1.3                      | **Enabled (ON)**             | Slashes handshake latency to 1 RTT.                              |
| **SSL/TLS > Edge Certs**    | Automatic HTTPS Rewrites     | **Enabled (ON)**             | Fixes mixed-content asset references automatically.              |
| **SSL/TLS > Edge Certs**    | HSTS                         | **Enabled (ON)**             | Forces browsers to connect exclusively via HTTPS.                |
| **Security > Page Shield**  | Continuous Script Monitoring | **Enabled (ON)**             | Audits scripts via CSP reports to detect supply chain issues.    |
| **AI > WebMCP**             | WebMCP (Beta)                | **Disabled (OFF)**           | Experimental feature; unneeded since site provides `/llms.txt`.  |

---

## 7. Real User Monitoring (Web Vitals) Without Script Conflicts

If you want to measure real user Core Web Vitals (LCP, INP, CLS) using Cloudflare Web Analytics, do not use Cloudflare's **Automatic Setup** toggle.

Automatic Setup injects the beacon script right before `</body>`. When Astro performs a View Transition body swap, that script gets torn down and re-injected on every click, producing duplicate counters and console errors.

Instead, create a dedicated component that injects the beacon manually with SPA mode enabled:

```astro
---
// src/components/common/CloudflareAnalytics.astro
interface Props {
  token: string;
}

const { token } = Astro.props;
---

{token && <script is:inline define:vars={{ token }}>
  (() => {
    if (window.__cf_beacon_loaded) return;
    window.__cf_beacon_loaded = true;

    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: token, spa: true }));

    // Load when browser is idle to protect Lighthouse scores
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => document.head.appendChild(script));
    } else {
      setTimeout(() => document.head.appendChild(script), 2000);
    }
  })();
</script>}
```

Notice the **`spa: true`** attribute. This instructs Cloudflare Web Analytics to listen to browser History API events and record soft navigations as genuine page views. Placing the script inside `<head>` and deferring it via `requestIdleCallback` keeps your Lighthouse Performance score at 100/100 while capturing field data.

---

## Frequently Asked Questions

### Why does my dark mode or theme switcher toggle back to light mode on page change?

Because your toggle script only ran on initial page load. Wrap your theme logic in a function and attach it to the `astro:page-load` event. If you apply a class to `<html>` or `<body>`, make sure your root elements persist state across transitions.

### Does Astro hover prefetch consume excessive bandwidth?

No. Astro fetches only the lightweight static HTML document on hover (typically 10KB to 30KB uncompressed). Images, fonts, and stylesheets are already cached locally after the first page visit.

### Why do I see a brief flash of unstyled content (FOUC) during transitions?

Ensure your stylesheets and fonts are declared globally in your root layout `<head>`. Astro diffs `<head>` elements during transitions; if page-specific layouts import different stylesheets without shared layouts, stylesheets can unmount momentarily.

---

## Related Reading & Case Studies

- Digital Garden Note: [Eliminating Layout Shifts in Astro View Transitions](/notes/astro-view-transitions-layout-shift/)
- Architecture Guide: [Architecting Modern Astro Systems](/blog/architecting-modern-astro-systems/)
- Production Template: [Astro Daisy Starter Template](/projects/template-astro-daisy/)
- Engineering Portfolio: [Explore Engineered Projects & Systems](/projects/)

---

## Stay Connected

If you are building high-performance edge web applications with Astro, Tailwind, and Cloudflare, follow along for future technical architecture breakdowns:

- Subscribe to the [RSS Feed](/rss.xml) for new engineering guides.
- Connect on [LinkedIn](https://linkedin.com/in/sahillangoo) or follow on [Twitter/X](https://x.com/kashurgeek).
