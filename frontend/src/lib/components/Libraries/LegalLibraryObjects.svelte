<script lang="ts">
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import type { TableSource } from '$lib/components/ModelTable/types';
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';

	interface Props {
		objects: Record<string, any>;
	}

	let { objects }: Props = $props();

	const SECTIONS = [
		{ key: 'laws', icon: 'fa-solid fa-scale-balanced', label: m.laws },
		{ key: 'cabinet_decisions', icon: 'fa-solid fa-landmark', label: m.cabinetDecisions },
		{
			key: 'regulator_instructions',
			icon: 'fa-solid fa-file-circle-exclamation',
			label: m.regulatorInstructions
		},
		{ key: 'board_decisions', icon: 'fa-solid fa-people-roof', label: m.boardDecisions },
		{ key: 'official_letters', icon: 'fa-solid fa-envelope-open-text', label: m.officialLetters }
	];

	const head = {
		ref_id: 'ref',
		name: 'name',
		description: 'description',
		issuing_authority: 'issuingAuthority',
		issue_date: 'issueDate',
		effective_date: 'effectiveDate',
		status: 'status',
		link: 'link'
	};

	function tableFor(entries: any[]): TableSource {
		return {
			head,
			body: entries.map((entry) => ({
				ref_id: entry.ref_id,
				name: entry.name,
				description: entry.description,
				issuing_authority: entry.issuing_authority,
				issue_date: entry.issue_date,
				effective_date: entry.effective_date,
				status: entry.status ? safeTranslate(entry.status) : undefined,
				link: entry.link
			})),
			meta: { count: entries.length }
		};
	}

	let sections = $derived(
		SECTIONS.map((section) => ({ ...section, entries: objects?.[section.key] ?? [] })).filter(
			(section) => section.entries.length > 0
		)
	);
</script>

{#each sections as section (section.key)}
	<Dropdown
		open={sections.length === 1}
		style="hover:text-indigo-700"
		icon={section.icon}
		header="{section.entries.length} {section.label()}"
	>
		<ModelTable
			source={tableFor(section.entries)}
			displayActions={false}
			pagination={false}
			rowCount={false}
			rowsPerPage={false}
			search={false}
			interactive={false}
		/>
	</Dropdown>
{/each}
