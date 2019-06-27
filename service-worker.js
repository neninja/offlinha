// https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
let cacheName = 'offlinha-v.1.0.0';
let filesToCache = [
	'./',
	'index.html',
	'index.css',
	'index.js',
	'store.js'
];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Installer');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function (e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
});

// Network first
self.addEventListener('fetch', function(e) {
console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    fetch(e.request).catch(function() {
        console.log('[ServiceWorker] Fetch offline', e.request.url);
      return caches.match(e.request);
    })
  );
});

// Cache first
// self.addEventListener('fetch', function (e) {
// console.log('[ServiceWorker] Fetch', e.request.url);
// e.respondWith(
// // caches.match(e.request).then(function(response) {
// // return response || fetch(e.request);
// // })
// });
