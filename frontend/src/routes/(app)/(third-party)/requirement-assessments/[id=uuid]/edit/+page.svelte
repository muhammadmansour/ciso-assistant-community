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

	// AI Analysis Questions section state
	let showAiQuestions = $state(true);

	// AI Progress Modal state
	let showProgressModal = $state(false);
	let analysisStep = $state(0); // 0=scanning, 1=analyzing, 2=preparing, 3=done
	let analysisPercent = $state(0);
	let analysisComplete = $state(false);
	let analysisTimer: ReturnType<typeof setInterval> | null = $state(null);
	let pendingAnalysisResult: any = $state(null);

	const analysisSteps = [
		{ label: 'Scanning attached documents and evidence...' },
		{ label: 'Analyzing compliance with AI...' },
		{ label: 'Preparing results and recommendations...' }
	];

	function startProgressTimer() {
		analysisPercent = 0;
		analysisStep = 0;
		analysisComplete = false;
		pendingAnalysisResult = null;
		showProgressModal = true;
		analysisTimer = setInterval(() => {
			// Smoothly increment percentage up to ~90% max before completion
			if (analysisPercent < 30 && analysisStep === 0) {
				analysisPercent += 2;
			} else if (analysisPercent >= 30 && analysisStep < 1) {
				analysisStep = 1;
				analysisPercent += 1;
			} else if (analysisPercent >= 60 && analysisStep < 2) {
				analysisStep = 2;
				analysisPercent += 0.5;
			} else if (analysisPercent < 90) {
				analysisPercent += 0.3;
			}
			// Cap at 90% until real completion
			if (analysisPercent > 90 && !analysisComplete) analysisPercent = 90;
		}, 500);
	}

	function stopProgressTimer(success: boolean) {
		if (analysisTimer) {
			clearInterval(analysisTimer);
			analysisTimer = null;
		}
		if (success) {
			analysisStep = 3; // all steps done
			analysisPercent = 100;
			analysisComplete = true;
		} else {
			showProgressModal = false;
		}
	}

	function handleViewResults() {
		showProgressModal = false;
		if (pendingAnalysisResult) {
			selectedAnalysis = pendingAnalysisResult;
			showAnalysisModal = true;
			pendingAnalysisResult = null;
		}
	}

	// AI Apply state — tracks which fields were populated by "Apply Analysis Results"
	let aiAppliedFields: Set<string> = $state(new Set());
	let aiApplyBannerVisible = $state(false);
	let isApplyingAnalysis = $state(false);
	let applyError: string | null = $state(null);

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

	// Derive AI analysis questions from latest completed analysis
	let latestAnalysisQuestions = $derived.by(() => {
		if (!localAiAnalyses || localAiAnalyses.length === 0) return [];

		// Get the latest completed analysis
		const latest = localAiAnalyses.find((a: any) => a.status === 'completed') || localAiAnalyses[0];
		if (!latest) return [];

		const qa = latest.question_answers || {};
		const result = latest.result || {};

		// Find question evaluation section in raw result for confidence scores
		let questionSection: any[] = [];
		if (result && typeof result === 'object') {
			for (const key of Object.keys(result)) {
				const lower = key.toLowerCase().replace(/_/g, '');
				if (['questionevaluation', 'questionsanswers', 'questionanswers', 'questionsandanswers'].includes(lower)) {
					const section = result[key];
					if (Array.isArray(section)) questionSection = section;
					break;
				}
			}
		}

		// Get question types from requirement definition
		const reqQuestions = data.requirementAssessment?.requirement?.questions || {};
		const questionUrns = Object.keys(reqQuestions);

		const entries = Object.values(qa);
		return entries.map((entry: any, idx: number) => {
			// Get confidence from raw result item
			const rawItem = questionSection[idx] || {};
			const rawConf = rawItem.confidence;
			const confidenceValue = rawConf !== undefined && rawConf !== null
				? (Number(rawConf) <= 1 ? Math.round(Number(rawConf) * 100) : Math.round(Number(rawConf)))
				: null;

			// Get question type from requirement definition
			const qUrn = questionUrns[idx];
			const qDef = qUrn ? (reqQuestions as Record<string, any>)[qUrn] : null;
			const qType = qDef?.type || 'unique_choice';

			return {
				question: entry.question,
				answer: entry.answer,
				type: qType,
				confidence: confidenceValue,
			};
		});
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
		if (s === 'compliant') return 'text-emerald-700 bg-emerald-100';
		if (s === 'partiallycompliant') return 'text-amber-700 bg-amber-100';
		if (s === 'noncompliant') return 'text-red-700 bg-red-100';
		if (s === 'notassessed') return 'text-gray-700 bg-gray-100';
		if (s === 'notapplicable') return 'text-gray-600 bg-gray-100';
		return 'text-gray-700 bg-gray-100';
	}

	function getScoreColor(score: number | null): string {
		if (score === null || score === undefined) return 'text-gray-500';
		if (score >= 80) return 'text-emerald-600';
		if (score >= 50) return 'text-amber-600';
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

{#if data.requirementAssessment.compliance_assessment.is_locked}
	<div
		class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg shadow-sm mb-4"
	>
		<div class="flex items-center">
			<i class="fa-solid fa-lock text-yellow-600 mr-2"></i>
			<span class="font-medium">{m.lockedAssessment()}</span>
			<span class="ml-2 text-sm">{m.lockedRequirementAssessmentMessage()}</span>
		</div>
	</div>
{/if}
<!-- ═══ HEADER ═══ -->
<div class="flex items-start justify-between mb-6">
	<div class="flex items-start gap-3">
		<a
			class="mt-1.5 text-gray-400 hover:text-[#0A1628] transition-colors"
			href={complianceAssessmentURL}
			aria-label="Go back"
		>
			<i class="fa-solid fa-arrow-left text-lg"></i>
		</a>
		<div>
			<div class="flex items-center gap-3 mb-1">
				<h1 class="text-2xl font-bold text-gray-900">{data.requirement.ref_id}</h1>
				<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-white border border-[#0A1628]/20 text-[#0A1628]">
					{data.requirement.urn}
				</span>
			</div>
			<p class="text-sm text-gray-500">{data.requirementAssessment.name}</p>
		</div>
	</div>
	<form
		method="POST"
		action="?/runAiAnalysis"
		use:enhance={() => {
			isAnalyzing = true;
			aiAnalysisResult = null;
			aiAnalysisError = null;
			startProgressTimer();
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
					pendingAnalysisResult = {
						...newEntry,
						result: aiData.ai_analysis,
						question_answers: aiData.question_answers,
						created_at: aiData.ai_analysis_updated_at,
						score: newEntry.score,
						compliance_status: newEntry.compliance_status,
					};
					stopProgressTimer(true);
					await invalidateAll();
				} else if (result.type === 'failure' && result.data?.aiError) {
					stopProgressTimer(false);
					aiAnalysisError = result.data.aiError;
				} else {
					stopProgressTimer(false);
					aiAnalysisError = 'Unexpected response from server';
				}
			};
		}}
	>
		<button
			type="submit"
			class="btn bg-[#0A1628] text-white hover:bg-[#1a2740] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 rounded-lg px-5 py-2.5"
			disabled={isAnalyzing || data.requirementAssessment.compliance_assessment.is_locked}
			title="Run AI Analysis on Associated Evidences"
		>
			{#if isAnalyzing}
				<i class="fa-solid fa-spinner fa-spin mr-2"></i>
				<span>Analyzing...</span>
			{:else}
				<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
				<span>Run AI Analysis</span>
			{/if}
		</button>
	</form>
</div>

{#if data.requirement?.implementation_groups?.length > 0}
	<div class="mb-4">
		{#each data.requirement.implementation_groups as ig}
			<span class="badge bg-blue-100 mr-2">
				{getImplementationGroupName(ig)}
			</span>
		{/each}
	</div>
{/if}

<div class="space-y-4">
	{#if data.requirement.description}
		<div class="card bg-white shadow-sm border border-gray-200 rounded-lg p-5">
			<h2 class="flex items-center gap-2 font-semibold text-base text-gray-900 mb-3">
				<i class="fa-solid fa-circle-info text-[#0A1628]"></i>
				{m.description()}
			</h2>
			<div class="text-sm text-gray-600 leading-relaxed">
				<MarkdownRenderer content={data.requirement.description} />
			</div>
		</div>
	{/if}
	{#if has_threats || has_reference_controls || annotation || mappingInference.result || typical_evidence}
		<div class="card bg-white shadow-sm border border-gray-200 rounded-lg p-5 text-sm">
			<div class="flex items-center justify-between mb-3">
				<h2 class="flex items-center gap-2 font-semibold text-base text-gray-900">
					<i class="fa-solid fa-circle-info text-[#0A1628]"></i>
					{m.additionalInformation()}
				</h2>
				<button type="button" onclick={toggleSuggestions} class="text-gray-400 hover:text-gray-600 transition-colors">
					{#if !hideSuggestion}
						<i class="fa-solid fa-eye"></i>
					{:else}
						<i class="fa-solid fa-eye-slash"></i>
					{/if}
				</button>
			</div>
			{#if !hideSuggestion}
				{#if typical_evidence}
					<div class="mb-3">
						<p class="font-semibold text-xs uppercase tracking-wider text-teal-700 mb-1.5">
							<i class="fa-solid fa-clipboard-list mr-1.5 text-teal-600"></i>
							{m.typicalEvidence()}
						</p>
						<div class="text-sm text-gray-600 leading-relaxed" dir="auto">
							<MarkdownRenderer content={typical_evidence} />
						</div>
					</div>
				{/if}
				{#if annotation}
					<div class="text-sm text-gray-600 italic leading-relaxed mb-3" dir="auto">
						<MarkdownRenderer content={annotation} />
					</div>
				{/if}
				{#if has_threats || has_reference_controls}
					<div class="my-2 flex flex-col">
						<div class="flex-1">
							{#if reference_controls.length > 0}
								<p class="font-medium">
									<i class="fa-solid fa-gears"></i>
									{m.suggestedReferenceControls()}
								</p>
								<ul class="list-disc ml-4">
									{#each reference_controls as func}
										<li>
											{#if func.id}
												<a class="anchor" href="/reference-controls/{func.id}">
													{func.str}
												</a>
											{:else}
												<p>{func.str}</p>
											{/if}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
						<div class="flex-1">
							{#if threats.length > 0}
								<p class="font-medium">
									<i class="fa-solid fa-gears"></i>
									{m.threatsCovered()}
								</p>
								<ul class="list-disc ml-4">
									{#each threats as threat}
										<li>
											{#if threat.id}
												<a class="anchor" href="/threats/{threat.id}">
													{threat.str}
												</a>
											{:else}
												<p>{threat.str}</p>
											{/if}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</div>
				{/if}
				{#if mappingInference.result}
					<div class="my-2">
						<p class="font-medium">
							<i class="fa-solid fa-link"></i>
							{m.mappingInference()}
						</p>
						<span class="text-xs text-gray-500"
							><i class="fa-solid fa-circle-info"></i> {m.mappingInferenceHelpText()}</span
						>
						<ul class="list-disc ml-4">
							<li>
								<p>
									<a
										class="anchor"
										href="/requirement-assessments/{mappingInference.sourceRequirementAssessment
											.id}"
									>
										{mappingInference.sourceRequirementAssessment.str}
									</a>
								</p>
								<p class="whitespace-pre-line py-1">
									<span class="italic">{m.coverageColon()}</span>
									<span class="badge h-fit">
										{safeTranslate(mappingInference.sourceRequirementAssessment.coverage)}
									</span>
								</p>
								{#if mappingInference.sourceRequirementAssessment.is_scored}
									<p class="whitespace-pre-line py-1">
										<span class="italic">{m.scoreSemiColon()}</span>
										<span class="badge h-fit">
											{safeTranslate(mappingInference.sourceRequirementAssessment.score)}
										</span>
									</p>
								{/if}
								<p class="whitespace-pre-line py-1">
									<span class="italic">{m.suggestionColon()}</span>
									<span
										class="badge {classesText} h-fit"
										style="background-color: {complianceResultColorMap[mappingInference.result]};"
									>
										{safeTranslate(mappingInference.result)}
									</span>
								</p>
								{#if mappingInference.annotation}
									<p class="whitespace-pre-line py-1">
										<span class="italic">{m.annotationColon()}</span>
										{mappingInference.annotation}
									</p>
								{/if}
							</li>
						</ul>
					</div>
				{/if}
			{/if}
		</div>
	{/if}
	<!-- AI Analysis Error Toast -->
	{#if aiAnalysisError}
		<div class="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2 text-red-700">
					<i class="fa-solid fa-circle-exclamation"></i>
					<span class="font-semibold">AI Analysis Failed</span>
				</div>
				<button type="button" class="text-red-400 hover:text-red-600" onclick={() => (aiAnalysisError = null)}>
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
			<p class="text-red-600 text-sm mt-2">{aiAnalysisError}</p>
		</div>
	{/if}

	<!-- AI Apply Error -->
	{#if applyError}
		<div class="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2 text-red-700">
					<i class="fa-solid fa-circle-exclamation"></i>
					<span class="font-semibold">Apply Failed</span>
				</div>
				<button type="button" class="text-red-400 hover:text-red-600" onclick={() => (applyError = null)}>
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
			<p class="text-red-600 text-sm mt-2">{applyError}</p>
		</div>
	{/if}

	<!-- AI Values Applied Banner -->
	{#if aiApplyBannerVisible}
		<div class="p-4 bg-[#0A1628]/5 border border-[#0A1628]/15 rounded-lg mb-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="p-2 bg-[#0A1628]/10 rounded-lg">
						<i class="fa-solid fa-wand-magic-sparkles text-[#0A1628]"></i>
					</div>
					<div>
						<p class="font-semibold text-[#0A1628]">AI Results Applied</p>
						<p class="text-gray-600 text-sm">
							Fields updated: <strong>{[...aiAppliedFields].join(', ')}</strong>.
							Review and click <strong>Save</strong> to confirm.
						</p>
					</div>
				</div>
				<button type="button" class="text-gray-400 hover:text-gray-600" onclick={dismissApplyBanner}>
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>
	{/if}

	<!-- ═══ TWO-COLUMN LAYOUT ═══ -->
	<SuperForm
		class="flex flex-col"
		_form={requirementAssessmentForm}
		data={data.form}
		action="?/updateRequirementAssessment"
		{...rest}
	>
		{#snippet children({ form, data })}
			<HiddenInput {form} field="folder" />
			<HiddenInput {form} field="requirement" />
			<HiddenInput {form} field="compliance_assessment" />

			<div class="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
				<!-- ── LEFT COLUMN ── -->
				<div class="space-y-4 min-w-0">
					<!-- Tabs Card -->
					<div class="card shadow-sm bg-white border border-gray-200 rounded-lg">
						<Tabs
						value={group}
						onValueChange={(e) => {
							group = e.value;
						}}
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
								<div class="flex items-center mb-2 px-2 text-xs space-x-2">
									<i class="fa-solid fa-info-circle"></i>
									<p>{m.requirementAppliedControlHelpText()}</p>
								</div>
								<div class="h-full flex flex-col space-y-2 rounded-container p-4">
									<span class="flex flex-row justify-end items-center space-x-2">
										{#if Object.hasOwn(page.data.user.permissions, 'add_appliedcontrol') && reference_controls.length > 0}
											<button
												class="btn bg-[#0A1628] text-white hover:bg-[#1a2740] shadow-sm h-fit whitespace-normal"
												type="button"
												onclick={() => {
													modalConfirmCreateSuggestedControls(
														page.data.requirementAssessment.id,
														page.data.requirementAssessment.name,
														'?/createSuggestedControls'
													);
												}}
											>
												<span class="mr-2">
													{#if createAppliedControlsLoading}
														<ProgressRing
															strokeWidth="16px"
															meterStroke="stroke-white"
															classes="-ml-2"
															size="size-6"
														/>
													{:else}
														<i class="fa-solid fa-fire-extinguisher"></i>
													{/if}
												</span>
												{m.suggestControls()}
											</button>
										{/if}
										<button
											class="btn preset-filled-primary-500 self-end"
											onclick={modalMeasureCreateForm}
											type="button"
											><i class="fa-solid fa-plus mr-2"></i>{m.addAppliedControl()}</button
										>
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
										baseEndpoint="/applied-controls?requirement_assessments={page.data
											.requirementAssessment.id}"
										source={page.data.tables['applied-controls']}
										hideFilters={true}
										URLModel="applied-controls"
										expectedCount={countMasked(page.data.requirementAssessment.applied_controls)}
									/>
								</div>
							</Tabs.Panel>
							<Tabs.Panel value="evidences">
								<div class="flex items-center mb-2 px-2 text-xs space-x-2">
									<i class="fa-solid fa-info-circle"></i>
									<p>{m.requirementEvidenceHelpText()}</p>
								</div>
								<div class="h-full flex flex-col space-y-2 rounded-container p-4">
									<span class="flex flex-row justify-end items-center">
										<button
											class="btn preset-filled-primary-500 self-end"
											onclick={modalEvidenceCreateForm}
											type="button"><i class="fa-solid fa-plus mr-2"></i>{m.addEvidence()}</button
										>
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
										baseEndpoint="/evidences?requirement_assessments={page.data
											.requirementAssessment.id}"
									/>
								</div>
							</Tabs.Panel>
							<Tabs.Panel value="security_exceptions">
								<div class="h-full flex flex-col space-y-2 rounded-container p-4">
									<span class="flex flex-row justify-end items-center">
										<button
											class="btn preset-filled-primary-500 self-end"
											onclick={modalSecurityExceptionCreateForm}
											type="button"
											><i class="fa-solid fa-plus mr-2"></i>{m.addSecurityException()}</button
										>
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
										baseEndpoint="/security-exceptions?requirement_assessments={page.data
											.requirementAssessment.id}"
									/>
								</div>
							</Tabs.Panel>
						{/snippet}
					</Tabs>
					</div>

					<!-- AI Analysis Questions (read-only from latest AI analysis) -->
					{#if latestAnalysisQuestions.length > 0}
						<div class="card bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
							<button
								type="button"
								class="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
								onclick={() => (showAiQuestions = !showAiQuestions)}
							>
								<span class="flex items-center gap-2.5">
									<i class="fa-solid fa-robot text-[#0A1628]"></i>
									<span class="text-sm font-semibold text-gray-800">AI Analysis Questions</span>
									<span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-semibold bg-[#0A1628]/10 text-[#0A1628]">
										{latestAnalysisQuestions.length}
									</span>
								</span>
								<i class="fa-solid {showAiQuestions ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400 text-xs"></i>
							</button>

							{#if showAiQuestions}
								<div class="px-5 pb-5 space-y-3">
									{#each latestAnalysisQuestions as q, idx}
										<div class="border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4">
											<div class="shrink-0 min-w-[60px]">
												<div class="text-sm font-bold text-gray-500">Q{idx + 1}</div>
												<div class="text-[11px] text-gray-400 capitalize whitespace-nowrap">
													{q.type === 'unique_choice' ? 'Unique choice' : q.type === 'multiple_choice' ? 'Multiple choice' : q.type.replace(/_/g, ' ')}
												</div>
											</div>
											<div class="flex-1 text-sm text-gray-700 font-medium" dir="auto">
												{q.question}
											</div>
											<div class="flex items-center gap-4 shrink-0">
												<span class="text-sm font-semibold
													{q.answer === 'Yes' ? 'text-green-600' : q.answer === 'No' ? 'text-red-600' : 'text-amber-600'}">
													{q.answer}
												</span>
												{#if q.confidence !== null && q.confidence !== undefined}
													<span class="text-sm font-semibold
														{q.confidence >= 80 ? 'text-green-600' : q.confidence >= 50 ? 'text-amber-600' : 'text-red-600'}">
														{q.confidence}%
													</span>
												{/if}
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/if}

					<!-- Questions Form Field -->
					{#if page.data.requirementAssessment.requirement.questions != null && Object.keys(page.data.requirementAssessment.requirement.questions).length !== 0}
						<div class="relative">
							{#if aiAppliedFields.has('answers')}
								<span class="absolute -top-2 -right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#0A1628]/10 text-[#0A1628] border border-[#0A1628]/20">
									<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
								</span>
							{/if}
							<Question
								{form}
								field="answers"
								questions={page.data.requirementAssessment.requirement.questions}
								label={m.questionSingular()}
							/>
						</div>
					{/if}

					<!-- Observation -->
					<div class="relative">
						{#if aiAppliedFields.has('observation')}
							<span class="absolute -top-2 -right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#0A1628]/10 text-[#0A1628] border border-[#0A1628]/20">
								<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
							</span>
						{/if}
						<MarkdownField {form} field="observation" label="Observation" />
					</div>

					<!-- Change History (inline below observation) -->
					<div class="border border-gray-200 rounded-lg overflow-hidden">
						<button
							type="button"
							class="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
							onclick={() => (showChangeHistory = !showChangeHistory)}
						>
							<span class="text-sm font-semibold text-gray-700 flex items-center gap-2">
								<i class="fa-solid fa-clock-rotate-left text-gray-500"></i>
								Change History
								{#if auditEntries.length > 0}
									<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
										{auditEntries.length}
									</span>
								{/if}
							</span>
							<i class="fa-solid {showChangeHistory ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400 text-xs"></i>
						</button>
						{#if showChangeHistory}
							<div class="px-4 pb-4">
								{#if auditEntries.length === 0}
									<div class="text-center py-6 text-gray-400">
										<i class="fa-solid fa-clock-rotate-left text-2xl mb-2"></i>
										<p class="text-sm">No changes recorded yet.</p>
									</div>
								{:else}
									<div class="overflow-x-auto mt-3">
										<table class="w-full text-sm">
											<thead class="bg-gray-50 border-b border-gray-200">
												<tr>
													<th class="text-left px-3 py-2 font-semibold text-gray-600 text-xs">Timestamp</th>
													<th class="text-left px-3 py-2 font-semibold text-gray-600 text-xs">Actor</th>
													<th class="text-left px-3 py-2 font-semibold text-gray-600 text-xs">Action</th>
													<th class="text-left px-3 py-2 font-semibold text-gray-600 text-xs">Changes</th>
												</tr>
											</thead>
											<tbody class="divide-y divide-gray-100">
												{#each auditEntries as entry}
													<tr class="hover:bg-gray-50 transition-colors">
														<td class="px-3 py-2 text-gray-700 whitespace-nowrap text-xs">
															{new Date(entry.timestamp).toLocaleString()}
														</td>
														<td class="px-3 py-2 text-xs">
															{#if entry.actor}
																<span class="inline-flex items-center gap-1">
																	{#if entry.actor.toLowerCase().includes('ai') || entry.actor.toLowerCase().includes('service')}
																		<i class="fa-solid fa-robot text-[#0A1628]"></i>
																	{:else}
																		<i class="fa-solid fa-user text-gray-400"></i>
																	{/if}
																	<span class="text-gray-700">{entry.actor}</span>
																</span>
															{:else}
																<span class="text-gray-400 italic">System</span>
															{/if}
														</td>
														<td class="px-3 py-2">
															<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium
																{entry.action === 'create' ? 'bg-emerald-100 text-emerald-700' :
																 entry.action === 'update' ? 'bg-[#0A1628]/10 text-[#0A1628]' :
																 entry.action === 'delete' ? 'bg-red-100 text-red-700' :
																 'bg-gray-100 text-gray-700'}">
																{entry.action}
															</span>
														</td>
														<td class="px-3 py-2">
															{#if entry.changes && typeof entry.changes === 'object'}
																<div class="space-y-1">
																	{#each Object.entries(entry.changes) as [field, change]}
																		<div class="text-xs">
																			<span class="font-medium text-gray-600">{field}:</span>
																			{#if Array.isArray(change) && change.length >= 2}
																				<span class="text-red-500 line-through mr-1">{typeof change[0] === 'object' ? JSON.stringify(change[0]) : String(change[0]).substring(0, 80)}{String(change[0]).length > 80 ? '...' : ''}</span>
																				<i class="fa-solid fa-arrow-right text-gray-400 text-[8px] mx-1"></i>
																				<span class="text-green-600">{typeof change[1] === 'object' ? JSON.stringify(change[1]) : String(change[1]).substring(0, 80)}{String(change[1]).length > 80 ? '...' : ''}</span>
																			{:else}
																				<span class="text-gray-500">{JSON.stringify(change)}</span>
																			{/if}
																		</div>
																	{/each}
																</div>
															{:else}
																<span class="text-gray-400 italic">No details</span>
															{/if}
														</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							</div>
						{/if}
					</div>

					<!-- Spacer for fixed bottom bar -->
					<div class="h-20"></div>
				</div>

				<!-- ── RIGHT SIDEBAR ── -->
				<div class="space-y-5">
					<!-- STATUS -->
					<div class="card bg-white shadow-sm border border-gray-200 rounded-lg p-5">
						<div class="relative">
							{#if aiAppliedFields.has('status')}
								<span class="absolute -top-2 -right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#0A1628]/10 text-[#0A1628] border border-[#0A1628]/20">
									<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
								</span>
							{/if}
							<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
								<i class="fa-regular fa-clock text-gray-400"></i>
								{m.status()}
							</label>
							<Select
								{form}
								options={page.data.model.selectOptions['status']}
								field="status"
								label=""
								helpText={m.requirementAssessmentStatusHelpText()}
							/>
						</div>
					</div>

					<!-- RESULT -->
					<div class="card bg-white shadow-sm border border-gray-200 rounded-lg p-5">
						{#if computedResult}
							<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
								<i class="fa-regular fa-circle-question text-gray-400"></i>
								{m.result()}
							</label>
							<span
								class="badge text-sm font-semibold"
								style="background-color: {complianceResultColorMap[computedResult || 'not_assessed'] || '#ddd'}"
							>
								{safeTranslate(computedResult || 'not_assessed')}
							</span>
						{:else}
							<div class="relative">
								{#if aiAppliedFields.has('result')}
									<span class="absolute -top-2 -right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#0A1628]/10 text-[#0A1628] border border-[#0A1628]/20">
										<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
									</span>
								{/if}
								<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
									<i class="fa-regular fa-circle-question text-gray-400"></i>
									{m.result()}
								</label>
								<Select
									{form}
									options={page.data.model.selectOptions['result']}
									field="result"
									label=""
									helpText={m.requirementAssessmentResultHelpText()}
								/>
							</div>
						{/if}
						{#if page.data.requirementAssessment.compliance_assessment.extended_result_enabled}
							<div class="mt-3">
								<Select
									{form}
									options={page.data.model.selectOptions['extended_result']}
									field="extended_result"
									label={m.extendedResult()}
									helpText={m.extendedResultHelpText()}
								/>
							</div>
						{/if}
					</div>

					<!-- SCORING -->
					<div class="card bg-white shadow-sm border border-gray-200 rounded-lg p-5">
						<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
							<i class="fa-solid fa-chart-simple text-gray-400"></i>
							Scoring
						</label>
						{#if computedScore !== null}
							<div class="flex flex-row items-center space-x-4">
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
							<div class="flex flex-col">
								<Score
									{form}
									min_score={page.data.compliance_assessment_score.min_score}
									max_score={page.data.compliance_assessment_score.max_score}
									scores_definition={page.data.compliance_assessment_score.scores_definition}
									field="score"
									label=""
									disabled={!data.is_scored || data.result === 'not_applicable'}
								>
									{#snippet left()}
										<div>
											<Checkbox
												{form}
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
							</div>
							{#if page.data.compliance_assessment_score.show_documentation_score}
								<div class="mt-3">
									<Score
										{form}
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

					<!-- AI HISTORY -->
					<div class="card bg-white shadow-sm border border-gray-200 rounded-lg p-5">
						<div class="flex items-center justify-between mb-3">
							<h3 class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
								<i class="fa-solid fa-wand-magic-sparkles text-[#0A1628]"></i>
								AI HISTORY
							</h3>
							{#if localAiAnalyses?.length > 0}
								<span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
									{localAiAnalyses.length}
								</span>
							{/if}
						</div>

						{#if localAiAnalyses?.length > 0}
							<div class="space-y-1">
								{#each localAiAnalyses as analysis}
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<div
										class="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left group cursor-pointer"
										onclick={() => openAnalysisDetail(analysis)}
									>
										<span class="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 {analysis.status === 'completed' ? 'bg-emerald-500' : 'bg-red-400'}"></span>
										<div class="flex-1 min-w-0">
											<p class="text-sm font-medium text-gray-900">{formatDate(analysis.created_at)}</p>
											<p class="text-xs text-gray-500">{analysis.gemini_files_count || 0} files analyzed</p>
										</div>
										<div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
											<button
												type="button"
												class="p-1 text-gray-400 hover:text-red-500 transition-colors"
												title="Delete analysis"
												disabled={deletingAnalysisId === analysis.id}
												onclick={(e) => { e.stopPropagation(); deleteAnalysis(analysis.id); }}
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
						{:else}
							<div class="text-center py-6">
								<div class="inline-block p-3 rounded-full bg-[#0A1628]/5 mb-2">
									<i class="fa-solid fa-wand-magic-sparkles text-xl text-[#0A1628]/40"></i>
								</div>
								<p class="text-sm text-gray-500">No analyses yet</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
				<!-- Fixed Bottom Action Bar -->
			<div class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
				<div class="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
					<button
						type="button"
						class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
						onclick={cancel}
					>
						Cancel
					</button>
					<div class="flex items-center gap-3">
						<button
							class="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium px-5 py-2 rounded-lg text-sm transition-colors"
							data-testid="save-no-continue-button"
							type="submit"
							onclick={() =>
								form.form.update((data) => {
									return { ...data, noRedirect: true };
								})}
						>
							Save and Continue
						</button>
						<button
							class="btn bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-2 rounded-lg text-sm transition-colors shadow-sm"
							data-testid="save-button"
							type="submit"
						>
							Save
						</button>
					</div>
				</div>
			</div>
	{/snippet}
	</SuperForm>
</div>

<!-- AI Analysis Progress Modal -->
{#if showProgressModal}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		onkeydown={(e) => e.key === 'Escape' && analysisComplete && (showProgressModal = false)}
	>
		<div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
		<div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
			<!-- Header -->
			<div class="px-6 pt-6 pb-2 flex items-start justify-between">
				<div>
					<h3 class="text-lg font-bold text-gray-900">AI Analysis</h3>
					<p class="text-sm text-gray-500">{data.requirement?.ref_id} - {data.requirement?.name || data.requirementAssessment?.name || ''}</p>
				</div>
				{#if analysisComplete}
					<button
						type="button"
						class="text-gray-400 hover:text-gray-600 transition-colors p-1"
						onclick={() => { showProgressModal = false; }}
					>
						<i class="fa-solid fa-xmark text-lg"></i>
					</button>
				{/if}
			</div>

			<!-- Center icon -->
			<div class="flex justify-center py-6">
				{#if analysisComplete}
					<div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
						<i class="fa-solid fa-circle-check text-green-500 text-3xl"></i>
					</div>
				{:else}
					<div class="w-14 h-14 rounded-full bg-[#0A1628]/10 flex items-center justify-center">
						<svg class="w-8 h-8 text-[#0A1628] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" opacity="0.3"/>
							<path d="M12 5.5L13.6 9.5L18 9.87L14.67 12.76L15.77 17L12 14.67L8.23 17L9.33 12.76L6 9.87L10.4 9.5L12 5.5Z"/>
						</svg>
					</div>
				{/if}
			</div>

			<!-- Progress bar -->
			<div class="px-6 pb-4">
				<div class="flex items-center justify-between mb-2">
					<span class="text-sm font-medium text-gray-700">
						{#if analysisComplete}
							Analysis complete
						{:else}
							Analyzing...
						{/if}
					</span>
					<span class="text-sm font-medium text-gray-500">{Math.round(analysisPercent)}%</span>
				</div>
				<div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
					<div
						class="h-full rounded-full transition-all duration-500 ease-out {analysisComplete ? 'bg-emerald-500' : 'bg-[#0A1628]'}"
						style="width: {analysisPercent}%"
					></div>
				</div>
			</div>

			<!-- Steps -->
			<div class="px-6 pb-4 space-y-3">
				{#each analysisSteps as step, idx}
					{@const isDone = idx < analysisStep || analysisComplete}
					{@const isActive = idx === analysisStep && !analysisComplete}
					{@const isPending = idx > analysisStep && !analysisComplete}
					<div class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
						{isDone ? 'bg-emerald-50' : isActive ? 'bg-[#0A1628]/5' : 'bg-transparent'}">
						{#if isDone}
							<i class="fa-solid fa-check text-emerald-500 text-sm"></i>
						{:else if isActive}
							<i class="fa-solid fa-spinner fa-spin text-[#0A1628] text-sm"></i>
						{:else}
							<i class="fa-regular fa-circle text-gray-300 text-sm"></i>
						{/if}
						<span class="text-sm {isDone ? 'text-emerald-700 font-medium' : isActive ? 'text-[#0A1628] font-medium' : 'text-gray-400'}">
							{step.label}
						</span>
					</div>
				{/each}
			</div>

			<!-- Completion section -->
			{#if analysisComplete}
				<div class="px-6 pb-6 space-y-4">
					<div class="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-center">
						<p class="text-sm text-emerald-700 font-medium">Analysis completed successfully — results are ready for review</p>
					</div>
					<button
						type="button"
						class="w-full btn bg-[#0A1628] hover:bg-[#1a2740] text-white font-semibold py-3 rounded-xl transition-colors"
						onclick={handleViewResults}
					>
						View Results
					</button>
				</div>
			{:else}
				<div class="h-6"></div>
			{/if}
		</div>
	</div>
{/if}

<!-- AI Analysis Modal -->
{#if showAnalysisModal && selectedAnalysis}
	{@const result = selectedAnalysis.result || selectedAnalysis}
	{@const appliedControls = result._appliedControls || []}
	{@const questionAnswers = selectedAnalysis.question_answers || {}}
	{@const questionAnswerEntriesFromDb = Object.values(questionAnswers)}
	{@const questionAnswerEntriesFromResult = (() => {
		// Fallback: extract from the AI result body if question_answers is empty
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
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	>
		<!-- Backdrop -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick={closeModal}></div>

		<!-- Modal Content -->
		<div
			class="relative bg-white shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
			class:rounded-xl={!isModalExpanded}
			class:w-full={isModalExpanded}
			class:h-full={isModalExpanded}
			class:max-w-4xl={!isModalExpanded}
			class:max-h-[90vh]={!isModalExpanded}
			class:inset-0={isModalExpanded}
			class:absolute={isModalExpanded}
			style={isModalExpanded ? 'max-width:100%;max-height:100%;border-radius:0;' : 'width:95vw;'}
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0A1628]/5 to-white shrink-0">
				<div class="flex items-center gap-3">
					<div class="p-2 bg-[#0A1628]/10 rounded-lg">
						<i class="fa-solid fa-brain text-[#0A1628] text-lg"></i>
					</div>
					<div>
						<h2 class="text-lg font-bold text-gray-800">AI Analysis Report</h2>
						<p class="text-sm text-gray-500">
							{data.requirement.ref_id} — {appliedControls.length} applied control{appliedControls.length !== 1 ? 's' : ''} analyzed
							{#if selectedAnalysis?.created_at}
								· {formatDate(selectedAnalysis.created_at)}
							{/if}
						</p>
					</div>
				</div>
				<div class="flex items-center gap-1">
					<button
						type="button"
						class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						onclick={() => (isModalExpanded = !isModalExpanded)}
						title={isModalExpanded ? 'Restore size' : 'Expand fullscreen'}
					>
						<i class="fa-solid {isModalExpanded ? 'fa-compress' : 'fa-expand'} text-gray-500 text-lg"></i>
					</button>
					<button
						type="button"
						class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						onclick={closeModal}
					>
						<i class="fa-solid fa-xmark text-gray-500 text-lg"></i>
					</button>
				</div>
			</div>

			<!-- Modal Body -->
			<div class="overflow-y-auto flex-1 p-6">
				<!-- Summary Bar -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
					<div class="bg-gray-50 rounded-lg p-4 text-center">
						<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Score</p>
						<p class="text-2xl font-bold {getScoreColor(typeof score === 'number' ? score : null)}">
							{score ?? '—'}
						</p>
					</div>
					<div class="bg-gray-50 rounded-lg p-4 text-center">
						<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Compliance</p>
						{#if complianceStatus}
							<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium {getStatusColor(complianceStatus)}">
								{complianceStatus}
							</span>
						{:else}
							<p class="text-2xl font-bold text-gray-400">—</p>
						{/if}
					</div>
					<div class="bg-gray-50 rounded-lg p-4 text-center">
						<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Evidence Quality</p>
						{#if evidenceQuality}
							<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
								{evidenceQuality.toLowerCase() === 'good' || evidenceQuality.toLowerCase() === 'strong' ? 'text-green-700 bg-green-100' :
								 evidenceQuality.toLowerCase() === 'moderate' || evidenceQuality.toLowerCase() === 'fair' ? 'text-yellow-700 bg-yellow-100' :
								 'text-red-700 bg-red-100'}">
								{evidenceQuality}
							</span>
						{:else}
							<p class="text-2xl font-bold text-gray-400">—</p>
						{/if}
					</div>
					<div class="bg-gray-50 rounded-lg p-4 text-center">
						<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Applied Controls</p>
						<p class="text-2xl font-bold text-gray-800">{appliedControls.length}</p>
					</div>
				</div>


				<!-- Applied Controls Source Cards -->
				{#if appliedControls.length > 0}
					<div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
						<div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
							<h4 class="font-semibold text-gray-700">
								<i class="fa-solid fa-layer-group mr-2 text-[#0A1628]"></i>Evidence Sources
							</h4>
						</div>
						<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
							{#each appliedControls as ac}
								<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
									<div class="w-9 h-9 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
										<i class="fa-solid fa-shield-halved text-[#0A1628] text-sm"></i>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-medium text-gray-800 text-sm truncate">{ac.name}</p>
										<p class="text-xs text-gray-500">
											{ac.evidenceCount} evidence{ac.evidenceCount !== 1 ? 's' : ''}
											· {ac.fileNames?.length || 0} file{(ac.fileNames?.length || 0) !== 1 ? 's' : ''}
											· <span class="capitalize">{(ac.status || '').replace(/_/g, ' ')}</span>
										</p>
										{#if ac.fileNames && ac.fileNames.length > 0}
											<div class="flex flex-wrap gap-1 mt-1">
												{#each ac.fileNames as fname}
													<span class="text-[10px] px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 truncate max-w-[150px]">
														<i class="fa-solid fa-file text-gray-400 mr-0.5"></i>{fname}
													</span>
												{/each}
											</div>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- If AI returned a markdown text response, render it nicely -->
				{#if markdownText && typeof markdownText === 'string'}
					<div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
						<div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
							<h4 class="font-semibold text-gray-700">
								<i class="fa-solid fa-file-lines mr-2 text-[#0A1628]"></i>Analysis Report
							</h4>
						</div>
						<div class="p-4 prose prose-sm max-w-none text-gray-700">
							<MarkdownRenderer content={markdownText} />
						</div>
					</div>
				{/if}

				<!-- Structured sections (if response is JSON object) -->
				{#if typeof result === 'object' && !markdownText}
					{@const detailedAnalysis = getScalarField(result, 'detailedAnalysis', 'detailed_analysis', 'detailedanalysis')}
					{@const noteText = getScalarField(result, 'note', 'notes')}

					<!-- Summary text -->
					{#if summaryText && typeof summaryText === 'string'}
						<div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
							<div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
								<h4 class="font-semibold text-gray-700">
									<i class="fa-solid fa-clipboard-list mr-2"></i>Summary
								</h4>
							</div>
							<div class="p-4">
								<p class="text-gray-700 whitespace-pre-wrap">{summaryText}</p>
							</div>
						</div>
					{/if}

					<!-- Detailed Analysis text -->
					{#if detailedAnalysis && typeof detailedAnalysis === 'string'}
						<div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
							<div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
								<h4 class="font-semibold text-gray-700">
									<i class="fa-solid fa-file-lines mr-2 text-[#0A1628]"></i>Detailed Analysis
								</h4>
							</div>
							<div class="p-4">
								<p class="text-gray-700 whitespace-pre-wrap leading-relaxed">{detailedAnalysis}</p>
							</div>
						</div>
					{/if}

					<!-- Ordered sections -->
					{#each getOrderedSections(result) as [sectionKey, sectionValue]}
						<div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
							<div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
								<h4 class="font-semibold text-gray-700 capitalize">
									{#if sectionKey.toLowerCase().includes('question')}
										<i class="fa-solid fa-circle-question mr-2 text-[#0A1628]"></i>
									{:else if sectionKey.toLowerCase().includes('gap')}
										<i class="fa-solid fa-triangle-exclamation mr-2 text-orange-500"></i>
									{:else if sectionKey.toLowerCase().includes('recommendation')}
										<i class="fa-solid fa-lightbulb mr-2 text-amber-500"></i>
									{:else if sectionKey.toLowerCase().includes('strength')}
										<i class="fa-solid fa-circle-check mr-2 text-green-500"></i>
									{:else if sectionKey.toLowerCase().includes('weakness')}
										<i class="fa-solid fa-circle-xmark mr-2 text-red-500"></i>
									{:else if sectionKey.toLowerCase().includes('finding')}
										<i class="fa-solid fa-magnifying-glass mr-2 text-[#0A1628]"></i>
									{:else if sectionKey.toLowerCase().includes('evidence')}
										<i class="fa-solid fa-file-lines mr-2 text-[#0A1628]"></i>
									{:else if sectionKey.toLowerCase().includes('assessment') || sectionKey.toLowerCase().includes('overall')}
										<i class="fa-solid fa-gauge mr-2 text-[#0A1628]"></i>
									{:else if sectionKey.toLowerCase().includes('control') || sectionKey.toLowerCase().includes('breakdown')}
										<i class="fa-solid fa-shield-halved mr-2 text-[#0A1628]"></i>
									{:else}
										<i class="fa-solid fa-list mr-2 text-gray-500"></i>
									{/if}
									{sectionKey.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
								</h4>
							</div>
							<div class="p-4">
								{#if typeof sectionValue === 'string'}
									<p class="text-gray-700 whitespace-pre-wrap">{sectionValue}</p>

								<!-- Question evaluation cards -->
								{:else if (sectionKey.toLowerCase().includes('question') || sectionKey.toLowerCase().includes('answer')) && Array.isArray(sectionValue)}
									{#if sectionValue.length === 0}
										<p class="text-gray-400 italic">No questions evaluated</p>
									{:else}
										<div class="space-y-4">
											{#each sectionValue as item, idx}
												{@const qNum = getField(item, 'questionNumber') || getField(item, 'number') || idx + 1}
												{@const qText = getField(item, 'question') || getField(item, 'text') || getField(item, 'questionText')}
												{@const qAnswer = getField(item, 'answer') || getField(item, 'answered') || getField(item, 'selectedChoice')}
												{@const qSource = getField(item, 'source') || getField(item, 'sourceFile') || getField(item, 'appliedControl')}
												{@const qJustification = getField(item, 'justification') || getField(item, 'explanation') || getField(item, 'notes') || getField(item, 'reasoning')}
												{@const qEvidence = getField(item, 'evidence') || getField(item, 'evidenceFound') || getField(item, 'evidenceFile')}
												{@const qConfidence = getField(item, 'confidence')}
												<div class="border border-gray-200 rounded-lg overflow-hidden">
													<div class="bg-[#0A1628]/5 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
														<span class="font-semibold text-[#0A1628] text-sm">
															<i class="fa-solid fa-circle-question mr-1"></i>
															Q{qNum}
														</span>
														{#if qConfidence !== undefined && qConfidence !== null}
															<span class="text-xs font-medium px-2 py-0.5 rounded-full {Number(qConfidence) >= 0.8 ? 'bg-green-100 text-green-700' : Number(qConfidence) >= 0.5 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}">
																Confidence: {Math.round(Number(qConfidence) * 100)}%
															</span>
														{/if}
													</div>
													<div class="p-4 space-y-3">
														{#if qText}
															<p class="text-gray-800 font-medium">{qText}</p>
														{/if}
														<div class="grid grid-cols-1 gap-3 text-sm">
															{#if qAnswer !== undefined && qAnswer !== null}
																<div class="flex items-start gap-2">
																	<span class="font-medium text-gray-500 shrink-0 min-w-[100px]">Answer:</span>
																	<span class="text-gray-800 font-semibold">{qAnswer}</span>
																</div>
															{/if}
															{#if qSource}
																<div class="flex items-start gap-2">
																	<span class="font-medium text-gray-500 shrink-0 min-w-[100px]">Source:</span>
																	<span class="text-gray-800">
																		<i class="fa-solid fa-shield-halved text-[#0A1628]/50 mr-1"></i>
																		{typeof qSource === 'object' ? JSON.stringify(qSource) : qSource}
																	</span>
																</div>
															{/if}
															{#if qEvidence}
																<div class="flex items-start gap-2">
																	<span class="font-medium text-gray-500 shrink-0 min-w-[100px]">Evidence:</span>
																	<span class="text-gray-800">{typeof qEvidence === 'object' ? JSON.stringify(qEvidence) : qEvidence}</span>
																</div>
															{/if}
														</div>
														{#if qJustification}
															<div class="bg-gray-50 rounded-md p-3 text-sm">
																<span class="font-medium text-gray-500">Justification: </span>
																<span class="text-gray-700">{qJustification}</span>
															</div>
														{/if}
														<!-- Fallback: show remaining fields not already displayed -->
														{#if typeof item === 'object'}
															{@const shownKeys = new Set(['questionnumber', 'number', 'question', 'text', 'questiontext', 'answer', 'answered', 'selectedchoice', 'source', 'sourcefile', 'appliedcontrol', 'justification', 'explanation', 'notes', 'reasoning', 'evidence', 'evidencefound', 'evidencefile', 'confidence'])}
															{#each Object.entries(item).filter(([k]) => !shownKeys.has(k.toLowerCase())) as [k, v]}
																<div class="flex items-start gap-2 text-sm">
																	<span class="font-medium text-gray-500 shrink-0 min-w-[100px] capitalize">{k.replace(/_/g, ' ')}:</span>
																	<span class="text-gray-700">{typeof v === 'object' ? JSON.stringify(v) : v}</span>
																</div>
															{/each}
														{/if}
													</div>
												</div>
											{/each}
										</div>
									{/if}

								<!-- Gaps cards -->
								{:else if sectionKey.toLowerCase().includes('gap') && Array.isArray(sectionValue)}
									{#if sectionValue.length === 0}
										<p class="text-gray-400 italic">No gaps identified</p>
									{:else}
										<div class="space-y-3">
											{#each sectionValue as item, idx}
												{@const gGap = typeof item === 'string' ? item : (getField(item, 'gap') || getField(item, 'description') || getField(item, 'text'))}
												{@const gRec = typeof item === 'object' ? (getField(item, 'recommendation') || getField(item, 'action')) : null}
												<div class="border border-orange-200 rounded-lg overflow-hidden">
													<div class="bg-orange-50 px-4 py-2 border-b border-orange-200">
														<span class="font-semibold text-orange-800 text-sm">
															<i class="fa-solid fa-triangle-exclamation mr-1"></i>
															Gap {idx + 1}
														</span>
													</div>
													<div class="p-4 space-y-2 text-sm">
														{#if gGap}
															<p class="text-gray-800 font-medium">{gGap}</p>
														{/if}
														{#if gRec}
															<div class="bg-[#0A1628]/5 rounded-md p-3 border border-[#0A1628]/10">
																<span class="font-medium text-[#0A1628]"><i class="fa-solid fa-lightbulb mr-1"></i>Recommendation: </span>
																<span class="text-gray-800">{gRec}</span>
															</div>
														{/if}
													</div>
												</div>
											{/each}
										</div>
									{/if}

								<!-- Strengths / Weaknesses / Recommendations / Findings (string arrays) -->
								{:else if Array.isArray(sectionValue)}
									{#if sectionValue.length === 0}
										<p class="text-gray-400 italic">No items</p>
									{:else}
										<ul class="space-y-2">
											{#each sectionValue as item}
												{#if typeof item === 'string'}
													<li class="flex items-start gap-2">
														{#if sectionKey.toLowerCase().includes('strength')}
															<i class="fa-solid fa-circle-check text-green-500 mt-1 text-sm shrink-0"></i>
														{:else if sectionKey.toLowerCase().includes('weakness')}
															<i class="fa-solid fa-circle-xmark text-red-500 mt-1 text-sm shrink-0"></i>
														{:else if sectionKey.toLowerCase().includes('recommendation')}
															<i class="fa-solid fa-arrow-right text-amber-500 mt-1 text-sm shrink-0"></i>
														{:else}
															<i class="fa-solid fa-circle text-gray-400 mt-1.5 text-[6px] shrink-0"></i>
														{/if}
														<span class="text-gray-700">{item}</span>
													</li>
												{:else if typeof item === 'object' && item !== null}
													<li class="bg-gray-50 rounded-lg p-3 border border-gray-100">
														{#each Object.entries(item) as [k, v]}
															<div class="mb-1">
																<span class="font-medium text-gray-600 capitalize">{k.replace(/_/g, ' ')}:</span>
																<span class="text-gray-700 ml-1">{typeof v === 'object' ? JSON.stringify(v) : v}</span>
															</div>
														{/each}
													</li>
												{:else}
													<li class="text-gray-700">{JSON.stringify(item)}</li>
												{/if}
											{/each}
										</ul>
									{/if}

								<!-- Object section (overallAssessment, etc.) -->
								{:else if typeof sectionValue === 'object' && sectionValue !== null}
									<div class="space-y-2">
										{#each Object.entries(sectionValue) as [k, v]}
											<div class="flex items-start gap-2">
												<span class="font-medium text-gray-600 capitalize min-w-[140px] shrink-0">{k.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}:</span>
												{#if typeof v === 'string'}
													<span class="text-gray-700">{v}</span>
												{:else}
													<pre class="text-sm text-gray-700 bg-gray-50 rounded p-2 flex-1 overflow-x-auto">{JSON.stringify(v, null, 2)}</pre>
												{/if}
											</div>
										{/each}
									</div>

								{:else}
									<p class="text-gray-700">{JSON.stringify(sectionValue)}</p>
								{/if}
							</div>
						</div>
					{/each}

					<!-- Note section -->
					{#if noteText && typeof noteText === 'string'}
						<div class="mb-6 border border-[#0A1628]/15 rounded-lg overflow-hidden">
							<div class="bg-[#0A1628]/5 px-4 py-3 border-b border-[#0A1628]/10">
								<h4 class="font-semibold text-[#0A1628]">
									<i class="fa-solid fa-circle-info mr-2"></i>Note
								</h4>
							</div>
							<div class="p-4">
								<p class="text-gray-700 text-sm whitespace-pre-wrap">{noteText}</p>
							</div>
						</div>
					{/if}

					<!-- Fallback: if no sections were rendered, show raw -->
					{#if getOrderedSections(result).length === 0 && !summaryText && !detailedAnalysis}
						{@const displayResult = Object.fromEntries(
							Object.entries(result).filter(([k]) => !metadataKeys.has(k) && !metadataKeys.has(k.toLowerCase()))
						)}
						<div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
							<pre class="whitespace-pre-wrap text-gray-700 text-sm">{JSON.stringify(displayResult, null, 2)}</pre>
						</div>
					{/if}
				{/if}
			</div>

			<!-- Modal Footer -->
			<div class="flex justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
				<button
					type="button"
					class="btn bg-[#0A1628] text-white hover:bg-[#1a2740] shadow-sm font-semibold"
				disabled={isApplyingAnalysis || !(selectedAnalysis?.id || selectedAnalysis?.ai_analysis_id)}
				onclick={() => {
					const id = selectedAnalysis?.id || selectedAnalysis?.ai_analysis_id;
					if (id) applyAnalysisResults(id);
				}}
				>
					{#if isApplyingAnalysis}
						<i class="fa-solid fa-spinner fa-spin mr-2"></i>
						Applying...
					{:else}
						<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
						Apply Analysis Results
					{/if}
				</button>
				<button
					type="button"
					class="btn preset-filled-surface-200-800"
					onclick={closeModal}
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}
