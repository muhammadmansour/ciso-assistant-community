<script lang="ts">
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { tick } from 'svelte';

	// Page-level reveal gate.
	//
	// Problem: SvelteKit's client-side navigation renders the new page as soon
	// as its data load resolves. Text appears first, then images pop in one
	// by one as the browser decodes them — a small FOUC that makes the app
	// feel jittery on slower networks. On initial hydration the same FOUC can
	// happen as fonts swap and any below-the-fold images stream in.
	//
	// Strategy: ONLY gate client-side route changes. Initial paint (SSR +
	// hydration) is never gated, so:
	//   - Crawlers / no-JS clients see content immediately.
	//   - Hard refreshes show whatever the browser has already painted from
	//     SSR HTML; we do not snap an overlay on top of it.
	// During an SPA navigation:
	//   - $navigating non-null → re-gate immediately so the old content
	//     disappears behind the overlay and the new route mounts hidden
	//     underneath.
	//   - $navigating clears → wait one rAF for the new DOM to commit, then
	//     await fonts + every <img> in the new tree, then lift the overlay
	//     so the new page appears all at once.
	//
	// Content always remains in the DOM (just opacity:0 while gated) so the
	// browser actually kicks off image decoding — display:none would defer
	// it and the gate would never lift.
	//
	// Hard 2s cap on the wait so a broken image (network error, 404, CSP
	// block) can never strand the user behind a blank screen.

	interface Props {
		children?: import('svelte').Snippet;
		/** Optional fallback inside the overlay (defaults to a centered spinner). */
		overlay?: import('svelte').Snippet;
	}

	let { children, overlay }: Props = $props();

	// Server + initial hydration: false. SSR markup paints immediately.
	let gated = $state(false);
	let containerEl: HTMLDivElement | undefined = $state();

	let waitToken = 0;
	let hardTimeout: ReturnType<typeof setTimeout> | undefined;
	let lastNavKey: string | undefined;

	const HARD_TIMEOUT_MS = 2000;

	function clearHardTimeout() {
		if (hardTimeout) {
			clearTimeout(hardTimeout);
			hardTimeout = undefined;
		}
	}

	function pendingImages(): HTMLImageElement[] {
		if (!containerEl) return [];
		return Array.from(containerEl.querySelectorAll('img')).filter(
			(img) => !(img.complete && img.naturalWidth > 0)
		);
	}

	async function waitForContentReady() {
		if (!browser || !containerEl) return;
		const myToken = ++waitToken;

		// Let the new route's DOM commit so <img> tags actually exist.
		await tick();
		await new Promise<void>((r) => requestAnimationFrame(() => r()));
		if (myToken !== waitToken) return; // superseded by a newer wait

		const fontsReady = document.fonts?.ready ?? Promise.resolve();
		const imgPromises = pendingImages().map(
			(img) =>
				new Promise<void>((resolve) => {
					const done = () => resolve();
					img.addEventListener('load', done, { once: true });
					img.addEventListener('error', done, { once: true });
				})
		);

		const allReady = Promise.all([fontsReady, ...imgPromises]).then(() => undefined);
		const cap = new Promise<void>((resolve) => {
			hardTimeout = setTimeout(resolve, HARD_TIMEOUT_MS);
		});

		await Promise.race([allReady, cap]);
		clearHardTimeout();
		if (myToken !== waitToken) return;
		gated = false;
	}

	$effect(() => {
		if (!browser) return;
		const nav = $navigating;
		const navKey = nav ? `${nav.from?.url.pathname ?? ''}->${nav.to?.url.pathname ?? ''}` : '';
		if (nav) {
			// New nav started — re-gate immediately so the old/new content
			// transition is hidden behind the overlay.
			clearHardTimeout();
			waitToken++; // cancel any in-flight readiness wait
			gated = true;
			lastNavKey = navKey;
		} else if (gated && lastNavKey) {
			// Nav completed and we were gated for a navigation — wait for the
			// freshly-mounted content to be visually ready before lifting.
			lastNavKey = undefined;
			waitForContentReady();
		}
	});
</script>

<div class="page-ready-wrapper relative" bind:this={containerEl}>
	<!-- Children always render so images load; visibility flipped via opacity. -->
	<div
		class="page-ready-content transition-opacity duration-200 ease-out"
		class:opacity-0={gated}
	>
		{@render children?.()}
	</div>

	{#if gated}
		<div
			class="page-ready-overlay absolute inset-0 z-40 flex items-center justify-center bg-[#F9FAFB]/80 backdrop-blur-[1px] pointer-events-none"
			role="status"
			aria-live="polite"
		>
			{#if overlay}
				{@render overlay()}
			{:else}
				<i class="fa-solid fa-circle-notch fa-spin text-2xl text-blue-500/70"></i>
			{/if}
		</div>
	{/if}
</div>
