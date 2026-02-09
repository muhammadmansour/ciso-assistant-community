<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { breadcrumbs, type Breadcrumb } from '$lib/utils/breadcrumbs';
	import { URL_MODEL_MAP } from '$lib/utils/crud';
	import { safeTranslate } from '$lib/utils/i18n';
	import { pageTitle } from '$lib/utils/stores';

	async function trimBreadcrumbsToCurrentPath(
		breadcrumbs: Breadcrumb[],
		currentPath: string
	): Promise<Breadcrumb[]> {
		const idx = breadcrumbs.findIndex((c) => c.href?.startsWith(currentPath));
		// First breadcrumb is home, its href is always '/'
		if (idx > 0 && idx < breadcrumbs.length - 1) {
			breadcrumbs = breadcrumbs.slice(0, idx + 1);
		}
		return breadcrumbs;
	}

	function getPageTitle(): string {
		const title =
			page.data.title ??
			page.data.str ??
			page.data.name ??
			getBreadcrumbTitle() ??
			getUrlModelTitle();
		return safeTranslate(title);
	}

	function getBreadcrumbTitle(): string | undefined {
		return $breadcrumbs.length > 1 ? $breadcrumbs[$breadcrumbs.length - 1]?.label : undefined;
	}

	function getUrlModelTitle(): string | undefined {
		const lastPathSegment = page.url.pathname.split('/').pop() as string;
		return URL_MODEL_MAP[lastPathSegment]?.localNamePlural;
	}

	afterNavigate(async () => {
		$breadcrumbs = await trimBreadcrumbsToCurrentPath($breadcrumbs, page.url.pathname);
	});

	$effect(() => {
		$pageTitle = getPageTitle();
		if ($breadcrumbs.length < 2) breadcrumbs.push([{ label: $pageTitle, href: page.url.pathname }]);
	});
</script>

<ol class="flex items-center gap-2 h-6 overflow-hidden whitespace-nowrap">
	<!-- Home icon -->
	<li>
		<a
			href="/my-assignments"
			class="text-gray-400 hover:text-blue-600 transition-colors"
			title="Home"
		>
			<i class="fa-solid fa-house text-sm"></i>
		</a>
	</li>
	{#each $breadcrumbs as c, i}
		<li class="text-gray-300 text-xs" aria-hidden="true">/</li>
		{#if i == $breadcrumbs.length - 1}
			<li>
				<span
					class="max-w-[64ch] overflow-hidden whitespace-nowrap text-ellipsis text-sm text-gray-500 font-medium"
					data-testid="crumb-item"
					title={safeTranslate(c.label)}
				>
					{#if c.icon}
						<i class={c.icon}></i>
					{/if}
					{safeTranslate(c.label)}
				</span>
			</li>
		{:else}
			<li>
				{#if c.href}
					<a
						class="max-w-[64ch] block overflow-hidden whitespace-nowrap text-ellipsis text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
						data-testid="crumb-item"
						href={c.href}
						title={safeTranslate(c.label)}
						onclick={() => breadcrumbs.slice(i)}
					>
						{#if c.icon}
							<i class={c.icon}></i>
						{/if}
						{safeTranslate(c.label)}
					</a>
				{:else}
					<span
						class="max-w-[64ch] overflow-hidden whitespace-nowrap text-ellipsis text-sm text-gray-500 font-medium"
						data-testid="crumb-item"
						title={safeTranslate(c.label)}
					>
						{#if c.icon}
							<i class={c.icon}></i>
						{/if}
						{safeTranslate(c.label)}
					</span>
				{/if}
			</li>
		{/if}
	{/each}
</ol>
