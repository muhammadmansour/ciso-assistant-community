# Cross-Database ERD Chain Design

## Organization Context → Objectives → Frameworks → Requirements → Compliance Risks → Controls

---

## 1. Architecture Overview

Two separate databases are involved:

| Database | Contains | Role |
|----------|----------|------|
| **DB1** (External Service) | `org_contexts`, `cs_sessions`, `policy_collections`, `policy_files`, `sessions`, `messages`, `local_prompts`, `policy_generation_history` | Stores organizational context and policy generation data |
| **DB2** (CISO Assistant) | `Framework`, `RequirementNode`, `ComplianceAssessment`, `RequirementAssessment`, `RiskScenario`, `AppliedControl`, `OrganisationObjective`, `ReferenceControl` | Stores compliance, risk, and control data |

DB1 stores CISO Assistant entity UUIDs in `org_contexts` fields and resolves them via the CISO Assistant REST API. No changes are needed in CISO Assistant.

---

## 2. CISO Assistant API Endpoints (No Changes Needed)

| Entity | Endpoint |
|--------|----------|
| Objectives | `GET /api/organisation-objectives/` and `GET /api/organisation-objectives/<uuid>/` |
| Frameworks | `GET /api/frameworks/` and `GET /api/frameworks/<uuid>/` |
| Requirements | `GET /api/requirement-nodes/?framework=<uuid>` |
| Compliance Assessments | `GET /api/compliance-assessments/?framework=<uuid>` |
| Requirement Assessments | `GET /api/requirement-assessments/?compliance_assessment=<uuid>` |
| Risk Scenarios | `GET /api/risk-scenarios/` and `GET /api/risk-scenarios/<uuid>/` |
| Applied Controls | `GET /api/applied-controls/` and `GET /api/applied-controls/<uuid>/` |

---

## 3. DB1 Schema Changes

### 3.1 org_contexts field usage

The existing TEXT fields store JSON arrays of CISO Assistant UUIDs:

```json
{
  "strategic_objectives": ["3fa85f64-5717-...", "7bc91a22-..."],
  "obligatory_frameworks": ["9de34f11-..."],
  "controls": ["1ab56c78-...", "2cd67d89-..."],
  "risk_scenarios": ["4ef12345-..."]
}
```

### 3.2 New Tables

```sql
-- Local cache of resolved CISO Assistant entities
CREATE TABLE IF NOT EXISTS ciso_entity_cache (
    id          TEXT PRIMARY KEY,          -- CISO Assistant UUID
    entity_type TEXT NOT NULL,             -- 'objective','framework','requirement',
                                           -- 'risk_scenario','applied_control',
                                           -- 'compliance_assessment','requirement_assessment'
    name        TEXT,
    ref_id      TEXT,
    status      TEXT,
    data        TEXT,                       -- full JSON response from API
    fetched_at  TEXT NOT NULL DEFAULT (datetime('now')),

    UNIQUE(id, entity_type)
);

CREATE INDEX idx_cache_type ON ciso_entity_cache(entity_type);

-- Explicit link table for the full chain per org_context
CREATE TABLE IF NOT EXISTS org_context_chain (
    id                          INTEGER PRIMARY KEY AUTOINCREMENT,
    org_context_id              TEXT NOT NULL REFERENCES org_contexts(id),

    -- each row captures one path through the chain
    objective_uuid              TEXT,    -- OrganisationObjective.id
    framework_uuid              TEXT,    -- Framework.id
    requirement_uuid            TEXT,    -- RequirementNode.id
    compliance_assessment_uuid  TEXT,    -- ComplianceAssessment.id
    requirement_assessment_uuid TEXT,    -- RequirementAssessment.id
    risk_scenario_uuid          TEXT,    -- RiskScenario.id
    applied_control_uuid        TEXT,    -- AppliedControl.id

    resolved_at                 TEXT DEFAULT (datetime('now')),

    FOREIGN KEY (org_context_id) REFERENCES org_contexts(id)
);

CREATE INDEX idx_chain_org ON org_context_chain(org_context_id);
CREATE INDEX idx_chain_fw  ON org_context_chain(framework_uuid);
```

---

## 4. Chain Resolution Flow

