<script lang="ts">
	let searchQuery = $state('');
	let showModal = $state(false);
	let dragOver = $state(false);

	// Form state
	let formData = $state({
		nameEn: '',
		nameAr: '',
		sector: '',
		size: '',
		geoScope: '',
		maturityLevel: '',
		notes: '',
		regulatoryObligations: [] as string[]
	});
	let uploadedFiles = $state<File[]>([]);

	const sectorOptions = [
		'Financial',
		'Government',
		'Healthcare',
		'Energy',
		'Telecommunications',
		'Education',
		'Retail',
		'Technology',
		'Manufacturing',
		'Other'
	];

	const sizeOptions = ['Small', 'Medium', 'Large', 'Enterprise'];

	const geoScopeOptions = [
		'Saudi Arabia',
		'GCC',
		'Middle East & Africa',
		'Global',
		'Regional',
		'Local'
	];

	const maturityOptions = [
		'Initial',
		'Developing',
		'Defined',
		'Managed',
		'Optimizing'
	];

	const regulatoryOptions = [
		'SAMA Cyber Security',
		'Essential Cybersecurity Controls',
		'Saudi Arabia Personal Data Protection',
		'Operational Technology Security',
		'Digital Transformation (Qiyas 2)'
	];

	function toggleObligation(name: string) {
		if (formData.regulatoryObligations.includes(name)) {
			formData.regulatoryObligations = formData.regulatoryObligations.filter((o) => o !== name);
		} else {
			formData.regulatoryObligations = [...formData.regulatoryObligations, name];
		}
	}

	function openModal() {
		formData = {
			nameEn: '',
			nameAr: '',
			sector: '',
			size: '',
			geoScope: '',
			maturityLevel: '',
			notes: '',
			regulatoryObligations: []
		};
		uploadedFiles = [];
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function handleSave() {
		// TODO: send to backend
		console.log('Saving context:', formData, uploadedFiles);
		closeModal();
	}

	function handleFileDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		if (e.dataTransfer?.files) {
			uploadedFiles = [...uploadedFiles, ...Array.from(e.dataTransfer.files)];
		}
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files) {
			uploadedFiles = [...uploadedFiles, ...Array.from(input.files)];
		}
	}

	function removeFile(index: number) {
		uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
	}

	const contexts = [
		{
			id: '1',
			name: 'National Investment Bank',
			nameAr: 'بنك الاستثمار الوطني',
			industry: 'Financial',
			industryColor: 'text-blue-700 bg-blue-50',
			size: 'Enterprise',
			sizeColor: 'text-gray-700 bg-gray-100',
			maturity: 'Managed',
			maturityColor: 'text-green-700 bg-green-50',
			frameworks: [
				{ name: 'SAMA Cyber Security', color: 'text-teal-700 bg-teal-50 border-teal-200' },
				{ name: 'Saudi Arabia Perso...', color: 'text-blue-700 bg-blue-50 border-blue-200' }
			],
			extraFrameworks: 1,
			docs: 4
		},
		{
			id: '2',
			name: 'Ministry of Digital Infrastructure',
			nameAr: 'وزارة البنية التحتية الرقمية',
			industry: 'Government',
			industryColor: 'text-emerald-700 bg-emerald-50',
			size: 'Large',
			sizeColor: 'text-gray-700 bg-gray-100',
			maturity: 'Developing',
			maturityColor: 'text-orange-600 bg-orange-50',
			frameworks: [
				{ name: 'Essential Cybersec...', color: 'text-teal-700 bg-teal-50 border-teal-200' },
				{ name: 'Digital Transforma...', color: 'text-blue-700 bg-blue-50 border-blue-200' }
			],
			extraFrameworks: 1,
			docs: 2
		},
		{
			id: '3',
			name: 'Al-Shifa Healthcare Group',
			nameAr: 'مجموعة الشفاء الصحية',
			industry: 'Healthcare',
			industryColor: 'text-red-600 bg-red-50',
			size: 'Medium',
			sizeColor: 'text-gray-700 bg-gray-100',
			maturity: 'Initial',
			maturityColor: 'text-orange-500 bg-orange-50',
			frameworks: [
				{ name: 'Essential Cybersec...', color: 'text-teal-700 bg-teal-50 border-teal-200' },
				{ name: 'Saudi Arabia Perso...', color: 'text-blue-700 bg-blue-50 border-blue-200' }
			],
			extraFrameworks: 0,
			docs: 1
		}
	];

	const totalContexts = contexts.length;
	const totalDocs = contexts.reduce((sum, c) => sum + c.docs, 0);
	const fullCoverage = contexts.filter((c) => c.maturity === 'Managed').length;

	const filteredContexts = $derived(
		searchQuery.trim()
			? contexts.filter(
					(c) =>
						c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
						c.nameAr.includes(searchQuery)
				)
			: contexts
	);
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Organization Contexts</h1>
			<p class="text-sm text-gray-500 mt-0.5">Manage client and entity profiles for AI-contextualized control suggestions</p>
		</div>
		<button
			onclick={openModal}
			class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0077CC] text-white text-sm font-semibold rounded-lg hover:bg-[#005fa3] transition-colors shadow-sm"
		>
			<i class="fa-solid fa-plus text-xs"></i>
			New Context
		</button>
	</div>

	<!-- Stat Cards -->
	<div class="grid grid-cols-3 gap-4">
		<div class="bg-white rounded-xl border border-gray-200 p-5">
			<div class="flex items-center gap-2 mb-3">
				<i class="fa-solid fa-building text-[#0077CC] text-sm"></i>
				<span class="text-sm text-gray-500">Total Contexts</span>
			</div>
			<div class="text-3xl font-bold text-gray-900">{totalContexts}</div>
		</div>
		<div class="bg-white rounded-xl border border-gray-200 p-5">
			<div class="flex items-center gap-2 mb-3">
				<i class="fa-solid fa-file-lines text-[#0077CC] text-sm"></i>
				<span class="text-sm text-gray-500">Total Documents</span>
			</div>
			<div class="text-3xl font-bold text-gray-900">{totalDocs}</div>
		</div>
		<div class="bg-white rounded-xl border border-gray-200 p-5">
			<div class="flex items-center gap-2 mb-3">
				<i class="fa-regular fa-circle-check text-[#0077CC] text-sm"></i>
				<span class="text-sm text-gray-500">Full Regulatory Coverage</span>
			</div>
			<div class="text-3xl font-bold text-gray-900">{fullCoverage}</div>
		</div>
	</div>

	<!-- Search -->
	<div class="relative">
		<i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search by name, sector..."
			class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC]"
		/>
	</div>

	<!-- Context List -->
	<div class="space-y-3">
		{#each filteredContexts as ctx}
			<div class="bg-white rounded-xl border border-gray-200 px-5 py-4 hover:border-blue-200 hover:shadow-sm transition-all group">
				<div class="flex items-center justify-between">
					<!-- Left: Info -->
					<div class="flex items-center gap-4">
						<div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
							<i class="fa-solid fa-building text-gray-500"></i>
						</div>
						<div>
							<div class="flex items-center gap-2 mb-1">
								<span class="text-sm font-semibold text-gray-900">{ctx.name}</span>
								<span class="text-sm text-gray-400">{ctx.nameAr}</span>
							</div>
							<div class="flex items-center gap-1.5">
								<span class="text-[11px] font-medium px-2 py-0.5 rounded-full {ctx.industryColor}">{ctx.industry}</span>
								<span class="text-[11px] font-medium px-2 py-0.5 rounded-full {ctx.sizeColor}">{ctx.size}</span>
								<span class="text-[11px] font-medium px-2 py-0.5 rounded-full {ctx.maturityColor}">{ctx.maturity}</span>
							</div>
						</div>
					</div>

					<!-- Right: Frameworks + Actions -->
					<div class="flex items-center gap-4">
						<!-- Frameworks -->
						<div class="flex items-center gap-1.5">
							{#each ctx.frameworks as fw}
								<span class="text-[11px] font-medium px-2 py-0.5 rounded-full border {fw.color}">
									{fw.name}
								</span>
							{/each}
							{#if ctx.extraFrameworks > 0}
								<span class="text-[11px] font-medium text-gray-500">+{ctx.extraFrameworks}</span>
							{/if}
						</div>

						<!-- Docs count -->
						<span class="text-xs text-gray-400">{ctx.docs} docs</span>

						<!-- Action buttons -->
						<div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
							<button class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
								<i class="fa-solid fa-pen-to-square text-xs"></i>
							</button>
							<button class="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
								<i class="fa-solid fa-trash text-xs"></i>
							</button>
						</div>

						<!-- Chevron -->
						<i class="fa-solid fa-chevron-right text-[10px] text-gray-300 group-hover:text-gray-500 transition-colors"></i>
					</div>
				</div>
			</div>
		{/each}

		{#if filteredContexts.length === 0}
			<div class="text-center py-12 bg-white rounded-xl border border-gray-200">
				<i class="fa-solid fa-building text-4xl text-gray-300 mb-3"></i>
				<p class="text-gray-500 text-sm">No contexts found</p>
			</div>
		{/if}
	</div>
</div>

<!-- New Organization Context Modal -->
{#if showModal}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
		onkeydown={(e) => { if (e.key === 'Escape') closeModal(); }}
		onclick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
	>
		<!-- Modal -->
		<div class="bg-white rounded-2xl shadow-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col">
			<!-- Header -->
			<div class="flex items-start justify-between px-7 pt-6 pb-4 border-b border-gray-100">
				<div>
					<h2 class="text-xl font-bold text-gray-900">New Organization Context</h2>
					<p class="text-sm text-gray-400 mt-0.5">Create a profile for AI-contextualized suggestions</p>
				</div>
				<button
					onclick={closeModal}
					class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors -mt-1"
				>
					<i class="fa-solid fa-xmark text-lg"></i>
				</button>
			</div>

			<!-- Body (scrollable) -->
			<div class="flex-1 overflow-y-auto px-7 py-5 space-y-5">
				<!-- Name Fields -->
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-1.5">Organization Name (EN)</label>
						<input
							type="text"
							bind:value={formData.nameEn}
							placeholder="e.g. National Investment Bank"
							class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC]"
						/>
					</div>
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-1.5">Organization Name (AR)</label>
						<input
							type="text"
							dir="rtl"
							bind:value={formData.nameAr}
							placeholder="مثال: بنك الاستثمار الوطني"
							class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC]"
						/>
					</div>
				</div>

				<!-- Sector / Size / Geographic Scope -->
				<div class="grid grid-cols-3 gap-4">
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-1.5">Sector</label>
						<select
							bind:value={formData.sector}
							class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_0.75rem]"
						>
							<option value="">Select...</option>
							{#each sectorOptions as opt}
								<option value={opt}>{opt}</option>
							{/each}
						</select>
					</div>
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-1.5">Size</label>
						<select
							bind:value={formData.size}
							class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_0.75rem]"
						>
							<option value="">Select...</option>
							{#each sizeOptions as opt}
								<option value={opt}>{opt}</option>
							{/each}
						</select>
					</div>
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-1.5">Geographic Scope</label>
						<select
							bind:value={formData.geoScope}
							class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_0.75rem]"
						>
							<option value="">Select...</option>
							{#each geoScopeOptions as opt}
								<option value={opt}>{opt}</option>
							{/each}
						</select>
					</div>
				</div>

				<!-- Maturity Level -->
				<div>
					<label class="block text-sm font-semibold text-gray-700 mb-1.5">Maturity Level</label>
					<select
						bind:value={formData.maturityLevel}
						class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_0.75rem]"
					>
						<option value="">Select...</option>
						{#each maturityOptions as opt}
							<option value={opt}>{opt}</option>
						{/each}
					</select>
				</div>

				<!-- Regulatory Obligations -->
				<div>
					<label class="block text-sm font-semibold text-gray-700 mb-2.5">Regulatory Obligations</label>
					<div class="grid grid-cols-2 gap-x-6 gap-y-2.5">
						{#each regulatoryOptions as obligation}
							<label class="flex items-center gap-2.5 cursor-pointer group/check">
								<input
									type="checkbox"
									checked={formData.regulatoryObligations.includes(obligation)}
									onchange={() => toggleObligation(obligation)}
									class="w-4 h-4 rounded border-gray-300 text-[#0077CC] focus:ring-[#0077CC]/20 cursor-pointer"
								/>
								<span class="text-sm text-gray-700 group-hover/check:text-gray-900">{obligation}</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Notes -->
				<div>
					<label class="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
					<textarea
						bind:value={formData.notes}
						rows="3"
						placeholder="Additional context for AI suggestions..."
						class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] resize-none"
					></textarea>
				</div>

				<!-- Documents -->
				<div>
					<label class="block text-sm font-semibold text-gray-700 mb-1.5">Documents</label>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="border-2 border-dashed rounded-xl py-8 text-center transition-colors cursor-pointer {dragOver ? 'border-[#0077CC] bg-blue-50/50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}"
						ondragover={(e) => { e.preventDefault(); dragOver = true; }}
						ondragleave={() => { dragOver = false; }}
						ondrop={handleFileDrop}
						onclick={() => document.getElementById('file-input')?.click()}
					>
						<input
							id="file-input"
							type="file"
							multiple
							class="hidden"
							onchange={handleFileSelect}
						/>
						<i class="fa-regular fa-file-lines text-3xl text-gray-300 mb-2"></i>
						<p class="text-sm text-gray-500 font-medium">Drop files or click to upload</p>
						<p class="text-xs text-gray-400 mt-0.5">Policies, org charts, prior audit reports, architecture diagrams</p>
					</div>

					<!-- Uploaded Files List -->
					{#if uploadedFiles.length > 0}
						<div class="mt-3 space-y-2">
							{#each uploadedFiles as file, i}
								<div class="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg">
									<div class="flex items-center gap-2 min-w-0">
										<i class="fa-regular fa-file text-gray-400 text-sm flex-shrink-0"></i>
										<span class="text-sm text-gray-700 truncate">{file.name}</span>
										<span class="text-xs text-gray-400 flex-shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
									</div>
									<button
										onclick={() => removeFile(i)}
										class="w-6 h-6 rounded hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
									>
										<i class="fa-solid fa-xmark text-xs"></i>
									</button>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-end gap-3 px-7 py-4 border-t border-gray-100">
				<button
					onclick={closeModal}
					class="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
				<button
					onclick={handleSave}
					class="px-5 py-2.5 text-sm font-semibold text-white bg-[#0077CC] rounded-lg hover:bg-[#005fa3] transition-colors shadow-sm"
				>
					Save Context
				</button>
			</div>
		</div>
	</div>
{/if}
