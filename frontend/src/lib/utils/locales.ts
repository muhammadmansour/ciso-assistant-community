import * as m from '../../paraglide/messages';

export const LOCALE_MAP = {
	en: {
		name: 'english',
		flag: '🇬🇧'
	}
};

export const language: any = {
	english: m.english()
};

export const defaultLangLabels = {
	en: 'English'
};

export function toCamelCase(str: string) {
	if (typeof str !== 'string') return str;
	str = str.charAt(0).toLowerCase() + str.slice(1);
	return str.replace(/[_-\s]\w/g, (match) => match.charAt(1).toUpperCase());
}