1. **Read** `org_contexts` to get the UUID arrays from `strategic_objectives`, `obligatory_frameworks`, `risk_scenarios`, `controls`
2. **Call** `GET /api/organisation-objectives/<uuid>/` for each objective UUID
3. **Call** `GET /api/frameworks/<uuid>/` for each framework UUID
4. **Call** `GET /api/requirement-nodes/?framework=<uuid>` to get requirements per framework
5. **Call** `GET /api/compliance-assessments/?framework=<uuid>` to get assessments per framework
6. **Call** `GET /api/requirement-assessments/?compliance_assessment=<uuid>` to get requirement assessments + their linked applied controls
7. **Call** `GET /api/risk-scenarios/<uuid>/` for each risk scenario UUID to get linked applied controls
8. **Insert** rows into `org_context_chain` and cache entity data in `ciso_entity_cache`

---

## 5. Example Data

### 5.1 org_contexts

| id | name_en | sector | strategic_objectives | obligatory_frameworks | risk_scenarios | controls |
|----|---------|--------|----------------------|-----------------------|----------------|----------|
| org-001 | Al Rajhi Bank | finance | ["obj-aaa","obj-bbb"] | ["fw-111","fw-222"] | ["rs-xxx","rs-yyy"] | ["ac-ppp","ac-qqq","ac-rrr"] |

### 5.2 ciso_entity_cache (fetched from CISO Assistant API)

| id | entity_type | name | ref_id | status |
|----|-------------|------|--------|--------|
| obj-aaa | objective | Protect customer data | OBJ-01 | in_progress |
| obj-bbb | objective | Achieve SAMA compliance | OBJ-02 | draft |
| fw-111 | framework | SAMA CSF | SAMA-CSF-1.0 | -- |
| fw-222 | framework | NCA ECC | NCA-ECC-2.0 | -- |
| req-101 | requirement | Access Control Policy | SAMA-3.3.1 | -- |
| req-102 | requirement | Encryption Standards | SAMA-3.4.2 | -- |
| req-201 | requirement | Cybersecurity Governance | ECC-1.1 | -- |
| rs-xxx | risk_scenario | Unauthorized data access | RS-01 | mitigate |
| rs-yyy | risk_scenario | Ransomware attack | RS-02 | mitigate |
| ac-ppp | applied_control | MFA for all users | AC-01 | active |
| ac-qqq | applied_control | AES-256 encryption at rest | AC-02 | in_progress |
| ac-rrr | applied_control | Incident response plan | AC-03 | active |

### 5.3 org_context_chain (resolved paths)

| id | org_context_id | objective_uuid | framework_uuid | requirement_uuid | risk_scenario_uuid | applied_control_uuid |
|----|----------------|----------------|----------------|------------------|--------------------|----------------------|
| 1 | org-001 | obj-aaa | fw-111 | req-101 | rs-xxx | ac-ppp |
| 2 | org-001 | obj-aaa | fw-111 | req-102 | rs-xxx | ac-qqq |
| 3 | org-001 | obj-bbb | fw-222 | req-201 | rs-yyy | ac-rrr |
| 4 | org-001 | obj-aaa | fw-111 | req-101 | rs-yyy | ac-ppp |

---

## 6. Main Query - Full Chain

```sql
SELECT
  c.id AS chain_id,
  oc.name_en AS org_context,
  obj.name AS objective,
  fw.name  AS framework,
  req.name AS requirement,
  rs.name  AS risk_scenario,
  ac.name  AS control
FROM org_context_chain c
JOIN org_contexts oc ON oc.id = c.org_context_id
LEFT JOIN ciso_entity_cache obj ON obj.id = c.objective_uuid
LEFT JOIN ciso_entity_cache fw  ON fw.id  = c.framework_uuid
LEFT JOIN ciso_entity_cache req ON req.id = c.requirement_uuid
LEFT JOIN ciso_entity_cache rs  ON rs.id  = c.risk_scenario_uuid
LEFT JOIN ciso_entity_cache ac  ON ac.id  = c.applied_control_uuid
WHERE oc.id = 'org-001';
```

### Result

