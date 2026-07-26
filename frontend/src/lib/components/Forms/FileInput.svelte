<script lang="ts">
	import { run } from 'svelte/legacy';
	import { getContext } from 'svelte';

	import { formFieldProxy, fileProxy } from 'sveltekit-superforms';
	import { getToastStore } from '$lib/components/Toast/stores';
	import { getPdfPageCount, isPdfFile } from '$lib/utils/pdfPageCount';
	import { m } from '$paraglide/messages';

	interface Props {
		class?: string;
		label?: string | undefined;
		field: string;
		helpText?: string | undefined;
		form: any;
		allowPaste?: boolean;
		resetSignal?: boolean; // Reset the form value if set to true
		allowedExtensions: string[] | '*';
		/**
		 * Maximum allowed page count for PDF uploads. When set and the user
		 * picks a PDF whose page count exceeds this value, the file is
		 * cleared from the input and a toast is shown. `undefined` disables
		 * the check.
		 */
		maxPdfPages?: number;
		[key: string]: any;
	}

	let {
		class: _class = '',
		label = undefined,
		field,
		helpText = undefined,
		form,
		allowPaste = false,
		resetSignal = false,
		allowedExtensions,
		maxPdfPages = undefined,
		...rest
	}: Props = $props();

	const { errors, constraints } = formFieldProxy(form, field);
	let value = fileProxy(form, field);
	let fileInput: null | HTMLInputElement = $state(null);
	let pdfValidating = $state(false);
	const toastStore = getToastStore();

	// Wired up by ``ModelForm.svelte``. ``updatePdfValidating`` lets the parent
	// disable its Save/Add button while validation is in flight (prevents the
	// user from racing past the client-side PDF page-count check).
	// ``requestModalClose`` is null when this input lives on a plain page
	// instead of inside a modal — guard with optional chaining.
	const updatePdfValidating =
		getContext<((validating: boolean) => void) | undefined>('updatePdfValidating');
	const requestModalClose = getContext<(() => void) | null>('requestModalClose');

	let classesTextField = $derived((errors: string[] | undefined) => (errors ? 'input-error' : ''));

	function getShortenPreciseType(preciseType: string): string {
		const shortPreciseTypeResult = /^[a-z0-9]+/.exec(preciseType);
		if (shortPreciseTypeResult === null) return '';
		return shortPreciseTypeResult[0];
	}

	function getAppropriateExtension(mimeType: string): string | null {
		const [mainType, preciseType] = mimeType.toLocaleLowerCase().split('/');
		const shortPreciseType = getShortenPreciseType(preciseType);

		if (
			mainType === 'image' &&
			(allowedExtensions === '*' || allowedExtensions.includes(shortPreciseType))
		)
			return shortPreciseType;
		return null;
	}

	function generateFilename(mimeType: string): string | null {
		const extension = getAppropriateExtension(mimeType);
		if (extension === null) return null;
		// We could implement some contextual data in the filename (for example the evidence name or the name of an object this evidence is related to etc...)
		const date = new Date();
		return `${date.getDate()}-${
			date.getMonth() + 1
		}-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}_${date.getMilliseconds()}.${extension}`;
	}

	function clearSelection() {
		if (fileInput) fileInput.value = '';
		const dataTransfer = new DataTransfer();
		$value = dataTransfer.files; // Empty FileList
	}

	/**
	 * Reject the selected PDF: clear the input, close the surrounding modal
	 * (if any) so the toast isn't competing with a modal for attention, then
	 * trigger the toast on the next microtask. The microtask deferral matters
	 * because Skeleton's modal-close starts a transition that briefly leaves
	 * the modal in the DOM; firing the toast synchronously can race with the
	 * close animation and visually leave the toast under the fading modal.
	 */
	function rejectPdf(message: string) {
		clearSelection();
		if (requestModalClose) {
			requestModalClose();
		}
		setTimeout(() => {
			toastStore.trigger({
				message,
				background: 'preset-filled-error-500',
				timeout: 8000
			});
		}, 0);
	}

	/**
	 * Check PDF page count against `maxPdfPages`. Fails *closed*: if the
	 * page count cannot be determined (pdf-lib bundle missing, encrypted
	 * file, malformed PDF, etc.) we clear the selection and show a toast
	 * rather than silently let an oversized file through. The backend is
	 * the final authority — this is only here to give fast UX feedback.
	 */
	async function enforcePdfPageLimit(file: File): Promise<boolean> {
		if (maxPdfPages === undefined || !isPdfFile(file)) return true;
		pdfValidating = true;
		updatePdfValidating?.(true);
		try {
			const pages = await getPdfPageCount(file);
			if (pages === null) {
				console.warn('[FileInput] PDF page count could not be determined; blocking upload.');
				rejectPdf(m.pdfPageLimitUnknown());
				return false;
			}
			if (pages <= maxPdfPages) return true;

			rejectPdf(m.pdfPageLimitExceeded({ pages, max: maxPdfPages }));
			return false;
		} finally {
			pdfValidating = false;
			updatePdfValidating?.(false);
		}
	}

	async function onChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		await enforcePdfPageLimit(file);
	}

	async function onPaste(event: ClipboardEvent) {
		if (!allowPaste || fileInput === null) return;
		const items = event.clipboardData?.items;
		if (!items) return;
		for (const item of items) {
			if (item.kind === 'file') {
				const blob = item.getAsFile();
				if (blob === null) continue;
				const filename = generateFilename(blob.type);
				if (filename === null) continue;

				const file = new File([blob], filename, { type: blob.type });

				if (!(await enforcePdfPageLimit(file))) {
					event.preventDefault();
					break;
				}

				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);
				fileInput.files = dataTransfer.files; // It seems to work fine even with the superforms fileProxy.

				const event = new Event('change', { bubbles: true }); // Do we really need bubbles: true ?
				fileInput.dispatchEvent(event);

				// A toast should appear to tell the user the Paste operation was successfull.

				event.preventDefault();
				break;
			}
		}
	}

	run(() => {
		if (resetSignal) {
			const dataTransfer = new DataTransfer();
			$value = dataTransfer.files; // Empty FileList
		}
	});
</script>

<svelte:document onpaste={onPaste} />

<div>
	{#if label !== undefined}
		{#if $constraints?.required}
			<label class="text-sm font-semibold" for={field}
				>{label} <span class="text-red-500">*</span></label
			>
		{:else}
			<label class="text-sm font-semibold" for={field}>{label}</label>
		{/if}
	{/if}
	{#if $errors}
		<div>
			{#each $errors as error}
				<p class="text-error-500 text-xs font-medium">{error}</p>
			{/each}
		</div>
	{/if}
	<div class="control">
		<input
			type="file"
			name={field}
			class="{'input ' + _class} {classesTextField($errors)}"
			data-testid="form-input-{field.replaceAll('_', '-')}"
			aria-invalid={$errors ? 'true' : undefined}
			placeholder=""
			bind:files={$value}
			bind:this={fileInput}
			onchange={onChange}
			accept={allowedExtensions === '*'
				? null
				: Array.from(allowedExtensions)
						.map((ext) => '.' + ext)
						.join(',')}
			{...$constraints}
			{...rest}
		/>
	</div>
	{#if pdfValidating}
		<div
			class="mt-1 flex items-center gap-2 text-sm text-primary-600"
			role="status"
			aria-live="polite"
		>
			<span
				class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"
				aria-hidden="true"
			></span>
			<span>{m.pdfValidating()}</span>
		</div>
	{:else if helpText}
		<p class="text-sm text-gray-500">{helpText}</p>
	{/if}
</div>
