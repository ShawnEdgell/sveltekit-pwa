/// <reference lib="webworker" />

const CACHE_NAME = 'cache-v1';
const ASSETS = [
	'/',
	'/favicon.png',
	'/manifest.json',
	'/icons/icon-192x192.svg',
	'/icons/icon-512x512.svg'
	// Add other assets you want to cache
];

self.addEventListener('install', (event: Event) => {
	const installEvent = event as ExtendableEvent;
	installEvent.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS).catch((err) => {
				console.error('Failed to cache', err);
			});
		})
	);
});

self.addEventListener('activate', (event: Event) => {
	const activateEvent = event as ExtendableEvent;
	activateEvent.waitUntil(
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

self.addEventListener('fetch', (event: Event) => {
	const fetchEvent = event as FetchEvent;
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((response) => {
			return (
				response ||
				fetch(fetchEvent.request).then((fetchResponse) => {
					return caches.open(CACHE_NAME).then((cache) => {
						cache.put(fetchEvent.request, fetchResponse.clone());
						return fetchResponse;
					});
				})
			);
		})
	);
});
