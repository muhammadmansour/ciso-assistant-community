# Muraji API Request Structure for Applied Control Analysis

## API Endpoint
```
POST https://muraji-hrsd.wathbahs.com/api/audit/analyze
```

## Request Headers
```json
{
  "Content-Type": "application/json"
}
```

## Request Body Structure

### Complete JSON Structure
```json
{
  "applied_control": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "ref_id": "AC-1",
    "name": "Access Control Policy",
    "description": "Develop, document, and disseminate access control policy...",
    "status": "active",
    "category": "policy",
    "csf_function": "protect"
  },
  "gemini_file_search": {
    "file_ids": [
      "files/abc123xyz789",
      "files/def456uvw012",
      "files/ghi789rst345"
    ],
    "store_id": "projects/my-project/locations/us-central1/fileSearchStores/store123",
    "evidences": [
      {
        "gemini_file_id": "files/abc123xyz789",
        "gemini_store_id": "projects/my-project/locations/us-central1/fileSearchStores/store123",
        "evidence_name": "Access Control Policy Document",
        "evidence_description": "Official access control policy approved by CISO"
      },
      {
        "gemini_file_id": "files/def456uvw012",
        "gemini_store_id": "projects/my-project/locations/us-central1/fileSearchStores/store123",
        "evidence_name": "Access Control Procedures",
        "evidence_description": "Detailed procedures for implementing access controls"
      }
    ]
  },
  "requirements": [
    {
      "ref_id": "AC-1",
      "name": "Access Control Policy and Procedures",
      "description": "The organization develops, documents, and disseminates...",
      "framework": "NIST 800-53",
      "provider": "NIST"
    },
    {
      "ref_id": "AC-2",
      "name": "Account Management",
      "description": "The organization manages information system accounts...",
      "framework": "NIST 800-53",
      "provider": "NIST"
    }
  ],
  "questions": [
    "Does the organization have a documented access control policy?",
    "Has the policy been reviewed and approved by senior management?",
    "Are procedures in place for implementing access controls?",
    "How often is the access control policy reviewed and updated?"
  ],
  "typical_evidence": [
    "Access control policy document",
    "Policy approval documentation",
    "Procedure manuals",
    "Review and update records",
    "Training materials",
    "Audit logs"
  ],
  "analysis_config": {
    "include_entity_extraction": true,
    "include_compliance_check": true,
    "include_gap_analysis": true,
    "include_recommendations": true
  }
}
```

## Field Descriptions

### 1. `applied_control` (Object)
Basic information about the applied control being analyzed.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier of the applied control |
| `ref_id` | String | Reference ID (e.g., "AC-1") |
| `name` | String | Name of the control |
| `description` | String | Detailed description |
| `status` | String | Current status (active, inactive, etc.) |
| `category` | String | Control category |
| `csf_function` | String | CSF function (identify, protect, etc.) |

### 2. `gemini_file_search` (Object)
Gemini File Search identifiers for evidence files.

| Field | Type | Description |
|-------|------|-------------|
| `file_ids` | Array<String> | List of Gemini file IDs |
| `store_id` | String | Gemini File Search Store ID |
| `evidences` | Array<Object> | Detailed evidence information |

#### `evidences` Array Items:
```json
{
  "gemini_file_id": "files/abc123xyz789",
  "gemini_store_id": "projects/.../store123",
  "evidence_name": "Document name",
  "evidence_description": "Description"
}
```

### 3. `requirements` (Array<Object>)
Compliance requirements linked to this control.

| Field | Type | Description |
|-------|------|-------------|
| `ref_id` | String | Requirement reference ID |
| `name` | String | Requirement name |
| `description` | String | Requirement description |
| `framework` | String | Framework name (e.g., "NIST 800-53") |
| `provider` | String | Framework provider (e.g., "NIST") |

### 4. `questions` (Array<String>)
Assessment questions extracted from requirement nodes.

**Example:**
```json
[
  "Does the organization have a documented access control policy?",
  "Has the policy been reviewed and approved by senior management?"
]
```

### 5. `typical_evidence` (Array<String>)
Expected evidence items from requirement nodes.

**Example:**
```json
[
  "Access control policy document",
  "Policy approval documentation",
  "Procedure manuals"
]
```

### 6. `analysis_config` (Object)
Configuration for the analysis.

| Field | Type | Description |
|-------|------|-------------|
| `include_entity_extraction` | Boolean | Extract entities from files |
| `include_compliance_check` | Boolean | Check compliance status |
| `include_gap_analysis` | Boolean | Identify gaps |
| `include_recommendations` | Boolean | Provide recommendations |

## Expected Response Structure

```json
{
  "success": true,
  "analysis_id": "analysis_abc123",
  "timestamp": "2026-02-08T10:30:00Z",
  "results": {
    "entities_extracted": {
      "total": 45,
      "by_type": {
        "PERSON": 12,
        "ORGANIZATION": 8,
        "POLICY": 5,
        "STANDARD": 10,
        "CONTROL": 10
      },
      "entities": [
        {
          "text": "Chief Information Security Officer",
          "type": "PERSON",
          "confidence": 0.95,
          "source": "files/abc123xyz789"
        }
      ]
    },
    "compliance_status": {
      "overall_score": 85,
      "compliant_requirements": 18,
      "non_compliant_requirements": 3,
      "findings": [
        {
          "requirement": "AC-1",
          "status": "compliant",
          "confidence": 0.92,
          "evidence_found": ["Policy document", "Approval signature"],
          "gaps": []
        }
      ]
    },
    "gap_analysis": {
      "identified_gaps": [
        {
          "requirement": "AC-2",
          "gap": "No evidence of quarterly policy review",
          "severity": "medium",
          "recommendation": "Implement quarterly review process"
        }
      ]
    },
    "recommendations": [
      "Document the quarterly review process",
      "Maintain review meeting minutes",
      "Update the policy to reflect current practices"
    ],
    "summary": "The access control implementation is mostly compliant..."
  }
}
```

## Error Response

```json
{
  "success": false,
  "error": "Invalid Gemini File Search ID",
  "details": "File ID 'files/invalid' not found in store",
  "timestamp": "2026-02-08T10:30:00Z"
}
```

## Usage Example (Python)

```python
import requests

url = "https://muraji-hrsd.wathbahs.com/api/audit/analyze"

payload = {
    "applied_control": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "ref_id": "AC-1",
        "name": "Access Control Policy",
        # ... other fields
    },
    "gemini_file_search": {
        "file_ids": ["files/abc123", "files/def456"],
        "store_id": "projects/.../store123",
        # ... other fields
    },
    # ... other sections
}

response = requests.post(url, json=payload)
result = response.json()
print(result)
```

## Notes

- All Gemini File Search IDs must be from completed uploads (`upload_status = 'completed'`)
- Questions and typical evidence are deduplicated before sending
- Timeout is set to 5 minutes (300 seconds) for large files
- The API uses Gemini File Search for semantic document retrieval
- Results are stored in the database for future reference
