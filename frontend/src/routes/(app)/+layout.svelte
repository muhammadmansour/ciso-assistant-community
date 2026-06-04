<script lang="ts">
	import { run } from 'svelte/legacy';

	// Most of your app wide CSS should be put in this file
	import '../../app.css';

	import { safeTranslate } from '$lib/utils/i18n';

	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs/Breadcrumbs.svelte';
	import { pageTitle, modelName, modelDescription, clientSideToast } from '$lib/utils/stores';
	import { getCookie, deleteCookie } from '$lib/utils/cookies';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { m } from '$paraglide/messages';

	import type { PageData, ActionData } from './$types';
	import QuickStartModal from '$lib/components/SideBar/QuickStart/QuickStartModal.svelte';

	import { getSidebarVisibleItems } from '$lib/utils/sidebar-config';
	import {
		getModalStore,
		type ModalComponent,
		type ModalSettings,
		type ModalStore
	} from '$lib/components/Modals/stores';

	import CommandPalette from '$lib/components/CommandPalette/CommandPalette.svelte';
	import FloatingPolicyWidget from '$lib/components/FloatingPolicyWidget/FloatingPolicyWidget.svelte';
	import PageReady from '$lib/components/LoadingIndicator/PageReady.svelte';
	import {
		interceptExternalLinks,
		setGlobalModalStore,
		setShowWarningExternalLinks
	} from '$lib/utils/external-links';

	let sidebarOpen = $state(true);

	let classesSidebarOpen = $derived((open: boolean) => (open ? 'ltr:ml-64 rtl:mr-64' : 'ltr:ml-7 rtl:mr-7'));

	interface Props {
		data: PageData;
		form: ActionData;
		sideBarVisibleItems?: any;
		children?: import('svelte').Snippet;
	}

	let {
		data,
		form,
		sideBarVisibleItems = getSidebarVisibleItems(data?.featureflags),
		children
	}: Props = $props();

	const modalStore: ModalStore = getModalStore();

	// Display title, model name, and description from either page data or manual store setting
	const displayTitle = $derived($page.data?.title || $pageTitle);

	// Auto-detect model from URL for list pages
	const urlModel = $derived(() => {
		const path = $page.url.pathname;
		const match = path.match(/^\/([a-z-]+)\/?$/);
		return match ? match[1] : null;
	});

	// Generate description key from URL model
	const urlDescriptionKey = $derived(() => {
		const model = urlModel();
		if (!model) return null;
		const camelCase = model
			.split('-')
			.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
			.join('');
		return `${camelCase}Description`;
	});

	const matchesListUrl = $derived(!!urlModel());
	const hasObjectTitle = $derived(!!$page.data?.title);

	const displayModelName = $derived(
		hasObjectTitle ? $page.data?.modelVerboseName || $modelName : ''
	);

	const displayModelDescription = $derived(
		(() => {
			if (hasObjectTitle) return '';
			if (!matchesListUrl && !$page.data?.modelDescriptionKey) return '';
			const descKey = $page.data?.modelDescriptionKey || urlDescriptionKey();
			if (descKey && m[descKey]) {
				return m[descKey]();
			}
			return $modelDescription;
		})()
	);

	// Initialize external link interceptor
	$effect(() => {
		if (browser) {
			setGlobalModalStore(modalStore);
			const showWarning = data?.settings?.show_warning_external_links ?? true;
			setShowWarningExternalLinks(showWarning);
			interceptExternalLinks();
		}
	});

	// Handle login-specific logic
	run(() => {
		if (browser) {
			const fromLogin = getCookie('from_login');
			if (fromLogin === 'true') {
				deleteCookie('from_login');
				fetch('/fe-api/waiting-risk-acceptances').then(async (res) => {
					const data = await res.json();
					const number = data.count ?? 0;
					if (number <= 0) return;
				});
			}
		}
	});

	function modalQuickStart(): void {
		let modalComponent: ModalComponent = {
			ref: QuickStartModal,
			props: {}
		};
		let modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			title: m.quickStart()
		};
		modalStore.trigger(modal);
	}

	let searchQuery = $state('');

	function handleGlobalSearch() {
		const q = searchQuery.trim();
		if (q && browser) {
			window.location.href = `/search?q=${encodeURIComponent(q)}`;
		}
	}

	function handleSearchKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			handleGlobalSearch();
		}
	}
</script>

<!-- App Shell -->
<div class="overflow-x-hidden min-h-screen bg-[#F9FAFB]">
	<SideBar bind:open={sidebarOpen} {sideBarVisibleItems} />
	
	<!-- Top Header Bar -->
	<header
		class="sticky top-0 z-10 bg-white shadow-sm transition-all duration-300 {classesSidebarOpen(sidebarOpen)}"
	>
		<div class="flex items-center justify-between px-6 py-3">
			<!-- Search Bar -->
			<div class="relative flex-1 max-w-xl">
				<i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
				<input
					type="text"
					placeholder="Search..."
					bind:value={searchQuery}
					onkeydown={handleSearchKeydown}
					class="w-full pl-10 pr-4 py-2 bg-[#f4f6f9] border-0 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"
				/>
			</div>

			<!-- Right Side Actions -->
			<div class="flex items-center gap-3 ml-4">
				{#if data?.user?.is_admin}
					<button
						onclick={modalQuickStart}
						class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white text-sm font-medium rounded-lg shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200"
					>
						<i class="fa-solid fa-play text-xs"></i>
						Start Audit
					</button>
				{/if}

				<!-- Powered by Wathbah -->
				<a
					href="https://wathbahs.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors ml-2"
				>
					<span class="text-xs">Powered by</span>
					<img src="/wathbah.svg" alt="Wathbah" class="h-6" />
				</a>
			</div>
		</div>
	</header>

	<!-- Breadcrumbs + Page Title -->
	<div class="transition-all duration-300 {classesSidebarOpen(sidebarOpen)} px-6 pt-4">
		<Breadcrumbs />
		<div class="mt-2 mb-4">
			<h1 class="text-2xl font-bold text-gray-900" id="page-title">
				{safeTranslate(displayTitle)}
			</h1>
			{#if displayModelName}
				<p class="text-sm text-gray-500 mt-0.5">
					{safeTranslate(displayModelName)}
				</p>
			{/if}
			{#if displayModelDescription}
				<p class="text-xs text-gray-400 mt-0.5 italic">
					{safeTranslate(displayModelDescription)}
				</p>
			{/if}
		</div>
	</div>

	<!-- Router Slot -->
	<CommandPalette />
	<main
		class="px-6 pb-8 transition-all duration-300 {classesSidebarOpen(sidebarOpen)}"
	>
		<PageReady>
			{@render children?.()}
		</PageReady>
	</main>

	<!-- Floating Policy Chat Widget -->
	<FloatingPolicyWidget />
</div>
