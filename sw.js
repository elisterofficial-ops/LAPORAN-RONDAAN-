/* Simpan fail aplikasi supaya boleh dibuka tanpa internet */
const CACHE = 'rondaan-v1';
const FILES = [
  './', 'index.html', 'styles.css', 'data.js', 'bylaws.js', 'db.js', 'word.js', 'ai.js', 'app.js',
  'manifest.webmanifest', 'logo-mds.jpg', 'icon-192.png', 'icon-512.png', 'maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Panggilan AI sentiasa terus ke internet
  if (url.hostname.includes('generativelanguage.googleapis.com')) return;
  // Fon Google: simpan selepas kali pertama
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      try { const res = await fetch(e.request); c.put(e.request, res.clone()); return res; } catch (err) { return hit || Response.error(); }
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  // Fail aplikasi: cuba internet dahulu (dapat versi terbaru), jika gagal guna simpanan
  e.respondWith(fetch(e.request).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy));
    return res;
  }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
