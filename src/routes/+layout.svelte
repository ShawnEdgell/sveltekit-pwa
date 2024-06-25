<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import '../app.css';

	let deferredPrompt: any;
	let showInstallButton = writable(false);
	let isInstalled = writable(false);

	onMount(() => {
		if (browser) {
			// Check if the app is already installed
			window.addEventListener('appinstalled', () => {
				isInstalled.set(true);
				showInstallButton.set(false);
			});

			// Check for the beforeinstallprompt event
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault();
				deferredPrompt = e;
				showInstallButton.set(true);
			});

			// Check if the app is already installed (especially for iOS)
			if (window.matchMedia('(display-mode: standalone)').matches) {
				isInstalled.set(true);
				showInstallButton.set(false);
			}
		}
	});

	const installApp = async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				console.log('User accepted the install prompt');
				showInstallButton.set(false);
				isInstalled.set(true);
			} else {
				console.log('User dismissed the install prompt');
			}
			deferredPrompt = null;
		}
	};
</script>

<div
	class="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4"
>
	{#if $showInstallButton && !$isInstalled}
		<button
			class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
			on:click={installApp}
		>
			Install App
		</button>
	{/if}
	<slot />
</div>
