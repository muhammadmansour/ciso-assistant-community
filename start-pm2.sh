#!/bin/bash
# CISO Assistant - PM2 staging (Linux)
# Public URL: https://grc-stage.wathbahs.com
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

# Configuration
DOMAIN="grc-stage.wathbahs.com"
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

# CISO PM2 process names (only restart these, not all PM2 services)
CISO_APPS="dev-backend dev-frontend dev-huey"

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
      name: 'dev-backend',
      cwd: './backend',
      script: 'poetry',
      args: 'run gunicorn --chdir ciso_assistant --bind 0.0.0.0:8020 --workers 4 --timeout 120 --keep-alive 30 --access-logfile ../logs/dev-gunicorn-access.log ciso_assistant.wsgi:application',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,backend,grc.wathbahs.com,grc-stage.wathbahs.com',
        CISO_ASSISTANT_URL: 'https://grc-stage.wathbahs.com',
        CSRF_TRUSTED_ORIGINS: 'https://grc.wathbahs.com,https://grc-stage.wathbahs.com',
        AUTH_TOKEN_TTL: '7200',
        ATTACHMENT_MAX_SIZE_MB: '100',
        ATTACHMENT_MAX_NAME_LENGTH: '512',
        POSTGRES_NAME: '${POSTGRES_NAME}',
        POSTGRES_USER: '${POSTGRES_USER}',
        POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}',
        DB_HOST: '${DB_HOST}',
        DB_PORT: '${DB_PORT}',
        POSTGRES_SEARCH_PATH: '${POSTGRES_SEARCH_PATH}',
        PATH: os.homedir() + '/.local/bin:' + (process['env']['PATH'] || '')
      },
      watch: false,
      max_memory_restart: '2G',
      error_file: './logs/stage-backend-error.log',
      out_file: './logs/stage-backend-out.log',
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
        ALLOWED_HOSTS: 'localhost,127.0.0.1,grc.wathbahs.com,grc-stage.wathbahs.com',
        CISO_ASSISTANT_URL: 'https://grc-stage.wathbahs.com',
        POSTGRES_NAME: '${POSTGRES_NAME}',
        POSTGRES_USER: '${POSTGRES_USER}',
        POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}',
        DB_HOST: '${DB_HOST}',
        DB_PORT: '${DB_PORT}',
        POSTGRES_SEARCH_PATH: '${POSTGRES_SEARCH_PATH}',
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
      name: 'dev-frontend',
      cwd: './frontend',
      script: 'node',
      args: 'build/index.js',
      interpreter: 'none',
      env: {
        HOST: '0.0.0.0',
        PORT: '3020',
        NODE_ENV: 'production',
        PUBLIC_BACKEND_API_URL: 'http://127.0.0.1:8020/api',
        PUBLIC_BACKEND_API_EXPOSED_URL: 'https://grc-stage.wathbahs.com/api',
        ORIGIN: 'https://grc-stage.wathbahs.com',
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
run_migrations() {
    echo -e "${GREEN}Running database migrations...${NC}"
    cd "$BACKEND_DIR"
    export PATH="$HOME/.local/bin:$PATH"
    export DJANGO_DEBUG=False
    export ALLOWED_HOSTS="localhost,127.0.0.1,backend,grc.wathbahs.com,grc-stage.wathbahs.com"
    export CISO_ASSISTANT_URL="${PUBLIC_URL}"
    export POSTGRES_NAME POSTGRES_USER POSTGRES_PASSWORD DB_HOST DB_PORT POSTGRES_SEARCH_PATH
    poetry run python manage.py makemigrations --noinput
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
            pm2 logs "dev-$2"
        else
            pm2 logs dev-backend dev-frontend dev-huey
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
