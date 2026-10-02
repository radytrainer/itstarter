/*
 * IT Starter 2028 — service worker (hand-written; see docs/PWA.md).
 *
 * What it does:
 *   • Static files (/_next/static, /icons, the manifest) → cache first. Their names change with every
 *     build, so a cached copy is never stale. Pages load fast on slow mobile data.
 *   • Pages (navigation) → always from the network. If there is no Internet: the saved /offline page.
 *   • /api/* and anything that is not GET → never touched, never cached.
 *
 * What it never does: store pages or API answers. Pages contain a student's name and progress,
 * and school computers are shared — nothing personal is kept on the device.
 */
const VERSION = 'v1';
const STATIC_CACHE = `itstarter-static-${VERSION}`;
const OFFLINE_CACHE = `itstarter-offline-${VERSION}`;
const OFFLINE_URL = '/offline';
const PRECACHE = [
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];
const MAX_STATIC_ENTRIES = 300;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const offline = await caches.open(OFFLINE_CACHE);
      await offline.addAll(PRECACHE.map((url) => new Request(url, { cache: 'reload' })));
      // The offline page needs its own CSS and scripts: save the ones it links to.
      const response = await offline.match(OFFLINE_URL);
      const html = response ? await response.text() : '';
      const assets = [...new Set(html.match(/\/_next\/static\/[^"'\s)]+/g) ?? [])];
      const statics = await caches.open(STATIC_CACHE);
      await Promise.all(assets.map((url) => statics.add(url).catch(() => undefined)));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = [STATIC_CACHE, OFFLINE_CACHE];
      for (const name of await caches.keys()) {
        if (name.startsWith('itstarter-') && !keep.includes(name)) await caches.delete(name);
      }
      await self.clients.claim();
    })(),
  );
});

function isStatic(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.webmanifest'
  );
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok && response.type === 'basic') {
    await cache.put(request, response.clone());
    trim(cache);
  }
  return response;
}

/** Keeps the static cache small on phones with little storage (oldest entries go first). */
async function trim(cache) {
  const keys = await cache.keys();
  for (const key of keys.slice(0, Math.max(0, keys.length - MAX_STATIC_ENTRIES))) {
    await cache.delete(key);
  }
}

async function networkOrOffline(request) {
  try {
    return await fetch(request);
  } catch {
    const offline = await caches.match(OFFLINE_URL);
    return offline ?? Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return; // always live, never cached

  if (request.mode === 'navigate') {
    event.respondWith(networkOrOffline(request));
  } else if (isStatic(url)) {
    event.respondWith(cacheFirst(request));
  }
  // Everything else: the browser's normal network handling.
});
