<script lang="ts">
	import type { PageData } from './$types';
	import type { ControlRow, ValidationRow } from './+page.server';

	interface Props { data: PageData; }
	let { data }: Props = $props();

	// Wathbah primary accent (matches the reference dashboard #0077CC).
	const PRIMARY = '#0077CC';

	// ─── Date helpers ─────────────────────────────────────────────────────────
	function shortDate(iso: string | null | undefined): string {
		if (!iso) return '';
		try {
			return new Date(iso).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' });
		} catch {
			return iso ?? '';
		}
	}

	function getInitials(name: string): string {
		if (!name || name === '—') return '—';
		return name
			.split(' ')
			.map((w) => w[0])
			.filter(Boolean)
			.join('')
			.slice(0, 2);
	}

	// ─── Glance counters (real data) ──────────────────────────────────────────
	const glance = $derived([
		{
			label: 'الضوابط المتأخرة',
			value: data.overdueControls.length,
			accent: 'red' as const
		},
		{
			label: 'أدلة قيد المراجعة',
			value: data.evidenceStatus.inReview,
			accent: 'blue' as const
		},
		{
			label: 'استثناءات نشطة',
			value: data.counters.exceptions ?? 0,
			accent: 'amber' as const
		},
		{
			label: 'أطر العمل',
			value: data.counters.frameworks ?? 0,
			accent: 'gray' as const
		}
	]);

	// ─── My Tasks / Validations tabs ──────────────────────────────────────────
	let activeTab = $state<'tasks' | 'validations'>('tasks');

	function taskStatus(c: ControlRow): { label: string; cls: string } {
		if (c.daysUntil !== null && c.daysUntil < 0) return { label: 'متأخر', cls: 'bg-red-50 text-red-700' };
		if (c.status === 'in_progress') return { label: 'قيد التنفيذ', cls: 'bg-blue-50 text-blue-700' };
		if (c.status === 'on_hold') return { label: 'معلّق', cls: 'bg-amber-50 text-amber-700' };
		return { label: 'جديد', cls: 'bg-gray-100 text-gray-600' };
	}

	function dueDateColor(d: number | null): string {
		if (d === null) return 'text-gray-500';
		if (d <= 0) return 'text-red-600';
		if (d <= 3) return 'text-amber-600';
		return 'text-gray-500';
	}

	// ─── Evidences by status ──────────────────────────────────────────────────
	const evidenceRows = $derived([
		{ label: 'أدلة ناقصة', count: data.evidenceStatus.missing, color: 'bg-red-500', dot: 'bg-red-500' },
		{ label: 'قيد المراجعة', count: data.evidenceStatus.inReview, color: 'bg-blue-500', dot: 'bg-blue-500' },
		{ label: 'منتهية الصلاحية', count: data.evidenceStatus.expired, color: 'bg-amber-500', dot: 'bg-amber-500' },
		{ label: 'مرفوضة', count: data.evidenceStatus.rejected, color: 'bg-red-800', dot: 'bg-red-800' }
	]);
	const evidenceTotal = $derived(data.evidenceStatus.total || 1);
	const evidenceEmpty = $derived(data.evidenceStatus.total === 0);

	// ─── Framework donut ──────────────────────────────────────────────────────
	function donut(score: number, size = 56, sw = 5) {
		const r = (size - sw) / 2;
		const circ = 2 * Math.PI * r;
		const filled = (score / 100) * circ;
		const cx = size / 2;
		const cy = size / 2;
		const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';
		return { r, circ, filled, cx, cy, color, size, sw };
	}

	function deadlineUrgency(d: number | null): { card: string; chip: string } {
		const days = d ?? 99;
		if (days <= 3) return { card: 'bg-red-50 border-red-200 text-red-700', chip: 'bg-red-100 text-red-700' };
		if (days <= 7) return { card: 'bg-amber-50 border-amber-200 text-amber-700', chip: 'bg-amber-100 text-amber-700' };
		return { card: 'bg-gray-50 border-gray-200 text-gray-600', chip: 'bg-gray-100 text-gray-500' };
	}
</script>

