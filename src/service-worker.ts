/// <reference lib="webworker" />

const CACHE_NAME = 'cache-v1';
const ASSETS = [
	'/',
	'/index.html',
	'/main.js'
	// Add other assets to cache
];

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				return response;
			}
			return fetch(event.request).then((fetchResponse) => {
				return caches.open(CACHE_NAME).then((cache) => {
					cache.put(event.request, fetchResponse.clone());
					return fetchResponse;
				});
			});
		})
	);
});
