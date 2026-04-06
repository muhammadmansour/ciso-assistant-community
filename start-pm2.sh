#!/bin/bash
# CISO Assistant - PM2 Dev Version Script
# Domain: wathbah.dev
# Uses PM2 for process management

set -e

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Configuration
DOMAIN="grc.wathbah.dev"
BACKEND_PORT=8001
FRONTEND_PORT=3001

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
echo "  CISO Assistant - PM2 Dev Version"
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
      name: 'dev-backend',
      cwd: './backend',
      script: 'poetry',
      args: 'run gunicorn --chdir ciso_assistant --bind 0.0.0.0:8001 --workers 4 --timeout 120 --keep-alive 30 --access-logfile ../logs/gunicorn-access.log ciso_assistant.wsgi:application',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,wathbah.dev,grc.wathbah.dev,backend',
        CISO_ASSISTANT_URL: 'https://grc.wathbah.dev',
        CSRF_TRUSTED_ORIGINS: 'https://grc.wathbah.dev,https://wathbah.dev',
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
      name: 'dev-huey',
      cwd: './backend',
      script: 'poetry',
      args: 'run python manage.py run_huey -w 2 --scheduler-interval 60',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,wathbah.dev,grc.wathbah.dev',
        CISO_ASSISTANT_URL: 'https://grc.wathbah.dev',
        PATH: process.env.HOME + '/.local/bin:' + process.env.PATH
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/huey-error.log',
      out_file: './logs/huey-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // FRONTEND - Production build (node build/index.js)
      name: 'dev-frontend',
      cwd: './frontend',
      script: 'node',
      args: 'build/index.js',
      interpreter: 'none',
      env: {
        PUBLIC_BACKEND_API_URL: 'http://127.0.0.1:8001/api',
        PUBLIC_BACKEND_API_EXPOSED_URL: 'https://grc.wathbah.dev/api',
        ORIGIN: 'https://grc.wathbah.dev',
        PUBLIC_DEFAULT_LANGUAGE: 'en',
        PORT: '3001',
        HOST: '0.0.0.0',
        NODE_ENV: 'production',
        BODY_SIZE_LIMIT: '104857600'
      },
      watch: false,
      max_memory_restart: '2G',
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

# Function to run migrations
run_migrations() {
    echo -e "${GREEN}Running database migrations...${NC}"
    cd "$BACKEND_DIR"
    export PATH="$HOME/.local/bin:$PATH"
    export DJANGO_DEBUG=False
    export ALLOWED_HOSTS="localhost,127.0.0.1,wathbah.dev,grc.wathbah.dev"
    export CISO_ASSISTANT_URL="https://grc.wathbah.dev"
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

# Main commands
case "${1:-start}" in
    start)
        echo -e "${GREEN}Starting all services (PRODUCTION MODE)...${NC}"
        ensure_gunicorn
        run_migrations
        cd "$SCRIPT_DIR"
        pm2 start ecosystem.config.js
        pm2 save
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}  All services started (DEV VERSION)!  ${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "  Backend:  Gunicorn (4 workers)"
        echo -e "  Frontend: Dev mode (Vite)"
        echo -e "  Access:   https://${DOMAIN}"
        echo ""
        pm2 status
        ;;
    stop)
        echo -e "${YELLOW}Stopping CISO services only...${NC}"
        for app in $CISO_APPS; do
            pm2 stop "$app" 2>/dev/null || echo -e "${YELLOW}  $app not running${NC}"
        done
        pm2 status
        ;;
    restart)
        echo -e "${YELLOW}Restarting CISO services only...${NC}"
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
            # Show only CISO logs
            pm2 logs dev-backend dev-frontend dev-huey
        fi
        ;;
    delete)
        echo -e "${RED}Deleting CISO PM2 processes only...${NC}"
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
        echo "Commands:"
        echo "  start   - Start CISO services (production mode)"
        echo "  stop    - Stop CISO services only (other PM2 apps unaffected)"
        echo "  restart - Restart CISO services only"
        echo "  status  - Show all PM2 service status"
        echo "  logs    - Show CISO logs (use 'logs backend', 'logs frontend', 'logs huey')"
        echo "  delete  - Remove CISO PM2 processes only"
        echo "  startup - Enable auto-start on boot"
        exit 1
        ;;
esac
