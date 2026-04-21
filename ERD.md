# CISO Assistant -- Database Entity Relationship Diagrams

> Auto-generated from the Django model layer.
> 70+ concrete models across 10+ apps.

## Conventions

| Symbol | Meaning |
|--------|---------|
| `PK` | Primary key |
| `FK` | Foreign key |
| `||--o{` | One-to-many |
| `}o--o{` | Many-to-many |
| `||--||` | One-to-one |

Only the most important columns are shown per entity (id, name, key FKs, status/type discriminators). Every model inherits `id` (UUID), `created_at`, and `updated_at` from `AbstractBaseModel` unless noted otherwise.

---

## 1. High-Level Domain Overview

```mermaid
flowchart TB
    IAM["IAM\n(Folder, User, Role, UserGroup,\nRoleAssignment)"]
    CoreLib["Core: Library & Framework\n(StoredLibrary, LoadedLibrary, Framework,\nRequirementNode, RiskMatrix, Threat,\nReferenceControl, Terminology)"]
    CoreAssets["Core: Assets & Controls\n(Asset, AppliedControl, Evidence,\nVulnerability, Perimeter, Incident)"]
    CoreAssess["Core: Assessments & Risk\n(RiskAssessment, RiskScenario,\nComplianceAssessment, RequirementAssessment,\nFindingsAssessment, Campaign)"]
    CoreTasks["Core: Tasks, Flows & Teams\n(TaskTemplate, TaskNode, ValidationFlow,\nTeam, Actor)"]
    EBIOS["EBIOS RM\n(EbiosRMStudy, FearedEvent, RoTo,\nStakeholder, AttackPath,\nOperationalScenario)"]
    TPRM["TPRM\n(Entity, EntityAssessment,\nSolution, Contract)"]
    Privacy["Privacy\n(Processing, PersonalData,\nDataBreach, RightRequest)"]
    CRQ["CRQ\n(QuantitativeRiskStudy,\nQuantitativeRiskScenario)"]
    Resilience["Resilience\n(BusinessImpactAnalysis,\nAssetAssessment)"]
    Metrology["Metrology\n(MetricDefinition, MetricInstance,\nDashboard)"]
    PMBOK["PMBOK\n(GenericCollection,\nAccreditation)"]
    Integrations["Integrations & Webhooks\n(IntegrationProvider, SyncMapping,\nWebhookEndpoint)"]
    Settings["Global Settings & SSO\n(GlobalSettings, SSOSettings)"]

    IAM -->|"Folder FK on every model"| CoreLib
    IAM -->|"Folder FK"| CoreAssets
    IAM -->|"Folder FK"| CoreAssess
    IAM -->|"Folder FK"| CoreTasks
    IAM -->|"User FKs"| CoreTasks

    CoreLib -->|"Framework, RiskMatrix,\nThreat, ReferenceControl"| CoreAssess
    CoreLib -->|"Threat, ReferenceControl"| CoreAssets
    CoreAssets -->|"Asset, AppliedControl,\nEvidence, Vulnerability"| CoreAssess
    CoreAssets -->|"Asset, Evidence"| EBIOS
    CoreAssets -->|"AppliedControl, Evidence"| TPRM
    CoreAssets -->|"Asset, AppliedControl,\nEvidence"| Privacy
    CoreAssets -->|"Asset, Vulnerability,\nThreat"| CRQ
    CoreAssets -->|"Asset, AppliedControl,\nEvidence"| Resilience
    CoreAssets -->|"Asset"| Metrology

    CoreAssess -->|"ComplianceAssessment,\nRiskAssessment"| EBIOS
    CoreAssess -->|"ComplianceAssessment"| TPRM
    CoreAssess -->|"Assessments"| PMBOK
    CoreAssess -->|"Assessments"| CoreTasks

    CoreTasks -->|"Actor M2M"| CoreAssets
    CoreTasks -->|"Actor M2M"| CoreAssess
    CoreTasks -->|"Actor M2M"| TPRM

    TPRM -->|"Entity FK"| EBIOS
    TPRM -->|"Entity FK"| Privacy

    CoreLib -->|"LoadedLibrary FK"| Metrology
    CoreTasks -->|"ValidationFlow M2M"| EBIOS
    CoreTasks -->|"ValidationFlow M2M"| CRQ
    CoreTasks -->|"ValidationFlow M2M"| Resilience
    CoreTasks -->|"ValidationFlow M2M"| TPRM

    IAM -->|"Folder FK"| Settings
    IAM -->|"Folder FK"| Integrations
```

---

## 2. IAM (Identity & Access Management)

