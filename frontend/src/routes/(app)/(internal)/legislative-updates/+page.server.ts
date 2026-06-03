import type { PageServerLoad } from './$types';
import {
	fetchLegislativeUpdates,
	LEGISLATIVE_UPDATES_API_URL,
	type LegislativeUpdate
} from '$lib/server/legislative-updates';

export type { LegislativeUpdate };

export const load: PageServerLoad = async ({ fetch }) => {
	const { items, upstreamError } = await fetchLegislativeUpdates(fetch);
	return {
		title: 'legislativeUpdates',
		items,
		upstreamError,
		upstreamUrl: LEGISLATIVE_UPDATES_API_URL
	};
};
