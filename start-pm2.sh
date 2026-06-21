#!/bin/bash
# CISO Assistant - PM2 zain (Linux)
# Public URL: https://zain-grc.wathbah.dev
# Ports: backend 8001, frontend 3001 (matches nginx upstream dev-backend / dev-frontend)
# Before start: cd frontend && pnpm run build:staging
#
# DB name is POSTGRES_NAME (e.g. zain). Schema for tables is POSTGRES_SEARCH_PATH (can match: zain).
# If migrate fails on public, once as postgres:
#   sudo -u postgres psql -d "zain" -c 'CREATE SCHEMA IF NOT EXISTS "zain" AUTHORIZATION "zain";'
# Default POSTGRES_SEARCH_PATH=zain. Disable with: POSTGRES_SEARCH_PATH= ./start-pm2.sh start

set -e

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Source server-local env overrides if present.
# This file is NOT tracked in git, lives outside the repo, and survives
# `git reset --hard origin/zain-version` from the deploy workflow.
# Use it for secrets / per-host settings, e.g.:
#   echo 'POSTGRES_PASSWORD=...'                    >> ~/.ciso-zain.env
#   echo 'USE_GCS=True'                             >> ~/.ciso-zain.env
#   echo 'GEMINI_INDEX_MAX_WAIT_SECONDS=3600'      >> ~/.ciso-zain.env   # optional; Huey waits for indexing
#   echo 'GS_BUCKET_NAME=zain-env'                  >> ~/.ciso-zain.env
#   echo 'GS_PROJECT_ID=api-project-799674531429'   >> ~/.ciso-zain.env
#   chmod 600 ~/.ciso-zain.env
#
# GCS authentication: leave GOOGLE_APPLICATION_CREDENTIALS UNSET to use
# Application Default Credentials (the GCE VM's attached service account).
# Only set it if you have a service-account JSON key file you want to use
# explicitly:
#   echo 'GOOGLE_APPLICATION_CREDENTIALS=/etc/ciso/ciso-storage.json' \
#                                                   >> ~/.ciso-zain.env
if [ -f "$HOME/.ciso-zain.env" ]; then
    set -a
    # shellcheck disable=SC1090
    . "$HOME/.ciso-zain.env"
    set +a
fi

# Configuration
DOMAIN="zain-grc.wathbah.dev"
PUBLIC_URL="https://${DOMAIN}"
BACKEND_PORT=8001
FRONTEND_PORT=3001

# PostgreSQL (override when invoking: POSTGRES_PASSWORD=... ./start-pm2.sh start)
POSTGRES_NAME="${POSTGRES_NAME:-zain}"
POSTGRES_USER="${POSTGRES_USER:-zain}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-zain}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
# ${VAR-default} only when unset; empty POSTGRES_SEARCH_PATH= disables (use public only)
POSTGRES_SEARCH_PATH="${POSTGRES_SEARCH_PATH-zain}"

# Object storage (S3 / Google Cloud Storage). Default = local filesystem.
# Set via ~/.ciso-zain.env on the server to flip to GCS without editing
# this script. USE_S3 and USE_GCS are mutually exclusive (settings.py exits
# fast if both are True).
USE_S3="${USE_S3:-False}"
USE_GCS="${USE_GCS:-False}"
GS_BUCKET_NAME="${GS_BUCKET_NAME:-}"
GS_PROJECT_ID="${GS_PROJECT_ID:-}"
# Empty default → Application Default Credentials (GCE VM service account).
# Set explicitly in ~/.ciso-zain.env if you want to use a JSON key file.
GOOGLE_APPLICATION_CREDENTIALS="${GOOGLE_APPLICATION_CREDENTIALS:-}"
GS_LOCATION="${GS_LOCATION:-}"
GS_SIGNED_URL_EXPIRATION_SECONDS="${GS_SIGNED_URL_EXPIRATION_SECONDS:-900}"
# Disable mTLS for the GCE metadata server. google-auth 2.48-2.49.x has
# bugs in this code path (AttributeError: 'Request' has no 'session' on
# 2.48; project_id=None on 2.49.x). The metadata server is on a private
# link-local IP (169.254.169.254) and plain HTTP is safe.
# Refs: googleapis/google-cloud-python#16035, #16090
GCE_METADATA_MTLS_MODE="${GCE_METADATA_MTLS_MODE:-none}"