```mermaid
erDiagram
    Folder {
        uuid id PK
        string name
        string description
        string content_type
        uuid parent_folder_id FK
        bool builtin
    }

    User {
        uuid id PK
        string email
        string first_name
        string last_name
        string password
        bool is_active
        bool is_superuser
        bool first_login
        datetime date_joined
        date expiry_date
        json preferences
        uuid folder_id FK
    }

    UserGroup {
        uuid id PK
        string name
        string description
        bool builtin
        uuid folder_id FK
    }

    Role {
        uuid id PK
        string name
        string description
        bool builtin
        uuid folder_id FK
    }

    RoleAssignment {
        uuid id PK
        string name
        string description
        uuid user_id FK
        uuid user_group_id FK
        uuid role_id FK
        bool is_recursive
        bool builtin
        uuid folder_id FK
    }

    PersonalAccessToken {
        int id PK
        string name
        int auth_token_id FK
    }

    Folder ||--o{ Folder : "parent_folder"
    Folder ||--o{ User : "folder"
    Folder ||--o{ UserGroup : "folder"
    Folder ||--o{ Role : "folder"
    Folder ||--o{ RoleAssignment : "folder"
    User }o--o{ UserGroup : "user_groups"
    User ||--o{ RoleAssignment : "user"
    UserGroup ||--o{ RoleAssignment : "user_group"
    Role ||--o{ RoleAssignment : "role"
    RoleAssignment }o--o{ Folder : "perimeter_folders"
    Folder }o--o{ FilteringLabel : "filtering_labels"
```

---

## 3. Core -- Library & Framework

```mermaid
erDiagram
    StoredLibrary {
        uuid id PK
        string urn
        string name
        string description
        string provider
        string locale
        string copyright
        int version
        date publication_date
        bool builtin
        bool is_loaded
        string hash_checksum
        json content
        bool autoload
        uuid folder_id FK
    }

    LoadedLibrary {
        uuid id PK
        string urn
        string name
        string description
        string provider
        string locale
        string copyright
        int version
        date publication_date
        bool builtin
        json dependencies
        uuid folder_id FK
    }

    Framework {
        uuid id PK
        string urn
        string ref_id
        string name
        string description
        int min_score
        int max_score
        json scores_definition
        json implementation_groups_definition
        uuid library_id FK
        uuid folder_id FK
    }

    RequirementNode {
        uuid id PK
        string urn
        string ref_id
        string name
        string description
        string parent_urn
        int order_id
        bool assessable
        int weight
        string importance
        json implementation_groups
        uuid framework_id FK
        uuid folder_id FK
    }

    RequirementMappingSet {
        uuid id PK
        string urn
        string ref_id
        string name
        uuid library_id FK
        uuid source_framework_id FK
        uuid target_framework_id FK
        uuid folder_id FK
    }

    RequirementMapping {
        int id PK
        string relationship
        string rationale
        int strength_of_relationship
        uuid mapping_set_id FK
        uuid source_requirement_id FK
        uuid target_requirement_id FK
    }

    RiskMatrix {
        uuid id PK
        string urn
        string ref_id
        string name
        string description
        json json_definition
        bool is_enabled
        uuid library_id FK
        uuid folder_id FK
    }

    Threat {
        uuid id PK
        string urn
        string ref_id
        string name
        string description
        string provider
        uuid library_id FK
        uuid folder_id FK
    }

    ReferenceControl {
        uuid id PK
        string urn
        string ref_id
        string name
        string description
        string category
        string csf_function
        json typical_evidence
        uuid library_id FK
        uuid folder_id FK
    }

    Terminology {
        uuid id PK
        string name
        string description
        string field_path
        bool builtin
        bool is_visible
        uuid folder_id FK
    }

    FilteringLabel {
        uuid id PK
        string label
        uuid folder_id FK
    }

    LibraryFilteringLabel {
        uuid id PK
        string label
        uuid folder_id FK
    }

    AssetCapability {
        uuid id PK
        string urn
        string name
        uuid folder_id FK
    }

    LoadedLibrary }o--o{ LoadedLibrary : "dependencies"
    LoadedLibrary ||--o{ Framework : "library"
    LoadedLibrary ||--o{ RiskMatrix : "library"
    LoadedLibrary ||--o{ Threat : "library"
    LoadedLibrary ||--o{ ReferenceControl : "library"
    StoredLibrary }o--o{ LibraryFilteringLabel : "filtering_labels"
    Framework ||--o{ RequirementNode : "framework"
    Framework ||--o{ RequirementMappingSet : "source_framework"
    Framework ||--o{ RequirementMappingSet : "target_framework"
    LoadedLibrary ||--o{ RequirementMappingSet : "library"
    RequirementMappingSet ||--o{ RequirementMapping : "mapping_set"
    RequirementNode ||--o{ RequirementMapping : "source_requirement"
    RequirementNode ||--o{ RequirementMapping : "target_requirement"
    RequirementNode }o--o{ Threat : "threats"
    RequirementNode }o--o{ ReferenceControl : "reference_controls"
```

---

## 4. Core -- Assets & Controls

