/** Unicode 17 Saudi Riyal sign; rendered by the bundled Saudi Riyal font until platforms ship it. */
export const SAUDI_RIYAL_SIGN = '\u20C1';

/** Stored currencies are display symbols ('€', '$'…), except Saudi Riyal, stored as its code. */
export function currencySymbol(currency: string | null | undefined): string {
	if (!currency) return '';
	return currency === 'SAR' ? SAUDI_RIYAL_SIGN : currency;
}

/** ECharts draws text with its own font, so charts must name the riyal font explicitly. */
export const CHART_FONT_FAMILY = "'Saudi Riyal', 'Cairo', sans-serif";
