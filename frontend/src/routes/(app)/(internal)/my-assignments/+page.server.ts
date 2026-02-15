import type { PageServerLoad } from './$types';
import { m } from '$paraglide/messages';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	return { user, title: m.myAssignments() };
}) satisfies PageServerLoad;
