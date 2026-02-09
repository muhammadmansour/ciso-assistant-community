<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables/remote';
	import { page } from '$app/state';
	import { m } from '$paraglide/messages';
	import { afterNavigate } from '$app/navigation';
	import { tableStates } from '$lib/utils/stores';
	import { breadcrumbs } from '$lib/utils/breadcrumbs';
	interface Props {
		handler: DataHandler;
		URLModel: string;
	}

	let { handler, URLModel }: Props = $props();

	const pageNumber = handler.getPageNumber();
	const rowsPerPage = handler.getRowsPerPage();
	const pageCount = handler.getPageCount();
	const pages = handler.getPages({ ellipsis: true });

	const setPage = (value: 'previous' | 'next' | number) => {
		handler.setPage(value);
		$tableStates[page.url.pathname] = {
			pageNumber: $pageNumber,
			rowsPerPage: $rowsPerPage as number
		};
		page.url.searchParams.set('page', $pageNumber.toString());
		const fullPath = page.url.pathname + page.url.search;
		const hrefPattern = new RegExp(`^/${URLModel}(\\?.*)?$`);
		if (hrefPattern.test(fullPath)) {
			breadcrumbs.updateCrumb(hrefPattern, { href: fullPath });
		}
		handler.invalidate();
	};

	let currentEndpoint: string | null = $state(null);

	afterNavigate(() => {
		if (page.url && page.url.pathname !== currentEndpoint) {
			const endpoint = page.url.pathname;
			let newPageNumber = parseInt(page.url.searchParams.get('page') ?? '1');
			setTimeout(() => {
				handler.setPage(newPageNumber);
				handler.invalidate();
			}, 300);
			currentEndpoint = endpoint;
		}
	});
</script>

<section class="flex">
	<button type="button" class:disabled={$pageNumber === 1} onclick={() => setPage('previous')}>
		{m.previous()}
	</button>
	{#if $pages === undefined}
		<button type="button" onclick={() => setPage($pageNumber)}>
			{$pageNumber}
		</button>
	{:else}
		{#each $pages as page}
			<button
				type="button"
				class:active={$pageNumber === page}
				class:ellipse={page === null}
				onclick={() => setPage(page)}
			>
				{page ?? '...'}
			</button>
		{/each}
	{/if}
	<button type="button" class:disabled={$pageNumber === $pageCount} onclick={() => setPage('next')}>
		{m.next()}
	</button>
</section>

<style>
	button {
		background: white;
		height: 32px;
		width: 32px;
		color: #6b7280;
		cursor: pointer;
		font-size: 13px;
		margin: 0;
		padding: 0;
		transition: all 0.2s ease;
		line-height: 32px;
		border: 1px solid #e5e7eb;
		border-right: none;
		outline: none;
	}
	button:first-child {
		border-radius: 8px 0 0 8px;
		width: auto;
		min-width: 72px;
	}
	button:last-child {
		border-right: 1px solid #e5e7eb;
		border-radius: 0 8px 8px 0;
		width: auto;
		min-width: 72px;
	}
	button:not(.active):hover {
		background: #f3f4f6;
		color: #3b82f6;
	}
	button.ellipse:hover {
		background: white;
		cursor: default;
	}
	button.active {
		background: #3b82f6;
		color: white;
		font-weight: 600;
		cursor: default;
		border-color: #3b82f6;
	}
	button.disabled {
		opacity: 0.5;
		cursor: default;
	}
	button.disabled:hover {
		background: white;
		cursor: default;
	}
</style>
