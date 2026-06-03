import type { PageServerLoad } from './$types';
import {
	fetchLegislativeUpdateById,
	LEGISLATIVE_UPDATE_DETAIL_API_URL
} from '$lib/server/legislative-updates';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const { item, upstreamError } = await fetchLegislativeUpdateById(fetch, params.id);
	return {
		title: item?.title ?? 'legislativeUpdates',
		item,
		upstreamError,
		upstreamUrl: `${LEGISLATIVE_UPDATE_DETAIL_API_URL.replace(/\/$/, '')}/${encodeURIComponent(params.id)}`
	};
};
