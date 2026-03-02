<script lang="ts">
	import { onMount } from 'svelte';

	const adminFeatures = [
		{
			icon: 'fa-solid fa-microscope',
			title: 'Audit Studio',
			desc: 'Build context sessions with requirements and queries'
		},
		{
			icon: 'fa-solid fa-robot',
			title: 'AI Prompt Manager',
			desc: 'Configure and tune AI analysis prompts'
		},
		{
			icon: 'fa-solid fa-folder-tree',
			title: 'File Collections',
			desc: 'Manage evidence stores and file indexing'
		},
		{
			icon: 'fa-solid fa-sliders',
			title: 'System Config',
			desc: 'Global settings, integrations, and API keys'
		}
	];

	let activeIndex = $state(0);
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let loading = $state(false);

	onMount(() => {
		const interval = setInterval(() => {
			activeIndex = (activeIndex + 1) % adminFeatures.length;
		}, 3500);
		return () => clearInterval(interval);
	});

	function handleSignIn() {
		loading = true;
		// Navigate to admin dashboard — prototype accepts any credentials
		setTimeout(() => {
			window.location.href = '/admin';
		}, 500);
	}
</script>

<div class="min-h-screen flex flex-col lg:flex-row">
	<!-- Left panel - Admin Branding -->
	<div
		class="hidden lg:flex lg:w-[55%] bg-[#0A1628] relative overflow-hidden items-center justify-center"
	>
		<!-- Decorative background circles -->
		<div
			class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0077CC]/5 -translate-y-1/3 translate-x-1/4"
		></div>
		<div
			class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00A3E0]/5 translate-y-1/3 -translate-x-1/4"
		></div>
		<div
			class="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-[#0077CC]/[0.03] -translate-x-1/2 -translate-y-1/2"
		></div>

		<div class="relative z-10 w-full px-12">
			<div class="flex flex-col items-center text-center">
				<!-- Admin Console Badge -->
				<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] mb-6">
					<i class="fa-solid fa-gear text-[#00A3E0] text-xs"></i>
					<span class="text-white/90 text-xs font-semibold uppercase tracking-widest">Admin Console</span>
				</div>

				<!-- Title -->
				<div class="text-5xl font-extrabold tracking-tight mb-1">
					<span class="text-[#0077CC]">W</span><span class="text-white">athbahGRC</span>
				</div>

				<!-- Subtitle -->
				<h2 class="text-2xl font-bold text-white mb-4">Admin</h2>

				<!-- Description -->
				<p class="text-gray-400 text-base leading-relaxed max-w-md mb-10">
					Manage audit sessions, AI prompts, file collections, and system configuration.
				</p>

				<!-- Feature Carousel -->
				<div class="w-full max-w-2xl">
					<div class="relative h-14 overflow-hidden">
						{#each adminFeatures as feature, i}
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
						{#each adminFeatures as _, i}
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
		</div>
	</div>

	<!-- Right panel - Admin Login Form -->
	<div class="flex-1 bg-gray-50 flex flex-col px-6 py-6">
		<!-- Back link -->
		<div class="mb-8">
			<a
				href="/recap"
				class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
			>
				<i class="fa-solid fa-arrow-left text-xs"></i>
				Back to WathbahGRC
			</a>
		</div>

		<!-- Center the form -->
		<div class="flex-1 flex items-center justify-center">
			<div class="w-full max-w-[420px]">
				<!-- Mobile logo -->
				<div class="lg:hidden flex items-center gap-3 mb-10">
					<div
						class="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center font-bold text-white text-lg"
					>
						W
					</div>
					<span class="font-semibold text-xl text-[#0A1628] tracking-tight">WathbahGRC Admin</span>
				</div>

				<!-- Admin Login Card -->
				<div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
					<div class="flex flex-col w-full items-center space-y-5">
						<!-- Icon -->
						<div class="flex items-center gap-3 self-start">
							<div class="w-11 h-11 bg-gradient-to-br from-[#0A1628] to-[#1a2740] rounded-xl flex items-center justify-center shadow-lg">
								<i class="fa-solid fa-gear text-white text-lg"></i>
							</div>
							<div>
								<h3 class="text-xl font-bold text-gray-900">Admin Sign In</h3>
								<p class="text-gray-400 text-xs">Enter your administrator credentials to continue</p>
							</div>
						</div>

						<!-- Form -->
						<div class="w-full space-y-4">
							<!-- Email Field -->
							<div>
								<label for="admin-email" class="block text-sm font-semibold text-gray-700 mb-1.5">
									Admin Email
								</label>
								<div class="relative">
									<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
										<i class="fa-solid fa-envelope text-gray-400 text-sm"></i>
									</div>
									<input
										id="admin-email"
										type="email"
										bind:value={email}
										placeholder="admin@wathbahs.com"
										class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] transition-all"
									/>
								</div>
							</div>

							<!-- Password Field -->
							<div>
								<label for="admin-password" class="block text-sm font-semibold text-gray-700 mb-1.5">
									Password
								</label>
								<div class="relative">
									<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
										<i class="fa-solid fa-lock text-gray-400 text-sm"></i>
									</div>
									<input
										id="admin-password"
										type={showPassword ? 'text' : 'password'}
										bind:value={password}
										placeholder="••••••••••"
										class="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] transition-all"
									/>
									<button
										type="button"
										onclick={() => (showPassword = !showPassword)}
										class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
									>
										<i class="fa-solid {showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm"></i>
									</button>
								</div>
							</div>

							<!-- Sign In Button -->
							<button
								onclick={handleSignIn}
								disabled={loading}
								class="w-full bg-[#0A1628] text-white font-semibold py-3 rounded-xl shadow-sm hover:bg-[#1a2740] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
							>
								{#if loading}
									<svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
										<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
										<path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75" />
									</svg>
									Signing in...
								{:else}
									Sign in to Admin
								{/if}
							</button>
						</div>

						<!-- Prototype note -->
						<p class="text-xs text-gray-400">
							Prototype — accepts any credentials
						</p>
					</div>
				</div>

				<!-- Powered by Wathbah -->
				<div class="mt-8 flex flex-col items-center gap-1.5">
					<span class="text-gray-400 text-xs">Powered by</span>
					<a href="https://wathbahs.com" target="_blank" rel="noopener noreferrer">
						<img
							src="/wathba_logo_full.png"
							alt="Wathbah"
							class="h-10 hover:opacity-90 transition-opacity"
						/>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
