#!/bin/bash

# CISO Assistant Production Startup Script for GCP (PM2 managed)
# Usage: ./start-prod.sh [start|stop|restart|status|rebuild|logs]

set -e

# Configuration
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
LOG_DIR="$PROJECT_DIR/logs"

# Add common paths for poetry and pnpm
export PATH="$HOME/.local/bin:$HOME/.poetry/bin:/usr/local/bin:$PATH"

# Find poetry
if command -v poetry &> /dev/null; then
    POETRY_CMD="poetry"
elif [ -f "$HOME/.local/bin/poetry" ]; then
    POETRY_CMD="$HOME/.local/bin/poetry"
elif [ -f "$HOME/.poetry/bin/poetry" ]; then
    POETRY_CMD="$HOME/.poetry/bin/poetry"
else
    echo "ERROR: Poetry not found. Install it with:"
    echo "  curl -sSL https://install.python-poetry.org | python3 -"
    exit 1
fi

# Find pnpm
if command -v pnpm &> /dev/null; then
    PNPM_CMD="pnpm"
elif [ -f "$HOME/.local/share/pnpm/pnpm" ]; then
    PNPM_CMD="$HOME/.local/share/pnpm/pnpm"
else
    echo "WARNING: pnpm not found. Install it with: npm install -g pnpm"
    PNPM_CMD="pnpm"
fi

# ============================================
# PRODUCTION Environment variables
# ============================================
export DJANGO_DEBUG=False
export CISO_ASSISTANT_URL=https://grc.wathbahs.com
export ALLOWED_HOSTS=localhost,127.0.0.1,grc.wathbahs.com
export PUBLIC_BACKEND_API_URL=http://localhost:8000/api
export PUBLIC_BACKEND_API_EXPOSED_URL=https://grc.wathbahs.com/api

# SvelteKit adapter-node production settings
export ORIGIN=https://grc.wathbahs.com
export PROTOCOL_HEADER=x-forwarded-proto
export HOST_HEADER=host

# Database
export POSTGRES_NAME=wathbah_grc
export POSTGRES_USER=wathbah_grc
export POSTGRES_PASSWORD=wathbah_grc
export DB_HOST=localhost
export DB_PORT=5432

# Microsoft Graph API email configuration (set these on the server)
# export MS_GRAPH_CLIENT_ID=your-client-id
# export MS_GRAPH_TENANT_ID=your-tenant-id
# export MS_GRAPH_CLIENT_SECRET=your-client-secret
export DEFAULT_FROM_EMAIL=${DEFAULT_FROM_EMAIL:-info@wathbahs.com}

# Gemini
export GEMINI_API_KEY=${GEMINI_API_KEY:-}

# Gunicorn settings (adjust based on your GCP VM)
export GUNICORN_WORKERS=${GUNICORN_WORKERS:-4}  # 2 * num_cores + 1
export GUNICORN_TIMEOUT=120
export GUNICORN_KEEPALIVE=30

# PM2 process names
PM2_BACKEND="ciso-backend"
PM2_HUEY="ciso-huey"
PM2_FRONTEND="ciso-frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create log directory
mkdir -p "$LOG_DIR"

