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
	<div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1e2a4a] via-[#243156] to-[#1a2340] flex-col justify-center items-center relative overflow-hidden">
		<!-- Decorative circles -->
		<div class="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
		
		<div class="relative z-10 text-center px-12">
			<!-- Logo -->
			<div class="mb-8 flex items-center justify-center gap-3">
				<div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
					<span class="text-[#1e2a4a] text-2xl font-black">W</span>
				</div>
				<span class="text-white text-3xl font-bold tracking-tight">WathbaGRC</span>
			</div>
			
			<Greetings />
		</div>
	</div>
	
	<!-- Right panel - Login form -->
	<div class="flex-1 flex items-center justify-center bg-[#f0f2f5] p-8">
		<div class="w-full max-w-md">
			<!-- Mobile logo -->
			<div class="lg:hidden flex items-center justify-center gap-3 mb-8">
				<div class="w-10 h-10 bg-[#1e2a4a] rounded-xl flex items-center justify-center">
					<span class="text-white text-xl font-black">W</span>
				</div>
				<span class="text-[#1e2a4a] text-2xl font-bold tracking-tight">WathbaGRC</span>
			</div>
			
			<FormCard {data} {form} />
		</div>
	</div>
</div>
