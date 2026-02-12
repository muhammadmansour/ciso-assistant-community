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
	<div class="hidden lg:flex lg:w-[55%] bg-[#0A1628] flex-col justify-center items-center relative overflow-hidden">
		<!-- Decorative background elements -->
		<div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0d1e38] rounded-full -translate-y-1/4 translate-x-1/4"></div>
		<div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0d1e38] rounded-full translate-y-1/3 -translate-x-1/3"></div>
		<div class="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#111f36] rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
		
		<div class="relative z-10 w-full px-16">
			<Greetings />
		</div>
	</div>
	
	<!-- Right panel - Login form -->
	<div class="flex-1 flex flex-col items-center justify-center bg-[#f0f2f5] p-8">
		<div class="w-full max-w-md flex-1 flex flex-col justify-center">
			<!-- Mobile logo -->
			<div class="lg:hidden flex items-center justify-center gap-3 mb-8">
				<div class="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center">
					<span class="text-white text-xl font-black">W</span>
				</div>
				<span class="text-[#0A1628] text-2xl font-bold tracking-tight">WathbahGRC</span>
			</div>
			
			<FormCard {data} {form} />

			<!-- Security note -->
			<p class="text-center text-xs text-gray-400 mt-6">
				Protected by enterprise-grade security
			</p>
		</div>

		<!-- Powered by Wathbah -->
		<div class="mt-auto pt-6 pb-4 flex flex-col items-center gap-1">
			<span class="text-xs text-gray-400">Powered by</span>
			<img src="/wathbah.svg" alt="Wathbah" class="h-8" />
		</div>
	</div>
</div>
