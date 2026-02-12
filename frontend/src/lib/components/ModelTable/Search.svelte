<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables/remote';
	import { m } from '$paraglide/messages';
	interface Props {
		handler: DataHandler;
		initialValue?: string;
	}

	let { handler, initialValue = '' }: Props = $props();

	let value = $state(initialValue);
	let timeout: any;

	const search = () => {
		handler.search(value);
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			handler.invalidate();
		}, 400);
	};

	// If initialValue is provided, trigger search on mount
	if (initialValue) {
		handler.search(initialValue);
	}
</script>

<div class="relative max-w-sm">
	<i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
	<input
		class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white transition-all"
		placeholder={m.searchPlaceholder()}
		data-testid="search-input"
		id="search-input"
		type="search"
		bind:value
		oninput={search}
	/>
</div>
