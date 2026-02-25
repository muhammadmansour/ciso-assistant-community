<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/state';
	import RecursiveTreeView from '$lib/components/TreeView/RecursiveTreeView.svelte';

	import { onMount } from 'svelte';

	import type { ModalComponent, ModalSettings, TreeViewNode } from '@skeletonlabs/skeleton-svelte';

	import { Switch, ProgressRing, Popover } from '@skeletonlabs/skeleton-svelte';

	import { goto, invalidateAll } from '$app/navigation';

	import {} from '@skeletonlabs/skeleton-svelte';
	import type { ActionData, PageData } from './$types';
	import TreeViewItemContent from './TreeViewItemContent.svelte';
	import TreeViewItemLead from './TreeViewItemLead.svelte';

	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import CreateModal from '$lib/components/Modals/CreateModal.svelte';

	import {
		complianceResultColorMap,
		complianceStatusColorMap,
		extendedResultColorMap
	} from '$lib/utils/constants';

	import DonutChart from '$lib/components/Chart/DonutChart.svelte';
	import { URL_MODEL_MAP, getModelInfo } from '$lib/utils/crud';
	import type { Node } from './types';

	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import { formatDateOrDateTime } from '$lib/utils/datetime';
	import { getLocale } from '$paraglide/runtime.js';

	import List from '$lib/components/List/List.svelte';
	import ConfirmModal from '$lib/components/Modals/ConfirmModal.svelte';
	import { displayScoreColor, darkenColor } from '$lib/utils/helpers';
	import { auditFiltersStore, expandedNodesState } from '$lib/utils/stores';
	import { derived } from 'svelte/store';
	import { canPerformAction } from '$lib/utils/access-control';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import ValidationFlowsSection from '$lib/components/ValidationFlows/ValidationFlowsSection.svelte';
	import { countMasked, isMaskedPlaceholder } from '$lib/utils/related-visibility';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();

	const compliance_assessment = $derived(data.compliance_assessment);

	const user = page.data.user;
	const model = URL_MODEL_MAP['compliance-assessments'];
	const canEditObject: boolean = canPerformAction({
		user,
		action: 'change',
		model: model.name,
		domain: compliance_assessment.folder.id
	});
	const requirementAssessmentModel = URL_MODEL_MAP['requirement-assessments'];
	const canEditRequirementAssessment: boolean =
		!data.compliance_assessment.is_locked &&
		canPerformAction({
			user,
			action: 'change',
			model: requirementAssessmentModel.name,
			domain: data.compliance_assessment.folder.id
		});

	const has_threats = data.threats.total_unique_threats > 0;

	const objectsNotVisibleLabel = (count: number): string => {
		return m.objectsNotVisible({ count });
	};

	let threatDialogOpen = $state(false);
	let dialogElement = $state();

	function openThreatsDialog() {
		threatDialogOpen = true;
		// Need to use the next tick to ensure the dialog is in the DOM
		setTimeout(() => {
			if (dialogElement) dialogElement.showModal();
		}, 0);
	}

	function closeThreatsDialog() {
		threatDialogOpen = false;
		if (dialogElement) dialogElement.close();
	}

	import ForceCirclePacking from '$lib/components/DataViz/ForceCirclePacking.svelte';
	import { getModalStore, type ModalStore } from '$lib/components/Modals/stores';
	import CompareAuditModal from '$lib/components/Modals/CompareAuditModal.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';

	function handleKeydown(event: KeyboardEvent) {
		if (event.metaKey || event.ctrlKey) return;
		if (document.activeElement?.tagName !== 'BODY') return; // otherwise it will interfere with input fields
		if (event.key === 'f') {
			event.preventDefault();
			goto(`${page.url.pathname}/flash-mode`);
		}
		if (event.key === 't') {
			event.preventDefault();
			goto(`${page.url.pathname}/table-mode`);
		}
	}

	onMount(() => {
		// Add event listener to the document
		document.addEventListener('keydown', handleKeydown);

		// Cleanup function to remove event listener
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	const countResults = (
		node: Node,
		resultCounts: Record<string, number> = {}
	): Record<string, number> => {
		if (node.result && node.assessable) {
			resultCounts[node.result] = (resultCounts[node.result] || 0) + 1;
		}
		if (node.status && node.assessable) {
			resultCounts[node.status] = (resultCounts[node.status] || 0) + 1;
		}
		if (node.is_scored && node.assessable && node.result !== 'not_applicable') {
			resultCounts['scored'] = (resultCounts['scored'] || 0) + 1;
			const nodeDocumentationScore = data.compliance_assessment.show_documentation_score
				? node.documentation_score
				: 0;
			resultCounts['total_documentation_score'] =
				(resultCounts['total_documentation_score'] || 0) + nodeDocumentationScore;
			resultCounts['total_score'] = (resultCounts['total_score'] || 0) + node.score;
		}

		if (node.children && Object.keys(node.children).length > 0) {
			for (const childId in node.children) {
				if (Object.prototype.hasOwnProperty.call(node.children, childId)) {
					const childNode = node.children[childId];
					countResults(childNode, resultCounts);
				}
			}
		}
		return resultCounts;
	};

	let id = $state(page.params.id);
	// derive the current filters for this audit ID
	const currentFilters = derived(auditFiltersStore, ($f) => $f[id] ?? {});
	// reactive values that update whenever auditFiltersStore changes
	let selectedStatus = $state([]);
	let selectedResults = $state([]);
	let selectedExtendedResults = $state([]);
	let displayOnlyAssessableNodes = $state(false);
	$effect(
		() =>
			({
				selectedStatus = [],
				selectedResults = [],
				selectedExtendedResults = [],
				displayOnlyAssessableNodes = false
			} = $currentFilters)
	);

	function toggleItem(item, selectedItems) {
		if (selectedItems.includes(item)) {
			return selectedItems.filter((s) => s !== item);
		} else {
			return [...selectedItems, item];
		}
	}

	function toggleStatus(status) {
		selectedStatus = toggleItem(status, selectedStatus);
		auditFiltersStore.setStatus(page.params.id, selectedStatus);
	}

	function toggleResult(result) {
		selectedResults = toggleItem(result, selectedResults);
		auditFiltersStore.setResults(page.params.id, selectedResults);
	}

	function toggleExtendedResult(extendedResult) {
		selectedExtendedResults = toggleItem(extendedResult, selectedExtendedResults);
		auditFiltersStore.setExtendedResults(page.params.id, selectedExtendedResults);
	}

	function isNodeHidden(node: Node, displayOnlyAssessableNodes: boolean): boolean {
		const hasAssessableChildren = Object.keys(node.children || {}).length > 0;
		return (
			(displayOnlyAssessableNodes && !node.assessable && !hasAssessableChildren) ||
			(node.assessable &&
				((selectedStatus.length > 0 && !selectedStatus.includes(node.status)) ||
					(selectedResults.length > 0 && !selectedResults.includes(node.result)) ||
					(selectedExtendedResults.length > 0 &&
						!selectedExtendedResults.includes(node.extended_result))))
		);
	}
	function transformToTreeView(nodes: Node[], hasParentNode: boolean = false) {
		return nodes.map(([id, node]) => {
			node.resultCounts = countResults(node);
			const hidden = isNodeHidden(node, displayOnlyAssessableNodes);

			return {
				id: id,
				content: TreeViewItemContent,
				contentProps: {
					...node,
					canEditRequirementAssessment,
					hasParentNode,
					showDocumentationScore: data.compliance_assessment.show_documentation_score,
					hidden,
					selectedStatus
				},
				lead: TreeViewItemLead,
				leadProps: {
					statusI18n: node.status_i18n,
					resultI18n: node.result_i18n,
					assessable: node.assessable,
					statusColor: complianceStatusColorMap[node.status],
					resultColor: complianceResultColorMap[node.result],
					score: node.score,
					documentationScore: node.documentation_score,
					isScored: node.is_scored,
					showDocumentationScore: data.compliance_assessment.show_documentation_score,
					max_score: node.max_score,
					progressStatusEnabled: data.compliance_assessment.progress_status_enabled,
					extendedResultEnabled: data.compliance_assessment.extended_result_enabled,
					extendedResult: node.extended_result,
					extendedResultColor: extendedResultColorMap[node.extended_result]
				},
				children: node.children ? transformToTreeView(Object.entries(node.children), true) : []
			};
		});
	}
	let treeViewNodes: TreeViewNode[] = $state();

	function assessableNodesCount(nodes: TreeViewNode[]): number {
		let count = 0;
		for (const node of nodes) {
			if (node.contentProps.assessable) {
				count++;
			}
			if (node.children) {
				count += assessableNodesCount(node.children);
			}
		}
		return count;
	}

	let expandedNodes: TreeViewNode[] = $state([]);

	expandedNodes = $expandedNodesState;

	const modalStore: ModalStore = getModalStore();

	function modalCreateForm(): void {
		const modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				form: data.auditCreateForm,
				context: 'fromBaseline',
				model: data.auditModel,
				debug: false
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: m.createAuditFromBaseline()
		};
		modalStore.trigger(modal);
	}

	function modalCreateCloneForm(): void {
		const modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				form: data.auditCloneForm,
				context: 'clone',
				model: data.auditModel,
				debug: false
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: m.cloneAudit()
		};
		modalStore.trigger(modal);
	}

	function modalCompareAudit(): void {
		const modalComponent: ModalComponent = {
			ref: CompareAuditModal,
			props: {
				currentAudit: data.compliance_assessment
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	function modalRequestValidation(): void {
		const modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				form: data.validationFlowForm,
				model: getModelInfo('validation-flows'),
				formAction: '/validation-flows?/create',
				invalidateAll: true,
				onConfirm: async () => {
					await invalidateAll();
				}
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			title: m.requestValidation()
		};
		modalStore.trigger(modal);
	}
	let syncingToActionsIsLoading = $state(false);
	async function modalConfirmSyncToActions(
		id: string,
		name: string,
		action: string
	): Promise<void> {
		const requirementAssessmentsSync = await fetch(
			`/compliance-assessments/${page.params.id}/sync-to-actions`,
			{ method: 'POST' }
		).then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Failed to fetch requirement assessments sync data');
			}
		});
		const modalComponent: ModalComponent = {
			ref: ConfirmModal,
			props: {
				_form: data.form,
				id: id,
				debug: false,
				URLModel: 'compliance-assessments',
				formAction: action,
				bodyComponent: List,
				bodyProps: {
					items: Object.values(requirementAssessmentsSync.changes).map(
						(req) => `${req.str}, ${safeTranslate(req.current)} -> ${safeTranslate(req.new)}`
					),
					message: m.theFollowingChangesWillBeApplied()
				}
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: m.syncToAppliedControls(),
			body: m.syncToAppliedControlsMessage({
				count: data.compliance_assessment.framework.reference_controls.length //change this
			}),
			response: (r: boolean) => {
				syncingToActionsIsLoading = r;
			}
		};
		modalStore.trigger(modal);
	}
	let createAppliedControlsLoading = $state(false);

	function modalConfirmCreateSuggestedControls(id: string, name: string, action: string): void {
		const modalComponent: ModalComponent = {
			ref: ConfirmModal,
			props: {
				_form: data.form,
				id: id,
				debug: false,
				URLModel: 'compliance-assessments',
				formAction: action,
				bodyComponent: List,
				bodyProps: {
					items: data.compliance_assessment.framework.reference_controls,
					message: m.theFollowingControlsWillBeAddedColon()
				}
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: m.suggestControls(),
			body: m.createAppliedControlsFromSuggestionsConfirmMessage({
				count: data.compliance_assessment.framework.reference_controls.length
			}),
			response: (r: boolean) => {
				createAppliedControlsLoading = r;
			}
		};
		modalStore.trigger(modal);
	}

	let tree = $derived(data.tree);
	let compliance_assessment_donut_values = $derived(data.compliance_assessment_donut_values);

	let exportPopupOpen = $state(false);
	let filterPopupOpen = $state(false);

	run(() => {
		if (tree) {
			treeViewNodes = transformToTreeView(Object.entries(tree));
		}
	});
	run(() => {
		expandedNodesState.set(expandedNodes);
	});
	run(() => {
		if (syncingToActionsIsLoading === true && (form || form?.error))
			syncingToActionsIsLoading = false;
	});
	run(() => {
		if (createAppliedControlsLoading === true && (form || form?.error))
			createAppliedControlsLoading = false;
	});

	let filterCount = $derived(
		(selectedStatus.length > 0 ? 1 : 0) +
			(selectedResults.length > 0 ? 1 : 0) +
			(selectedExtendedResults.length > 0 ? 1 : 0) +
			(displayOnlyAssessableNodes ? 1 : 0)
	);

	let hasNonVisibleObjects = $derived(() => {
		if (!canEditObject) return false;
		for (const [key, value] of Object.entries(data.compliance_assessment)) {
			if (Array.isArray(value)) {
				const maskedCount = countMasked(value);
				if (maskedCount > 0) return true;
			} else if (isMaskedPlaceholder(value)) {
				return true;
			}
		}
		return false;
	});

	// Helper: count assessable requirements in a tree node
	function countTreeReqs(node: any): number {
		let count = 0;
		if (node.assessable) count++;
		if (node.children) {
			for (const child of Object.values(node.children)) {
				count += countTreeReqs(child as any);
			}
		}
		return count;
	}

	// Compute tree categories for domains coverage
	let treeCategories = $derived(
		tree
			? Object.entries(tree).map(([id, node]: [string, any], index: number) => {
					const reqCount = countTreeReqs(node);
					return {
						id,
						name: node.name || node.ref_id || `Category ${index + 1}`,
						reqCount,
						index: index + 1
					};
				})
			: []
	);

	let totalTreeRequirements = $derived(
		treeCategories.reduce((sum: number, cat: any) => sum + cat.reqCount, 0)
	);

	// Map status donut values to progress breakdown items
	const progressStatusMap: Record<string, { label: string; dotColor: string }> = {
		done: { label: 'Done', dotColor: 'bg-emerald-500' },
		in_progress: { label: 'In Progress', dotColor: 'bg-sky-500' },
		in_review: { label: 'Needs Review', dotColor: 'bg-amber-500' },
		to_do: { label: 'Not Started', dotColor: 'bg-gray-300' }
	};
</script>

<div class="space-y-4">
	{#if data.compliance_assessment.is_locked}
		<div class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl shadow-sm">
			<div class="flex items-center gap-2">
				<i class="fa-solid fa-lock text-yellow-600"></i>
				<span class="font-medium text-sm">{m.lockedAssessment()}</span>
				<span class="text-sm text-yellow-700">{m.lockedAssessmentMessage()}</span>
			</div>
		</div>
	{/if}

	<!-- Two-column layout -->
	<div class="flex gap-6">
		<!-- Left column: Details + Charts + Requirements -->
		<div class="flex-1 space-y-6 min-w-0">
			<!-- Details card -->
			<div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
				<div class="grid grid-cols-2 divide-x divide-gray-100">
					<!-- Left column -->
					<div class="p-5 space-y-4">
						<!-- Framework -->
						<div>
							<div class="flex items-center gap-2 mb-1.5">
								<i class="fa-solid fa-shield-halved text-[13px] text-gray-400"></i>
								<span class="text-xs font-medium text-gray-500 uppercase tracking-wide" data-testid="framework-field-title">{m.framework()}</span>
							</div>
							<p class="text-sm font-medium text-gray-900" data-testid="framework-field-value">
								{#if data.compliance_assessment.framework?.str && data.compliance_assessment.framework?.id}
									{#if !page.data.user.is_third_party}
										<Anchor href="/frameworks/{data.compliance_assessment.framework.id}" class="text-[#0077CC] hover:underline">{data.compliance_assessment.framework.str}</Anchor>
									{:else}
										{data.compliance_assessment.framework.str}
									{/if}
								{:else}
									<span class="text-gray-400">-</span>
								{/if}
							</p>
						</div>
						<!-- Location / Perimeter -->
						<div>
							<div class="flex items-center gap-2 mb-1.5">
								<i class="fa-solid fa-location-dot text-[13px] text-gray-400"></i>
								<span class="text-xs font-medium text-gray-500 uppercase tracking-wide" data-testid="perimeter-field-title">{m.perimeter()}</span>
							</div>
							<p class="text-sm text-gray-900" data-testid="perimeter-field-value">
								{#if data.compliance_assessment.perimeter?.str && data.compliance_assessment.perimeter?.id}
									{#if !page.data.user.is_third_party}
										<Anchor href="/perimeters/{data.compliance_assessment.perimeter.id}" class="text-[#0077CC] hover:underline">{data.compliance_assessment.perimeter.str}</Anchor>
									{:else}
										{data.compliance_assessment.perimeter.str}
									{/if}
								{:else if data.compliance_assessment.perimeter?.str}
									{data.compliance_assessment.perimeter.str}
								{:else}
									<span class="text-gray-400">-</span>
								{/if}
							</p>
						</div>
						<!-- Created -->
						<div>
							<div class="flex items-center gap-2 mb-1.5">
								<i class="fa-solid fa-clock text-[13px] text-gray-400"></i>
								<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{m.createdAt()}</span>
							</div>
							<p class="text-sm text-gray-900">{formatDateOrDateTime(data.compliance_assessment.created_at, getLocale())}</p>
						</div>
					</div>

					<!-- Right column -->
					<div class="p-5 space-y-4">
						<!-- Controls -->
						<div>
							<div class="flex items-center gap-2 mb-1.5">
								<i class="fa-solid fa-bullseye text-[13px] text-gray-400"></i>
								<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{m.appliedControls()}</span>
							</div>
						<p class="text-sm text-gray-900" data-testid="controls-field-value">
							{#if data.appliedControlsCount > 0}
								{data.appliedControlsCount} {m.appliedControls().toLowerCase()}
							{:else}
								<span class="text-gray-400">0</span>
							{/if}
						</p>
						</div>
					<!-- Status -->
						<div>
							<div class="flex items-center gap-2 mb-1.5">
								<i class="fa-regular fa-circle text-[13px] text-gray-400"></i>
								<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{m.status()}</span>
							</div>
							{#if data.compliance_assessment.status}
								{@const statusValue = data.compliance_assessment.status}
								{@const statusLabel = safeTranslate(statusValue?.str ?? statusValue)}
								<span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium {
									statusValue === 'active' || statusValue?.str === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
									statusValue === 'in_progress' || statusValue?.str === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
									statusValue === 'done' || statusValue?.str === 'Completed' || statusValue?.str === 'Done' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
									'bg-gray-50 text-gray-600 border border-gray-200'
								}" data-testid="status-field-value">
									{statusLabel}
								</span>
							{:else}
								<span class="text-gray-400">-</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Description -->
				{#if data.compliance_assessment.description}
					<div class="px-5 pb-5 pt-2 border-t border-gray-100">
						<p class="text-sm text-gray-600 leading-relaxed">
							<MarkdownRenderer content={data.compliance_assessment.description} />
						</p>
					</div>
				{/if}

				<!-- Additional fields -->
				{#if data.compliance_assessment.authors?.length > 0 || data.compliance_assessment.reviewers?.length > 0 || data.compliance_assessment.version}
					<div class="px-5 pb-5 pt-2 border-t border-gray-100">
						<div class="grid grid-cols-2 gap-x-8 gap-y-3">
							{#if data.compliance_assessment.version}
								<div>
									<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{safeTranslate('version')}</span>
									<p class="text-sm text-gray-900 mt-1">{data.compliance_assessment.version}</p>
								</div>
							{/if}
							{#if data.compliance_assessment.authors?.length > 0}
								<div>
									<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{safeTranslate('authors')}</span>
									<p class="text-sm text-gray-900 mt-1">
										{#each data.compliance_assessment.authors.filter((a) => !isMaskedPlaceholder(a)) as author, i}
											{#if author.str && author.id}
												{#if !page.data.user.is_third_party}
													<Anchor href="/users/{author.id}" class="text-[#0077CC] hover:underline">{author.str}</Anchor>
												{:else}
													{author.str}
												{/if}
											{:else}
												{author.str || author}
											{/if}
											{#if i < data.compliance_assessment.authors.filter((a) => !isMaskedPlaceholder(a)).length - 1}, {/if}
										{/each}
									</p>
								</div>
							{/if}
							{#if data.compliance_assessment.reviewers?.length > 0}
								<div>
									<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{safeTranslate('reviewers')}</span>
									<p class="text-sm text-gray-900 mt-1">
										{#each data.compliance_assessment.reviewers.filter((r) => !isMaskedPlaceholder(r)) as reviewer, i}
											{#if reviewer.str && reviewer.id}
												{#if !page.data.user.is_third_party}
													<Anchor href="/users/{reviewer.id}" class="text-[#0077CC] hover:underline">{reviewer.str}</Anchor>
												{:else}
													{reviewer.str}
												{/if}
											{:else}
												{reviewer.str || reviewer}
											{/if}
											{#if i < data.compliance_assessment.reviewers.filter((r) => !isMaskedPlaceholder(r)).length - 1}, {/if}
										{/each}
									</p>
								</div>
							{/if}
						</div>
					</div>
				{/if}

				{#if page.data?.featureflags?.validation_flows}
					<div class="px-5 pb-5 pt-2 border-t border-gray-100">
						{#key compliance_assessment.validation_flows}
							<ValidationFlowsSection validationFlows={compliance_assessment.validation_flows} />
						{/key}
					</div>
				{/if}
			</div>

			<!-- Charts row -->
			{#key compliance_assessment_donut_values}
				<div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
					<div class="flex items-start gap-6">
						{#if data.global_score.score >= 0}
							<div class="flex flex-col justify-center items-center">
								<ProgressRing
									strokeWidth="18px"
									meterStroke={displayScoreColor(
										data.global_score.score,
										data.global_score.max_score
									)}
									value={(data.global_score.score * 100) / data.global_score.max_score}
									size="size-40"
								>
									<p class="font-semibold text-3xl">{data.global_score.score}</p>
								</ProgressRing>
								<div class="text-sm font-semibold py-2 text-gray-600">{m.maturity()}</div>
							</div>
						{/if}
						<div class="flex-1 flex gap-4">
							<div class="flex-1">
								<DonutChart
									s_label="Result"
									name="compliance_result"
									title={m.compliance()}
									orientation="horizontal"
									values={compliance_assessment_donut_values.result.values}
									colors={compliance_assessment_donut_values.result.values.map(
										(object) => object.itemStyle.color
									)}
									showPercentage={true}
								/>
							</div>
							{#if data.compliance_assessment.extended_result_enabled && compliance_assessment_donut_values.extended_result?.values?.length > 0}
								<div class="flex-1">
									<DonutChart
										s_label="Extended Result"
										name="compliance_extended_result"
										title={m.extendedResult()}
										orientation="horizontal"
										values={compliance_assessment_donut_values.extended_result.values}
										colors={compliance_assessment_donut_values.extended_result.values.map(
											(object) => object.itemStyle.color
										)}
										showPercentage={true}
									/>
								</div>
							{/if}
							{#if data.compliance_assessment.progress_status_enabled}
								<div class="flex-1">
									<DonutChart
										s_label="Status"
										name="compliance_status"
										title={m.progress()}
										orientation="horizontal"
										values={compliance_assessment_donut_values.status.values}
										colors={compliance_assessment_donut_values.status.values.map(
											(object) => object.itemStyle.color
										)}
										showPercentage={true}
									/>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/key}

			<!-- Associated Requirements -->
			<div class="bg-white rounded-lg border border-gray-200 shadow-sm">
				<div class="p-5 border-b border-gray-200 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<h2 class="text-base font-semibold text-gray-900">{m.associatedRequirements()}</h2>
						<span class="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
							{#if treeViewNodes}
								{assessableNodesCount(treeViewNodes)}
							{/if}
						</span>
					</div>
					<div class="flex items-center gap-3">
						<button
							class="text-sm text-[#0077CC] hover:text-[#005FA3] font-medium transition-colors"
							onclick={() => {
								if (expandedNodes.length > 0) {
									expandedNodes = [];
								} else if (treeViewNodes) {
									const getAllIds = (nodes) => {
										let ids = [];
										for (const n of nodes) {
											ids.push(n.id);
											if (n.children) ids = [...ids, ...getAllIds(n.children)];
										}
										return ids;
									};
									expandedNodes = getAllIds(treeViewNodes);
								}
							}}
						>
							{expandedNodes.length > 0 ? m.collapseAll() : m.expandAll()}
						</button>
					<Popover
						open={filterPopupOpen}
						onOpenChange={(e) => (filterPopupOpen = e.open)}
						positioning={{ placement: 'bottom-start' }}
						triggerBase="btn bg-[#0A1628] text-white hover:bg-[#1a2740] text-sm px-4 py-2 rounded-lg"
						contentBase="card p-3 bg-white w-fit shadow-lg space-y-3 border border-gray-200 z-10 rounded-xl"
						zIndex="1000"
						autoFocus={false}
						onPointerDownOutside={() => (filterPopupOpen = false)}
						closeOnInteractOutside={false}
					>
						{#snippet trigger()}
							<i class="fa-solid fa-filter mr-2 text-xs"></i>
							{m.filters()}
							{#if filterCount}
								<span class="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-xs">{filterCount}</span>
							{/if}
						{/snippet}
						{#snippet content()}
							<div>
								<span class="text-sm font-bold">{m.result()}</span>
								<div class="flex flex-wrap gap-2 text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg mt-1">
									{#each Object.entries(complianceResultColorMap) as [result, color]}
										<button
											type="button"
											onclick={() => toggleResult(result)}
											class="px-2.5 py-1 rounded-md font-semibold transition-all"
											style="background-color: {selectedResults.includes(result)
												? color
												: '#e5e7eb'}; color: {selectedResults.includes(result)
												? result === 'not_applicable'
													? 'white'
													: 'black'
												: '#6b7280'}; opacity: {selectedResults.includes(result) ? 1 : 0.6};"
										>
											{safeTranslate(result)}
										</button>
									{/each}
								</div>
							</div>
							{#if data.compliance_assessment.progress_status_enabled}
								<div>
									<span class="text-sm font-bold">{m.status()}</span>
									<div class="flex flex-wrap w-fit gap-2 text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg mt-1">
										{#each Object.entries(complianceStatusColorMap) as [status, color]}
											<button
												type="button"
												onclick={() => toggleStatus(status)}
												class="px-2.5 py-1 rounded-md font-semibold transition-all"
												style="background-color: {selectedStatus.includes(status)
													? color + '44'
													: '#e5e7eb'}; color: {selectedStatus.includes(status)
													? darkenColor(color, 0.3)
													: '#6b7280'}; opacity: {selectedStatus.includes(status) ? 1 : 0.6};"
											>
												{safeTranslate(status)}
											</button>
										{/each}
									</div>
								</div>
							{/if}
							{#if data.compliance_assessment.extended_result_enabled}
								<div>
									<span class="text-sm font-bold">{m.extendedResult()}</span>
									<div class="flex flex-wrap w-fit gap-2 text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg mt-1">
										{#each Object.entries(extendedResultColorMap) as [extendedResult, color]}
											<button
												type="button"
												onclick={() => toggleExtendedResult(extendedResult)}
												class="px-2.5 py-1 rounded-md font-semibold transition-all"
												style="background-color: {selectedExtendedResults.includes(extendedResult)
													? color
													: '#e5e7eb'}; color: white; opacity: {selectedExtendedResults.includes(
													extendedResult
												)
													? 1
													: 0.6};"
											>
												{safeTranslate(extendedResult)}
											</button>
										{/each}
									</div>
								</div>
							{/if}
							<div>
								<span class="text-sm font-bold">{m.ShowOnlyAssessable()}</span>
								<div id="toggle" class="flex items-center space-x-4 text-xs mt-1">
									<Switch
										name="questionnaireToggle"
										class="flex flex-row items-center justify-center"
										active="bg-[#0A1628]"
										onCheckedChange={(e) => (displayOnlyAssessableNodes = e.checked)}
										onclick={() => {
											displayOnlyAssessableNodes = !displayOnlyAssessableNodes;
											auditFiltersStore.setDisplayOnlyAssessableNodes(id, displayOnlyAssessableNodes);
										}}
									>
										{#if displayOnlyAssessableNodes}
											<span class="font-bold text-xs text-[#0A1628]">{m.yes()}</span>
										{:else}
											<span class="font-bold text-xs text-gray-500">{m.no()}</span>
										{/if}
									</Switch>
								</div>
							</div>
					{/snippet}
				</Popover>
				</div>
			</div>

			<div class="px-5 py-2">
					<div class="flex items-center text-xs text-gray-400 gap-2 py-2">
						<i class="fa-solid fa-diagram-project"></i>
						<p>{m.mappingInferenceTip()}</p>
					</div>
					{#key data}
						{#key displayOnlyAssessableNodes || selectedStatus || selectedResults || selectedExtendedResults}
							<RecursiveTreeView
								nodes={transformToTreeView(Object.entries(tree))}
								bind:expandedNodes
								hover="hover:bg-initial"
							/>
						{/key}
					{/key}
				</div>
			</div>
		</div>

		<!-- Right sidebar: Actions + Progress -->
		<div class="w-72 flex-shrink-0 space-y-4">
			<!-- Primary action buttons (wathba-style) -->
			<div class="space-y-2">
				{#if canEditObject && !data.compliance_assessment.is_locked && page.data?.featureflags?.validation_flows}
					<button
						class="w-full px-4 py-3 bg-[#0077CC] text-white rounded-lg hover:bg-[#005FA3] transition-colors flex items-center justify-center gap-2 font-medium shadow-sm"
						onclick={() => modalRequestValidation()}
						data-testid="submit-assessment-button"
					>
						<i class="fa-solid fa-paper-plane w-4 h-4"></i>
						{m.requestValidation()}
					</button>
				{:else if canEditObject}
					<Anchor
						breadcrumbAction="push"
						href={`${page.url.pathname}/edit?next=${page.url.pathname}`}
						class="unstyled w-full px-4 py-3 bg-[#0077CC] text-white rounded-lg hover:bg-[#005FA3] transition-colors flex items-center justify-center gap-2 font-medium shadow-sm"
						data-testid="edit-button"
					>
						<i class="fa-solid fa-pen-to-square w-4 h-4"></i>
						<span>{m.edit()}</span>
					</Anchor>
				{/if}

				<Popover
					open={exportPopupOpen}
					onOpenChange={(e) => (exportPopupOpen = e.open)}
					positioning={{ placement: 'bottom' }}
					triggerBase="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
					contentBase="card whitespace-nowrap bg-white py-2 w-fit shadow-lg rounded-xl border border-gray-200"
					zIndex="1000"
				>
					{#snippet trigger()}
						<span data-testid="export-button" class="flex items-center gap-2">
							<i class="fa-solid fa-download w-4 h-4"></i>
							<span>{m.exportButton()}</span>
						</span>
					{/snippet}
					{#snippet content()}
						<div>
							<p class="block px-4 py-2 text-sm font-medium text-gray-800">{m.complianceAssessment()}</p>
							{#if !page.data.user.is_third_party}
								<a href="/compliance-assessments/{data.compliance_assessment.id}/export/csv" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... {m.asCSV()}</a>
								<a href="/compliance-assessments/{data.compliance_assessment.id}/export/xlsx" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... {m.asXLSX()}</a>
								<a href="/compliance-assessments/{data.compliance_assessment.id}/export/word" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... {m.asWord()}</a>
							{/if}
							<a href="/compliance-assessments/{data.compliance_assessment.id}/export" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... {m.asZIP()}</a>
							{#if !page.data.user.is_third_party}
								<div class="border-t border-gray-100 my-1"></div>
								<p class="block px-4 py-2 text-sm font-medium text-gray-800">{m.actionPlan()}</p>
								<a href="/compliance-assessments/{data.compliance_assessment.id}/action-plan/export/csv" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... {m.asCSV()}</a>
								<a href="/compliance-assessments/{data.compliance_assessment.id}/action-plan/export/xlsx" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... {m.asXLSX()}</a>
								<a href="/compliance-assessments/{data.compliance_assessment.id}/action-plan/export/pdf" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... {m.asPDF()}</a>
							{/if}
						</div>
					{/snippet}
				</Popover>

				{#if !page.data.user.is_third_party}
					<Anchor
						href={`${page.url.pathname}/evidences-list`}
						breadcrumbAction="push"
						class="unstyled w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
					>
						<i class="fa-solid fa-paperclip w-4 h-4"></i>
						<span>{m.evidences()}</span>
					</Anchor>

					<Anchor
						href={`${page.url.pathname}/action-plan`}
						breadcrumbAction="push"
						class="unstyled w-full px-4 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
						data-testid="action-plan-button"
					>
						<i class="fa-solid fa-box-archive w-4 h-4"></i>
						<span>{m.actionPlan()}</span>
					</Anchor>
				{/if}
			</div>

		<!-- Progress card -->
		{#key compliance_assessment_donut_values}
			<div class="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
				<h3 class="text-sm font-semibold text-gray-900 mb-4">{m.progress()}</h3>
				{#if data.global_score && data.global_score.score >= 0 && data.global_score.max_score > 0}
					{@const progressPercent = Math.round((data.global_score.score * 100) / data.global_score.max_score)}
					{@const circumference = 2 * Math.PI * 45}
					{@const strokeDashoffset = circumference - (progressPercent / 100) * circumference}
					<div class="flex items-center justify-center mb-4">
						<div class="relative w-28 h-28">
							<svg class="transform -rotate-90" viewBox="0 0 120 120">
								<circle cx="60" cy="60" r="45" fill="none" stroke="#E5E7EB" stroke-width="12" />
								<circle
									cx="60"
									cy="60"
									r="45"
									fill="none"
									stroke="#0891b2"
									stroke-width="12"
									stroke-linecap="round"
									stroke-dasharray={circumference}
									stroke-dashoffset={strokeDashoffset}
									class="transition-all duration-700 ease-out"
								/>
							</svg>
							<div class="absolute inset-0 flex flex-col items-center justify-center">
								<div class="text-2xl font-bold text-gray-900">{progressPercent}%</div>
								<div class="text-[10px] text-gray-500 uppercase tracking-wide">completed</div>
							</div>
						</div>
					</div>
				{/if}
				<!-- Status breakdown -->
				{#if data.compliance_assessment.progress_status_enabled && compliance_assessment_donut_values?.status?.values}
					<div class="space-y-2.5">
						{#each compliance_assessment_donut_values.status.values as statusItem}
							{@const statusKey = statusItem.name}
							{@const mapped = progressStatusMap[statusKey]}
							<div class="flex items-center justify-between text-sm">
								<div class="flex items-center gap-2">
									<span class="w-2.5 h-2.5 rounded-full {mapped?.dotColor ?? 'bg-gray-300'}"></span>
									<span class="text-gray-600">{mapped?.label ?? safeTranslate(statusKey)}</span>
								</div>
								<span class="font-medium text-gray-900">{statusItem.value}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/key}

		<!-- Domains Coverage card -->
		{#if treeCategories.length > 0}
			<div class="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
				<h3 class="text-sm font-semibold text-gray-900 mb-3">{m.domainsCoverage()}</h3>
				<div class="space-y-2">
					{#each treeCategories as cat}
						{@const barWidth = totalTreeRequirements > 0 ? (cat.reqCount / totalTreeRequirements) * 100 : 0}
						<div>
							<div class="flex items-center justify-between text-xs mb-1">
								<span class="text-gray-600 truncate mr-2">{cat.index}. {cat.name}</span>
								<span class="text-gray-400 flex-shrink-0">{cat.reqCount}</span>
							</div>
							<div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
								<div
									class="h-full bg-[#0077CC] rounded-full transition-all duration-500"
									style="width: {barWidth}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Power-ups section -->
		<div class="pt-2 space-y-2">
			<p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">{m.powerUps()}</p>
			{#if !page.data.user.is_third_party && !data.compliance_assessment.is_locked}
				<Anchor
					breadcrumbAction="push"
					href={`${page.url.pathname}/flash-mode`}
					class="unstyled w-full px-4 py-2.5 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors text-sm flex items-center gap-2"
					data-testid="flash-mode-button"
				>
					<i class="fa-solid fa-bolt w-4"></i>
					{m.flashMode()}
				</Anchor>
			{/if}
			{#if !data.compliance_assessment.is_locked}
				<Anchor
					breadcrumbAction="push"
					href={`${page.url.pathname}/table-mode`}
					class="unstyled w-full px-4 py-2.5 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors text-sm flex items-center gap-2"
					data-testid="table-mode-button"
				>
					<i class="fa-solid fa-table-list w-4"></i>
					{m.tableMode()}
				</Anchor>
			{/if}
			{#if !page.data.user.is_third_party}
				<button
					class="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
					onclick={() => modalCreateCloneForm()}
					data-testid="clone-audit-button"
				>
					<i class="fa-solid fa-copy w-4"></i>
					{m.cloneAudit()}
				</button>
				<button
					class="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
					onclick={() => modalCompareAudit()}
					data-testid="compare-audit-button"
				>
					<i class="fa-solid fa-code-compare w-4"></i>
					{m.compareToAudit()}
				</button>
			{/if}

			{#if Object.hasOwn(page.data.user.permissions, 'add_appliedcontrol') && data.compliance_assessment.framework.reference_controls.length > 0 && !data.compliance_assessment.is_locked}
				<button
					class="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
					onclick={() => {
						modalConfirmCreateSuggestedControls(
							data.compliance_assessment.id,
							data.compliance_assessment.name,
							'?/createSuggestedControls'
						);
					}}
				>
					{#if createAppliedControlsLoading}
						<ProgressRing
							strokeWidth="16px"
							meterStroke="stroke-[#0077CC]"
							size="size-5"
						/>
					{:else}
						<i class="fa-solid fa-wand-magic-sparkles w-4"></i>
					{/if}
					{m.suggestControls()}
				</button>
			{/if}
		</div>

		{#if has_threats && !page.data.user.is_third_party}
			<button
				class="w-full px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm flex items-center justify-center gap-2"
				onclick={openThreatsDialog}
			>
				<i class="fa-solid fa-triangle-exclamation"></i>
				<span class="font-bold">{data.threats.total_unique_threats}</span>
				<span>{m.potentialThreats()}</span>
			</button>
		{/if}
		</div>
	</div>
</div>

{#if threatDialogOpen}
	<dialog
		bind:this={dialogElement}
		class="p-6 bg-white shadow-2xl w-2/3 max-h-3/4 overflow-auto rounded-xl border border-gray-200"
		onclose={() => (threatDialogOpen = false)}
	>
		<div class="flex justify-between items-center mb-4">
			<h3 class="text-lg font-bold text-gray-900 capitalize">{m.potentialThreats()}</h3>
			<button class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" onclick={closeThreatsDialog}>
				<i class="fa-solid fa-times text-gray-500"></i>
			</button>
		</div>

		<div class="threats-content">
			<ForceCirclePacking data={data.threats.graph} name="threats_graph" height="h-[600px]" />
		</div>
	</dialog>
{/if}
