<script lang="ts">
	import CreateModal from '$lib/components/Modals/CreateModal.svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { page } from '$app/state';
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import type { PageData, ActionData } from './$types';
	import {
		getModalStore,
		type ModalComponent,
		type ModalSettings,
		type ModalStore
	} from '$lib/components/Modals/stores';

	import QuickStartModal from '$lib/components/SideBar/QuickStart/QuickStartModal.svelte';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
	let URLModel = $derived(data.URLModel);

	const modalStore: ModalStore = getModalStore();

	function modalCreateForm(): void {
		let modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				form: data.createForm,
				model: data.model
			}
		};
		let modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: safeTranslate('add-' + data.model.localName)
		};
		modalStore.trigger(modal);
	}

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

	// Compute the description key for the model
	const modelDescriptionKey = $derived(() => {
		if (!URLModel) return null;
		const camelCase = URLModel
			.split('-')
			.map((word: string, index: number) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
			.join('');
		return `${camelCase}Description`;
	});

	const modelDescription = $derived(() => {
		const key = modelDescriptionKey();
		if (key && m[key]) {
			return m[key]();
		}
		return '';
	});
</script>

{#if data.table}
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
		<!-- Card Header: Model title + description + action button -->
		<div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
			<div>
				<h2 class="text-lg font-bold text-gray-900">
					{safeTranslate(data.model.localNamePlural)}
				</h2>
				{#if modelDescription()}
					<p class="text-sm text-gray-500 mt-0.5">{modelDescription()}</p>
				{/if}
			</div>
			<div class="flex items-center gap-2">
				{#if URLModel === 'compliance-assessments' && page.data?.user?.is_admin}
					<button
						class="btn bg-[#005FA3] text-white hover:bg-[#004d85] shadow-sm rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
						onclick={modalQuickStart}
					>
						<i class="fa-solid fa-plus mr-2"></i>
						{m.quickStart()}
					</button>
				{/if}
			</div>
		</div>

		<!-- Table -->
		{#key URLModel}
			<ModelTable source={data.table} deleteForm={data.deleteForm} {URLModel}>
				{#snippet addButton()}
					<div>
						<span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs">
							{#if !['risk-matrices', 'frameworks', 'requirement-mapping-sets', 'user-groups', 'role-assignments'].includes(URLModel)}
								<button
									class="inline-block border-e p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative"
									data-testid="add-button"
									id="add-button"
									title={safeTranslate('add-' + data.model.localName)}
									onclick={modalCreateForm}
									><i class="fa-solid fa-file-circle-plus"></i>
								</button>
								{#if ['applied-controls', 'assets'].includes(URLModel)}
									<a
										href="{URLModel}/export/"
										class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative"
										title={m.exportButton()}
										data-testid="export-button"><i class="fa-solid fa-download mr-2"></i></a
									>
								{/if}
							{:else if URLModel === 'risk-matrices'}
								<a
									href="/libraries?object_type=risk_matrix"
									class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative"
									data-testid="add-button"
									id="add-button"
									title={m.importMatrices()}><i class="fa-solid fa-file-import mr-2"></i></a
								>
							{:else if URLModel === 'frameworks'}
								<a
									href="/libraries?object_type=frameworks"
									class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative"
									data-testid="add-button"
									id="add-button"
									title={m.importFrameworks()}><i class="fa-solid fa-file-import mr-2"></i></a
								>
							{:else if URLModel === 'requirement-mapping-sets'}
								<a
									href="/libraries?object_type=requirement_mapping_set"
									class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative"
									data-testid="add-button"
									id="add-button"
									title={m.importMappings()}><i class="fa-solid fa-file-import mr-2"></i></a
								>
							{/if}
						</span>
					</div>
				{/snippet}
			</ModelTable>
		{/key}
	</div>
{/if}
