<script context="module" lang="ts">
	import { browser } from '$app/environment';
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser && 'serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js').then(
				(registration) => {
					console.log('ServiceWorker registration successful with scope: ', registration.scope);
				},
				(err) => {
					console.log('ServiceWorker registration failed: ', err);
				}
			);
		}
	});
</script>

<slot />
