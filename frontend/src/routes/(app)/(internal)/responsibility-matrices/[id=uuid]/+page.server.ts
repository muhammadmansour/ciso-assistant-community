import { BASE_API_URL } from '$lib/utils/constants';
import { getModelInfo } from '$lib/utils/crud';
import { loadDetail } from '$lib/utils/load';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

async function unwrap(response: Response) {
	if (!response.ok) return [];
	const payload = await response.json();
	return Array.isArray(payload) ? payload : (payload.results ?? []);
}

export const load: PageServerLoad = async (event) => {
	const modelInfo = getModelInfo('responsibility-matrices');
	const detail = await loadDetail({
		event,
		model: modelInfo,
		id: event.params.id
	});
	const query = `matrix=${event.params.id}&limit=500`;
	const [activities, actors, assignments, actorChoices] = await Promise.all([
		event.fetch(`${BASE_API_URL}/pmbok/responsibility-matrix-activities/?${query}`).then(unwrap),
		event.fetch(`${BASE_API_URL}/pmbok/responsibility-matrix-actors/?${query}`).then(unwrap),
		event
			.fetch(
				`${BASE_API_URL}/pmbok/responsibility-assignments/?activity__matrix=${event.params.id}&limit=1000`
			)
			.then(unwrap),
		event.fetch(`${BASE_API_URL}/actors/?limit=500`).then(unwrap)
	]);
	return { ...detail, activities, actors, assignments, actorChoices };
};

export const actions: Actions = {
	cycle: async ({ request, fetch, params }) => {
		const form = await request.formData();
		const response = await fetch(
			`${BASE_API_URL}/pmbok/responsibility-matrices/${params.id}/cycle-cell/`,
			{
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					activity: form.get('activity'),
					actor: form.get('actor'),
					direction: form.get('direction') || 'forward'
				})
			}
		);
		if (!response.ok) return fail(response.status, { error: await response.text() });
		return { success: true };
	},
	addActivity: async ({ request, fetch }) => {
		const form = await request.formData();
		const response = await fetch(`${BASE_API_URL}/pmbok/responsibility-matrix-activities/`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				matrix: form.get('matrix'),
				name: form.get('name'),
				folder: form.get('folder')
			})
		});
		if (!response.ok) return fail(response.status, { error: await response.text() });
		return { success: true };
	},
	addActor: async ({ request, fetch }) => {
		const form = await request.formData();
		const response = await fetch(`${BASE_API_URL}/pmbok/responsibility-matrix-actors/`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				matrix: form.get('matrix'),
				actor: form.get('actor'),
				folder: form.get('folder')
			})
		});
		if (!response.ok) return fail(response.status, { error: await response.text() });
		return { success: true };
	}
};
