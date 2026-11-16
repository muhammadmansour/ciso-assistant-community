<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import { m } from '$paraglide/messages';
	import { safeTranslate } from '$lib/utils/i18n';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const project = data.data;
	const collection = project.collection_data;

	const collectionSections = [
		{ key: 'compliance_assessments', label: m.complianceAssessments(), urlPattern: '/compliance-assessments/' },
		{ key: 'risk_assessments', label: m.riskAssessments(), urlPattern: '/risk-assessments/' },
		{ key: 'crq_studies', label: m.quantitativeRiskStudies(), urlPattern: '/quantitative-risk-studies/' },
		{ key: 'ebios_studies', label: m.ebiosRmStudies(), urlPattern: '/ebios-rm/' },
		{ key: 'findings_assessments', label: m.findingsAssessments(), urlPattern: '/findings-assessments/' },
		{ key: 'documents', label: m.evidences(), urlPattern: '/evidences/' },
		{ key: 'security_exceptions', label: m.securityExceptions(), urlPattern: '/security-exceptions/' },
		{ key: 'policies', label: m.policies(), urlPattern: '/policies/' }
	];

	const narrative = [
		['purpose', m.purpose()],
		['objectives', m.objectives()],
		['success_criteria', m.successCriteria()],
		['business_case', m.businessCase()],
		['deliverables', m.deliverables()],
		['assumptions', m.assumptions()],
		['constraints', m.constraints()],
		['exit_criteria', m.exitCriteria()]
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
</script>

<DetailView {data} />

<div class="card p-4 bg-white my-4 space-y-4">
	<div class="flex flex-wrap items-center gap-2">
		<span class="badge bg-blue-100 text-blue-800">{safeTranslate(project.kind) || project.kind}</span>
		{#if project.status}
			<span class="badge bg-gray-200 text-gray-800">{labelOf(project.status)}</span>
		{/if}
		{#if project.health}
			<span class="badge bg-amber-100 text-amber-900">{labelOf(project.health)}</span>
		{/if}
		{#if project.priority}
			<span class="badge bg-slate-100 text-slate-800">P{project.priority}</span>
		{/if}
	</div>
	<h2 class="text-2xl font-semibold">{project.name}</h2>
	{#if project.description}
		<MarkdownRenderer content={project.description} />
	{/if}
	<dl class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
		<div><dt class="text-gray-500">{m.budget()}</dt><dd>{money(project.budget)}</dd></div>
		<div><dt class="text-gray-500">{m.actualCost()}</dt><dd>{money(project.actual_cost)}</dd></div>
		<div><dt class="text-gray-500">{m.progress()}</dt><dd>{project.progress ?? 0}%</dd></div>
		<div><dt class="text-gray-500">{m.startDate()}</dt><dd>{project.start_date || '—'}</dd></div>
		<div><dt class="text-gray-500">{m.endDate()}</dt><dd>{project.end_date || '—'}</dd></div>
		<div><dt class="text-gray-500">{m.eta()}</dt><dd>{project.eta || '—'}</dd></div>
		<div><dt class="text-gray-500">{m.projectOwner()}</dt><dd>{labelOf(project.owner) || '—'}</dd></div>
		<div><dt class="text-gray-500">{m.sponsor()}</dt><dd>{labelOf(project.sponsor) || '—'}</dd></div>
		<div>
			<dt class="text-gray-500">{m.parentProject()}</dt>
			<dd>
				{#if project.parent_project?.id}
					<Anchor href="/projects/{project.parent_project.id}">{labelOf(project.parent_project)}</Anchor>
				{:else}
					—
				{/if}
			</dd>
		</div>
	</dl>
</div>

{#if narrative.some(([key]) => project[key])}
	<div class="card p-4 bg-white my-4 space-y-4">
		{#each narrative as [key, label]}
			{#if project[key]}
				<section>
					<h3 class="font-semibold mb-1">{label}</h3>
					<MarkdownRenderer content={project[key]} />
				</section>
			{/if}
		{/each}
	</div>
{/if}

{#if project.sub_projects?.length}
	<div class="card p-4 bg-white my-4">
		<h3 class="font-semibold mb-2">{m.subProjects()}</h3>
		<ul class="space-y-1">
			{#each project.sub_projects as child}
				<li><Anchor href="/projects/{child.id}">{labelOf(child)}</Anchor></li>
			{/each}
		</ul>
	</div>
{/if}

{#if project.responsibility_matrices?.length}
	<div class="card p-4 bg-white my-4">
		<h3 class="font-semibold mb-2">{m.responsibilityMatrices()}</h3>
		<ul class="space-y-1">
			{#each project.responsibility_matrices as matrix}
				<li>
					<Anchor href="/responsibility-matrices/{matrix.id}">{labelOf(matrix)}</Anchor>
				</li>
			{/each}
		</ul>
	</div>
{/if}

{#if collection}
	<div class="card p-4 bg-white my-4 space-y-4">
		<h3 class="font-semibold">{m.linkedCollection()}</h3>
		<p>
			<Anchor href="/generic-collections/{collection.id}">{collection.name}</Anchor>
		</p>
		{#each collectionSections as section}
			{#if collection[section.key]?.length}
				<section>
					<h4 class="text-sm font-semibold text-gray-700 mb-1">{section.label}</h4>
					<ul class="space-y-1">
						{#each collection[section.key] as item}
							<li>
								<Anchor href="{section.urlPattern}{item.id}">{labelOf(item)}</Anchor>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		{/each}
	</div>
{/if}
