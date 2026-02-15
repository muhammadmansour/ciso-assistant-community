import { BASE_API_URL } from '$lib/utils/constants';
import { tableSourceMapper, listViewFields } from '$lib/utils/table';

import type { PageServerLoad } from './$types';
import { m } from '$paraglide/messages';

export const load = (async ({ fetch, parent }) => {
	const { user } = await parent();
	const userId = user.actor_id;

	let controlsTable: any = { head: {}, body: [], meta: { count: 0, results: [] } };
	try {
		const fields = listViewFields['applied-controls'];
		const head = fields.body.reduce(
			(obj: Record<string, string>, key: string, index: number) => {
				obj[key] = fields.head[index];
				return obj;
			},
			{}
		);

		const controlsRes = await fetch(
			`${BASE_API_URL}/applied-controls/?owner=${userId}`
		);
		const controlsData = await controlsRes.json();
		const body = tableSourceMapper(controlsData.results || [], fields.body);

		controlsTable = {
			head,
			body,
			meta: controlsData
		};
	} catch (error) {
		console.error('Error fetching applied controls:', error);
	}

	return { controlsTable, user, title: m.myAssignments() };
}) satisfies PageServerLoad;
