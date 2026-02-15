#!/bin/bash

# CISO Assistant Production Startup Script for GCP
# Usage: ./start-prod.sh [start|stop|restart|status]

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
export CISO_ASSISTANT_URL=https://ciso.wathbahs.com
export ALLOWED_HOSTS=localhost,127.0.0.1,ciso.wathbahs.com
export PUBLIC_BACKEND_API_URL=http://localhost:8000/api
export PUBLIC_BACKEND_API_EXPOSED_URL=https://ciso.wathbahs.com/api

# Database
export POSTGRES_NAME=wathbah_grc
export POSTGRES_USER=wathbah_grc
export POSTGRES_PASSWORD=wathbah_grc
export DB_HOST=localhost
export DB_PORT=5432

# Outlook SMTP configuration
export EMAIL_HOST=smtp.office365.com
export EMAIL_PORT=587
export EMAIL_USE_TLS=True
export EMAIL_HOST_USER=info@wathbahs.com
export EMAIL_HOST_PASSWORD=changeme  # Replace with Outlook app password
export DEFAULT_FROM_EMAIL=info@wathbahs.com

# Gemini
export GEMINI_API_KEY=AIzaSyAfOJIFLDzLbeook1ICNpLhs0sXFUabnm8

# Gunicorn settings (adjust based on your GCP VM)
export GUNICORN_WORKERS=${GUNICORN_WORKERS:-4}  # 2 * num_cores + 1
export GUNICORN_TIMEOUT=120
export GUNICORN_KEEPALIVE=30

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create log directory
mkdir -p "$LOG_DIR"

# PID files
BACKEND_PID_FILE="$LOG_DIR/backend.jobid"
FRONTEND_PID_FILE="$LOG_DIR/frontend.jobid"
HUEY_PID_FILE="$LOG_DIR/huey.jobid"

start_backend() {
    echo -e "${GREEN}Starting backend (Production Mode with Gunicorn)...${NC}"
    cd "$BACKEND_DIR"
    
    # Install dependencies if needed
    if [ ! -d ".venv" ]; then
        echo -e "${YELLOW}Installing backend dependencies...${NC}"
        $POETRY_CMD install --without dev
    fi
    
    # Run migrations first
    $POETRY_CMD run python manage.py migrate --noinput
    
    # Store libraries if needed
    $POETRY_CMD run python manage.py storelibraries
    
    # Start with Gunicorn (production server)
    nohup $POETRY_CMD run gunicorn \
        --chdir ciso_assistant \
        --bind 0.0.0.0:8000 \
        --workers $GUNICORN_WORKERS \
        --timeout $GUNICORN_TIMEOUT \
        --keep-alive $GUNICORN_KEEPALIVE \
        --access-logfile "$LOG_DIR/gunicorn-access.log" \
        --error-logfile "$LOG_DIR/gunicorn-error.log" \
        --capture-output \
        ciso_assistant.wsgi:application > "$LOG_DIR/backend.log" 2>&1 &
    echo $! > "$BACKEND_PID_FILE"
    echo -e "${GREEN}Backend started with Gunicorn (PID: $(cat $BACKEND_PID_FILE), Workers: $GUNICORN_WORKERS)${NC}"
}

start_huey() {
    echo -e "${GREEN}Starting Huey task queue...${NC}"
    cd "$BACKEND_DIR"
    nohup $POETRY_CMD run python manage.py run_huey -w 2 --scheduler-interval 60 > "$LOG_DIR/huey.log" 2>&1 &
    echo $! > "$HUEY_PID_FILE"
    echo -e "${GREEN}Huey started (PID: $(cat $HUEY_PID_FILE))${NC}"
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
    echo -e "${YELLOW}Building frontend (this may take a minute)...${NC}"
    $PNPM_CMD run build
}

