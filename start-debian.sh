#!/bin/bash
# CISO Assistant - Debian Production Run Script
# Domain: ciso.wathbahs.com
# Ports: Backend=8000, Frontend=3000, nginx=80/443 (HTTP/HTTPS)
# Uses Let's Encrypt SSL certificates

set -e

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Configuration
BACKEND_PORT=8000
FRONTEND_PORT=3000
DOMAIN="ciso.wathbahs.com"
CISO_ASSISTANT_URL="https://${DOMAIN}"

# Directories
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
LOG_DIR="$SCRIPT_DIR/logs"
DB_DIR="$SCRIPT_DIR/db"
PID_DIR="$SCRIPT_DIR/.pids"
NGINX_CONF="$SCRIPT_DIR/nginx-ciso.conf"
CERTBOT_WEBROOT="/var/www/certbot"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Ensure PATH includes poetry
export PATH="$HOME/.local/bin:$PATH"

# Create directories
mkdir -p "$LOG_DIR" "$DB_DIR" "$PID_DIR"
sudo mkdir -p "$CERTBOT_WEBROOT" 2>/dev/null || true

# Environment variables - matching docker-compose.yml
export DJANGO_DEBUG=False
export ALLOWED_HOSTS="backend,localhost,127.0.0.1,${DOMAIN}"
export CISO_ASSISTANT_URL="$CISO_ASSISTANT_URL"
export AUTH_TOKEN_TTL=7200
export ATTACHMENT_MAX_SIZE_MB=1000
export ATTACHMENT_MAX_NAME_LENGTH=512
export PUBLIC_BACKEND_API_URL="http://127.0.0.1:${BACKEND_PORT}/api"
export PUBLIC_BACKEND_API_EXPOSED_URL="${CISO_ASSISTANT_URL}/api"

# Functions
print_header() {
    echo -e "${CYAN}========================================"
    echo "  $1"
    echo -e "========================================${NC}"
}

check_port() {
    local port=$1
    if lsof -i :$port > /dev/null 2>&1; then
        return 0  # Port in use
    else
        return 1  # Port free
    fi
}

kill_port() {
    local port=$1
    local pid=$(lsof -t -i :$port 2>/dev/null)
    if [ -n "$pid" ]; then
        echo -e "${YELLOW}Killing process on port $port (PID: $pid)${NC}"
        kill -9 $pid 2>/dev/null || true
        sleep 1
    fi
}

start_backend() {
    echo -e "${GREEN}Starting backend on port ${BACKEND_PORT}...${NC}"
    
    cd "$BACKEND_DIR"
    
    # Run migrations
    echo "Running migrations..."
    poetry run python manage.py migrate --noinput
    
    # Start backend in background
    nohup poetry run python manage.py runserver 0.0.0.0:${BACKEND_PORT} \
        > "$LOG_DIR/backend.log" 2>&1 &
    echo $! > "$PID_DIR/backend.pid"
    
    echo -e "${GREEN}Backend started (PID: $(cat $PID_DIR/backend.pid))${NC}"
}

start_huey() {
    echo -e "${GREEN}Starting Huey task queue...${NC}"
    
    cd "$BACKEND_DIR"
    
    # Start Huey in background
    nohup poetry run python manage.py run_huey -w 2 --scheduler-interval 60 \
        > "$LOG_DIR/huey.log" 2>&1 &
    echo $! > "$PID_DIR/huey.pid"
    
    echo -e "${GREEN}Huey started (PID: $(cat $PID_DIR/huey.pid))${NC}"
}

start_frontend() {
    echo -e "${GREEN}Starting frontend on port ${FRONTEND_PORT}...${NC}"
    
    cd "$FRONTEND_DIR"
    
    # Build for production or run dev
    if [ "$1" == "prod" ]; then
        echo "Building frontend for production..."
        pnpm run build
        nohup node build/index.js \
            > "$LOG_DIR/frontend.log" 2>&1 &
    else
        nohup pnpm run dev --port ${FRONTEND_PORT} \
            > "$LOG_DIR/frontend.log" 2>&1 &
    fi
    echo $! > "$PID_DIR/frontend.pid"
    
    echo -e "${GREEN}Frontend started (PID: $(cat $PID_DIR/frontend.pid))${NC}"
}

