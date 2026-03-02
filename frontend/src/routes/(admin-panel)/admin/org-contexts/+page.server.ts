import { BASE_API_URL } from '$lib/utils/constants';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const endpoint = `${BASE_API_URL}/organization-contexts/`;
	const res = await fetch(endpoint);

	if (!res.ok) {
		return {
			title: 'Organization Contexts',
			contexts: [],
			sectorChoices: {},
			sizeChoices: {},
			maturityChoices: {},
			geoScopeChoices: {}
		};
	}

	const data = await res.json();

	// Fetch enum choices for labels
	const [sectorRes, sizeRes, maturityRes, geoRes] = await Promise.all([
		fetch(`${BASE_API_URL}/organization-contexts/sector/`).then((r) =>
			r.ok ? r.json() : {}
		),
		fetch(`${BASE_API_URL}/organization-contexts/size/`).then((r) =>
			r.ok ? r.json() : {}
		),
		fetch(`${BASE_API_URL}/organization-contexts/maturity_level/`).then((r) =>
			r.ok ? r.json() : {}
		),
		fetch(`${BASE_API_URL}/organization-contexts/geographic_scope/`).then((r) =>
			r.ok ? r.json() : {}
		)
	]);

	return {
		title: 'Organization Contexts',
		contexts: data.results ?? data,
		sectorChoices: sectorRes,
		sizeChoices: sizeRes,
		maturityChoices: maturityRes,
		geoScopeChoices: geoRes
	};
};

export const actions: Actions = {
	create: async ({ request, fetch }) => {
		const formData = await request.formData();

		const body: Record<string, any> = {
			name: formData.get('name') as string,
			name_ar: formData.get('name_ar') as string,
			sector: formData.get('sector') as string,
			size: formData.get('size') as string,
			geographic_scope: formData.get('geographic_scope') as string,
			maturity_level: formData.get('maturity_level') as string,
			notes: formData.get('notes') as string,
			regulatory_obligations: JSON.parse(
				(formData.get('regulatory_obligations') as string) || '[]'
			)
		};

		const res = await fetch(`${BASE_API_URL}/organization-contexts/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			console.error('Failed to create organization context:', errorData);
			return fail(res.status, { error: errorData });
		}

		return { success: true };
	},

	delete: async ({ request, fetch }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		const res = await fetch(`${BASE_API_URL}/organization-contexts/${id}/`, {
			method: 'DELETE'
		});

		if (!res.ok) {
			return fail(res.status, { error: 'Failed to delete' });
		}

		return { deleted: true };
	}
};
