<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import ModelForm from '$lib/components/Forms/ModelForm.svelte';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { page } from '$app/state';
	import { m } from '$paraglide/messages';
	import { safeTranslate } from '$lib/utils/i18n';
	import { canPerformAction } from '$lib/utils/access-control';
	import type { PageData } from './$types';
	import type { ProjectFormSection } from '$lib/components/Forms/ModelForm/ProjectForm.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const project = data.data;
	const collection = project.collection_data;

	let tab = $state('overview');
	let editingTab = $state<ProjectFormSection | null>(null);

	const user = page.data.user;
	const canEditProject = canPerformAction({
		user,
		action: 'change',
		model: data.model.name,
		domain: data.data.folder?.id ?? data.data.folder ?? user.root_folder_id
	});

	const collectionSections = [
		{
			key: 'compliance_assessments',
			label: m.complianceAssessments(),
			urlPattern: '/compliance-assessments/'
		},
		{ key: 'risk_assessments', label: m.riskAssessments(), urlPattern: '/risk-assessments/' },
		{
			key: 'crq_studies',
			label: m.quantitativeRiskStudies(),
			urlPattern: '/quantitative-risk-studies/'
		},
		{ key: 'ebios_studies', label: m.ebiosRmStudies(), urlPattern: '/ebios-rm/' },
		{
			key: 'findings_assessments',
			label: m.findingsAssessments(),
			urlPattern: '/findings-assessments/'
		},
		{ key: 'document_containers', label: m.documents(), urlPattern: '/documents/' },
		{ key: 'documents', label: m.evidences(), urlPattern: '/evidences/' },
		{ key: 'applied_controls', label: m.appliedControls(), urlPattern: '/applied-controls/' },
		{
			key: 'security_exceptions',
			label: m.securityExceptions(),
			urlPattern: '/security-exceptions/'
		},
		{ key: 'policies', label: m.policies(), urlPattern: '/policies/' },
		{ key: 'task_templates', label: m.taskTemplates(), urlPattern: '/task-templates/' }
	];

	const narrative = [
		['purpose', m.purpose()],
		['objectives', m.objectives()],
		['success_criteria', m.successCriteria()],
		['business_case', m.businessCase()],
		['deliverables', m.deliverables()],
		['assumptions', m.assumptions()],
		['constraints', m.constraints()],
		['dependencies_note', m.dependencies()],
		['exit_criteria', m.exitCriteria()],
		['organizational_alignment', m.organizationalAlignment()],
		['approval_requirements', m.approvalRequirements()]
	];

	function labelOf(value: unknown): string {
		if (!value) return '';
		if (typeof value === 'string') return value;
		if (typeof value === 'object') {
			const record = value as { str?: string; name?: string };
			return record.str || record.name || '';
		}
		return String(value);
	}

	function money(value: unknown): string {
		if (value === null || value === undefined || value === '') return '—';
		const currency = project.currency ? ` ${project.currency}` : '';
		return `${value}${currency}`;
	}

	function startEdit(section: ProjectFormSection) {
		editingTab = section;
	}

	function stopEdit() {
		editingTab = null;
	}

	const progressPct = Math.max(0, Math.min(100, Number(project.progress ?? 0) || 0));
	const hasCharter = narrative.some(([key]) => project[key]);
	const hasLinked =
		Boolean(collection) ||
		Boolean(project.sub_projects?.length) ||
		collectionSections.some((s) => collection?.[s.key]?.length);
</script>

