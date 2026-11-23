<script lang="ts">
	import { m } from '$paraglide/messages';
	import type { PageData } from './$types';
	import ReportTile from './ReportTile.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	interface ReportTileData {
		id: string;
		title: string;
		description: string;
		icon: string;
		category: string;
		onClick?: () => void;
		href?: string;
		tags?: string[];
	}

	// Available report tiles
	const reportTiles: ReportTileData[] = $derived([
		{
			id: 'audit-report',
			title: m.rptAuditReport(),
			description: m.rptAuditReportDescription(),
			icon: 'fa-solid fa-clipboard-check',
			category: 'compliance',
			href: '/reports/audit',
			tags: [
				m.rptAuditAssessment(),
				m.rptResultsByDomain(),
				m.findings(),
				m.rptObservations(),
				m.actionPlan()
			]
		},
		{
			id: 'risk-posture',
			title: m.rptRiskPostureReport(),
			description: m.rptRiskPostureReportDescription(),
			icon: 'fa-solid fa-shield-halved',
			category: 'risk',
			href: '/reports/risk-posture',
			tags: [
				m.rptTopRisks(),
				m.rptHeatmapsTag(),
				m.rptControlCostTag(),
				m.rptCostEffectivenessTag(),
				m.rptTreatmentPlan()
			]
		}
	]);

	function handleTileClick(tile: ReportTileData): void {
		if (tile.onClick) {
			tile.onClick();
		} else {
			// Default action - will be implemented with backend
			console.log(`Report tile clicked: ${tile.id}`);
			// TODO: Navigate to report generation page or trigger report generation
		}
	}
</script>

<div class="px-4 py-6 space-y-6">
	<!-- Header -->

	<!-- Reports Grid with White Background -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each reportTiles as tile}
				<ReportTile
					title={tile.title}
					description={tile.description}
					icon={tile.icon}
					category={tile.category}
					href={tile.href}
					tags={tile.tags}
					onclick={tile.href ? undefined : () => handleTileClick(tile)}
				/>
			{/each}
		</div>
	</div>
</div>