# Gemini File Search (used by the AI analysis flow). Both must reach the
# huey worker AND the gunicorn process (the analysis HTTP endpoint also
# instantiates the client). Sourced from ~/.ciso-zain.env above.
GEMINI_API_KEY="${GEMINI_API_KEY:-}"
GEMINI_FILE_SEARCH_STORE_NAME="${GEMINI_FILE_SEARCH_STORE_NAME:-}"
GEMINI_MODEL="${GEMINI_MODEL:-gemini-2.5-pro}"
# Gemini long-running indexing wait (huey worker + optional sync paths).
# Override in ~/.ciso-zain.env if needed; indexing must reach the Huey process.
GEMINI_INDEX_MAX_WAIT_SECONDS="${GEMINI_INDEX_MAX_WAIT_SECONDS:-1800}"
MURAJI_ANALYSIS_API_URL="${MURAJI_ANALYSIS_API_URL:-https://muraji-api.wathbahs.com/api/audit/analyze}"

# PM2 allowlist: only these process names are stop/restart/delete — never "pm2 stop all".
# Other PM2 apps on the host (e.g. ciso-stage-*, production) are left running.
CISO_APPS="dev-backend dev-frontend dev-huey"

# Directories
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Public app URL for email deep links / logo. settings.py loads backend/.env
# with override=True, so that file is authoritative at runtime; mirror it here
# so PM2's injected value (and /proc, logs) matches instead of a stale hardcode.
# Precedence: backend/.env > PUBLIC_URL fallback.
_env_ciso_url=""
if [ -f "$BACKEND_DIR/.env" ]; then
    _env_ciso_url="$(grep -E '^[[:space:]]*CISO_ASSISTANT_URL=' "$BACKEND_DIR/.env" | tail -1 | cut -d= -f2- | tr -d '"' | xargs)"
fi
CISO_ASSISTANT_URL="${_env_ciso_url:-$PUBLIC_URL}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Ensure PATH includes local bins
export PATH="$HOME/.local/bin:$PATH"

echo -e "${GREEN}========================================"
echo "  CISO Assistant - PM2 zain (${DOMAIN})"
echo -e "========================================${NC}"

