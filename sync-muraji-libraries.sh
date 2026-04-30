#!/bin/bash
#
# Sync stored libraries from the Muraji API — inline via `manage.py shell -c`.
#
# Terminal equivalent of the hidden "مزامنة مع مراجع" frontend button.
# Fetches https://muraji-api.wathbahs.com/api/libraries and re-imports every
# library into the local StoredLibrary table.
#
# Reads its environment (DB creds, secrets, etc.) from ~/.ciso-staging.env
# by default. Override with CISO_ENV_FILE=/path/to/other.env.
#
# Usage:
#   ./sync-muraji-libraries.sh
#   CISO_ENV_FILE=~/.ciso-prod.env ./sync-muraji-libraries.sh
#   DRY_RUN=1 ./sync-muraji-libraries.sh
#   NO_REPLACE=1 ./sync-muraji-libraries.sh
#   MURAJI_LIBRARIES_API_URL=https://other.example/api/libraries ./sync-muraji-libraries.sh

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"

# Load deployment environment (DB creds, secrets, MURAJI_*, etc).
ENV_FILE="${CISO_ENV_FILE:-$HOME/.ciso-staging.env}"
if [ -f "$ENV_FILE" ]; then
  echo "[sync-muraji] env     : $ENV_FILE"
  set -o allexport
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +o allexport
else
  echo "ERROR: env file not found: $ENV_FILE" >&2
  echo "       set CISO_ENV_FILE=/path/to/your.env to override." >&2
  exit 1
fi

export PYTHONIOENCODING="${PYTHONIOENCODING:-utf-8}"
export LANG="${LANG:-en_US.UTF-8}"

export PATH="$HOME/.local/bin:$HOME/.poetry/bin:/usr/local/bin:$PATH"

if command -v poetry &>/dev/null; then
  POETRY_CMD="poetry"
elif [ -x "$HOME/.local/bin/poetry" ]; then
  POETRY_CMD="$HOME/.local/bin/poetry"
elif [ -x "$HOME/.poetry/bin/poetry" ]; then
  POETRY_CMD="$HOME/.poetry/bin/poetry"
else
  echo "ERROR: Poetry not found. Install it with:"
  echo "  curl -sSL https://install.python-poetry.org | python3 -"
  exit 1
fi

# DB / Django settings come from $ENV_FILE. Provide last-resort fallbacks
# only so the script fails loudly with a clear error instead of a silent
# misconnect if the env file is missing required keys.
export POSTGRES_NAME="${POSTGRES_NAME:?POSTGRES_NAME not set in $ENV_FILE}"
export POSTGRES_USER="${POSTGRES_USER:?POSTGRES_USER not set in $ENV_FILE}"
export POSTGRES_PASSWORD="${POSTGRES_PASSWORD:?POSTGRES_PASSWORD not set in $ENV_FILE}"
export DB_HOST="${DB_HOST:-localhost}"
export DB_PORT="${DB_PORT:-5432}"

export MURAJI_LIBRARIES_API_URL="${MURAJI_LIBRARIES_API_URL:-https://muraji-api.wathbahs.com/api/libraries}"
export DRY_RUN="${DRY_RUN:-0}"
export NO_REPLACE="${NO_REPLACE:-0}"
export HTTP_TIMEOUT="${HTTP_TIMEOUT:-60}"

cd "$BACKEND_DIR"

echo "[sync-muraji] poetry  : $POETRY_CMD"
echo "[sync-muraji] backend : $BACKEND_DIR"
echo "[sync-muraji] DB      : $POSTGRES_USER@$DB_HOST:$DB_PORT/$POSTGRES_NAME"
echo "[sync-muraji] URL     : $MURAJI_LIBRARIES_API_URL"
echo "[sync-muraji] dry-run : $DRY_RUN   no-replace: $NO_REPLACE"
echo