```mermaid
erDiagram
    Perimeter {
        uuid id PK
        string name
        string description
        string ref_id
        string lc_status
        uuid folder_id FK
    }

    Asset {
        uuid id PK
        string name
        string description
        string ref_id
        string type
        string business_value
        url reference_link
        json security_objectives
        bool is_business_function
        uuid asset_class_id FK
        uuid folder_id FK
    }

    AssetClass {
        uuid id PK
        string name
        string description
        uuid parent_id FK
        uuid folder_id FK
    }

    AppliedControl {
        uuid id PK
        string name
        string description
        string ref_id
        string category
        string csf_function
        string status
        int priority
        date start_date
        date eta
        date expiry_date
        string effort
        int control_impact
        int progress_field
        uuid reference_control_id FK
        uuid folder_id FK
    }

    Evidence {
        uuid id PK
        string name
        string description
        string status
        date expiry_date
        json ai_analysis
        uuid folder_id FK
    }

    EvidenceRevision {
        uuid id PK
        int version
        string attachment
        string attachment_hash
        url link
        uuid evidence_id FK
        uuid task_node_id FK
        uuid folder_id FK
    }

    Vulnerability {
        uuid id PK
        string name
        string description
        string ref_id
        string status
        int severity
        uuid folder_id FK
    }

    SecurityException {
        uuid id PK
        string name
        string description
        string ref_id
        int severity
        string status
        date expiration_date
        uuid approver_id FK
        uuid folder_id FK
    }

    Incident {
        uuid id PK
        string name
        string description
        string ref_id
        string status
        int severity
        datetime reported_at
        string detection
        uuid folder_id FK
    }

    TimelineEntry {
        uuid id PK
        string entry
        string entry_type
        datetime timestamp
        uuid incident_id FK
        uuid author_id FK
        uuid folder_id FK
    }

    OrganisationIssue {
        uuid id PK
        string name
        string description
        string ref_id
        string category
        string origin
        uuid folder_id FK
    }

    OrganisationObjective {
        uuid id PK
        string name
        string description
        string ref_id
        string status
        string health
        date eta
        date due_date
        uuid folder_id FK
    }

    AssetClass ||--o{ AssetClass : "parent"
    AssetClass ||--o{ Asset : "asset_class"
    Asset }o--o{ Asset : "parent_assets"
    Asset }o--o{ AssetCapability : "overridden_children_capabilities"
    Asset }o--o{ SecurityException : "security_exceptions"
    ReferenceControl ||--o{ AppliedControl : "reference_control"
    AppliedControl }o--o{ Evidence : "evidences"
    AppliedControl }o--o{ Asset : "assets"
    AppliedControl }o--o{ SecurityException : "security_exceptions"
    AppliedControl }o--o{ OrganisationObjective : "objectives"
    Vulnerability }o--o{ AppliedControl : "applied_controls"
    Vulnerability }o--o{ Asset : "assets"
    Vulnerability }o--o{ SecurityException : "security_exceptions"
    Evidence ||--o{ EvidenceRevision : "evidence"
    Incident }o--o{ Threat : "threats"
    Incident }o--o{ Asset : "assets"
    Incident }o--o{ Terminology : "qualifications"
    Incident ||--o{ TimelineEntry : "incident"
    TimelineEntry }o--o{ Evidence : "evidences"
    OrganisationObjective }o--o{ OrganisationIssue : "issues"
    OrganisationObjective }o--o{ Asset : "assets"
    Perimeter }o--o{ Actor : "default_assignee"
    SecurityException ||--o{ User : "approver"
    Asset }o--o{ Actor : "owner"
    AppliedControl }o--o{ Actor : "owner"
    Evidence }o--o{ Actor : "owner"
    Incident }o--o{ Actor : "owners"
```

---

## 5. Core -- Assessments & Risk

