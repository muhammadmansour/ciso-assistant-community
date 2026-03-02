<script lang="ts">
	// Mock data for admin dashboard - will be replaced with real API data
	const stats = [
		{ label: 'Audit Sessions', value: 3, icon: 'fa-regular fa-comment-dots', color: 'text-[#0077CC]', bg: 'bg-blue-50' },
		{ label: 'Prompts', value: 6, icon: 'fa-solid fa-list-ul', color: 'text-[#0077CC]', bg: 'bg-blue-50' },
		{ label: 'File Collections', value: 2, icon: 'fa-solid fa-folder-open', color: 'text-[#0077CC]', bg: 'bg-blue-50' },
		{ label: 'Frameworks Loaded', value: 6, icon: 'fa-solid fa-book', color: 'text-[#0077CC]', bg: 'bg-blue-50' },
		{ label: 'Merge Suggestions', value: 4, icon: 'fa-solid fa-code-merge', color: 'text-orange-500', bg: 'bg-orange-50' }
	];

	const recentSessions = [
		{ name: 'SAMA Cyber Security Framework', date: 'Feb 23, 01:49 PM', req: 1, files: 1, msgs: 4 },
		{ name: 'Audit Session', date: 'Feb 19, 02:54 PM', req: 0, files: 0, msgs: 0 },
		{ name: 'SAMA Cyber Security Review', date: 'Feb 18, 11:30 AM', req: 1, files: 2, msgs: 6 }
	];

	const quickActions = [
		{ label: 'New Audit Session', desc: 'Start a new AI-assisted audit', icon: 'fa-solid fa-wand-magic-sparkles', href: '/admin/audit-studio' },
		{ label: 'Generate Controls', desc: 'Suggest controls for framework requirements', icon: 'fa-solid fa-shield-halved', href: '/admin/controls-studio' },
		{ label: 'Optimize Controls', desc: 'Merge overlapping controls to reduce redundancy', icon: 'fa-solid fa-code-merge', href: '/admin/merge-optimizer' },
		{ label: 'Upload Files', desc: 'Add files to collections', icon: 'fa-solid fa-folder-open', href: '/admin/file-collections' }
	];

	const studioSessions = [
		{ name: 'SAMA CSF Full Framework Contr...', org: 'National Investment Bank', badges: [{ text: '↕ merge', color: 'text-orange-600 bg-orange-50' }, { text: 'exported', color: 'text-blue-600 bg-blue-50' }] },
		{ name: 'NCA ECC Controls for Ministry', org: 'Ministry of Digital Infrastructure', badges: [{ text: 'generated', color: 'text-green-600 bg-green-50' }] },
		{ name: 'Healthcare PDPL Controls', org: 'Al-Shifa Healthcare Group', badges: [{ text: 'draft', color: 'text-gray-500 bg-gray-100' }] }
	];

	const frameworks = [
		{ name: 'Saudi Arabia Personal Dat...', reqs: 91 },
		{ name: 'Digital Transformation (Qi...', reqs: 483 },
		{ name: 'Digital Transformation (Qi...', reqs: 131 }
	];

	const totalSessions = recentSessions.length;
	const totalMessages = recentSessions.reduce((sum, s) => sum + s.msgs, 0);
	const totalFiles = recentSessions.reduce((sum, s) => sum + s.files, 0);
</script>

