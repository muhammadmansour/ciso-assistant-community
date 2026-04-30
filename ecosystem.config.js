const path = require('path');

// Production: ports 8000 (Django) / 3000 (SvelteKit). The reverse proxy
// (nginx, see backend/nginx.conf server_name grc.wathbahs.com) terminates
// TLS and forwards :443 → 127.0.0.1:3000 (SvelteKit) and /api → 127.0.0.1:8000.
const BACKEND_PORT = '8000';
const FRONTEND_PORT = '3000';
const PUBLIC_URL = 'https://grc.wathbahs.com';

// Resolve paths for Windows
const projectRoot = __dirname;
const poetryPath = path.join(
  process.env.APPDATA || '',
  'Python', 'Python311', 'Scripts', 'poetry.exe'
);
const logsDir = path.join(projectRoot, 'logs');

module.exports = {
  apps: [
    {
      // BACKEND - Django Development Server (production ports)
      name: 'ciso-backend',
      cwd: path.join(projectRoot, 'backend'),
      script: poetryPath,
      args: `run python manage.py runserver 0.0.0.0:${BACKEND_PORT}`,
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS:
          'localhost,127.0.0.1,backend,grc.wathbahs.com',
        CISO_ASSISTANT_URL: PUBLIC_URL,
        CSRF_TRUSTED_ORIGINS:
          'https://grc.wathbahs.com',
        AUTH_TOKEN_TTL: '7200',
        ATTACHMENT_MAX_SIZE_MB: '1000',
        ATTACHMENT_MAX_NAME_LENGTH: '512',
        // Database
        POSTGRES_NAME: process.env.POSTGRES_NAME || 'wathbah_grc',
        POSTGRES_USER: process.env.POSTGRES_USER || 'wathbah_grc',
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'wathbah_grc',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '5432',
        POSTGRES_SEARCH_PATH:
          process.env.POSTGRES_SEARCH_PATH !== undefined
            ? process.env.POSTGRES_SEARCH_PATH
            : 'wathbah_grc',
        // Microsoft Graph API email configuration (set in .env on server)
        MS_GRAPH_CLIENT_ID: process.env.MS_GRAPH_CLIENT_ID || '',
        MS_GRAPH_TENANT_ID: process.env.MS_GRAPH_TENANT_ID || '',
        MS_GRAPH_CLIENT_SECRET: process.env.MS_GRAPH_CLIENT_SECRET || '',
        DEFAULT_FROM_EMAIL: process.env.DEFAULT_FROM_EMAIL || 'info@wathbahs.com',
        // Gemini File Search
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
        GEMINI_FILE_SEARCH_STORE_NAME: process.env.GEMINI_FILE_SEARCH_STORE_NAME || '',
      },
      watch: false,
      max_memory_restart: '1G',
      error_file: path.join(logsDir, 'backend-error.log'),
      out_file: path.join(logsDir, 'backend-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // HUEY - Task Queue Worker
      name: 'ciso-huey',
      cwd: path.join(projectRoot, 'backend'),
      script: poetryPath,
      args: 'run python manage.py run_huey -w 2 --scheduler-interval 60',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'False',
        ALLOWED_HOSTS:
          'localhost,127.0.0.1,grc.wathbahs.com',
        CISO_ASSISTANT_URL: PUBLIC_URL,
        // Database
        POSTGRES_NAME: process.env.POSTGRES_NAME || 'wathbah_grc',
        POSTGRES_USER: process.env.POSTGRES_USER || 'wathbah_grc',
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'wathbah_grc',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '5432',
        POSTGRES_SEARCH_PATH:
          process.env.POSTGRES_SEARCH_PATH !== undefined
            ? process.env.POSTGRES_SEARCH_PATH
            : 'wathbah_grc',
        // Microsoft Graph API email configuration (set in .env on server)
        MS_GRAPH_CLIENT_ID: process.env.MS_GRAPH_CLIENT_ID || '',
        MS_GRAPH_TENANT_ID: process.env.MS_GRAPH_TENANT_ID || '',
        MS_GRAPH_CLIENT_SECRET: process.env.MS_GRAPH_CLIENT_SECRET || '',
        DEFAULT_FROM_EMAIL: process.env.DEFAULT_FROM_EMAIL || 'info@wathbahs.com',
        // Gemini File Search
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
        GEMINI_FILE_SEARCH_STORE_NAME: process.env.GEMINI_FILE_SEARCH_STORE_NAME || '',
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: path.join(logsDir, 'huey-error.log'),
      out_file: path.join(logsDir, 'huey-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // FRONTEND - adapter-node production build (port 3000; run `pnpm run build` in frontend first)
      name: 'ciso-frontend',
      cwd: path.join(projectRoot, 'frontend'),
      script: 'node',
      args: 'build/index.js',
      interpreter: 'none',
      env: {
        HOST: '0.0.0.0',
        PORT: FRONTEND_PORT,
        NODE_ENV: 'production',
        PUBLIC_BACKEND_API_URL: `http://127.0.0.1:${BACKEND_PORT}/api`,
        PUBLIC_BACKEND_API_EXPOSED_URL: `${PUBLIC_URL}/api`,
        ORIGIN: PUBLIC_URL,
        PROTOCOL_HEADER: 'x-forwarded-proto',
        BODY_SIZE_LIMIT: '104857600',
      },
      watch: false,
      max_memory_restart: '1G',
      error_file: path.join(logsDir, 'frontend-error.log'),
      out_file: path.join(logsDir, 'frontend-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
