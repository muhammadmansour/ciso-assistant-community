<script lang="ts">
	import { m } from '$paraglide/messages';

	interface Props {
		selectedAnalysis: Record<string, unknown> | null;
		subtitle?: string;
		enableGapToFinding?: boolean;
		enableReanalyze?: boolean;
		reanalyzeDisabled?: boolean;
		onClose: () => void;
		onConvertGap?: (idx: number, gap: string | null, recommendation: string | null) => void;
		onReanalyze?: () => void;
	}

	let {
		selectedAnalysis,
		subtitle = '',
		enableGapToFinding = false,
		enableReanalyze = false,
		reanalyzeDisabled = false,
		onClose,
		onConvertGap,
		onReanalyze
	}: Props = $props();

	let isModalExpanded = $state(false);

	const metadataKeys = new Set([
		'metadata', 'ref_id', 'name', 'description', 'status', 'category',
		'csf_function', 'timestamp', 'model', 'applied_control_id',
		'applied_control_ref', 'analysis_config', 'analysisconfig',
		'gemini_files_used', 'geminifilesused', 'questions_evaluated',
		'questionsevaluated', 'requirements_evaluated', 'requirementsevaluated',
		'typical_evidence_checked', 'typicalevidencechecked',
		'inline_files_processed', 'inlinefilesprocessed',
	]);

	const isReportSection = (key: string, value: unknown) =>
		typeof value === 'object' && value !== null && !metadataKeys.has(key.toLowerCase());

	function getField(obj: Record<string, unknown>, field: string): unknown {
		if (obj == null) return undefined;
		const lower = field.toLowerCase();
		for (const key of Object.keys(obj)) {
			if (key.toLowerCase() === lower) return obj[key];
		}
		return undefined;
	}

	const sectionOrder = [
		'overallassessment',
		'questionevaluation',
		'typicalevidencecheck',
		'gaps',
	];

	function getOrderedSections(result: Record<string, unknown>): [string, unknown][] {
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
		switch (status?.toLowerCase()) {
			case 'compliant': return 'text-green-700 bg-green-100';
			case 'partially compliant': return 'text-yellow-700 bg-yellow-100';
			case 'non-compliant': return 'text-red-700 bg-red-100';
			case 'insufficient evidence': return 'text-orange-700 bg-orange-100';
			case 'failed': return 'text-red-700 bg-red-100';
			case 'completed': return 'text-green-700 bg-green-100';
			default: return 'text-gray-700 bg-gray-100';
		}
	}

	function getScoreColor(score: number | null | undefined): string {
		if (score === null || score === undefined) return 'text-gray-500';
		if (score >= 80) return 'text-green-600';
		if (score >= 50) return 'text-yellow-600';
		return 'text-red-600';
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleString();
	}

	function closeModal() {
		isModalExpanded = false;
		onClose();
	}
</script>

