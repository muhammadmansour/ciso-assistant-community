#!/bin/bash
# CISO Assistant - PM2 Production Script
# Domain: ciso.wathbahs.com
# Uses PM2 for process management

set -e

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Configuration
DOMAIN="grc.wathbahs.com"
BACKEND_PORT=8000
FRONTEND_PORT=3000

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
echo "  CISO Assistant - PM2 Production"
echo -e "========================================${NC}"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    sudo npm install -g pm2
fi

# Create PM2 ecosystem config - PRODUCTION MODE
cat > "$SCRIPT_DIR/ecosystem.config.js" << 'EOF'
module.exports = {
  apps: [
    {
      // BACKEND - Using Gunicorn (production server, not runserver!)
      name: 'ciso-backend',
      cwd: './backend',
      script: 'poetry',
      args: 'run gunicorn --chdir ciso_assistant --bind 0.0.0.0:8000 --workers 4 --timeout 120 --keep-alive 30 --access-logfile ../logs/gunicorn-access.log ciso_assistant.wsgi:application',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,grc.wathbahs.com,backend',
        CISO_ASSISTANT_URL: 'https://grc.wathbahs.com',
        AUTH_TOKEN_TTL: '7200',
        ATTACHMENT_MAX_SIZE_MB: '100',
        ATTACHMENT_MAX_NAME_LENGTH: '512',
        PATH: process.env.HOME + '/.local/bin:' + process.env.PATH
      },
      watch: false,
      max_memory_restart: '2G',
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'ciso-huey',
      cwd: './backend',
      script: 'poetry',
      args: 'run python manage.py run_huey -w 2 --scheduler-interval 60',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,grc.wathbahs.com',
        CISO_ASSISTANT_URL: 'https://grc.wathbahs.com',
        PATH: process.env.HOME + '/.local/bin:' + process.env.PATH
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/huey-error.log',
      out_file: './logs/huey-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // FRONTEND - Production build served via node
      name: 'ciso-frontend',
      cwd: './frontend',
      script: 'node',
      args: 'build',
      interpreter: 'none',
      env: {
        PUBLIC_BACKEND_API_URL: 'http://127.0.0.1:8000/api',
        PUBLIC_BACKEND_API_EXPOSED_URL: 'https://grc.wathbahs.com/api',
        ORIGIN: 'https://grc.wathbahs.com',
        PUBLIC_DEFAULT_LANGUAGE: 'en',
        PORT: '3000',
        HOST: '0.0.0.0'
      },
      watch: false,
      max_memory_restart: '4G',
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
EOF

# Create logs directories
mkdir -p "$SCRIPT_DIR/logs"
mkdir -p "$BACKEND_DIR/logs"

# Function to run migrations (without loading/updating frameworks)
run_migrations() {
    echo -e "${GREEN}Running database migrations...${NC}"
    cd "$BACKEND_DIR"
    export PATH="$HOME/.local/bin:$PATH"
    export DJANGO_DEBUG=False
    export ALLOWED_HOSTS="localhost,127.0.0.1,grc.wathbahs.com"
    export CISO_ASSISTANT_URL="https://grc.wathbahs.com"
    export SKIP_STORE_LIBRARIES=true
    poetry run python manage.py makemigrations --noinput
    poetry run python manage.py migrate --noinput
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

# CISO service names (only manage these, leave other PM2 processes untouched)
CISO_SERVICES=("ciso-backend" "ciso-huey" "ciso-frontend")

stop_ciso_services() {
    for svc in "${CISO_SERVICES[@]}"; do
        pm2 stop "$svc" 2>/dev/null || true
    done
}

restart_ciso_services() {
    for svc in "${CISO_SERVICES[@]}"; do
        pm2 restart "$svc" 2>/dev/null || true
    done
}

delete_ciso_services() {
    for svc in "${CISO_SERVICES[@]}"; do
        pm2 delete "$svc" 2>/dev/null || true
    done
}

# Main commands
case "${1:-start}" in
    start)
        echo -e "${GREEN}Starting CISO services (PRODUCTION MODE)...${NC}"
        ensure_gunicorn
        run_migrations
        cd "$SCRIPT_DIR"

        # Verify frontend build exists
        if [ ! -f "$FRONTEND_DIR/build/index.js" ]; then
            echo -e "${RED}Frontend build not found! Run '$0 build' first.${NC}"
            exit 1
        fi

        # Remove old CISO services before starting fresh
        delete_ciso_services
        pm2 start ecosystem.config.js
        pm2 save
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}  CISO services started in PRODUCTION! ${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "  Backend:  Gunicorn (4 workers)"
        echo -e "  Frontend: Production build (node)"
        echo -e "  Access:   https://${DOMAIN}"
        echo ""
        pm2 status
        ;;
    stop)
        echo -e "${YELLOW}Stopping CISO services...${NC}"
        stop_ciso_services
        pm2 status
        ;;
    restart)
        echo -e "${YELLOW}Restarting CISO services...${NC}"
        run_migrations
        restart_ciso_services
        pm2 status
        ;;
    status)
        pm2 status
        ;;
    logs)
        if [ -n "$2" ]; then
            pm2 logs "ciso-$2"
        else
            pm2 logs --lines 50
        fi
        ;;
    delete)
        echo -e "${RED}Deleting CISO PM2 processes only...${NC}"
        delete_ciso_services
        pm2 save
        pm2 status
        ;;
    build)
        echo -e "${GREEN}Building frontend for production...${NC}"
        cd "$FRONTEND_DIR"
        export NODE_OPTIONS="--max-old-space-size=16384"
        pnpm run build
        cd "$SCRIPT_DIR"
        echo -e "${GREEN}Frontend build complete!${NC}"
        ;;
    startup)
        echo -e "${GREEN}Setting up PM2 startup script...${NC}"
        pm2 startup
        pm2 save
        echo "PM2 will now auto-start on system boot"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|build|status|logs|delete|startup}"
        echo ""
        echo "Commands:"
        echo "  start   - Start CISO services (uses existing build)"
        echo "  stop    - Stop CISO services"
        echo "  restart - Restart CISO services"
        echo "  build   - Build frontend for production"
        echo "  status  - Show service status"
        echo "  logs    - Show logs (use 'logs backend', 'logs frontend', 'logs huey')"
        echo "  delete  - Remove CISO PM2 processes"
        echo "  startup - Enable auto-start on boot"
        exit 1
        ;;
esac
