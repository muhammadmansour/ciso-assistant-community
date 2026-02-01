<script lang="ts">
	import { m } from '$paraglide/messages';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import UploadLibraryModal from '$lib/components/Modals/UploadLibraryModal.svelte';
	import {
		getModalStore,
		type ModalStore,
		type ModalComponent,
		type ModalSettings
	} from '$lib/components/Modals/stores';

	import { safeTranslate } from '$lib/utils/i18n';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let isFetchingMuraji = $state(false);
	let isLoading = $state(true);

	const modalStore: ModalStore = getModalStore();

	function modalCreateForm(): void {
		let modalComponent: ModalComponent = {
			ref: UploadLibraryModal
		};
		let modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			title: safeTranslate('addYourLibrary')
		};
		modalStore.trigger(modal);
	}

	interface QuickFilters {
		[key: string]: Set<string> | boolean;
	}
	let quickFilterValues: QuickFilters = {
		object_type: new Set(),
		is_update: false
	};

	type FilterConfig = {
		type: 'string' | 'boolean';
		field: string;
		icon: string;
		selectedClass: string;
		hoverClass: string;
		label: string;
	};

	const filterConfiguration: Record<string, FilterConfig> = {
		frameworks: {
			type: 'string',
			field: 'object_type',
			icon: 'fa-book-open',
			selectedClass: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200',
			hoverClass: 'hover:border-blue-400 hover:bg-blue-50',
			label: m.frameworks()
		},
		reference_controls: {
			type: 'string',
			field: 'object_type',
			icon: 'fa-shield-halved',
			selectedClass:
				'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-200',
			hoverClass: 'hover:border-emerald-400 hover:bg-emerald-50',
			label: m.referenceControls()
		},
		risk_matrices: {
			type: 'string',
			field: 'object_type',
			icon: 'fa-table-cells',
			selectedClass: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-200',
			hoverClass: 'hover:border-amber-400 hover:bg-amber-50',
			label: m.riskMatrices()
		},
		threats: {
			type: 'string',
			field: 'object_type',
			icon: 'fa-triangle-exclamation',
			selectedClass: 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-red-200',
			hoverClass: 'hover:border-red-400 hover:bg-red-50',
			label: m.threats()
		},
		metric_definitions: {
			type: 'string',
			field: 'object_type',
			icon: 'fa-chart-line',
			selectedClass: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-200',
			hoverClass: 'hover:border-purple-400 hover:bg-purple-50',
			label: m.metricDefinitions()
		},
		requirement_mapping_sets: {
			type: 'string',
			field: 'object_type',
			icon: 'fa-diagram-project',
			selectedClass: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-pink-200',
			hoverClass: 'hover:border-pink-400 hover:bg-pink-50',
			label: m.requirementMappingSets()
		},
		is_update: {
			type: 'boolean',
			field: 'is_update',
			icon: 'fa-arrows-rotate',
			selectedClass: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-pink-200',
			hoverClass: 'hover:border-pink-400 hover:bg-pink-50',
			label: m.updateAvailable()
		}
	};

	const filterTypes = Object.keys(filterConfiguration);

	let quickFilterSelected: Record<string, boolean> = $state({});
</script>

