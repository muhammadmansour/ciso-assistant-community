-- =============================================================================
-- PostgreSQL Schema for core_storedlibrary table only
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS core_storedlibrary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Identification
    urn VARCHAR(255),
    ref_id VARCHAR(100),
    provider VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    annotation TEXT,
    translations JSONB,
    
    -- Localization
    locale VARCHAR(100) NOT NULL DEFAULT 'en',
    default_locale BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Library metadata
    copyright VARCHAR(4096),
    version INTEGER NOT NULL,
    packager VARCHAR(100),
    publication_date DATE,
    builtin BOOLEAN NOT NULL DEFAULT FALSE,
    objects_meta JSONB NOT NULL DEFAULT '{}',
    dependencies JSONB,
    
    -- Storage
    is_loaded BOOLEAN NOT NULL DEFAULT FALSE,
    hash_checksum VARCHAR(64) NOT NULL,
    content JSONB NOT NULL,
    autoload BOOLEAN NOT NULL DEFAULT FALSE,
    
    CONSTRAINT core_storedlibrary_unique_urn_locale_version 
        UNIQUE (urn, locale, version)
);

CREATE INDEX IF NOT EXISTS idx_storedlibrary_urn ON core_storedlibrary(urn);
CREATE INDEX IF NOT EXISTS idx_storedlibrary_hash ON core_storedlibrary(hash_checksum);
CREATE INDEX IF NOT EXISTS idx_storedlibrary_is_loaded ON core_storedlibrary(is_loaded);
