type SidebarBackendKeys = {
	xrays: boolean;
	incidents: boolean;
	tasks: boolean;
	risk_acceptances: boolean;
	exceptions: boolean;
	follow_up: boolean;
	ebiosrm: boolean;
	scoring_assistant: boolean;
	vulnerabilities: boolean;
	compliance: boolean;
	tprm: boolean;
	privacy: boolean;
	experimental: boolean;
	organisation_objectives: boolean;
	organisation_issues: boolean;
	quantitative_risk_studies: boolean;
	terminologies: boolean;
	bia: boolean;
	project_management: boolean;
	document_management: boolean;
	policy_documents: boolean;
	contracts: boolean;
	reports: boolean;
	validation_flows: boolean;
	metrology: boolean;
};

type SidebarFrontendKeys = {
	xRays: boolean;
	incidents: boolean;
	tasks: boolean;
	riskAcceptances: boolean;
	securityExceptions: boolean;
	followUp: boolean;
	ebiosRM: boolean;
	scoringAssistant: boolean;
	vulnerabilities: boolean;
	compliance: boolean;
	thirdPartyCategory: boolean;
	privacy: boolean;
	experimental: boolean;
	organisationObjectives: boolean;
	organisationIssues: boolean;
	quantitativeRiskStudies: boolean;
	terminologies: boolean;
	businessImpactAnalysis: boolean;
	projectManagement: boolean;
	documents: boolean;
	documentTemplates: boolean;
	objectClassifications: boolean;
	contracts: boolean;
	reports: boolean;
	validationFlows: boolean;
	metrology: boolean;
};

export function getSidebarVisibleItems(
	featureFlags: Partial<SidebarBackendKeys>
): SidebarFrontendKeys {
	return {
		xRays: featureFlags?.xrays ?? false,
		incidents: featureFlags?.incidents ?? false,
		tasks: featureFlags?.tasks ?? false,
		riskAcceptances: featureFlags?.risk_acceptances ?? false,
		securityExceptions: true,
		followUp: true,
		ebiosRM: featureFlags?.ebiosrm ?? false,
		scoringAssistant: featureFlags?.scoring_assistant ?? false,
		vulnerabilities: featureFlags?.vulnerabilities ?? false,
		compliance: featureFlags?.compliance ?? false,
		thirdPartyCategory: featureFlags?.tprm ?? false,
		privacy: featureFlags?.privacy ?? false,
		experimental: featureFlags?.experimental ?? false,
		organisationObjectives: featureFlags?.organisation_objectives ?? true,
		organisationIssues: featureFlags?.organisation_issues ?? false,
		quantitativeRiskStudies: featureFlags?.quantitative_risk_studies ?? false,
		terminologies: featureFlags?.terminologies ?? true,
		businessImpactAnalysis: featureFlags?.bia ?? true,
		projectManagement: featureFlags?.project_management ?? true,
		documents: featureFlags?.document_management ?? true,
		documentTemplates: featureFlags?.document_management ?? true,
		objectClassifications: featureFlags?.document_management ?? true,
		contracts: featureFlags?.contracts ?? false,
		reports: featureFlags?.reports ?? true,
		validationFlows: true,
		metrology: featureFlags?.metrology ?? true
	};
}
