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

	let { data } = $props();

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

</script>

<div class="card bg-white py-2 shadow-sm">
	<ModelTable
		source={data.storedLibrariesTable}
		URLModel="stored-libraries"
		deleteForm={data.deleteForm}
	>
		{#snippet addButton()}
			<div>
				<span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs">
					<button
						class="inline-block p-3 btn-mini-primary w-12 focus:relative"
						data-testid="add-button"
						title={m.addYourLibrary()}
						onclick={modalCreateForm}
						><i class="fa-solid fa-file-circle-plus"></i>
					</button>
				</span>
			</div>
		{/snippet}
	</ModelTable>
</div>
