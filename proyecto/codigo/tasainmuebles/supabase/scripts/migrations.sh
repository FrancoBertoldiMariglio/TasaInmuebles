#!/usr/bin/env bash
# Diff de migrations: cuáles están aplicadas en remoto vs cuáles existen como
# archivo local en supabase/migrations/. Reporta drift.

source "$(dirname "$0")/_lib.sh"
load_env
require_var SUPABASE_PROJECT_REF
require_var SUPABASE_ACCESS_TOKEN
require_cmd jq

MIGRATIONS_DIR="$( cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd )/migrations"

banner "Migrations remotas (en la DB)"
remote_json=$(mgmt_api GET "/v1/projects/${SUPABASE_PROJECT_REF}/database/migrations")
echo "$remote_json" | jq -r 'sort_by(.version) | .[] | "  \(.version)  \(.name)"'

banner "Migrations locales (en supabase/migrations/)"
if [[ ! -d "$MIGRATIONS_DIR" ]]; then
  warn "Carpeta no encontrada: $MIGRATIONS_DIR"
  exit 0
fi
ls -1 "$MIGRATIONS_DIR" 2>/dev/null | grep -E '\.sql$' | sort | sed 's/^/  /'

# Diff
banner "Diff"
remote_versions=$(echo "$remote_json" | jq -r '.[].version' | sort)
local_versions=$(ls -1 "$MIGRATIONS_DIR" 2>/dev/null | grep -E '^[0-9]+_.*\.sql$' | sed 's/_.*//' | sort)

solo_remoto=$(comm -23 <(echo "$remote_versions") <(echo "$local_versions"))
solo_local=$(comm -13 <(echo "$remote_versions") <(echo "$local_versions"))

if [[ -n "$solo_remoto" ]]; then
  printf '%s⚠ Aplicadas en remoto pero NO en repo local:%s\n' "$C_YELLOW" "$C_RESET"
  echo "$solo_remoto" | sed 's/^/    /'
else
  printf '%s✓ Todas las migrations remotas están en el repo%s\n' "$C_GREEN" "$C_RESET"
fi

echo
if [[ -n "$solo_local" ]]; then
  printf '%s⚠ Locales pero NO aplicadas (correr supabase db push):%s\n' "$C_YELLOW" "$C_RESET"
  echo "$solo_local" | sed 's/^/    /'
else
  printf '%s✓ Todas las migrations locales están aplicadas%s\n' "$C_GREEN" "$C_RESET"
fi
