#!/bin/bash

# CISO Assistant Development Startup Script
# Usage: ./start-dev.sh [start|stop|restart|status]

set -e

# Configuration
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
LOG_DIR="$PROJECT_DIR/logs"

# Environment variables
export DJANGO_DEBUG=True
export CISO_ASSISTANT_URL=https://ciso.wathbahs.com
export ALLOWED_HOSTS=localhost,127.0.0.1,ciso.wathbahs.com
export PUBLIC_BACKEND_API_URL=http://localhost:8000/api
export PUBLIC_BACKEND_API_EXPOSED_URL=https://ciso.wathbahs.com/api

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create log directory
mkdir -p "$LOG_DIR"

# PID files
BACKEND_PID_FILE="$LOG_DIR/backend.pid"
FRONTEND_PID_FILE="$LOG_DIR/frontend.pid"
HUEY_PID_FILE="$LOG_DIR/huey.pid"

start_backend() {
    echo -e "${GREEN}Starting backend...${NC}"
    cd "$BACKEND_DIR"
    
    # Run migrations first
    poetry run python manage.py migrate --noinput
    
    # Start backend server
    nohup poetry run python manage.py runserver 0.0.0.0:8000 > "$LOG_DIR/backend.log" 2>&1 &
    echo $! > "$BACKEND_PID_FILE"
    echo -e "${GREEN}Backend started (PID: $(cat $BACKEND_PID_FILE))${NC}"
}

start_huey() {
    echo -e "${GREEN}Starting Huey task queue...${NC}"
    cd "$BACKEND_DIR"
    nohup poetry run python manage.py run_huey -w 2 --scheduler-interval 60 > "$LOG_DIR/huey.log" 2>&1 &
    echo $! > "$HUEY_PID_FILE"
    echo -e "${GREEN}Huey started (PID: $(cat $HUEY_PID_FILE))${NC}"
}

start_frontend() {
    echo -e "${GREEN}Starting frontend...${NC}"
    cd "$FRONTEND_DIR"
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing frontend dependencies...${NC}"
        pnpm install
    fi
    
    nohup pnpm run dev --host 0.0.0.0 > "$LOG_DIR/frontend.log" 2>&1 &
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
    echo -e "${GREEN}  Starting CISO Assistant (Dev Mode)   ${NC}"
    echo -e "${GREEN}========================================${NC}"
    
    start_backend
    sleep 5  # Wait for backend to initialize
    start_huey
    start_frontend
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  All services started!                ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "  Backend:  ${YELLOW}http://localhost:8000${NC}"
    echo -e "  Frontend: ${YELLOW}http://localhost:5173${NC}"
    echo -e "  Logs:     ${YELLOW}$LOG_DIR/${NC}"
    echo ""
    echo -e "  Use '${YELLOW}./start-dev.sh status${NC}' to check status"
    echo -e "  Use '${YELLOW}./start-dev.sh stop${NC}' to stop all services"
    echo ""
}

stop() {
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}  Stopping CISO Assistant              ${NC}"
    echo -e "${RED}========================================${NC}"
    
    stop_service "$FRONTEND_PID_FILE" "Frontend"
    stop_service "$HUEY_PID_FILE" "Huey"
    stop_service "$BACKEND_PID_FILE" "Backend"
    
    # Kill any remaining processes on the ports
    fuser -k 8000/tcp 2>/dev/null || true
    fuser -k 5173/tcp 2>/dev/null || true
    
    echo -e "${GREEN}All services stopped${NC}"
}

status() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  CISO Assistant Status                ${NC}"
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
    check_service "$FRONTEND_PID_FILE" "Frontend" "5173"
    echo ""
}

logs() {
    local service=${2:-all}
    
    case $service in
        backend)
            tail -f "$LOG_DIR/backend.log"
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
    logs)
        logs "$@"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs [backend|frontend|huey|all]}"
        exit 1
        ;;
esac
