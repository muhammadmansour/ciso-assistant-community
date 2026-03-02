import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user?.is_admin) {
		redirect(302, '/recap');
	}

	return {
		user: locals.user,
		title: 'WathbahGRC Admin'
	};
};