| chain_id | org_context | objective | framework | requirement | risk_scenario | control |
|----------|-------------|-----------|-----------|-------------|---------------|---------|
| 1 | Al Rajhi Bank | Protect customer data | SAMA CSF | Access Control Policy | Unauthorized data access | MFA for all users |
| 2 | Al Rajhi Bank | Protect customer data | SAMA CSF | Encryption Standards | Unauthorized data access | AES-256 encryption at rest |
| 3 | Al Rajhi Bank | Achieve SAMA compliance | NCA ECC | Cybersecurity Governance | Ransomware attack | Incident response plan |
| 4 | Al Rajhi Bank | Protect customer data | SAMA CSF | Access Control Policy | Ransomware attack | MFA for all users |

### How to Read Each Row

Each row is one path through the full chain:

- **Row 1**: Al Rajhi Bank → wants to "Protect customer data" (objective) → under "SAMA CSF" (framework) → which requires "Access Control Policy" (requirement) → threatened by "Unauthorized data access" (risk) → mitigated by "MFA for all users" (control)
- **Row 2**: Al Rajhi Bank → wants to "Protect customer data" → under "SAMA CSF" → which requires "Encryption Standards" → threatened by "Unauthorized data access" → mitigated by "AES-256 encryption at rest"
- **Row 3**: Al Rajhi Bank → wants to "Achieve SAMA compliance" → under "NCA ECC" → which requires "Cybersecurity Governance" → threatened by "Ransomware attack" → mitigated by "Incident response plan"
- **Row 4**: Al Rajhi Bank → wants to "Protect customer data" → under "SAMA CSF" → which requires "Access Control Policy" → threatened by "Ransomware attack" → mitigated by "MFA for all users"

---

## 7. Useful Aggregate Queries

### 7.1 Controls per Framework

```sql
SELECT fw.name, COUNT(DISTINCT c.applied_control_uuid) AS control_count
FROM org_context_chain c
JOIN ciso_entity_cache fw ON fw.id = c.framework_uuid
WHERE c.org_context_id = 'org-001'
GROUP BY fw.name;
```

| framework | control_count |
|-----------|---------------|
| SAMA CSF | 2 |
| NCA ECC | 1 |

### 7.2 Unmitigated Risks (Risks with No Controls)

```sql
SELECT rs.name AS unmitigated_risk
FROM org_context_chain c
JOIN ciso_entity_cache rs ON rs.id = c.risk_scenario_uuid
WHERE c.org_context_id = 'org-001'
  AND c.applied_control_uuid IS NULL;
```

### 7.3 Coverage Summary per Objective

```sql
SELECT
  obj.name AS objective,
  COUNT(DISTINCT c.framework_uuid) AS frameworks,
  COUNT(DISTINCT c.requirement_uuid) AS requirements,
  COUNT(DISTINCT c.risk_scenario_uuid) AS risks,
  COUNT(DISTINCT c.applied_control_uuid) AS controls
FROM org_context_chain c
JOIN ciso_entity_cache obj ON obj.id = c.objective_uuid
WHERE c.org_context_id = 'org-001'
GROUP BY obj.name;
```

| objective | frameworks | requirements | risks | controls |
|-----------|------------|--------------|-------|----------|
| Protect customer data | 1 | 2 | 2 | 2 |
| Achieve SAMA compliance | 1 | 1 | 1 | 1 |

---

## 8. Policy Generation → GRC Policy Link (Missing Link)

### 8.1 The Problem

`library_urn` in `policy_generation_history` only resolves to a **Framework/Library** (e.g. `urn:intuitem:risk:library:sama-csf`). There is **no direct link** between the policy generated in DB1 and the actual Policy record in CISO Assistant's GRC.

### 8.2 What Is a Policy in CISO Assistant?

A Policy is **not a separate model** -- it is an `AppliedControl` with `category = "policy"`:

```python
# backend/core/models.py line 4887
class Policy(AppliedControl):
    class Meta:
        proxy = True  # Same database table as AppliedControl
    
    objects = PolicyManager()  # Filters queryset by category="policy"

    def save(self, *args, **kwargs):
        self.category = "policy"
        super(Policy, self).save(*args, **kwargs)
```

