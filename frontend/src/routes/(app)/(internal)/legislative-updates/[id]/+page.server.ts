import type { PageServerLoad } from './$types';
import {
	fetchLegislativeUpdateById,
	LEGISLATIVE_UPDATE_DETAIL_API_URL
} from '$lib/server/legislative-updates';

export const load: PageServerLoad = async (event) => {
	const { item, upstreamStatus } = await fetchLegislativeUpdateById(
		event.fetch,
		event.params.id,
		event
	);
	return {
		title: null,
		item,
		upstreamError: upstreamStatus === 'error',
		upstreamUnauthorized: upstreamStatus === 'unauthorized',
		upstreamUrl: `${LEGISLATIVE_UPDATE_DETAIL_API_URL.replace(/\/$/, '')}/${encodeURIComponent(event.params.id)}`
	};
};
