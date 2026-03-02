<script lang="ts">
	import type { PageData } from './$types';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const adminSections = [
		{
			title: 'User Management',
			description: 'Manage users, roles, and permissions',
			icon: 'fa-solid fa-users-gear',
			links: [
				{ label: 'Users', href: '/users', icon: 'fa-solid fa-users' },
				{ label: 'User Groups', href: '/user-groups', icon: 'fa-solid fa-people-group' },
				{ label: 'Teams', href: '/teams', icon: 'fa-solid fa-user-group' }
			]
		},
		{
			title: 'Organization',
			description: 'Domains, perimeters, and entity configuration',
			icon: 'fa-solid fa-building',
			links: [
				{ label: 'Domains', href: '/folders', icon: 'fa-solid fa-table-cells-large' },
				{ label: 'Perimeters', href: '/perimeters', icon: 'fa-solid fa-earth-americas' },
				{ label: 'Entities', href: '/entities', icon: 'fa-solid fa-landmark' }
			]
		},
		{
			title: 'Frameworks & Libraries',
			description: 'Manage compliance frameworks and library catalog',
			icon: 'fa-solid fa-book',
			links: [
				{ label: 'Frameworks', href: '/frameworks', icon: 'fa-regular fa-circle' },
				{ label: 'Loaded Libraries', href: '/loaded-libraries', icon: 'fa-solid fa-book-open' },
				{ label: 'Stored Libraries', href: '/stored-libraries', icon: 'fa-solid fa-database' }
			]
		},
		{
			title: 'System',
			description: 'Backup, restore, and system settings',
			icon: 'fa-solid fa-sliders',
			links: [
				{ label: 'Backup & Restore', href: '/backup-restore', icon: 'fa-solid fa-cloud-arrow-up' },
				{ label: 'Settings', href: '/settings', icon: 'fa-solid fa-gear' },
				{ label: 'License', href: '/license-management', icon: 'fa-solid fa-key' }
			]
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex items-center gap-4">
		<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A1628] to-[#2a3a5c] flex items-center justify-center shadow-lg">
			<i class="fa-solid fa-gear text-white text-xl"></i>
		</div>
		<div>
			<h1 class="text-2xl font-bold text-gray-900">WathbahGRC Admin</h1>
			<p class="text-sm text-gray-500">System administration and configuration</p>
		</div>
	</div>

	<!-- Admin Sections Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each adminSections as section}
			<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
				<!-- Section Header -->
				<div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
					<div class="flex items-center gap-3">
						<div class="w-9 h-9 rounded-lg bg-[#0A1628]/10 flex items-center justify-center">
							<i class="{section.icon} text-[#0A1628]"></i>
						</div>
						<div>
							<h2 class="font-semibold text-gray-900">{section.title}</h2>
							<p class="text-xs text-gray-500">{section.description}</p>
						</div>
					</div>
				</div>

				<!-- Links -->
				<div class="p-3 space-y-1">
					{#each section.links as link}
						<Anchor
							href={link.href}
							breadcrumbAction="push"
							class="unstyled flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
						>
							<i class="{link.icon} text-gray-400 group-hover:text-[#0A1628] text-sm w-5 text-center"></i>
							<span class="text-sm font-medium">{link.label}</span>
							<i class="fa-solid fa-chevron-right text-[10px] text-gray-300 group-hover:text-gray-500 ml-auto"></i>
						</Anchor>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