<div class="card bg-white py-2 shadow-sm min-h-[400px]">
	{#await data.storedLibrariesTable}
		<!-- Loading State with Circular Progress -->
		<div class="flex flex-col items-center justify-center py-20 gap-4">
			<div class="relative">
				<!-- Circular Progress Spinner -->
				<svg class="w-16 h-16 animate-spin" viewBox="0 0 50 50">
					<circle
						class="stroke-gray-200"
						cx="25"
						cy="25"
						r="20"
						fill="none"
						stroke-width="4"
					></circle>
					<circle
						class="stroke-indigo-600"
						cx="25"
						cy="25"
						r="20"
						fill="none"
						stroke-width="4"
						stroke-linecap="round"
						stroke-dasharray="31.4 94.2"
					></circle>
				</svg>
			</div>
			<p class="text-gray-600 font-medium">{m.loading ? m.loading() : 'Loading libraries...'}</p>
			<p class="text-gray-400 text-sm">جاري تحميل المكتبات...</p>
		</div>
	{:then storedLibrariesTable}
		<ModelTable
			source={storedLibrariesTable}
			URLModel="stored-libraries"
			deleteForm={data.deleteForm}
			onFilterChange={(filters) => {
			// Reset all quickFilterSelected states
			Object.keys(quickFilterSelected).forEach((key) => (quickFilterSelected[key] = false));

			for (const key in filterConfiguration) {
				const config = filterConfiguration[key];
				const filterValues = filters[config.field] ?? [];

				if (config.type === 'string') {
					const filteredValues = filterValues.map((filter) => filter.value);
					if (filteredValues.includes(key)) {
						quickFilterSelected[key] = true;
					}
				} else if (config.type === 'boolean') {
					if (filterValues.some((f) => f.value === 'true')) {
						quickFilterSelected[key] = true;
					}
				}
			}
		}}
	>
		{#snippet quickFilters(filterValues, form, invalidateTable)}
			<div
				class="flex flex-wrap gap-2 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200"
			>
				{#each filterTypes as key}
					{@const config = filterConfiguration[key]}

					<button
						class="group relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                        {quickFilterSelected[key]
							? config.selectedClass
							: `bg-white text-gray-700 border-2 border-gray-300 ${config.hoverClass}`}"
						onclick={() => {
							if (config.type === 'string') {
								const filterValue = filterValues[config.field] ?? [];
								const currentValues = new Set(filterValue.map((obj) => obj.value));

								if (currentValues.has(key)) {
									currentValues.delete(key);
								} else {
									currentValues.add(key);
								}

								const newValues = Array.from(currentValues);
								filterValues[config.field] = newValues.map((v) => ({ value: v }));

								form.form.update((currentData) => {
									currentData[config.field] = newValues.length > 0 ? newValues : null;
									return currentData;
								});
							} else if (config.type === 'boolean') {
								const currentValue = quickFilterValues[config.field] as boolean;
								const newValue = !currentValue;
								quickFilterValues[config.field] = newValue;

								if (newValue) {
									filterValues[config.field] = [{ value: 'true' }];
								} else {
									delete filterValues[config.field];
								}

								form.form.update((currentData) => {
									currentData[config.field] = newValue ? 'true' : null;
									return currentData;
								});
							}

							invalidateTable();
						}}
					>
						<span class="flex items-center gap-2">
							<i
								class="fa-solid {config.icon} transition-transform duration-200 {quickFilterSelected[
									key
								]
									? 'scale-110'
									: 'group-hover:scale-110'}"
							></i>
							<span class="font-semibold">{config.label}</span>
							{#if quickFilterSelected[key]}
								<svg class="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						</span>
					</button>
				{/each}
			</div>
		{/snippet}
		{#snippet addButton()}
			<div class="flex gap-2">
				<!-- Fetch from Muraji Button -->
				<form
					method="POST"
					action="?/fetchMuraji"
					use:enhance={() => {
						isFetchingMuraji = true;
						return async ({ result, update }) => {
							isFetchingMuraji = false;
							await update();
							await invalidateAll();
						};
					}}
				>
					<button
						type="submit"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium text-sm shadow-sm hover:from-teal-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isFetchingMuraji}
						title="Fetch from Muraji"
					>
						{#if isFetchingMuraji}
							<i class="fa-solid fa-spinner fa-spin"></i>
							<span>جاري المزامنة...</span>
						{:else}
							<i class="fa-solid fa-cloud-arrow-down"></i>
							<span>مزامنة مع مراجع</span>
						{/if}
					</button>
				</form>

				<!-- Upload Library Button -->
				<span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs">
					<button
						class="inline-block p-3 btn-mini-primary w-12 focus:relative"
						data-testid="add-button"
						title={m.addYourLibrary()}
						aria-label={m.addYourLibrary()}
						onclick={modalCreateForm}
						><i class="fa-solid fa-file-circle-plus"></i>
					</button>
				</span>
			</div>
		{/snippet}
		</ModelTable>
	{:catch error}
		<!-- Error State -->
		<div class="flex flex-col items-center justify-center py-20 gap-4">
			<div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
				<i class="fa-solid fa-exclamation-triangle text-red-500 text-2xl"></i>
			</div>
			<p class="text-red-600 font-medium">Failed to load libraries</p>
			<p class="text-gray-500 text-sm">{error?.message || 'An unexpected error occurred'}</p>
			<button
				class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
				onclick={() => invalidateAll()}
			>
				<i class="fa-solid fa-refresh mr-2"></i>
				Retry
			</button>
		</div>
	{/await}
</div>
