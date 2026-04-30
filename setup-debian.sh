#!/bin/bash
# CISO Assistant - Debian Production Setup Script
# Domain: grc.wathbahs.com
# This script installs all dependencies and sets up the application
# Uses nginx with Let's Encrypt SSL (ports 80/443)

set -e

echo "========================================"
echo "  CISO Assistant - Debian Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}Please do not run this script as root. Run as a regular user with sudo access.${NC}"
    exit 1
fi

# Update system
echo -e "${GREEN}Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install essential packages
echo -e "${GREEN}Installing essential packages...${NC}"
sudo apt install -y \
    curl \
    wget \
    git \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3 \
    python3-dev \
    python3-pip \
    python3-venv \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libffi-dev \
    shared-mime-info \
    libcairo2 \
    libcairo2-dev \
    libgirepository1.0-dev \
    gir1.2-pango-1.0

# Install Node.js 20.x
echo -e "${GREEN}Installing Node.js 20.x...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi
echo "Node.js version: $(node --version)"

# Install pnpm
echo -e "${GREEN}Installing pnpm...${NC}"
if ! command -v pnpm &> /dev/null; then
    sudo npm install -g pnpm
fi
echo "pnpm version: $(pnpm --version)"

# Install Poetry
echo -e "${GREEN}Installing Poetry...${NC}"
if ! command -v poetry &> /dev/null; then
    curl -sSL https://install.python-poetry.org | python3 -
    export PATH="$HOME/.local/bin:$PATH"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
fi
echo "Poetry version: $(poetry --version)"

# Install nginx
echo -e "${GREEN}Installing nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    # Stop default nginx service - we'll use our own config
    sudo systemctl stop nginx
    sudo systemctl disable nginx
fi
echo "nginx version: $(nginx -v 2>&1)"

# Install certbot for Let's Encrypt SSL
echo -e "${GREEN}Installing certbot...${NC}"
if ! command -v certbot &> /dev/null; then
    sudo apt install -y certbot
fi
echo "certbot version: $(certbot --version 2>&1)"

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Install backend dependencies
echo -e "${GREEN}Installing backend dependencies...${NC}"
cd backend
poetry install --no-interaction
cd ..

# Install frontend dependencies
echo -e "${GREEN}Installing frontend dependencies...${NC}"
cd frontend
pnpm install
cd ..

# Create necessary directories
mkdir -p db
mkdir -p logs
mkdir -p /var/www/certbot 2>/dev/null || sudo mkdir -p /var/www/certbot

echo ""
echo -e "${GREEN}========================================"
echo "  Setup Complete!"
echo "========================================${NC}"
echo ""
echo -e "${YELLOW}IMPORTANT: SSL Certificate Setup${NC}"
echo "If you don't have SSL certificates yet, run:"
echo "  sudo certbot certonly --standalone -d grc.wathbahs.com"
echo ""
echo "Or if nginx is already running:"
echo "  sudo certbot certonly --webroot -w /var/www/certbot -d grc.wathbahs.com"
echo ""
echo "To start the application, run:"
echo "  ./start-debian.sh"
echo ""
echo "Other commands:"
echo "  ./start-debian.sh stop     - Stop all services"
echo "  ./start-debian.sh status   - Check service status"
echo "  ./start-debian.sh restart  - Restart all services"
echo ""
echo "Access at: https://grc.wathbahs.com"
echo ""
