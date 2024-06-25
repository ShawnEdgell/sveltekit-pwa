module.exports = {
	globDirectory: '.svelte-kit/output/client',
	globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg,gif,woff2,woff,eot,ttf}'],
	swDest: '.svelte-kit/output/client/service-worker.js',
	runtimeCaching: [
		{
			urlPattern: new RegExp('^https://your-api-url.com/(.*)'),
			handler: 'NetworkFirst',
			options: {
				cacheName: 'api-cache',
				expiration: {
					maxEntries: 10
				}
			}
		}
	]
};
