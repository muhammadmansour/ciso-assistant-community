const path = require('path');

// Staging: ports 8020 (Django) / 3020 (SvelteKit) avoid dev defaults 8000/3000 and PM2 dev 8001/3001.
const STAGE_BACKEND_PORT = '8020';
const STAGE_FRONTEND_PORT = '3020';
const STAGE_PUBLIC_URL = 'https://grc-stage.wathbahs.com';

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
      // BACKEND - Django Development Server (staging ports)
      name: 'ciso-stage-backend',
      cwd: path.join(projectRoot, 'backend'),
      script: poetryPath,
      args: `run python manage.py runserver 0.0.0.0:${STAGE_BACKEND_PORT}`,
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'True',
        ALLOWED_HOSTS:
          'localhost,127.0.0.1,backend,grc.wathbahs.com,grc-stage.wathbahs.com',
        CISO_ASSISTANT_URL: STAGE_PUBLIC_URL,
        CSRF_TRUSTED_ORIGINS:
          'https://grc.wathbahs.com,https://grc-stage.wathbahs.com',
        AUTH_TOKEN_TTL: '7200',
        ATTACHMENT_MAX_SIZE_MB: '100',
        ATTACHMENT_MAX_NAME_LENGTH: '512',
        // Database
        POSTGRES_NAME: process.env.POSTGRES_NAME || 'grc-stage',
        POSTGRES_USER: process.env.POSTGRES_USER || 'grc-stage',
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'grc-stage',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '5432',
        // Avoid "permission denied for schema public" (PG15+): own schema first; empty = off
        POSTGRES_SEARCH_PATH:
          process.env.POSTGRES_SEARCH_PATH !== undefined
            ? process.env.POSTGRES_SEARCH_PATH
            : 'grc_stage',
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
      error_file: path.join(logsDir, 'stage-backend-error.log'),
      out_file: path.join(logsDir, 'stage-backend-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // HUEY - Task Queue Worker
      name: 'ciso-stage-huey',
      cwd: path.join(projectRoot, 'backend'),
      script: poetryPath,
      args: 'run python manage.py run_huey -w 2 --scheduler-interval 60',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'True',
        ALLOWED_HOSTS:
          'localhost,127.0.0.1,grc.wathbahs.com,grc-stage.wathbahs.com',
        CISO_ASSISTANT_URL: STAGE_PUBLIC_URL,
        // Database
        POSTGRES_NAME: process.env.POSTGRES_NAME || 'grc-stage',
        POSTGRES_USER: process.env.POSTGRES_USER || 'grc-stage',
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'grc-stage',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '5432',
        POSTGRES_SEARCH_PATH:
          process.env.POSTGRES_SEARCH_PATH !== undefined
            ? process.env.POSTGRES_SEARCH_PATH
            : 'grc_stage',
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
      error_file: path.join(logsDir, 'stage-huey-error.log'),
      out_file: path.join(logsDir, 'stage-huey-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      // FRONTEND - adapter-node production build (port 3020; run `pnpm run build:staging` in frontend first)
      name: 'ciso-stage-frontend',
      cwd: path.join(projectRoot, 'frontend'),
      script: 'node',
      args: 'build/index.js',
      interpreter: 'none',
      env: {
        HOST: '0.0.0.0',
        PORT: STAGE_FRONTEND_PORT,
        NODE_ENV: 'production',
        PUBLIC_BACKEND_API_URL: `http://127.0.0.1:${STAGE_BACKEND_PORT}/api`,
        PUBLIC_BACKEND_API_EXPOSED_URL: `${STAGE_PUBLIC_URL}/api`,
        ORIGIN: STAGE_PUBLIC_URL,
        PROTOCOL_HEADER: 'x-forwarded-proto',
        BODY_SIZE_LIMIT: '104857600',
      },
      watch: false,
      max_memory_restart: '1G',
      error_file: path.join(logsDir, 'stage-frontend-error.log'),
      out_file: path.join(logsDir, 'stage-frontend-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
