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
	if (!iso) return num(fallback);
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return num(fallback);
	const locale = arabicDigits() ? `${getLocale()}-u-nu-arab` : getLocale();
	return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function isEnglish(): boolean {
	return getLocale() === 'en';
}

const ARABIC_INDIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const ARABIC_COMPACT_UNITS: Record<string, string> = { k: 'ألف', M: 'مليون', B: 'مليار' };

/** Reports show figures in Arabic-Indic digits when the interface is Arabic. */
export function arabicDigits(): boolean {
	return getLocale() === 'ar';
}

/**
 * A report figure in the reader's digits. Only for values the report computes: reference IDs,
 * formulas and user-entered names keep their Western digits. In Arabic a leading currency
 * symbol moves after the amount ("٣٤٥ ⃁"), so render amounts with numDir().
 */
export function num(value: unknown, fallback = '—'): string {
	if (value === null || value === undefined || value === '') return fallback;
	let text = String(value);
	if (!arabicDigits()) return text;
	const amount = /^([^\s0-9]+) ([0-9].*)$/.exec(text);
	if (amount) text = `${amount[2]} ${amount[1]}`;
	return text
		.replace(/(\d)([kMB])\b/g, (_, digit, unit) => `${digit} ${ARABIC_COMPACT_UNITS[unit]}`)
		.replace(/(\d)\.(?=\d)/g, '$1٫')
		.replace(/(\d),(?=\d)/g, '$1٬')
		.replace(/(\d)%/g, '$1٪')
		.replace(/\d/g, (digit) => ARABIC_INDIC_DIGITS[Number(digit)]);
}

/**
 * Arabic-Indic digits are right-to-left under the bidi algorithm, so "a → b" spans flip to
 * right-to-left with a left-pointing arrow; inside a left-to-right span they would render reversed.
 */
export function numDir(): 'ltr' | 'rtl' {
	return arabicDigits() ? 'rtl' : 'ltr';
}

export function numArrow(): string {
	return arabicDigits() ? '←' : '→';
}

/** Between two figures; the Arabic-Indic zero (٠) is a dot, so a middle dot would blur into it. */
export function numSeparator(): string {
	return arabicDigits() ? '|' : '·';
}
