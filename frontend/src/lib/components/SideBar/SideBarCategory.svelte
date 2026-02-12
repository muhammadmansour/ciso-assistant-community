<script lang="ts">
	import { safeTranslate } from '$lib/utils/i18n';
	interface Props {
		item: any;
	}

	let { item }: Props = $props();
</script>

<span
	class="whitespace-nowrap text-white/50 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-2"
	data-testid={'accordion-item-' + item.name.toLowerCase().replace(' ', '-')}
>
	<i class="fa-solid fa-grip-vertical text-[8px] opacity-50"></i>
	{safeTranslate(item.name)}
</span>
