<script lang="ts">
	import { enhance } from '$app/forms';
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import { m } from '$paraglide/messages';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const matrix = data.data;

	function labelOf(value: unknown): string {
		if (!value) return '';
		if (typeof value === 'string') return value;
		if (typeof value === 'object') {
			const record = value as { str?: string; name?: string };
			return record.str || record.name || '';
		}
		return String(value);
	}

	function actorId(column: { actor?: { id?: string } | string }): string {
		if (!column.actor) return '';
		return typeof column.actor === 'string' ? column.actor : column.actor.id || '';
	}

	function assignmentFor(activityId: string, actor: string) {
		return data.assignments.find((row) => {
			const activity = typeof row.activity === 'string' ? row.activity : row.activity?.id;
			const rowActor = typeof row.actor === 'string' ? row.actor : row.actor?.id;
			return activity === activityId && rowActor === actor;
		});
	}
</script>

<DetailView {data} />

<div class="card p-4 bg-white my-4 space-y-4">
	<p class="text-sm text-gray-600">{m.clickToAssignRole()}</p>
	{#if matrix.roles?.length}
		<div class="flex flex-wrap gap-2">
			{#each matrix.roles as role}
				<span
					class="rounded px-2 py-1 text-xs font-semibold text-white"
					style={role.color ? `background:${role.color}` : ''}
				>
					{role.code} · {role.name}
				</span>
			{/each}
		</div>
	{/if}
	{#if matrix.projects?.length}
		<p class="text-sm">
			{m.projects()}:
			{#each matrix.projects as project, index}
				{#if index > 0}, {/if}
				<Anchor href="/projects/{project.id}">{labelOf(project)}</Anchor>
			{/each}
		</p>
	{/if}
	<div class="overflow-x-auto">
		<table class="min-w-full text-sm border-collapse">
			<thead>
				<tr>
					<th class="border p-2 text-start">{m.matrixActivity()}</th>
					{#each data.actors as column}
						<th class="border p-2">{labelOf(column.actor)}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data.activities as activity}
					<tr>
						<td class="border p-2">{activity.name}</td>
						{#each data.actors as column}
							{@const actor = actorId(column)}
							{@const cell = assignmentFor(activity.id, actor)}
							<td class="border p-1 text-center">
								<form method="POST" action="?/cycle" use:enhance>
									<input type="hidden" name="activity" value={activity.id} />
									<input type="hidden" name="actor" value={actor} />
									<button
										class="min-w-10 rounded px-2 py-1 font-semibold"
										style={cell?.role?.color ? `background:${cell.role.color};color:white` : ''}
										title={cell?.role?.name || ''}
									>
										{cell?.role?.code || '·'}
									</button>
								</form>
							</td>
						{/each}
					</tr>
				{:else}
					<tr>
						<td class="border p-2 text-gray-500" colspan={data.actors.length + 1}>{m.noActivitiesYet()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="grid md:grid-cols-2 gap-4">
		<form method="POST" action="?/addActivity" use:enhance class="flex gap-2 items-end">
			<input type="hidden" name="matrix" value={matrix.id} />
			<input type="hidden" name="folder" value={matrix.folder?.id || matrix.folder} />
			<label class="flex-1 text-sm">
				{m.matrixActivity()}
				<input class="input mt-1" name="name" required />
			</label>
			<button class="btn preset-filled-primary-500">{m.addActivity()}</button>
		</form>
		<form method="POST" action="?/addActor" use:enhance class="flex gap-2 items-end">
			<input type="hidden" name="matrix" value={matrix.id} />
			<input type="hidden" name="folder" value={matrix.folder?.id || matrix.folder} />
			<label class="flex-1 text-sm">
				{m.actor()}
				<select class="select mt-1" name="actor" required>
					<option value="">{m.selectActor()}</option>
					{#each data.actorChoices as choice}
						<option value={choice.id}>{labelOf(choice)}</option>
					{/each}
				</select>
			</label>
			<button class="btn preset-filled-primary-500">{m.addActor()}</button>
		</form>
	</div>
</div>
