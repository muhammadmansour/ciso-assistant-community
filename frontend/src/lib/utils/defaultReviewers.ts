import { browser } from '$app/environment';

const STORAGE_KEY = 'ciso-assistant-default-reviewers-compliance-assessments';

export function getDefaultReviewers(): string[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
	} catch {
		return [];
	}
}

export function setDefaultReviewers(reviewerIds: string[]): void {
	if (!browser) return;
	const unique = [...new Set(reviewerIds.filter(Boolean))];
	if (!unique.length) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
}
