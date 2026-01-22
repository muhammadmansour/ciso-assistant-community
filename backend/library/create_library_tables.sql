-- =============================================================================
-- PostgreSQL Schema for CISO Assistant Library Storage
-- =============================================================================
-- This script creates the tables needed to store imported YAML library data
-- Run this AFTER the iam_folder table exists (Django IAM app migration)
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. LIBRARY FILTERING LABELS
-- =============================================================================
CREATE TABLE IF NOT EXISTS core_libraryfilteringlabel (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    label VARCHAR(100) NOT NULL,
    folder_id UUID NOT NULL REFERENCES iam_folder(id) ON DELETE CASCADE,
    
    CONSTRAINT core_libraryfilteringlabel_label_check 
        CHECK (label ~ '^[\w-]{1,36}$')
);

CREATE INDEX idx_libraryfilteringlabel_folder ON core_libraryfilteringlabel(folder_id);

-- =============================================================================
-- 2. STORED LIBRARY (Raw YAML content before loading)
-- =============================================================================
CREATE TABLE IF NOT EXISTS core_storedlibrary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- ReferentialObjectMixin fields
    urn VARCHAR(255) UNIQUE,
    ref_id VARCHAR(100),
    provider VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    annotation TEXT,
    translations JSONB,
    
    -- I18nObjectMixin fields
    locale VARCHAR(100) NOT NULL DEFAULT 'en',
    default_locale BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- LibraryMixin fields
    copyright VARCHAR(4096),
    version INTEGER NOT NULL,
    packager VARCHAR(100),
    publication_date DATE,
    builtin BOOLEAN NOT NULL DEFAULT FALSE,
    objects_meta JSONB NOT NULL DEFAULT '{}',
    dependencies JSONB,
    
    -- StoredLibrary specific fields
    is_loaded BOOLEAN NOT NULL DEFAULT FALSE,
    hash_checksum VARCHAR(64) NOT NULL,
    content JSONB NOT NULL,  -- Full YAML content stored as JSON
    autoload BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- FolderMixin
    folder_id UUID NOT NULL REFERENCES iam_folder(id) ON DELETE CASCADE,
    
    CONSTRAINT core_storedlibrary_unique_urn_locale_version 
        UNIQUE (urn, locale, version)
);

CREATE INDEX idx_storedlibrary_urn ON core_storedlibrary(urn);
CREATE INDEX idx_storedlibrary_hash ON core_storedlibrary(hash_checksum);
CREATE INDEX idx_storedlibrary_folder ON core_storedlibrary(folder_id);
CREATE INDEX idx_storedlibrary_is_loaded ON core_storedlibrary(is_loaded);

-- Junction table for StoredLibrary <-> LibraryFilteringLabel (M2M)
CREATE TABLE IF NOT EXISTS core_storedlibrary_filtering_labels (
    id SERIAL PRIMARY KEY,
    storedlibrary_id UUID NOT NULL REFERENCES core_storedlibrary(id) ON DELETE CASCADE,
    libraryfilteringlabel_id UUID NOT NULL REFERENCES core_libraryfilteringlabel(id) ON DELETE CASCADE,
    
    UNIQUE (storedlibrary_id, libraryfilteringlabel_id)
);

-- =============================================================================
-- 3. LOADED LIBRARY (Active/unpacked library)
-- =============================================================================
CREATE TABLE IF NOT EXISTS core_loadedlibrary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- ReferentialObjectMixin fields
    urn VARCHAR(255) UNIQUE,
    ref_id VARCHAR(100),
    provider VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    annotation TEXT,
    translations JSONB,
    
    -- I18nObjectMixin fields
    locale VARCHAR(100) NOT NULL DEFAULT 'en',
    default_locale BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- LibraryMixin fields
    copyright VARCHAR(4096),
    version INTEGER NOT NULL,
    packager VARCHAR(100),
    publication_date DATE,
    builtin BOOLEAN NOT NULL DEFAULT FALSE,
    objects_meta JSONB NOT NULL DEFAULT '{}',
    
    -- FolderMixin
    folder_id UUID NOT NULL REFERENCES iam_folder(id) ON DELETE CASCADE,
    
    CONSTRAINT core_loadedlibrary_unique_urn_locale_version 
        UNIQUE (urn, locale, version)
);

CREATE INDEX idx_loadedlibrary_urn ON core_loadedlibrary(urn);
CREATE INDEX idx_loadedlibrary_folder ON core_loadedlibrary(folder_id);

-- Junction table for LoadedLibrary dependencies (self-referential M2M)
CREATE TABLE IF NOT EXISTS core_loadedlibrary_dependencies (
    id SERIAL PRIMARY KEY,
    from_loadedlibrary_id UUID NOT NULL REFERENCES core_loadedlibrary(id) ON DELETE CASCADE,
    to_loadedlibrary_id UUID NOT NULL REFERENCES core_loadedlibrary(id) ON DELETE CASCADE,
    
    UNIQUE (from_loadedlibrary_id, to_loadedlibrary_id)
);

