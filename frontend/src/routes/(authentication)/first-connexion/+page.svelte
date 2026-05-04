<script lang="ts">
	import type { PageData } from './$types';
	import SuperForm from '$lib/components/Forms/Form.svelte';
	import TextField from '$lib/components/Forms/TextField.svelte';
	import { ResetPasswordSchema } from '$lib/utils/schemas';
	import Greetings from '../login/Greetings.svelte';

	import { m } from '$paraglide/messages.js';
	import { zod } from 'sveltekit-superforms/adapters';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="min-h-screen flex">
	<!-- Left panel - Branding -->
	<div
		class="hidden lg:flex lg:w-[55%] bg-[#0A1628] flex-col relative overflow-hidden"
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

		<div class="relative z-10 w-full px-12 flex-1 flex items-center justify-center">
			<div class="w-full">
				<Greetings />
			</div>
		</div>
	</div>

	<!-- Right panel - Set Password form -->
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

				<div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
					<!-- Icon -->
					<div class="w-16 h-16 bg-gradient-to-br from-[#0A1628] to-[#1a2740] rounded-2xl flex items-center justify-center shadow-lg mb-6">
						<i class="fa-solid fa-key text-white text-2xl"></i>
					</div>

					<div class="text-center mb-6">
						<h3 class="text-2xl font-bold text-gray-900">
							{m.helloThere()} 👋
						</h3>
						<p class="text-gray-500 text-sm mt-1">
							{m.youCanSetPasswordHere()}
						</p>
					</div>

					<div class="w-full">
						<SuperForm
							class="flex flex-col space-y-4"
							data={data?.form}
							dataType="form"
							validators={zod(ResetPasswordSchema)}
						>
							{#snippet children({ form })}
								<TextField type="hidden" hidden {form} field="uidb64" label="" />
								<TextField type="hidden" hidden {form} field="token" label="" />
								<TextField type="password" {form} field="new_password" label={m.newPassword()} />
								<TextField
									type="password"
									{form}
									field="confirm_new_password"
									label={m.confirmNewPassword()}
								/>
								<button
									class="btn w-full bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white font-semibold py-3 rounded-lg shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200"
									type="submit"
									data-testid="set-password-btn"
								>
									{m.setPassword()}
								</button>
							{/snippet}
						</SuperForm>
					</div>
				</div>

				<!-- Security note -->
				<p class="text-center text-xs text-gray-400 mt-6">
					Protected by enterprise-grade security
				</p>
			</div>
		</div>

		<!-- Powered by Wathbah -->
		<div class="flex flex-col items-center gap-1.5 pb-2 pt-6">
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
