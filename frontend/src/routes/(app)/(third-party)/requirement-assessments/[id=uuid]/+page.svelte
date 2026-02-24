<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { complianceResultColorMap, complianceStatusColorMap } from '$lib/utils/constants';
	import {
		displayScoreColor,
		formatScoreValue,
		getRequirementTitle,
		getSecureRedirect
	} from '$lib/utils/helpers';
	import { safeTranslate } from '$lib/utils/i18n';
	import { toCamelCase } from '$lib/utils/locales';
	import { hideSuggestions } from '$lib/utils/stores';
	import { m } from '$paraglide/messages';
	import { ProgressRing, Tabs } from '@skeletonlabs/skeleton-svelte';
	import type { PageData } from '../[id=uuid]/$types';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import { countMasked } from '$lib/utils/related-visibility';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const threats = data.requirementAssessment.requirement.associated_threats ?? [];
	const reference_controls =
		data.requirementAssessment.requirement.associated_reference_controls ?? [];
	const annotation = data.requirement.annotation;
	const typical_evidence = data.requirement.typical_evidence;

	const has_threats = threats.length > 0;
	const has_reference_controls = reference_controls.length > 0;

	let mappingInference = $derived({
		sourceRequirementAssessment:
			data.requirementAssessment.mapping_inference.source_requirement_assessment,
		result: data.requirementAssessment.mapping_inference.result,
		annotation: ''
	});

	const title = getRequirementTitle(data.requirement.ref_id, data.requirement.name)
		? getRequirementTitle(data.requirement.ref_id, data.requirement.name)
		: getRequirementTitle(data.parent.ref_id, data.parent.name);

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

	const complianceAssessmentURL = `/compliance-assessments/${data.requirementAssessment.compliance_assessment.id}`;

	function cancel(): void {
		goto(complianceAssessmentURL);
	}

	let classesText = $derived(
		complianceResultColorMap[mappingInference.result] === '#000000' ? 'text-white' : ''
	);

	const max_score = data.complianceAssessmentScore.max_score;
	const score = data.requirementAssessment.score;
	const documentationScore = data.requirementAssessment.documentation_score;

	let group = $state(page.data.user.is_third_party ? 'evidence' : 'applied_controls');

	// Collapsible sections
	let qaExpanded = $state(false);

	function getStatusBadgeClass(status: string): string {
		const s = (status || '').toLowerCase().replace(/[_\s-]+/g, '');
		if (s === 'todo') return 'bg-gray-100 text-gray-700';
		if (s === 'inprogress') return 'bg-blue-100 text-blue-700';
		if (s === 'inreview') return 'bg-amber-100 text-amber-700';
		if (s === 'done') return 'bg-green-100 text-green-700';
		return 'bg-gray-100 text-gray-700';
	}

	function getResultBadgeClass(result: string): string {
		const r = (result || '').toLowerCase().replace(/[_\s-]+/g, '');
		if (r === 'compliant') return 'bg-green-100 text-green-700';
		if (r === 'partiallycompliant') return 'bg-amber-100 text-amber-700';
		if (r === 'noncompliant') return 'bg-red-100 text-red-700';
		if (r === 'notapplicable') return 'bg-blue-100 text-blue-700';
		return 'bg-gray-100 text-gray-600';
	}

	function getResultIcon(result: string): string {
		const r = (result || '').toLowerCase().replace(/[_\s-]+/g, '');
		if (r === 'compliant') return 'fa-circle-check text-green-600';
		if (r === 'partiallycompliant') return 'fa-triangle-exclamation text-amber-600';
		if (r === 'noncompliant') return 'fa-circle-xmark text-red-600';
		if (r === 'notapplicable') return 'fa-ban text-blue-500';
		return 'fa-circle-info text-gray-400';
	}
</script>

