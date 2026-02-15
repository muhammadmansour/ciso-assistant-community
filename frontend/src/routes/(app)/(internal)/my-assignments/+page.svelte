<script lang="ts">
	import type { PageData } from './$types';
	import { m } from '$paraglide/messages';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
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
				href="/applied-controls"
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

	<!-- My Assignments Table -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
		<div class="mb-4">
			<h2 class="text-xl font-bold text-gray-900">My Assignments</h2>
			<p class="text-sm text-gray-500">Complete these tasks by uploading the required evidence</p>
		</div>

		<ModelTable
			source={data.controlsTable}
			URLModel="applied-controls"
			baseEndpoint={`/applied-controls/?owner=${data.user.actor_id}`}
			hideFilters={true}
		/>
	</div>
</div>
