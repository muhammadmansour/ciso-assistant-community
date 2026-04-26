# Applied Control AI Analysis Feature

## Overview
Added "Start AI Analysis" button and "AI Report" tab to Applied Control detail pages.

## Features Added

### 1. Start AI Analysis Button
- **Location**: Top right of Applied Control detail page
- **Functionality**: 
  - Triggers AI analysis on all evidences associated with the applied control
  - Shows spinner animation while analyzing
  - Displays success/error flash messages
  - Automatically refreshes page after completion

### 2. AI Report Tab
- **Location**: Bottom tabs section (alongside Evidences, Tasks, etc.)
- **Content**:
  - **Summary Card**: Shows total evidences analyzed, entities extracted, and last update time
  - **Extracted Entities**: Visual display of all entities found across evidences (people, organizations, standards, controls, policies, etc.)
  - **Compliance Findings**: Lists compliance status for requirements
  - **Key Findings**: Bullet list of important discoveries from AI analysis

### 3. Backend Endpoints

#### GET `/api/applied-controls/{id}/ai-analysis/`
Returns aggregated AI analysis data from all linked evidences:
```json
{
  "totalEvidences": 5,
  "totalEntities": 42,
  "entities": [...],
  "complianceFindings": [...],
  "lastUpdated": "2026-02-08T10:30:00Z",
  "keyFindings": [...]
}
```

#### POST `/api/applied-controls/{id}/run-ai-analysis/`
Triggers AI analysis for all evidences with attachments:
```json
{
  "message": "AI analysis started for 5 evidence(s)",
  "evidenceCount": 5
}
```

## Files Modified/Created

### Frontend
- `frontend/src/routes/(app)/(internal)/applied-controls/[id=uuid]/+page.svelte` - Main UI with button and tabs
- `frontend/src/routes/(app)/(internal)/applied-controls/[id=uuid]/+page.server.ts` - Server actions and data loading

### Backend
- `backend/core/views.py` - Added `ai_analysis()` and `run_ai_analysis()` actions to `AppliedControlViewSet`

## UI Flow

1. User navigates to Applied Control (e.g., `/applied-controls/AC-1`)
2. User sees "Start AI Analysis" button with sparkle icon
3. User clicks button → Analysis starts on all linked evidences
4. Button shows spinner and "Analyzing..." text
5. After completion, flash message appears
6. User clicks "AI Report" tab to view results
7. Tab shows summary cards with insights from all evidences

## Technical Details

- Uses SvelteKit form actions for button functionality
- Leverages existing `run_evidence_auto_analysis` task from `core/tasks.py`
- Aggregates results from `Evidence.ai_analysis` and `Evidence.audit_analysis` fields
- Real-time UI updates using `invalidateAll()` after analysis completes
- Progressive enhancement: works even if JavaScript fails

## Benefits

- **Consolidated View**: See AI insights from all evidences in one place
- **One-Click Analysis**: No need to analyze each evidence individually
- **Visual Insights**: Entity badges, compliance status indicators, color-coded findings
- **Non-Blocking**: Analysis runs in background via Huey task queue
- **Scalable**: Handles multiple evidences efficiently

## Example Use Case

**Scenario**: Applied Control "AC-1: Access Control Policy" has 5 evidence documents attached.

1. Auditor clicks "Start AI Analysis"
2. System analyzes all 5 documents in parallel
3. AI Report tab shows:
   - 127 entities extracted (people, systems, policies)
   - 8 compliance requirements assessed
   - Key finding: "Access control policy approved by CISO on 2024-01-15"
4. Auditor reviews consolidated insights without opening each evidence file

## Dependencies

- Existing AI analysis infrastructure (Muraji API integration)
- `Evidence.ai_analysis` and `Evidence.audit_analysis` JSON fields
- Huey background task queue
- SvelteKit Tabs component from Skeleton UI

## Future Enhancements

- Export AI Report to PDF
- Filter entities by type
- Show confidence scores for findings
- Compare compliance across multiple applied controls
- Real-time progress indicator for analysis