A GRC Policy is the same table as `AppliedControl` and is already connected to:

- `RequirementAssessment` (M2M) → then → `RequirementNode` → `Framework`
- `RiskScenario` (M2M)
- `ReferenceControl` (FK)
- `OrganisationObjective` (M2M)

**API endpoint**: `GET /api/policies/` (or `GET /api/applied-controls/?category=policy`)

### 8.3 The Gap

```
DB1                                          CISO Assistant (GRC)
----                                         --------------------

policy_files (uploaded docs)
    |
policy_collections (grouped docs)
    |
policy_generation_history
    |  library_urn ---------------------> Framework (reference standard)
    |  controls_count, nodes_count            |
    |                                    RequirementNode (requirements)
    |                                         |
    |                                    RequirementAssessment
    |                                         |
    +-- policy_uuid ----------------------> Policy (= AppliedControl, category="policy")
                                              ^
                                      THIS LINK IS MISSING!
```

`library_urn` tells you **which framework** was used, but nothing ties the generation output to an **actual Policy record** in the GRC.

### 8.4 The Fix: Add `policy_uuid` in DB1

```sql
-- Add to policy_generation_history
ALTER TABLE policy_generation_history 
ADD COLUMN policy_uuid TEXT;  -- UUID of the Policy created in CISO Assistant

-- Add to policy_collections
ALTER TABLE policy_collections 
ADD COLUMN policy_uuid TEXT;  -- The final Policy pushed to the GRC
```

### 8.5 Workflow to Close the Gap

**Step 1** -- After generating a policy, create it in CISO Assistant via the API:

```
POST /api/policies/
{
    "name": "Access Control Policy v2",
    "description": "Generated policy for SAMA CSF access control",
    "category": "policy",
    "folder": "<folder-uuid>",
    "reference_control": "<reference-control-uuid>",
    "status": "to_do"
}
```

The response returns the `id` (UUID) of the newly created Policy.

**Step 2** -- Store that UUID back in DB1:

```sql
UPDATE policy_generation_history 
SET policy_uuid = '<returned-uuid>' 
WHERE id = '<generation-id>';
```

**Step 3** -- Query the full chain from generation to GRC:

```sql
SELECT 
    pgh.id AS generation_id,
    pc.name AS collection_name,
    pgh.library_urn AS framework_ref,
    pgh.controls_count,
    pgh.confidence_score,
    cache.name AS grc_policy_name,
    cache.status AS grc_policy_status
FROM policy_generation_history pgh
JOIN policy_collections pc ON pc.id = pgh.collection_id
LEFT JOIN ciso_entity_cache cache ON cache.id = pgh.policy_uuid
WHERE pgh.collection_id = ?;
```

### 8.6 Link Status Summary

| Link | Exists? | Solution |
|------|---------|----------|
| `library_urn` → Framework | Yes (framework only) | Already sufficient for framework reference |
| Generated Policy → GRC Policy | **No -- missing** | Add `policy_uuid` to `policy_generation_history` and `policy_collections` |
| GRC Policy → Requirements | Yes (via `RequirementAssessment`) | Already exists in CISO Assistant |
| GRC Policy → Risk Scenarios | Yes (via `RiskScenario.applied_controls`) | Already exists in CISO Assistant |

**Bottom line**: After each generation, call `POST /api/policies/` to create the Policy in the GRC, then store the returned UUID in `policy_generation_history.policy_uuid`. That single field is the missing piece that completes the full chain.

---

## 9. Entity Mapping Reference

| Conceptual Name | CISO Assistant Model | DB1 Field in org_contexts |
|-----------------|---------------------|---------------------------|
| Organization Context | *(DB1 only)* | `org_contexts` table |
| Objectives | `OrganisationObjective` | `strategic_objectives` |
| Frameworks | `Framework` | `obligatory_frameworks` |
| Requirements | `RequirementNode` | *(resolved via Framework API)* |
| Compliance Risks | `RiskScenario` | `risk_scenarios` |
| Controls / Policies | `AppliedControl` / `Policy` (proxy) | `controls` / `policy_generation_history.policy_uuid` |

---

*Generated: 2026-04-08 -- Updated with Policy Generation link analysis*
