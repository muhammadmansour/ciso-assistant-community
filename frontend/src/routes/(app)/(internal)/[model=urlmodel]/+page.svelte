<script lang="ts">
	import { handlers } from 'svelte/legacy';

	import CreateModal from '$lib/components/Modals/CreateModal.svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { safeTranslate } from '$lib/utils/i18n';
	import { driverInstance } from '$lib/utils/stores';
	import { m } from '$paraglide/messages';
	import type { ActionData, PageData } from './$types';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import { Popover } from '@skeletonlabs/skeleton-svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import { page } from '$app/state';
	import { onMount } from 'svelte';
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
	let exportPopupOpen = $state(false);
	let isFetchingMuraji = $state(false);

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

	function modalFolderImportForm(): void {
		let modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				form: data.model['folderImportForm'],
				model: data.model['folderImportModel'],
				importFolder: true,
				formAction: '?/importFolder',
				enctype: 'multipart/form-data',
				dataType: 'form'
			}
		};
		let modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: safeTranslate('importFolder')
		};
		modalStore.trigger(modal);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.metaKey || event.ctrlKey) return;
		if (document.activeElement?.tagName !== 'BODY') return;

		// Check if 'c' is pressed and no input fields are currently focused
		if (
			event.key.toLowerCase() === 'c' &&
			document.activeElement?.tagName !== 'INPUT' &&
			document.activeElement?.tagName !== 'TEXTAREA'
		) {
			// Prevent default 'c' key behavior
			event.preventDefault();

			// Check if the add button exists and is not in a disabled list
			if (
				![
					'risk-matrices',
					'frameworks',
					'requirement-mapping-sets',
					'user-groups',
					'role-assignments'
				].includes(URLModel)
			) {
				modalCreateForm();
			}
		}
	}

	function handleClickForGT() {
		setTimeout(() => {
			$driverInstance?.moveNext();
		}, 300);
	}
	onMount(() => {
		// Add event listener when component mounts
		window.addEventListener('keydown', handleKeyDown);

		// Cleanup event listener when component is destroyed
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

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

{#if data?.table}
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
			<ModelTable
				source={data.table}
				deleteForm={data.deleteForm}
				{URLModel}
				disableEdit={['user-groups', 'validation-flows'].includes(URLModel)}
				disableDelete={['user-groups'].includes(URLModel)}
			>
				{#snippet addButton()}
					<div>
						<span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs">
							{#if !['risk-matrices', 'frameworks', 'requirement-mapping-sets', 'user-groups', 'role-assignments', 'qualifications'].includes(URLModel)}
								<button
									class="inline-block p-3 btn-mini-primary w-12 focus:relative"
									data-testid="add-button"
									id="add-button"
									title={safeTranslate('add-' + data.model.localName)}
									aria-label={safeTranslate('add-' + data.model.localName)}
									onclick={handlers(modalCreateForm, handleClickForGT)}
									><i class="fa-solid fa-file-circle-plus"></i>
								</button>
								{#if ['applied-controls', 'assets', 'incidents', 'security-exceptions', 'risk-scenarios', 'processings', 'task-templates'].includes(URLModel)}
									<Popover
										open={exportPopupOpen}
										onOpenChange={(e) => (exportPopupOpen = e.open)}
										triggerBase="inline-block p-3 btn-mini-tertiary w-12 focus:relative"
										contentBase="card whitespace-nowrap bg-white py-2 w-fit shadow-lg"
										positioning={{ placement: 'bottom-end' }}
										zIndex="1000"
									>
										{#snippet trigger()}
											<span title={m.exportButton()} data-testid="export-button">
												<i class="fa-solid fa-download"></i>
											</span>
										{/snippet}
										{#snippet content()}
											<div class="flex flex-col">
												<a
													href="{URLModel}/export/"
													class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
													>... {m.asCSV()}</a
												>
												<a
													href="{URLModel}/export/xlsx/"
													class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
													>... {m.asXLSX()}</a
												>
											</div>
										{/snippet}
									</Popover>
								{/if}
								{#if URLModel === 'applied-controls'}
									<a
										href="{URLModel}/flash-mode/"
										class="inline-block p-3 btn-mini-secondary w-12 focus:relative"
										title={m.flashMode()}
										aria-label={m.flashMode()}
										data-testid="flash-mode-button"><i class="fa-solid fa-bolt mr-2"></i></a
									>
								{/if}
								{#if ['threats', 'reference-controls', 'metric-definitions'].includes(URLModel)}
									{@const title =
										URLModel === 'threats'
											? m.importThreats()
											: URLModel === 'reference-controls'
												? m.importReferenceControls()
												: m.importMetricDefinitions()}
									<Anchor
										href={`/libraries?object_type=${URLModel.replace(/-/g, '_')}`}
										label={m.libraries()}
										class="inline-block p-3 btn-mini-tertiary w-12 focus:relative"
										data-testid="import-button"
										id="import-button"
										{title}><i class="fa-solid fa-file-import mr-2"></i></Anchor
									>
								{/if}
								{#if URLModel === 'assets'}
									<Anchor
										href="assets/graph/"
										class="inline-block p-3 btn-mini-secondary w-12 focus:relative"
										title={m.exploreButton()}
										label={m.inspect()}
										data-testid="viz-button"><i class="fa-solid fa-diagram-project"></i></Anchor
									>
								{/if}
								{#if URLModel === 'entities'}
									<Anchor
										href="entities/graph/"
										class="inline-block p-3 btn-mini-secondary w-12 focus:relative"
										title={m.exploreButton()}
										label={m.inspect()}
										data-testid="viz-button"><i class="fa-solid fa-diagram-project"></i></Anchor
									>
								{/if}
								{#if URLModel === 'folders'}
									<button
										class="text-gray-50 inline-block border-e p-3 bg-[#1a2740] hover:bg-[#2a3a66] w-12 focus:relative"
										data-testid="import-button"
										title={safeTranslate('importFolder')}
										aria-label={safeTranslate('importFolder')}
										onclick={modalFolderImportForm}
										><i class="fa-solid fa-file-import"></i>
									</button>
									<Anchor
										href="x-rays/inspect"
										class="inline-block p-3 btn-mini-secondary w-12 focus:relative"
										title={m.exploreButton()}
										label={m.inspect()}
										data-testid="viz-button"><i class="fa-solid fa-diagram-project"></i></Anchor
									>
								{/if}
								{#if URLModel === 'vulnerabilities'}
									<Anchor
										href="vulnerabilities/treemap/"
										class="inline-block p-3 btn-mini-secondary w-12 focus:relative"
										title={m.visualizeButton()}
										label={m.visualize()}
										data-testid="viz-button"><i class="fa-solid fa-chart-pie"></i></Anchor
									>
								{/if}
			{:else if ['risk-matrices', 'frameworks', 'requirement-mapping-sets'].includes(URLModel)}
							{@const href = `/libraries?object_type=${URLModel.replace(/-/g, '_')}`}
							{@const title =
								URLModel === 'risk-matrices'
									? m.importMatrices()
									: URLModel === 'frameworks'
										? m.importFrameworks()
										: m.importMappings()}
							<Anchor
								{href}
								onclick={handleClickForGT}
								label={m.libraries()}
								class="inline-block p-3 btn-mini-tertiary w-12 focus:relative"
								data-testid="import-button"
								id="add-button"
								{title}><i class="fa-solid fa-file-import mr-2"></i></Anchor
							>
							{#if URLModel === 'frameworks'}
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
										class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white font-medium text-sm shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
										disabled={isFetchingMuraji}
										title="مزامنة مع مراجع"
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
							{/if}
							{#if URLModel === 'requirement-mapping-sets'}
								<Anchor
									href="requirement-mapping-sets/graph/"
									class="inline-block p-3 btn-mini-secondary w-12 focus:relative"
									title={m.exploreButton()}
									label={m.inspect()}
									data-testid="viz-button"><i class="fa-solid fa-diagram-project"></i></Anchor
								>
							{/if}
						{/if}
						</span>
					</div>
				{/snippet}
				{#snippet badge(key, row)}
					{#if URLModel === 'risk-assessments'}
						{#if key === 'perimeter' && row.meta.ebios_rm_study}
							<span
								class="badge inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-md border border-amber-200 rotate-[-6deg] font-semibold uppercase tracking-wide"
								>ebios-rm</span
							>
						{/if}
					{/if}
				{/snippet}
				{#if URLModel === 'risk-assessments'}{/if}
			</ModelTable>
		{/key}
	</div>
{/if}