# Surface object-storage configuration up front so deploys are easy to debug.
if [ "$USE_GCS" = "True" ]; then
    echo -e "${GREEN}Storage backend: Google Cloud Storage (bucket=${GS_BUCKET_NAME})${NC}"
    if [ -n "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
        # Explicit JSON key path: must exist or settings.py will exit.
        if [ ! -f "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
            echo -e "${YELLOW}Warning: USE_GCS=True but credentials file not found at${NC}"
            echo -e "${YELLOW}  ${GOOGLE_APPLICATION_CREDENTIALS}${NC}"
            echo -e "${YELLOW}Backend will fail to start until this file exists,${NC}"
            echo -e "${YELLOW}or unset GOOGLE_APPLICATION_CREDENTIALS to use ADC.${NC}"
        else
            echo -e "${GREEN}GCS auth: service-account JSON (${GOOGLE_APPLICATION_CREDENTIALS})${NC}"
        fi
    else
        # No key file → Application Default Credentials.
        # On a GCE VM this means the VM's attached service account is used
        # (keyless). The VM must have an SA attached with Storage Object
        # Admin on the bucket, and access scope `cloud-platform` (or at
        # least `devstorage.read_write`).
        echo -e "${GREEN}GCS auth: Application Default Credentials (keyless / GCE VM SA)${NC}"
    fi
elif [ "$USE_S3" = "True" ]; then
    echo -e "${GREEN}Storage backend: S3 (${AWS_STORAGE_BUCKET_NAME:-?})${NC}"
else
    echo -e "${GREEN}Storage backend: local filesystem${NC}"
fi

# Gemini AI analysis configuration. Missing values silently break the
# entire Run AI Analysis flow, so we surface them here.
if [ -n "$GEMINI_API_KEY" ]; then
    masked="${GEMINI_API_KEY:0:6}…${GEMINI_API_KEY: -4}"
    echo -e "${GREEN}Gemini API key: ${masked}${NC}"
else
    echo -e "${YELLOW}Warning: GEMINI_API_KEY is not set in ~/.ciso-zain.env — AI analysis will fail with a 'client not configured' error.${NC}"
fi
if [ -n "$GEMINI_FILE_SEARCH_STORE_NAME" ]; then
    echo -e "${GREEN}Gemini File Search store: ${GEMINI_FILE_SEARCH_STORE_NAME}${NC}"
else
    echo -e "${YELLOW}Warning: GEMINI_FILE_SEARCH_STORE_NAME is not set — evidences cannot be indexed.${NC}"
fi
echo -e "${GREEN}Gemini indexing max wait: ${GEMINI_INDEX_MAX_WAIT_SECONDS}s (Huey + backend PM2 env)${NC}"
echo -e "${GREEN}Muraji audit URL: ${MURAJI_ANALYSIS_API_URL}${NC}"
echo -e "${GREEN}CISO_ASSISTANT_URL: ${CISO_ASSISTANT_URL}${NC}"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    sudo npm install -g pm2
fi

# Create PM2 ecosystem config (Gunicorn + adapter-node).
# Gunicorn --timeout must exceed Muraji/outbound AI HTTP waits (views use requests timeout=300s)
# or workers die mid-request with CRITICAL WORKER TIMEOUT while the upstream call is still alive.
# Unquoted EOF: substitute POSTGRES_* / DB_*; PATH uses require('os') so bash does not expand $PATH.
cat > "$SCRIPT_DIR/ecosystem.config.js" << EOF
const os = require('os');
module.exports = {
  apps: [
    {
      // BACKEND - Gunicorn on dev port 8001 (matches nginx upstream dev-backend)
      name: 'dev-backend',
      cwd: './backend',
      script: 'poetry',
      args: 'run gunicorn --chdir ciso_assistant --bind 0.0.0.0:8001 --workers 4 --timeout 360 --keep-alive 30 --access-logfile ../logs/dev-gunicorn-access.log ciso_assistant.wsgi:application',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,backend,zain-grc.wathbah.dev',
        CISO_ASSISTANT_URL: '${CISO_ASSISTANT_URL}',
        CSRF_TRUSTED_ORIGINS: 'https://zain-grc.wathbah.dev',
        AUTH_TOKEN_TTL: '7200',
        ATTACHMENT_MAX_SIZE_MB: '1000',
        ATTACHMENT_MAX_NAME_LENGTH: '512',
        POSTGRES_NAME: '${POSTGRES_NAME}',
        POSTGRES_USER: '${POSTGRES_USER}',
        POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}',
        DB_HOST: '${DB_HOST}',
        DB_PORT: '${DB_PORT}',
        POSTGRES_SEARCH_PATH: '${POSTGRES_SEARCH_PATH}',
        USE_S3: '${USE_S3}',
        USE_GCS: '${USE_GCS}',
        GS_BUCKET_NAME: '${GS_BUCKET_NAME}',
        GS_PROJECT_ID: '${GS_PROJECT_ID}',
        GOOGLE_APPLICATION_CREDENTIALS: '${GOOGLE_APPLICATION_CREDENTIALS}',
        GCE_METADATA_MTLS_MODE: '${GCE_METADATA_MTLS_MODE}',
        GS_LOCATION: '${GS_LOCATION}',
        GS_SIGNED_URL_EXPIRATION_SECONDS: '${GS_SIGNED_URL_EXPIRATION_SECONDS}',
        GEMINI_API_KEY: '${GEMINI_API_KEY}',
        GEMINI_FILE_SEARCH_STORE_NAME: '${GEMINI_FILE_SEARCH_STORE_NAME}',
        GEMINI_MODEL: '${GEMINI_MODEL}',
        GEMINI_INDEX_MAX_WAIT_SECONDS: '${GEMINI_INDEX_MAX_WAIT_SECONDS}',
        MURAJI_ANALYSIS_API_URL: '${MURAJI_ANALYSIS_API_URL}',
        PATH: os.homedir() + '/.local/bin:' + (process['env']['PATH'] || '')
      },
      watch: false,
      max_memory_restart: '2G',
      error_file: './logs/dev-backend-error.log',
      out_file: './logs/dev-backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'dev-huey',
      cwd: './backend',
      script: 'poetry',
      args: 'run python manage.py run_huey -w 2 --scheduler-interval 60',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,zain-grc.wathbah.dev',
        CISO_ASSISTANT_URL: '${CISO_ASSISTANT_URL}',
        POSTGRES_NAME: '${POSTGRES_NAME}',
        POSTGRES_USER: '${POSTGRES_USER}',
        POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}',
        DB_HOST: '${DB_HOST}',
        DB_PORT: '${DB_PORT}',
        POSTGRES_SEARCH_PATH: '${POSTGRES_SEARCH_PATH}',
        USE_S3: '${USE_S3}',
        USE_GCS: '${USE_GCS}',
        GS_BUCKET_NAME: '${GS_BUCKET_NAME}',
        GS_PROJECT_ID: '${GS_PROJECT_ID}',
        GOOGLE_APPLICATION_CREDENTIALS: '${GOOGLE_APPLICATION_CREDENTIALS}',
        GCE_METADATA_MTLS_MODE: '${GCE_METADATA_MTLS_MODE}',
        GS_LOCATION: '${GS_LOCATION}',
        GS_SIGNED_URL_EXPIRATION_SECONDS: '${GS_SIGNED_URL_EXPIRATION_SECONDS}',
        GEMINI_API_KEY: '${GEMINI_API_KEY}',
        GEMINI_FILE_SEARCH_STORE_NAME: '${GEMINI_FILE_SEARCH_STORE_NAME}',
        GEMINI_MODEL: '${GEMINI_MODEL}',
        GEMINI_INDEX_MAX_WAIT_SECONDS: '${GEMINI_INDEX_MAX_WAIT_SECONDS}',
        MURAJI_ANALYSIS_API_URL: '${MURAJI_ANALYSIS_API_URL}',
        PATH: os.homedir() + '/.local/bin:' + (process['env']['PATH'] || '')
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/dev-huey-error.log',
      out_file: './logs/dev-huey-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // FRONTEND - adapter-node on dev port 3001 (matches nginx upstream dev-frontend)
      name: 'dev-frontend',
      cwd: './frontend',
      script: 'node',
      args: 'build/index.js',
      interpreter: 'none',
      env: {
        HOST: '0.0.0.0',
        PORT: '3001',
        NODE_ENV: 'production',
        PUBLIC_BACKEND_API_URL: 'http://127.0.0.1:8001/api',
        PUBLIC_BACKEND_API_EXPOSED_URL: 'https://zain-grc.wathbah.dev/api',
        ORIGIN: 'https://zain-grc.wathbah.dev',
        PROTOCOL_HEADER: 'x-forwarded-proto',
        PUBLIC_DEFAULT_LANGUAGE: 'en',
        BODY_SIZE_LIMIT: '104857600'
      },
      watch: false,
      max_memory_restart: '2G',
      error_file: './logs/dev-frontend-error.log',
      out_file: './logs/dev-frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
EOF

# Create logs directories
mkdir -p "$SCRIPT_DIR/logs"
mkdir -p "$BACKEND_DIR/logs"

# Function to run migrations
#
# Deploys must NEVER call `makemigrations`: any model-level change must come in
# via a committed migration file. Running `makemigrations` on the server has
# historically generated leaf-node migration files on disk that aren't in git,
# producing "Conflicting migrations detected" once the matching committed
# migration arrives. We only apply migrations here.
run_migrations() {
    echo -e "${GREEN}Running database migrations...${NC}"
    cd "$BACKEND_DIR"
    export PATH="$HOME/.local/bin:$PATH"
    export DJANGO_DEBUG=False
    export ALLOWED_HOSTS="localhost,127.0.0.1,backend,zain-grc.wathbah.dev"
    export CISO_ASSISTANT_URL="${CISO_ASSISTANT_URL}"
    export POSTGRES_NAME POSTGRES_USER POSTGRES_PASSWORD DB_HOST DB_PORT POSTGRES_SEARCH_PATH
    poetry run python manage.py migrate --noinput
    cd "$SCRIPT_DIR"
}

# Install Python deps into the Poetry env (required before migrate / gunicorn)
ensure_poetry_install() {
    echo -e "${GREEN}Installing backend dependencies (poetry install)...${NC}"
    cd "$BACKEND_DIR"
    poetry install --no-interaction
    cd "$SCRIPT_DIR"
}

# Function to ensure gunicorn is installed
ensure_gunicorn() {
    echo -e "${GREEN}Ensuring Gunicorn is installed...${NC}"
    cd "$BACKEND_DIR"
    if ! poetry run python -c "import gunicorn" 2>/dev/null; then
        echo -e "${YELLOW}Installing Gunicorn...${NC}"
        poetry add gunicorn
    fi
    cd "$SCRIPT_DIR"
}

# Main commands
case "${1:-start}" in
    start)
        echo -e "${GREEN}Starting all services (zain)...${NC}"
        if [ ! -f "$FRONTEND_DIR/build/index.js" ]; then
            echo -e "${YELLOW}Warning: frontend/build/index.js missing. Run:${NC}"
            echo -e "  cd frontend && pnpm run build:staging"
            exit 1
        fi
        ensure_poetry_install
        ensure_gunicorn
        run_migrations
        cd "$SCRIPT_DIR"
        pm2 start ecosystem.config.js --only "dev-backend,dev-frontend,dev-huey"
        pm2 save
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}  zain services started                    ${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "  Backend:  Gunicorn on port ${BACKEND_PORT} (4 workers)"
        echo -e "  Frontend: Node adapter-node on port ${FRONTEND_PORT}"
        echo -e "  Access:   ${PUBLIC_URL} (via reverse proxy)"
        echo ""
        pm2 status
        ;;
    stop)
        echo -e "${YELLOW}Stopping CISO zain services only...${NC}"
        for app in $CISO_APPS; do
            pm2 stop "$app" 2>/dev/null || echo -e "${YELLOW}  $app not running${NC}"
        done
        pm2 status
        ;;
    restart)
        echo -e "${YELLOW}Restarting CISO zain services only...${NC}"
        ensure_poetry_install
        run_migrations
        for app in $CISO_APPS; do
            pm2 delete "$app" 2>/dev/null || true
        done
        pm2 start ecosystem.config.js --only "dev-backend,dev-frontend,dev-huey"
        pm2 save
        pm2 status
        ;;
    status)
        pm2 status
        ;;
    logs)
        if [ -n "$2" ]; then
            pm2 logs "dev-$2"
        else
            pm2 logs dev-backend dev-frontend dev-huey
        fi
        ;;
    delete)
        echo -e "${RED}Deleting CISO zain PM2 processes only...${NC}"
        for app in $CISO_APPS; do
            pm2 delete "$app" 2>/dev/null || echo -e "${YELLOW}  $app not found${NC}"
        done
        pm2 save
        ;;
    startup)
        echo -e "${GREEN}Setting up PM2 startup script...${NC}"
        pm2 startup
        pm2 save
        echo "PM2 will now auto-start on system boot"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|delete|startup}"
        echo ""
        echo "zain: ${PUBLIC_URL} — backend ${BACKEND_PORT}, frontend ${FRONTEND_PORT}"
        echo "PostgreSQL: POSTGRES_NAME=${POSTGRES_NAME} DB_HOST=${DB_HOST} (override via env)"
        echo "Build frontend first: cd frontend && pnpm run build:staging"
        echo ""
        echo "Commands:"
        echo "  start   - Write ecosystem.config.js and start zain (Gunicorn + Node)"
        echo "  stop    - Stop zain PM2 apps only"
        echo "  restart - Migrate, recreate zain PM2 apps"
        echo "  status  - PM2 status"
        echo "  logs    - zain logs (optional: logs backend | logs frontend | logs huey)"
        echo "  delete  - Remove zain PM2 processes"
        echo "  startup - Enable PM2 on boot"
        exit 1
        ;;
esac