# ============================================
# PM2 ecosystem config (generated dynamically)
# ============================================
generate_ecosystem() {
    cat > "$PROJECT_DIR/ecosystem.config.cjs" << ECOSYSTEM
module.exports = {
  apps: [
    {
      name: '${PM2_BACKEND}',
      cwd: '${BACKEND_DIR}',
      script: '$(which $POETRY_CMD)',
      args: 'run gunicorn --chdir ciso_assistant --bind 0.0.0.0:8000 --workers ${GUNICORN_WORKERS} --timeout ${GUNICORN_TIMEOUT} --keep-alive ${GUNICORN_KEEPALIVE} --access-logfile ${LOG_DIR}/gunicorn-access.log --error-logfile ${LOG_DIR}/gunicorn-error.log --capture-output ciso_assistant.wsgi:application',
      env: {
        DJANGO_DEBUG: 'False',
        CISO_ASSISTANT_URL: '${CISO_ASSISTANT_URL}',
        ALLOWED_HOSTS: '${ALLOWED_HOSTS}',
        POSTGRES_NAME: '${POSTGRES_NAME}',
        POSTGRES_USER: '${POSTGRES_USER}',
        POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}',
        DB_HOST: '${DB_HOST}',
        DB_PORT: '${DB_PORT}',
        DEFAULT_FROM_EMAIL: '${DEFAULT_FROM_EMAIL}',
        GEMINI_API_KEY: '${GEMINI_API_KEY}',
      },
      error_file: '${LOG_DIR}/pm2-backend-error.log',
      out_file: '${LOG_DIR}/pm2-backend-out.log',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
    },
    {
      name: '${PM2_HUEY}',
      cwd: '${BACKEND_DIR}',
      script: '$(which $POETRY_CMD)',
      args: 'run python manage.py run_huey -w 2 --scheduler-interval 60',
      env: {
        DJANGO_DEBUG: 'False',
        CISO_ASSISTANT_URL: '${CISO_ASSISTANT_URL}',
        ALLOWED_HOSTS: '${ALLOWED_HOSTS}',
        POSTGRES_NAME: '${POSTGRES_NAME}',
        POSTGRES_USER: '${POSTGRES_USER}',
        POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}',
        DB_HOST: '${DB_HOST}',
        DB_PORT: '${DB_PORT}',
        DEFAULT_FROM_EMAIL: '${DEFAULT_FROM_EMAIL}',
        GEMINI_API_KEY: '${GEMINI_API_KEY}',
      },
      error_file: '${LOG_DIR}/pm2-huey-error.log',
      out_file: '${LOG_DIR}/pm2-huey-out.log',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
    },
    {
      name: '${PM2_FRONTEND}',
      cwd: '${FRONTEND_DIR}',
      script: 'build/index.js',
      env: {
        PORT: 3000,
        ORIGIN: '${ORIGIN}',
        PROTOCOL_HEADER: '${PROTOCOL_HEADER}',
        HOST_HEADER: '${HOST_HEADER}',
        PUBLIC_BACKEND_API_URL: '${PUBLIC_BACKEND_API_URL}',
        PUBLIC_BACKEND_API_EXPOSED_URL: '${PUBLIC_BACKEND_API_EXPOSED_URL}',
      },
      error_file: '${LOG_DIR}/pm2-frontend-error.log',
      out_file: '${LOG_DIR}/pm2-frontend-out.log',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
    }
  ]
};
ECOSYSTEM
    echo -e "${GREEN}PM2 ecosystem config generated${NC}"
}

run_migrations() {
    echo -e "${YELLOW}Running database migrations...${NC}"
    cd "$BACKEND_DIR"
    
    # Install dependencies if needed
    if [ ! -d ".venv" ]; then
        echo -e "${YELLOW}Installing backend dependencies...${NC}"
        $POETRY_CMD install --without dev
    fi
    
    $POETRY_CMD run python manage.py migrate --noinput
    $POETRY_CMD run python manage.py storelibraries
    echo -e "${GREEN}Migrations complete${NC}"
}

build_frontend() {
    echo -e "${GREEN}Building frontend for production...${NC}"
    cd "$FRONTEND_DIR"
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing frontend dependencies...${NC}"
        $PNPM_CMD install
    fi
    
    # Build for production
    echo -e "${YELLOW}Building frontend (this may take a few minutes)...${NC}"
    NODE_OPTIONS="--max-old-space-size=8192" $PNPM_CMD run build
    echo -e "${GREEN}Frontend build complete${NC}"
}

start() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  Starting CISO Assistant (PRODUCTION)  ${NC}"
    echo -e "${GREEN}  Managed by PM2                        ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "${YELLOW}  Debug Mode: OFF${NC}"
    echo -e "${YELLOW}  Gunicorn Workers: $GUNICORN_WORKERS${NC}"
    echo ""
    
    # Run migrations before starting services
    run_migrations
    
    # Ensure frontend build exists
    if [ ! -d "$FRONTEND_DIR/build" ]; then
        build_frontend
    fi
    
    # Generate ecosystem config
    generate_ecosystem
    
    # Kill any rogue processes on our ports
    fuser -k 8000/tcp 2>/dev/null || true
    fuser -k 3000/tcp 2>/dev/null || true
    sleep 2
    
    # Start all services via PM2
    cd "$PROJECT_DIR"
    pm2 start ecosystem.config.cjs
    
    # Save PM2 state for auto-restart on reboot
    pm2 save
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  All services started in PRODUCTION!  ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "  Backend:  ${YELLOW}http://localhost:8000${NC} (Gunicorn via PM2)"
    echo -e "  Frontend: ${YELLOW}http://localhost:3000${NC} (Production build via PM2)"
    echo -e "  Logs:     ${YELLOW}$LOG_DIR/${NC}"
    echo ""
    echo -e "  ${YELLOW}pm2 list${NC}         - view all processes"
    echo -e "  ${YELLOW}pm2 logs${NC}         - view all logs"
    echo -e "  ${YELLOW}pm2 monit${NC}        - monitor dashboard"
    echo ""
    
    pm2 list
}

stop() {
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}  Stopping CISO Assistant               ${NC}"
    echo -e "${RED}========================================${NC}"
    
    pm2 stop $PM2_FRONTEND 2>/dev/null || true
    pm2 stop $PM2_HUEY 2>/dev/null || true
    pm2 stop $PM2_BACKEND 2>/dev/null || true
    
    pm2 delete $PM2_FRONTEND 2>/dev/null || true
    pm2 delete $PM2_HUEY 2>/dev/null || true
    pm2 delete $PM2_BACKEND 2>/dev/null || true
    
    # Kill any remaining processes on the ports
    fuser -k 8000/tcp 2>/dev/null || true
    fuser -k 3000/tcp 2>/dev/null || true
    
    pm2 save
    
    echo -e "${GREEN}All services stopped${NC}"
}

status() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  CISO Assistant Status (Production)    ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    pm2 list
    echo ""
    
    # Quick port check
    echo -e "  Port 8000 (Backend):"
    if lsof -i :8000 -P -n 2>/dev/null | grep -q LISTEN; then
        echo -e "    ${GREEN}● Listening${NC}"
    else
        echo -e "    ${RED}● Not listening${NC}"
    fi
    
    echo -e "  Port 3000 (Frontend):"
    if lsof -i :3000 -P -n 2>/dev/null | grep -q LISTEN; then
        echo -e "    ${GREEN}● Listening${NC}"
    else
        echo -e "    ${RED}● Not listening${NC}"
    fi
    echo ""
}

rebuild() {
    echo -e "${YELLOW}Rebuilding frontend...${NC}"
    build_frontend
    echo -e "${GREEN}Frontend rebuilt. Run './start-prod.sh restart' to apply changes.${NC}"
}

logs() {
    local service=${2:-all}
    
    case $service in
        backend)
            pm2 logs $PM2_BACKEND
            ;;
        frontend)
            pm2 logs $PM2_FRONTEND
            ;;
        huey)
            pm2 logs $PM2_HUEY
            ;;
        all|*)
            pm2 logs
            ;;
    esac
}

setup() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  PM2 Startup Setup                     ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${YELLOW}Setting up PM2 to auto-start on reboot...${NC}"
    pm2 startup
    echo ""
    echo -e "${GREEN}Follow the command above if prompted, then run:${NC}"
    echo -e "  ${YELLOW}./start-prod.sh start${NC}"
    echo -e "  ${YELLOW}pm2 save${NC}"
}

# Main script
case "${1:-start}" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        sleep 2
        start
        ;;
    status)
        status
        ;;
    rebuild)
        rebuild
        ;;
    logs)
        logs "$@"
        ;;
    setup)
        setup
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|rebuild|logs [backend|frontend|huey|all]|setup}"
        exit 1
        ;;
esac
