<script lang="ts">
	import DonutChart from '$lib/components/Chart/DonutChart.svelte';
	import { m } from '$paraglide/messages';
	import { page } from '$app/state';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { displayScoreColor, formatScoreValue } from '$lib/utils/helpers';
	import type { PageData } from './$types';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import { canPerformAction } from '$lib/utils/access-control';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { goto } from '$app/navigation';

	const REQUIREMENT_ASSESSMENT_STATUS = [
		'compliant',
		'partially_compliant',
		'in_progress',
		'non_compliant',
		'not_applicable',
		'to_do'
	] as const;

	const user = page.data.user;
	import { URL_MODEL_MAP } from '$lib/utils/crud';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const model = URL_MODEL_MAP['perimeters'];
	const canEditObject = (perimeter): boolean =>
		canPerformAction({
			user,
			action: 'change',
			model: model.name,
			domain: perimeter.folder?.id
		});

	// Calculate summary stats from data
	const totalAssessments = $derived(
		data.perimeters.reduce((sum, p) => sum + p.compliance_assessments.length, 0)
	);

	let group = $derived(page.url.searchParams.get('tab') || 'summary');

	function handleTabChange(tabValue: string): void {
		const url = new URL(page.url);
		url.searchParams.set('tab', tabValue);
		goto(url.toString());
	}
</script>

