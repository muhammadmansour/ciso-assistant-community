<script lang="ts">
	import { run } from 'svelte/legacy';

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
	const toastStore = getToastStore();

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
	 * Soft-check PDF page count against `maxPdfPages`. The backend stays the
	 * source of truth — this is only for UX (catch oversize files before the
	 * upload). On parse failure we keep the file (`null` page count) and let
	 * the server-side validation decide.
	 */
	async function enforcePdfPageLimit(file: File): Promise<boolean> {
		if (maxPdfPages === undefined || !isPdfFile(file)) return true;
		const pages = await getPdfPageCount(file);
		if (pages === null) return true;
		if (pages <= maxPdfPages) return true;

		clearSelection();
		toastStore.trigger({
			message: m.pdfPageLimitExceeded({ pages, max: maxPdfPages }),
			background: 'variant-filled-error',
			timeout: 8000
		});
		return false;
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
	{#if helpText}
		<p class="text-sm text-gray-500">{helpText}</p>
	{/if}
</div>
