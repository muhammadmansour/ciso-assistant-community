<script lang="ts">
	import { LibraryUploadSchema } from '$lib/utils/schemas';
	import { m } from '$paraglide/messages';

	import { page } from '$app/state';
	import FileInput from '$lib/components/Forms/FileInput.svelte';
	import SuperForm from '$lib/components/Forms/Form.svelte';
	import { superValidate } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { tableHandlers } from '$lib/utils/stores';

	let fileResetSignal = $state(false);

	let { parent } = $props();
</script>

{#if page.data.user.is_admin}
	<div class="card bg-white p-4 mt-4 shadow-sm">
		{#await superValidate(zod(LibraryUploadSchema))}
			<h1>{m.loadingLibraryUploadButton()}...</h1>
		{:then form}
			<SuperForm
				class="flex flex-col space-y-3"
				dataType="form"
				enctype="multipart/form-data"
				data={form}
				validators={zod(LibraryUploadSchema)}
				action="?/upload"
				useFocusTrap={false}
				onSubmit={() => {
					const fileInput = document.querySelector(`input[type="file"]`);
					fileInput.value = '';
					fileResetSignal = true;
					setTimeout(() => {
						fileResetSignal = false;
					}, 10);
					// invalidate to show arrow update button
					Object.values($tableHandlers).forEach((handler) => {
						handler.invalidate();
					});
					parent.onClose();
				}}
			>
			{#snippet children({ form, delayed })}
				<FileInput
					{form}
					helpText={m.libraryFileInYaml()}
					field="file"
					label={m.addYourLibrary()}
					resetSignal={fileResetSignal}
					allowedExtensions={['yaml', 'yml']}
				/>
				<button
					class="btn preset-filled-primary-500 font-semibold w-full {delayed
						? 'cursor-wait opacity-75'
						: ''}"
					data-testid="save-button"
					type="submit"
					disabled={delayed}
					>{#if delayed}{m.loading()}
						<span class="inline-block animate-spin ml-1">⏳</span>
					{:else}{m.add()}{/if}</button
				>
			{/snippet}
			</SuperForm>
		{:catch err}
			<h1>{m.errorOccurredWhileLoadingLibrary()}: {err}</h1>
		{/await}
	</div>
{/if}
