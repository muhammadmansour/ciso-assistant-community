<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Greetings from './Greetings.svelte';
	import FormCard from './FormCard.svelte';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
</script>

<div class="min-h-screen flex">
	<!-- Left panel - Branding -->
	<div
		class="hidden lg:flex lg:w-[55%] bg-[#0A1628] flex-col relative overflow-hidden"
	>
		<!-- Decorative background circles (matching reference) -->
		<div
			class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0077CC]/5 -translate-y-1/3 translate-x-1/4"
		></div>
		<div
			class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00A3E0]/5 translate-y-1/3 -translate-x-1/4"
		></div>
		<div
			class="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-[#0077CC]/[0.03] -translate-x-1/2 -translate-y-1/2"
		></div>

		<div class="relative z-10 w-full px-12 flex-1 flex items-center justify-center">
			<div class="w-full">
				<Greetings />
			</div>
		</div>
	</div>

	<!-- Right panel - Login form -->
	<div class="flex-1 flex flex-col bg-gray-50 px-6 py-12">
		<div class="w-full max-w-[420px] mx-auto flex-1 flex items-center">
			<div class="w-full">
				<!-- Mobile logo -->
				<div class="lg:hidden flex items-center gap-3 mb-10">
					<div
						class="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center font-bold text-white text-lg"
					>
						W
					</div>
					<span class="font-semibold text-xl text-[#0A1628] tracking-tight">WathbahGRC</span>
				</div>

				<FormCard {data} {form} />

				<!-- Security note -->
				<p class="text-center text-xs text-gray-400 mt-6">
					Protected by enterprise-grade security
				</p>
			</div>
		</div>

		<!-- Powered by Wathbah -->
		<div class="flex flex-col items-center gap-1.5 pb-2 pt-6">
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
