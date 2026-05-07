#!/usr/bin/env bash
# ============================================================
# Fast dev startup — skips heavy library operations after first run
# ============================================================
mkdir -p db

if [ ! -n "$DJANGO_SETTINGS_MODULE" ]; then
  export DJANGO_SETTINGS_MODULE=ciso_assistant.settings
fi
if [ ! -n "$DJANGO_SECRET_KEY" ]; then
  if [ ! -f db/django_secret_key ]; then
    cat /proc/sys/kernel/random/uuid >db/django_secret_key
    echo "generating initial Django secret key"
  fi
  export DJANGO_SECRET_KEY=$(<db/django_secret_key)
  echo "Django secret key read from file"
fi

# Wait for database
while ! python manage.py showmigrations iam >/dev/null 2>&1; do
  echo "database not ready; waiting"
  sleep 5
done

# Run migrations
poetry run python manage.py migrate --settings="${DJANGO_SETTINGS_MODULE}"

# Only store/load libraries on FIRST run (marker file check)
if [ ! -f db/.libraries_loaded ]; then
  echo "First run — storing and loading libraries..."
  poetry run python manage.py storelibraries --settings="${DJANGO_SETTINGS_MODULE}"
  touch db/.libraries_loaded
else
  echo "Skipping storelibraries (already done). Delete db/.libraries_loaded to force reload."
fi

if [ -n "$DJANGO_SUPERUSER_EMAIL" ]; then
  poetry run python manage.py createsuperuser --noinput --settings="${DJANGO_SETTINGS_MODULE}"
fi

# Use Django dev server (auto-reload, single process, fast startup)
echo "Starting Django dev server on port ${PORT:-8000}..."
exec poetry run python manage.py runserver 0.0.0.0:${PORT:-8000} --settings="${DJANGO_SETTINGS_MODULE}"
