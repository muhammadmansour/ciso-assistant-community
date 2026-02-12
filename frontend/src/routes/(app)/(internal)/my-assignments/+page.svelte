<script lang="ts">
	import type { PageData } from './$types';
	import { m } from '$paraglide/messages';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const appliedControls = data.appliedControls || [];

	// Status color mapping
	function getStatusColor(status: string): string {
		switch (status?.toLowerCase()) {
			case 'done':
			case 'active':
				return '#22c55e'; // green
			case 'in_progress':
			case 'in progress':
				return '#3b82f6'; // blue
			case 'on_hold':
			case 'on hold':
			case 'needs_review':
			case 'needs review':
				return '#f97316'; // orange
			case 'not_started':
			case 'not started':
			case 'new':
				return '#9ca3af'; // gray
			default:
				return '#9ca3af';
		}
	}

	function getStatusLabel(status: string): string {
		switch (status?.toLowerCase()) {
			case 'done':
			case 'active':
				return 'Done';
			case 'in_progress':
			case 'in progress':
				return 'In Progress';
			case 'on_hold':
			case 'on hold':
				return 'On Hold';
			case 'needs_review':
			case 'needs review':
				return 'Needs Review';
			case 'not_started':
			case 'not started':
			case 'new':
				return 'Not Started';
			default:
				return status || 'Unknown';
		}
	}

	function getPriorityLabel(priority: string | number): string {
		switch (String(priority)?.toLowerCase()) {
			case '1':
			case 'very_high':
				return 'Very High';
			case '2':
			case 'high':
				return 'High';
			case '3':
			case 'medium':
				return 'Medium';
			case '4':
			case 'low':
				return 'Low';
			default:
				return '';
		}
	}

	function getPriorityColor(priority: string | number): string {
		switch (String(priority)?.toLowerCase()) {
			case '1':
			case 'very_high':
				return 'bg-red-500';
			case '2':
			case 'high':
				return 'bg-red-400';
			case '3':
			case 'medium':
				return 'bg-orange-400';
			case '4':
			case 'low':
				return 'bg-blue-400';
			default:
				return 'bg-gray-400';
		}
	}

	function formatDate(dateStr: string): string {
		if (!dateStr) return '';
		try {
			const date = new Date(dateStr);
			return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
		} catch {
			return dateStr;
		}
	}
</script>

<div class="space-y-6">
	<!-- Quick Actions -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
		<h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<!-- View Assessments -->
			<Anchor
				href="/compliance-assessments"
				breadcrumbAction="push"
				class="unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer"
			>
				<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
					<i class="fa-solid fa-file-lines text-[#0A1628] text-lg"></i>
				</div>
				<div class="flex-1 min-w-0">
					<p class="font-semibold text-gray-900 text-sm">View Assessments</p>
					<p class="text-xs text-gray-500">Browse all compliance assessments</p>
				</div>
				<i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>
			</Anchor>

			<!-- Manage Evidence -->
			<Anchor
				href="/evidences"
				breadcrumbAction="push"
				class="unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer"
			>
				<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
					<i class="fa-solid fa-cloud-arrow-up text-[#0A1628] text-lg"></i>
				</div>
				<div class="flex-1 min-w-0">
					<p class="font-semibold text-gray-900 text-sm">Manage Evidence</p>
					<p class="text-xs text-gray-500">View uploaded documents</p>
				</div>
				<i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>
			</Anchor>

			<!-- Data Requests -->
			<Anchor
				href="/right-requests"
				breadcrumbAction="push"
				class="unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer"
			>
				<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
					<i class="fa-solid fa-shield-halved text-[#0A1628] text-lg"></i>
				</div>
				<div class="flex-1 min-w-0">
					<p class="font-semibold text-gray-900 text-sm">Data Requests</p>
					<p class="text-xs text-gray-500">See all compliance requests</p>
				</div>
				<i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>
			</Anchor>
		</div>
	</div>

	<!-- All Tasks -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
		<div class="mb-4">
		<h2 class="text-xl font-bold text-gray-900">My Assignments</h2>
		<p class="text-sm text-gray-500">Complete these tasks by uploading the required evidence</p>
		</div>

		{#if appliedControls.length === 0}
			<div class="text-center py-12">
				<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
					<i class="fa-solid fa-clipboard-check text-gray-400 text-2xl"></i>
				</div>
				<p class="text-gray-500 font-medium">No tasks assigned yet</p>
				<p class="text-gray-400 text-sm mt-1">Tasks will appear here when assigned to you</p>
			</div>
		{:else}
			<div class="divide-y divide-gray-100">
				{#each appliedControls as control}
					<div class="flex items-center justify-between py-4 hover:bg-gray-50/50 -mx-2 px-2 rounded-lg transition-colors">
						<!-- Left: Status dot + Info -->
						<div class="flex items-start gap-3 flex-1 min-w-0">
							<div class="mt-2 flex-shrink-0">
								<div
									class="w-2.5 h-2.5 rounded-full"
									style="background-color: {getStatusColor(control.status)}"
								></div>
							</div>
							<div class="min-w-0">
								<div class="flex items-center gap-2 mb-0.5">
									<span class="text-xs text-gray-400 font-mono">{control.ref_id || '—'}</span>
									{#if control.priority}
										<span class="text-xs font-medium text-red-500 {getPriorityColor(control.priority)} text-white px-1.5 py-0.5 rounded text-[10px]">
											{getPriorityLabel(control.priority)}
										</span>
									{/if}
								</div>
								<Anchor
									href="/applied-controls/{control.id}"
									breadcrumbAction="push"
									class="unstyled text-sm font-medium text-gray-900 hover:text-[#0077CC] transition-colors"
								>
									{control.name}
								</Anchor>
								<div class="flex items-center gap-3 mt-1">
									<span class="flex items-center gap-1 text-xs">
										<span
											class="w-1.5 h-1.5 rounded-full inline-block"
											style="background-color: {getStatusColor(control.status)}"
										></span>
										<span style="color: {getStatusColor(control.status)}">{getStatusLabel(control.status)}</span>
									</span>
									{#if control.eta}
										<span class="flex items-center gap-1 text-xs text-gray-400">
											<i class="fa-regular fa-clock text-[10px]"></i>
											Due {formatDate(control.eta)}
										</span>
									{/if}
								</div>
							</div>
						</div>

						<!-- Right: Upload button -->
						<div class="flex-shrink-0 ml-4">
							<Anchor
								href="/applied-controls/{control.id}"
								breadcrumbAction="push"
								class="unstyled inline-flex items-center gap-2 px-4 py-2 bg-[#0077CC] text-white text-sm font-medium rounded-lg hover:bg-[#0066B3] transition-colors shadow-sm"
							>
								<i class="fa-solid fa-cloud-arrow-up text-xs"></i>
								Upload
							</Anchor>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
