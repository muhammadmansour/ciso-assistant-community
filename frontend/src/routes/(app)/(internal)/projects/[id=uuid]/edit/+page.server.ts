import { defaultWriteFormAction } from '$lib/utils/actions';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return defaultWriteFormAction({ event, urlModel: 'projects', action: 'edit' });
	}
};