{#if selectedAnalysis}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick={closeModal}></div>

		<div
			class="relative bg-white shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
			class:rounded-xl={!isModalExpanded}
			class:w-full={isModalExpanded}
			class:h-full={isModalExpanded}
			class:max-w-4xl={!isModalExpanded}
			class:max-h-[90vh]={!isModalExpanded}
			class:inset-0={isModalExpanded}
			class:absolute={isModalExpanded}
			style={isModalExpanded ? 'max-width:100%;max-height:100%;border-radius:0;' : ''}
		>
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#005FA3]/5 to-white">
				<div class="flex items-center gap-3">
					<div class="p-2 bg-[#005FA3]/10 rounded-lg">
						<i class="fa-solid fa-brain text-[#005FA3] text-lg"></i>
					</div>
					<div>
						<h2 class="text-lg font-bold text-gray-800">AI Analysis Report</h2>
						{#if subtitle}
							<p class="text-sm text-gray-500">{subtitle}</p>
						{/if}
						{#if selectedAnalysis.created_at}
							<p class="text-sm text-gray-500">{formatDate(String(selectedAnalysis.created_at))}</p>
						{/if}
					</div>
				</div>
				<div class="flex items-center gap-1">
					<button
						type="button"
						class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						onclick={() => (isModalExpanded = !isModalExpanded)}
						title={isModalExpanded ? 'Restore size' : 'Expand to fullscreen'}
					>
						<i class="fa-solid {isModalExpanded ? 'fa-compress' : 'fa-expand'} text-gray-500 text-lg"></i>
					</button>
					<button type="button" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" onclick={closeModal}>
						<i class="fa-solid fa-xmark text-gray-500 text-lg"></i>
					</button>
				</div>
			</div>

			<div class="overflow-y-auto flex-1 p-6">
				{#if selectedAnalysis.result}
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
						<div class="bg-gray-50 rounded-lg p-4 text-center">
							<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Score</p>
							<p class="text-2xl font-bold {getScoreColor(selectedAnalysis.score as number | null)}">
								{selectedAnalysis.score ?? '—'}
							</p>
						</div>
						<div class="bg-gray-50 rounded-lg p-4 text-center">
							<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Compliance</p>
							<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium {getStatusColor(String(selectedAnalysis.compliance_status || ''))}">
								{selectedAnalysis.compliance_status || '—'}
							</span>
						</div>
						<div class="bg-gray-50 rounded-lg p-4 text-center">
							<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Files</p>
							<p class="text-2xl font-bold text-gray-800">{selectedAnalysis.gemini_files_count ?? '—'}</p>
						</div>
						<div class="bg-gray-50 rounded-lg p-4 text-center">
							<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Requirements</p>
							<p class="text-2xl font-bold text-gray-800">{selectedAnalysis.requirements_count ?? '—'}</p>
						</div>
					</div>

					{#if selectedAnalysis.error_message}
						<div class="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
							<p class="text-sm text-red-700">
								<i class="fa-solid fa-triangle-exclamation mr-1"></i>
								{selectedAnalysis.error_message}
							</p>
						</div>
					{/if}

					{#if typeof selectedAnalysis.result === 'object'}
						{#each getOrderedSections(selectedAnalysis.result as Record<string, unknown>) as [sectionKey, sectionValue]}
							<div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
								<div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
									<h4 class="font-semibold text-gray-700 capitalize">
										{sectionKey.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
									</h4>
								</div>
								<div class="p-4">
									{#if typeof sectionValue === 'string'}
										<p class="text-gray-700 whitespace-pre-wrap">{sectionValue}</p>
									{:else if sectionKey.toLowerCase() === 'questionevaluation' && Array.isArray(sectionValue)}
										{#if sectionValue.length === 0}
											<p class="text-gray-400 italic">No questions evaluated</p>
										{:else}
											<div class="space-y-4">
												{#each sectionValue as item, idx}
													{@const qNum = getField(item as Record<string, unknown>, 'questionNumber') || idx + 1}
													{@const qText = getField(item as Record<string, unknown>, 'question')}
													{@const qAnswered = getField(item as Record<string, unknown>, 'answered')}
													{@const qEvidence = getField(item as Record<string, unknown>, 'evidenceFound')}
													{@const qSource = getField(item as Record<string, unknown>, 'sourceFile')}
													{@const qConfidence = getField(item as Record<string, unknown>, 'confidence')}
													{@const qNotes = getField(item as Record<string, unknown>, 'notes')}
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
															<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
																{#if qAnswered !== undefined && qAnswered !== null}
																	<div class="flex items-start gap-2">
																		<span class="font-medium text-gray-500 shrink-0">Answered:</span>
																		<span class="text-gray-800">{qAnswered}</span>
																	</div>
																{/if}
																{#if qEvidence}
																	<div class="flex items-start gap-2 col-span-full">
																		<span class="font-medium text-gray-500 shrink-0">Evidence:</span>
																		<span class="text-gray-800">{qEvidence}</span>
																	</div>
																{/if}
																{#if qSource}
																	<div class="flex items-start gap-2">
																		<span class="font-medium text-gray-500 shrink-0">Source File:</span>
																		<span class="text-gray-800">{qSource}</span>
																	</div>
																{/if}
															</div>
															{#if qNotes}
																<div class="bg-gray-50 rounded-md p-3 text-sm">
																	<span class="font-medium text-gray-500">Notes: </span>
																	<span class="text-gray-700">{qNotes}</span>
																</div>
															{/if}
														</div>
													</div>
												{/each}
											</div>
										{/if}
									{:else if sectionKey.toLowerCase() === 'typicalevidencecheck' && Array.isArray(sectionValue)}
										{#if sectionValue.length === 0}
											<p class="text-gray-400 italic">No evidence items checked</p>
										{:else}
											<div class="space-y-3">
												{#each sectionValue as item, idx}
													{@const eItem = getField(item as Record<string, unknown>, 'typicalEvidence') || getField(item as Record<string, unknown>, 'evidenceItem') || getField(item as Record<string, unknown>, 'evidence_item') || getField(item as Record<string, unknown>, 'typical_evidence') || getField(item as Record<string, unknown>, 'name')}
													{@const eStatus = getField(item as Record<string, unknown>, 'status')}
													{@const eFoundIn = getField(item as Record<string, unknown>, 'foundIn')}
													{@const eDetails = getField(item as Record<string, unknown>, 'details')}
													{@const statusLower = String(eStatus || '').toLowerCase()}
													{@const isPartial = statusLower.includes('partial') || statusLower.includes('جزئ')}
													{@const isNotFound = !isPartial && (statusLower.includes('غير') || statusLower.includes('not ') || statusLower.includes('missing') || statusLower.includes('absent') || statusLower.includes('not_found') || statusLower.includes('notfound'))}
													{@const isFound = !isPartial && !isNotFound && (statusLower.includes('found') || statusLower.includes('موجود') || statusLower.includes('present') || statusLower.includes('available') || statusLower.includes('متوفر'))}
													<div class="border border-gray-200 rounded-lg overflow-hidden">
														<div class="flex items-center justify-between px-4 py-2 border-b border-gray-100 {isFound ? 'bg-green-50' : isPartial ? 'bg-yellow-50' : 'bg-red-50'}">
															<span class="font-semibold text-sm text-gray-800">
																<i class="fa-solid fa-file-lines mr-1"></i>
																E{idx + 1}
															</span>
															{#if eStatus}
																<span class="text-xs font-medium px-2 py-0.5 rounded-full {isFound ? 'bg-green-100 text-green-700' : isPartial ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}">
																	{eStatus}
																</span>
															{/if}
														</div>
														<div class="p-4 space-y-2 text-sm">
															{#if eItem}
																<p class="text-gray-800 font-medium">{eItem}</p>
															{/if}
															{#if eFoundIn}
																<div class="flex items-start gap-2">
																	<span class="font-medium text-gray-500 shrink-0">Found In:</span>
																	<span class="text-gray-800">{eFoundIn}</span>
																</div>
															{/if}
															{#if eDetails}
																<div class="bg-gray-50 rounded-md p-3">
																	<span class="font-medium text-gray-500">Details: </span>
																	<span class="text-gray-700">{eDetails}</span>
																</div>
															{/if}
														</div>
													</div>
												{/each}
											</div>
										{/if}
									{:else if sectionKey.toLowerCase().includes('gap') && (Array.isArray(sectionValue) || (typeof sectionValue === 'object' && sectionValue !== null && Array.isArray((sectionValue as Record<string, unknown>).gaps)))}
										{@const gapItems = Array.isArray(sectionValue) ? sectionValue : ((sectionValue as Record<string, unknown>).gaps as unknown[] || [])}
										{#if gapItems.length === 0}
											<p class="text-gray-400 italic">No gaps identified</p>
										{:else}
											<div class="space-y-3">
												{#each gapItems as item, idx}
													{@const gRequirement = getField(item as Record<string, unknown>, 'requirement') || getField(item as Record<string, unknown>, 'requirement_text')}
													{@const gCurrentState = getField(item as Record<string, unknown>, 'currentState') || getField(item as Record<string, unknown>, 'current_state') || getField(item as Record<string, unknown>, 'currentStatus')}
													{@const gGap = getField(item as Record<string, unknown>, 'gap') || getField(item as Record<string, unknown>, 'description') || getField(item as Record<string, unknown>, 'text')}
													{@const gRec = getField(item as Record<string, unknown>, 'recommendation') || getField(item as Record<string, unknown>, 'action')}
													<div class="border border-orange-200 rounded-lg overflow-hidden">
														<div class="bg-orange-50 px-4 py-2 border-b border-orange-200">
															<span class="font-semibold text-orange-800 text-sm">
																<i class="fa-solid fa-triangle-exclamation mr-1"></i>
																Gap {idx + 1}
															</span>
														</div>
														<div class="p-4 space-y-3 text-sm">
															{#if gRequirement}
																<div>
																	<span class="font-medium text-gray-500">Requirement:</span>
																	<p class="text-gray-800 mt-0.5">{gRequirement}</p>
																</div>
															{/if}
															{#if gCurrentState}
																<div>
																	<span class="font-medium text-gray-500">Current State:</span>
																	<p class="text-gray-800 mt-0.5">{gCurrentState}</p>
																</div>
															{/if}
															{#if gGap}
																<div>
																	<span class="font-medium text-orange-700">Gap:</span>
																	<p class="text-gray-800 font-medium mt-0.5">{gGap}</p>
																</div>
															{/if}
															{#if gRec}
																<div class="bg-blue-50 rounded-md p-3 border border-blue-100">
																	<span class="font-medium text-blue-700"><i class="fa-solid fa-lightbulb mr-1"></i>Recommendation: </span>
																	<span class="text-blue-800">{gRec}</span>
																</div>
															{/if}
															{#if enableGapToFinding && onConvertGap}
																<div class="flex justify-end pt-1">
																	<button
																		type="button"
																		class="btn btn-sm rounded-lg bg-[#0A1628] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a2740]"
																		onclick={() => onConvertGap(idx, gGap ? String(gGap) : null, gRec ? String(gRec) : null)}
																	>
																		<i class="fa-solid fa-clipboard-list mr-1"></i>
																		{m.convertToFinding()}
																	</button>
																</div>
															{/if}
														</div>
													</div>
												{/each}
											</div>
										{/if}
									{:else if Array.isArray(sectionValue)}
										{#if sectionValue.length === 0}
											<p class="text-gray-400 italic">No items</p>
										{:else}
											<ul class="space-y-2">
												{#each sectionValue as item}
													{#if typeof item === 'string'}
														<li class="flex items-start gap-2">
															<i class="fa-solid fa-circle-check text-green-500 mt-1 text-sm"></i>
															<span class="text-gray-700">{item}</span>
														</li>
													{:else if typeof item === 'object' && item !== null}
														<li class="bg-gray-50 rounded-lg p-3 border border-gray-100">
															{#each Object.entries(item as Record<string, unknown>) as [k, v]}
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
									{:else if typeof sectionValue === 'object' && sectionValue !== null}
										<div class="space-y-2">
											{#each Object.entries(sectionValue as Record<string, unknown>) as [k, v]}
												<div class="flex items-start gap-2">
													<span class="font-medium text-gray-600 capitalize min-w-[140px]">{k.replace(/_/g, ' ')}:</span>
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
					{:else}
						<div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
							<pre class="whitespace-pre-wrap text-gray-700 text-sm">{JSON.stringify(selectedAnalysis.result, null, 2)}</pre>
						</div>
					{/if}
				{:else}
					<div class="text-center py-12">
						<p class="text-gray-500">No analysis data available.</p>
					</div>
				{/if}
			</div>

			<div class="flex items-center gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
				{#if enableReanalyze && onReanalyze}
					<button
						type="button"
						class="btn bg-amber-500 hover:bg-amber-600 text-white shadow-sm font-semibold
							disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
						disabled={reanalyzeDisabled}
						onclick={onReanalyze}
					>
						<i class="fa-solid fa-rotate mr-2"></i>
						Re-Analyze
					</button>
				{/if}
				<div class="flex-1"></div>
				<button type="button" class="btn preset-filled-surface-200-800" onclick={closeModal}>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}
