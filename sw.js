/* MANPAGES.EXE — sw.js
   Stratégie : network-first pour les fichiers du site (toujours à jour),
   cache-first uniquement pour les assets externes (CDN, fonts).
   Plus besoin de changer la version manuellement à chaque déploiement. */

const CACHE_SITE    = 'manpages-site-v1';   // fichiers locaux — network-first
const CACHE_EXTERN  = 'manpages-extern-v1'; // CDN/fonts — cache-first

const CORE_ASSETS = [
  './',
  './index.html',
  './commands.html',
  './packages.html',
  './quiz.html',
  './cheatsheet.html',
  './scenarios.html',
  './style.css',
  './commands.css',
  './data.js',
  './data-extra.js',
  './commands.js',
  './quiz.js',
  './arcade-fun.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favicon-32.png',
  './icons/apple-touch-icon.png',
];

const EXTERNAL_ASSETS = [
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/debian.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/alpinelinux.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/archlinux.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/redhat.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/freebsd.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/apple.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/docker.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/ansible.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/git.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/kubernetes.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/terraform.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/vagrant.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/wireshark.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/helm.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/proxmox.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mysql.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nginx.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openssl.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tmux.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/vim.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/npm.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/python.svg',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=VT323&family=Honk&family=Noto+Sans+JP:wght@500;700&family=Inter:wght@400;500;600&display=swap',
];

// ── INSTALL ─────────────────────────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.all([
      // Pré-cache les assets externes (CDN) en best-effort
      caches.open(CACHE_EXTERN).then(function(cache) {
        return Promise.all(
          EXTERNAL_ASSETS.map(function(url) {
            return cache.add(url).catch(function() {});
          })
        );
      }),
      // Pré-cache les fichiers locaux
      caches.open(CACHE_SITE).then(function(cache) {
        return cache.addAll(CORE_ASSETS);
      })
    ]).then(function() {
      return self.skipWaiting(); // prend le contrôle immédiatement
    })
  );
});

// ── ACTIVATE : nettoie les ANCIENS caches ───────────────────────
self.addEventListener('activate', function(event) {
  var keep = [CACHE_SITE, CACHE_EXTERN];
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return keep.indexOf(k) === -1; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ── FETCH ───────────────────────────────────────────────────────
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  var url = event.request.url;
  var isExternal = EXTERNAL_ASSETS.some(function(a) { return url.indexOf(a) !== -1; })
                || url.indexOf('fonts.g') !== -1
                || url.indexOf('jsdelivr') !== -1;

  if (isExternal) {
    // Assets externes : cache-first (ils ne changent pas)
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        return cached || fetch(event.request).then(function(response) {
          if (response && response.status === 200) {
            var clone = response.clone();
            caches.open(CACHE_EXTERN).then(function(c) { c.put(event.request, clone); });
          }
          return response;
        });
      })
    );
  } else {
    // Fichiers du site : NETWORK-FIRST — toujours récupère le frais,
    // retombe sur le cache seulement si hors-ligne.
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_SITE).then(function(c) { c.put(event.request, clone); });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(cached) {
          return cached || (event.request.mode === 'navigate'
            ? caches.match('./index.html')
            : undefined);
        });
      })
    );
  }
});
