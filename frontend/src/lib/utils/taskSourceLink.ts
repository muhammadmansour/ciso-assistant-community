import { m } from '$paraglide/messages';
import { safeTranslate } from '$lib/utils/i18n';

type RelatedObject = { id?: string; str?: string; name?: string };

export function getTaskSourceLink(
	taskData: Record<string, unknown> | null | undefined,
	source: string | null | undefined
): { href: string; label: string } | null {
	if (!taskData || !source) return null;

	const objectId = taskData.source_object_id as string | undefined;

	const pickRelated = (items: RelatedObject[] | undefined, id?: string): RelatedObject | undefined => {
		if (!items?.length) return undefined;
		if (id) {
			return items.find((item) => item.id === id) ?? items[0];
		}
		return items[0];
	};

	switch (source) {
		case 'evidence': {
			const evidence = pickRelated(taskData.evidences as RelatedObject[] | undefined, objectId);
			const id = evidence?.id ?? objectId;
			if (!id) return null;
			return {
				href: `/evidences/${id}`,
				label: evidence?.str || evidence?.name || m.evidence()
			};
		}
		case 'control': {
			const control = pickRelated(
				taskData.applied_controls as RelatedObject[] | undefined,
				objectId
			);
			const id = control?.id ?? objectId;
			if (!id) return null;
			return {
				href: `/applied-controls/${id}`,
				label: control?.str || control?.name || m.appliedControl()
			};
		}
		case 'requirement': {
			const id = objectId;
			if (!id) return null;
			return {
				href: `/requirement-assessments/${id}/edit`,
				label: m.requirement()
			};
		}
		default:
			return null;
	}
}

export function getTaskSourceFallbackLabel(source: string): string {
	return safeTranslate(source);
}
