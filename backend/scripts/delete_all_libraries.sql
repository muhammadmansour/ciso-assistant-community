-- ============================================================================
-- Script to delete ALL libraries from the CISO Assistant database (PostgreSQL)
-- ============================================================================
-- WARNING: This will permanently delete all library data!
-- Make sure to backup your database before running this script.
-- ============================================================================

-- Start a transaction for safety
BEGIN;

-- First, delete mapping-related tables
DELETE FROM core_requirementmapping;
DELETE FROM core_requirementmappingset;

-- Delete requirement nodes (they reference frameworks)
DELETE FROM core_requirementnode;

-- Delete all frameworks (they depend on loaded libraries)
DELETE FROM core_framework;

-- Delete all reference controls
DELETE FROM core_referencecontrol;

-- Delete all threats
DELETE FROM core_threat;

-- Delete all risk matrices
DELETE FROM core_riskmatrix;

-- Delete junction tables for libraries
DELETE FROM core_storedlibrary_filtering_labels;
DELETE FROM core_loadedlibrary_dependencies;

-- Delete loaded libraries
DELETE FROM core_loadedlibrary;

-- Delete stored libraries
DELETE FROM core_storedlibrary;

-- Delete orphaned library filtering labels
DELETE FROM core_libraryfilteringlabel;

-- Commit the transaction
COMMIT;

-- Verify deletion
SELECT 'Stored Libraries remaining:' as check_type, COUNT(*) as count FROM core_storedlibrary
UNION ALL
SELECT 'Loaded Libraries remaining:', COUNT(*) FROM core_loadedlibrary
UNION ALL
SELECT 'Frameworks remaining:', COUNT(*) FROM core_framework
UNION ALL
SELECT 'Reference Controls remaining:', COUNT(*) FROM core_referencecontrol
UNION ALL
SELECT 'Threats remaining:', COUNT(*) FROM core_threat
UNION ALL
SELECT 'Risk Matrices remaining:', COUNT(*) FROM core_riskmatrix
UNION ALL
SELECT 'Requirement Nodes remaining:', COUNT(*) FROM core_requirementnode;