```mermaid
erDiagram
    Campaign {
        uuid id PK
        string name
        string description
        string status
        date start_date
        date eta
        date due_date
        uuid folder_id FK
    }

    RiskAssessment {
        uuid id PK
        string name
        string description
        string ref_id
        string version
        string status
        int risk_tolerance
        date eta
        date due_date
        bool is_locked
        uuid perimeter_id FK
        uuid risk_matrix_id FK
        uuid ebios_rm_study_id FK
        uuid folder_id FK
    }

    RiskScenario {
        uuid id PK
        string name
        string description
        string ref_id
        string treatment
        int inherent_proba
        int inherent_impact
        int inherent_level
        int current_proba
        int current_impact
        int current_level
        int residual_proba
        int residual_impact
        int residual_level
        int strength_of_knowledge
        uuid risk_assessment_id FK
        uuid operational_scenario_id FK
        uuid risk_origin_id FK
    }

    ComplianceAssessment {
        uuid id PK
        string name
        string description
        string ref_id
        string version
        string status
        int min_score
        int max_score
        json scores_definition
        bool is_locked
        uuid perimeter_id FK
        uuid framework_id FK
        uuid campaign_id FK
        uuid folder_id FK
    }

    RequirementAssessment {
        uuid id PK
        string status
        string result
        bool is_scored
        int score
        int documentation_score
        bool selected
        date eta
        date due_date
        json answers
        uuid compliance_assessment_id FK
        uuid requirement_id FK
        uuid folder_id FK
    }

    FindingsAssessment {
        uuid id PK
        string name
        string description
        string ref_id
        string category
        string version
        string status
        bool is_locked
        uuid perimeter_id FK
        uuid folder_id FK
    }

    Finding {
        uuid id PK
        string name
        string description
        string ref_id
        int priority
        int severity
        string status
        date eta
        date due_date
        uuid findings_assessment_id FK
        uuid folder_id FK
    }

    RiskAcceptance {
        uuid id PK
        string name
        string description
        string state
        date expiry_date
        datetime accepted_at
        datetime rejected_at
        datetime revoked_at
        string justification
        uuid approver_id FK
        uuid folder_id FK
    }

    Perimeter ||--o{ RiskAssessment : "perimeter"
    RiskMatrix ||--o{ RiskAssessment : "risk_matrix"
    RiskAssessment ||--o{ RiskScenario : "risk_assessment"
    RiskScenario }o--o{ Asset : "assets"
    RiskScenario }o--o{ Vulnerability : "vulnerabilities"
    RiskScenario }o--o{ AppliedControl : "applied_controls"
    RiskScenario }o--o{ AppliedControl : "existing_applied_controls"
    RiskScenario }o--o{ Threat : "threats"
    RiskScenario }o--o{ RiskScenario : "antecedent_scenarios"
    RiskScenario }o--o{ Actor : "owner"
    RiskScenario }o--o{ Terminology : "qualifications"
    RiskScenario }o--o{ SecurityException : "security_exceptions"
    Terminology ||--o{ RiskScenario : "risk_origin"
    RiskAssessment }o--o{ Actor : "reviewers"
    RiskAssessment }o--o{ Actor : "authors"
    Framework ||--o{ ComplianceAssessment : "framework"
    Perimeter ||--o{ ComplianceAssessment : "perimeter"
    Campaign ||--o{ ComplianceAssessment : "campaign"
    Campaign }o--o{ Framework : "frameworks"
    Campaign }o--o{ Perimeter : "perimeters"
    ComplianceAssessment ||--o{ RequirementAssessment : "compliance_assessment"
    RequirementNode ||--o{ RequirementAssessment : "requirement"
    RequirementAssessment }o--o{ Evidence : "evidences"
    RequirementAssessment }o--o{ AppliedControl : "applied_controls"
    RequirementAssessment }o--o{ SecurityException : "security_exceptions"
    ComplianceAssessment }o--o{ Asset : "assets"
    ComplianceAssessment }o--o{ Evidence : "evidences"
    ComplianceAssessment }o--o{ Actor : "reviewers"
    ComplianceAssessment }o--o{ Actor : "authors"
    FindingsAssessment ||--o{ Finding : "findings_assessment"
    FindingsAssessment }o--o{ Actor : "owner"
    FindingsAssessment }o--o{ Evidence : "evidences"
    Finding }o--o{ Vulnerability : "vulnerabilities"
    Finding }o--o{ ReferenceControl : "reference_controls"
    Finding }o--o{ AppliedControl : "applied_controls"
    Finding }o--o{ Evidence : "evidences"
    Finding }o--o{ Actor : "owner"
    RiskAcceptance }o--o{ RiskScenario : "risk_scenarios"
    User ||--o{ RiskAcceptance : "approver"
```

---

## 6. Core -- Tasks, Flows & Teams

```mermaid
erDiagram
    Actor {
        uuid id PK
        uuid user_id FK
        uuid team_id FK
        uuid entity_id FK
    }

    Team {
        uuid id PK
        string name
        string description
        string team_email
        uuid leader_id FK
        uuid folder_id FK
    }

    TaskTemplate {
        uuid id PK
        string name
        string description
        string ref_id
        date task_date
        bool is_recurrent
        json schedule
        bool enabled
        url link
        uuid folder_id FK
    }

    TaskNode {
        uuid id PK
        date due_date
        string status
        bool to_delete
        uuid task_template_id FK
        uuid folder_id FK
    }

    ValidationFlow {
        uuid id PK
        string ref_id
        string status
        date validation_deadline
        uuid requester_id FK
        uuid approver_id FK
        uuid folder_id FK
    }

    FlowEvent {
        uuid id PK
        string event_type
        bool is_tainted
        uuid validation_flow_id FK
        uuid event_actor_id FK
        uuid folder_id FK
    }

    AiAnalysisResult {
        uuid id PK
        datetime created_at
        json result
        string status
        int score
        string compliance_status
        string model_used
        uuid applied_control_id FK
        uuid requirement_assessment_id FK
    }

    FileSearchTable {
        uuid id PK
        string gemini_file_id
        string gemini_store_id
        string upload_status
        uuid evidence_revision_id FK
    }

    OrganizationContext {
        uuid id PK
        string name
        string sector
        string size
        string geographic_scope
        string maturity_level
        json regulatory_obligations
        uuid folder_id FK
    }

    HistoricalMetric {
        int id PK
        date date
        json data
        string model
        uuid object_id
    }

    User ||--|| Actor : "user"
    Team ||--|| Actor : "team"
    User ||--o{ Team : "leader"
    User }o--o{ Team : "deputies"
    User }o--o{ Team : "members"
    TaskTemplate ||--o{ TaskNode : "task_template"
    TaskNode }o--o{ Evidence : "evidences"
    TaskTemplate }o--o{ Actor : "assigned_to"
    TaskTemplate }o--o{ Evidence : "evidences"
    TaskTemplate }o--o{ Asset : "assets"
    TaskTemplate }o--o{ AppliedControl : "applied_controls"
    TaskTemplate }o--o{ ComplianceAssessment : "compliance_assessments"
    TaskTemplate }o--o{ RiskAssessment : "risk_assessments"
    TaskTemplate }o--o{ FindingsAssessment : "findings_assessment"
    OrganisationObjective }o--o{ TaskTemplate : "tasks"
    OrganisationObjective }o--o{ Actor : "assigned_to"
    ValidationFlow ||--o{ FlowEvent : "validation_flow"
    User ||--o{ ValidationFlow : "requester"
    User ||--o{ ValidationFlow : "approver"
    User ||--o{ FlowEvent : "event_actor"
    ValidationFlow }o--o{ ComplianceAssessment : "compliance_assessments"
    ValidationFlow }o--o{ RiskAssessment : "risk_assessments"
    ValidationFlow }o--o{ FindingsAssessment : "findings_assessments"
    ValidationFlow }o--o{ Evidence : "evidences"
    ValidationFlow }o--o{ SecurityException : "security_exceptions"
    ValidationFlow }o--o{ AppliedControl : "policies"
    AppliedControl ||--o{ AiAnalysisResult : "applied_control"
    RequirementAssessment ||--o{ AiAnalysisResult : "requirement_assessment"
    EvidenceRevision ||--|| FileSearchTable : "evidence_revision"
    EvidenceRevision ||--o{ TaskNode : "task_node"
```