-- =============================================================================
-- 4. THREAT (Threat catalog from library)
-- =============================================================================
CREATE TABLE IF NOT EXISTS core_threat (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- ReferentialObjectMixin fields
    urn VARCHAR(255) UNIQUE,
    ref_id VARCHAR(100),
    provider VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    annotation TEXT,
    translations JSONB,
    
    -- Threat specific
    library_id UUID REFERENCES core_loadedlibrary(id) ON DELETE CASCADE,
    folder_id UUID NOT NULL REFERENCES iam_folder(id) ON DELETE CASCADE
);

CREATE INDEX idx_threat_urn ON core_threat(urn);
CREATE INDEX idx_threat_library ON core_threat(library_id);
CREATE INDEX idx_threat_folder ON core_threat(folder_id);

-- =============================================================================
-- 5. REFERENCE CONTROL (Control catalog from library)
-- =============================================================================
CREATE TABLE IF NOT EXISTS core_referencecontrol (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- ReferentialObjectMixin fields
    urn VARCHAR(255) UNIQUE,
    ref_id VARCHAR(100),
    provider VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    annotation TEXT,
    translations JSONB,
    
    -- I18nObjectMixin fields
    locale VARCHAR(100) NOT NULL DEFAULT 'en',
    default_locale BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- ReferenceControl specific fields
    category VARCHAR(20) CHECK (category IN ('policy', 'process', 'technical', 'physical', 'procedure')),
    csf_function VARCHAR(20) CHECK (csf_function IN ('govern', 'identify', 'protect', 'detect', 'respond', 'recover')),
    typical_evidence JSONB,
    
    -- Foreign keys
    library_id UUID REFERENCES core_loadedlibrary(id) ON DELETE CASCADE,
    folder_id UUID NOT NULL REFERENCES iam_folder(id) ON DELETE CASCADE
);

CREATE INDEX idx_referencecontrol_urn ON core_referencecontrol(urn);
CREATE INDEX idx_referencecontrol_library ON core_referencecontrol(library_id);
CREATE INDEX idx_referencecontrol_folder ON core_referencecontrol(folder_id);
CREATE INDEX idx_referencecontrol_category ON core_referencecontrol(category);

-- =============================================================================
-- 6. FRAMEWORK (Framework definition from library)
-- =============================================================================
CREATE TABLE IF NOT EXISTS core_framework (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- ReferentialObjectMixin fields
    urn VARCHAR(255) UNIQUE,
    ref_id VARCHAR(100),
    provider VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    annotation TEXT,
    translations JSONB,
    
    -- I18nObjectMixin fields
    locale VARCHAR(100) NOT NULL DEFAULT 'en',
    default_locale BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Framework specific fields
    min_score INTEGER NOT NULL DEFAULT 0,
    max_score INTEGER NOT NULL DEFAULT 100,
    scores_definition JSONB,
    implementation_groups_definition JSONB,
    
    -- Foreign keys
    library_id UUID REFERENCES core_loadedlibrary(id) ON DELETE CASCADE,
    folder_id UUID NOT NULL REFERENCES iam_folder(id) ON DELETE CASCADE
);

CREATE INDEX idx_framework_urn ON core_framework(urn);
CREATE INDEX idx_framework_library ON core_framework(library_id);
CREATE INDEX idx_framework_folder ON core_framework(folder_id);

-- =============================================================================
-- 7. REQUIREMENT NODE (Requirements tree from framework)
-- =============================================================================
CREATE TABLE IF NOT EXISTS core_requirementnode (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- ReferentialObjectMixin fields
    urn VARCHAR(255) UNIQUE,
    ref_id VARCHAR(100),
    provider VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    annotation TEXT,
    translations JSONB,
    
    -- I18nObjectMixin fields
    locale VARCHAR(100) NOT NULL DEFAULT 'en',
    default_locale BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- RequirementNode specific fields
    parent_urn VARCHAR(255),
    order_id INTEGER,
    implementation_groups JSONB,
    assessable BOOLEAN NOT NULL DEFAULT FALSE,
    typical_evidence TEXT,
    questions JSONB,
    weight INTEGER NOT NULL DEFAULT 1,
    importance VARCHAR(20) NOT NULL DEFAULT 'undefined' 
        CHECK (importance IN ('mandatory', 'recommended', 'nice_to_have', 'undefined')),
    
    -- Foreign keys
    framework_id UUID REFERENCES core_framework(id) ON DELETE CASCADE,
    folder_id UUID NOT NULL REFERENCES iam_folder(id) ON DELETE CASCADE
);

CREATE INDEX idx_requirementnode_urn ON core_requirementnode(urn);
CREATE INDEX idx_requirementnode_parent_urn ON core_requirementnode(parent_urn);
CREATE INDEX idx_requirementnode_framework ON core_requirementnode(framework_id);
CREATE INDEX idx_requirementnode_folder ON core_requirementnode(folder_id);
CREATE INDEX idx_requirementnode_assessable ON core_requirementnode(assessable);
CREATE INDEX idx_requirementnode_order ON core_requirementnode(order_id);

