<script lang="ts">
	import type { PageData } from './$types';
	import { m } from '$paraglide/messages';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let group = $derived(page.url.searchParams.get('tab') || 'home');

	function handleTabChange(tabValue: string): void {
		page.url.searchParams.set('tab', tabValue);
		goto(page.url);
	}
</script>

<Tabs value={group} onValueChange={(e) => handleTabChange(e.value)}>
	{#snippet list()}
		<Tabs.Control value="home">
			<i class="fa-solid fa-house mr-1.5 text-xs"></i>
			{m.home()}
		</Tabs.Control>
		<Tabs.Control value="my-assignments">
			<i class="fa-solid fa-clipboard-list mr-1.5 text-xs"></i>
			{m.myAssignments()}
		</Tabs.Control>
	{/snippet}
	{#snippet content()}
		{#key group}
			<div class="px-4 pb-4">
				<Tabs.Panel value="home">
					<section class="space-y-6">
						<div class="flex justify-between items-center mb-6">
							<h2 class="text-xl font-bold text-gray-900">{m.complianceAnalytics()}</h2>
							<a
								href="/recap"
								class="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
							>
								{m.viewDetailedRecap()}
								<i class="fas fa-arrow-right text-xs"></i>
							</a>
						</div>

						{#if data.complianceAnalytics && Object.keys(data.complianceAnalytics).length > 0}
							<div class="space-y-6">
								{#each Object.entries(data.complianceAnalytics) as [frameworkName, frameworkData]}
									<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
										<!-- Framework Header -->
										<div
											class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100"
										>
											<div class="flex justify-between items-center">
												<div class="flex items-center gap-3">
													<div class="w-2 h-2 bg-blue-500 rounded-full"></div>
													<h3 class="text-lg font-semibold text-gray-900">{frameworkName}</h3>
												</div>
												<div class="flex items-center gap-2">
													<span class="text-sm text-gray-600">{m.averageProgress()}:</span>
													<div
														class="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm"
													>
														<div class="w-32 bg-gray-200 rounded-full h-1.5">
															<div
																class="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
																style="width: {frameworkData.framework_average}%"
															></div>
														</div>
														<span class="font-semibold text-blue-600 text-sm min-w-[2.5rem]">
															{frameworkData.framework_average}%
														</span>
													</div>
												</div>
											</div>
										</div>

										<!-- Domains -->
										<div class="p-6 space-y-5">
											{#each frameworkData.domains as domain}
												<div class="relative">
													<!-- Domain Header -->
													<div
														class="flex justify-between items-center mb-3 pb-2 border-b border-gray-100"
													>
														<div class="flex items-center gap-2">
															<i class="fas fa-folder text-amber-500 text-sm"></i>
															<h4 class="font-medium text-gray-800">{domain.domain}</h4>
														</div>
														<div class="flex items-center gap-2">
															<span class="text-xs text-gray-500">{m.averageProgress()}:</span>
															<div class="flex items-center gap-2">
																<div class="w-8 bg-gray-200 rounded-full h-1">
																	<div
																		class="bg-gradient-to-r from-amber-400 to-orange-500 h-1 rounded-full transition-all duration-300"
																		style="width: {domain.domain_average}%"
																	></div>
																</div>
																<span class="font-medium text-amber-600 text-xs">
																	{domain.domain_average}%
																</span>
															</div>
														</div>
													</div>

													<!-- Assessments Grid -->
													<div class="grid gap-3">
														{#each domain.assessments as assessment}
															<div
																class="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
															>
																<div class="flex justify-between items-start gap-4">
																	<div class="flex-1 min-w-0">
																		<div class="font-medium text-gray-900 mb-1 truncate">
																			{assessment.assessment_name}
																		</div>
																		<div class="flex items-center gap-3 text-xs text-gray-500">
																			<div class="flex items-center gap-1">
																				<i class="fas fa-cubes text-gray-400"></i>
																				<span>{assessment.perimeter}</span>
																			</div>
																			<div class="flex items-center gap-1">
																				<div
																					class="w-2 h-2 rounded-full {assessment.status === 'done'
																						? 'bg-green-400'
																						: assessment.status === 'in_progress'
																							? 'bg-blue-400'
																							: assessment.status === 'in_review'
																								? 'bg-yellow-400'
																								: 'bg-gray-400'}"
																				></div>
																				<span class="capitalize"
																					>{assessment.status?.replace('_', ' ') ||
																						'No status'}</span
																				>
																			</div>
																		</div>
																	</div>
																	<div class="flex items-center gap-3">
																		<!-- Progress Bar -->
																		<div class="flex items-center gap-2">
																			<div class="w-20 bg-gray-200 rounded-full h-2">
																				<div
																					class="h-2 rounded-full transition-all duration-500 {assessment.progress >=
																					80
																						? 'bg-gradient-to-r from-green-400 to-emerald-500'
																						: assessment.progress >= 50
																							? 'bg-gradient-to-r from-blue-400 to-cyan-500'
																							: assessment.progress >= 25
																								? 'bg-gradient-to-r from-yellow-400 to-orange-500'
																								: 'bg-gradient-to-r from-red-400 to-pink-500'}"
																					style="width: {assessment.progress}%"
																				></div>
																			</div>
																			<span
																				class="font-semibold text-sm min-w-[3rem] text-right {assessment.progress >=
																				80
																					? 'text-green-600'
																					: assessment.progress >= 50
																						? 'text-blue-600'
																						: assessment.progress >= 25
																							? 'text-orange-600'
																							: 'text-red-600'}"
																			>
																				{assessment.progress}%
																			</span>
																		</div>
																	</div>
																</div>
															</div>
														{/each}
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div
								class="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300"
							>
								<div class="text-gray-400 mb-4">
									<i class="fas fa-chart-bar text-6xl"></i>
								</div>
								<div class="text-gray-600">
									<p class="text-xl font-semibold mb-2">{m.noComplianceData()}</p>
									<p class="text-sm text-gray-500">{m.createComplianceAssessment()}</p>
								</div>
								<a
									href="/compliance-assessments"
									class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors"
								>
									<i class="fas fa-plus text-sm"></i>
									{m.createAssessment()}
								</a>
							</div>
						{/if}
					</section>
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

								<!-- Data Requests -->
								<Anchor
									href="/applied-controls"
									breadcrumbAction="push"
									class="unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer"
								>
									<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
										<i class="fa-solid fa-shield-halved text-[#0A1628] text-lg"></i>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-semibold text-gray-900 text-sm">Data Requests</p>
										<p class="text-xs text-gray-500">See all compliance requests</p>
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