---

## 7. EBIOS RM

```mermaid
erDiagram
    EbiosRMStudy {
        uuid id PK
        string name
        string description
        string ref_id
        string version
        string status
        date eta
        date due_date
        string quotation_method
        json meta
        uuid risk_matrix_id FK
        uuid reference_entity_id FK
        uuid folder_id FK
    }

    FearedEvent {
        uuid id PK
        string name
        string description
        string ref_id
        int gravity
        bool is_selected
        uuid ebios_rm_study_id FK
        uuid folder_id FK
    }

    RoTo {
        uuid id PK
        string target_objective
        int motivation
        int resources
        int activity
        bool is_selected
        uuid ebios_rm_study_id FK
        uuid risk_origin_id FK
        uuid folder_id FK
    }

    Stakeholder {
        uuid id PK
        int current_dependency
        int current_penetration
        int current_maturity
        int current_trust
        int residual_dependency
        int residual_penetration
        int residual_maturity
        int residual_trust
        bool is_selected
        uuid ebios_rm_study_id FK
        uuid entity_id FK
        uuid folder_id FK
    }

    StrategicScenario {
        uuid id PK
        string name
        string description
        string ref_id
        uuid ebios_rm_study_id FK
        uuid ro_to_couple_id FK
        uuid focused_feared_event_id FK
        uuid folder_id FK
    }

    AttackPath {
        uuid id PK
        string name
        string description
        string ref_id
        bool is_selected
        uuid ebios_rm_study_id FK
        uuid strategic_scenario_id FK
        uuid folder_id FK
    }

    ElementaryAction {
        uuid id PK
        string name
        string description
        string ref_id
        int attack_stage
        string icon
        uuid threat_id FK
        uuid folder_id FK
    }

    OperatingMode {
        uuid id PK
        string name
        string description
        string ref_id
        int likelihood
        uuid operational_scenario_id FK
        uuid folder_id FK
    }

    OperationalScenario {
        uuid id PK
        int likelihood
        bool is_selected
        uuid ebios_rm_study_id FK
        uuid attack_path_id FK
        uuid folder_id FK
    }

    KillChain {
        uuid id PK
        string logic_operator
        bool is_highlighted
        uuid operating_mode_id FK
        uuid elementary_action_id FK
        uuid folder_id FK
    }

    EbiosRMStudy }o--o{ Asset : "assets"
    EbiosRMStudy }o--o{ ComplianceAssessment : "compliance_assessments"
    EbiosRMStudy }o--o{ Actor : "reviewers"
    EbiosRMStudy }o--o{ Actor : "authors"
    RiskMatrix ||--o{ EbiosRMStudy : "risk_matrix"
    Entity ||--o{ EbiosRMStudy : "reference_entity"
    EbiosRMStudy ||--o{ FearedEvent : "ebios_rm_study"
    EbiosRMStudy ||--o{ RoTo : "ebios_rm_study"
    EbiosRMStudy ||--o{ Stakeholder : "ebios_rm_study"
    EbiosRMStudy ||--o{ StrategicScenario : "ebios_rm_study"
    EbiosRMStudy ||--o{ AttackPath : "ebios_rm_study"
    EbiosRMStudy ||--o{ OperationalScenario : "ebios_rm_study"
    FearedEvent }o--o{ Asset : "assets"
    FearedEvent }o--o{ Terminology : "qualifications"
    RoTo }o--o{ FearedEvent : "feared_events"
    Terminology ||--o{ RoTo : "risk_origin"
    Entity ||--o{ Stakeholder : "entity"
    Stakeholder }o--o{ AppliedControl : "applied_controls"
    Terminology ||--o{ Stakeholder : "category"
    RoTo ||--o{ StrategicScenario : "ro_to_couple"
    FearedEvent ||--o{ StrategicScenario : "focused_feared_event"
    StrategicScenario ||--o{ AttackPath : "strategic_scenario"
    AttackPath }o--o{ Stakeholder : "stakeholders"
    AttackPath ||--|| OperationalScenario : "attack_path"
    OperationalScenario }o--o{ Threat : "threats"
    OperationalScenario ||--o{ OperatingMode : "operational_scenario"
    OperatingMode }o--o{ ElementaryAction : "elementary_actions"
    Threat ||--o{ ElementaryAction : "threat"
    OperatingMode ||--o{ KillChain : "operating_mode"
    ElementaryAction ||--o{ KillChain : "elementary_action"
    KillChain }o--o{ ElementaryAction : "antecedents"
    RiskAssessment ||--o{ EbiosRMStudy : "ebios_rm_study"
```

