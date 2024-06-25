module.exports = {
	globDirectory: '.svelte-kit/output/client',
	globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg,gif,woff2,woff,eot,ttf}'],
	swDest: '.svelte-kit/output/client/service-worker.js',
	runtimeCaching: [
		{
			// Update this URL pattern to match your actual API or your site's URL
			urlPattern: new RegExp('^https://sveltekit-pwa-livid.vercel.app/(.*)'),
			handler: 'NetworkFirst',
			options: {
				cacheName: 'api-cache',
				expiration: {
					maxEntries: 10
				}
			}
		},
		{
			// Cache other requests, such as static assets
			urlPattern: ({ request }) =>
				request.destination === 'image' ||
				request.destination === 'style' ||
				request.destination === 'script',
			handler: 'CacheFirst',
			options: {
				cacheName: 'asset-cache',
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
				}
			}
		}
	]
};