<div class="space-y-6">
	<!-- Header -->
	<div>
		<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
		<p class="text-sm text-gray-500 mt-0.5">Overview of your AI admin configuration and activity</p>
	</div>

	<!-- Stat Cards -->
	<div class="grid grid-cols-5 gap-4">
		{#each stats as stat}
			<div class="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
				<div class="w-10 h-10 {stat.bg} rounded-lg flex items-center justify-center mb-3">
					<i class="{stat.icon} {stat.color}"></i>
				</div>
				<div class="text-3xl font-bold text-gray-900">{stat.value}</div>
				<div class="text-xs text-gray-500 mt-0.5">{stat.label}</div>
			</div>
		{/each}
	</div>

	<!-- Main Content Grid -->
	<div class="grid grid-cols-12 gap-6">
		<!-- Left Column: Recent Sessions -->
		<div class="col-span-7">
			<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
					<div class="flex items-center gap-2">
						<i class="fa-regular fa-clock text-gray-400 text-sm"></i>
						<h2 class="font-semibold text-gray-900">Recent Sessions</h2>
					</div>
					<a href="/admin" class="text-sm text-[#0077CC] hover:text-[#005fa3] font-medium flex items-center gap-1">
						View All <i class="fa-solid fa-arrow-right text-xs"></i>
					</a>
				</div>
				<div class="divide-y divide-gray-100">
					{#each recentSessions as session}
						<div class="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
							<div>
								<div class="text-sm font-medium text-gray-900">{session.name}</div>
								<div class="text-xs text-gray-400 mt-0.5">{session.date}</div>
							</div>
							<div class="flex items-center gap-4">
								<div class="text-center">
									<div class="text-sm font-semibold text-gray-900">{session.req}</div>
									<div class="text-[10px] text-gray-400">Req</div>
								</div>
								<div class="text-center">
									<div class="text-sm font-semibold text-[#0077CC]">{session.files}</div>
									<div class="text-[10px] text-gray-400">Files</div>
								</div>
								<div class="text-center">
									<div class="text-sm font-semibold text-gray-900">{session.msgs}</div>
									<div class="text-[10px] text-gray-400">Msgs</div>
								</div>
								<i class="fa-solid fa-chevron-right text-[10px] text-gray-300 group-hover:text-gray-500 transition-colors"></i>
							</div>
						</div>
					{/each}
				</div>
				<div class="px-5 py-3 bg-gray-50 border-t border-gray-100">
					<div class="flex items-center gap-4 text-xs text-gray-500">
						<span>{totalSessions} sessions</span>
						<span class="w-1 h-1 rounded-full bg-gray-300"></span>
						<span>{totalMessages} total messages</span>
						<span class="w-1 h-1 rounded-full bg-gray-300"></span>
						<span>{totalFiles} reference files</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column -->
		<div class="col-span-5 space-y-6">
			<!-- Quick Actions -->
			<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div class="px-5 py-4 border-b border-gray-100">
					<h2 class="font-semibold text-gray-900">Quick Actions</h2>
				</div>
				<div class="divide-y divide-gray-100">
					{#each quickActions as action}
						<a href={action.href} class="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors group">
							<div class="flex items-center gap-3">
								<div class="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:bg-gray-100 transition-colors">
									<i class="{action.icon} text-gray-500 text-sm"></i>
								</div>
								<div>
									<div class="text-sm font-medium text-gray-900">{action.label}</div>
									<div class="text-xs text-gray-400">{action.desc}</div>
								</div>
							</div>
							<i class="fa-solid fa-chevron-right text-[10px] text-gray-300 group-hover:text-gray-500 transition-colors"></i>
						</a>
					{/each}
				</div>
			</div>

			<!-- Studio Sessions -->
			<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
					<h2 class="font-semibold text-gray-900">Studio Sessions</h2>
					<a href="/admin/controls-studio" class="text-sm text-[#0077CC] hover:text-[#005fa3] font-medium flex items-center gap-1">
						Open Studio <i class="fa-solid fa-arrow-right text-xs"></i>
					</a>
				</div>
				<div class="divide-y divide-gray-100">
					{#each studioSessions as session}
						<div class="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
							<div>
								<div class="text-sm font-medium text-gray-900">{session.name}</div>
								<div class="text-xs text-gray-400">{session.org}</div>
							</div>
							<div class="flex items-center gap-1.5">
								{#each session.badges as badge}
									<span class="text-[11px] font-medium px-2 py-0.5 rounded-full {badge.color}">
										{badge.text}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Frameworks -->
			<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div class="px-5 py-4 border-b border-gray-100">
					<h2 class="font-semibold text-gray-900">Frameworks</h2>
				</div>
				<div class="divide-y divide-gray-100">
					{#each frameworks as fw}
						<div class="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
							<div class="text-sm text-gray-700">{fw.name}</div>
							<span class="text-xs font-medium text-[#0077CC] bg-blue-50 px-2 py-0.5 rounded-full">
								{fw.reqs} req
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
