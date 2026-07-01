import { _ as daysofweekerrormessage4, $ as weeksofmontherrormessage4, a0 as timestampcannotbeinthefuture5 } from './_index-BQcvYRD4.js';
import { o as objectType, c as arrayType, s as stringType, i as instanceOfType, n as numberType, d as booleanType, e as enumType, f as coerce, p as preprocessType, u as unionType, l as literalType, g as lazyType, r as recordType, h as anyType, j as nullType } from './string-BMZjP7XX.js';

const toArrayPreprocessor = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  switch (typeof value) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
      return [value];
    default:
      return value;
  }
};
const literalSchema = unionType([stringType(), numberType(), booleanType(), nullType()]);
const jsonSchema = lazyType(
  () => unionType([literalSchema, arrayType(jsonSchema), recordType(jsonSchema)])
);
const quickStartSchema = objectType({
  folder: stringType().uuid().optional(),
  audit_name: stringType().nonempty(),
  framework: stringType().url(),
  create_risk_assessment: booleanType().default(true),
  risk_matrix: stringType().url().optional(),
  risk_assessment_name: stringType().optional()
});
const loginSchema = objectType({
  username: stringType({
    required_error: "Email is required"
  }).email(),
  password: stringType({
    required_error: "Password is required"
  })
}).required();
const emailSchema = objectType({
  email: stringType({
    required_error: "Email is required"
  })
}).required();
const nameSchema = stringType({
  required_error: "Name is required"
}).min(1);
const descriptionSchema = stringType().optional().nullable();
const NameDescriptionMixin = {
  name: nameSchema,
  description: descriptionSchema
};
const FolderSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional(),
  parent_folder: stringType(),
  filtering_labels: arrayType(stringType()).optional()
});
const FolderImportSchema = objectType({
  name: nameSchema,
  file: instanceOfType(File),
  load_missing_libraries: coerce.boolean().default(false)
  //NOTE: coerce is used to handle checkbox form values which can be strings ('true'/'false')
  //or booleans (true/false). Without coerce, form validation fails inconsistently.
});
const PerimeterSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  lc_status: stringType().optional().default("in_design"),
  default_assignee: arrayType(stringType().optional()).optional()
});
const RiskMatrixSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  json_definition: stringType(),
  is_enabled: booleanType()
});
const LibraryUploadSchema = objectType({
  file: instanceOfType(File).optional()
});
const RiskAssessmentSchema = objectType({
  ...NameDescriptionMixin,
  version: stringType().optional().default("1.0"),
  perimeter: stringType(),
  status: stringType().optional().nullable(),
  ref_id: stringType().optional(),
  risk_matrix: stringType(),
  risk_tolerance: numberType().optional().default(-1),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  authors: arrayType(stringType().optional()).optional(),
  reviewers: arrayType(stringType().optional()).optional(),
  observation: stringType().optional().nullable(),
  ebios_rm_study: stringType().uuid().optional(),
  is_locked: booleanType().optional().default(false)
});
const ThreatSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  provider: stringType().optional().nullable(),
  ref_id: stringType().optional(),
  annotation: stringType().optional().nullable(),
  filtering_labels: stringType().optional().array().optional()
});
const RiskScenarioSchema = objectType({
  ...NameDescriptionMixin,
  applied_controls: stringType().uuid().optional().array().optional(),
  existing_applied_controls: stringType().uuid().optional().array().optional(),
  inherent_proba: numberType().optional(),
  inherent_impact: numberType().optional(),
  current_proba: numberType().optional(),
  current_impact: numberType().optional(),
  residual_proba: numberType().optional(),
  residual_impact: numberType().optional(),
  treatment: stringType().optional(),
  qualifications: stringType().uuid().optional().array().optional(),
  strength_of_knowledge: numberType().default(-1).optional(),
  justification: stringType().optional().nullable(),
  risk_assessment: stringType(),
  threats: stringType().uuid().optional().array().optional(),
  assets: stringType().uuid().optional().array().optional(),
  vulnerabilities: stringType().uuid().optional().array().optional(),
  owner: stringType().uuid().optional().array().optional(),
  security_exceptions: stringType().uuid().optional().array().optional(),
  risk_origin: stringType().uuid().optional().nullable(),
  antecedent_scenarios: stringType().uuid().optional().array().optional(),
  filtering_labels: stringType().optional().array().optional(),
  ref_id: stringType().max(100).optional()
});
const AppliedControlSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional(),
  category: stringType().optional().nullable(),
  csf_function: stringType().optional().nullable(),
  priority: numberType().optional().nullable(),
  status: stringType().optional().default("--"),
  evidences: stringType().optional().array().optional(),
  objectives: stringType().optional().array().optional(),
  requirement_assessments: stringType().optional().array().optional(),
  assets: stringType().optional().array().optional(),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  start_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  expiry_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Link must be either empty or a valid URL starting with 'http'"
  }).optional(),
  effort: stringType().optional().nullable(),
  control_impact: numberType().optional().nullable(),
  cost: objectType({
    currency: enumType(["€", "$", "£", "¥", "C$", "A$", "NZ$", "CHF"]).default("€"),
    amortization_period: numberType().min(1).max(50).default(1),
    build: objectType({
      fixed_cost: numberType().min(0).default(0),
      people_days: numberType().min(0).default(0)
    }).default({ fixed_cost: 0, people_days: 0 }),
    run: objectType({
      fixed_cost: numberType().min(0).default(0),
      people_days: numberType().min(0).default(0)
    }).default({ fixed_cost: 0, people_days: 0 })
  }).optional(),
  folder: stringType(),
  reference_control: stringType().optional().nullable(),
  owner: stringType().uuid().optional().array().optional(),
  security_exceptions: stringType().uuid().optional().array().optional(),
  stakeholders: stringType().uuid().optional().array().optional(),
  progress_field: numberType().optional().default(0),
  filtering_labels: stringType().optional().array().optional(),
  findings: stringType().uuid().optional().array().optional(),
  observation: stringType().optional().nullable(),
  integration_config: stringType().optional().nullable(),
  remote_object_id: stringType().optional().nullable(),
  create_remote_object: booleanType().optional().default(false)
});
const AppliedControlDuplicateSchema = objectType({
  ...AppliedControlSchema.shape,
  duplicate_evidences: booleanType()
});
const PolicySchema = AppliedControlSchema.omit({ category: true });
const RiskAcceptanceSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  expiry_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  justification: stringType().optional().nullable(),
  approver: stringType().optional().nullable(),
  risk_scenarios: arrayType(stringType())
});
const ValidationFlowSchema = objectType({
  folder: stringType(),
  ref_id: stringType().optional(),
  status: stringType().default("submitted"),
  validation_deadline: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  request_notes: stringType().optional().nullable(),
  approver: stringType(),
  filtering_labels: arrayType(stringType().uuid().optional()).optional(),
  compliance_assessments: arrayType(stringType()).optional(),
  risk_assessments: arrayType(stringType()).optional(),
  business_impact_analysis: arrayType(stringType()).optional(),
  crq_studies: arrayType(stringType()).optional(),
  ebios_studies: arrayType(stringType()).optional(),
  entity_assessments: arrayType(stringType()).optional(),
  findings_assessments: arrayType(stringType()).optional(),
  evidences: arrayType(stringType()).optional(),
  security_exceptions: arrayType(stringType()).optional(),
  policies: arrayType(stringType()).optional()
});
const ReferenceControlSchema = objectType({
  ...NameDescriptionMixin,
  provider: stringType().optional().nullable(),
  category: stringType().optional().nullable(),
  csf_function: stringType().optional().nullable(),
  folder: stringType(),
  ref_id: stringType().optional(),
  annotation: stringType().optional().nullable(),
  filtering_labels: stringType().optional().array().optional()
});
const AssetSchema = objectType({
  ...NameDescriptionMixin,
  type: stringType().default("PR"),
  folder: stringType(),
  asset_class: stringType().optional(),
  parent_assets: stringType().optional().array().optional(),
  support_assets: stringType().optional().array().optional(),
  security_objectives: objectType({
    objectives: recordType(
      stringType(),
      objectType({
        value: numberType().nonnegative().optional(),
        is_enabled: booleanType().default(false)
      })
    ).optional()
  }).optional(),
  disaster_recovery_objectives: objectType({
    objectives: recordType(
      stringType(),
      objectType({
        value: numberType().nonnegative().optional()
      })
    ).optional()
  }).optional(),
  security_capabilities: objectType({
    objectives: recordType(
      stringType(),
      objectType({
        value: numberType().nonnegative().optional(),
        is_enabled: booleanType().default(false)
      })
    ).optional()
  }).optional(),
  recovery_capabilities: objectType({
    objectives: recordType(
      stringType(),
      objectType({
        value: numberType().nonnegative().optional()
      })
    ).optional()
  }).optional(),
  reference_link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Link must be either empty or a valid URL starting with 'http'"
  }).optional(),
  owner: stringType().uuid().optional().array().optional(),
  filtering_labels: stringType().optional().array().optional(),
  ebios_rm_studies: stringType().uuid().optional().array().optional(),
  security_exceptions: stringType().uuid().optional().array().optional(),
  ref_id: stringType().max(100).optional(),
  observation: stringType().optional().nullable(),
  overridden_children_capabilities: stringType().uuid().optional().array().optional(),
  solutions: stringType().uuid().optional().array().optional(),
  applied_controls: stringType().uuid().optional().array().optional(),
  is_business_function: booleanType().default(false),
  dora_licenced_activity: stringType().optional().nullable(),
  dora_criticality_assessment: stringType().default("eba_BT:x21"),
  dora_criticality_justification: stringType().optional().nullable(),
  dora_discontinuing_impact: stringType().default("eba_ZZ:x799")
});
const FilteringLabelSchema = objectType({
  label: stringType()
});
const RequirementAssessmentSchema = objectType({
  answers: jsonSchema,
  status: stringType(),
  result: stringType(),
  extended_result: stringType().optional().nullable(),
  is_scored: booleanType().optional(),
  score: numberType().optional().nullable(),
  documentation_score: numberType().optional().nullable(),
  comment: stringType().optional().nullable(),
  folder: stringType(),
  evidences: arrayType(stringType().uuid().optional()).optional(),
  compliance_assessment: stringType(),
  applied_controls: arrayType(stringType().uuid().optional()).optional(),
  observation: stringType().optional().nullable(),
  security_exceptions: stringType().uuid().optional().array().optional(),
  noRedirect: booleanType().default(false)
});
const UserEditSchema = objectType({
  email: stringType().email(),
  first_name: stringType().optional(),
  last_name: stringType().optional(),
  is_active: booleanType().optional(),
  keep_local_login: booleanType().optional(),
  user_groups: arrayType(stringType().uuid().optional()).optional(),
  observation: stringType().optional().nullable(),
  expiry_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish().refine(
    (val) => {
      if (!val) return true;
      const expiryDate = new Date(val);
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      return expiryDate >= today;
    },
    {
      message: "Expiry date cannot be in the past"
    }
  )
});
const UserCreateSchema = objectType({
  email: stringType().email(),
  first_name: stringType().optional(),
  last_name: stringType().optional(),
  user_groups: arrayType(stringType().uuid().optional()).optional(),
  observation: stringType().optional().nullable(),
  expiry_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish().refine(
    (val) => {
      if (!val) return true;
      const expiryDate = new Date(val);
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      return expiryDate >= today;
    },
    {
      message: "Expiry date cannot be in the past"
    }
  )
});
const ChangePasswordSchema = objectType({
  old_password: stringType(),
  new_password: stringType(),
  confirm_new_password: stringType()
});
const ResetPasswordSchema = objectType({
  // Filled from URL + hidden fields; may be empty in POST body until resolved in the action
  uidb64: stringType().optional().default(""),
  token: stringType().optional().default(""),
  new_password: stringType(),
  confirm_new_password: stringType()
});
const SetPasswordSchema = objectType({
  user: stringType(),
  new_password: stringType(),
  confirm_new_password: stringType()
});
const ComplianceAssessmentSchema = objectType({
  ...NameDescriptionMixin,
  version: stringType().optional().default("1.0"),
  ref_id: stringType().optional(),
  perimeter: stringType(),
  status: stringType().optional().nullable(),
  selected_implementation_groups: arrayType(stringType().optional()).optional(),
  framework: stringType(),
  show_documentation_score: booleanType().optional().default(false),
  extended_result_enabled: booleanType().optional().default(false),
  progress_status_enabled: booleanType().optional().default(true),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  authors: arrayType(stringType().optional()).optional(),
  reviewers: arrayType(stringType().optional()).optional(),
  baseline: stringType().optional().nullable(),
  create_applied_controls_from_suggestions: booleanType().optional().default(false),
  observation: stringType().optional().nullable(),
  ebios_rm_studies: stringType().uuid().optional().array().optional(),
  assets: stringType().uuid().optional().array().optional(),
  evidences: stringType().uuid().optional().array().optional(),
  is_locked: booleanType().optional().default(false)
});
const CampaignSchema = objectType({
  ...NameDescriptionMixin,
  frameworks: arrayType(stringType()),
  selected_implementation_groups: arrayType(objectType({ value: stringType(), framework: stringType() })).optional(),
  perimeters: arrayType(stringType()),
  status: stringType().optional().nullable(),
  start_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  folder: stringType()
});
const EvidenceSchema = objectType({
  ...NameDescriptionMixin,
  attachment: anyType().optional().nullable(),
  folder: stringType(),
  applied_controls: preprocessType(toArrayPreprocessor, arrayType(stringType().optional())).optional(),
  requirement_assessments: stringType().optional().array().optional(),
  findings: stringType().optional().array().optional(),
  findings_assessments: preprocessType(toArrayPreprocessor, arrayType(stringType().optional())).optional(),
  timeline_entries: stringType().optional().array().optional(),
  contracts: preprocessType(toArrayPreprocessor, arrayType(stringType().optional())).optional(),
  link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Link must be either empty or a valid URL starting with 'http'"
  }).optional(),
  filtering_labels: stringType().optional().array().optional(),
  owner: stringType().optional().array().optional(),
  status: stringType().optional().default("draft"),
  expiry_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish()
});
const EvidenceRevisionSchema = objectType({
  folder: stringType().uuid(),
  evidence: stringType().uuid(),
  task_node: stringType().uuid().nullable(),
  version: numberType().optional(),
  attachment: anyType().optional().nullable(),
  link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Link must be either empty or a valid URL starting with 'http'"
  }).optional(),
  observation: stringType().optional().nullable()
});
const GeneralSettingsSchema = objectType({
  security_objective_scale: stringType(),
  ebios_radar_green_zone_radius: numberType(),
  ebios_radar_yellow_zone_radius: numberType(),
  ebios_radar_red_zone_radius: numberType(),
  notifications_enable_mailing: booleanType().optional(),
  interface_agg_scenario_matrix: booleanType().optional(),
  risk_matrix_swap_axes: booleanType().default(false).optional(),
  risk_matrix_flip_vertical: booleanType().default(false).optional(),
  risk_matrix_labels: enumType(["ISO", "EBIOS"]).default("ISO").optional(),
  currency: enumType(["€", "$", "£", "¥", "C$", "A$", "NZ$", "CHF"]).default("€"),
  daily_rate: numberType().default(500).optional(),
  mapping_max_depth: coerce.number().int().min(2).max(5).default(3).optional(),
  allow_self_validation: booleanType().default(false).optional(),
  show_warning_external_links: booleanType().default(true).optional(),
  allow_assignments_to_entities: booleanType().default(false).optional()
});
const FeatureFlagsSchema = objectType({
  xrays: booleanType().optional(),
  incidents: booleanType().optional(),
  tasks: booleanType().optional(),
  risk_acceptances: booleanType().optional(),
  exceptions: booleanType().optional(),
  follow_up: booleanType().optional(),
  scoring_assistant: booleanType().optional(),
  vulnerabilities: booleanType().optional(),
  compliance: booleanType().optional(),
  tprm: booleanType().optional(),
  ebiosrm: booleanType().optional(),
  privacy: booleanType().optional(),
  experimental: booleanType().optional(),
  inherent_risk: booleanType().optional(),
  organisation_objectives: booleanType().optional(),
  organisation_issues: booleanType().optional(),
  quantitative_risk_studies: booleanType().optional(),
  terminologies: booleanType().optional(),
  bia: booleanType().optional(),
  project_management: booleanType().optional(),
  contracts: booleanType().optional(),
  reports: booleanType().optional(),
  validation_flows: booleanType().optional(),
  outgoing_webhooks: booleanType().optional(),
  metrology: booleanType().optional()
});
const SSOSettingsSchema = objectType({
  is_enabled: booleanType().default(false).optional(),
  force_sso: booleanType().default(false).optional(),
  provider: stringType().default("saml"),
  provider_id: stringType().optional(),
  provider_name: stringType().optional(),
  client_id: stringType(),
  secret: stringType().optional(),
  // SAML specific fields
  attribute_mapping_uid: preprocessType(toArrayPreprocessor, arrayType(stringType().optional())).optional(),
  attribute_mapping_email_verified: preprocessType(toArrayPreprocessor, arrayType(stringType().optional())).optional(),
  attribute_mapping_email: preprocessType(toArrayPreprocessor, arrayType(stringType().optional())).optional(),
  idp_entity_id: stringType().optional(),
  metadata_url: stringType().optional(),
  sso_url: stringType().optional().nullable(),
  slo_url: stringType().optional().nullable(),
  x509cert: stringType().optional(),
  sp_entity_id: stringType().optional(),
  allow_repeat_attribute_name: booleanType().optional().nullable(),
  allow_single_label_domains: booleanType().optional().nullable(),
  authn_request_signed: booleanType().optional().nullable(),
  digest_algorithm: stringType().optional().nullable(),
  logout_request_signed: booleanType().optional().nullable(),
  logout_response_signed: booleanType().optional().nullable(),
  metadata_signed: booleanType().optional().nullable(),
  name_id_encrypted: booleanType().optional().nullable(),
  reject_deprecated_algorithm: booleanType().optional().nullable(),
  reject_idp_initiated_sso: booleanType().optional().nullable(),
  signature_algorithm: stringType().optional().nullable(),
  want_assertion_encrypted: booleanType().optional().nullable(),
  want_assertion_signed: booleanType().optional().nullable(),
  want_attribute_statement: booleanType().optional().nullable(),
  want_message_signed: booleanType().optional().nullable(),
  want_name_id: booleanType().optional().nullable(),
  want_name_id_encrypted: booleanType().optional().nullable(),
  sp_x509cert: stringType().optional(),
  sp_private_key: stringType().optional(),
  server_url: stringType().optional().nullable(),
  token_auth_method: enumType([
    "client_secret_basic",
    "client_secret_post",
    "client_secret_jwt",
    "private_key_jwt",
    "none"
  ]).optional().nullable(),
  oauth_pkce_enabled: booleanType().optional().default(false)
});
const EntitiesSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  is_active: booleanType().optional(),
  parent_entity: stringType().optional().nullable(),
  mission: stringType().optional(),
  reference_link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Link must be either empty or a valid URL starting with 'http'"
  }).optional(),
  relationship: stringType().optional().array().optional(),
  legal_identifiers: recordType(stringType()).optional(),
  country: stringType().nullish(),
  currency: stringType().nullish(),
  dora_entity_type: stringType().nullish(),
  dora_entity_hierarchy: stringType().nullish(),
  dora_assets_value: numberType().optional().nullable(),
  dora_competent_authority: stringType().optional(),
  dora_provider_person_type: stringType().nullish(),
  default_dependency: numberType().optional(),
  default_penetration: numberType().optional(),
  default_maturity: numberType().optional(),
  default_trust: numberType().optional(),
  filtering_labels: arrayType(stringType()).optional()
});
const EntityAssessmentSchema = objectType({
  ...NameDescriptionMixin,
  create_audit: booleanType().optional().default(false),
  framework: stringType().optional(),
  selected_implementation_groups: arrayType(stringType().optional()).optional(),
  version: stringType().optional().default("0.1"),
  perimeter: stringType(),
  status: stringType().optional().nullable(),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  authors: arrayType(stringType().optional()).optional(),
  representatives: arrayType(stringType().optional()).optional(),
  reviewers: arrayType(stringType().optional()).optional(),
  entity: stringType(),
  solutions: arrayType(stringType().optional()).optional(),
  compliance_assessment: stringType().optional(),
  evidence: stringType().optional(),
  criticality: numberType().optional().nullable(),
  conclusion: stringType().optional().nullable(),
  penetration: numberType().optional(),
  dependency: numberType().optional(),
  maturity: numberType().optional(),
  trust: numberType().optional(),
  observation: stringType().optional().nullable()
});
const solutionSchema = objectType({
  ...NameDescriptionMixin,
  provider_entity: stringType(),
  ref_id: stringType().optional(),
  criticality: numberType().optional(),
  owner: stringType().uuid().optional().array().optional(),
  assets: stringType().uuid().optional().array().optional(),
  filtering_labels: stringType().optional().array().optional(),
  dora_ict_service_type: stringType().nullish(),
  storage_of_data: booleanType().optional().default(false),
  data_location_storage: stringType().nullish(),
  data_location_processing: stringType().nullish(),
  dora_data_sensitiveness: stringType().nullish(),
  dora_reliance_level: stringType().nullish(),
  dora_substitutability: stringType().nullish(),
  dora_non_substitutability_reason: stringType().nullish(),
  dora_has_exit_plan: stringType().nullish(),
  dora_reintegration_possibility: stringType().nullish(),
  dora_discontinuing_impact: stringType().nullish(),
  dora_alternative_providers_identified: stringType().nullish(),
  dora_alternative_providers: stringType().optional()
});
const representativeSchema = objectType({
  create_user: booleanType().optional().default(false),
  email: stringType().email(),
  entity: stringType(),
  first_name: stringType().optional(),
  last_name: stringType().optional(),
  phone: stringType().optional(),
  role: stringType().optional(),
  description: stringType().optional()
});
const contractSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  filtering_labels: arrayType(stringType()).optional(),
  owner: arrayType(stringType().optional()).optional(),
  provider_entity: stringType().optional(),
  beneficiary_entity: stringType().optional(),
  evidences: arrayType(stringType().optional()).optional(),
  solutions: arrayType(stringType().optional()).optional(),
  status: stringType().optional().default("draft"),
  start_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  end_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  ref_id: stringType().optional(),
  dora_contractual_arrangement: stringType().default("eba_CO:x1"),
  currency: stringType().optional(),
  annual_expense: numberType().optional().nullable(),
  termination_reason: stringType().optional(),
  is_intragroup: booleanType().optional().default(false),
  overarching_contract: stringType().optional().nullable(),
  governing_law_country: stringType().optional(),
  notice_period_entity: numberType().optional().nullable(),
  notice_period_provider: numberType().optional().nullable()
});
const vulnerabilitySchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional().default(""),
  status: stringType().default("--"),
  severity: numberType().default(-1).optional(),
  assets: stringType().uuid().optional().array().optional(),
  applied_controls: stringType().uuid().optional().array().optional(),
  security_exceptions: stringType().uuid().optional().array().optional(),
  filtering_labels: stringType().optional().array().optional()
});
const BusinessImpactAnalysisSchema = objectType({
  ...NameDescriptionMixin,
  version: stringType().optional().default("0.1"),
  perimeter: stringType(),
  status: stringType().optional().nullable(),
  ref_id: stringType().optional(),
  risk_matrix: stringType(),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  authors: arrayType(stringType().optional()).optional(),
  reviewers: arrayType(stringType().optional()).optional(),
  is_locked: booleanType().optional().default(false)
});
const AssetAssessmentSchema = objectType({
  bia: stringType(),
  asset: stringType(),
  associated_controls: arrayType(stringType().optional()).optional(),
  dependencies: arrayType(stringType().optional()).optional(),
  recovery_documented: booleanType().default(false),
  recovery_tested: booleanType().default(false),
  recovery_targets_met: booleanType().default(false),
  evidences: arrayType(stringType().optional()).optional(),
  observation: stringType().optional()
});
const EscalationThresholdSchema = objectType({
  asset_assessment: stringType(),
  point_in_time: numberType(),
  qualifications: stringType().uuid().optional().array().optional(),
  quanti_impact_unit: stringType().optional().default("currency"),
  quali_impact: numberType().optional().default(-1),
  quanti_impact: numberType().optional(),
  justification: stringType().optional()
});
const processingSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional().default(""),
  filtering_labels: stringType().optional().array().optional(),
  status: stringType().optional(),
  dpia_required: booleanType().optional(),
  dpia_reference: stringType().optional(),
  has_sensitive_personal_data: booleanType().optional(),
  nature: stringType().optional().array().optional(),
  associated_controls: arrayType(stringType().optional()).optional(),
  evidences: stringType().optional().array().optional(),
  assigned_to: stringType().uuid().optional().array().optional()
});
const rightRequestSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional().default(""),
  owner: stringType().uuid().optional().array().optional(),
  requested_on: stringType().min(1).default(() => (/* @__PURE__ */ new Date()).toISOString().split("T")[0]),
  due_date: stringType().optional(),
  request_type: stringType(),
  status: stringType(),
  observation: stringType().optional(),
  processings: arrayType(stringType()).optional().default([])
});
const dataBreachSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional().default(""),
  assigned_to: stringType().uuid().optional().array().optional(),
  discovered_on: stringType().min(1).default(() => (/* @__PURE__ */ new Date()).toISOString()),
  breach_type: stringType(),
  risk_level: stringType(),
  status: stringType(),
  affected_subjects_count: numberType().optional().default(0),
  affected_processings: arrayType(stringType()).optional().default([]),
  affected_personal_data: arrayType(stringType()).optional().default([]),
  affected_personal_data_count: numberType().optional().default(0),
  authorities: arrayType(stringType()).optional().default([]),
  authority_notified_on: stringType().optional(),
  authority_notification_ref: stringType().optional(),
  subjects_notified_on: stringType().optional(),
  potential_consequences: stringType().optional(),
  remediation_measures: arrayType(stringType()).optional().default([]),
  incident: stringType().optional(),
  reference_link: stringType().url().optional().or(literalType("")),
  observation: stringType().optional()
});
const purposeSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional().default(""),
  legal_basis: stringType(),
  processing: stringType()
});
const dataSubjectSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional().default(""),
  category: stringType(),
  processing: stringType()
});
const dataRecipientSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional().default(""),
  category: stringType(),
  processing: stringType()
});
const dataContractorSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional().default(""),
  relationship_type: stringType(),
  country: stringType(),
  documentation_link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Link must be either empty or a valid URL starting with 'http'"
  }).optional(),
  processing: stringType(),
  entity: stringType().optional()
});
const dataTransferSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional().default(""),
  country: stringType(),
  documentation_link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Link must be either empty or a valid URL starting with 'http'"
  }).optional(),
  legal_basis: stringType(),
  guarantees: stringType().optional(),
  processing: stringType(),
  entity: stringType().optional()
});
const personalDataSchema = objectType({
  ...NameDescriptionMixin,
  category: stringType(),
  retention: stringType(),
  deletion_policy: stringType(),
  is_sensitive: booleanType().optional(),
  processing: stringType(),
  assets: stringType().uuid().optional().array().optional()
});
const organisationObjectiveSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional().default(""),
  folder: stringType(),
  status: stringType().optional().default("draft"),
  health: stringType().optional(),
  assigned_to: stringType().optional().array().optional(),
  issues: stringType().uuid().optional().array().optional(),
  assets: stringType().uuid().optional().array().optional(),
  tasks: stringType().uuid().optional().array().optional(),
  metrics: stringType().uuid().optional().array().optional(),
  observation: stringType().optional().nullable(),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish()
});
const organisationIssueSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional().default(""),
  observation: stringType().optional().nullable(),
  category: stringType().optional(),
  origin: stringType().optional(),
  assets: stringType().uuid().optional().array().optional()
});
const quantitativeRiskStudySchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional(),
  status: stringType().optional().nullable(),
  distribution_model: stringType().optional().default("lognormal_ci90"),
  authors: arrayType(stringType().optional()).optional(),
  reviewers: arrayType(stringType().optional()).optional(),
  observation: stringType().optional().nullable(),
  risk_tolerance: objectType({
    points: objectType({
      point1: objectType({
        probability: numberType().min(0.01).max(0.99).optional(),
        acceptable_loss: numberType().min(1).optional()
      }).default({ probability: 0.99 }).optional(),
      point2: objectType({
        probability: numberType().min(0.01).max(0.99).optional(),
        acceptable_loss: numberType().min(1).optional()
      }).optional()
    }).optional(),
    curve_data: objectType({
      loss_values: arrayType(numberType()).optional(),
      probability_values: arrayType(numberType()).optional()
    }).optional()
  }).optional(),
  // .default({
  // 	points: { point1: { probability: 0.99, acceptable_loss: 1 }, point2: { probability: 0.01 } }
  // }),
  loss_threshold: numberType().optional().nullable(),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  folder: stringType()
});
const quantitativeRiskScenarioSchema = objectType({
  ...NameDescriptionMixin,
  quantitative_risk_study: stringType().uuid(),
  assets: stringType().uuid().optional().array().optional(),
  owner: stringType().uuid().optional().array().optional(),
  priority: numberType().optional().nullable(),
  status: stringType().optional().default("draft"),
  vulnerabilities: stringType().uuid().optional().array().optional(),
  threats: stringType().uuid().optional().array().optional(),
  qualifications: stringType().uuid().optional().array().optional(),
  observation: stringType().optional().nullable(),
  is_selected: booleanType().default(true),
  ref_id: stringType().optional()
});
const quantitativeRiskHypothesisSchema = objectType({
  ...NameDescriptionMixin,
  quantitative_risk_scenario: stringType().uuid(),
  existing_applied_controls: stringType().uuid().optional().array().optional(),
  added_applied_controls: stringType().uuid().optional().array().optional(),
  removed_applied_controls: stringType().uuid().optional().array().optional(),
  risk_stage: stringType().optional().default("residual"),
  ref_id: stringType().optional(),
  is_selected: booleanType().default(true),
  probability: coerce.number().min(0).max(1).optional(),
  impact: objectType({
    distribution: stringType().default("LOGNORMAL-CI90"),
    lb: coerce.number().min(0).optional(),
    ub: coerce.number().min(0).optional()
  }).optional(),
  observation: stringType().optional().nullable(),
  filtering_labels: stringType().optional().array().optional()
});
const ebiosRMSchema = objectType({
  ...NameDescriptionMixin,
  version: stringType().optional().default("0.1"),
  quotation_method: stringType().optional().default("express"),
  ref_id: stringType().optional().default(""),
  risk_matrix: stringType(),
  authors: arrayType(stringType().optional()).optional(),
  reviewers: arrayType(stringType().optional()).optional(),
  observation: stringType().optional().nullable(),
  assets: stringType().uuid().optional().array().optional(),
  folder: stringType(),
  compliance_assessments: stringType().uuid().optional().array().optional(),
  reference_entity: stringType().optional()
});
const fearedEventsSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional(),
  gravity: numberType().optional().default(-1),
  is_selected: booleanType().default(true),
  justification: stringType().optional(),
  ebios_rm_study: stringType(),
  folder: stringType(),
  assets: stringType().uuid().optional().array().optional(),
  qualifications: stringType().uuid().optional().array().optional()
});
const roToSchema = objectType({
  ebios_rm_study: stringType(),
  folder: stringType(),
  feared_events: stringType().uuid().optional().array().optional(),
  risk_origin: stringType(),
  target_objective: stringType(),
  motivation: numberType().default(0).optional(),
  resources: numberType().default(0).optional(),
  activity: numberType().min(0).max(4).optional().default(0),
  is_selected: booleanType().default(true),
  justification: stringType().optional()
});
const StakeholderSchema = objectType({
  ebios_rm_study: stringType(),
  applied_controls: stringType().uuid().optional().array().optional(),
  category: stringType(),
  entity: stringType(),
  current_dependency: numberType().min(0).max(4).default(0).optional(),
  current_penetration: numberType().min(0).max(4).default(0).optional(),
  current_maturity: numberType().min(1).max(4).default(1).optional(),
  current_trust: numberType().min(1).max(4).default(1).optional(),
  current_criticality: numberType().min(0).max(16).default(0).optional(),
  residual_dependency: numberType().min(0).max(4).default(0).optional(),
  residual_penetration: numberType().min(0).max(4).default(0).optional(),
  residual_maturity: numberType().min(1).max(4).default(1).optional(),
  residual_trust: numberType().min(1).max(4).default(1).optional(),
  residual_criticality: numberType().min(0).max(16).default(0).optional(),
  is_selected: booleanType().default(true),
  justification: stringType().optional(),
  folder: stringType()
});
const StrategicScenarioSchema = objectType({
  ...NameDescriptionMixin,
  ebios_rm_study: stringType(),
  ro_to_couple: stringType().uuid(),
  focused_feared_event: stringType().uuid().nullable().optional(),
  ref_id: stringType().optional(),
  folder: stringType()
});
const AttackPathSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional(),
  ebios_rm_study: stringType(),
  strategic_scenario: stringType().uuid(),
  stakeholders: stringType().uuid().optional().array().optional(),
  is_selected: booleanType().default(true),
  justification: stringType().optional(),
  folder: stringType()
});
const operationalScenarioSchema = objectType({
  ebios_rm_study: stringType(),
  attack_path: stringType().uuid(),
  threats: stringType().uuid().optional().array().optional(),
  operating_modes_description: stringType().optional(),
  likelihood: numberType().optional().default(-1),
  is_selected: booleanType().default(true),
  justification: stringType().optional(),
  folder: stringType(),
  strategic_scenario: stringType().optional()
});
const SecurityExceptionSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  owners: arrayType(stringType().optional()).optional(),
  approver: stringType().optional().nullable(),
  severity: numberType().default(-1).optional(),
  status: stringType().default("draft"),
  expiration_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  requirement_assessments: stringType().optional().array().optional(),
  applied_controls: stringType().uuid().optional().array().optional(),
  assets: stringType().uuid().optional().array().optional(),
  observation: stringType().optional()
});
const FindingSchema = objectType({
  ...NameDescriptionMixin,
  ref_id: stringType().optional(),
  owner: stringType().optional().array().optional(),
  status: stringType().default("--"),
  vulnerabilities: stringType().uuid().optional().array().optional(),
  applied_controls: stringType().uuid().optional().array().optional(),
  reference_controls: stringType().uuid().optional().array().optional(),
  findings_assessment: stringType(),
  severity: numberType().default(-1),
  priority: numberType().optional().nullable(),
  filtering_labels: stringType().optional().array().optional(),
  evidences: stringType().uuid().optional().array().optional(),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  observation: stringType().optional().nullable()
});
const FindingsAssessmentSchema = objectType({
  ...NameDescriptionMixin,
  version: stringType().optional().default("0.1"),
  perimeter: stringType(),
  status: stringType().optional().nullable(),
  ref_id: stringType().optional(),
  eta: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  due_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  authors: arrayType(stringType().optional()).optional(),
  reviewers: arrayType(stringType().optional()).optional(),
  owner: stringType().optional().array().optional(),
  observation: stringType().optional().nullable(),
  category: stringType().default("--"),
  evidences: stringType().uuid().optional().array().optional(),
  is_locked: booleanType().optional().default(false)
});
const IncidentSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  reported_at: stringType().datetime({ local: true }).refine((val) => !val || new Date(val) <= /* @__PURE__ */ new Date(), {
    message: timestampcannotbeinthefuture5()
  }).optional(),
  ref_id: stringType().optional(),
  status: stringType().default("new"),
  detection: stringType().default("internally_detected"),
  severity: numberType().default(6),
  link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Link must be either empty or a valid URL starting with 'http'"
  }).optional(),
  threats: stringType().uuid().optional().array().optional(),
  owners: stringType().uuid().optional().array().optional(),
  assets: stringType().uuid().optional().array().optional(),
  qualifications: stringType().uuid().optional().array().optional(),
  entities: stringType().uuid().optional().array().optional()
});
const TimelineEntrySchema = objectType({
  folder: stringType(),
  incident: stringType(),
  entry: stringType(),
  entry_type: stringType().default("observation"),
  timestamp: stringType().datetime({ local: true }).refine((val) => !val || new Date(val) <= /* @__PURE__ */ new Date(), {
    message: timestampcannotbeinthefuture5()
  }),
  observation: stringType().optional().nullable(),
  evidences: stringType().uuid().optional().array().optional()
});
const TaskTemplateSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  status: stringType().default("pending"),
  assigned_to: stringType().optional().array().optional(),
  ref_id: stringType().optional(),
  task_date: stringType().default(() => {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }).optional(),
  is_recurrent: booleanType().optional(),
  enabled: booleanType().default(true).optional(),
  assets: stringType().uuid().optional().array().optional(),
  applied_controls: preprocessType(toArrayPreprocessor, arrayType(stringType().optional())).optional(),
  compliance_assessments: stringType().uuid().optional().array().optional(),
  risk_assessments: stringType().uuid().optional().array().optional(),
  findings_assessment: stringType().uuid().optional().array().optional(),
  observation: stringType().optional(),
  evidences: unionType([stringType().uuid(), stringType()]).optional().array().optional(),
  // Allow both UUIDs and strings for evidences created from the form
  schedule: objectType({
    interval: numberType().min(1).positive().optional(),
    frequency: stringType().optional(),
    weeks_of_month: numberType().min(-1).max(4).array().optional(),
    days_of_week: numberType().min(1).max(7).array().optional(),
    months_of_year: numberType().min(1).max(12).array().optional(),
    end_date: unionType([literalType("").transform(() => void 0), stringType().optional()])
  }).default({
    interval: 1,
    frequency: "DAILY"
  }).optional().refine(
    (schedule) => {
      if (!schedule) return true;
      if (schedule.frequency !== "MONTHLY" && schedule.frequency !== "YEARLY") {
        return true;
      }
      const hasWeeksOfMonth = schedule.weeks_of_month && schedule.weeks_of_month.length > 0;
      const hasDaysOfWeek = schedule.days_of_week && schedule.days_of_week.length > 0;
      return !hasWeeksOfMonth || hasDaysOfWeek;
    },
    {
      message: daysofweekerrormessage4(),
      path: ["days_of_week"]
    }
  ).refine(
    (schedule) => {
      if (!schedule) return true;
      if (schedule.frequency !== "MONTHLY" && schedule.frequency !== "YEARLY") {
        return true;
      }
      const hasWeeksOfMonth = schedule.weeks_of_month && schedule.weeks_of_month.length > 0;
      const hasDaysOfWeek = schedule.days_of_week && schedule.days_of_week.length > 0;
      return !hasDaysOfWeek || hasWeeksOfMonth;
    },
    {
      message: weeksofmontherrormessage4(),
      path: ["weeks_of_month"]
    }
  ),
  link: stringType().refine((val) => val === "" || val.startsWith("http") && URL.canParse(val), {
    message: "Invalid URL format"
  }).optional()
});
const TaskNodeSchema = objectType({
  due_date: stringType().optional(),
  status: stringType().optional(),
  observation: stringType().optional(),
  evidences: stringType().uuid().optional().array().optional()
});
const AuthTokenCreateSchema = objectType({
  name: stringType().min(1),
  expiry: numberType().positive().min(1).max(365).default(30).optional()
});
const ElementaryActionSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  threat: stringType().uuid().optional(),
  icon: stringType().optional().nullable(),
  attack_stage: numberType().default(0),
  operating_modes: stringType().uuid().optional().array().optional()
});
const OperatingModeSchema = objectType({
  ...NameDescriptionMixin,
  operational_scenario: stringType().uuid(),
  ref_id: stringType().optional(),
  elementary_actions: stringType().uuid().optional().array().optional(),
  likelihood: numberType().optional().default(-1),
  folder: stringType()
});
const KillChainSchema = objectType({
  operating_mode: stringType().uuid(),
  elementary_action: stringType().uuid(),
  // is_highlighted: z.boolean().default(false),
  antecedents: stringType().uuid().optional().array().optional(),
  logic_operator: stringType().optional().nullable(),
  folder: stringType()
});
const TerminologySchema = objectType({
  ...NameDescriptionMixin,
  field_path: stringType().min(1),
  is_visible: booleanType().default(true),
  translations: recordType(stringType().min(1), stringType().min(1))
});
const RoleSchema = objectType({
  ...NameDescriptionMixin,
  permissions: arrayType(numberType()).optional()
});
const GenericCollectionSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  compliance_assessments: arrayType(stringType().uuid().optional()).optional(),
  risk_assessments: arrayType(stringType().uuid().optional()).optional(),
  crq_studies: arrayType(stringType().uuid().optional()).optional(),
  ebios_studies: arrayType(stringType().uuid().optional()).optional(),
  entity_assessments: arrayType(stringType().uuid().optional()).optional(),
  findings_assessments: arrayType(stringType().uuid().optional()).optional(),
  documents: arrayType(stringType().uuid().optional()).optional(),
  security_exceptions: arrayType(stringType().uuid().optional()).optional(),
  policies: arrayType(stringType().uuid().optional()).optional(),
  dependencies: arrayType(stringType().uuid().optional()).optional(),
  observation: stringType().optional().nullable(),
  filtering_labels: arrayType(stringType().uuid().optional()).optional()
});
const AccreditationSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  category: stringType().uuid(),
  authority: stringType().uuid().optional().nullable(),
  status: stringType().uuid(),
  author: stringType().uuid().optional().nullable(),
  expiry_date: unionType([literalType("").transform(() => null), stringType().date()]).nullish(),
  linked_collection: stringType().uuid().optional().nullable(),
  checklist: stringType().uuid().optional().nullable(),
  observation: stringType().optional().nullable(),
  filtering_labels: arrayType(stringType().uuid().optional()).optional()
});
const MetricDefinitionSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  category: stringType().default("quantitative"),
  unit: stringType().optional().nullable(),
  choices_definition: jsonSchema.optional().nullable(),
  provider: stringType().optional().nullable(),
  higher_is_better: booleanType().default(true),
  default_target: numberType().optional().nullable(),
  filtering_labels: stringType().optional().array().optional()
});
const MetricInstanceSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  metric_definition: stringType().uuid(),
  status: stringType().default("draft"),
  owner: arrayType(stringType().uuid().optional()).optional(),
  target_value: coerce.number().optional().nullable(),
  collection_frequency: stringType().optional().nullable(),
  organisation_objectives: stringType().uuid().optional().array().optional(),
  filtering_labels: stringType().optional().array().optional()
});
const CustomMetricSampleSchema = objectType({
  folder: stringType(),
  metric_instance: stringType().uuid(),
  timestamp: stringType().datetime(),
  value: jsonSchema
});
const DashboardSchema = objectType({
  ...NameDescriptionMixin,
  folder: stringType(),
  ref_id: stringType().optional(),
  dashboard_definition: jsonSchema.default({}),
  filtering_labels: stringType().optional().array().optional()
});
const DashboardWidgetSchema = objectType({
  folder: stringType(),
  dashboard: stringType().uuid(),
  // Custom metric (optional - either this or builtin fields)
  metric_instance: stringType().uuid().optional().nullable(),
  // Builtin metric fields (optional - either this or metric_instance)
  target_model: stringType().optional().nullable(),
  target_object_id: stringType().uuid().optional().nullable(),
  metric_key: stringType().optional().nullable(),
  // Text widget content (for chart_type='text')
  text_content: stringType().optional().nullable(),
  // Common fields
  title: stringType().optional().nullable(),
  position_x: coerce.number().min(0).max(11).default(0),
  position_y: coerce.number().min(0).default(0),
  width: coerce.number().min(1).max(12).default(6),
  height: coerce.number().min(1).default(2),
  chart_type: stringType().default("kpi_card"),
  time_range: stringType().default("last_30_days"),
  aggregation: stringType().default("none"),
  show_target: booleanType().default(true),
  show_legend: booleanType().default(true),
  widget_config: jsonSchema.default({})
});
const teamSchema = objectType({
  ...NameDescriptionMixin,
  team_email: stringType().email().optional(),
  folder: stringType(),
  members: arrayType(stringType().uuid().optional()).optional(),
  leader: stringType().uuid(),
  deputies: arrayType(stringType().uuid().optional()).optional()
});
const SCHEMA_MAP = {
  folders: FolderSchema,
  "folders-import": FolderImportSchema,
  perimeters: PerimeterSchema,
  "risk-matrices": RiskMatrixSchema,
  "risk-assessments": RiskAssessmentSchema,
  threats: ThreatSchema,
  "risk-scenarios": RiskScenarioSchema,
  "applied-controls": AppliedControlSchema,
  "applied-controls_duplicate": AppliedControlDuplicateSchema,
  policies: PolicySchema,
  "risk-acceptances": RiskAcceptanceSchema,
  "validation-flows": ValidationFlowSchema,
  "reference-controls": ReferenceControlSchema,
  assets: AssetSchema,
  "requirement-assessments": RequirementAssessmentSchema,
  "compliance-assessments": ComplianceAssessmentSchema,
  campaigns: CampaignSchema,
  evidences: EvidenceSchema,
  "evidence-revisions": EvidenceRevisionSchema,
  users: UserCreateSchema,
  "sso-settings": SSOSettingsSchema,
  "general-settings": GeneralSettingsSchema,
  "feature-flags": FeatureFlagsSchema,
  entities: EntitiesSchema,
  "entity-assessments": EntityAssessmentSchema,
  representatives: representativeSchema,
  solutions: solutionSchema,
  contracts: contractSchema,
  vulnerabilities: vulnerabilitySchema,
  "filtering-labels": FilteringLabelSchema,
  "business-impact-analysis": BusinessImpactAnalysisSchema,
  "asset-assessments": AssetAssessmentSchema,
  "escalation-thresholds": EscalationThresholdSchema,
  processings: processingSchema,
  "right-requests": rightRequestSchema,
  "data-breaches": dataBreachSchema,
  purposes: purposeSchema,
  "personal-data": personalDataSchema,
  "data-subjects": dataSubjectSchema,
  "data-recipients": dataRecipientSchema,
  "data-contractors": dataContractorSchema,
  "data-transfers": dataTransferSchema,
  "ebios-rm": ebiosRMSchema,
  "feared-events": fearedEventsSchema,
  "ro-to": roToSchema,
  stakeholders: StakeholderSchema,
  "strategic-scenarios": StrategicScenarioSchema,
  "attack-paths": AttackPathSchema,
  "operational-scenarios": operationalScenarioSchema,
  "security-exceptions": SecurityExceptionSchema,
  findings: FindingSchema,
  "findings-assessments": FindingsAssessmentSchema,
  incidents: IncidentSchema,
  "timeline-entries": TimelineEntrySchema,
  "task-templates": TaskTemplateSchema,
  "task-nodes": TaskNodeSchema,
  "elementary-actions": ElementaryActionSchema,
  "operating-modes": OperatingModeSchema,
  "kill-chains": KillChainSchema,
  "organisation-objectives": organisationObjectiveSchema,
  "organisation-issues": organisationIssueSchema,
  "quantitative-risk-studies": quantitativeRiskStudySchema,
  "quantitative-risk-scenarios": quantitativeRiskScenarioSchema,
  "quantitative-risk-hypotheses": quantitativeRiskHypothesisSchema,
  terminologies: TerminologySchema,
  roles: RoleSchema,
  "generic-collections": GenericCollectionSchema,
  accreditations: AccreditationSchema,
  "metric-definitions": MetricDefinitionSchema,
  "metric-instances": MetricInstanceSchema,
  "custom-metric-samples": CustomMetricSampleSchema,
  dashboards: DashboardSchema,
  "dashboard-widgets": DashboardWidgetSchema,
  "dashboard-text-widgets": DashboardWidgetSchema,
  "dashboard-builtin-widgets": DashboardWidgetSchema,
  teams: teamSchema
};
const modelSchema = (model) => {
  return SCHEMA_MAP[model] || objectType({});
};
const composerSchema = objectType({
  risk_assessments: arrayType(stringType().uuid())
});
const webhookEndpointSchema = objectType({
  ...NameDescriptionMixin,
  url: stringType().url(),
  event_types: stringType().array().nonempty(),
  is_active: booleanType().default(true),
  secret: stringType().min(1).optional(),
  target_folders: stringType().uuid().optional().array().optional(),
  payload_format: enumType(["thin", "full"]).default("full")
});

export { AuthTokenCreateSchema as A, ChangePasswordSchema as C, FeatureFlagsSchema as F, GeneralSettingsSchema as G, LibraryUploadSchema as L, ResetPasswordSchema as R, SSOSettingsSchema as S, UserEditSchema as U, SetPasswordSchema as a, ComplianceAssessmentSchema as b, composerSchema as c, RequirementAssessmentSchema as d, emailSchema as e, loginSchema as l, modelSchema as m, quickStartSchema as q, webhookEndpointSchema as w };
//# sourceMappingURL=schemas-vgtyOSI9.js.map
