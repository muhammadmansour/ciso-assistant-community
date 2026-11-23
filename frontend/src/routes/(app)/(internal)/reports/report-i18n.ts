import { getLocale } from '$paraglide/runtime';
import { safeTranslate } from '$lib/utils/i18n';

/**
 * Backend labels arrive in English; their raw keys (status, severity, treatment…) carry the
 * translation. Keys without a message fall back to the backend label.
 */
export function label(key: string | null | undefined, fallback = '—'): string {
	if (!key) return fallback;
	if (key === '--') key = 'undefined';
	const translated = safeTranslate(key);
	return translated && translated !== key ? translated : fallback || key;
}

export function formatGenerated(iso: string | undefined, fallback: string): string {
	if (!iso) return fallback;
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return fallback;
	return new Intl.DateTimeFormat(getLocale(), { dateStyle: 'medium', timeStyle: 'short' }).format(
		date
	);
}

export function isEnglish(): boolean {
	return getLocale() === 'en';
}
