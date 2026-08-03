<script lang="ts">
	import { onMount } from 'svelte';
	import SuperForm from '$lib/components/Forms/Form.svelte';
	import TextField from '$lib/components/Forms/TextField.svelte';
	import { loginSchema } from '$lib/utils/schemas';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { ActionData, PageData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();

	const adminFeatures = [
		{
			icon: 'fa-solid fa-microscope',
			title: 'Audit Studio',
			desc: 'Build context sessions with requirements and queries'
		},
		{
			icon: 'fa-solid fa-wand-magic-sparkles',
			title: 'Prompt Management',
			desc: 'Configure and tune AI prompt templates'
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
	let loading = $state(false);

	onMount(() => {
		const interval = setInterval(() => {
			activeIndex = (activeIndex + 1) % adminFeatures.length;
		}, 3500);
		return () => clearInterval(interval);
	});

	$effect(() => {
		if (form) {
			loading = false;
		}
	});
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

				<img
					src="/brand/muhkam/svg/muhkam-lockup-stacked-reversed.svg"
					alt="Muhkam"
					class="h-20 w-auto max-w-xs mb-1"
				/>

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
				href="/login"
				class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
			>
				<i class="fa-solid fa-arrow-left text-xs"></i>
				Back to Muhkam
			</a>
		</div>

		<!-- Center the form -->
		<div class="flex-1 flex items-center justify-center">
			<div class="w-full max-w-[420px]">
				<!-- Mobile logo -->
				<div class="lg:hidden flex items-center mb-10">
					<img
						src="/brand/muhkam/svg/muhkam-lockup-horizontal.svg"
						alt="Muhkam Admin"
						class="h-10 w-auto max-w-[220px]"
					/>
				</div>

				<!-- Admin Login Card -->
				<div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
					<div class="flex flex-col w-full space-y-5">
						<!-- Header -->
						<div class="flex items-center gap-3">
							<div class="w-11 h-11 bg-gradient-to-br from-[#0A1628] to-[#1a2740] rounded-xl flex items-center justify-center shadow-lg">
								<i class="fa-solid fa-gear text-white text-lg"></i>
							</div>
							<div>
								<h3 class="text-xl font-bold text-gray-900">Admin Sign In</h3>
								<p class="text-gray-400 text-xs">Enter your administrator credentials to continue</p>
							</div>
						</div>

						<!-- Form using same login endpoint -->
						<div class="w-full">
							<SuperForm
								class="flex flex-col space-y-4"
								data={data?.form}
								dataType="form"
								validators={zod(loginSchema)}
								taintedMessage={null}
								action="?/login"
								onSubmit={({ cancel, formElement }) => {
									loading = true;
									cancel();
									formElement.submit();
								}}
							>
								{#snippet children({ form: formInstance })}
									<div>
										<label for="admin-email" class="block text-sm font-semibold text-gray-700 mb-1.5">
											Admin Email
										</label>
										<div class="relative">
											<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
												<i class="fa-solid fa-envelope text-gray-400 text-sm"></i>
											</div>
											<div class="admin-field-wrapper">
												<TextField
													type="email"
													form={formInstance}
													field="username"
													label=""
												/>
											</div>
										</div>
									</div>

									<div>
										<label for="admin-password" class="block text-sm font-semibold text-gray-700 mb-1.5">
											Password
										</label>
										<div class="relative">
											<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
												<i class="fa-solid fa-lock text-gray-400 text-sm"></i>
											</div>
											<div class="admin-field-wrapper">
												<TextField
													type="password"
													form={formInstance}
													field="password"
													label=""
												/>
											</div>
										</div>
									</div>

									<button
										class="btn w-full bg-[#0A1628] text-white font-semibold py-3 rounded-xl shadow-sm hover:bg-[#1a2740] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
										type="submit"
										disabled={loading}
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
								{/snippet}
							</SuperForm>
						</div>
					</div>
				</div>

				<!-- Security note -->
				<p class="text-center text-xs text-gray-400 mt-6">
					Protected by enterprise-grade security
				</p>

				<div class="mt-8 flex justify-center">
					<img
						src="/brand/muhkam/svg/muhkam-lockup-horizontal.svg"
						alt="Muhkam"
						class="h-8 w-auto opacity-80"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Style the TextField inputs within the admin form to have padding for icons */
	:global(.admin-field-wrapper input) {
		padding-left: 2.5rem !important;
	}
</style>
