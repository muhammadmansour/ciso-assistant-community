<script lang="ts">
	import logo from '$lib/assets/muhkam-lockup-horizontal.svg';

	interface Props {
		height?: number;
		width?: number;
		showLabel?: boolean;
	}

	let { height = 80, width = 240, showLabel = false }: Props = $props();
</script>

<div class="flex flex-col items-center">
	<img class="c" {height} {width} src={logo} alt="Muhkam" data-testid="logo-image" />
	{#if showLabel}
		<span class="text-lg font-semibold text-gray-700 mt-1 font-cairo">Muhkam</span>
	{/if}
</div>
