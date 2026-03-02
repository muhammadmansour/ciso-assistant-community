<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const sidebarItems = [
		{
			category: 'AI MANAGEMENT',
			icon: 'fa-solid fa-brain',
			items: [
				{ label: 'Audit Sessions', href: '/admin', icon: 'fa-regular fa-comment-dots' },
				{ label: 'Audit Studio', href: '/admin/audit-studio', icon: 'fa-solid fa-terminal' }
			]
		},
		{
			category: 'AI TOOLS',
			icon: 'fa-solid fa-gear',
			items: [
				{ label: 'Controls Studio', href: '/admin/controls-studio', icon: 'fa-solid fa-shield-halved' },
				{ label: 'Merge Optimizer', href: '/admin/merge-optimizer', icon: 'fa-solid fa-code-merge' },
				{ label: 'Org Contexts', href: '/admin/org-contexts', icon: 'fa-solid fa-building' }
			]
		},
		{
			category: 'CONFIGURATION',
			icon: 'fa-solid fa-sliders',
			items: [
				{ label: 'Prompts', href: '/admin/prompts', icon: 'fa-solid fa-wand-magic-sparkles' },
				{ label: 'File Collections', href: '/admin/file-collections', icon: 'fa-solid fa-folder-open' }
			]
		}
	];

	let sidebarOpen: Record<string, boolean> = $state({
		'AI MANAGEMENT': true,
		'AI TOOLS': true,
		'CONFIGURATION': true
	});

	function toggleCategory(cat: string) {
		sidebarOpen[cat] = !sidebarOpen[cat];
	}

	function isActive(href: string): boolean {
		return page.url.pathname === href;
	}
</script>

<div class="flex h-screen bg-gray-50">
	<!-- Admin Sidebar -->
	<aside class="w-56 bg-[#0A1628] flex flex-col flex-shrink-0">
		<!-- Logo -->
		<div class="px-4 py-5">
			<div class="flex items-center gap-2.5">
				<div class="w-8 h-8 bg-[#0077CC] rounded-lg flex items-center justify-center font-bold text-white text-sm">
					W
				</div>
				<div>
					<div class="text-white font-bold text-sm tracking-tight">WathbaGRC</div>
					<div class="text-[#0077CC] text-[10px] font-semibold uppercase tracking-widest">Admin</div>
				</div>
			</div>
		</div>

		<!-- Dashboard Link -->
		<div class="px-3 mb-2">
			<a
				href="/admin"
				class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all {isActive('/admin')
					? 'bg-[#0077CC] text-white'
					: 'text-white/60 hover:bg-white/5 hover:text-white'}"
			>
				<i class="fa-solid fa-table-columns text-xs w-4 text-center"></i>
				Dashboard
			</a>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 overflow-y-auto px-3 space-y-4">
			{#each sidebarItems as group}
				<div>
					<button
						onclick={() => toggleCategory(group.category)}
						class="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors"
					>
						<div class="flex items-center gap-2">
							<i class="{group.icon} text-[9px]"></i>
							{group.category}
						</div>
						<i class="fa-solid fa-chevron-down text-[8px] transition-transform {sidebarOpen[group.category] ? '' : '-rotate-90'}"></i>
					</button>
					{#if sidebarOpen[group.category]}
						<div class="mt-1 space-y-0.5">
							{#each group.items as item}
								<a
									href={item.href}
									class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all {isActive(item.href)
										? 'bg-[#0077CC] text-white font-medium'
										: 'text-white/60 hover:bg-white/5 hover:text-white'}"
								>
									<i class="{item.icon} text-xs w-4 text-center"></i>
									{item.label}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</nav>

		<!-- Back to WathbahGRC -->
		<div class="px-3 py-4 border-t border-white/10">
			<a
				href="/recap"
				class="flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-sm transition-colors"
			>
				<i class="fa-solid fa-arrow-left text-xs"></i>
				Back to WathbahGRC
			</a>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="flex-1 flex flex-col overflow-hidden">
		<!-- Top Bar -->
		<header class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
			<div class="flex items-center gap-4">
				<div class="flex items-center gap-2 text-sm font-medium text-gray-700">
					<i class="fa-solid fa-gear text-gray-400"></i>
					WathbahGRC Admin
				</div>
				<div class="relative">
					<i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
					<input
						type="text"
						placeholder="Search admin..."
						class="pl-8 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] w-56"
					/>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-gray-400 text-xs">Powered by</span>
				<a href="https://wathbahs.com" target="_blank" rel="noopener noreferrer">
					<img src="/wathba_logo_full.png" alt="Wathbah" class="h-6 hover:opacity-90 transition-opacity" />
				</a>
			</div>
		</header>

		<!-- Page Content -->
		<main class="flex-1 overflow-auto p-6">
			{@render children?.()}
		</main>
	</div>
</div>