<div class="space-y-5 animate-fade-slide-up p-5" dir="rtl">

	<!-- ══════════════════ Header ══════════════════ -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-xl font-bold text-gray-900">لوحة القيادة</h1>
			<p class="text-sm text-gray-500 mt-0.5">عرض مسؤول الامتثال</p>
		</div>
	</div>

	<!-- ══════════════════ Glance Bar ══════════════════ -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
		{#each glance as c}
			{@const hasAlert = c.accent === 'red' && c.value > 0}
			<div
				class="bg-white rounded-xl border border-gray-200 p-4 text-right transition-all {hasAlert ? 'ring-1 ring-red-200' : ''}"
			>
				<div class="text-[32px] leading-none font-bold {hasAlert ? 'text-red-600' : 'text-gray-900'}">
					{c.value}
				</div>
				<div class="text-xs text-gray-500 mt-1.5">{c.label}</div>
			</div>
		{/each}
	</div>

	<!-- ══════════════════ Row 1: Tasks/Validations + Evidences ══════════════════ -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
		<!-- My Tasks & Validations -->
		<div class="lg:col-span-2">
			<div class="bg-white rounded-xl border border-gray-200 overflow-hidden h-full">
				<div class="flex items-center gap-1 px-4 py-3 border-b border-gray-100">
					<i class="fa-solid fa-clipboard-list text-gray-400 text-sm ml-1"></i>
					<h3 class="text-sm font-semibold text-gray-900">مهامي والمراجعات</h3>
				</div>

				<div class="flex border-b border-gray-100">
					<button
						type="button"
						onclick={() => (activeTab = 'tasks')}
						class="flex-1 px-4 py-2 text-xs font-medium transition-colors relative {activeTab === 'tasks' ? '' : 'text-gray-500 hover:text-gray-700'}"
						style={activeTab === 'tasks' ? `color:${PRIMARY}` : ''}
					>
						مهامي
						{#if data.tasks.length > 0}
							<span class="mr-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-gray-100 text-gray-600 font-semibold">
								{data.tasks.length}
							</span>
						{/if}
						{#if activeTab === 'tasks'}
							<div class="absolute bottom-0 left-0 right-0 h-0.5" style="background:{PRIMARY}"></div>
						{/if}
					</button>
					<button
						type="button"
						onclick={() => (activeTab = 'validations')}
						class="flex-1 px-4 py-2 text-xs font-medium transition-colors relative {activeTab === 'validations' ? '' : 'text-gray-500 hover:text-gray-700'}"
						style={activeTab === 'validations' ? `color:${PRIMARY}` : ''}
					>
						المراجعات
						{#if data.validations.length > 0}
							<span class="mr-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-700 font-semibold">
								{data.validations.length}
							</span>
						{/if}
						{#if activeTab === 'validations'}
							<div class="absolute bottom-0 left-0 right-0 h-0.5" style="background:{PRIMARY}"></div>
						{/if}
					</button>
				</div>

				{#if activeTab === 'tasks'}
					<div class="divide-y divide-gray-50">
						{#if data.tasks.length === 0}
							<div class="flex flex-col items-center justify-center py-8 text-gray-400">
								<i class="fa-solid fa-inbox text-2xl mb-2"></i>
								<p class="text-xs">لا شيء بانتظارك حالياً.</p>
							</div>
						{:else}
							{#each data.tasks as task (task.id)}
								{@const st = taskStatus(task)}
								<a href="/applied-controls/{task.id}" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
									<div class="flex-1 min-w-0">
										<div class="font-medium text-gray-900 truncate text-xs">{task.name}</div>
										<div class="flex items-center gap-2 mt-0.5">
											<span class="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{task.scope}</span>
											<span class="text-[10px] {dueDateColor(task.daysUntil)}">{shortDate(task.eta)}</span>
										</div>
									</div>
									<span class="text-[10px] px-2 py-0.5 rounded-full font-medium {st.cls}">{st.label}</span>
									<span class="text-[10px] font-medium flex-shrink-0" style="color:{PRIMARY}">فتح</span>
								</a>
							{/each}
						{/if}
					</div>
				{:else}
					<div class="divide-y divide-gray-50">
						{#if data.validations.length === 0}
							<div class="flex flex-col items-center justify-center py-8 text-gray-400">
								<i class="fa-solid fa-inbox text-2xl mb-2"></i>
								<p class="text-xs">لا شيء بانتظارك حالياً.</p>
							</div>
						{:else}
							{#each data.validations as item (item.id)}
								<a href="/evidences/{item.id}" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
									<div class="flex-1 min-w-0">
										<div class="font-medium text-gray-900 truncate text-xs">{item.name}</div>
										<div class="flex items-center gap-2 mt-0.5">
											<span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">اعتماد دليل</span>
											{#if item.scope}
												<span class="text-[10px] text-gray-400">{item.scope}</span>
											{/if}
											<span class="text-[10px] text-gray-400">{shortDate(item.updated)}</span>
										</div>
									</div>
									<i class="fa-solid fa-circle-check text-emerald-600"></i>
								</a>
							{/each}
						{/if}
					</div>
				{/if}
			</div>
		</div>

		<!-- Evidences by status -->
		<div class="bg-white rounded-xl border border-gray-200 overflow-hidden h-full">
			<div class="px-4 py-3 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">الأدلة حسب الحالة</h3>
			</div>
			{#if evidenceEmpty}
				<div class="flex flex-col items-center justify-center py-8 text-gray-400">
					<i class="fa-solid fa-inbox text-2xl mb-2"></i>
					<p class="text-xs">لا توجد مشكلات في الأدلة</p>
				</div>
			{:else}
				<div class="p-4 space-y-3">
					{#each evidenceRows as row}
						<a href="/evidences" class="w-full text-right group block">
							<div class="flex items-center justify-between mb-1">
								<div class="flex items-center gap-2">
									<div class="w-2 h-2 rounded-full {row.dot}"></div>
									<span class="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">{row.label}</span>
								</div>
								<span class="text-xs font-semibold text-gray-900">{row.count}</span>
							</div>
							<div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
								<div
									class="h-full rounded-full {row.color} transition-all duration-500"
									style="width:{Math.max((row.count / evidenceTotal) * 100, row.count > 0 ? 4 : 0)}%"
								></div>
							</div>
						</a>
					{/each}
				</div>
				<a
					href="/evidences"
					class="flex items-center justify-center gap-1 w-full px-4 py-2.5 border-t border-gray-100 text-xs hover:bg-gray-50 font-medium transition-colors"
					style="color:{PRIMARY}"
				>
					جميع الأدلة
					<i class="fa-solid fa-arrow-left text-[10px]"></i>
				</a>
			{/if}
		</div>
	</div>

	<!-- ══════════════════ Row 2: Framework scores + Overdue controls ══════════════════ -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
		<!-- Framework scores grid -->
		<div class="lg:col-span-2">
			<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div class="px-4 py-3 border-b border-gray-100">
					<h3 class="text-sm font-semibold text-gray-900">نتائج الامتثال حسب الإطار</h3>
				</div>
				{#if data.frameworks.length === 0}
					<div class="p-8 text-center text-gray-400 text-xs">لا توجد نتائج أطر عمل</div>
				{:else}
					<div class="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
						{#each data.frameworks as fw}
							{@const d = donut(fw.progress)}
							<a href="/compliance-assessments" class="bg-white rounded-xl border border-gray-200 p-3 text-right hover:shadow-sm transition-all flex items-start justify-between gap-2">
								<div class="flex-1 min-w-0">
									<h4 class="font-semibold text-gray-900 truncate text-[11px]">{fw.name}</h4>
									<div class="flex items-center gap-1.5 mt-1">
										<i class="fa-solid fa-layer-group text-[10px] text-gray-400"></i>
										<span class="text-[10px] text-gray-500 font-medium">{fw.assessmentsCount} تقييم</span>
									</div>
									{#if fw.due_date}
										<div class="flex items-center gap-1 mt-1.5">
											<i class="fa-solid fa-clock text-[10px] text-gray-400"></i>
											<span class="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
												التدقيق: {shortDate(fw.due_date)}
											</span>
										</div>
									{/if}
								</div>
								<svg width={d.size} height={d.size} viewBox="0 0 {d.size} {d.size}" class="flex-shrink-0">
									<circle cx={d.cx} cy={d.cy} r={d.r} fill="none" stroke="#f3f4f6" stroke-width={d.sw} />
									<circle
										cx={d.cx} cy={d.cy} r={d.r} fill="none" stroke={d.color} stroke-width={d.sw}
										stroke-dasharray="{d.filled} {d.circ}" stroke-dashoffset={d.circ / 4}
										stroke-linecap="round" transform="rotate(-90 {d.cx} {d.cy})"
									/>
									<text x={d.cx} y={d.cy + 1} text-anchor="middle" dominant-baseline="central" class="font-bold fill-gray-900" font-size="13">
										{fw.progress}%
									</text>
								</svg>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Overdue controls -->
		<div class="bg-white rounded-xl border border-gray-200 overflow-hidden h-full">
			<div class="px-4 py-3 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">الضوابط المتأخرة</h3>
			</div>
			{#if data.overdueControls.length === 0}
				<div class="flex flex-col items-center justify-center py-8 text-gray-400">
					<i class="fa-solid fa-inbox text-2xl mb-2"></i>
					<p class="text-xs">لا توجد ضوابط متأخرة</p>
				</div>
			{:else}
				<div class="divide-y divide-gray-50">
					{#each data.overdueControls.slice(0, 8) as ctrl (ctrl.id)}
						<a href="/applied-controls/{ctrl.id}" class="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-right transition-colors">
							<code class="text-[10px] font-mono text-gray-400 w-14 flex-shrink-0 truncate">{ctrl.ref_id || '—'}</code>
							<div class="flex-1 min-w-0">
								<div class="text-xs text-gray-900 truncate">{ctrl.name}</div>
							</div>
							<span class="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium flex-shrink-0">{ctrl.scope}</span>
							<span class="text-[10px] text-red-600 font-medium flex-shrink-0">متأخر {Math.abs(ctrl.daysUntil ?? 0)} يوم</span>
							<div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
								<span class="text-[8px] font-bold text-gray-500">{getInitials(ctrl.owner)}</span>
							</div>
						</a>
					{/each}
				</div>
				{#if data.overdueControls.length > 8}
					<a
						href="/applied-controls"
						class="flex items-center justify-center gap-1 w-full px-4 py-2.5 border-t border-gray-100 text-xs hover:bg-gray-50 font-medium transition-colors"
						style="color:{PRIMARY}"
					>
						عرض الكل
						<i class="fa-solid fa-arrow-left text-[10px]"></i>
					</a>
				{/if}
			{/if}
		</div>
	</div>

	<!-- ══════════════════ Upcoming deadlines strip ══════════════════ -->
	<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div class="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
			<i class="fa-solid fa-clock text-gray-400 text-sm"></i>
			<h3 class="text-sm font-semibold text-gray-900">المواعيد النهائية القادمة (١٤ يوم)</h3>
		</div>
		{#if data.upcomingDeadlines.length === 0}
			<div class="flex items-center justify-center py-6 text-gray-400">
				<i class="fa-solid fa-inbox ml-2"></i>
				<p class="text-xs">لا توجد مواعيد نهائية قادمة</p>
			</div>
		{:else}
			<div class="p-3 overflow-x-auto">
				<div class="flex gap-2.5" style="min-width:max-content">
					{#each data.upcomingDeadlines as d (d.id)}
						{@const u = deadlineUrgency(d.daysUntil)}
						<a href="/applied-controls/{d.id}" class="rounded-lg border px-3 py-2 flex-shrink-0 w-40 {u.card}">
							<code class="text-[10px] font-mono opacity-70">{d.ref_id || '—'}</code>
							<div class="text-[11px] font-medium truncate mt-0.5">{d.name}</div>
							<span class="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded mt-1 {u.chip}">
								{shortDate(d.eta)}
							</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>

</div>
