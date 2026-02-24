<script lang="ts">
	import { safeTranslate } from '$lib/utils/i18n';
	import { RequirementAssessmentSchema } from '$lib/utils/schemas';
	import type { ActionData, PageData } from './$types';

	import { page } from '$app/state';
	import AutocompleteSelect from '$lib/components/Forms/AutocompleteSelect.svelte';
	import SuperForm from '$lib/components/Forms/Form.svelte';
	import HiddenInput from '$lib/components/Forms/HiddenInput.svelte';
	import Score from '$lib/components/Forms/Score.svelte';
	import Select from '$lib/components/Forms/Select.svelte';
	import MarkdownField from '$lib/components/Forms/MarkdownField.svelte';
	import CreateModal from '$lib/components/Modals/CreateModal.svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { getSecureRedirect } from '$lib/utils/helpers';
	import { ProgressRing, Tabs } from '@skeletonlabs/skeleton-svelte';

	import { complianceResultColorMap } from '$lib/utils/constants';
	import { deserialize } from '$app/forms';
	import { hideSuggestions } from '$lib/utils/stores';
	import { m } from '$paraglide/messages';
	import { countMasked } from '$lib/utils/related-visibility';

	import Question from '$lib/components/Forms/Question.svelte';
	import List from '$lib/components/List/List.svelte';
	import ConfirmModal from '$lib/components/Modals/ConfirmModal.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import Checkbox from '$lib/components/Forms/Checkbox.svelte';
	import { superForm } from 'sveltekit-superforms';
	import {
		getModalStore,
		type ModalComponent,
		type ModalSettings,
		type ModalStore
	} from '$lib/components/Modals/stores';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import {
		computeRequirementScoreAndResult,
		formatScoreValue,
		displayScoreColor
	} from '$lib/utils/helpers';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	interface Props {
		data: PageData;
		form: ActionData;
		[key: string]: any;
	}

	let { data, form, ...rest }: Props = $props();

	const threats = data.requirementAssessment.requirement.associated_threats ?? [];
	const reference_controls =
		data.requirementAssessment.requirement.associated_reference_controls ?? [];
	const annotation = data.requirement.annotation;
	const typical_evidence = data.requirement.typical_evidence;

	const has_threats = threats.length > 0;
	const has_reference_controls = reference_controls.length > 0;

	// Map implementation group ref_ids to their display names
	const implementationGroupsDefinition =
		data.requirementAssessment.compliance_assessment.framework?.implementation_groups_definition ??
		[];

	function getImplementationGroupName(refId: string): string {
		return implementationGroupsDefinition.find((g) => g.ref_id === refId)?.name ?? refId;
	}

	function cancel(): void {
		var currentUrl = window.location.href;
		var url = new URL(currentUrl);
		var nextValue = getSecureRedirect(url.searchParams.get('next'));
		if (nextValue) window.location.href = nextValue;
	}

	const complianceAssessmentURL = `/compliance-assessments/${data.requirementAssessment.compliance_assessment.id}`;
	const schema = RequirementAssessmentSchema;

	const modalStore: ModalStore = getModalStore();

	function modalMeasureCreateForm(): void {
		const modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				form: data.measureCreateForm,
				formAction: '?/createAppliedControl',
				model: data.measureModel,
				debug: false,
				invalidateAll: false,
				origin: 'requirement-assessments',
				suggestions: { reference_control: reference_controls }
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: safeTranslate('add-' + data.measureModel.localName)
		};
		modalStore.trigger(modal);
	}

	function modalEvidenceCreateForm(): void {
		const modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				form: data.evidenceCreateForm,
				formAction: '?/createEvidence',
				model: data.evidenceModel,
				invalidateAll: false,
				debug: false
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: safeTranslate('add-' + data.evidenceModel.localName)
		};
		modalStore.trigger(modal);
	}

	function modalSecurityExceptionCreateForm(): void {
		const modalComponent: ModalComponent = {
			ref: CreateModal,
			props: {
				form: data.securityExceptionCreateForm,
				formAction: '?/createSecurityException',
				model: data.securityExceptionModel,
				invalidateAll: false,
				debug: false
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: safeTranslate('add-' + data.securityExceptionModel.localName)
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
				URLModel: 'requirement-assessments',
				formAction: action,
				bodyComponent: List,
				bodyProps: {
					items: reference_controls,
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
				count: reference_controls.length,
				message: m.theFollowingControlsWillBeAddedColon()
			}),
			response: (r: boolean) => {
				createAppliedControlsLoading = r;
			}
		};
		modalStore.trigger(modal);
	}

	const requirementAssessmentForm = superForm(data.form, {
		dataType: 'json',
		invalidateAll: true,
		applyAction: true,
		resetForm: false,
		validators: zod(schema),
		taintedMessage: false,
		validationMethod: 'auto'
	});

	let mappingInference = $derived({
		sourceRequirementAssessment:
			data.requirementAssessment.mapping_inference.source_requirement_assessment,
		result: data.requirementAssessment.mapping_inference.result,
		annotation: ''
	});

	let requirementAssessmentsList: string[] = $hideSuggestions;

	let hideSuggestion = $state(
		requirementAssessmentsList.includes(data.requirementAssessment.id) ? true : false
	);

	function toggleSuggestions() {
		if (!requirementAssessmentsList.includes(data.requirementAssessment.id)) {
			requirementAssessmentsList.push(data.requirementAssessment.id);
		} else {
			requirementAssessmentsList = requirementAssessmentsList.filter(
				(item) => item !== data.requirementAssessment.id
			);
		}
		hideSuggestion = !hideSuggestion;
		hideSuggestions.set(requirementAssessmentsList);
	}

	let classesText = $derived(
		complianceResultColorMap[mappingInference.result] === '#000000' ? 'text-white' : ''
	);

	let group = $state(page.data.user.is_third_party ? 'evidences' : 'applied_controls');

	// Refresh AutompleteSelect to assign created applied control/evidence
	let refreshKey = $state(false);

	let formStore = $derived(requirementAssessmentForm.form);

	$effect(() => {
		if (form?.newControls) {
			refreshKey = !refreshKey;
			requirementAssessmentForm.form.update(
				(current: Record<string, any>) => ({
					...current,
					applied_controls: [...current.applied_controls, ...form?.newControls]
				}),
				{ taint: false }
			);
			form.newControls = undefined;
			console.debug('formStore', $formStore);
		}
	});

	$effect(() => {
		if (form?.newEvidence) {
			refreshKey = !refreshKey;
			requirementAssessmentForm.form.update(
				(current: Record<string, any>) => ({
					...current,
					evidences: [...current.evidences, form?.newEvidence]
				}),
				{ taint: false }
			);
			form.newEvidence = undefined;
			console.debug('formStore', $formStore);
		}
	});

	$effect(() => {
		if (form?.newSecurityException) {
			refreshKey = !refreshKey;
			requirementAssessmentForm.form.update(
				(current: Record<string, any>) => ({
					...current,
					security_exceptions: [...current.security_exceptions, form?.newSecurityException]
				}),
				{ taint: false }
			);
			form.newSecurityException = undefined;
			console.debug('formStore', $formStore);
		}
	});

	$effect(() => {
		if (createAppliedControlsLoading === true && form) createAppliedControlsLoading = false;
	});

	let computedScoreAndResult = $derived(
		computeRequirementScoreAndResult(data.requirementAssessment, $formStore.answers)
	);

	let computedResult = $derived(computedScoreAndResult.result);
	let computedScore = $derived(computedScoreAndResult.score);

	// AI Analysis state
	let isAnalyzing = $state(false);
	let aiAnalysisResult: any = $state(null);
	let aiAnalysisError: string | null = $state(null);
	let showAnalysisModal = $state(false);
	let showChangeHistory = $state(false);
	let auditEntries: any[] = $state(data.auditLogEntries ?? []);
	let isModalExpanded = $state(false);
	let deletingAnalysisId: string | null = $state(null);
	let selectedAnalysis: any = $state(null);

	// AI Apply state — tracks which fields were populated by "Apply Analysis Results"
	let aiAppliedFields: Set<string> = $state(new Set());
	let aiApplyBannerVisible = $state(false);
	let isApplyingAnalysis = $state(false);
	let applyError: string | null = $state(null);

	// Collapsible sections
	let qaExpanded = $state(false);

	// Keep auditEntries in sync with server data
	$effect(() => {
		auditEntries = data.auditLogEntries ?? [];
	});

	/**
	 * Apply AI analysis results to the form fields without saving to DB.
	 * Routes through the SvelteKit server action to avoid CORS issues.
	 * The user reviews the populated form and clicks Save manually.
	 */
	async function applyAnalysisResults(analysisId: string) {
		isApplyingAnalysis = true;
		applyError = null;

		try {
			console.log('[Apply AI] Calling applyAiAnalysis action with analysis_id:', analysisId);

			const formData = new FormData();
			formData.append('analysisId', analysisId);
			const response = await fetch('?/applyAiAnalysis', {
				method: 'POST',
				body: formData
			});

			const text = await response.text();
			const result = deserialize(text);
			console.log('[Apply AI] Deserialized result:', result);

			if (result.type !== 'success' || !result.data) {
				const errorData = result.type === 'failure' ? (result.data as any) : null;
				applyError = errorData?.applyError || `Failed to apply analysis (${result.type})`;
				console.error('[Apply AI] Error:', applyError);
				return;
			}

			const applyResult = (result.data as any).applyResult;
			if (!applyResult) {
				applyError = 'No analysis results returned from server.';
				return;
			}
			console.log('[Apply AI] Got proposed values:', applyResult);

			// Populate form fields with proposed AI values
			const fieldsChanged = new Set<string>();

			requirementAssessmentForm.form.update(
				(current: Record<string, any>) => {
					const updated = { ...current };

					if (applyResult.proposed_result && applyResult.proposed_result !== current.result) {
						updated.result = applyResult.proposed_result;
						fieldsChanged.add('result');
					}

					if (applyResult.proposed_status && applyResult.proposed_status !== current.status) {
						updated.status = applyResult.proposed_status;
						fieldsChanged.add('status');
					}

					if (applyResult.proposed_observation && applyResult.proposed_observation !== current.observation) {
						updated.observation = applyResult.proposed_observation;
						fieldsChanged.add('observation');
					}

					if (applyResult.proposed_answers && Object.keys(applyResult.proposed_answers).length > 0) {
						updated.answers = applyResult.proposed_answers;
						fieldsChanged.add('answers');
					}

					return updated;
				},
				{ taint: true }
			);

			aiAppliedFields = fieldsChanged;
			aiApplyBannerVisible = fieldsChanged.size > 0;
			console.log('[Apply AI] Fields changed:', [...fieldsChanged]);

			// Close the modal so the user can review the form
			closeModal();

		} catch (e) {
			console.error('[Apply AI] Failed:', e);
			applyError = 'An error occurred while applying analysis results.';
		} finally {
			isApplyingAnalysis = false;
		}
	}

	function dismissApplyBanner() {
		aiApplyBannerVisible = false;
		aiAppliedFields = new Set();
	}

	// Local reactive list of AI analyses — updated immediately on success and synced with server data
	let localAiAnalyses: any[] = $state(data.aiAnalyses || []);

	// Keep local list in sync when server data changes (e.g. after invalidateAll)
	$effect(() => {
		if (data.aiAnalyses) {
			localAiAnalyses = data.aiAnalyses;
		}
	});

	// Metadata/scalar keys to exclude from report sections
	const metadataKeys = new Set([
		'_appliedcontrols', '_appliedControls', 'metadata', 'timestamp', 'model',
		'analysis_config', 'analysisconfig', 'text', 'content', 'message',
		'status', 'compliance_status', 'compliancestatus', 'effectiveness',
		'score', 'compliancelevel', 'compliance_level', 'evidencequality',
		'evidence_quality', 'summary', 'detailedanalysis', 'detailed_analysis',
		'riskassessment', 'risk_assessment', 'note', 'aimodel', 'ai_model',
	]);

	const isReportSection = (key: string, value: any) =>
		typeof value === 'object' && value !== null && !metadataKeys.has(key) && !metadataKeys.has(key.toLowerCase());

	// Case-insensitive field getter
	function getField(obj: Record<string, any>, field: string): any {
		if (obj == null) return undefined;
		const lower = field.toLowerCase();
		for (const key of Object.keys(obj)) {
			if (key.toLowerCase() === lower) return obj[key];
		}
		return undefined;
	}

	// Section display order
	const sectionOrder = [
		'overallassessment', 'questionevaluation', 'questionsanswers',
		'questions_answers', 'typicalevidencecheck', 'typical_evidence_check',
		'appliedcontrolbreakdown', 'applied_control_breakdown',
		'filesanalyzed', 'files_analyzed', 'strengths', 'weaknesses',
		'gaps', 'recommendations', 'findings', 'nextsteps', 'next_steps',
	];

	function getOrderedSections(result: Record<string, any>): [string, any][] {
		const entries = Object.entries(result).filter(([key, val]) => isReportSection(key, val));
		return entries.sort((a, b) => {
			const idxA = sectionOrder.indexOf(a[0].toLowerCase());
			const idxB = sectionOrder.indexOf(b[0].toLowerCase());
			const orderA = idxA === -1 ? sectionOrder.length : idxA;
			const orderB = idxB === -1 ? sectionOrder.length : idxB;
			return orderA - orderB;
		});
	}

	function getStatusColor(status: string): string {
		const s = (status || '').toLowerCase().replace(/[_\s-]+/g, '');
		if (s === 'compliant') return 'text-green-700 bg-green-100';
		if (s === 'partiallycompliant') return 'text-yellow-700 bg-yellow-100';
		if (s === 'noncompliant') return 'text-red-700 bg-red-100';
		if (s === 'notassessed') return 'text-gray-700 bg-gray-100';
		if (s === 'notapplicable') return 'text-blue-700 bg-blue-100';
		return 'text-gray-700 bg-gray-100';
	}

	function getScoreColor(score: number | null): string {
		if (score === null || score === undefined) return 'text-gray-500';
		if (score >= 80) return 'text-green-600';
		if (score >= 50) return 'text-yellow-600';
		return 'text-red-600';
	}

	// Extract top-level scalar fields for the summary bar
	function getScalarField(result: any, ...keys: string[]): any {
		if (!result || typeof result !== 'object') return undefined;
		for (const key of keys) {
			const val = getField(result, key);
			if (val !== undefined && val !== null && typeof val !== 'object') return val;
		}
		return undefined;
	}

	function openAnalysisDetail(analysis: any) {
		selectedAnalysis = analysis;
		showAnalysisModal = true;
	}

	function closeModal() {
		showAnalysisModal = false;
		selectedAnalysis = null;
		isModalExpanded = false;
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleString();
	}

	async function deleteAnalysis(analysisId: string) {
		if (!confirm('Are you sure you want to delete this analysis?')) return;
		deletingAnalysisId = analysisId;
		try {
			const formData = new FormData();
			formData.append('analysisId', analysisId);
			const response = await fetch('?/deleteAiAnalysis', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				localAiAnalyses = localAiAnalyses.filter((a) => a.id !== analysisId);
				await invalidateAll();
			}
		} catch (e) {
			console.error('Failed to delete analysis:', e);
		} finally {
			deletingAnalysisId = null;
		}
	}
