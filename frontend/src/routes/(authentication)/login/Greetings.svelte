<script lang="ts">
	import { onMount } from 'svelte';

	const features = [
		{
			icon: 'fa-solid fa-shield-halved',
			title: 'Framework Compliance',
			desc: 'Qiyas, SAMA, NCA & national frameworks'
		},
		{
			icon: 'fa-solid fa-clipboard-check',
			title: 'Assessment Engine',
			desc: 'Workflows for all 10 perspectives & 23 axes'
		},
		{
			icon: 'fa-solid fa-chart-line',
			title: 'Real-time Tracking',
			desc: 'Monitor progress & control statuses live'
		},
		{
			icon: 'fa-solid fa-brain',
			title: 'AI Evidence Analysis',
			desc: 'Auto-assess submissions against Qiyas criteria'
		},
		{
			icon: 'fa-solid fa-users',
			title: 'Team Collaboration',
			desc: 'Assign tasks, share evidence & coordinate reviews'
		},
		{
			icon: 'fa-solid fa-folder-open',
			title: 'Structured Export',
			desc: 'Organized folder structure mapped to Qiyas criteria'
		}
	];

	let activeIndex = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			activeIndex = (activeIndex + 1) % features.length;
		}, 3500);
		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center text-center">
	<!-- Logo -->
	<img
		src="/brand/muhkam/svg/muhkam-lockup-stacked-reversed.svg"
		alt="Muhkam"
		class="h-24 w-auto max-w-sm mb-3"
	/>

	<!-- Subtitle -->
	<h1 class="text-3xl font-bold text-white leading-tight mb-4 whitespace-nowrap">
		Compliance Management Platform
	</h1>

	<!-- Description -->
	<p class="text-gray-400 text-base leading-relaxed max-w-md mb-10">
		Simplify compliance assessments, track requirements in real time, and ensure your organization
		meets national regulatory standards.
	</p>

	<!-- Feature Carousel -->
	<div class="w-full max-w-2xl">
		<div class="relative h-14 overflow-hidden">
			{#each features as feature, i}
				<div
					class="absolute inset-0 flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 ease-out {i === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}"
				>
					<div
						class="w-9 h-9 rounded-lg bg-[#0077CC]/15 flex items-center justify-center flex-shrink-0"
					>
						<i class="{feature.icon} text-[#00A3E0] text-[18px]"></i>
					</div>
					<span class="text-white text-sm font-semibold whitespace-nowrap">{feature.title}</span>
					<span class="w-px h-4 bg-white/10 flex-shrink-0"></span>
					<span class="text-gray-400 text-sm whitespace-nowrap">{feature.desc}</span>
				</div>
			{/each}
		</div>

		<!-- Dots -->
		<div class="flex items-center justify-center gap-2 mt-5">
			{#each features as _, i}
				<button
					class="h-1.5 rounded-full transition-all duration-300 {i === activeIndex
						? 'w-6 bg-[#00A3E0]'
						: 'w-1.5 bg-white/20 hover:bg-white/30'}"
					onclick={() => (activeIndex = i)}
					aria-label="Feature {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</div>
