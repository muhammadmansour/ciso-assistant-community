import type { PageServerLoad } from './$types';
import {
	fetchLegislativeUpdates,
	LEGISLATIVE_UPDATES_API_URL,
	type LegislativeUpdate
} from '$lib/server/legislative-updates';

export type { LegislativeUpdate };

export const load: PageServerLoad = async (event) => {
	const { items, upstreamStatus } = await fetchLegislativeUpdates(event.fetch, event);
	return {
		title: 'legislativeUpdates',
		items,
		upstreamError: upstreamStatus === 'error',
		upstreamUnauthorized: upstreamStatus === 'unauthorized',
		upstreamUrl: LEGISLATIVE_UPDATES_API_URL
	};
};
