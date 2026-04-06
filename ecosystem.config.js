const path = require('path');

// Resolve paths for Windows
const projectRoot = __dirname;
const poetryPath = path.join(
  process.env.APPDATA || '',
  'Python', 'Python311', 'Scripts', 'poetry.exe'
);
const pnpmCjs = path.join(
  process.env.APPDATA || '',
  'npm', 'node_modules', 'pnpm', 'bin', 'pnpm.cjs'
);
const logsDir = path.join(projectRoot, 'logs');

module.exports = {
  apps: [
    {
      // BACKEND - Django Development Server
      name: 'ciso-backend',
      cwd: path.join(projectRoot, 'backend'),
      script: poetryPath,
      args: 'run python manage.py runserver 0.0.0.0:8000',
      interpreter: 'none',
      env: {
        DJANGO_DEBUG: 'True',
        ALLOWED_HOSTS: 'localhost,127.0.0.1,backend',
        CISO_ASSISTANT_URL: 'https://grc.wathbahs.com',
        AUTH_TOKEN_TTL: '7200',
        ATTACHMENT_MAX_SIZE_MB: '100',
        ATTACHMENT_MAX_NAME_LENGTH: '512',
        // Database
        POSTGRES_NAME: 'wathbah_grc',
        POSTGRES_USER: 'wathbah_grc',
        POSTGRES_PASSWORD: 'wathbah_grc',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
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
        DJANGO_DEBUG: 'True',
        ALLOWED_HOSTS: 'localhost,127.0.0.1',
        CISO_ASSISTANT_URL: 'https://grc.wathbahs.com',
        // Database
        POSTGRES_NAME: 'wathbah_grc',
        POSTGRES_USER: 'wathbah_grc',
        POSTGRES_PASSWORD: 'wathbah_grc',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
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
      // FRONTEND - SvelteKit Development Server
      name: 'ciso-frontend',
      cwd: path.join(projectRoot, 'frontend'),
      script: pnpmCjs,
      args: 'run dev --host 0.0.0.0 --port 3000',
      interpreter: 'node',
      env: {
        PUBLIC_BACKEND_API_URL: 'http://localhost:8000/api',
        PUBLIC_BACKEND_API_EXPOSED_URL: 'http://localhost:8000/api',
        ORIGIN: 'https://ciso.wathbahs.com',
        NODE_ENV: 'development',
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