exec "$POETRY_CMD" run python manage.py shell -c "
import os, sys, yaml, requests
from django.db import transaction
from core.models import StoredLibrary

URL         = os.environ['MURAJI_LIBRARIES_API_URL']
TIMEOUT     = int(os.environ.get('HTTP_TIMEOUT', '60'))
DRY_RUN     = os.environ.get('DRY_RUN', '0') == '1'
NO_REPLACE  = os.environ.get('NO_REPLACE', '0') == '1'

print(f'[syncMuraji] syncing libraries from {URL}')

resp = requests.get(URL, timeout=TIMEOUT)
if not resp.ok:
    print(f'فشل في جلب المكتبات من مراجع (HTTP {resp.status_code})', file=sys.stderr)
    sys.exit(1)

payload = resp.json()
if not payload.get('success') or not payload.get('data'):
    print('لا توجد مكتبات متاحة في مراجع')
    sys.exit(0)

def to_yaml(lib):
    pub = lib.get('publication_date')
    if isinstance(pub, str) and 'T' in pub:
        pub = pub.split('T', 1)[0]
    data = {
        'urn'             : lib.get('urn'),
        'locale'          : lib.get('locale') or 'en',
        'ref_id'          : lib.get('ref_id'),
        'name'            : lib.get('name'),
        'description'     : lib.get('description') or None,
        'copyright'       : lib.get('copyright') or None,
        'version'         : lib.get('version'),
        'provider'        : lib.get('provider') or None,
        'packager'        : lib.get('packager') or None,
        'publication_date': pub or None,
        'objects'         : lib.get('content') or {},
    }
    data = {k: v for k, v in data.items() if v is not None}
    return yaml.safe_dump(data, allow_unicode=True, sort_keys=False)

StoredLibrary.__init_class__()

success = update = errors = skipped = 0

for lib in payload['data']:
    urn  = (lib.get('urn') or '').strip()
    name = lib.get('name') or lib.get('ref_id') or '<unnamed>'
    if not urn:
        print(f'  ! missing urn for {name}')
        errors += 1
        continue
    try:
        with transaction.atomic():
            existed = StoredLibrary.objects.filter(urn__iexact=urn).exists()
            if existed and not NO_REPLACE and not DRY_RUN:
                StoredLibrary.objects.filter(urn__iexact=urn).delete()
                StoredLibrary.__init_class__()

            yaml_bytes = to_yaml(lib).encode('utf-8')
            if DRY_RUN:
                yaml.safe_load(yaml_bytes)
                print(f'  [dry-run] would store {urn} (v{lib.get(\"version\")})')
                if existed: update += 1
                else:       success += 1
                continue

            stored = StoredLibrary.store_library_content(yaml_bytes, builtin=False)
        if stored is None:
            skipped += 1
            print(f'  - skipped {urn}: identical hash or older version')
        elif existed:
            update += 1
            print(f'  ~ updated {urn}')
        else:
            success += 1
            print(f'  + stored  {urn}')
    except Exception as exc:
        errors += 1
        print(f'  ! failed  {urn}: {exc}', file=sys.stderr)

total = success + update
prefix = '[dry-run] ' if DRY_RUN else ''
if total > 0:
    if update and success:
        msg = f'تم مزامنة {total} مكتبة ({success} جديدة، {update} محدثة)'
    elif update:
        msg = f'تم تحديث {update} مكتبة من مراجع'
    else:
        msg = f'تم إضافة {success} مكتبة جديدة من مراجع'
    print(prefix + msg)
elif errors:
    print(prefix + f'فشل في المزامنة. الأخطاء: {errors}', file=sys.stderr)
else:
    print(prefix + 'لا توجد مكتبات للمزامنة')

print()
print(f'  created : {success}')
print(f'  updated : {update}')
print(f'  skipped : {skipped}')
print(f'  errors  : {errors}')

if errors and not DRY_RUN:
    sys.exit(1)
"