</script>

<div class="flex flex-col h-full">
	<!-- ═══════════════════════════════════════════════════════════════════════
	     HEADER BAR
	     ═══════════════════════════════════════════════════════════════════════ -->
	<div class="px-6 pt-5 pb-3 border-b border-gray-100 bg-white">
		{#if data.requirementAssessment.compliance_assessment.is_locked}
			<div class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2.5 rounded-lg mb-3">
				<div class="flex items-center gap-2">
					<i class="fa-solid fa-lock text-yellow-600"></i>
					<span class="font-medium text-sm">{m.lockedAssessment()}</span>
					<span class="text-sm text-yellow-700">{m.lockedRequirementAssessmentMessage()}</span>
				</div>
			</div>
		{/if}

		<div class="flex items-start justify-between mt-2">
			<div class="flex items-start gap-4">
				<a
					href={complianceAssessmentURL}
					class="mt-1 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
					aria-label="Back to assessment"
				>
					<i class="fa-solid fa-arrow-left text-lg"></i>
				</a>
				<div>
					<div class="flex items-center gap-3">
						<h1 class="text-xl font-semibold text-gray-900">{data.requirement.ref_id || data.requirement.urn}</h1>
						<span class="text-xs font-mono text-[#0077CC] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
							{data.requirement.urn}
						</span>
					</div>
					{#if data.requirement.name}
						<p class="text-sm text-gray-500 mt-1 max-w-2xl">{data.requirement.name}</p>
					{/if}
					{#if data.requirement?.implementation_groups?.length > 0}
						<div class="flex gap-1.5 mt-2">
							{#each data.requirement.implementation_groups as ig}
								<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
									{getImplementationGroupName(ig)}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>
			<form
				method="POST"
				action="?/runAiAnalysis"
				use:enhance={() => {
					isAnalyzing = true;
					aiAnalysisResult = null;
					aiAnalysisError = null;
					return async ({ result }) => {
						isAnalyzing = false;
						if (result.type === 'success' && result.data?.aiAnalysis) {
							const aiData = result.data.aiAnalysis;
							aiAnalysisResult = aiData;
							const newEntry = {
								id: aiData.ai_analysis_id,
								created_at: aiData.ai_analysis_updated_at || new Date().toISOString(),
								status: 'completed',
								score: aiData.ai_analysis?.overallAssessment?.score ?? null,
								compliance_status: aiData.proposed_result ?? aiData.ai_analysis?.overallAssessment?.status ?? null,
								gemini_files_count: 0,
								requirements_count: 1,
								result: aiData.ai_analysis,
								question_answers: aiData.question_answers,
							};
							selectedAnalysis = {
								...newEntry,
								result: aiData.ai_analysis,
								question_answers: aiData.question_answers,
								created_at: aiData.ai_analysis_updated_at,
								score: newEntry.score,
								compliance_status: newEntry.compliance_status,
							};
							showAnalysisModal = true;
							await invalidateAll();
						} else if (result.type === 'failure' && result.data?.aiError) {
							aiAnalysisError = result.data.aiError;
						} else {
							aiAnalysisError = 'Unexpected response from server';
						}
					};
				}}
			>
				<button
					type="submit"
					class="flex items-center gap-2 bg-[#0077CC] hover:bg-[#005FA3] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50"
					disabled={isAnalyzing || data.requirementAssessment.compliance_assessment.is_locked}
				>
					{#if isAnalyzing}
						<i class="fa-solid fa-spinner fa-spin"></i>
						<span>Analyzing...</span>
					{:else}
						<i class="fa-solid fa-wand-magic-sparkles"></i>
						<span>Run AI Analysis</span>
					{/if}
				</button>
			</form>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     MAIN CONTENT AREA
	     ═══════════════════════════════════════════════════════════════════════ -->
	<div class="flex-1 overflow-auto">
		<div class="p-6 pb-28 space-y-6">
			<!-- Alerts & Banners -->
			{#if aiAnalysisError}
				<div class="bg-red-50 border border-red-200 rounded-xl p-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2 text-red-700">
							<i class="fa-solid fa-circle-exclamation"></i>
							<span class="font-semibold text-sm">AI Analysis Failed</span>
						</div>
						<button type="button" class="text-red-400 hover:text-red-600" onclick={() => (aiAnalysisError = null)}>
							<i class="fa-solid fa-xmark"></i>
						</button>
					</div>
					<p class="text-red-600 text-sm mt-1">{aiAnalysisError}</p>
				</div>
			{/if}

			{#if applyError}
				<div class="bg-red-50 border border-red-200 rounded-xl p-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2 text-red-700">
							<i class="fa-solid fa-circle-exclamation"></i>
							<span class="font-semibold text-sm">Apply Failed</span>
						</div>
						<button type="button" class="text-red-400 hover:text-red-600" onclick={() => (applyError = null)}>
							<i class="fa-solid fa-xmark"></i>
						</button>
					</div>
					<p class="text-red-600 text-sm mt-1">{applyError}</p>
				</div>
			{/if}

			{#if aiApplyBannerVisible}
				<div class="bg-green-50 border border-green-200 rounded-xl p-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="p-2 bg-green-100 rounded-lg">
								<i class="fa-solid fa-robot text-green-700"></i>
							</div>
							<div>
								<p class="font-semibold text-green-800 text-sm">AI Results Applied</p>
								<p class="text-green-600 text-xs">
									Fields updated: <strong>{[...aiAppliedFields].join(', ')}</strong>. Review and click <strong>Save</strong>.
								</p>
							</div>
						</div>
						<button type="button" class="text-green-400 hover:text-green-600" onclick={dismissApplyBanner}>
							<i class="fa-solid fa-xmark"></i>
						</button>
					</div>
				</div>
			{/if}

			<!-- AI Analyzing Overlay -->
			{#if isAnalyzing}
				<div class="bg-white rounded-xl border border-gray-200 p-10 text-center">
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
						<i class="fa-solid fa-wand-magic-sparkles text-2xl text-[#0077CC] animate-pulse"></i>
					</div>
					<h3 class="text-lg font-semibold text-gray-800 mb-2">Analyzing with AI...</h3>
					<p class="text-gray-500 text-sm">Scanning documents, analyzing compliance, and preparing results.</p>
				</div>
			{/if}

			<!-- ═══════════════════════════════════════════════════════════════
			     3-COLUMN GRID LAYOUT
			     ═══════════════════════════════════════════════════════════════ -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- ────────────────────────────────────────────────────────────
				     LEFT COLUMN (2 of 3)
				     ──────────────────────────────────────────────────────────── -->
				<div class="lg:col-span-2 space-y-6">
					<!-- Description Card -->
					{#if data.requirement.description}
						<div class="bg-white rounded-xl border border-gray-200 p-5">
							<div class="flex items-center gap-2 mb-3">
								<i class="fa-solid fa-circle-info text-gray-400"></i>
								<h3 class="text-sm font-semibold text-gray-900">{m.description()}</h3>
							</div>
							<div class="text-sm text-gray-600 leading-relaxed">
								<MarkdownRenderer content={data.requirement.description} />
							</div>
						</div>
					{/if}

					<!-- Additional Information Card -->
					{#if has_threats || has_reference_controls || annotation || mappingInference.result || typical_evidence}
						<div class="bg-white rounded-xl border border-gray-200 p-5">
							<div class="flex items-center justify-between mb-3">
								<div class="flex items-center gap-2">
									<i class="fa-solid fa-shield text-gray-400"></i>
									<h3 class="text-sm font-semibold text-gray-900">{m.additionalInformation()}</h3>
								</div>
								<button onclick={toggleSuggestions} class="text-gray-400 hover:text-gray-600 transition-colors">
									{#if !hideSuggestion}
										<i class="fa-solid fa-eye"></i>
									{:else}
										<i class="fa-solid fa-eye-slash"></i>
									{/if}
								</button>
							</div>
							{#if !hideSuggestion}
								{#if typical_evidence}
									<div class="bg-blue-50/70 rounded-lg p-4 border border-blue-100 mb-3">
										<div class="flex items-center gap-2 mb-2">
											<i class="fa-solid fa-file-lines text-blue-600 text-xs"></i>
											<span class="text-xs font-semibold text-blue-700 uppercase tracking-wide">{m.typicalEvidence()}</span>
										</div>
										<div class="text-sm text-gray-700 leading-relaxed">
											<MarkdownRenderer content={typical_evidence} />
										</div>
									</div>
								{/if}
								{#if annotation}
									<div class="mb-3">
										<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
											<i class="fa-solid fa-pencil mr-1"></i>{m.annotation()}
										</p>
										<div class="text-sm text-gray-600 leading-relaxed">
											<MarkdownRenderer content={annotation} />
										</div>
									</div>
								{/if}
								{#if has_reference_controls}
									<div class="mb-3">
										<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
											<i class="fa-solid fa-gears mr-1"></i>{m.suggestedReferenceControls()}
										</p>
										<ul class="list-disc ml-4 text-sm text-gray-600">
											{#each reference_controls as func}
												<li>
													{#if func.id}
														<a class="text-[#0077CC] hover:underline" href="/reference-controls/{func.id}">{func.str}</a>
													{:else}
														{func.str}
													{/if}
												</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if has_threats}
									<div class="mb-3">
										<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
											<i class="fa-solid fa-triangle-exclamation mr-1"></i>{m.threatsCovered()}
										</p>
										<ul class="list-disc ml-4 text-sm text-gray-600">
											{#each threats as threat}
												<li>
													{#if threat.id}
														<a class="text-[#0077CC] hover:underline" href="/threats/{threat.id}">{threat.str}</a>
													{:else}
														{threat.str}
													{/if}
												</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if mappingInference.result}
									<div class="mb-3">
										<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
											<i class="fa-solid fa-link mr-1"></i>{m.mappingInference()}
										</p>
										<span class="text-xs text-gray-400"><i class="fa-solid fa-circle-info mr-1"></i>{m.mappingInferenceHelpText()}</span>
										<div class="mt-2 text-sm text-gray-600">
											<a class="text-[#0077CC] hover:underline" href="/requirement-assessments/{mappingInference.sourceRequirementAssessment.id}">
												{mappingInference.sourceRequirementAssessment.str}
											</a>
											<span class="ml-2 badge h-fit">{safeTranslate(mappingInference.sourceRequirementAssessment.coverage)}</span>
											<span
												class="ml-2 badge {classesText} h-fit"
												style="background-color: {complianceResultColorMap[mappingInference.result]};"
											>
												{safeTranslate(mappingInference.result)}
											</span>
										</div>
									</div>
								{/if}
							{/if}
						</div>
					{/if}

					<!-- SuperForm: Tabs + Questions -->
					<SuperForm
						class="flex flex-col"
						_form={requirementAssessmentForm}
						data={data.form}
						action="?/updateRequirementAssessment"
						{...rest}
					>
						{#snippet children({ form, data: formData })}
							<HiddenInput {form} field="folder" />
							<HiddenInput {form} field="requirement" />
							<HiddenInput {form} field="compliance_assessment" />

							<!-- Tabs Card -->
							<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
								<Tabs
									value={group}
									onValueChange={(e) => { group = e.value; }}
								>
									{#snippet list()}
										{#if !page.data.user.is_third_party}
											<Tabs.Control value="applied_controls">{m.appliedControls()}</Tabs.Control>
										{/if}
										<Tabs.Control value="evidences">{m.evidences()}</Tabs.Control>
										<Tabs.Control value="security_exceptions">{m.securityExceptions()}</Tabs.Control>
									{/snippet}
									{#snippet content()}
										<Tabs.Panel value="applied_controls">
											<div class="flex items-center mb-2 px-2 text-xs space-x-2 text-gray-500">
												<i class="fa-solid fa-info-circle"></i>
												<p>{m.requirementAppliedControlHelpText()}</p>
											</div>
											<div class="h-full flex flex-col space-y-2 rounded-container p-4">
												<span class="flex flex-row justify-end items-center space-x-2">
													{#if Object.hasOwn(page.data.user.permissions, 'add_appliedcontrol') && reference_controls.length > 0}
														<button
															class="flex items-center gap-1.5 text-sm font-medium text-[#0077CC] hover:text-[#005FA3] transition-colors"
															type="button"
															onclick={() => {
																modalConfirmCreateSuggestedControls(
																	page.data.requirementAssessment.id,
																	page.data.requirementAssessment.name,
																	'?/createSuggestedControls'
																);
															}}
														>
															{#if createAppliedControlsLoading}
																<ProgressRing strokeWidth="16px" meterStroke="stroke-[#0077CC]" size="size-4" />
															{:else}
																<i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
															{/if}
															{m.suggestControls()}
														</button>
													{/if}
													<button
														class="flex items-center gap-1.5 text-sm font-medium text-[#0077CC] hover:text-[#005FA3] transition-colors"
														onclick={modalMeasureCreateForm}
														type="button"
													>
														<i class="fa-solid fa-plus text-xs"></i>
														{m.addAppliedControl()}
													</button>
												</span>
												{#key refreshKey}
													<AutocompleteSelect
														multiple
														{form}
														optionsEndpoint="applied-controls"
														optionsDetailedUrlParameters={[
															['scope_folder_id', page.data.requirementAssessment.folder.id]
														]}
														optionsExtraFields={[['folder', 'str']]}
														field="applied_controls"
														placeholder={m.appliedControlsPlaceholder()}
													/>
												{/key}
												<ModelTable
													baseEndpoint="/applied-controls?requirement_assessments={page.data.requirementAssessment.id}"
													source={page.data.tables['applied-controls']}
													hideFilters={true}
													URLModel="applied-controls"
													expectedCount={countMasked(page.data.requirementAssessment.applied_controls)}
												/>
											</div>
										</Tabs.Panel>
										<Tabs.Panel value="evidences">
											<div class="flex items-center mb-2 px-2 text-xs space-x-2 text-gray-500">
												<i class="fa-solid fa-info-circle"></i>
												<p>{m.requirementEvidenceHelpText()}</p>
											</div>
											<div class="h-full flex flex-col space-y-2 rounded-container p-4">
												<span class="flex flex-row justify-end items-center">
													<button
														class="flex items-center gap-1.5 text-sm font-medium text-[#0077CC] hover:text-[#005FA3] transition-colors"
														onclick={modalEvidenceCreateForm}
														type="button"
													>
														<i class="fa-solid fa-plus text-xs"></i>
														{m.addEvidence()}
													</button>
												</span>
												{#key refreshKey}
													<AutocompleteSelect
														multiple
														{form}
														optionsEndpoint="evidences"
														optionsExtraFields={[['folder', 'str']]}
														optionsDetailedUrlParameters={[
															['scope_folder_id', page.data.requirementAssessment.folder.id]
														]}
														field="evidences"
													/>
												{/key}
												<ModelTable
													source={page.data.tables['evidences']}
													hideFilters={true}
													URLModel="evidences"
													expectedCount={countMasked(page.data.requirementAssessment.evidences)}
													baseEndpoint="/evidences?requirement_assessments={page.data.requirementAssessment.id}"
												/>
											</div>
										</Tabs.Panel>
										<Tabs.Panel value="security_exceptions">
											<div class="h-full flex flex-col space-y-2 rounded-container p-4">
												<span class="flex flex-row justify-end items-center">
													<button
														class="flex items-center gap-1.5 text-sm font-medium text-[#0077CC] hover:text-[#005FA3] transition-colors"
														onclick={modalSecurityExceptionCreateForm}
														type="button"
													>
														<i class="fa-solid fa-plus text-xs"></i>
														{m.addSecurityException()}
													</button>
												</span>
												{#key refreshKey}
													<AutocompleteSelect
														multiple
														{form}
														optionsEndpoint="security-exceptions"
														optionsExtraFields={[['folder', 'str']]}
														field="security_exceptions"
													/>
												{/key}
												<ModelTable
													source={page.data.tables['security-exceptions']}
													hideFilters={true}
													URLModel="security-exceptions"
													expectedCount={countMasked(page.data.requirementAssessment.security_exceptions)}
													baseEndpoint="/security-exceptions?requirement_assessments={page.data.requirementAssessment.id}"
												/>
											</div>
										</Tabs.Panel>
									{/snippet}
								</Tabs>
							</div>

							<!-- AI Questions Section (collapsible) -->
							{#if page.data.requirementAssessment.requirement.questions != null && Object.keys(page.data.requirementAssessment.requirement.questions).length !== 0}
								<div class="bg-white rounded-xl border border-gray-200 overflow-hidden mt-6">
									<button
										type="button"
										onclick={() => (qaExpanded = !qaExpanded)}
										class="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors"
									>
										<div class="flex items-center gap-2.5">
											<i class="fa-solid fa-robot text-[#0077CC]"></i>
											<h3 class="text-sm font-semibold text-gray-900">{m.questionSingular()}</h3>
											{#if aiAppliedFields.has('answers')}
												<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
													<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
												</span>
											{/if}
										</div>
										<i class="fa-solid {qaExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400"></i>
									</button>
									{#if qaExpanded}
										<div class="px-5 pb-5">
											<Question
												{form}
												field="answers"
												questions={page.data.requirementAssessment.requirement.questions}
												label={m.questionSingular()}
											/>
										</div>
									{/if}
								</div>
							{/if}

							<!-- Observation (full width, below grid on mobile, below left col on desktop) -->
							<div class="bg-white rounded-xl border border-gray-200 p-5 mt-6">
								<div class="flex items-center justify-between mb-3">
									<div class="flex items-center gap-2">
										<label class="text-sm font-semibold text-gray-900">Observation</label>
										{#if aiAppliedFields.has('observation')}
											<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
												<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
											</span>
										{/if}
									</div>
								</div>
								<MarkdownField {form} field="observation" label="" />
							</div>

							<!-- Save Bar — NOT sticky here; we put it at the page bottom -->
						{/snippet}
					</SuperForm>
				</div>

				<!-- ────────────────────────────────────────────────────────────
				     RIGHT SIDEBAR (1 of 3)
				     ──────────────────────────────────────────────────────────── -->
				<div class="space-y-5">
					<!-- Status / Result / Scoring Card -->
					<div class="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
						<!-- Status -->
						<div>
							<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
								<i class="fa-solid fa-clock text-xs"></i>
								{m.status()}
								{#if aiAppliedFields.has('status')}
									<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">AI</span>
								{/if}
							</label>
							<Select
								form={requirementAssessmentForm}
								options={page.data.model.selectOptions['status']}
								field="status"
								label=""
							/>
						</div>

						<!-- Result -->
						<div class="border-t border-gray-100 pt-5">
							<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
								{#if computedResult}
									{#if computedResult === 'compliant'}
										<i class="fa-solid fa-circle-check text-green-600 text-xs"></i>
									{:else if computedResult === 'partially_compliant'}
										<i class="fa-solid fa-triangle-exclamation text-amber-600 text-xs"></i>
									{:else if computedResult === 'non_compliant'}
										<i class="fa-solid fa-circle-xmark text-red-600 text-xs"></i>
									{:else}
										<i class="fa-solid fa-circle-info text-gray-400 text-xs"></i>
									{/if}
								{:else}
									<i class="fa-solid fa-circle-info text-gray-400 text-xs"></i>
								{/if}
								{m.result()}
								{#if aiAppliedFields.has('result')}
									<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">AI</span>
								{/if}
							</label>
							{#if computedResult}
								<div class="flex items-center gap-2">
									<span
										class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium"
										style="background-color: {complianceResultColorMap[computedResult] || '#e5e7eb'}44; color: {complianceResultColorMap[computedResult] || '#666'}"
									>
										{safeTranslate(computedResult)}
									</span>
								</div>
							{:else}
								<Select
									form={requirementAssessmentForm}
									options={page.data.model.selectOptions['result']}
									field="result"
									label=""
								/>
							{/if}
						</div>

						<!-- Extended Result -->
						{#if page.data.requirementAssessment.compliance_assessment.extended_result_enabled}
							<div class="border-t border-gray-100 pt-5">
								<Select
									form={requirementAssessmentForm}
									options={page.data.model.selectOptions['extended_result']}
									field="extended_result"
									label={m.extendedResult()}
								/>
							</div>
						{/if}

						<!-- Scoring -->
						<div class="border-t border-gray-100 pt-5">
							{#if computedScore !== null}
								<div class="flex items-center gap-3">
									<span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">{m.score()}</span>
									<ProgressRing
										strokeWidth="20px"
										meterStroke={displayScoreColor(
											computedScore,
											page.data.compliance_assessment_score.max_score
										)}
										value={formatScoreValue(
											computedScore || 0,
											page.data.compliance_assessment_score.max_score
										)}
										classes="shrink-0"
										size="size-10">{computedScore}</ProgressRing
									>
								</div>
							{:else}
								<Score
									form={requirementAssessmentForm}
									min_score={page.data.compliance_assessment_score.min_score}
									max_score={page.data.compliance_assessment_score.max_score}
									scores_definition={page.data.compliance_assessment_score.scores_definition}
									field="score"
									label={page.data.compliance_assessment_score.show_documentation_score
										? m.implementationScore()
										: m.score()}
									disabled={!data.is_scored || data.result === 'not_applicable'}
								>
									{#snippet left()}
										<div>
											<Checkbox
												form={requirementAssessmentForm}
												field="is_scored"
												label={''}
												helpText={m.scoringHelpText()}
												checkboxComponent="switch"
												classes="h-full flex flex-row items-center justify-center my-1"
												classesContainer="h-full flex flex-row items-center space-x-4"
											/>
										</div>
									{/snippet}
								</Score>
								{#if page.data.compliance_assessment_score.show_documentation_score}
									<div class="mt-3">
										<Score
											form={requirementAssessmentForm}
											min_score={page.data.compliance_assessment_score.min_score}
											max_score={page.data.compliance_assessment_score.max_score}
											scores_definition={page.data.compliance_assessment_score.scores_definition}
											field="documentation_score"
											label={m.documentationScore()}
											isDoc={true}
											disabled={!data.is_scored || data.result === 'not_applicable'}
										/>
									</div>
								{/if}
							{/if}
						</div>
					</div>

					<!-- AI Applied Badge -->
					{#if aiApplyBannerVisible}
						<div class="bg-green-50 border border-green-200 rounded-xl p-4">
							<div class="flex items-center gap-2 mb-2">
								<i class="fa-solid fa-robot text-green-600"></i>
								<span class="text-sm font-semibold text-green-800">AI Results Applied</span>
							</div>
							<div class="flex items-center gap-2 text-xs text-green-700">
								<span>Fields: {[...aiAppliedFields].join(', ')}</span>
							</div>
						</div>
					{/if}

					<!-- AI History Card (compact) -->
					{#if localAiAnalyses && localAiAnalyses.length > 0}
						<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
							<div class="p-4 border-b border-gray-100 flex items-center justify-between">
								<div class="flex items-center gap-2">
									<i class="fa-solid fa-wand-magic-sparkles text-gray-400 text-xs"></i>
									<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">AI History</h3>
								</div>
								<span class="text-xs text-gray-400">{localAiAnalyses.length}</span>
							</div>
							<div class="divide-y divide-gray-50">
								{#each localAiAnalyses.slice(0, 5) as analysis}
									<div class="px-4 py-3 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
										<div>
											<div class="flex items-center gap-2">
												<span class="w-1.5 h-1.5 rounded-full flex-shrink-0 {
													analysis.status === 'completed' ? 'bg-green-500' :
													analysis.status === 'in_progress' ? 'bg-blue-500' : 'bg-red-500'
												}"></span>
												<span class="text-xs text-gray-600 tabular-nums">{formatDate(analysis.created_at)}</span>
											</div>
											{#if analysis.gemini_files_count !== undefined}
												<span class="text-[11px] text-gray-400 ml-3.5">{analysis.gemini_files_count} files analyzed</span>
											{/if}
										</div>
										<div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
											<button
												type="button"
												onclick={() => openAnalysisDetail(analysis)}
												class="p-1 text-gray-400 hover:text-[#0077CC] rounded transition-colors"
												title="View analysis"
											>
												<i class="fa-solid fa-eye text-xs"></i>
											</button>
											<button
												type="button"
												onclick={() => deleteAnalysis(analysis.id)}
												class="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
												title="Delete analysis"
												disabled={deletingAnalysisId === analysis.id}
											>
												{#if deletingAnalysisId === analysis.id}
													<i class="fa-solid fa-spinner fa-spin text-xs"></i>
												{:else}
													<i class="fa-solid fa-trash text-xs"></i>
												{/if}
											</button>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Change History Card (compact) -->
					<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
						<button
							type="button"
							class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
							onclick={() => (showChangeHistory = !showChangeHistory)}
						>
							<div class="flex items-center gap-2">
								<i class="fa-solid fa-clock-rotate-left text-gray-400 text-xs"></i>
								<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Change Log</h3>
								{#if auditEntries.length > 0}
									<span class="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{auditEntries.length}</span>
								{/if}
							</div>
							<i class="fa-solid {showChangeHistory ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400 text-xs"></i>
						</button>
						{#if showChangeHistory}
							<div class="px-4 pb-4">
								{#if auditEntries.length === 0}
									<div class="text-center py-6 text-gray-400">
										<i class="fa-solid fa-clock-rotate-left text-xl mb-2"></i>
										<p class="text-xs">No changes recorded yet.</p>
									</div>
								{:else}
									<div class="space-y-2">
										{#each auditEntries.slice(0, 10) as entry}
											<div class="border border-gray-100 rounded-lg overflow-hidden">
												<div class="bg-gray-50 px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
													<span class="text-[11px] text-gray-500 tabular-nums">{new Date(entry.timestamp).toLocaleString()}</span>
													<span class="text-[11px] font-mono text-gray-500">
														{#if entry.actor}
															{#if entry.actor.toLowerCase().includes('ai') || entry.actor.toLowerCase().includes('service')}
																<i class="fa-solid fa-robot text-blue-500 mr-1"></i>
															{/if}
															{entry.actor}
														{:else}
															System
														{/if}
													</span>
												</div>
												{#if entry.changes && typeof entry.changes === 'object'}
													<div class="px-3 py-2 space-y-1">
														{#each Object.entries(entry.changes) as [field, change]}
															<div class="flex items-center gap-1.5 text-[11px] font-mono text-gray-600">
																<span class="text-[#0077CC] font-medium">{field}:</span>
																{#if Array.isArray(change) && change.length >= 2}
																	<span class="text-gray-400">{typeof change[0] === 'object' ? JSON.stringify(change[0]) : change[0]}</span>
																	<i class="fa-solid fa-arrow-right text-gray-300 text-[8px]"></i>
																	<span class="text-gray-800">{typeof change[1] === 'object' ? JSON.stringify(change[1]) : change[1]}</span>
																{:else}
																	<span class="text-gray-500">{JSON.stringify(change)}</span>
																{/if}
															</div>
														{/each}
													</div>
												{/if}
											</div>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     STICKY BOTTOM SAVE BAR
	     ═══════════════════════════════════════════════════════════════════════ -->
	<div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-3.5 flex items-center justify-between z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
		<button
			type="button"
			onclick={cancel}
			class="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
		>
			{m.cancel()}
		</button>
		<div class="flex items-center gap-3">
			<button
				type="button"
				class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				data-testid="save-no-continue-button"
				onclick={() => {
					const formEl = document.querySelector('form[action="?/updateRequirementAssessment"]');
					if (formEl) {
						requirementAssessmentForm.form.update((d) => ({ ...d, noRedirect: true }));
						(formEl as HTMLFormElement).requestSubmit();
					}
				}}
			>
				{m.saveAndContinue()}
			</button>
			<button
				type="button"
				class="px-6 py-2.5 text-sm font-medium text-white bg-[#0077CC] hover:bg-[#005FA3] rounded-lg transition-colors shadow-sm"
				data-testid="save-button"
				onclick={() => {
					const formEl = document.querySelector('form[action="?/updateRequirementAssessment"]');
					if (formEl) (formEl as HTMLFormElement).requestSubmit();
				}}
			>
				{m.save()}
			</button>
		</div>
	</div>
</div>

<!-- ═══════════════════════════════════════════════════════════════════════════
     AI ANALYSIS REPORT MODAL
     ═══════════════════════════════════════════════════════════════════════════ -->
{#if showAnalysisModal && selectedAnalysis}
	{@const result = selectedAnalysis.result || selectedAnalysis}
	{@const appliedControls = result._appliedControls || []}
	{@const questionAnswers = selectedAnalysis.question_answers || {}}
	{@const questionAnswerEntriesFromDb = Object.values(questionAnswers)}
	{@const questionAnswerEntriesFromResult = (() => {
		if (questionAnswerEntriesFromDb.length > 0) return [];
		if (!result || typeof result !== 'object') return [];
		for (const key of Object.keys(result)) {
			const lower = key.toLowerCase().replace(/_/g, '');
			if (['questionevaluation', 'questionsanswers', 'questionanswers', 'questionsandanswers'].includes(lower)) {
				const section = result[key];
				if (Array.isArray(section)) {
					return section.map((item, idx) => {
						if (typeof item !== 'object' || !item) return { question: `Question ${idx + 1}`, answer: 'Partial' };
						const qText = item.question || item.text || item.questionText || `Question ${idx + 1}`;
						let rawAnswer = item.answer || item.answered || item.selectedChoice || item.value || item.response || '';
						const normalized = typeof rawAnswer === 'string' ? rawAnswer.trim() : String(rawAnswer);
						const lower = normalized.toLowerCase();
						const answer = lower === 'yes' ? 'Yes' : lower === 'no' ? 'No' : 'Partial';
						return {
							question: qText,
							answer,
							source: item.source || item.sourceFile || item.appliedControl || item.applied_control || null,
							justification: item.justification || item.explanation || item.reasoning || item.notes || null,
						};
					});
				}
				break;
			}
		}
		return [];
	})()}
	{@const questionAnswerEntries = questionAnswerEntriesFromDb.length > 0 ? questionAnswerEntriesFromDb : questionAnswerEntriesFromResult}
	{@const score = selectedAnalysis.score ?? getScalarField(result, 'score') ?? getField(getField(result, 'overallAssessment') || {}, 'score')}
	{@const complianceStatus = selectedAnalysis.compliance_status ?? getScalarField(result, 'compliance_status', 'complianceStatus', 'status') ?? getField(getField(result, 'overallAssessment') || {}, 'status')}
	{@const evidenceQuality = getScalarField(result, 'evidenceQuality', 'evidence_quality')}
	{@const summaryText = getScalarField(result, 'summary') ?? getField(getField(result, 'overallAssessment') || {}, 'summary')}
	{@const markdownText = result.text || result.content || result.message}

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	>
		<!-- Backdrop -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onclick={closeModal}></div>

		<!-- Modal Content -->
		<div
			class="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
			class:w-full={isModalExpanded}
			class:h-full={isModalExpanded}
			class:max-w-2xl={!isModalExpanded}
			class:max-h-[90vh]={!isModalExpanded}
			class:inset-0={isModalExpanded}
			class:absolute={isModalExpanded}
			style={isModalExpanded ? 'max-width:100%;max-height:100%;border-radius:0;' : 'width:95vw;'}
		>
			<!-- Modal Header -->
			<div class="flex items-start justify-between p-5 border-b border-gray-200 bg-gray-50 flex-shrink-0">
				<div class="flex-1 min-w-0">
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs font-mono font-semibold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded">
							{data.requirement.ref_id || data.requirement.urn}
						</span>
						<div class="flex items-center gap-1 text-xs text-[#0077CC]">
							<i class="fa-solid fa-robot text-xs"></i>
							<span class="font-medium">AI Analysis Report</span>
						</div>
					</div>
					<h2 class="text-base font-semibold text-gray-900">{data.requirement.name || data.requirement.urn}</h2>
					{#if selectedAnalysis?.created_at}
						<p class="text-xs text-gray-500 mt-0.5">{formatDate(selectedAnalysis.created_at)}</p>
					{/if}
				</div>
				<div class="flex items-center gap-1 ml-3 flex-shrink-0">
					<button
						type="button"
						class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						onclick={() => (isModalExpanded = !isModalExpanded)}
						title={isModalExpanded ? 'Restore size' : 'Expand fullscreen'}
					>
						<i class="fa-solid {isModalExpanded ? 'fa-compress' : 'fa-expand'} text-gray-500"></i>
					</button>
					<button
						type="button"
						class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						onclick={closeModal}
					>
						<i class="fa-solid fa-xmark text-gray-500"></i>
					</button>
				</div>
			</div>

			<!-- Modal Body -->
			<div class="overflow-y-auto flex-1">
				<!-- Compliance Status + Confidence -->
				<div class="p-5 border-b border-gray-100">
					<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Compliance Status</h3>
					<div class="flex items-start gap-4">
						<div class="flex-1">
							{#if complianceStatus}
								<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium {getStatusColor(complianceStatus)}">
									<span class="w-2 h-2 rounded-full flex-shrink-0 {
										complianceStatus.toLowerCase().includes('compliant') && !complianceStatus.toLowerCase().includes('non') && !complianceStatus.toLowerCase().includes('partial') ? 'bg-green-500' :
										complianceStatus.toLowerCase().includes('partial') ? 'bg-amber-500' :
										complianceStatus.toLowerCase().includes('non') ? 'bg-red-500' : 'bg-gray-400'
									}"></span>
									{complianceStatus}
								</span>
							{:else}
								<span class="text-gray-400">Not assessed</span>
							{/if}
						</div>
						{#if score !== undefined && score !== null}
							<div class="flex-shrink-0 text-center">
								<div class="text-2xl font-bold tabular-nums {getScoreColor(typeof score === 'number' ? score : null)}">
									{score}{typeof score === 'number' ? '%' : ''}
								</div>
								<div class="text-xs text-gray-400 mb-1.5">AI Confidence</div>
								<div class="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
									<div
										class="h-full rounded-full transition-all {typeof score === 'number' && score >= 80 ? 'bg-green-500' : typeof score === 'number' && score >= 50 ? 'bg-amber-500' : 'bg-red-500'}"
										style="width: {typeof score === 'number' ? score : 0}%"
									></div>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Summary -->
				{#if summaryText && typeof summaryText === 'string'}
					<div class="p-5 border-b border-gray-100">
						<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Summary</h3>
						<div class="bg-gray-50 rounded-xl border border-gray-200 p-4">
							<div class="flex items-center gap-2 mb-2.5">
								<i class="fa-solid fa-robot text-[#0077CC]"></i>
								<span class="text-xs font-semibold text-[#0077CC]">AI Analysis</span>
							</div>
							<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{summaryText}</p>
						</div>
					</div>
				{/if}

				<!-- Markdown content -->
				{#if markdownText && typeof markdownText === 'string'}
					<div class="p-5 border-b border-gray-100">
						<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Analysis Report</h3>
						<div class="prose prose-sm max-w-none text-gray-700">
							<MarkdownRenderer content={markdownText} />
						</div>
					</div>
				{/if}

				<!-- Question Answers -->
				{#if questionAnswerEntries.length > 0}
					<div class="p-5 border-b border-gray-100">
						<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
							AI Analysis Details
							<span class="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full ml-1">{questionAnswerEntries.length} questions</span>
						</h3>
						<div class="space-y-3">
							{#each questionAnswerEntries as qa, i}
								<div class="bg-gray-50 rounded-xl border border-gray-100 p-4">
									<div class="flex items-start justify-between gap-4">
										<div class="flex-1 min-w-0">
											<div class="flex items-center gap-2 mb-2">
												<span class="text-[11px] font-semibold text-gray-400 uppercase">Q{i + 1}</span>
											</div>
											<p class="text-sm text-gray-700 leading-relaxed">{qa.question || qa.q_ar || `Question ${i + 1}`}</p>
											{#if qa.justification}
												<p class="text-xs text-gray-500 mt-1.5 bg-white rounded p-2 border border-gray-100">{qa.justification}</p>
											{/if}
										</div>
										<div class="flex items-center gap-2 flex-shrink-0 pt-1">
											{@const ans = (qa.answer || '').toLowerCase()}
											<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {
												ans === 'yes' ? 'bg-green-50 text-green-700' :
												ans === 'no' ? 'bg-red-50 text-red-700' :
												'bg-amber-50 text-amber-700'
											}">
												{qa.answer || 'Partial'}
											</span>
											{#if qa.confidence !== undefined && qa.confidence !== null}
												<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums {
													Number(qa.confidence) >= 80 || Number(qa.confidence) >= 0.8 ? 'text-green-600 bg-green-50' :
													Number(qa.confidence) >= 50 || Number(qa.confidence) >= 0.5 ? 'text-amber-600 bg-amber-50' :
													'text-red-600 bg-red-50'
												}">
													{Number(qa.confidence) <= 1 ? Math.round(Number(qa.confidence) * 100) : Math.round(Number(qa.confidence))}%
												</span>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Evidence Sources -->
				{#if appliedControls.length > 0}
					<div class="p-5 border-b border-gray-100">
						<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Evidence Sources</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
							{#each appliedControls as ac}
								<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
									<div class="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
										<i class="fa-solid fa-shield-halved text-indigo-600 text-sm"></i>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-medium text-gray-800 text-sm truncate">{ac.name}</p>
										<p class="text-xs text-gray-500">
											{ac.evidenceCount ?? 0} evidence{(ac.evidenceCount ?? 0) !== 1 ? 's' : ''}
											· {ac.fileNames?.length || 0} file{(ac.fileNames?.length || 0) !== 1 ? 's' : ''}
										</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Structured sections -->
				{#if typeof result === 'object' && !markdownText}
					{#each getOrderedSections(result) as [sectionKey, sectionValue]}
						<div class="p-5 border-b border-gray-100">
							<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 capitalize">
								{sectionKey.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
							</h3>
							<div>
								{#if typeof sectionValue === 'string'}
									<p class="text-sm text-gray-700 whitespace-pre-wrap">{sectionValue}</p>
								{:else if Array.isArray(sectionValue)}
									{#if sectionValue.length === 0}
										<p class="text-gray-400 text-sm italic">No items</p>
									{:else}
										<ul class="space-y-2">
											{#each sectionValue as item}
												{#if typeof item === 'string'}
													<li class="flex items-start gap-2 text-sm text-gray-700">
														<i class="fa-solid fa-circle text-gray-300 mt-1.5 text-[6px] shrink-0"></i>
														{item}
													</li>
												{:else if typeof item === 'object' && item !== null}
													<li class="bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm">
														{#each Object.entries(item) as [k, v]}
															<div class="mb-1">
																<span class="font-medium text-gray-600 capitalize">{k.replace(/_/g, ' ')}:</span>
																<span class="text-gray-700 ml-1">{typeof v === 'object' ? JSON.stringify(v) : v}</span>
															</div>
														{/each}
													</li>
												{:else}
													<li class="text-gray-700 text-sm">{JSON.stringify(item)}</li>
												{/if}
											{/each}
										</ul>
									{/if}
								{:else if typeof sectionValue === 'object' && sectionValue !== null}
									<div class="space-y-2">
										{#each Object.entries(sectionValue) as [k, v]}
											<div class="flex items-start gap-2 text-sm">
												<span class="font-medium text-gray-600 capitalize min-w-[140px] shrink-0">{k.replace(/_/g, ' ')}:</span>
												{#if typeof v === 'string'}
													<span class="text-gray-700">{v}</span>
												{:else}
													<pre class="text-xs text-gray-700 bg-gray-50 rounded p-2 flex-1 overflow-x-auto">{JSON.stringify(v, null, 2)}</pre>
												{/if}
											</div>
										{/each}
									</div>
								{:else}
									<p class="text-gray-700 text-sm">{JSON.stringify(sectionValue)}</p>
								{/if}
							</div>
						</div>
					{/each}

					<!-- Fallback: raw JSON -->
					{#if getOrderedSections(result).length === 0 && !summaryText}
						{@const displayResult = Object.fromEntries(
							Object.entries(result).filter(([k]) => !metadataKeys.has(k) && !metadataKeys.has(k.toLowerCase()))
						)}
						{#if Object.keys(displayResult).length > 0}
							<div class="p-5">
								<div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
									<pre class="whitespace-pre-wrap text-gray-700 text-xs">{JSON.stringify(displayResult, null, 2)}</pre>
								</div>
							</div>
						{/if}
					{/if}
				{/if}
			</div>

			<!-- Modal Footer -->
			<div class="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between flex-shrink-0">
				<button
					type="button"
					onclick={closeModal}
					class="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors"
				>
					Close
				</button>
				<button
					type="button"
					class="flex items-center gap-2 text-sm font-semibold text-white bg-[#0077CC] hover:bg-[#005FA3] px-5 py-2.5 rounded-xl transition-colors shadow-sm disabled:opacity-50"
					disabled={isApplyingAnalysis || !(selectedAnalysis?.id || selectedAnalysis?.ai_analysis_id)}
					onclick={() => {
						const id = selectedAnalysis?.id || selectedAnalysis?.ai_analysis_id;
						if (id) applyAnalysisResults(id);
					}}
				>
					{#if isApplyingAnalysis}
						<i class="fa-solid fa-spinner fa-spin"></i>
						Applying...
					{:else}
						<i class="fa-solid fa-wand-magic-sparkles"></i>
						Apply Results
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
