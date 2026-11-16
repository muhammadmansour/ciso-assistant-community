import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isFeatureFlagOn } from '$lib/feature-flags';

export const load: PageServerLoad = async ({ locals }) => {
	if (!isFeatureFlagOn(locals.featureflags, 'document_management')) redirect(302, '/');
	return {};
};