<Tabs value={group} onValueChange={(e) => handleTabChange(e.value)}>
	{#snippet list()}
		<Tabs.Control value="summary">
			<i class="fa-solid fa-chart-pie mr-1.5 text-xs"></i>
			Summary
		</Tabs.Control>
		<Tabs.Control value="my-assignments">
			<i class="fa-solid fa-clipboard-list mr-1.5 text-xs"></i>
			{m.myAssignments()}
		</Tabs.Control>
	{/snippet}
	{#snippet content()}
		{#key group}
			<div class="px-4 pb-4">
				<Tabs.Panel value="summary">
					<div class="space-y-6">
						<!-- Status Overview Cards -->
						<div class="grid grid-cols-4 gap-4">
							<div class="wgrc-stat-card">
								<div class="flex items-center gap-2 mb-2">
									<div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
										<i class="fa-regular fa-clock text-gray-500 text-sm"></i>
									</div>
								</div>
								<span class="text-xs text-gray-500 font-medium">Not Started</span>
								<span class="wgrc-stat-number text-gray-700">0</span>
							</div>
							<div class="wgrc-stat-card">
								<div class="flex items-center gap-2 mb-2">
									<div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
										<i class="fa-solid fa-circle-info text-blue-500 text-sm"></i>
									</div>
								</div>
								<span class="text-xs text-gray-500 font-medium">In Progress</span>
								<span class="wgrc-stat-number text-blue-600">{totalAssessments}</span>
							</div>
							<div class="wgrc-stat-card">
								<div class="flex items-center gap-2 mb-2">
									<div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
										<i class="fa-solid fa-circle-check text-green-500 text-sm"></i>
									</div>
								</div>
								<span class="text-xs text-gray-500 font-medium">Completed</span>
								<span class="wgrc-stat-number text-green-600">0</span>
							</div>
							<div class="wgrc-stat-card">
								<div class="flex items-center gap-2 mb-2">
									<div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
										<i class="fa-solid fa-circle-xmark text-red-500 text-sm"></i>
									</div>
								</div>
								<span class="text-xs text-gray-500 font-medium">Needs Review</span>
								<span class="wgrc-stat-number text-red-500">0</span>
							</div>
						</div>

						<!-- Progress and Evidence Status -->
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<!-- Overall Progress -->
							<div class="wgrc-card">
								<h3 class="text-lg font-bold text-gray-900 mb-6">Overall Progress</h3>
								<div class="flex items-center gap-8">
									<div class="relative">
										<ProgressRing
											strokeWidth="12px"
											meterStroke="stroke-green-200"
											value={0}
											size="size-32"
										>
											<p class="font-bold text-2xl text-gray-700">0%</p>
										</ProgressRing>
									</div>
									<div class="space-y-3">
										<div class="flex items-center justify-between gap-8">
											<span class="text-sm text-gray-500">Total Controls</span>
											<span class="font-semibold text-gray-900">{totalAssessments}</span>
										</div>
										<div class="flex items-center justify-between gap-8">
											<span class="text-sm text-gray-500">Completed</span>
											<span class="font-semibold text-green-600">0</span>
										</div>
										<div class="flex items-center justify-between gap-8">
											<span class="text-sm text-gray-500">Remaining</span>
											<span class="font-semibold text-gray-900">{totalAssessments}</span>
										</div>
									</div>
								</div>
							</div>

							<!-- Evidence Status -->
							<div class="wgrc-card">
								<h3 class="text-lg font-bold text-gray-900 mb-6">Evidence Status</h3>
								<div class="space-y-4">
									<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
										<span class="text-sm text-gray-600">Total Evidences</span>
										<span class="font-bold text-gray-900 text-lg">0</span>
									</div>
									<div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
										<span class="text-sm text-yellow-700">Pending Review</span>
										<span class="font-bold text-yellow-700 text-lg">0</span>
									</div>
									<div class="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
										<span class="text-sm text-green-700">Approved</span>
										<span class="font-bold text-green-700 text-lg">0</span>
									</div>
								</div>
							</div>
						</div>

						<!-- Per-Perimeter Assessments -->
						<div class="space-y-6">
							{#each data.perimeters as perimeter}
								{#if perimeter.compliance_assessments.length > 0}
									<div class="wgrc-card overflow-hidden !p-0">
										<div class="p-4 bg-gradient-to-r from-[#0A1628] to-[#2a3a5c] text-white flex justify-between items-center">
											<a class="text-lg font-bold hover:underline text-white" href="/perimeters/{perimeter.id}">
												{perimeter.folder.str}/{perimeter.name}
											</a>
										</div>
										{#if perimeter.overallCompliance?.values?.length > 0}
											<div class="px-4 py-3 bg-blue-50">
												<p class="text-sm font-semibold text-blue-700 mb-2">{m.globalOverall()}</p>
												<div class="flex h-4 rounded-full overflow-hidden shadow-inner bg-gray-200">
													{#each perimeter.overallCompliance.values.sort((a, b) => REQUIREMENT_ASSESSMENT_STATUS.indexOf(a.name) - REQUIREMENT_ASSESSMENT_STATUS.indexOf(b.name)) as sp}
														<div
															class="flex justify-center items-center text-xs font-semibold"
															style="
									width: {sp.percentage}%;
									background-color: {sp.itemStyle.color};
									color: {sp.itemStyle.color === '#000000' ? 'white' : 'black'};
								"
														>
															{Number(sp.percentage) > 5 ? `${sp.percentage}%` : ''}
														</div>
													{/each}
												</div>
											</div>
										{/if}

										<div class="p-4 space-y-4">
											{#each perimeter.compliance_assessments as assessment}
												<div class="bg-gray-50 rounded-xl p-4 border border-gray-100 transition hover:border-blue-200 hover:shadow-sm">
													<div class="flex justify-between items-center mb-4">
														<div>
															<p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">{m.name()}</p>
															<a
																class="text-blue-600 hover:underline text-lg font-bold"
																href="/compliance-assessments/{assessment.id}"
															>
																{assessment.name}
															</a>
														</div>
														<div class="text-right">
															<p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">{m.framework()}</p>
															<p class="text-sm text-gray-700">{assessment.framework.str}</p>
														</div>
													</div>

													<div class="flex flex-col lg:flex-row items-center justify-between gap-4">
														{#if assessment.globalScore.score >= 0}
															<div class="flex justify-center items-center lg:order-1">
																<ProgressRing
																	strokeWidth="12px"
																	meterStroke={displayScoreColor(
																		assessment.globalScore.score,
																		assessment.globalScore.max_score
																	)}
																	value={formatScoreValue(
																		assessment.globalScore.score,
																		assessment.globalScore.max_score
																	)}
																	size="size-24"
																>
																	<p class="font-bold text-2xl">{assessment.globalScore.score}</p>
																</ProgressRing>
															</div>
														{/if}

														<div class="w-full lg:w-3/5 h-40 lg:h-32">
															<DonutChart
																s_label={m.complianceAssessments()}
																name={assessment.name + '_donut'}
																values={assessment.donut.result.values}
															/>
														</div>

														<div
															class="flex flex-row lg:flex-col gap-2 lg:order-3"
														>
															{#if canEditObject(perimeter)}
																<Anchor
																	href="/compliance-assessments/{assessment.id}/edit?next=/recap"
																	class="btn bg-[#0A1628] text-white hover:bg-[#1a2740] rounded-lg text-sm px-4 py-2"
																>
																	<i class="fa-solid fa-edit mr-2"></i>
																	{m.edit()}
																</Anchor>
															{/if}
															<a
																href="/compliance-assessments/{assessment.id}/export"
																class="btn bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm px-4 py-2"
															>
																<i class="fa-solid fa-download mr-2"></i>
																{m.exportButton()}
															</a>
														</div>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				</Tabs.Panel>

				<Tabs.Panel value="my-assignments">
					<div class="space-y-6">
						<!-- Quick Actions -->
						<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
							<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
								<!-- View Assessments -->
								<Anchor
									href="/compliance-assessments"
									breadcrumbAction="push"
									class="unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer"
								>
									<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
										<i class="fa-solid fa-file-lines text-[#0A1628] text-lg"></i>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-semibold text-gray-900 text-sm">View Assessments</p>
										<p class="text-xs text-gray-500">Browse all compliance assessments</p>
									</div>
									<i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>
								</Anchor>

								<!-- Manage Evidence -->
								<Anchor
									href="/evidences"
									breadcrumbAction="push"
									class="unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer"
								>
									<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
										<i class="fa-solid fa-cloud-arrow-up text-[#0A1628] text-lg"></i>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-semibold text-gray-900 text-sm">Manage Evidence</p>
										<p class="text-xs text-gray-500">View uploaded documents</p>
									</div>
									<i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>
								</Anchor>

								<!-- Controls -->
								<Anchor
									href="/applied-controls"
									breadcrumbAction="push"
									class="unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer"
								>
									<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
										<i class="fa-solid fa-shield-halved text-[#0A1628] text-lg"></i>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-semibold text-gray-900 text-sm">Controls</p>
										<p class="text-xs text-gray-500">See all controls</p>
									</div>
									<i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>
								</Anchor>
							</div>
						</div>

						<!-- My Assignments Table -->
						<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<div class="mb-4">
								<h2 class="text-xl font-bold text-gray-900">{m.myAssignments()}</h2>
								<p class="text-sm text-gray-500">Complete these tasks by uploading the required evidence</p>
							</div>

							<ModelTable
								URLModel="applied-controls"
								baseEndpoint={`/applied-controls/?owner=${data.user.actor_id}`}
								hideFilters={true}
							/>
						</div>
					</div>
				</Tabs.Panel>
			</div>
		{/key}
	{/snippet}
</Tabs>
