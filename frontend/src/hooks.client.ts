import { page } from '$app/state';
import { defineCustomClientStrategy } from '$paraglide/runtime';

// Lazily load DEFAULT_LANGUAGE to avoid $env/dynamic/public initialization
// errors during early client bootstrap (especially in private/incognito mode
// where the SvelteKit env injection script may not have run yet)
let defaultLanguage = 'en';
import('$lib/utils/constants')
	.then((mod) => {
		defaultLanguage = mod.DEFAULT_LANGUAGE;
	})
	.catch(() => {});

defineCustomClientStrategy('custom-userPreference', {
	getLocale: () => 'en',
	setLocale: async () => {}
});

defineCustomClientStrategy('custom-fallback', {
	getLocale: () => 'en',
	setLocale: async () => {}
});
