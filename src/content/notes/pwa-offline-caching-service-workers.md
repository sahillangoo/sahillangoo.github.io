---
title: 'Zero-Config Offline PWA Caching Patterns for Static Sites'
description: 'How to combine Stale-While-Revalidate service workers with Astro static site generation for sub-10ms offline page loads.'
publishDate: '2026-08-16'
topic: 'PWA & Edge'
tags:
  - pwa
  - service-worker
  - offline
  - web-perf
order: 3
---

Static websites are naturally offline-friendly, but standard browsers still fail to load cached pages when a mobile network drops. Adding a lightweight service worker enables instant offline reading for documentation, blogs, and portfolio profiles.

### Stale-While-Revalidate Strategy

For HTML documents and static assets, **Stale-While-Revalidate** serves cached content immediately from Cache Storage while fetching fresh updates in the background:

```javascript
// public/sw.js
const CACHE_NAME = 'sahillangoo-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/projects/',
  '/blog/',
  '/notes/',
  '/resume/',
  '/colophon/',
  '/favicon.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request);
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkFetch;
    })
  );
});
```

### Registration in Astro

```html
<script is:inline>
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
</script>
```
