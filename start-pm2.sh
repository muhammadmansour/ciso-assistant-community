#!/bin/bash
# CISO Assistant - PM2 staging (Linux)
# Public URL: https://grc-hrsd.wathbahs.com
# Ports: backend 8020, frontend 3020 (avoid dev 8000/3000 and old PM2 dev 8001/3001)
# Before start: cd frontend && pnpm run build:staging
#
# DB name is POSTGRES_NAME (e.g. grc-stage). Schema for tables is POSTGRES_SEARCH_PATH (can match: grc-stage).
# If migrate fails on public, once as postgres:
#   sudo -u postgres psql -d "grc-stage" -c 'CREATE SCHEMA IF NOT EXISTS "grc-stage" AUTHORIZATION "grc-stage";'
# Default POSTGRES_SEARCH_PATH=grc-stage. Disable with: POSTGRES_SEARCH_PATH= ./start-pm2.sh start

set -e

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Source server-local env overrides if present.
# This file is NOT tracked in git, lives outside the repo, and survives
# `git reset --hard origin/staging-version` from the deploy workflow.
# Use it for secrets / per-host settings, e.g.:
#   echo 'POSTGRES_PASSWORD=...'                    >> ~/.ciso-staging.env
#   echo 'USE_GCS=True'                             >> ~/.ciso-staging.env
#   echo 'GS_BUCKET_NAME=grc-stage-env'             >> ~/.ciso-staging.env
#   echo 'GS_PROJECT_ID=api-project-799674531429'   >> ~/.ciso-staging.env
#   chmod 600 ~/.ciso-staging.env
#
# GCS authentication: leave GOOGLE_APPLICATION_CREDENTIALS UNSET to use
# Application Default Credentials (the GCE VM's attached service account).
# Only set it if you have a service-account JSON key file you want to use
# explicitly:
#   echo 'GOOGLE_APPLICATION_CREDENTIALS=/etc/ciso/ciso-storage.json' \
#                                                   >> ~/.ciso-staging.env
if [ -f "$HOME/.ciso-staging.env" ]; then
    set -a
    # shellcheck disable=SC1090
    . "$HOME/.ciso-staging.env"
    set +a
fi

# Configuration
DOMAIN="grc-hrsd.wathbahs.com"
PUBLIC_URL="https://${DOMAIN}"
BACKEND_PORT=8020
FRONTEND_PORT=3020

# PostgreSQL (override when invoking: POSTGRES_PASSWORD=... ./start-pm2.sh start)
POSTGRES_NAME="${POSTGRES_NAME:-grc-stage}"
POSTGRES_USER="${POSTGRES_USER:-grc-stage}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-grc-stage}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
# ${VAR-default} only when unset; empty POSTGRES_SEARCH_PATH= disables (use public only)
POSTGRES_SEARCH_PATH="${POSTGRES_SEARCH_PATH-grc-stage}"

# Object storage (S3 / Google Cloud Storage). Default = local filesystem.
# Set via ~/.ciso-staging.env on the server to flip to GCS without editing
# this script. USE_S3 and USE_GCS are mutually exclusive (settings.py exits
# fast if both are True).
USE_S3="${USE_S3:-False}"
USE_GCS="${USE_GCS:-False}"
GS_BUCKET_NAME="${GS_BUCKET_NAME:-}"
GS_PROJECT_ID="${GS_PROJECT_ID:-}"
# Empty default → Application Default Credentials (GCE VM service account).
# Set explicitly in ~/.ciso-staging.env if you want to use a JSON key file.
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
# instantiates the client). Sourced from ~/.ciso-staging.env above.
GEMINI_API_KEY="${GEMINI_API_KEY:-}"
GEMINI_FILE_SEARCH_STORE_NAME="${GEMINI_FILE_SEARCH_STORE_NAME:-}"
GEMINI_MODEL="${GEMINI_MODEL:-gemini-2.5-pro}"
MURAJI_ANALYSIS_API_URL="${MURAJI_ANALYSIS_API_URL:-https://muraji-hrsd.wathbahs.com/api/audit/analyze}"

# CISO PM2 process names (only restart these, not all PM2 services)
CISO_APPS="ciso-stage-backend ciso-stage-frontend ciso-stage-huey"

# Directories
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Ensure PATH includes local bins
export PATH="$HOME/.local/bin:$PATH"

echo -e "${GREEN}========================================"
echo "  CISO Assistant - PM2 Staging (${DOMAIN})"
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
    echo -e "${YELLOW}Warning: GEMINI_API_KEY is not set in ~/.ciso-staging.env — AI analysis will fail with a 'client not configured' error.${NC}"
fi
if [ -n "$GEMINI_FILE_SEARCH_STORE_NAME" ]; then
    echo -e "${GREEN}Gemini File Search store: ${GEMINI_FILE_SEARCH_STORE_NAME}${NC}"
else
    echo -e "${YELLOW}Warning: GEMINI_FILE_SEARCH_STORE_NAME is not set — evidences cannot be indexed.${NC}"
fi
echo -e "${GREEN}Muraji audit URL: ${MURAJI_ANALYSIS_API_URL}${NC}"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    sudo npm install -g pm2
fi