---

## 8. TPRM (Third-Party Risk Management)

```mermaid
erDiagram
    Entity {
        uuid id PK
        string name
        string description
        string ref_id
        bool is_active
        int default_dependency
        int default_penetration
        int default_maturity
        int default_trust
        string mission
        url reference_link
        bool builtin
        string country
        string currency
        json legal_identifiers
        uuid parent_entity_id FK
        uuid folder_id FK
    }

    EntityAssessment {
        uuid id PK
        string name
        string description
        string version
        string status
        int criticality
        int dependency
        int penetration
        int maturity
        int trust
        string conclusion
        date eta
        date due_date
        uuid perimeter_id FK
        uuid entity_id FK
        uuid compliance_assessment_id FK
        uuid evidence_id FK
        uuid folder_id FK
    }

    Representative {
        uuid id PK
        string ref_id
        string first_name
        string last_name
        string email
        string phone
        string role
        uuid entity_id FK
        uuid user_id FK
    }

    Solution {
        uuid id PK
        string name
        string description
        string ref_id
        bool is_active
        url reference_link
        int criticality
        uuid provider_entity_id FK
        uuid recipient_entity_id FK
    }

    Contract {
        uuid id PK
        string name
        string description
        string ref_id
        string status
        date start_date
        date end_date
        string currency
        float annual_expense
        bool is_intragroup
        string governing_law_country
        uuid provider_entity_id FK
        uuid beneficiary_entity_id FK
        uuid overarching_contract_id FK
        uuid folder_id FK
    }

    Entity ||--o{ Entity : "parent_entity"
    Entity }o--o{ Terminology : "relationship"
    Entity }o--o{ Folder : "owned_folders"
    Entity ||--|| Actor : "entity"
    Entity ||--o{ EntityAssessment : "entity"
    Entity ||--o{ Representative : "entity"
    Entity ||--o{ Solution : "provider_entity"
    Entity ||--o{ Solution : "recipient_entity"
    Entity ||--o{ Contract : "provider_entity"
    Entity ||--o{ Contract : "beneficiary_entity"
    Contract ||--o{ Contract : "overarching_contract"
    Contract }o--o{ Solution : "solutions"
    Contract }o--o{ Evidence : "evidences"
    Contract }o--o{ Actor : "owner"
    EntityAssessment }o--o{ User : "representatives"
    EntityAssessment }o--o{ Solution : "solutions"
    EntityAssessment }o--o{ Actor : "reviewers"
    EntityAssessment }o--o{ Actor : "authors"
    Perimeter ||--o{ EntityAssessment : "perimeter"
    ComplianceAssessment ||--o{ EntityAssessment : "compliance_assessment"
    Evidence ||--o{ EntityAssessment : "evidence"
    Solution }o--o{ Actor : "owner"
    Solution }o--o{ Asset : "assets"
    User ||--o{ Representative : "user"
```

---

## 9. Privacy

```mermaid
erDiagram
    ProcessingNature {
        uuid id PK
        string urn
        string name
        uuid folder_id FK
    }

    Processing {
        uuid id PK
        string name
        string description
        string ref_id
        string status
        string information_channel
        string usage_channel
        bool dpia_required
        string dpia_reference
        bool has_sensitive_personal_data
        uuid author_id FK
        uuid folder_id FK
    }

    Purpose {
        uuid id PK
        string name
        string description
        string legal_basis
        uuid processing_id FK
        uuid folder_id FK
    }

    PersonalData {
        uuid id PK
        string name
        string description
        string category
        string retention
        string deletion_policy
        bool is_sensitive
        uuid processing_id FK
        uuid folder_id FK
    }

    DataSubject {
        uuid id PK
        string name
        string description
        string category
        uuid processing_id FK
        uuid folder_id FK
    }

    DataRecipient {
        uuid id PK
        string name
        string description
        string category
        uuid processing_id FK
        uuid folder_id FK
    }

    DataContractor {
        uuid id PK
        string name
        string description
        string relationship_type
        string country
        url documentation_link
        uuid processing_id FK
        uuid entity_id FK
        uuid folder_id FK
    }

    DataTransfer {
        uuid id PK
        string name
        string description
        string country
        string legal_basis
        url documentation_link
        uuid processing_id FK
        uuid entity_id FK
        uuid folder_id FK
    }

    RightRequest {
        uuid id PK
        string name
        string description
        string ref_id
        string request_type
        string status
        date requested_on
        date due_date
        uuid folder_id FK
    }

    DataBreach {
        uuid id PK
        string name
        string description
        string ref_id
        string breach_type
        string risk_level
        string status
        datetime discovered_on
        int affected_subjects_count
        int affected_personal_data_count
        datetime authority_notified_on
        string authority_notification_ref
        datetime subjects_notified_on
        url reference_link
        uuid incident_id FK
        uuid folder_id FK
    }

    Processing }o--o{ ProcessingNature : "nature"
    Processing ||--o{ Purpose : "processing"
    Processing ||--o{ PersonalData : "processing"
    Processing ||--o{ DataSubject : "processing"
    Processing ||--o{ DataRecipient : "processing"
    Processing ||--o{ DataContractor : "processing"
    Processing ||--o{ DataTransfer : "processing"
    Processing }o--o{ AppliedControl : "associated_controls"
    Processing }o--o{ Evidence : "evidences"
    Processing }o--o{ Actor : "assigned_to"
    Actor ||--o{ Processing : "author"
    PersonalData }o--o{ Asset : "assets"
    Entity ||--o{ DataContractor : "entity"
    Entity ||--o{ DataTransfer : "entity"
    RightRequest }o--o{ Processing : "processings"
    RightRequest }o--o{ Actor : "owner"
    DataBreach }o--o{ Processing : "affected_processings"
    DataBreach }o--o{ PersonalData : "affected_personal_data"
    DataBreach }o--o{ Entity : "authorities"
    DataBreach }o--o{ AppliedControl : "remediation_measures"
    DataBreach }o--o{ Actor : "assigned_to"
    Incident ||--o{ DataBreach : "incident"
```

