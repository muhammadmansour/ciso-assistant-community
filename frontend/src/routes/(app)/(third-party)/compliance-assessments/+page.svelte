<script lang="ts">
	import CreateModal from '$lib/components/Modals/CreateModal.svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import type { PageData, ActionData } from './$types';
	import {
		getModalStore,
		type ModalComponent,
		type ModalSettings,
		type ModalStore
	} from '$lib/components/Modals/stores';

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
			title: safeTranslate('add-' + data.model.localName)
		};
		modalStore.trigger(modal);
	}
</script>

{#if data.table}
	<div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
		<!-- Card header -->
		<div class="p-6 border-b border-gray-200">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-lg font-semibold text-gray-900">{m.complianceAssessments()}</h2>
					<p class="text-sm text-gray-500 mt-0.5">{m.complianceAssessmentsDescription()}</p>
				</div>
				<button
					onclick={modalCreateForm}
					class="flex items-center gap-2 px-4 py-2.5 bg-[#0077CC] text-white rounded-lg hover:bg-[#005fa3] transition-colors text-sm font-medium shadow-sm"
					data-testid="add-button"
					id="add-button"
				>
					<i class="fa-solid fa-plus text-xs"></i>
					Quick Start
				</button>
			</div>
		</div>

		<!-- Table -->
		{#key URLModel}
			<ModelTable source={data.table} deleteForm={data.deleteForm} {URLModel}>
				{#snippet addButton()}
					<!-- Hide the default add button since we have the Quick Start button above -->
					<div></div>
				{/snippet}
			</ModelTable>
		{/key}
	</div>
{/if}