-- Junction table for RequirementNode <-> Threat (M2M)
CREATE TABLE IF NOT EXISTS core_requirementnode_threats (
    id SERIAL PRIMARY KEY,
    requirementnode_id UUID NOT NULL REFERENCES core_requirementnode(id) ON DELETE CASCADE,
    threat_id UUID NOT NULL REFERENCES core_threat(id) ON DELETE CASCADE,
    
    UNIQUE (requirementnode_id, threat_id)
);

-- Junction table for RequirementNode <-> ReferenceControl (M2M)
CREATE TABLE IF NOT EXISTS core_requirementnode_reference_controls (
    id SERIAL PRIMARY KEY,
    requirementnode_id UUID NOT NULL REFERENCES core_requirementnode(id) ON DELETE CASCADE,
    referencecontrol_id UUID NOT NULL REFERENCES core_referencecontrol(id) ON DELETE CASCADE,
    
    UNIQUE (requirementnode_id, referencecontrol_id)
);

-- =============================================================================
-- 8. RISK MATRIX (Risk matrix definition from library)
-- =============================================================================
CREATE TABLE IF NOT EXISTS core_riskmatrix (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- ReferentialObjectMixin fields
    urn VARCHAR(255) UNIQUE,
    ref_id VARCHAR(100),
    provider VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    annotation TEXT,
    translations JSONB,
    
    -- I18nObjectMixin fields
    locale VARCHAR(100) NOT NULL DEFAULT 'en',
    default_locale BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- RiskMatrix specific fields (stored as JSON arrays)
    probability JSONB NOT NULL,  -- Array of probability levels
    impact JSONB NOT NULL,       -- Array of impact levels
    risk JSONB NOT NULL,         -- Array of risk levels
    grid JSONB NOT NULL,         -- 2D matrix grid
    strength_of_knowledge JSONB, -- Optional SoK levels
    
    -- Foreign keys
    library_id UUID REFERENCES core_loadedlibrary(id) ON DELETE CASCADE,
    folder_id UUID NOT NULL REFERENCES iam_folder(id) ON DELETE CASCADE
);

CREATE INDEX idx_riskmatrix_urn ON core_riskmatrix(urn);
CREATE INDEX idx_riskmatrix_library ON core_riskmatrix(library_id);
CREATE INDEX idx_riskmatrix_folder ON core_riskmatrix(folder_id);

-- =============================================================================
-- UTILITY VIEWS
-- =============================================================================

-- View to see all loaded frameworks with their requirement counts
CREATE OR REPLACE VIEW v_framework_summary AS
SELECT 
    f.id,
    f.urn,
    f.name,
    f.provider,
    ll.name as library_name,
    ll.version as library_version,
    COUNT(rn.id) as total_requirements,
    COUNT(CASE WHEN rn.assessable = TRUE THEN 1 END) as assessable_requirements
FROM core_framework f
LEFT JOIN core_loadedlibrary ll ON f.library_id = ll.id
LEFT JOIN core_requirementnode rn ON rn.framework_id = f.id
GROUP BY f.id, f.urn, f.name, f.provider, ll.name, ll.version;

-- View to see library loading status
CREATE OR REPLACE VIEW v_library_status AS
SELECT 
    sl.urn,
    sl.name,
    sl.version,
    sl.locale,
    sl.is_loaded,
    sl.builtin,
    sl.autoload,
    ll.id as loaded_library_id,
    sl.created_at as stored_at,
    ll.created_at as loaded_at
FROM core_storedlibrary sl
LEFT JOIN core_loadedlibrary ll ON sl.urn = ll.urn AND sl.locale = ll.locale AND sl.version = ll.version;

-- =============================================================================
-- COMMENTS
-- =============================================================================
COMMENT ON TABLE core_storedlibrary IS 'Stores raw YAML library content before loading/unpacking';
COMMENT ON TABLE core_loadedlibrary IS 'Active libraries with unpacked content in related tables';
COMMENT ON TABLE core_framework IS 'Framework definitions (e.g., ISO 27001, NIST CSF, ECC)';
COMMENT ON TABLE core_requirementnode IS 'Hierarchical requirements tree within a framework';
COMMENT ON TABLE core_referencecontrol IS 'Control catalog that can be linked to requirements';
COMMENT ON TABLE core_threat IS 'Threat catalog from security libraries';
COMMENT ON TABLE core_riskmatrix IS 'Risk matrix definitions for risk assessments';

COMMENT ON COLUMN core_storedlibrary.content IS 'Full YAML library content stored as JSONB';
COMMENT ON COLUMN core_storedlibrary.hash_checksum IS 'SHA256 hash to detect duplicate libraries';
COMMENT ON COLUMN core_requirementnode.parent_urn IS 'URN of parent node for building requirement tree';
COMMENT ON COLUMN core_requirementnode.assessable IS 'Whether this requirement can be directly assessed';
COMMENT ON COLUMN core_requirementnode.implementation_groups IS 'JSON array of applicable implementation groups';
