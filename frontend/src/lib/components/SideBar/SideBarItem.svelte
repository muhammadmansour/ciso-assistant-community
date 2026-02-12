<script lang="ts">
	import { page } from '$app/state';
	import { safeTranslate } from '$lib/utils/i18n';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';

	interface Props {
		item?: { name: string; href: string; fa_icon: string }[];
		sideBarVisibleItems: Record<string, boolean>;
	}

	let { item = [], sideBarVisibleItems }: Props = $props();

	let classesActive = $derived((href: string) =>
		href === page.url.pathname
			? 'bg-[#1a2740] text-white font-medium'
			: 'text-white/70 hover:bg-[#1a2740] hover:text-white'
	);
</script>

{#each item as item}
	<!-- undefined and true must be shown -->
	{#if sideBarVisibleItems[item.name] !== false}
		<Anchor
			href={item.href}
			breadcrumbAction="replace"
			class="unstyled flex whitespace-nowrap items-center py-2 text-sm rounded-lg transition-all duration-150 {classesActive(
				item.href ?? ''
			)}"
			data-testid={'accordion-item-' + item.href.substring(1)}
		>
			<span
				class="px-3 flex items-center w-full gap-3 text-xs"
				id={item.name}
				title={safeTranslate(item.name)}
			>
				<i class="{item.fa_icon} w-4 text-center text-[13px] opacity-80"></i>
				<span class="text-[13px] tracking-wide truncate">{safeTranslate(item.name)}</span>
			</span>
		</Anchor>
	{/if}
{/each}
