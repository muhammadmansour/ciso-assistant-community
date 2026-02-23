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
	let isModalExpanded = $state(false);
	let deletingAnalysisId: string | null = $state(null);
	let selectedAnalysis: any = $state(null);

	// AI Apply state — tracks which fields were populated by "Apply Analysis Results"
	let aiAppliedFields: Set<string> = $state(new Set());
	let aiApplyBannerVisible = $state(false);
	let isApplyingAnalysis = $state(false);
	let applyError: string | null = $state(null);

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
<div class="card space-y-2 p-4 bg-white shadow-sm">
	<div class="flex justify-between items-center">
		<div class="flex">
			<span class="code left h-min">{data.requirement.urn}</span>
		</div>
		<div class="flex items-center gap-2">
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

						// Build a local entry for the history table
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

						// Auto-open modal with the fresh result
						selectedAnalysis = {
							...newEntry,
							result: aiData.ai_analysis,
							question_answers: aiData.question_answers,
							created_at: aiData.ai_analysis_updated_at,
							score: newEntry.score,
							compliance_status: newEntry.compliance_status,
						};
						showAnalysisModal = true;

						// Refresh server data (updates localAiAnalyses via $effect)
						// but do NOT call applyAction — it would corrupt the superform
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
					class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
					disabled={isAnalyzing || data.requirementAssessment.compliance_assessment.is_locked}
					title="Start AI Analysis on Associated Evidences"
				>
					{#if isAnalyzing}
						<i class="fa-solid fa-spinner fa-spin mr-2"></i>
						<span>Analyzing...</span>
					{:else}
						<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
						<span>Start AI Analysis</span>
					{/if}
				</button>
			</form>
			<a
				class="text-pink-500 hover:text-pink-400"
				href={complianceAssessmentURL}
				aria-label="Go to compliance assessment"><i class="fa-solid fa-turn-up"></i></a
			>
		</div>
	</div>
	{#if data.requirement?.implementation_groups?.length > 0}
		<div class="mb-2">
			{#each data.requirement.implementation_groups as ig}
				<span class="badge bg-blue-100 mr-2">
					{getImplementationGroupName(ig)}
				</span>
			{/each}
		</div>
	{/if}
	{#if data.requirement.description}
		<div class="font-light text-lg card p-4 preset-tonal-primary">
			<h2 class="font-semibold text-base flex flex-row justify-between">
				<div>
					<i class="fa-solid fa-file-lines mr-2"></i>{m.description()}
				</div>
			</h2>
			<MarkdownRenderer content={data.requirement.description} />
		</div>
	{/if}
	{#if has_threats || has_reference_controls || annotation || mappingInference.result || typical_evidence}
		<div class="card p-4 preset-tonal-secondary text-sm flex flex-col justify-evenly cursor-auto">
			<h2 class="font-semibold text-base flex flex-row justify-between">
				<div>
					<i class="fa-solid fa-circle-info mr-2"></i>{m.additionalInformation()}
				</div>
				<button onclick={toggleSuggestions}>
					{#if !hideSuggestion}
						<i class="fa-solid fa-eye"></i>
					{:else}
						<i class="fa-solid fa-eye-slash"></i>
					{/if}
				</button>
			</h2>
			{#if !hideSuggestion}
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
				{#if annotation}
					<div class="my-2">
						<p class="font-medium">
							<i class="fa-solid fa-pencil"></i>
							{m.annotation()}
						</p>
						<div class="py-1">
							<MarkdownRenderer content={annotation} />
						</div>
					</div>
				{/if}
				{#if typical_evidence}
					<div class="my-2">
						<p class="font-medium">
							<i class="fa-solid fa-pencil"></i>
							{m.typicalEvidence()}
						</p>
						<div class="py-1">
							<MarkdownRenderer content={typical_evidence} />
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
		<div class="card p-4 bg-red-50 border border-red-200 rounded-lg mt-2">
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
		<div class="card p-4 bg-red-50 border border-red-200 rounded-lg mt-2">
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
		<div class="card p-4 bg-blue-50 border border-blue-200 rounded-lg mt-2">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="p-2 bg-blue-100 rounded-lg">
						<i class="fa-solid fa-wand-magic-sparkles text-blue-700"></i>
					</div>
					<div>
						<p class="font-semibold text-blue-800">AI Analysis Results Applied</p>
						<p class="text-blue-600 text-sm">
							The following fields have been populated with AI-proposed values:
							<strong>{[...aiAppliedFields].join(', ')}</strong>.
							Review the values below and click <strong>Save</strong> to confirm.
						</p>
					</div>
				</div>
				<button type="button" class="text-blue-400 hover:text-blue-600" onclick={dismissApplyBanner}>
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>
	{/if}

	<div class="mt-4">
		<SuperForm
			class="flex flex-col"
			_form={requirementAssessmentForm}
			data={data.form}
			action="?/updateRequirementAssessment"
			{...rest}
		>
			{#snippet children({ form, data })}
				<div class="card shadow-lg bg-white">
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
												class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit whitespace-normal"
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
				<HiddenInput {form} field="folder" />
				<HiddenInput {form} field="requirement" />
				<HiddenInput {form} field="compliance_assessment" />
			<div class="flex flex-col my-8 space-y-6">
				<!-- AI Analysis Section -->
				<div class="card bg-white shadow-lg rounded-lg overflow-hidden">
					<div class="p-6">
						{#if isAnalyzing}
							<div class="text-center py-16">
								<div class="inline-block mb-6">
									<i class="fa-solid fa-spinner fa-spin text-5xl text-[#0A1628]"></i>
								</div>
								<h3 class="text-xl font-semibold text-gray-800 mb-2">Analyzing with Wathbah API...</h3>
								<p class="text-gray-500">This may take a moment. The AI is reviewing your evidences and requirements.</p>
							</div>
						{:else if aiAnalysisError}
							<div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
								<div class="flex items-center gap-2 mb-2">
									<i class="fa-solid fa-circle-exclamation text-red-600"></i>
									<h3 class="font-semibold text-red-800">Latest Analysis Failed</h3>
								</div>
								<p class="text-red-600 text-sm">{aiAnalysisError}</p>
							</div>
						{/if}

						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-lg font-semibold text-gray-800">
								<i class="fa-solid fa-brain text-[#0A1628] mr-2"></i>
								AI Analysis History
							</h3>
							<span class="text-sm text-gray-500">
								{localAiAnalyses?.length || 0} analysis(es)
							</span>
						</div>

						{#if localAiAnalyses?.length > 0}
							<div class="overflow-x-auto border border-gray-200 rounded-lg">
								<table class="w-full text-sm">
									<thead class="bg-gray-50 border-b border-gray-200">
										<tr>
											<th class="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
											<th class="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
											<th class="text-center px-4 py-3 font-semibold text-gray-600">Files</th>
											<th class="text-center px-4 py-3 font-semibold text-gray-600">Requirements</th>
											<th class="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>
										</tr>
									</thead>
									<tbody class="divide-y divide-gray-100">
										{#each localAiAnalyses as analysis}
											<tr class="hover:bg-gray-50 transition-colors">
												<td class="px-4 py-3 text-gray-700">
													{formatDate(analysis.created_at)}
												</td>
												<td class="px-4 py-3">
													<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(analysis.status)}">
														{#if analysis.status === 'completed'}
															<i class="fa-solid fa-circle-check mr-1"></i>
														{:else}
															<i class="fa-solid fa-circle-xmark mr-1"></i>
														{/if}
														{analysis.status}
													</span>
												</td>
												<td class="px-4 py-3 text-center text-gray-600">
													{analysis.gemini_files_count}
												</td>
												<td class="px-4 py-3 text-center text-gray-600">
													{analysis.requirements_count}
												</td>
												<td class="px-4 py-3 text-center">
													<div class="flex items-center justify-center gap-1">
														<button
															type="button"
															class="btn btn-sm preset-tonal-primary"
															onclick={() => openAnalysisDetail(analysis)}
															title="View full analysis"
														>
															<i class="fa-solid fa-eye mr-1"></i>
															View
														</button>
														<button
															type="button"
															class="btn btn-sm preset-tonal-error"
															title="Delete analysis"
															disabled={deletingAnalysisId === analysis.id}
															onclick={() => deleteAnalysis(analysis.id)}
														>
															{#if deletingAnalysisId === analysis.id}
																<i class="fa-solid fa-spinner fa-spin"></i>
															{:else}
																<i class="fa-solid fa-trash"></i>
															{/if}
														</button>
													</div>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{:else}
							<div class="text-center py-8">
								<div class="inline-block p-4 rounded-full bg-[#0A1628]/10 mb-3">
									<i class="fa-solid fa-brain text-3xl text-[#0A1628]"></i>
								</div>
								<h3 class="text-lg font-semibold text-gray-800 mb-1">No AI Analyses Yet</h3>
								<p class="text-gray-600 text-sm">
									Click "Start AI Analysis" above to analyze all associated evidence files.
								</p>
							</div>
						{/if}
					</div>
				</div>

				{#if page.data.requirementAssessment.requirement.questions != null && Object.keys(page.data.requirementAssessment.requirement.questions).length !== 0}
						<div class="relative">
							{#if aiAppliedFields.has('answers')}
								<span class="absolute -top-2 -right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
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
					<div class="relative">
						{#if aiAppliedFields.has('status')}
							<span class="absolute -top-2 -right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
								<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
							</span>
						{/if}
						<Select
							{form}
							options={page.data.model.selectOptions['status']}
							field="status"
							label={m.status()}
							helpText={m.requirementAssessmentStatusHelpText()}
						/>
					</div>
					{#if computedResult}
						<p class="flex flex-row items-center space-x-4">
							<span class="font-medium">{m.result()}</span>
							<span
								class="badge text-sm font-semibold"
								style="background-color: {complianceResultColorMap[
									computedResult || 'not_assessed'
								] || '#ddd'}"
							>
								{safeTranslate(computedResult || 'not_assessed')}
							</span>
						</p>
					{:else}
						<div class="relative">
							{#if aiAppliedFields.has('result')}
								<span class="absolute -top-2 -right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
									<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
								</span>
							{/if}
							<Select
								{form}
								options={page.data.model.selectOptions['result']}
								field="result"
								label={m.result()}
								helpText={m.requirementAssessmentResultHelpText()}
							/>
						</div>
					{/if}
					{#if page.data.requirementAssessment.compliance_assessment.extended_result_enabled}
						<Select
							{form}
							options={page.data.model.selectOptions['extended_result']}
							field="extended_result"
							label={m.extendedResult()}
							helpText={m.extendedResultHelpText()}
						/>
					{/if}
					{#if computedScore !== null}
						<div class="flex flex-row items-center space-x-4">
							<span class="font-medium">{m.score()}</span>
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
								label={page.data.compliance_assessment_score.show_documentation_score
									? m.implementationScore()
									: m.score()}
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
						{/if}
					{/if}

					<div class="relative">
						{#if aiAppliedFields.has('observation')}
							<span class="absolute -top-2 -right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
								<i class="fa-solid fa-robot mr-1 text-[10px]"></i>AI
							</span>
						{/if}
						<MarkdownField {form} field="observation" label="Observation" />
					</div>
					<div class="flex flex-row justify-between space-x-4">
						<button
							class="btn bg-gray-400 text-white font-semibold w-full"
							type="button"
							onclick={cancel}>{m.cancel()}</button
						>
						<button
							class="btn preset-filled-secondary-500 font-semibold w-full"
							data-testid="save-no-continue-button"
							type="submit"
							onclick={() =>
								form.form.update((data) => {
									return { ...data, noRedirect: true };
								})}>{m.saveAndContinue()}</button
						>
						<button
							class="btn preset-filled-primary-500 font-semibold w-full"
							data-testid="save-button"
							type="submit">{m.save()}</button
						>
					</div>
				</div>
			{/snippet}
		</SuperForm>
	</div>
</div>

<!-- Audit / Change History Section — always visible with collapsible toggle -->
{@const auditEntries = data.auditLogEntries ?? []}
<div class="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
	<button
		type="button"
		class="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
		onclick={() => (showChangeHistory = !showChangeHistory)}
	>
		<h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
			<i class="fa-solid fa-clock-rotate-left text-gray-600"></i>
			Change History
			{#if auditEntries.length > 0}
				<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
					{auditEntries.length}
				</span>
			{/if}
		</h3>
		<i class="fa-solid {showChangeHistory ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400"></i>
	</button>

	{#if showChangeHistory}
		<div class="px-6 pb-6">
			{#if auditEntries.length === 0}
				<div class="text-center py-8 text-gray-400">
					<i class="fa-solid fa-clock-rotate-left text-3xl mb-2"></i>
					<p class="text-sm">No changes recorded yet.</p>
				</div>
			{:else}
				<div class="overflow-x-auto border border-gray-200 rounded-lg">
					<table class="w-full text-sm">
						<thead class="bg-gray-50 border-b border-gray-200">
							<tr>
								<th class="text-left px-4 py-3 font-semibold text-gray-600">Timestamp</th>
								<th class="text-left px-4 py-3 font-semibold text-gray-600">Actor</th>
								<th class="text-left px-4 py-3 font-semibold text-gray-600">Action</th>
								<th class="text-left px-4 py-3 font-semibold text-gray-600">Changes</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-100">
							{#each auditEntries as entry}
								<tr class="hover:bg-gray-50 transition-colors">
									<td class="px-4 py-3 text-gray-700 whitespace-nowrap">
										{new Date(entry.timestamp).toLocaleString()}
									</td>
									<td class="px-4 py-3">
										{#if entry.actor}
											<span class="inline-flex items-center gap-1">
												{#if entry.actor.toLowerCase().includes('ai') || entry.actor.toLowerCase().includes('service')}
													<i class="fa-solid fa-robot text-blue-500"></i>
												{:else}
													<i class="fa-solid fa-user text-gray-400"></i>
												{/if}
												<span class="text-gray-700">{entry.actor}</span>
											</span>
										{:else}
											<span class="text-gray-400 italic">System</span>
										{/if}
									</td>
									<td class="px-4 py-3">
										<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
											{entry.action === 'create' ? 'bg-green-100 text-green-700' :
											 entry.action === 'update' ? 'bg-blue-100 text-blue-700' :
											 entry.action === 'delete' ? 'bg-red-100 text-red-700' :
											 'bg-gray-100 text-gray-700'}">
											{entry.action}
										</span>
									</td>
									<td class="px-4 py-3">
										{#if entry.changes && typeof entry.changes === 'object'}
											<div class="space-y-1">
												{#each Object.entries(entry.changes) as [field, change]}
													<div class="text-xs">
														<span class="font-medium text-gray-600">{field}:</span>
														{#if Array.isArray(change) && change.length >= 2}
															<span class="text-red-500 line-through mr-1">{typeof change[0] === 'object' ? JSON.stringify(change[0]) : change[0]}</span>
															<i class="fa-solid fa-arrow-right text-gray-400 text-[8px] mx-1"></i>
															<span class="text-green-600">{typeof change[1] === 'object' ? JSON.stringify(change[1]) : change[1]}</span>
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
									<div class="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
										<i class="fa-solid fa-shield-halved text-indigo-600 text-sm"></i>
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
										<i class="fa-solid fa-circle-question mr-2 text-indigo-600"></i>
									{:else if sectionKey.toLowerCase().includes('gap')}
										<i class="fa-solid fa-triangle-exclamation mr-2 text-orange-500"></i>
									{:else if sectionKey.toLowerCase().includes('recommendation')}
										<i class="fa-solid fa-lightbulb mr-2 text-amber-500"></i>
									{:else if sectionKey.toLowerCase().includes('strength')}
										<i class="fa-solid fa-circle-check mr-2 text-green-500"></i>
									{:else if sectionKey.toLowerCase().includes('weakness')}
										<i class="fa-solid fa-circle-xmark mr-2 text-red-500"></i>
									{:else if sectionKey.toLowerCase().includes('finding')}
										<i class="fa-solid fa-magnifying-glass mr-2 text-blue-500"></i>
									{:else if sectionKey.toLowerCase().includes('evidence')}
										<i class="fa-solid fa-file-lines mr-2 text-teal-500"></i>
									{:else if sectionKey.toLowerCase().includes('assessment') || sectionKey.toLowerCase().includes('overall')}
										<i class="fa-solid fa-gauge mr-2 text-[#0A1628]"></i>
									{:else if sectionKey.toLowerCase().includes('control') || sectionKey.toLowerCase().includes('breakdown')}
										<i class="fa-solid fa-shield-halved mr-2 text-violet-500"></i>
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
													<div class="bg-indigo-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
														<span class="font-semibold text-indigo-800 text-sm">
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
																		<i class="fa-solid fa-shield-halved text-indigo-400 mr-1"></i>
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
															<div class="bg-blue-50 rounded-md p-3 border border-blue-100">
																<span class="font-medium text-blue-700"><i class="fa-solid fa-lightbulb mr-1"></i>Recommendation: </span>
																<span class="text-blue-800">{gRec}</span>
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
						<div class="mb-6 border border-blue-200 rounded-lg overflow-hidden">
							<div class="bg-blue-50 px-4 py-3 border-b border-blue-200">
								<h4 class="font-semibold text-blue-800">
									<i class="fa-solid fa-circle-info mr-2"></i>Note
								</h4>
							</div>
							<div class="p-4">
								<p class="text-blue-700 text-sm whitespace-pre-wrap">{noteText}</p>
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
					class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm font-semibold"
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
