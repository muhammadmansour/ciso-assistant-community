#!/usr/bin/env bash
# Persist local SQLite artefact Huey/cache/secret-key files (dirs are gitignored and not COPY'd into images).
mkdir -p db

# wait for database to be ready
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
while ! python manage.py showmigrations iam >/dev/null; do
  echo "database not ready; waiting"
  sleep 15
done
poetry run python manage.py migrate --settings="${DJANGO_SETTINGS_MODULE}"
poetry run python manage.py storelibraries --settings="${DJANGO_SETTINGS_MODULE}"
if [ -n "$DJANGO_SUPERUSER_EMAIL" ]; then
  poetry run python manage.py createsuperuser --noinput --settings="${DJANGO_SETTINGS_MODULE}"
fi

# Sync AI analysis endpoints call Muraji with requests timeout=300s — worker must survive until then.
GUNICORN_TIMEOUT=${GUNICORN_TIMEOUT:-360}
GUNICORN_KEEPALIVE=${GUNICORN_KEEPALIVE:-30}
GUNICORN_LIMIT_REQUEST_LINE=${GUNICORN_LIMIT_REQUEST_LINE:-5120}
GUNICORN_PORT=${PORT:-8000}

exec gunicorn --chdir ciso_assistant \
  --bind :$GUNICORN_PORT \
  --timeout $GUNICORN_TIMEOUT \
  --keep-alive $GUNICORN_KEEPALIVE \
  --workers=$GUNICORN_WORKERS \
  --limit-request-line=$GUNICORN_LIMIT_REQUEST_LINE \
  --env RUN_MAIN=true \
  ciso_assistant.wsgi:application
