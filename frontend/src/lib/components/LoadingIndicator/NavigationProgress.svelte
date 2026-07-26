<script lang="ts">
	import { navigating } from '$app/stores';
	import { onDestroy } from 'svelte';

	// Global thin progress bar pinned to the very top of the viewport.
	// Subscribes to SvelteKit's $navigating store: starts when a navigation
	// begins (link click, programmatic goto, form submit + redirect, etc.) and
	// completes when the destination route finishes loading data.
	//
	// Behaviour:
	//   - On navigation start: bar fades in at ~10% and eases asymptotically
	//     toward 90% so the user always sees motion, even on long loads.
	//   - On navigation end: bar fills to 100%, stays briefly, then fades out
	//     and resets. The brief pause prevents flicker on instant transitions.
	//   - Self-cancelling: a new navigation started while still completing the
	//     previous one cleans up the pending hide timer and restarts.

	let visible = $state(false);
	let progress = $state(0);
	let fading = $state(false);

	let advanceTimer: ReturnType<typeof setInterval> | null = null;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	function clearTimers() {
		if (advanceTimer) {
			clearInterval(advanceTimer);
			advanceTimer = null;
		}
		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}
	}

	$effect(() => {
		const isNavigating = !!$navigating;
		if (isNavigating) {
			clearTimers();
			fading = false;
			visible = true;
			progress = 10;
			advanceTimer = setInterval(() => {
				// Asymptotic ease toward 90% — never reach 100 until nav completes.
				progress = Math.min(progress + (90 - progress) * 0.12, 90);
			}, 180);
		} else if (visible) {
			clearTimers();
			progress = 100;
			fading = true;
			hideTimer = setTimeout(() => {
				visible = false;
				fading = false;
				progress = 0;
			}, 320);
		}
	});

	onDestroy(clearTimers);
</script>

{#if visible}
	<div
		class="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none transition-opacity duration-300"
		class:opacity-0={fading}
		class:opacity-100={!fading}
		aria-hidden="true"
	>
		<div
			class="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 shadow-sm transition-[width] duration-200 ease-out"
			style="width: {progress}%"
		></div>
	</div>
{/if}
