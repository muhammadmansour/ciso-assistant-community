<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables/remote';
	import { onMount } from 'svelte';
	import { m } from '$paraglide/messages';
	import { tableStates } from '$lib/utils/stores';
	import { page } from '$app/state';

	interface Props {
		handler: DataHandler;
	}

	let { handler }: Props = $props();

	const pageNumber = handler.getPageNumber();
	const rowsPerPage = handler.getRowsPerPage();
	const rowCount = handler.getRowCount();

	let lastRowsPerPage = $derived(
		$rowsPerPage ?? $tableStates[page.url.pathname]?.rowsPerPage ?? 10
	);

	const setRowsPerPage = () => {
		const itemNumber = ($pageNumber - 1) * lastRowsPerPage + 1;
		const newPageNumber = Math.ceil(itemNumber / ($rowsPerPage ?? 10));
		$tableStates[page.url.pathname] = { pageNumber: newPageNumber, rowsPerPage: $rowsPerPage };
		handler.setPage(newPageNumber);

		handler.invalidate();
	};

	$effect(() => {
		if ($rowsPerPage && $rowCount?.start >= $rowCount?.total) {
			handler.setPage(Math.ceil($rowCount.total / $rowsPerPage));
		}
	});

	onMount(() => {
		const cachedValue = $tableStates[page.url.pathname]?.rowsPerPage ?? 10;

		if ($rowsPerPage !== cachedValue) {
			rowsPerPage.set(cachedValue); // will trigger reactivity
		}
	});

	const options = [5, 10, 20, 50, 100];
</script>

<aside class="flex items-center text-sm text-gray-500">
	{m.show()}
	<select
		class="bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 w-[80px] mx-2 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 !bg-none"
		style="-webkit-appearance: none; -moz-appearance: none; appearance: none; background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%236b7280%22%3E%3Cpath fill-rule=%22evenodd%22 d=%22M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z%22 clip-rule=%22evenodd%22/%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 6px center; background-size: 16px; padding-right: 28px;"
		bind:value={$rowsPerPage}
		onchange={setRowsPerPage}
	>
		{#each options as option}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
	{m.entries()}
</aside>
