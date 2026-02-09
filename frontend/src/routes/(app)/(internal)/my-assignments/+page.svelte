<script lang="ts">
	import type { PageData } from './$types';
	import { m } from '$paraglide/messages';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import ActivityTracker from '$lib/components/DataViz/ActivityTracker.svelte';
	import { listViewFields } from '$lib/utils/table';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const appliedControlFilters = listViewFields['applied-controls'].filters;
	const APPLIED_CONTROL_FILTERS = {
		status: appliedControlFilters.status,
		priority: appliedControlFilters.priority,
		folder: appliedControlFilters.folder
	};

	// Toggle for showing/hiding empty sections
	let showEmptySections = $state(false);

	const counts = data.counts || {};

	// Calculate totals for the status cards
	const totalControls = $derived(counts.appliedControls || 0);
</script>

<div class="space-y-6">
	<!-- Welcome Banner -->
	<div class="wgrc-card bg-blue-50/50 border-blue-100">
		<div class="flex items-start gap-3">
			<div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
				<i class="fa-solid fa-circle-info text-blue-600 text-sm"></i>
			</div>
			<div>
				<h3 class="font-semibold text-gray-900 text-sm">Welcome to your compliance assignments</h3>
				<p class="text-sm text-blue-700/80 mt-0.5">
					Review your assigned controls, upload evidence, and update status to help complete your compliance assessment.
				</p>
			</div>
		</div>
	</div>

	<!-- Compliance Progress Card -->
	<div class="wgrc-card">
		<h3 class="text-lg font-bold text-gray-900 mb-1">Compliance Progress</h3>
		<div class="flex items-center justify-between mb-3">
			<span class="text-sm text-gray-500">Controls Completed</span>
			<span class="text-sm font-semibold text-blue-600">0 of {totalControls} (0%)</span>
		</div>
		<div class="w-full bg-gray-100 rounded-full h-2">
			<div class="bg-green-500 h-2 rounded-full transition-all duration-500" style="width: 0%"></div>
		</div>

		<!-- Status Cards Row -->
		<div class="grid grid-cols-4 gap-4 mt-6">
			<div class="wgrc-stat-card">
				<span class="wgrc-stat-number text-gray-700">
					{counts.appliedControls || 0}
				</span>
				<span class="wgrc-stat-label">Not Started</span>
			</div>
			<div class="wgrc-stat-card">
				<span class="wgrc-stat-number text-blue-600">
					{counts.complianceAssessments || 0}
				</span>
				<span class="wgrc-stat-label">In Progress</span>
			</div>
			<div class="wgrc-stat-card">
				<span class="wgrc-stat-number text-red-500">0</span>
				<span class="wgrc-stat-label">Done</span>
			</div>
			<div class="wgrc-stat-card">
				<span class="wgrc-stat-number text-orange-500">0</span>
				<span class="wgrc-stat-label">Needs Review</span>
			</div>
		</div>
	</div>

	<!-- Applied Controls Section -->
	<div class="wgrc-card">
		<div class="flex items-center justify-between mb-1">
			<div>
				<h3 class="text-lg font-bold text-gray-900">Applied controls</h3>
				<p class="text-sm text-gray-400">Your compliance tasks</p>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-sm text-blue-600 font-medium">{counts.appliedControls || 0} controls</span>
				<button
					type="button"
					class="btn btn-sm text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
					onclick={() => (showEmptySections = !showEmptySections)}
				>
					<i class="fa-solid {showEmptySections ? 'fa-eye-slash' : 'fa-eye'} mr-1"></i>
					{showEmptySections ? m.hideEmptySections() : m.showEmptySections()}
				</button>
			</div>
		</div>

		<ModelTable
			source={{
				head: {
					ref_id: 'ref_id',
					name: 'name',
					status: 'status',
					priority: 'priority',
					eta: 'eta',
					folder: 'folder'
				},
				body: [],
				filters: APPLIED_CONTROL_FILTERS
			}}
			URLModel="applied-controls"
			baseEndpoint="/applied-controls?owner={data.user.actor_id}"
		/>
	</div>

	<!-- Additional Sections (Grid) -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		{#if showEmptySections || counts.tasks > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-note-sticky text-indigo-500"></i>
					<h3 class="font-bold text-gray-900">{m.tasks()}</h3>
					{#if counts.tasks > 0}
						<span class="wgrc-badge wgrc-badge-in-progress">{counts.tasks}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							name: 'name',
							status: 'status',
							is_recurrent: 'is_recurrent',
							next_occurrence: 'next_occurrence'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="task-templates"
					baseEndpoint="/task-templates?assigned_to={data.user.id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.complianceAssessments > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-certificate text-blue-500"></i>
					<h3 class="font-bold text-gray-900">{m.complianceAssessments()}</h3>
					{#if counts.complianceAssessments > 0}
						<span class="wgrc-badge wgrc-badge-in-progress">{counts.complianceAssessments}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							name: 'name',
							status: 'status',
							eta: 'eta',
							progress: 'progress',
							perimeter: 'perimeter'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="compliance-assessments"
					baseEndpoint="/compliance-assessments?authors={data.user.actor_id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.riskAssessments > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-magnifying-glass-chart text-blue-500"></i>
					<h3 class="font-bold text-gray-900">{m.riskAssessments()}</h3>
					{#if counts.riskAssessments > 0}
						<span class="wgrc-badge wgrc-badge-in-progress">{counts.riskAssessments}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							name: 'name',
							status: 'status',
							eta: 'eta',
							perimeter: 'perimeter'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="risk-assessments"
					baseEndpoint="/risk-assessments?authors={data.user.actor_id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.riskScenarios > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-clone text-indigo-500"></i>
					<h3 class="font-bold text-gray-900">{m.riskScenarios()}</h3>
					{#if counts.riskScenarios > 0}
						<span class="wgrc-badge wgrc-badge-in-progress">{counts.riskScenarios}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							ref_id: 'ref_id',
							name: 'name',
							current_level: 'current_level',
							residual_level: 'residual_level',
							risk_assessment: 'risk_assessment'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="risk-scenarios"
					baseEndpoint="/risk-scenarios?owner={data.user.actor_id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.incidents > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-bug text-red-500"></i>
					<h3 class="font-bold text-gray-900">{m.incidents()}</h3>
					{#if counts.incidents > 0}
						<span class="wgrc-badge wgrc-badge-needs-review">{counts.incidents}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							ref_id: 'ref_id',
							name: 'name',
							status: 'status',
							severity: 'severity',
							folder: 'folder'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="incidents"
					baseEndpoint="/incidents?owners={data.user.actor_id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.securityExceptions > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-circle-exclamation text-orange-500"></i>
					<h3 class="font-bold text-gray-900">{m.securityExceptions()}</h3>
					{#if counts.securityExceptions > 0}
						<span class="wgrc-badge wgrc-badge-pending">{counts.securityExceptions}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							name: 'name',
							status: 'status',
							severity: 'severity',
							expiration_date: 'expiration_date',
							folder: 'folder'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="security-exceptions"
					baseEndpoint="/security-exceptions?owners={data.user.actor_id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.findingsAssessments > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-clipboard-list text-blue-500"></i>
					<h3 class="font-bold text-gray-900">{m.findingsAssessments()}</h3>
					{#if counts.findingsAssessments > 0}
						<span class="wgrc-badge wgrc-badge-in-progress">{counts.findingsAssessments}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							name: 'name',
							status: 'status',
							category: 'category',
							perimeter: 'perimeter'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="findings-assessments"
					baseEndpoint="/findings-assessments?authors={data.user.actor_id}"
				/>
			</div>
		{/if}
		{#if (showEmptySections || counts.validationFlows > 0) && data.featureflags?.validation_flows}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-check-circle text-green-500"></i>
					<h3 class="font-bold text-gray-900">{m.validationFlows()}</h3>
					{#if counts.validationFlows > 0}
						<span class="wgrc-badge wgrc-badge-active">{counts.validationFlows}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							ref_id: 'ref_id',
							status: 'status',
							created_at: 'created_at',
							requester: 'requester',
							folder: 'folder'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="validation-flows"
					baseEndpoint="/validation-flows?approver={data.user.id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.findings > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-triangle-exclamation text-yellow-500"></i>
					<h3 class="font-bold text-gray-900">{m.findings()}</h3>
					{#if counts.findings > 0}
						<span class="wgrc-badge wgrc-badge-pending">{counts.findings}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							ref_id: 'ref_id',
							name: 'name',
							severity: 'severity',
							status: 'status'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="findings"
					baseEndpoint="/findings?owner={data.user.actor_id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.organisationObjectives > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-bullseye text-green-500"></i>
					<h3 class="font-bold text-gray-900">{m.organisationObjectives()}</h3>
					{#if counts.organisationObjectives > 0}
						<span class="wgrc-badge wgrc-badge-active">{counts.organisationObjectives}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							ref_id: 'ref_id',
							name: 'name',
							status: 'status',
							health: 'health',
							folder: 'folder'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="organisation-objectives"
					baseEndpoint="/organisation-objectives?assigned_to={data.user.id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.rightRequests > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-user-shield text-purple-500"></i>
					<h3 class="font-bold text-gray-900">{m.rightRequests()}</h3>
					{#if counts.rightRequests > 0}
						<span class="wgrc-badge wgrc-badge-in-progress">{counts.rightRequests}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							ref_id: 'ref_id',
							name: 'name',
							request_type: 'request_type',
							status: 'status',
							due_date: 'due_date'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="right-requests"
					baseEndpoint="/right-requests?owner={data.user.actor_id}"
				/>
			</div>
		{/if}
		{#if showEmptySections || counts.metricInstances > 0}
			<div class="wgrc-card">
				<div class="flex items-center gap-2 mb-3">
					<i class="fa-solid fa-chart-line text-teal-500"></i>
					<h3 class="font-bold text-gray-900">{m.metricInstances()}</h3>
					{#if counts.metricInstances > 0}
						<span class="wgrc-badge wgrc-badge-in-progress">{counts.metricInstances}</span>
					{/if}
				</div>
				<ModelTable
					source={{
						head: {
							ref_id: 'ref_id',
							name: 'name',
							status: 'status',
							current_value: 'current_value',
							folder: 'folder'
						},
						body: []
					}}
					hideFilters={true}
					URLModel="metric-instances"
					baseEndpoint="/metric-instances?owner={data.user.actor_id}"
				/>
			</div>
		{/if}
	</div>
</div>
