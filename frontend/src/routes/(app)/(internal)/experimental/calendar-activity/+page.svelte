<script lang="ts">
	import { m } from '$paraglide/messages';
	import CalendarHeatmap from '$lib/components/Chart/CalendarHeatmap.svelte';

	const currentYear = new Date().getFullYear();
	let selectedDate = $state<string | null>(null);
	let selectedValue = $state<number | null>(null);

	function handleDateClick(date: string, value: number) {
		selectedDate = date;
		selectedValue = value;
	}
</script>

<main class="p-8 space-y-8">
	<div>
		<h1 class="text-3xl font-bold mb-2">{m.calendarActivityHeatmap()}</h1>
		<p class="text-gray-600 mb-8">
			Experimental calendar heatmap using ECharts 6 - GitHub-style activity visualization
		</p>
	</div>

	<div class="bg-white rounded-lg shadow p-6">
		<CalendarHeatmap
			name="current_year"
			year={currentYear}
			title="Current Year Activity ({currentYear})"
			height="h-80"
			onDateClick={handleDateClick}
		/>
	</div>

	<div class="bg-gray-50 rounded-lg p-6">
		<h3 class="text-lg font-semibold mb-3">{m.selectedDateInfo()}</h3>
		{#if selectedDate}
			<div class="space-y-2">
				<p><span class="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString()}</p>
				<p><span class="font-medium">{m.activityValue()}</span> {selectedValue}</p>
				<p>
					<span class="font-medium">{m.dayOfWeek()}</span>
					{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' })}
				</p>
			</div>
		{:else}
			<p class="text-gray-500">{m.clickDateForDetails()}</p>
		{/if}
	</div>
</main>
