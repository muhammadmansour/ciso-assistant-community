<script lang="ts">
	import { m } from '$paraglide/messages';

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

	const fetchAttachment = async (): Promise<Attachment> => {
		const res = await fetch(
			`/${meta.evidence ? 'evidence-revisions' : 'evidences'}/${meta.id}/attachment`
		);
		const blob = await res.blob();
		return {
			type: blob.type,
			url: URL.createObjectURL(blob),
			fileExists: res.ok
		};
	};

	/** Tracks blob URLs for revoke; not reactive — avoids re-running this effect when `attachment` updates. */
	let lastBlobUrl: string | undefined;

	$effect(() => {
		const key = attachmentStableKey;
		if (!key) {
			if (lastBlobUrl) {
				URL.revokeObjectURL(lastBlobUrl);
				lastBlobUrl = undefined;
			}
			attachment = undefined;
			return;
		}

		let cancelled = false;
		const revokeWhenReplaced = lastBlobUrl;

		void fetchAttachment().then((next) => {
			if (cancelled) {
				URL.revokeObjectURL(next.url);
				return;
			}
			if (revokeWhenReplaced) URL.revokeObjectURL(revokeWhenReplaced);
			lastBlobUrl = next.url;
			attachment = next;
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
				<!-- This div prevents the <embed> element from stopping the click event propagation. -->
				<div class="absolute w-full h-full top-0 left-0"></div>
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
			<p class="text-error-500 font-bold">{m.couldNotFindAttachmentMessage()}</p>
		{:else}
			<p>{m.NoPreviewMessage()}</p>
		{/if}
	{:else}
		<span data-testid="loading-field">
			{m.loading()}...
		</span>
	{/if}
{/if}
