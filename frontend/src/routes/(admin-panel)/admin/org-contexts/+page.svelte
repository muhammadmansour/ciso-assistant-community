<script lang="ts">
	let searchQuery = $state('');

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
