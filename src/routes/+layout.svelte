<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import '../app.css';

	let deferredPrompt: any;
	let showInstallButton = writable(false);

	onMount(() => {
		if (browser) {
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault();
				deferredPrompt = e;
				showInstallButton.set(true);
			});
		}
	});

	const installApp = async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				console.log('User accepted the install prompt');
			} else {
				console.log('User dismissed the install prompt');
			}
			deferredPrompt = null;
			showInstallButton.set(false);
		}
	};
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
	{#if $showInstallButton}
		<button
			class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
			on:click={installApp}
			aria-label="Install App"
		>
			Install App
		</button>
	{/if}
	<slot />
</div>
