<script lang="ts">
	import { browser } from '$app/environment';
	import ConfirmModal from '$lib/components/Modals/ConfirmModal.svelte';
	import { getModelInfo } from '$lib/utils/crud.js';
	import { guessMimeFromEvidenceField, normalizedMime } from '$lib/utils/guessMimeFromEvidencePath';
	import type { ModalComponent, ModalSettings, ModalStore } from '@skeletonlabs/skeleton-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import { m } from '$paraglide/messages';
	import { defaults } from 'sveltekit-superforms';
	import { z } from 'zod';
	import { zod } from 'sveltekit-superforms/adapters';
	import { canPerformAction } from '$lib/utils/access-control';
	import { getModalStore } from '$lib/components/Modals/stores';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	interface Attachment {
		type: string;
		url: string;
		fileExists: boolean;
	}

	let attachment: Attachment | undefined = $state(undefined);
	const modalStore: ModalStore = getModalStore();

	function modalConfirm(id: string, name: string, action: string): void {
		const modalComponent: ModalComponent = {
			ref: ConfirmModal,
			props: {
				_form: defaults(
					{ id, urlmodel: 'evidence-revisions' },
					zod(z.object({ id: z.string(), urlmodel: z.string() }))
				),
				schema: zod(z.object({ id: z.string(), urlmodel: z.string() })),
				id: id,
				debug: false,
				URLModel: getModelInfo('evidence-revisions').urlModel,
				formAction: action
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: m.confirmModalTitle(),
			body: `${m.confirmModalMessage()}: ${name}?`
		};
		modalStore.trigger(modal);
	}

	onMount(async () => {
		if (!browser || !data.data.attachment) {
			attachment = undefined;
			return;
		}
		const rel = `./${data.data.id}/attachment`;
		const absUrl = new URL(rel, window.location.href).href;
		const guessed = guessMimeFromEvidenceField(data.data.attachment);
		const streamInline = guessed === 'application/pdf' || guessed.startsWith('image/');

		if (streamInline) {
			attachment = { type: guessed, url: absUrl, fileExists: true };
			return;
		}

		try {
			const res = await fetch(rel, { method: 'HEAD', credentials: 'include' });
			let ct = normalizedMime(res.headers.get('Content-Type'));
			if (ct === 'application/octet-stream' && guessed !== 'application/octet-stream') {
				ct = guessed;
			}
			attachment = {
				type: ct,
				url: absUrl,
				fileExists: res.ok
			};
		} catch {
			attachment = { type: guessed, url: absUrl, fileExists: true };
		}
	});

	const user = page.data.user;
	const canEditObject: boolean = canPerformAction({
		user,
		action: 'change',
		model: data.model.name,
		domain:
			data.model.name === 'folder'
				? data.data.id
				: (data.data.folder?.id ?? data.data.folder ?? user.root_folder_id)
	});
</script>

<DetailView {data} />

{#if data.data.attachment}
	<div class="card mt-8 px-6 py-4 bg-white flex flex-col shadow-lg space-y-4">
		<div class="flex flex-row justify-between">
			<h4 class="h4 font-semibold" data-testid="attachment-name-title">
				{data.data.attachment}
			</h4>
			<div class="space-x-2">
				<Anchor
					href={`./${data.data.id}/attachment`}
					class="btn preset-filled-primary-500 h-fit"
					data-testid="attachment-download-button"
					><i class="fa-solid fa-download mr-2"></i> {m.download()}</Anchor
				>
				{#if canEditObject}
					<button
						onclick={(_) => {
							modalConfirm(data.data.id, data.data.attachment, '?/deleteAttachment');
						}}
						onkeydown={(_) =>
							modalConfirm(data.data.id, data.data.attachment, '?/deleteAttachment')}
						class="btn preset-filled-tertiary-500 h-full"><i class="fa-solid fa-trash"></i></button
					>
				{/if}
			</div>
		</div>
		{#if attachment}
			{#if attachment.type.startsWith('image')}
				<img src={attachment.url} alt="attachment" />
			{:else if attachment.type === 'application/pdf'}
				<embed src={attachment.url} type="application/pdf" width="100%" height="600px" />
			{:else}
				<div class="flex items-center justify-center space-x-4">
					{#if !attachment.fileExists}
						<p class="text-error-500 font-bold">{m.couldNotFindAttachmentMessage()}</p>
					{:else}
						<p class="font-bold text-sm">{m.NoPreviewMessage()}</p>
					{/if}
				</div>
			{/if}
		{:else}
			<span data-testid="loading-field">
				{m.loading()}...
			</span>
		{/if}
	</div>
{/if}