---

## 10. CRQ (Cyber Risk Quantification)

```mermaid
erDiagram
    QuantitativeRiskStudy {
        uuid id PK
        string name
        string description
        string ref_id
        string status
        date eta
        date due_date
        json risk_tolerance
        float loss_threshold
        string distribution_model
        json portfolio_simulation
        uuid folder_id FK
    }

    QuantitativeRiskScenario {
        uuid id PK
        string name
        string description
        string ref_id
        string status
        int priority
        bool is_selected
        uuid quantitative_risk_study_id FK
        uuid folder_id FK
    }

    QuantitativeRiskHypothesis {
        uuid id PK
        string name
        string description
        string ref_id
        string risk_stage
        json parameters
        json simulation_data
        bool is_simulation_fresh
        bool is_selected
        uuid quantitative_risk_scenario_id FK
        uuid folder_id FK
    }

    QuantitativeRiskStudy ||--o{ QuantitativeRiskScenario : "quantitative_risk_study"
    QuantitativeRiskScenario ||--o{ QuantitativeRiskHypothesis : "quantitative_risk_scenario"
    QuantitativeRiskStudy }o--o{ Actor : "reviewers"
    QuantitativeRiskStudy }o--o{ Actor : "authors"
    QuantitativeRiskScenario }o--o{ Asset : "assets"
    QuantitativeRiskScenario }o--o{ Actor : "owner"
    QuantitativeRiskScenario }o--o{ Vulnerability : "vulnerabilities"
    QuantitativeRiskScenario }o--o{ Threat : "threats"
    QuantitativeRiskScenario }o--o{ Terminology : "qualifications"
    QuantitativeRiskHypothesis }o--o{ AppliedControl : "existing_applied_controls"
    QuantitativeRiskHypothesis }o--o{ AppliedControl : "added_applied_controls"
    QuantitativeRiskHypothesis }o--o{ AppliedControl : "removed_applied_controls"
```

---

## 11. Resilience (Business Impact Analysis)

```mermaid
erDiagram
    BusinessImpactAnalysis {
        uuid id PK
        string name
        string description
        string version
        string status
        date eta
        date due_date
        bool is_locked
        uuid perimeter_id FK
        uuid risk_matrix_id FK
        uuid folder_id FK
    }

    AssetAssessment {
        uuid id PK
        bool recovery_documented
        bool recovery_tested
        bool recovery_targets_met
        uuid asset_id FK
        uuid bia_id FK
        uuid folder_id FK
    }

    EscalationThreshold {
        uuid id PK
        int point_in_time
        int quali_impact
        float quanti_impact
        string quanti_impact_unit
        uuid asset_assessment_id FK
        uuid folder_id FK
    }

    Perimeter ||--o{ BusinessImpactAnalysis : "perimeter"
    RiskMatrix ||--o{ BusinessImpactAnalysis : "risk_matrix"
    BusinessImpactAnalysis }o--o{ Actor : "reviewers"
    BusinessImpactAnalysis }o--o{ Actor : "authors"
    BusinessImpactAnalysis ||--o{ AssetAssessment : "bia"
    Asset ||--o{ AssetAssessment : "asset"
    AssetAssessment }o--o{ Asset : "dependencies"
    AssetAssessment }o--o{ AppliedControl : "associated_controls"
    AssetAssessment }o--o{ Evidence : "evidences"
    AssetAssessment }o--o{ Terminology : "qualifications"
    AssetAssessment ||--o{ EscalationThreshold : "asset_assessment"
    EscalationThreshold }o--o{ Terminology : "qualifications"
```

---

## 12. Metrology (Metrics & Dashboards)

