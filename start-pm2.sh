#!/bin/bash
# CISO Assistant - PM2 Production Script
# Domain: ciso.wathbahs.com
# Uses PM2 for process management

set -e

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Configuration
DOMAIN="ciso.wathbahs.com"
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
      args: 'run gunicorn --chdir ciso_assistant --bind 0.0.0.0:8000 --workers 4 --timeout 120 --keep-alive 30 --access-logfile ./logs/gunicorn-access.log ciso_assistant.wsgi:application',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,ciso.wathbahs.com,backend',
        CISO_ASSISTANT_URL: 'https://ciso.wathbahs.com',
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
        ALLOWED_HOSTS: 'localhost,127.0.0.1,ciso.wathbahs.com',
        CISO_ASSISTANT_URL: 'https://ciso.wathbahs.com',
        PATH: process.env.HOME + '/.local/bin:' + process.env.PATH
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/huey-error.log',
      out_file: './logs/huey-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // FRONTEND - Using production build (not dev mode!)
      name: 'ciso-frontend',
      cwd: './frontend',
      script: 'node',
      args: 'build/index.js',
      interpreter: 'none',
      env: {
        PUBLIC_BACKEND_API_URL: 'http://127.0.0.1:8000/api',
        PUBLIC_BACKEND_API_EXPOSED_URL: 'https://ciso.wathbahs.com/api',
        ORIGIN: 'https://ciso.wathbahs.com',
        PUBLIC_DEFAULT_LANGUAGE: 'ar',
        NODE_ENV: 'production',
        PORT: '3000',
        HOST: '0.0.0.0'
      },
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
EOF

# Create logs directory
mkdir -p "$SCRIPT_DIR/logs"

# Function to run migrations
run_migrations() {
    echo -e "${GREEN}Running database migrations...${NC}"
    cd "$BACKEND_DIR"
    export PATH="$HOME/.local/bin:$PATH"
    export DJANGO_DEBUG=False
    export ALLOWED_HOSTS="localhost,127.0.0.1,ciso.wathbahs.com"
    export CISO_ASSISTANT_URL="https://ciso.wathbahs.com"
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
        echo -e "${GREEN}  All services started in PRODUCTION!  ${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "  Backend:  Gunicorn (4 workers)"
        echo -e "  Frontend: Production build"
        echo -e "  Access:   https://${DOMAIN}"
        echo ""
        pm2 status
        ;;
    stop)
        echo -e "${YELLOW}Stopping all services...${NC}"
        pm2 stop all
        pm2 status
        ;;
    restart)
        echo -e "${YELLOW}Restarting all services...${NC}"
        run_migrations
        pm2 restart all
        pm2 status
        ;;
    status)
        pm2 status
        ;;
    logs)
        if [ -n "$2" ]; then
            pm2 logs "ciso-$2"
        else
            pm2 logs
        fi
        ;;
    delete)
        echo -e "${RED}Deleting all PM2 processes...${NC}"
        pm2 delete all
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
        echo "  start   - Start all services (production mode)"
        echo "  stop    - Stop all services"
        echo "  restart - Restart all services"
        echo "  status  - Show service status"
        echo "  logs    - Show logs (use 'logs backend', 'logs frontend', 'logs huey')"
        echo "  delete  - Remove all PM2 processes"
        echo "  startup - Enable auto-start on boot"
        exit 1
        ;;
esac
