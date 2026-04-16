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
	const typicalEvidenceLines = typical_evidence ? typical_evidence.split('\n') : [];

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

	function cancel(): void {
		const AuditURL = `/compliance-assessments/${data.requirementAssessment.compliance_assessment.id}`;
		goto(AuditURL);
	}

	let classesText = $derived(
		complianceResultColorMap[mappingInference.result] === '#000000' ? 'text-white' : ''
	);

	const max_score = data.complianceAssessmentScore.max_score;
	const score = data.requirementAssessment.score;
	const documentationScore = data.requirementAssessment.documentation_score;

	let group = $state(page.data.user.is_third_party ? 'evidence' : 'applied_controls');

	// ── Audit Trail / Change History (PRD 2.2) ──────────────────
	let showChangeHistory = $state(false);
	let auditEntries: any[] = $state(data.auditLogEntries ?? []);

	$effect(() => {
		auditEntries = data.auditLogEntries ?? [];
	});

	const ALLOWED_CHANGE_FIELDS = new Set(['result', 'status', 'observation', 'answers', 'score']);

	// Build lookup maps: questionUrn→Q1/Q2, choiceUrn→label
	const questionUrnToLabel: Record<string, string> = {};
	const choiceUrnToLabel: Record<string, string> = {};
	$effect(() => {
		const reqQ = data.requirementAssessment?.requirement?.questions;
		if (reqQ && typeof reqQ === 'object') {
			Object.entries(reqQ).forEach(([urn, q]: [string, any], idx: number) => {
				questionUrnToLabel[urn] = `Q${idx + 1}`;
				if (Array.isArray(q?.choices)) {
					q.choices.forEach((c: any) => {
						if (c.urn && c.value) choiceUrnToLabel[c.urn] = c.value;
					});
				}
			});
		}
	});

	function cleanFieldLabel(field: string): string {
		if (field === 'result') return 'Result';
		if (field === 'status') return 'Status';
		if (field === 'observation') return 'Observation';
		if (field === 'answers') return 'Answers';
		if (field === 'score') return 'Score';
		return field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
	}

	// Track which change-history values are expanded (key = "entryIdx-field-side")
	let expandedValues: Record<string, boolean> = $state({});

	function toggleExpand(key: string) {
		expandedValues[key] = !expandedValues[key];
	}

	const TRUNCATE_LENGTH = 120;

	function cleanValue(field: string, val: any): string {
		if (val === null || val === undefined || val === '' || val === 'None') return '—';
		if (field === 'status' || field === 'result') {
			return String(val).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
		}
		if (field === 'observation') {
			let text = String(val);
			text = text.replace(/\[AI\s+An(?:alysis|a)[^\]]*\]\s*/gi, '').trim();
			return text || '—';
		}
		if (field === 'answers') {
			let obj = val;
			if (typeof obj === 'string') {
				try { obj = JSON.parse(obj); } catch { return '—'; }
			}
			if (typeof obj !== 'object' || obj === null) return '—';
			const parts: string[] = [];
			for (const [qUrn, aVal] of Object.entries(obj)) {
				const qLabel = questionUrnToLabel[qUrn] || qUrn.split(':').pop() || '?';
				if (aVal === null || aVal === undefined) {
					parts.push(`${qLabel}: —`);
				} else if (typeof aVal === 'string') {
					parts.push(`${qLabel}: ${choiceUrnToLabel[aVal] || aVal.split(':').pop() || aVal}`);
				} else if (Array.isArray(aVal)) {
					const labels = (aVal as string[]).map((v: string) => choiceUrnToLabel[v] || v.split(':').pop() || v);
					parts.push(`${qLabel}: ${labels.join(', ')}`);
				} else {
					parts.push(`${qLabel}: ${String(aVal)}`);
				}
			}
			return parts.join(' · ') || '—';
		}
		return String(val);
	}

	function truncateText(text: string, maxLen: number = TRUNCATE_LENGTH): string {
		if (text.length <= maxLen) return text;
		return text.substring(0, maxLen) + '…';
	}

	function isLongText(text: string): boolean {
		return text.length > TRUNCATE_LENGTH;
	}

	let filteredAuditEntries = $derived.by(() => {
		return (auditEntries || []).map((entry: any) => {
			if (!entry.changes || typeof entry.changes !== 'object') return null;
			const filtered: Record<string, any> = {};
			for (const [field, change] of Object.entries(entry.changes)) {
				if (ALLOWED_CHANGE_FIELDS.has(field)) {
					filtered[field] = change;
				}
			}
			if (Object.keys(filtered).length === 0) return null;
			return { ...entry, changes: filtered };
		}).filter(Boolean);
	});
</script>

