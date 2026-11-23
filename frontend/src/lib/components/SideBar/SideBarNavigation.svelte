<script lang="ts">
	import { navData } from '$lib/components/SideBar/navData';

	import SideBarItem from '$lib/components/SideBar/SideBarItem.svelte';
	import SideBarCategory from '$lib/components/SideBar/SideBarCategory.svelte';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { page } from '$app/state';
	import { canSeeNavItem } from '$lib/components/SideBar/navVisibility';
	import { driverInstance } from '$lib/utils/stores';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import { safeTranslate } from '$lib/utils/i18n';

	const user = page.data.user;

	const items = navData.items
		.map((item) => ({
			...item,
			items: item.items.filter((subItem) => canSeeNavItem(subItem, user))
		}))
		.filter((item) => item.items.length > 0);

	import { lastAccordionItem } from '$lib/utils/stores';

	// Ensure governance, risk and metrology are always expanded (persisted store may have old value without them)
	if (!$lastAccordionItem.includes('governance')) {
		$lastAccordionItem = [...$lastAccordionItem, 'governance'];
	}
	if (!$lastAccordionItem.includes('risk')) {
		$lastAccordionItem = [...$lastAccordionItem, 'risk'];
	}
	if (!$lastAccordionItem.includes('automation')) {
		$lastAccordionItem = [...$lastAccordionItem, 'automation'];
	}
	if (!$lastAccordionItem.includes('metrology')) {
		$lastAccordionItem = [...$lastAccordionItem, 'metrology'];
	}
	if (!$lastAccordionItem.includes('thirdPartyCategory')) {
		$lastAccordionItem = [...$lastAccordionItem, 'thirdPartyCategory'];
	}
	if (!$lastAccordionItem.includes('projectManagement')) {
		$lastAccordionItem = [...$lastAccordionItem, 'projectManagement'];
	}
	if (!$lastAccordionItem.includes('operations')) {
		$lastAccordionItem = [...$lastAccordionItem, 'operations'];
	}
	if (!$lastAccordionItem.includes('overview')) {
		$lastAccordionItem = [...$lastAccordionItem, 'overview'];
	}

	interface Props {
		sideBarVisibleItems: Record<string, boolean>;
	}

	let { sideBarVisibleItems }: Props = $props();

	function lastAccordionItemOpened(value: string) {
		lastAccordionItem.set(value);
	}

	function handleNavClick(item: any) {
		lastAccordionItemOpened(item.name);
		setTimeout(() => {
			$driverInstance?.moveNext();
		}, 0);
	}
</script>

<nav class="grow scrollbar mt-2">
	<!-- Standalone Home link -->
	<Anchor
		href="/recap"
		breadcrumbAction="replace"
		class="unstyled flex items-center gap-3 px-4 py-2.5 mb-2 rounded-lg transition-all duration-150 {page.url.pathname === '/recap' ? 'bg-[#0077CC] text-white font-medium' : 'text-white/70 hover:bg-[#0077CC]/80 hover:text-white'}"
		data-testid="sidebar-home"
	>
		<i class="fa-solid fa-house w-4 text-center text-[13px] opacity-80"></i>
		<span class="text-[13px] tracking-wide">{safeTranslate('home')}</span>
	</Anchor>

	<Accordion
		spaceY="space-y-2"
		regionPanel="space-y-0.5"
		caretClosed="-rotate-90"
		caretOpen=""
		value={$lastAccordionItem}
		onValueChange={(e) => ($lastAccordionItem = e.value)}
		multiple
		collapsible
	>
		{#snippet iconOpen()}
			<svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 448 512" class="fill-white/50">
				<path
					d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
				/>
			</svg>
		{/snippet}
		{#snippet iconClosed()}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="-rotate-90 fill-white/50"
				width="12px"
				height="12px"
				viewBox="0 0 448 512"
			>
				<path
					d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
				/>
			</svg>
		{/snippet}
		{#each items as item}
			{#if sideBarVisibleItems && sideBarVisibleItems[item.name] !== false}
				<Accordion.Item
					id={item.name.toLowerCase().replace(' ', '-')}
					onClick={() => handleNavClick(item)}
					value={item.name}
					controlHover="hover:bg-white/8"
					controlPadding="py-2 px-2"
					controlRounded="rounded-lg"
					panelPadding="py-0 px-0"
				>
					{#snippet control()}
						<SideBarCategory {item} />
					{/snippet}
					{#snippet panel()}
						<SideBarItem item={item.items} {sideBarVisibleItems} />
					{/snippet}
				</Accordion.Item>
			{/if}
		{/each}
	</Accordion>
</nav>