setup_ssl() {
    # Check if Let's Encrypt certs exist
    if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
        echo -e "${GREEN}Let's Encrypt SSL certificates found${NC}"
        return 0
    fi
    
    # Install certbot if not present
    if ! command -v certbot &> /dev/null; then
        echo -e "${YELLOW}Installing certbot...${NC}"
        sudo apt install -y certbot
    fi
    
    # Create webroot directory
    sudo mkdir -p /var/www/certbot
    
    echo -e "${YELLOW}SSL certificates not found. Run this to obtain them:${NC}"
    echo "  sudo certbot certonly --webroot -w /var/www/certbot -d ${DOMAIN}"
    echo ""
    echo "Or for standalone (if nginx is not running):"
    echo "  sudo certbot certonly --standalone -d ${DOMAIN}"
    return 1
}

start_nginx() {
    echo -e "${GREEN}Starting nginx for ${DOMAIN}...${NC}"
    
    cd "$SCRIPT_DIR"
    
    # Check SSL certs
    if [ ! -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
        echo -e "${RED}SSL certificates not found at /etc/letsencrypt/live/${DOMAIN}/${NC}"
        setup_ssl
        return 1
    fi
    
    # Create nginx config
    cat > "$NGINX_CONF" << EOF
worker_processes auto;
pid $PID_DIR/nginx.pid;
error_log $LOG_DIR/nginx-error.log;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    access_log $LOG_DIR/nginx-access.log;
    
    sendfile on;
    keepalive_timeout 65;
    
    # Increase max body size to 1GB (matching ATTACHMENT_MAX_SIZE_MB)
    client_max_body_size 1G;
    
    # Upstream servers
    upstream frontend {
        server 127.0.0.1:${FRONTEND_PORT};
    }
    
    upstream backend {
        server 127.0.0.1:${BACKEND_PORT};
    }
    
    # HTTP server - redirect to HTTPS
    server {
        listen 80;
        server_name ${DOMAIN};
        
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        location / {
            return 301 https://\$host\$request_uri;
        }
    }
    
    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name ${DOMAIN};
        
        ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        
        # Fix for "upstream sent too big header"
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
        
        # API routes to backend
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_set_header X-Forwarded-Host \$host;
        }
        
        # Everything else to frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_set_header X-Forwarded-Host \$host;
        }
    }
}
EOF
    
    # Test nginx config
    sudo nginx -t -c "$NGINX_CONF" 2>/dev/null || {
        echo -e "${RED}nginx config test failed${NC}"
        sudo nginx -t -c "$NGINX_CONF"
        return 1
    }
    
    # Start nginx (needs sudo for ports 80/443)
    sudo nginx -c "$NGINX_CONF"
    
    echo -e "${GREEN}nginx started for https://${DOMAIN}${NC}"
}

stop_service() {
    local service=$1
    local pid_file="$PID_DIR/${service}.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            echo -e "${YELLOW}Stopping $service (PID: $pid)...${NC}"
            kill "$pid" 2>/dev/null || true
            sleep 1
            # Force kill if still running
            kill -9 "$pid" 2>/dev/null || true
        fi
        rm -f "$pid_file"
    fi
}

stop_nginx() {
    echo -e "${YELLOW}Stopping nginx...${NC}"
    if [ -f "$PID_DIR/nginx.pid" ]; then
        sudo nginx -c "$NGINX_CONF" -s quit 2>/dev/null || true
        sleep 1
        # Force stop if still running
        if [ -f "$PID_DIR/nginx.pid" ]; then
            local pid=$(cat "$PID_DIR/nginx.pid")
            sudo kill -9 "$pid" 2>/dev/null || true
            rm -f "$PID_DIR/nginx.pid"
        fi
    fi
    # Kill any nginx on ports 80/443
    sudo fuser -k 80/tcp 2>/dev/null || true
    sudo fuser -k 443/tcp 2>/dev/null || true
}

stop_all() {
    print_header "Stopping All Services"
    
    stop_nginx
    stop_service "frontend"
    stop_service "huey"
    stop_service "backend"
    
    # Also kill by port as fallback
    kill_port $FRONTEND_PORT
    kill_port $BACKEND_PORT
    
    echo -e "${GREEN}All services stopped${NC}"
}

