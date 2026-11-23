<script lang="ts">
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
	const reportTiles: ReportTileData[] = [
		{
			id: 'audit-report',
			title: 'Audit Report',
			description: 'Input: Selecting audit assessment -- Output: structured report',
			icon: 'fa-solid fa-clipboard-check',
			category: 'compliance',
			href: '/reports/audit',
			tags: ['Assessment', 'Results by domain', 'Findings', 'Observations', 'Action plan']
		},
		{
			id: 'risk-posture',
			title: 'Risk Posture Report',
			description: 'Input: Selecting risk assessment -- Output: board-level risk posture report',
			icon: 'fa-solid fa-shield-halved',
			category: 'risk',
			href: '/reports/risk-posture',
			tags: ['Top risks', 'Heatmaps', 'Control cost', 'Cost-effectiveness', 'Treatment plan']
		}
	];

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