{#snippet tabEditHeader(section: ProjectFormSection, title: string)}
	<div class="flex items-center justify-between gap-3 mb-4">
		<h3 class="font-semibold text-surface-800-100">{title}</h3>
		{#if canEditProject}
			{#if editingTab === section}
				<button type="button" class="btn preset-tonal-surface" onclick={stopEdit}>
					{m.cancel()}
				</button>
			{:else}
				<button
					type="button"
					class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm"
					onclick={() => startEdit(section)}
					data-testid="{section}-edit-button"
				>
					<i class="fa-solid fa-pen-to-square mr-2"></i>{m.edit()}
				</button>
			{/if}
		{/if}
	</div>
{/snippet}

{#snippet tabEditForm(section: ProjectFormSection)}
	{#if editingTab === section && data.updateForm}
		<div class="rounded-xl border border-surface-200-800 p-4 bg-surface-50-950 mb-4">
			<ModelForm
				form={data.updateForm}
				object={data.object}
				selectOptions={data.selectOptions}
				model={data.model}
				context="edit-{section}"
				action="?/update"
				cancelButton={false}
				taintedMessage={false}
				customNameDescription={section !== 'overview'}
				parent={{ onConfirm: stopEdit }}
			/>
		</div>
	{/if}
{/snippet}

<DetailView {data} displayModelTable={false} />

<!-- Project summary header -->
<div class="card bg-white shadow-sm border border-surface-200-800 overflow-hidden mt-4">
	<div class="p-5 sm:p-6 space-y-4">
		<div class="flex flex-wrap items-start justify-between gap-3">
			<div class="min-w-0 space-y-2">
				<div class="flex flex-wrap items-center gap-2">
					<span class="badge bg-blue-100 text-blue-800"
						>{safeTranslate(project.kind) || project.kind}</span
					>
					{#if project.ref_id}
						<span class="font-mono text-xs text-surface-500">{project.ref_id}</span>
					{/if}
				</div>
				<h2 class="text-2xl font-semibold tracking-tight text-gray-900">{project.name}</h2>
				{#if project.description}
					<div class="text-sm text-surface-600-400 max-w-3xl">
						<MarkdownRenderer content={project.description} />
					</div>
				{/if}
			</div>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			{#if project.status}
				<span class="badge bg-sky-100 text-sky-900">{labelOf(project.status)}</span>
			{/if}
			{#if project.health}
				<span class="badge bg-amber-100 text-amber-900">{labelOf(project.health)}</span>
			{/if}
			{#if project.priority}
				<span class="badge bg-rose-100 text-rose-900">P{project.priority}</span>
			{/if}
			<div class="flex items-center gap-2 min-w-[10rem] flex-1 max-w-xs">
				<span class="text-xs font-medium text-surface-500">{m.progress()}</span>
				<div class="h-2 flex-1 rounded-full bg-surface-200-700 overflow-hidden">
					<div class="h-full bg-primary-500 rounded-full" style="width: {progressPct}%"></div>
				</div>
				<span class="text-xs tabular-nums font-semibold text-surface-700-200">{progressPct}%</span>
			</div>
		</div>

		<dl class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-2 text-sm">
			<div>
				<dt class="text-xs font-semibold uppercase tracking-wide text-surface-500">
					{m.assignedTo()}
				</dt>
				<dd class="mt-1 font-medium text-surface-800-100">
					{labelOf(project.owner) || '—'}
				</dd>
			</div>
			<div>
				<dt class="text-xs font-semibold uppercase tracking-wide text-surface-500">
					{m.sponsor()}
				</dt>
				<dd class="mt-1 font-medium text-surface-800-100">
					{labelOf(project.sponsor) || '—'}
				</dd>
			</div>
			<div>
				<dt class="text-xs font-semibold uppercase tracking-wide text-surface-500">
					{m.parentProject()}
				</dt>
				<dd class="mt-1 font-medium text-surface-800-100">
					{#if project.parent_project?.id}
						<Anchor
							href="/projects/{project.parent_project.id}"
							class="text-primary-600 hover:underline"
						>
							{labelOf(project.parent_project)}
						</Anchor>
					{:else}
						—
					{/if}
				</dd>
			</div>
			<div>
				<dt class="text-xs font-semibold uppercase tracking-wide text-surface-500">
					{m.subProjects()}
				</dt>
				<dd class="mt-1">
					{#if project.sub_projects?.length}
						<div class="flex flex-wrap gap-2">
							{#each project.sub_projects as child}
								<Anchor
									href="/projects/{child.id}"
									class="badge preset-tonal hover:preset-filled-primary-500 transition-colors"
								>
									{labelOf(child)}
								</Anchor>
							{/each}
						</div>
					{:else}
						<span class="font-medium text-surface-800-100">—</span>
					{/if}
				</dd>
			</div>
		</dl>
	</div>

	<!-- Tabs -->
	<div class="border-t border-surface-200-800">
		<Tabs
			value={tab}
			onValueChange={(e) => {
				tab = e.value;
				editingTab = null;
			}}
			listJustify="justify-start flex flex-wrap gap-1 px-2 sm:px-4"
		>
			{#snippet list()}
				<Tabs.Control value="overview">
					<i class="fa-solid fa-gauge-high me-1.5 opacity-70"></i>{m.overview()}
				</Tabs.Control>
				<Tabs.Control value="charter">
					<i class="fa-solid fa-scroll me-1.5 opacity-70"></i>{m.charter()}
				</Tabs.Control>
				<Tabs.Control value="tracking">
					<i class="fa-solid fa-timeline me-1.5 opacity-70"></i>{m.projectTracking()}
				</Tabs.Control>
				<Tabs.Control value="linked">
					<i class="fa-solid fa-link me-1.5 opacity-70"></i>{m.projectLinked()}
				</Tabs.Control>
				<Tabs.Control value="people">
					<i class="fa-solid fa-users me-1.5 opacity-70"></i>{m.projectPeople()}
				</Tabs.Control>
				<Tabs.Control value="analytics">
					<i class="fa-solid fa-chart-line me-1.5 opacity-70"></i>{m.analytics()}
				</Tabs.Control>
			{/snippet}

			{#snippet content()}
				<div class="p-5 sm:p-6">
					<Tabs.Panel value="overview">
						{@render tabEditHeader('overview', m.overview())}
						{@render tabEditForm('overview')}
						{#if editingTab !== 'overview'}
							<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
								<div class="rounded-xl border border-surface-200-800 p-4 space-y-1">
									<p class="text-xs uppercase tracking-wide text-surface-500">{m.status()}</p>
									<p class="font-semibold">{labelOf(project.status) || '—'}</p>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4 space-y-1">
									<p class="text-xs uppercase tracking-wide text-surface-500">{m.health()}</p>
									<p class="font-semibold">{labelOf(project.health) || '—'}</p>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4 space-y-1">
									<p class="text-xs uppercase tracking-wide text-surface-500">{m.priority()}</p>
									<p class="font-semibold"
										>{project.priority != null ? `P${project.priority}` : '—'}</p
									>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4 space-y-1">
									<p class="text-xs uppercase tracking-wide text-surface-500">{m.progress()}</p>
									<p class="font-semibold tabular-nums">{progressPct}%</p>
								</div>
							</div>
							{#if project.sub_projects?.length}
								<div class="mt-6 space-y-2">
									<h3 class="font-semibold">{m.subProjects()}</h3>
									<ul class="space-y-1">
										{#each project.sub_projects as child}
											<li>
												<Anchor
													href="/projects/{child.id}"
													class="text-primary-600 hover:underline"
													>{labelOf(child)}</Anchor
												>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						{/if}
					</Tabs.Panel>

					<Tabs.Panel value="charter">
						{@render tabEditHeader('charter', m.charter())}
						{@render tabEditForm('charter')}
						{#if editingTab !== 'charter'}
							{#if hasCharter}
								<div class="space-y-5">
									{#each narrative as [key, label]}
										{#if project[key]}
											<section>
												<h3 class="font-semibold mb-1">{label}</h3>
												<MarkdownRenderer content={project[key]} />
											</section>
										{/if}
									{/each}
								</div>
							{:else}
								<p class="text-surface-500 text-sm">{m.noCharterContent()}</p>
							{/if}
						{/if}
					</Tabs.Panel>

					<Tabs.Panel value="tracking">
						{@render tabEditHeader('tracking', m.projectTracking())}
						{@render tabEditForm('tracking')}
						{#if editingTab !== 'tracking'}
							<dl class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.budget()}</dt>
									<dd class="font-semibold mt-1">{money(project.budget)}</dd>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.actualCost()}</dt>
									<dd class="font-semibold mt-1">{money(project.actual_cost)}</dd>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.progress()}</dt>
									<dd class="font-semibold mt-1 tabular-nums">{progressPct}%</dd>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.startDate()}</dt>
									<dd class="font-semibold mt-1">{project.start_date || '—'}</dd>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.endDate()}</dt>
									<dd class="font-semibold mt-1">{project.end_date || '—'}</dd>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.eta()}</dt>
									<dd class="font-semibold mt-1">{project.eta || '—'}</dd>
								</div>
							</dl>
						{/if}
					</Tabs.Panel>

					<Tabs.Panel value="linked">
						{@render tabEditHeader('linked', m.projectLinked())}
						{@render tabEditForm('linked')}
						{#if editingTab !== 'linked'}
							{#if hasLinked || collection}
								<div class="space-y-5">
									{#if collection}
										<section class="space-y-2">
											<h3 class="font-semibold">{m.linkedCollection()}</h3>
											<p>
												<Anchor
													href="/generic-collections/{collection.id}"
													class="text-primary-600 hover:underline"
												>
													{collection.name}
												</Anchor>
											</p>
											{#each collectionSections as section}
												{#if collection[section.key]?.length}
													<div class="mt-3">
														<h4 class="text-sm font-semibold text-gray-700 mb-1"
															>{section.label}</h4
														>
														<ul class="space-y-1">
															{#each collection[section.key] as item}
																<li>
																	<Anchor
																		href="{section.urlPattern}{item.id}"
																		class="text-primary-600 hover:underline"
																	>
																		{labelOf(item)}
																	</Anchor>
																</li>
															{/each}
														</ul>
													</div>
												{/if}
											{/each}
										</section>
									{:else}
										<p class="text-surface-500 text-sm">{m.noLinkedItems()}</p>
									{/if}
								</div>
							{:else}
								<p class="text-surface-500 text-sm">{m.noLinkedItems()}</p>
							{/if}
						{/if}
					</Tabs.Panel>

					<Tabs.Panel value="people">
						{@render tabEditHeader('people', m.projectPeople())}
						{@render tabEditForm('people')}
						{#if editingTab !== 'people'}
							<dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.projectOwner()}</dt>
									<dd class="font-semibold mt-1">{labelOf(project.owner) || '—'}</dd>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.sponsor()}</dt>
									<dd class="font-semibold mt-1">{labelOf(project.sponsor) || '—'}</dd>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4 md:col-span-2">
									<dt class="text-surface-500 mb-2">{m.responsibilityMatrices()}</dt>
									<dd>
										{#if project.responsibility_matrices?.length}
											<ul class="space-y-1">
												{#each project.responsibility_matrices as matrix}
													<li>
														<Anchor
															href="/responsibility-matrices/{matrix.id}"
															class="text-primary-600 hover:underline"
														>
															{labelOf(matrix)}
														</Anchor>
													</li>
												{/each}
											</ul>
										{:else}
											—
										{/if}
									</dd>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4">
									<dt class="text-surface-500">{m.parentProject()}</dt>
									<dd class="font-semibold mt-1">
										{#if project.parent_project?.id}
											<Anchor
												href="/projects/{project.parent_project.id}"
												class="text-primary-600 hover:underline"
											>
												{labelOf(project.parent_project)}
											</Anchor>
										{:else}
											—
										{/if}
									</dd>
								</div>
							</dl>
						{/if}
					</Tabs.Panel>

					<Tabs.Panel value="analytics">
						{@render tabEditHeader('analytics', m.analytics())}
						{@render tabEditForm('analytics')}
						{#if editingTab !== 'analytics'}
							<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div class="rounded-xl border border-surface-200-800 p-4 space-y-2">
									<p class="text-xs uppercase tracking-wide text-surface-500">{m.progress()}</p>
									<p class="text-3xl font-bold tabular-nums">{progressPct}%</p>
									<div class="h-2 rounded-full bg-surface-200-700 overflow-hidden">
										<div class="h-full bg-primary-500" style="width: {progressPct}%"></div>
									</div>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4 space-y-1">
									<p class="text-xs uppercase tracking-wide text-surface-500">{m.budget()}</p>
									<p class="text-xl font-semibold">{money(project.budget)}</p>
									<p class="text-xs text-surface-500"
										>{m.actualCost()}: {money(project.actual_cost)}</p
									>
								</div>
								<div class="rounded-xl border border-surface-200-800 p-4 space-y-1">
									<p class="text-xs uppercase tracking-wide text-surface-500">{m.subProjects()}</p>
									<p class="text-3xl font-bold tabular-nums"
										>{project.sub_projects?.length ?? 0}</p
									>
								</div>
							</div>
						{/if}
					</Tabs.Panel>
				</div>
			{/snippet}
		</Tabs>
	</div>
</div>
