<script lang="ts">
	import ciso from '$lib/assets/ciso.svg';

	interface Props {
		height?: number;
		width?: number;
	}

	let { height = 280, width = 350 }: Props = $props();
</script>

<img class="c" {height} {width} src={ciso} alt="Wathbah GRC" data-testid="logo-image" />
