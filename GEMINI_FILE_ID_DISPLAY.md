# Gemini File Search ID Display Feature

## Overview
Added a "Gemini File ID" column to the Evidence Revisions table to display the Gemini File Search upload status and file IDs.

## Features Added

### 1. New Column in Evidence Revisions Table
- **Column Name**: "Gemini File ID" / "معرّف ملف Gemini" (Arabic)
- **Location**: Evidence detail page → "Associated versions" (Revisions) table
- **Displays**:
  - ✅ **Completed**: Green badge with truncated file ID (e.g., `abc123xyz789...`)
  - ⏳ **Uploading**: Yellow badge with spinner animation
  - ❌ **Failed**: Red badge with warning icon
  - **No upload**: Gray dash (—)

### 2. Visual Status Indicators
- **Completed** (Green): `✓ abc123xyz789...`
- **Uploading** (Yellow): `⟳ Uploading...`
- **Failed** (Red): `⚠ Failed`

### 3. Backend Serializer Enhancement
Added `file_search` field to `EvidenceRevisionReadSerializer` that returns:
```json
{
  "gemini_file_id": "files/abc123xyz789",
  "gemini_store_id": "projects/.../fileSearchStores/store123",
  "upload_status": "completed",
  "updated_at": "2026-02-08T10:30:00Z"
}
```

## Files Modified/Created

### Frontend
- ✅ `frontend/src/lib/components/ModelTable/GeminiFileIdDisplay.svelte` - New display component
- ✅ `frontend/src/lib/utils/table.ts` - Added `geminiFileId` to table columns
- ✅ `frontend/src/lib/utils/crud.ts` - Registered component & added import
- ✅ `frontend/messages/en.json` - Added "geminiFileId" translation
- ✅ `frontend/messages/ar.json` - Added Arabic translation

### Backend
- ✅ `backend/core/serializers.py` - Added `file_search` field to `EvidenceRevisionReadSerializer`

## Database Relationship

```
EvidenceRevision (1) ←→ (1) FileSearchTable
```

The `file_search` field uses the OneToOne relationship:
```python
# In FileSearchTable model
evidence_revision = models.OneToOneField(
    EvidenceRevision,
    related_name="file_search"
)
```

## UI Preview

### Table View
```
VERSION | FILE              | SIZE    | UPDATED AT          | GEMINI FILE ID
--------|-------------------|---------|---------------------|------------------
1       | audit_report.pdf  | 1.7 MB  | 2/8/2026, 4:21 PM  | ✓ abc123xyz789...
```

### Status Badges
- **Completed**: `[✓ abc123xyz789...] ` (Green)
- **Uploading**: `[⟳ Uploading...] ` (Yellow with spinner)
- **Failed**: `[⚠ Failed] ` (Red)
- **Not uploaded**: `—` (Gray)

## Technical Details

### Component Props
```typescript
interface Props {
  value: {
    gemini_file_id?: string;
    gemini_store_id?: string;
    upload_status?: 'pending' | 'uploading' | 'completed' | 'failed';
    updated_at?: string;
  }
}
```

### Status Logic
```typescript
isCompleted = uploadStatus === 'completed'
isPending = uploadStatus === 'pending' || uploadStatus === 'uploading'
isFailed = uploadStatus === 'failed'
```

### File ID Truncation
Shows first 12 characters of the file ID (after the last `/`):
```javascript
geminiFileId.split('/').pop()?.substring(0, 12) + '...'
// "files/abc123xyz789" → "abc123xyz789..."
```

## How It Works

1. **File Upload Flow**:
   ```
   User uploads evidence file
     ↓
   Django saves file (EvidenceRevision created)
     ↓
   Background task uploads to Gemini File Search
     ↓
   FileSearchTable entry created/updated with:
     - gemini_file_id
     - upload_status
     ↓
   Table displays status badge in "Gemini File ID" column
   ```

2. **Real-time Status Updates**:
   - Page refresh shows current upload status
   - Status badge updates from "Uploading..." → "✓ completed"
   - Failed uploads show error indicator

## Benefits

- **Visibility**: See which files are uploaded to Gemini at a glance
- **Status Tracking**: Monitor upload progress and failures
- **Troubleshooting**: Quickly identify files that failed to upload
- **Reference**: Access Gemini File IDs for API queries
- **Bilingual**: Full Arabic language support

## Future Enhancements

- Real-time status updates via WebSocket
- Retry button for failed uploads
- Copy-to-clipboard for full Gemini File ID
- Link to Gemini File Search store
- Bulk upload status indicator
- Upload progress percentage
