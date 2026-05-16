<script lang="ts">
	import { browser } from '$app/environment';
	import { m } from '$paraglide/messages';
	import { guessMimeFromEvidenceField, normalizedMime } from '$lib/utils/guessMimeFromEvidencePath';
	import { loadAttachmentCached } from './evidenceAttachmentCache';

	interface Props {
		cell: any;
		meta: any;
	}

	let { cell, meta }: Props = $props();

	interface Attachment {
		type: string;
		url: string;
		fileExists: boolean;
	}

	let attachment: Attachment | undefined = $state(undefined);
	/** Fetch rejected (browser net::ERR_FAILED, timeouts, aborted) — not the same as HTTP 404. */
	let previewLoadFailed = $state(false);

	/** Stable identity — do not include full `meta.attachment` (GCS/S3 signed URLs get new query params every list refresh). */
	function attachmentPathFingerprint(raw: string): string {
		if (!raw) return '';
		try {
			const u = new URL(raw, 'http://_/');
			return u.pathname;
		} catch {
			return raw;
		}
	}

	const attachmentStableKey = $derived(
		meta?.attachment && meta?.id != null
			? `${meta.evidence ? 'rev' : 'ev'}:${meta.id}:${attachmentPathFingerprint(String(meta.attachment))}`
			: null
	);

	const attachmentPath = $derived(
		meta?.id != null
			? `/${meta.evidence ? 'evidence-revisions' : 'evidences'}/${meta.id}/attachment`
			: null
	);

	$effect(() => {
		const key = attachmentStableKey;
		const path = attachmentPath;

		if (!browser || !key || !path) {
			attachment = undefined;
			previewLoadFailed = false;
			return;
		}

		const absUrl = new URL(path, window.location.origin).href;
		const guessed = guessMimeFromEvidenceField(String(meta?.attachment ?? cell ?? ''));
		const streamInline = guessed === 'application/pdf' || guessed.startsWith('image/');

		if (streamInline) {
			previewLoadFailed = false;
			attachment = {
				type: guessed,
				url: absUrl,
				fileExists: true
			};
			return () => {};
		}

		let cancelled = false;
		previewLoadFailed = false;

		const probe = async (): Promise<Attachment> => {
			const res = await fetch(path, { method: 'HEAD', credentials: 'include' });
			let ct = normalizedMime(res.headers.get('Content-Type'));
			if (ct === 'application/octet-stream') {
				ct = guessed !== 'application/octet-stream' ? guessed : ct;
			}
			return {
				type: ct,
				url: absUrl,
				fileExists: res.ok
			};
		};

		void loadAttachmentCached(key, probe)
			.then((next) => {
				if (cancelled) return;
				attachment = next;
				previewLoadFailed = false;
			})
			.catch(() => {
				if (cancelled) return;
				attachment = undefined;
				previewLoadFailed = true;
			});

		return () => {
			cancelled = true;
		};
	});

	let display = $state(false);
	const wrapperClasses =
		'fixed w-full h-full inset-0 flex justify-center items-center backdrop-blur-sm backdrop-brightness-40 z-999';
	const imageElementClasses = 'w-[90%] h-[90%]';
	const embedElementClasses = 'w-[50%] h-[90%]';
</script>

{#snippet displayPreview()}
	<div
		role="button"
		tabindex="0"
		class={display ? wrapperClasses : 'relative cursor-zoom-in'}
		onclick={(event) => {
			display = !display;
			event.stopPropagation();
		}}
		onkeydown={(event) => {
			if ((display && event.key === 'Escape') || event.key === 'Tab') {
				display = !display;
			}
		}}
	>
		{#if attachment.type.startsWith('image')}
			<img
				src={attachment.url}
				alt="attachment"
				class="h-24 object-contain {display ? imageElementClasses : ''}"
			/>
		{:else if attachment.type === 'application/pdf'}
			{#if !display}
				<!-- This div prevents the `<embed>` element from stopping the click event propagation. -->
				<div class="absolute h-full top-0 w-full"></div>
			{/if}
			<embed
				src={attachment.url}
				type="application/pdf"
				class="h-24 object-contain {display ? embedElementClasses : ''}"
			/>
		{/if}
	</div>
{/snippet}

{#if cell}
	{#if attachment}
		{#if attachment.type.startsWith('image') || attachment.type === 'application/pdf'}
			{@render displayPreview()}
		{:else if !attachment.fileExists}
			<p class="font-bold text-error-500">{m.couldNotFindAttachmentMessage()}</p>
		{:else}
			<p>{m.NoPreviewMessage()}</p>
		{/if}
	{:else if previewLoadFailed}
		<p class="font-bold text-error-500">{m.attachmentPreviewFailed()}</p>
	{:else}
		<span data-testid="loading-field">
			{m.loading()}...
		</span>
	{/if}
{/if}
