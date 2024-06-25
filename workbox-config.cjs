module.exports = {
	globDirectory: '.svelte-kit/output/client',
	globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg,gif,woff2,woff,eot,ttf}'],
	swDest: 'build/service-worker.js',
	runtimeCaching: [
		{
			urlPattern: new RegExp('^https://sveltekit-pwa-livid.vercel.app/(.*)'),
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
