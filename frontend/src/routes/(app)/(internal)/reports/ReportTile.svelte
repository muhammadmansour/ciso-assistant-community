<script lang="ts">
	import { m } from '$paraglide/messages';

	interface Props {
		title: string;
		description: string;
		icon: string;
		category: string;
		onclick?: () => void;
		href?: string;
		tags?: string[];
	}

	let { title, description, icon, onclick, href, tags = [] }: Props = $props();

	const cardClasses =
		'block h-full w-full text-start p-6 rounded-xl border border-gray-200 bg-white transition-all duration-200 cursor-pointer hover:border-[#0077CC] hover:shadow-[0_4px_14px_rgba(10,24,55,0.08)] focus-visible:outline-none focus-visible:border-[#0077CC] focus-visible:shadow-[0_4px_14px_rgba(10,24,55,0.08)]';
</script>

{#snippet content()}
	<div class="flex h-full items-start gap-4">
		<div class="flex-shrink-0 w-12 h-12 rounded-lg bg-[#E6F1FA] flex items-center justify-center">
			<i class="{icon} text-xl text-[#0077CC]"></i>
		</div>
		<div class="flex-1 min-w-0 h-full flex flex-col">
			<h3 class="text-lg font-semibold text-[#0A1837] mb-2">
				{title}
			</h3>
			<p class="text-sm text-[#51555F] leading-relaxed">
				{description}
			</p>
			<div class="mt-auto pt-4">
				{#if tags.length > 0}
					<div class="flex flex-wrap gap-1 mb-4">
						{#each tags as tag}
							<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#F0F2F5] text-[#51555F]"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
				<div
					class="flex items-center border-t border-gray-200 pt-3 text-sm font-medium text-[#0077CC]"
				>
					{m.rptGenerateReport()}
					<i class="fas fa-arrow-right ms-2 text-xs rtl:rotate-180"></i>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#if href}
	<a {href} class={cardClasses}>
		{@render content()}
	</a>
{:else}
	<button type="button" class={cardClasses} {onclick}>
		{@render content()}
	</button>
{/if}
