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

<div class="min-h-screen flex flex-col lg:flex-row">
	<!-- Left panel - Branding -->
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
			<Greetings />
		</div>
	</div>

	<!-- Right panel - Login form -->
	<div class="flex-1 bg-gray-50 flex items-center justify-center px-6 py-6">
		<div class="w-full max-w-[420px]">
			<!-- Mobile logo -->
			<div class="lg:hidden flex items-center mb-10">
				<img
					src="/brand/muhkam/svg/muhkam-lockup-horizontal.svg"
					alt="Muhkam"
					class="h-10 w-auto max-w-[200px]"
				/>
			</div>

			<FormCard {data} {form} />

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
