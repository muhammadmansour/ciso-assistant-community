<script lang="ts">
	import { run } from 'svelte/legacy';

	import SuperForm from '$lib/components/Forms/Form.svelte';
	import TextField from '$lib/components/Forms/TextField.svelte';
	import { loginSchema } from '$lib/utils/schemas';

	import { page } from '$app/state';
	import { redirectToProvider } from '$lib/allauth.js';
	import { zod } from 'sveltekit-superforms/adapters';
	import MfaAuthenticateModal from './mfa/components/MFAAuthenticateModal.svelte';
	import { m } from '$paraglide/messages';
	import {
		getModalStore,
		type ModalComponent,
		type ModalSettings,
		type ModalStore
	} from '$lib/components/Modals/stores';

	interface Props {
		data: any;
		form: any;
	}

	let { data, form }: Props = $props();

	let loading = $state(false);

	const modalStore: ModalStore = getModalStore();

	function modalMFAAuthenticate(): void {
		const modalComponent: ModalComponent = {
			ref: MfaAuthenticateModal,
			props: {
				_form: data.mfaAuthenticateForm,
				formAction: '?/mfaAuthenticate'
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: m.mfaAuthenticateTitle(),
			body: m.enterCodeGeneratedByApp()
		};
		modalStore.trigger(modal);
	}

	run(() => {
		if (form) {
			loading = false;
			if (form.mfaFlow) modalMFAAuthenticate();
		}
	});
</script>

<div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
	<div data-testid="login" class="flex flex-col w-full items-center space-y-5">
		<!-- Icon -->
		<div class="w-16 h-16 bg-gradient-to-br from-[#0A1628] to-[#1a2740] rounded-2xl flex items-center justify-center shadow-lg">
			<i class="fa-solid fa-right-to-bracket text-white text-2xl"></i>
		</div>
		
		<div class="text-center">
			<h3 class="text-2xl font-bold text-gray-900">
				{m.logIntoYourAccount()}
			</h3>
			<p class="text-gray-500 text-sm mt-1">
				{m.youNeedToLogIn()}
			</p>
		</div>
		
		<div class="w-full">
			<SuperForm
				class="flex flex-col space-y-4"
				data={data?.form}
				dataType="form"
				validators={zod(loginSchema)}
				action="?/login&next={page.url.searchParams.get('next') || '/'}"
				onSubmit={({ cancel, formElement }) => {
					loading = true;
					cancel();
					formElement.submit();
				}}
			>
				{#snippet children({ form })}
					<TextField type="email" {form} field="username" label={m.email()} />
					<TextField type="password" {form} field="password" label={m.password()} />
					<div class="flex flex-row justify-end">
						<a
							href="/password-reset"
							class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
							data-testid="forgot-password-btn"
						>
							{m.forgtPassword()}?
						</a>
					</div>
				<button
					class="btn w-full bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white font-semibold py-3 rounded-lg shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					data-testid="login-btn"
					type="submit"
					disabled={loading}
				>
					{#if loading}
						<svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
							<path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75" />
						</svg>
						{m.login()}...
					{:else}
						{m.login()}
					{/if}
				</button>
				{/snippet}
			</SuperForm>
		</div>
		{#if data.SSOInfo.is_enabled}
			<div class="flex items-center justify-center w-full space-x-3">
				<hr class="flex-1 bg-gray-200 border-0 h-px" />
				<span class="text-gray-400 text-sm">{m.or()}</span>
				<hr class="flex-1 bg-gray-200 border-0 h-px" />
			</div>
			<button
				class="btn w-full bg-[#0A1628] hover:bg-[#1a2740] text-white font-semibold py-3 rounded-lg transition-all duration-200"
				onclick={() =>
					redirectToProvider(data.SSOInfo.sp_entity_id, data.SSOInfo.callback_url, 'login')}
				>{m.loginSSO()}</button
			>
		{/if}
	</div>
</div>
