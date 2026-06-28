import { getModelInfo } from '$lib/utils/crud';

import { loadDetail } from '$lib/utils/load';
import type { PageServerLoad } from './$types';

function buildMultiParamEndpoint(
	basePath: string,
	param: string,
	ids: string[]
): string | null {
	if (!ids.length) return null;
	return `/${basePath}?${ids.map((id) => `${param}=${id}`).join('&')}`;
}

function collectIds(items: { id: string }[] | undefined): string[] {
	return (items ?? []).map((item) => item.id);
}

export const load: PageServerLoad = async (event) => {
	const modelInfo = getModelInfo('task-templates');

	const data = await loadDetail({
		event,
		model: modelInfo,
		id: event.params.id
	});

	const riskAssessmentIds = collectIds(data.data.risk_assessments);
	const findingsAssessmentIds = collectIds(data.data.findings_assessment);
	const appliedControlIds = collectIds(data.data.applied_controls);

	const riskScenariosEndpoint =
		buildMultiParamEndpoint('risk-scenarios', 'risk_assessment', riskAssessmentIds) ??
		buildMultiParamEndpoint('risk-scenarios', 'applied_controls', appliedControlIds);

	const findingsEndpoint =
		buildMultiParamEndpoint('findings', 'findings_assessment', findingsAssessmentIds) ??
		buildMultiParamEndpoint('findings', 'applied_controls', appliedControlIds);

	return {
		...data,
		showOccurrencesTab: data.data.is_recurrent,
		riskScenariosEndpoint,
		findingsEndpoint
	};
};
