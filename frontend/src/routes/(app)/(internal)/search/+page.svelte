<script lang="ts">
	import type { PageData } from './$types';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const query = data.searchQuery || '';
</script>

<div class="space-y-6">
	<!-- Search Header -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center">
				<i class="fa-solid fa-magnifying-glass text-[#0A1628] text-lg"></i>
			</div>
			<div>
				<h2 class="text-xl font-bold text-gray-900">Search Results</h2>
				{#if query}
					<p class="text-sm text-gray-500">Showing results for "<span class="font-medium text-gray-700">{query}</span>"</p>
				{:else}
					<p class="text-sm text-gray-500">Enter a search query to find items</p>
				{/if}
			</div>
		</div>
	</div>

	{#if query}
		<!-- Assessments (Audits) -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div class="flex items-center gap-2 mb-4">
				<i class="fa-solid fa-clipboard-check text-[#0077CC] text-lg"></i>
				<h3 class="text-lg font-bold text-gray-900">Assessments</h3>
			</div>
			<ModelTable
				source={{
					head: {
						name: 'name',
						framework: 'framework',
						status: 'status',
						updated_at: 'updated_at'
					},
					body: []
				}}
				URLModel="compliance-assessments"
				baseEndpoint="/compliance-assessments?search={encodeURIComponent(query)}"
				hideFilters={true}
			/>
		</div>

		<!-- Controls -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div class="flex items-center gap-2 mb-4">
				<i class="fa-solid fa-shield-halved text-[#0077CC] text-lg"></i>
				<h3 class="text-lg font-bold text-gray-900">Controls</h3>
			</div>
			<ModelTable
				source={{
					head: {
						ref_id: 'ref_id',
						name: 'name',
						status: 'status',
						priority: 'priority',
						eta: 'eta',
						folder: 'folder'
					},
					body: []
				}}
				URLModel="applied-controls"
				baseEndpoint="/applied-controls?search={encodeURIComponent(query)}"
				hideFilters={true}
			/>
		</div>

		<!-- Evidence -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div class="flex items-center gap-2 mb-4">
				<i class="fa-solid fa-file-lines text-[#0077CC] text-lg"></i>
				<h3 class="text-lg font-bold text-gray-900">Evidence</h3>
			</div>
			<ModelTable
				source={{
					head: {
						name: 'name',
						status: 'status',
						updated_at: 'updated_at',
						folder: 'folder'
					},
					body: []
				}}
				URLModel="evidences"
				baseEndpoint="/evidences?search={encodeURIComponent(query)}"
				hideFilters={true}
			/>
		</div>
	{:else}
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
			<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
				<i class="fa-solid fa-magnifying-glass text-gray-400 text-2xl"></i>
			</div>
			<p class="text-gray-500 font-medium">Type a query in the search bar and press Enter</p>
			<p class="text-gray-400 text-sm mt-1">Results from Assessments, Controls, and Evidence will appear here</p>
		</div>
	{/if}
</div>