status() {
    print_header "Service Status"
    
    for service in backend huey frontend nginx; do
        local pid_file="$PID_DIR/${service}.pid"
        if [ -f "$pid_file" ]; then
            local pid=$(cat "$pid_file")
            if kill -0 "$pid" 2>/dev/null; then
                echo -e "  $service: ${GREEN}Running${NC} (PID: $pid)"
            else
                echo -e "  $service: ${RED}Stopped${NC} (stale PID file)"
            fi
        else
            echo -e "  $service: ${RED}Stopped${NC}"
        fi
    done
    echo ""
}

start_all() {
    print_header "Starting CISO Assistant"
    echo "Configuration:"
    echo "  Domain:   ${DOMAIN}"
    echo "  Backend:  http://127.0.0.1:${BACKEND_PORT}"
    echo "  Frontend: http://127.0.0.1:${FRONTEND_PORT}"
    echo "  nginx:    https://${DOMAIN} (ports 80/443)"
    echo ""
    
    # Stop any existing services
    stop_all
    
    # Start services
    start_backend
    sleep 5  # Wait for backend to be ready
    
    start_huey
    start_frontend
    
    sleep 3  # Wait for frontend to be ready
    start_nginx
    
    echo ""
    print_header "All Services Started!"
    echo ""
    echo "  Access the application at:"
    echo -e "    ${GREEN}https://${DOMAIN}${NC}"
    echo ""
    echo "  Logs are in: $LOG_DIR"
    echo ""
    echo "  Commands:"
    echo "    ./start-debian.sh status  - Check service status"
    echo "    ./start-debian.sh stop    - Stop all services"
    echo "    ./start-debian.sh logs    - View logs"
    echo ""
}

show_logs() {
    local service=${1:-all}
    
    if [ "$service" == "all" ]; then
        echo -e "${CYAN}=== Backend Log ===${NC}"
        tail -n 20 "$LOG_DIR/backend.log" 2>/dev/null || echo "No backend log"
        echo ""
        echo -e "${CYAN}=== Huey Log ===${NC}"
        tail -n 20 "$LOG_DIR/huey.log" 2>/dev/null || echo "No huey log"
        echo ""
        echo -e "${CYAN}=== Frontend Log ===${NC}"
        tail -n 20 "$LOG_DIR/frontend.log" 2>/dev/null || echo "No frontend log"
        echo ""
        echo -e "${CYAN}=== nginx Access Log ===${NC}"
        tail -n 20 "$LOG_DIR/nginx-access.log" 2>/dev/null || echo "No nginx access log"
        echo ""
        echo -e "${CYAN}=== nginx Error Log ===${NC}"
        tail -n 20 "$LOG_DIR/nginx-error.log" 2>/dev/null || echo "No nginx error log"
    elif [ "$service" == "nginx" ]; then
        tail -f "$LOG_DIR/nginx-access.log" "$LOG_DIR/nginx-error.log"
    else
        tail -f "$LOG_DIR/${service}.log"
    fi
}

# Main
case "${1:-start}" in
    start)
        start_all
        ;;
    stop)
        stop_all
        ;;
    restart)
        stop_all
        sleep 2
        start_all
        ;;
    status)
        status
        ;;
    logs)
        show_logs "${2:-all}"
        ;;
    backend)
        stop_service "backend"
        kill_port $BACKEND_PORT
        start_backend
        ;;
    huey)
        stop_service "huey"
        start_huey
        ;;
    frontend)
        stop_service "frontend"
        kill_port $FRONTEND_PORT
        start_frontend
        ;;
    nginx)
        stop_nginx
        start_nginx
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|backend|huey|frontend|nginx}"
        echo ""
        echo "Commands:"
        echo "  start     - Start all services (default)"
        echo "  stop      - Stop all services"
        echo "  restart   - Restart all services"
        echo "  status    - Show service status"
        echo "  logs      - Show logs (use 'logs backend' for specific service)"
        echo "  backend   - Restart backend only"
        echo "  huey      - Restart huey only"
        echo "  frontend  - Restart frontend only"
        echo "  nginx     - Restart nginx only"
        exit 1
        ;;
esac