# Create PM2 ecosystem config (Gunicorn + adapter-node).
# Unquoted EOF: substitute POSTGRES_* / DB_*; PATH uses require('os') so bash does not expand $PATH.
cat > "$SCRIPT_DIR/ecosystem.config.js" << EOF
const os = require('os');
module.exports = {
  apps: [
    {
      // BACKEND - Gunicorn on staging port 8020
      name: 'ciso-stage-backend',
      cwd: './backend',
      script: 'poetry',
      args: 'run gunicorn --chdir ciso_assistant --bind 0.0.0.0:8020 --workers 4 --timeout 120 --keep-alive 30 --access-logfile ../logs/stage-gunicorn-access.log ciso_assistant.wsgi:application',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,backend,grc.wathbahs.com,grc-hrsd.wathbahs.com',
        CISO_ASSISTANT_URL: 'https://grc-hrsd.wathbahs.com',
        CSRF_TRUSTED_ORIGINS: 'https://grc.wathbahs.com,https://grc-hrsd.wathbahs.com',
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
        MURAJI_ANALYSIS_API_URL: '${MURAJI_ANALYSIS_API_URL}',
        PATH: os.homedir() + '/.local/bin:' + (process['env']['PATH'] || '')
      },
      watch: false,
      max_memory_restart: '2G',
      error_file: './logs/stage-backend-error.log',
      out_file: './logs/stage-backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'ciso-stage-huey',
      cwd: './backend',
      script: 'poetry',
      args: 'run python manage.py run_huey -w 2 --scheduler-interval 60',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,grc.wathbahs.com,grc-hrsd.wathbahs.com',
        CISO_ASSISTANT_URL: 'https://grc-hrsd.wathbahs.com',
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
        MURAJI_ANALYSIS_API_URL: '${MURAJI_ANALYSIS_API_URL}',
        PATH: os.homedir() + '/.local/bin:' + (process['env']['PATH'] || '')
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/stage-huey-error.log',
      out_file: './logs/stage-huey-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // FRONTEND - adapter-node (run: pnpm run build:staging)
      name: 'ciso-stage-frontend',
      cwd: './frontend',
      script: 'node',
      args: 'build/index.js',
      interpreter: 'none',
      env: {
        HOST: '0.0.0.0',
        PORT: '3020',
        NODE_ENV: 'production',
        PUBLIC_BACKEND_API_URL: 'http://127.0.0.1:8020/api',
        PUBLIC_BACKEND_API_EXPOSED_URL: 'https://grc-hrsd.wathbahs.com/api',
        ORIGIN: 'https://grc-hrsd.wathbahs.com',
        PROTOCOL_HEADER: 'x-forwarded-proto',
        PUBLIC_DEFAULT_LANGUAGE: 'en',
        BODY_SIZE_LIMIT: '104857600'
      },
      watch: false,
      max_memory_restart: '2G',
      error_file: './logs/stage-frontend-error.log',
      out_file: './logs/stage-frontend-out.log',
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
    export ALLOWED_HOSTS="localhost,127.0.0.1,backend,grc.wathbahs.com,grc-hrsd.wathbahs.com"
    export CISO_ASSISTANT_URL="${PUBLIC_URL}"
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
        echo -e "${GREEN}Starting all services (staging)...${NC}"
        if [ ! -f "$FRONTEND_DIR/build/index.js" ]; then
            echo -e "${YELLOW}Warning: frontend/build/index.js missing. Run:${NC}"
            echo -e "  cd frontend && pnpm run build:staging"
            exit 1
        fi
        ensure_poetry_install
        ensure_gunicorn
        run_migrations
        cd "$SCRIPT_DIR"
        pm2 start ecosystem.config.js
        pm2 save
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}  Staging services started                 ${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "  Backend:  Gunicorn on port ${BACKEND_PORT} (4 workers)"
        echo -e "  Frontend: Node adapter-node on port ${FRONTEND_PORT}"
        echo -e "  Access:   ${PUBLIC_URL} (via reverse proxy)"
        echo ""
        pm2 status
        ;;
    stop)
        echo -e "${YELLOW}Stopping CISO staging services only...${NC}"
        for app in $CISO_APPS; do
            pm2 stop "$app" 2>/dev/null || echo -e "${YELLOW}  $app not running${NC}"
        done
        pm2 status
        ;;
    restart)
        echo -e "${YELLOW}Restarting CISO staging services only...${NC}"
        ensure_poetry_install
        run_migrations
        for app in $CISO_APPS; do
            pm2 delete "$app" 2>/dev/null || true
        done
        pm2 start ecosystem.config.js
        pm2 save
        pm2 status
        ;;
    status)
        pm2 status
        ;;
    logs)
        if [ -n "$2" ]; then
            pm2 logs "ciso-stage-$2"
        else
            pm2 logs ciso-stage-backend ciso-stage-frontend ciso-stage-huey
        fi
        ;;
    delete)
        echo -e "${RED}Deleting CISO staging PM2 processes only...${NC}"
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
        echo "Staging: ${PUBLIC_URL} — backend ${BACKEND_PORT}, frontend ${FRONTEND_PORT}"
        echo "PostgreSQL: POSTGRES_NAME=${POSTGRES_NAME} DB_HOST=${DB_HOST} (override via env)"
        echo "Build frontend first: cd frontend && pnpm run build:staging"
        echo ""
        echo "Commands:"
        echo "  start   - Write ecosystem.config.js and start staging (Gunicorn + Node)"
        echo "  stop    - Stop staging PM2 apps only"
        echo "  restart - Migrate, recreate staging PM2 apps"
        echo "  status  - PM2 status"
        echo "  logs    - Staging logs (optional: logs backend | logs frontend | logs huey)"
        echo "  delete  - Remove staging PM2 processes"
        echo "  startup - Enable PM2 on boot"
        exit 1
        ;;
esac
