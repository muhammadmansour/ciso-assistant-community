-- ============================================================================
-- Script to delete ALL libraries from CISO Assistant database (SQLite)
-- ============================================================================
-- Run with: sqlite3 db/ciso-assistant.sqlite3 < backend/scripts/delete_all_libraries_sqlite.sql
-- ============================================================================

-- Delete dependent objects first
DELETE FROM core_framework;
DELETE FROM core_referencecontrol;
DELETE FROM core_threat;
DELETE FROM core_riskmatrix;
DELETE FROM core_requirementnode;
DELETE FROM core_requirementmappingset;

-- Delete junction tables
DELETE FROM core_storedlibrary_filtering_labels;
DELETE FROM core_loadedlibrary_dependencies;

-- Delete libraries
DELETE FROM core_loadedlibrary;
DELETE FROM core_storedlibrary;

-- Verify
SELECT 'Stored Libraries: ' || COUNT(*) FROM core_storedlibrary;
SELECT 'Loaded Libraries: ' || COUNT(*) FROM core_loadedlibrary;