<div class="flex flex-col h-full">
	<!-- ═══════════════════════════════════════════════════════════════════════
	     HEADER BAR
	     ═══════════════════════════════════════════════════════════════════════ -->
	<div class="px-6 pt-5 pb-3 border-b border-gray-100 bg-white">
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
									{ig}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>
			<a
				href="/requirement-assessments/{data.requirementAssessment.id}/edit?next={complianceAssessmentURL}"
				class="flex items-center gap-2 bg-[#0077CC] hover:bg-[#005FA3] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
			>
				<i class="fa-solid fa-pen-to-square"></i>
				<span>{m.edit()}</span>
			</a>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     MAIN CONTENT AREA
	     ═══════════════════════════════════════════════════════════════════════ -->
	<div class="flex-1 overflow-auto">
		<div class="p-6 pb-20 space-y-6">
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
											<span class="ml-2 badge h-fit">{safeTranslate(toCamelCase(mappingInference.sourceRequirementAssessment.coverage))}</span>
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

					<!-- Tabs Card: Applied Controls / Evidences -->
					<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
						<Tabs
							value={group}
							onValueChange={(e) => { group = e.value; }}
						>
							{#snippet list()}
							{#if !page.data.user.is_third_party}
								<Tabs.Control value="applied_controls">
									{m.appliedControls()}
									{#if data.requirementAssessment.applied_controls?.length > 0}
										<span class="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-[#0077CC]/10 text-[#0077CC] font-medium">
											{data.requirementAssessment.applied_controls.length}
										</span>
									{/if}
								</Tabs.Control>
							{/if}
							<Tabs.Control value="evidence">{m.evidences()}</Tabs.Control>
						{/snippet}
							{#snippet content()}
								<Tabs.Panel value="applied_controls">
									{#if !page.data.user.is_third_party}
										<div class="flex items-center mb-2 px-2 text-xs space-x-2 text-gray-500">
											<i class="fa-solid fa-info-circle"></i>
											<p>{m.requirementAppliedControlHelpText()}</p>
										</div>
										<div class="h-full flex flex-col space-y-2 rounded-container p-4">
											<ModelTable
												source={data.tables['applied-controls']}
												hideFilters={true}
												URLModel="applied-controls"
												expectedCount={countMasked(data.requirementAssessment.applied_controls)}
												baseEndpoint="/applied-controls?requirement_assessments={page.data.requirementAssessment.id}"
											/>
										</div>
									{/if}
								</Tabs.Panel>
								<Tabs.Panel value="evidence">
									<div class="flex items-center mb-2 px-2 text-xs space-x-2 text-gray-500">
										<i class="fa-solid fa-info-circle"></i>
										<p>{m.requirementEvidenceHelpText()}</p>
									</div>
									<div class="h-full flex flex-col space-y-2 rounded-container p-4">
										<ModelTable
											source={data.tables['evidences']}
											hideFilters={true}
											URLModel="evidences"
											expectedCount={countMasked(data.requirementAssessment.evidences)}
											baseEndpoint="/evidences?requirement_assessments={page.data.requirementAssessment.id}"
										/>
									</div>
								</Tabs.Panel>
							{/snippet}
						</Tabs>
					</div>

					<!-- Questions Section (collapsible) -->
					{#if data.requirementAssessment.requirement.questions != null && Object.keys(data.requirementAssessment.requirement.questions).length !== 0}
						<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
							<button
								type="button"
								onclick={() => (qaExpanded = !qaExpanded)}
								class="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors"
							>
							<div class="flex items-center gap-2.5">
								<i class="fa-solid fa-robot text-[#0077CC]"></i>
								<h3 class="text-sm font-semibold text-gray-900">AI Analysis Questions</h3>
								<span class="text-xs bg-[#0077CC]/10 text-[#0077CC] px-2 py-0.5 rounded-full font-medium">
									{Object.keys(data.requirementAssessment.requirement.questions).length}
								</span>
								</div>
								<i class="fa-solid {qaExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400"></i>
							</button>
							{#if qaExpanded}
								<div class="px-5 pb-5 space-y-3">
									{#each Object.entries(data.requirementAssessment.requirement.questions) as [urn, question], i}
										<div class="bg-gray-50 rounded-xl border border-gray-100 p-4">
											<div class="flex items-start justify-between gap-4">
												<div class="flex-1 min-w-0">
													<div class="flex items-center gap-2 mb-2">
														<span class="text-[11px] font-semibold text-gray-400 uppercase">Q{i + 1}</span>
														<span class="text-[11px] text-gray-300">{safeTranslate(question.type)}</span>
													</div>
													<p class="text-sm text-gray-700 leading-relaxed">{question.text}</p>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/if}

					<!-- Observation Section -->
					{#if data.requirementAssessment.observation}
						<div class="bg-white rounded-xl border border-gray-200 p-5">
							<div class="flex items-center gap-2 mb-3">
								<i class="fa-solid fa-note-sticky text-gray-400"></i>
								<h3 class="text-sm font-semibold text-gray-900">{m.observation()}</h3>
							</div>
							<div class="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-100">
								<MarkdownRenderer content={data.requirementAssessment.observation} />
							</div>
						</div>
					{/if}
				</div>

				<!-- ────────────────────────────────────────────────────────────
				     RIGHT SIDEBAR (1 of 3)
				     ──────────────────────────────────────────────────────────── -->
				<div class="space-y-5">
					<!-- Status / Result / Score Card -->
					<div class="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
						<!-- Status -->
						<div>
							<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
								<i class="fa-solid fa-clock text-xs"></i>
								{m.status()}
							</label>
							<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium {getStatusBadgeClass(data.requirementAssessment.status)}"
								style="background-color: {complianceStatusColorMap[data.requirementAssessment.status] ?? '#d1d5db'}44;"
							>
								<span class="w-1.5 h-1.5 rounded-full flex-shrink-0"
									style="background-color: {complianceStatusColorMap[data.requirementAssessment.status] ?? '#9ca3af'};"
								></span>
								{safeTranslate(data.requirementAssessment.status)}
							</span>
						</div>

						<!-- Result -->
						<div class="border-t border-gray-100 pt-5">
							<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
								<i class="fa-solid {getResultIcon(data.requirementAssessment.result)} text-xs"></i>
								{m.result()}
							</label>
							<span
								class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
								style="background-color: {complianceResultColorMap[data.requirementAssessment.result] ?? '#d1d5db'}33; color: {complianceResultColorMap[data.requirementAssessment.result] ?? '#666'}"
							>
								{safeTranslate(data.requirementAssessment.result)}
							</span>
						</div>

						<!-- Scoring -->
						{#if data.requirementAssessment.is_scored}
							<div class="border-t border-gray-100 pt-5">
								<label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
									<i class="fa-solid fa-chart-simple text-xs"></i>
									{m.score()}
								</label>
								<div class="flex items-center gap-4">
									<ProgressRing
										strokeWidth="20px"
										meterStroke={displayScoreColor(score, max_score)}
										value={formatScoreValue(score, max_score)}
										classes="shrink-0"
										size="size-12"
									>{score}</ProgressRing>
									{#if data.complianceAssessmentScore.show_documentation_score}
										<div class="flex items-center gap-2">
											<span class="text-xs text-gray-400">Doc:</span>
											<ProgressRing
												strokeWidth="20px"
												meterStroke={displayScoreColor(documentationScore, max_score)}
												value={formatScoreValue(documentationScore, max_score)}
												classes="shrink-0"
												size="size-10"
											>{documentationScore}</ProgressRing>
										</div>
									{/if}
								</div>
							</div>
						{:else}
							<div class="border-t border-gray-100 pt-5">
								<div class="flex items-center justify-between">
									<label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">{m.score()}</label>
									<span class="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">Disabled</span>
								</div>
							</div>
						{/if}
					</div>

					<!-- Quick Actions Card -->
					<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
						<div class="p-4 border-b border-gray-100">
							<div class="flex items-center gap-2">
								<i class="fa-solid fa-bolt text-gray-400 text-xs"></i>
								<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Actions</h3>
							</div>
						</div>
						<div class="p-3 space-y-1.5">
							<a
								href="/requirement-assessments/{data.requirementAssessment.id}/edit?next={complianceAssessmentURL}"
								class="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
							>
								<i class="fa-solid fa-pen-to-square text-[#0077CC] text-xs w-4 text-center"></i>
								{m.edit()}
							</a>
							<a
								href={complianceAssessmentURL}
								class="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
							>
								<i class="fa-solid fa-arrow-left text-gray-400 text-xs w-4 text-center"></i>
								{m.back()}
							</a>
						</div>
					</div>

					<!-- Mapping Inference Card (if exists) -->
					{#if mappingInference.result}
						<div class="bg-white rounded-xl border border-gray-200 p-5">
							<div class="flex items-center gap-2 mb-3">
								<i class="fa-solid fa-link text-gray-400 text-xs"></i>
								<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">{m.mappingInference()}</h3>
							</div>
							<p class="text-xs text-gray-400 mb-3">
								<i class="fa-solid fa-circle-info mr-1"></i>{m.mappingInferenceHelpText()}
							</p>
							<div class="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2">
								<a class="text-sm text-[#0077CC] hover:underline font-medium" href="/requirement-assessments/{mappingInference.sourceRequirementAssessment.id}">
									{mappingInference.sourceRequirementAssessment.str}
								</a>
								<div class="flex items-center gap-2 flex-wrap">
									<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
										{safeTranslate(toCamelCase(mappingInference.sourceRequirementAssessment.coverage))}
									</span>
									<span
										class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {classesText}"
										style="background-color: {complianceResultColorMap[mappingInference.result]};"
									>
										{safeTranslate(mappingInference.result)}
									</span>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     STICKY BOTTOM BAR
	     ═══════════════════════════════════════════════════════════════════════ -->
	<div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-3.5 flex items-center justify-between z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
		<button
			type="button"
			onclick={cancel}
			class="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
		>
			{m.back()}
		</button>
		<a
			href="/requirement-assessments/{data.requirementAssessment.id}/edit?next={complianceAssessmentURL}"
			class="px-6 py-2.5 text-sm font-medium text-white bg-[#0077CC] hover:bg-[#005FA3] rounded-lg transition-colors shadow-sm flex items-center gap-2"
		>
			<i class="fa-solid fa-pen-to-square"></i>
			{m.edit()}
		</a>
	</div>
</div>