```mermaid
erDiagram
    MetricDefinition {
        uuid id PK
        string urn
        string ref_id
        string name
        string description
        string category
        bool is_published
        bool higher_is_better
        float default_target
        json choices_definition
        uuid library_id FK
        uuid unit_id FK
        uuid folder_id FK
    }

    MetricInstance {
        uuid id PK
        string name
        string description
        string ref_id
        string status
        float target_value
        string collection_frequency
        uuid metric_definition_id FK
        uuid folder_id FK
    }

    CustomMetricSample {
        uuid id PK
        datetime timestamp
        json value
        uuid metric_instance_id FK
        uuid folder_id FK
    }

    BuiltinMetricSample {
        uuid id PK
        uuid content_type_id FK
        uuid object_id
        date date
        json metrics
    }

    Dashboard {
        uuid id PK
        string name
        string description
        string ref_id
        json dashboard_definition
        uuid folder_id FK
    }

    DashboardWidget {
        uuid id PK
        string title
        string chart_type
        string time_range
        string aggregation
        int position_x
        int position_y
        int width
        int height
        bool show_target
        bool show_legend
        json widget_config
        uuid dashboard_id FK
        uuid metric_instance_id FK
        uuid folder_id FK
    }

    LoadedLibrary ||--o{ MetricDefinition : "library"
    Terminology ||--o{ MetricDefinition : "unit"
    MetricDefinition ||--o{ MetricInstance : "metric_definition"
    MetricInstance ||--o{ CustomMetricSample : "metric_instance"
    MetricInstance }o--o{ Actor : "owner"
    Dashboard ||--o{ DashboardWidget : "dashboard"
    MetricInstance ||--o{ DashboardWidget : "metric_instance"
    OrganisationObjective }o--o{ MetricInstance : "metrics"
```

---

## 13. PMBOK (Project Management)

```mermaid
erDiagram
    GenericCollection {
        uuid id PK
        string name
        string description
        string ref_id
        uuid folder_id FK
    }

    Accreditation {
        uuid id PK
        string name
        string description
        string ref_id
        date expiry_date
        uuid category_id FK
        uuid authority_id FK
        uuid status_id FK
        uuid author_id FK
        uuid linked_collection_id FK
        uuid checklist_id FK
        uuid folder_id FK
    }

    GenericCollection }o--o{ GenericCollection : "dependencies"
    GenericCollection }o--o{ ComplianceAssessment : "compliance_assessments"
    GenericCollection }o--o{ RiskAssessment : "risk_assessments"
    GenericCollection }o--o{ QuantitativeRiskStudy : "quantitative_risk_studies"
    GenericCollection }o--o{ EbiosRMStudy : "ebios_rm_studies"
    GenericCollection }o--o{ EntityAssessment : "entity_assessments"
    GenericCollection }o--o{ FindingsAssessment : "findings_assessments"
    GenericCollection }o--o{ Evidence : "evidences"
    GenericCollection }o--o{ SecurityException : "security_exceptions"
    GenericCollection }o--o{ AppliedControl : "policies"
    Terminology ||--o{ Accreditation : "category"
    Entity ||--o{ Accreditation : "authority"
    Terminology ||--o{ Accreditation : "status"
    Actor ||--o{ Accreditation : "author"
    GenericCollection ||--o{ Accreditation : "linked_collection"
    ComplianceAssessment ||--o{ Accreditation : "checklist"
```

---

## 14. Integrations & Webhooks

```mermaid
erDiagram
    IntegrationProvider {
        uuid id PK
        string name
        string provider_type
        bool is_active
        uuid folder_id FK
    }

    IntegrationConfiguration {
        uuid id PK
        json credentials
        json settings
        string webhook_secret
        url webhook_url
        bool is_active
        datetime last_sync_at
        uuid provider_id FK
        uuid folder_id FK
    }

    SyncMapping {
        uuid id PK
        uuid content_type_id FK
        uuid local_object_id
        string remote_id
        json remote_data
        string sync_status
        datetime last_synced_at
        string last_sync_direction
        int version
        uuid configuration_id FK
        uuid folder_id FK
    }

    SyncEvent {
        int id PK
        string direction
        json changes
        string triggered_by
        bool success
        datetime created_at
        uuid mapping_id FK
    }

    WebhookEventType {
        uuid id PK
        string name
    }

    WebhookEndpoint {
        uuid id PK
        string name
        string description
        string payload_format
        url url
        string secret
        bool is_active
        uuid owner_id FK
        uuid folder_id FK
    }

    IntegrationProvider ||--o{ IntegrationConfiguration : "provider"
    IntegrationConfiguration ||--o{ SyncMapping : "configuration"
    SyncMapping ||--o{ SyncEvent : "mapping"
    WebhookEndpoint }o--o{ WebhookEventType : "event_types"
    WebhookEndpoint }o--o{ Folder : "target_folders"
    Actor ||--o{ WebhookEndpoint : "owner"
```

---

## 15. Global Settings & SSO

```mermaid
erDiagram
    GlobalSettings {
        uuid id PK
        string name
        json value
        uuid folder_id FK
    }

    SSOSettings {
        uuid id PK
        string name
        json value
        bool is_enabled
        bool force_sso
        string provider
        string provider_id
        string provider_name
        string client_id
        string secret
        json settings
        uuid folder_id FK
    }

    Folder ||--o{ GlobalSettings : "folder"
    GlobalSettings ||--|| SSOSettings : "inherits"
```
