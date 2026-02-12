<script lang="ts">
	import { onMount } from 'svelte';

	const features = [
		{
			icon: 'fa-solid fa-clipboard-check',
			title: 'Assessment Engine',
			description: 'Workflows for all 10 perspectives & 23 axes'
		},
		{
			icon: 'fa-solid fa-shield-halved',
			title: 'Control Management',
			description: 'Track and manage compliance controls in real time'
		},
		{
			icon: 'fa-solid fa-chart-line',
			title: 'Risk Analytics',
			description: 'Comprehensive risk scoring and trend analysis'
		},
		{
			icon: 'fa-solid fa-file-certificate',
			title: 'Evidence Collection',
			description: 'Centralized evidence repository with version control'
		},
		{
			icon: 'fa-solid fa-users-gear',
			title: 'Team Collaboration',
			description: 'Assign tasks, track progress, and manage approvals'
		}
	];

	let activeIndex = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			activeIndex = (activeIndex + 1) % features.length;
		}, 4000);
		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center text-center">
	<!-- Title -->
	<h1 class="text-5xl font-black tracking-tight mb-3">
		<span class="text-[#0077CC]">W</span><span class="text-white">athbahGRC</span>
	</h1>

	<!-- Subtitle -->
	<h2 class="text-xl font-bold text-white mb-4">
		Compliance Management Platform
	</h2>

	<!-- Description -->
	<p class="text-white/60 text-base leading-relaxed max-w-md mb-12">
		Simplify compliance assessments, track requirements in real time, and ensure your organization meets national regulatory standards.
	</p>

	<!-- Feature Carousel -->
	<div class="w-full max-w-lg">
		<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4">
			<div class="w-10 h-10 rounded-lg bg-[#0077CC]/20 flex items-center justify-center flex-shrink-0">
				<i class="{features[activeIndex].icon} text-[#0077CC] text-lg"></i>
			</div>
			<div class="text-left min-h-[40px] flex flex-col justify-center">
				<span class="text-white font-semibold text-sm">{features[activeIndex].title}</span>
				<span class="text-white/50 text-xs">{features[activeIndex].description}</span>
			</div>
		</div>

		<!-- Dots -->
		<div class="flex items-center justify-center gap-2 mt-4">
			{#each features as _, i}
				<button
					class="w-2 h-2 rounded-full transition-all duration-300 {i === activeIndex ? 'bg-[#0077CC] w-6' : 'bg-white/30 hover:bg-white/50'}"
					onclick={() => (activeIndex = i)}
					aria-label="Feature {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</div>