start_frontend() {
    echo -e "${GREEN}Starting frontend (Production Mode)...${NC}"
    cd "$FRONTEND_DIR"
    
    # Check if build exists
    if [ ! -d "build" ]; then
        build_frontend
    fi
    
    # Start with Node adapter (production)
    nohup node build/index.js > "$LOG_DIR/frontend.log" 2>&1 &
    echo $! > "$FRONTEND_PID_FILE"
    echo -e "${GREEN}Frontend started (PID: $(cat $FRONTEND_PID_FILE))${NC}"
}

stop_service() {
    local pid_file=$1
    local service_name=$2
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            echo -e "${YELLOW}Stopping $service_name (PID: $pid)...${NC}"
            kill "$pid" 2>/dev/null || true
            sleep 2
            kill -9 "$pid" 2>/dev/null || true
            echo -e "${GREEN}$service_name stopped${NC}"
        fi
        rm -f "$pid_file"
    fi
}

start() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  Starting CISO Assistant (PRODUCTION)  ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "${YELLOW}  Debug Mode: OFF${NC}"
    echo -e "${YELLOW}  Gunicorn Workers: $GUNICORN_WORKERS${NC}"
    echo ""
    
    start_backend
    sleep 5  # Wait for backend to initialize
    start_huey
    start_frontend
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  All services started in PRODUCTION!  ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "  Backend:  ${YELLOW}http://localhost:8000${NC} (Gunicorn)"
    echo -e "  Frontend: ${YELLOW}http://localhost:3000${NC} (Production build)"
    echo -e "  Logs:     ${YELLOW}$LOG_DIR/${NC}"
    echo ""
    echo -e "  Use '${YELLOW}./start-prod.sh status${NC}' to check status"
    echo -e "  Use '${YELLOW}./start-prod.sh stop${NC}' to stop all services"
    echo ""
}

stop() {
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}  Stopping CISO Assistant               ${NC}"
    echo -e "${RED}========================================${NC}"
    
    stop_service "$FRONTEND_PID_FILE" "Frontend"
    stop_service "$HUEY_PID_FILE" "Huey"
    stop_service "$BACKEND_PID_FILE" "Backend"
    
    # Kill any remaining processes on the ports
    fuser -k 8000/tcp 2>/dev/null || true
    fuser -k 3000/tcp 2>/dev/null || true
    
    echo -e "${GREEN}All services stopped${NC}"
}

status() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  CISO Assistant Status (Production)    ${NC}"
    echo -e "${GREEN}========================================${NC}"
    
    check_service() {
        local pid_file=$1
        local service_name=$2
        local port=$3
        
        if [ -f "$pid_file" ] && kill -0 "$(cat $pid_file)" 2>/dev/null; then
            echo -e "  $service_name: ${GREEN}Running${NC} (PID: $(cat $pid_file), Port: $port)"
        else
            echo -e "  $service_name: ${RED}Stopped${NC}"
        fi
    }
    
    check_service "$BACKEND_PID_FILE" "Backend " "8000"
    check_service "$HUEY_PID_FILE" "Huey    " "N/A"
    check_service "$FRONTEND_PID_FILE" "Frontend" "3000"
    echo ""
}

rebuild() {
    echo -e "${YELLOW}Rebuilding frontend...${NC}"
    build_frontend
    echo -e "${GREEN}Frontend rebuilt. Restart to apply changes.${NC}"
}

logs() {
    local service=${2:-all}
    
    case $service in
        backend)
            tail -f "$LOG_DIR/backend.log" "$LOG_DIR/gunicorn-access.log"
            ;;
        frontend)
            tail -f "$LOG_DIR/frontend.log"
            ;;
        huey)
            tail -f "$LOG_DIR/huey.log"
            ;;
        all|*)
            tail -f "$LOG_DIR"/*.log
            ;;
    esac
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
    *)
        echo "Usage: $0 {start|stop|restart|status|rebuild|logs [backend|frontend|huey|all]}"
        exit 1
        ;;
esac
