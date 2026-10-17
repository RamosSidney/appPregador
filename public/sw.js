// Service Worker for appPregador 2.0 PWA — Network-First for App Code, Cache-First for NVI Bible

const CACHE_NAME = 'app-pregador-v2-cache-v3';
const BIBLE_ASSETS = [
  '/nvi.json',
  '/manifest.json',
  '/favicon.svg'
];

// 1. Install Event: Pre-cache heavy static data (NVI Bible) and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(BIBLE_ASSETS).catch(() => {});
    })
  );
});

// 2. Activate Event: Purge ALL older caches so Vercel deployments never serve stale JS hashes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept non-GET requests or external API calls (Groq, OpenAI, Supabase, Clarity)
  if (
    event.request.method !== 'GET' ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  // Cache-First ONLY for the 4MB NVI Bible JSON file
  if (url.pathname.endsWith('/nvi.json')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Network-First for HTML, JS, and CSS (ensures new Vercel deploys load immediately without 404s)
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
        });
      })
  );
});
