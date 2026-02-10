<script lang="ts">
	import logo from '$lib/assets/wathba_logo.svg';

	interface Props {
		height?: number;
		width?: number;
	}

	let { height = 120, width = 280 }: Props = $props();
</script>

<div class="flex flex-col items-center">
	<img class="c" {height} {width} src={logo} alt="Wathbah AI Solutions" data-testid="logo-image" />
	<span class="text-lg font-semibold text-gray-700 mt-1 font-cairo">Wathbah GRC</span>
</div>
