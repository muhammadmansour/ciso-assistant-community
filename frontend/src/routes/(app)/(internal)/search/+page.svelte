<script lang="ts">
	import type { PageData } from './$types';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { browser } from '$app/environment';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let searchInput = $state(data.searchQuery || '');

	function handleSearch() {
		const q = searchInput.trim();
		if (q && browser) {
			window.location.href = `/search?q=${encodeURIComponent(q)}`;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSearch();
		}
	}
</script>

<div class="space-y-6">
	<!-- Search Bar -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
		<div class="flex items-center gap-3 mb-4">
			<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center">
				<i class="fa-solid fa-magnifying-glass text-[#0A1628] text-lg"></i>
			</div>
			<div>
				<h2 class="text-xl font-bold text-gray-900">Search</h2>
				<p class="text-sm text-gray-500">Search across Assessments, Controls, and Evidence</p>
			</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="relative flex-1">
				<i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
				<input
					type="text"
					placeholder="Type your search query..."
					bind:value={searchInput}
					onkeydown={handleKeydown}
					class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/30 focus:border-[#0077CC] focus:bg-white transition-all"
				/>
			</div>
			<button
				onclick={handleSearch}
				class="px-6 py-3 bg-[#0A1628] text-white text-sm font-medium rounded-lg hover:bg-[#1a2740] transition-colors flex items-center gap-2"
			>
				<i class="fa-solid fa-magnifying-glass"></i>
				Search
			</button>
		</div>
	</div>

	{#if data.searchQuery}
		<!-- Assessments -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div class="flex items-center gap-2 mb-4">
				<i class="fa-solid fa-clipboard-check text-[#0077CC] text-lg"></i>
				<h3 class="text-lg font-bold text-gray-900">Assessments</h3>
				<span class="text-sm text-gray-400 ml-1">({data.assessmentsTable.meta?.count ?? 0})</span>
			</div>
			<ModelTable
				source={data.assessmentsTable}
				URLModel="compliance-assessments"
				hideFilters={true}
				displayActions={false}
			/>
		</div>

		<!-- Controls -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div class="flex items-center gap-2 mb-4">
				<i class="fa-solid fa-shield-halved text-[#0077CC] text-lg"></i>
				<h3 class="text-lg font-bold text-gray-900">Controls</h3>
				<span class="text-sm text-gray-400 ml-1">({data.controlsTable.meta?.count ?? 0})</span>
			</div>
			<ModelTable
				source={data.controlsTable}
				URLModel="applied-controls"
				hideFilters={true}
				displayActions={false}
			/>
		</div>

		<!-- Evidence -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div class="flex items-center gap-2 mb-4">
				<i class="fa-solid fa-file-lines text-[#0077CC] text-lg"></i>
				<h3 class="text-lg font-bold text-gray-900">Evidence</h3>
				<span class="text-sm text-gray-400 ml-1">({data.evidenceTable.meta?.count ?? 0})</span>
			</div>
			<ModelTable
				source={data.evidenceTable}
				URLModel="evidences"
				hideFilters={true}
				displayActions={false}
			/>
		</div>
	{:else}
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
			<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
				<i class="fa-solid fa-magnifying-glass text-gray-400 text-2xl"></i>
			</div>
			<p class="text-gray-500 font-medium">Type a query above and press Enter or click Search</p>
			<p class="text-gray-400 text-sm mt-1">Results from Assessments, Controls, and Evidence will appear here</p>
		</div>
	{/if}
</div>