<div class="card space-y-2 p-4 bg-white shadow-sm">
	<div class="flex flex-row space-x-2 items-center">
		<code class="code">{data.requirement.urn}</code>
		<span
			class="badge h-fit"
			style="background-color: {complianceStatusColorMap[data.requirementAssessment.status] ??
				'#d1d5db'};"
		>
			{safeTranslate(data.requirementAssessment.status)}
		</span>
		<span
			class="badge {classesText} h-fit"
			style="background-color: {complianceResultColorMap[data.requirementAssessment.result] ??
				'#d1d5db'};"
		>
			{safeTranslate(data.requirementAssessment.result)}
		</span>
		{#if data.requirement.implementation_groups?.length > 0}
			<div class="ml-3">
				<b class="mr-2">Implemetation Groups :</b>
				{#each data.requirement.implementation_groups as ig}
					<span class="badge bg-blue-100">
						{ig}
					</span>
				{/each}
			</div>
		{/if}
		{#if data.requirementAssessment.is_scored}
			<ProgressRing
				strokeWidth="20px"
				meterStroke={displayScoreColor(score, max_score)}
				value={formatScoreValue(score, max_score)}
				classes="shrink-0"
				size="size-10">{score}</ProgressRing
			>
			{#if data.complianceAssessmentScore.show_documentation_score}
				<ProgressRing
					strokeWidth="20px"
					meterStroke={displayScoreColor(documentationScore, max_score)}
					value={formatScoreValue(documentationScore, max_score)}
					classes="shrink-0"
					size="size-10">{documentationScore}</ProgressRing
				>
			{/if}
		{/if}
	</div>
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
	{#if has_threats || has_reference_controls || annotation || mappingInference.result}
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
						{#each typicalEvidenceLines as line}
							{#if line.trim().includes('[EXCLUDED]')}
								<div class="opacity-50 flex items-start gap-1">
									<span class="inline-flex items-center shrink-0 mt-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-amber-100 text-amber-700 border border-amber-200">
										<i class="fa-solid fa-ban mr-0.5 text-[7px]"></i>AI-Excluded
									</span>
									<MarkdownRenderer content={line.replace('[EXCLUDED]', '').trim()} />
								</div>
							{:else if line.trim()}
								<MarkdownRenderer content={line} />
							{/if}
						{/each}
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
										{safeTranslate(
											toCamelCase(mappingInference.sourceRequirementAssessment.coverage)
										)}
									</span>
								</p>
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
	<div>
		<Tabs
			value={group}
			onValueChange={(e) => {
				group = e.value;
			}}
		>
			{#snippet list()}
				{#if !page.data.user.is_third_party}
					<Tabs.Control value="applied_controls" stateActive="border-b-[#1D53DA] opacity-100">{m.appliedControls()}</Tabs.Control>
				{/if}
				<Tabs.Control value="evidence" stateActive="border-b-[#1D53DA] opacity-100">{m.evidences()}</Tabs.Control>
			{/snippet}
			{#snippet content()}
				<Tabs.Panel value="applied_controls">
					{#if !page.data.user.is_third_party}
						<div class="flex items-center mb-2 px-2 text-xs space-x-2">
							<i class="fa-solid fa-info-circle"></i>
							<p>{m.requirementAppliedControlHelpText()}</p>
						</div>
						<div class="h-full flex flex-col space-y-2 rounded-container p-4">
							<ModelTable
								source={data.tables['applied-controls']}
								hideFilters={true}
								URLModel="applied-controls"
								expectedCount={countMasked(data.requirementAssessment.applied_controls)}
								baseEndpoint="/applied-controls?requirement_assessments={page.data
									.requirementAssessment.id}"
							/>
						</div>
					{/if}
				</Tabs.Panel>
				<Tabs.Panel value="evidence">
					<div class="flex items-center mb-2 px-2 text-xs space-x-2">
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
	{#if data.requirementAssessment.requirement.questions != null && Object.keys(data.requirementAssessment.requirement.questions).length !== 0}
		<h1 class="font-semibold text-sm">{m.questions()}</h1>
		{#each Object.entries(data.requirementAssessment.requirement.questions) as [urn, question]}
			<li class="flex justify-between items-center border rounded-xl p-2 disabled {question.excluded ? 'opacity-50' : ''}">
				<p>
					{question.text} ({safeTranslate(question.type)})
					{#if question.excluded}
						<span class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200">
							<i class="fa-solid fa-ban mr-1 text-[8px]"></i>Excluded from AI Analysis
						</span>
					{/if}
				</p>
			</li>
		{/each}
	{/if}
	{#if data.requirementAssessment.observation}
		<div class="card p-4 space-y-2 preset-tonal-primary">
			<h1 class="font-semibold text-sm">{m.observation()}</h1>
			<div class="text-sm">
				<MarkdownRenderer content={data.requirementAssessment.observation} />
			</div>
		</div>
	{/if}
	<!-- Change History / Audit Trail (PRD 2.2) -->
	<div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
		<button
			type="button"
			class="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
			onclick={() => (showChangeHistory = !showChangeHistory)}
		>
			<span class="text-sm font-semibold text-gray-700 flex items-center gap-2">
				<i class="fa-solid fa-clock-rotate-left text-gray-500"></i>
				Change History
				{#if filteredAuditEntries.length > 0}
					<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
						{filteredAuditEntries.length}
					</span>
				{/if}
			</span>
			<i class="fa-solid {showChangeHistory ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400 text-xs"></i>
		</button>
		{#if showChangeHistory}
			<div class="px-4 pb-4">
				{#if filteredAuditEntries.length === 0}
					<div class="text-center py-6 text-gray-400">
						<i class="fa-solid fa-clock-rotate-left text-2xl mb-2"></i>
						<p class="text-sm">No changes recorded yet.</p>
					</div>
				{:else}
					<div class="mt-3 space-y-3">
						{#each filteredAuditEntries as entry, entryIdx}
							<div class="border border-gray-100 rounded-lg overflow-hidden">
								<!-- Entry header -->
								<div class="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
									<div class="flex items-center gap-2 text-xs text-gray-500">
										{#if entry.actor}
											{#if entry.actor.toLowerCase().includes('ai') || entry.actor.toLowerCase().includes('service')}
												<i class="fa-solid fa-robot text-[#005FA3]"></i>
											{:else}
												<i class="fa-solid fa-user text-gray-400"></i>
											{/if}
											<span class="font-medium text-gray-700">{entry.actor}</span>
										{:else}
											<i class="fa-solid fa-gear text-gray-400"></i>
											<span class="text-gray-400">System</span>
										{/if}
										<span class="text-gray-300">·</span>
										<span>{new Date(entry.timestamp).toLocaleString()}</span>
									</div>
									<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide
										{entry.action === 'create' ? 'bg-emerald-100 text-emerald-700' :
										 entry.action === 'update' ? 'bg-blue-100 text-blue-700' :
										 entry.action === 'delete' ? 'bg-red-100 text-red-700' :
										 'bg-gray-100 text-gray-600'}">
										{entry.action}
									</span>
								</div>
								<!-- Changed fields -->
								<div class="divide-y divide-gray-50">
									{#each Object.entries(entry.changes) as [field, change]}
										<div class="px-4 py-2.5 flex items-start gap-3">
											<span class="text-xs font-semibold text-gray-500 min-w-[80px] shrink-0 pt-0.5">
												{cleanFieldLabel(field)}
											</span>
											<div class="flex-1 text-xs">
												{#if Array.isArray(change) && change.length >= 2}
													{@const oldText = cleanValue(field, change[0])}
													{@const newText = cleanValue(field, change[1])}
													<div class="flex flex-col gap-1.5">
														<!-- Old value -->
														<div class="flex items-start gap-2">
															<span class="inline-flex items-center px-2 py-0.5 rounded bg-red-50 text-red-600 line-through whitespace-pre-wrap break-words max-w-full">
																{#if isLongText(oldText) && !expandedValues[`${entryIdx}-${field}-old`]}
																	{truncateText(oldText)}
																{:else}
																	{oldText}
																{/if}
															</span>
														</div>
														{#if isLongText(oldText)}
															<button
																type="button"
																class="text-[#005FA3] hover:underline text-[10px] font-medium self-start"
																onclick={() => toggleExpand(`${entryIdx}-${field}-old`)}
															>
																{expandedValues[`${entryIdx}-${field}-old`] ? 'Show less' : 'Read more'}
															</button>
														{/if}
														<!-- Arrow -->
														<i class="fa-solid fa-arrow-down text-gray-300 text-[8px] self-start ml-2"></i>
														<!-- New value -->
														<div class="flex items-start gap-2">
															<span class="inline-flex items-center px-2 py-0.5 rounded bg-green-50 text-green-700 font-medium whitespace-pre-wrap break-words max-w-full">
																{#if isLongText(newText) && !expandedValues[`${entryIdx}-${field}-new`]}
																	{truncateText(newText)}
																{:else}
																	{newText}
																{/if}
															</span>
														</div>
														{#if isLongText(newText)}
															<button
																type="button"
																class="text-[#005FA3] hover:underline text-[10px] font-medium self-start"
																onclick={() => toggleExpand(`${entryIdx}-${field}-new`)}
															>
																{expandedValues[`${entryIdx}-${field}-new`] ? 'Show less' : 'Read more'}
															</button>
														{/if}
													</div>
												{:else}
													{@const singleText = cleanValue(field, change)}
													<span class="text-gray-600 whitespace-pre-wrap break-words">
														{#if isLongText(singleText) && !expandedValues[`${entryIdx}-${field}`]}
															{truncateText(singleText)}
														{:else}
															{singleText}
														{/if}
													</span>
													{#if isLongText(singleText)}
														<button
															type="button"
															class="text-[#005FA3] hover:underline text-[10px] font-medium block mt-0.5"
															onclick={() => toggleExpand(`${entryIdx}-${field}`)}
														>
															{expandedValues[`${entryIdx}-${field}`] ? 'Show less' : 'Read more'}
														</button>
													{/if}
												{/if}
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div class="flex flex-row justify-between space-x-4">
		<button class="btn bg-gray-400 text-white font-semibold w-full" type="button" onclick={cancel}
			>{m.back()}</button
		>
	</div>
</div>
