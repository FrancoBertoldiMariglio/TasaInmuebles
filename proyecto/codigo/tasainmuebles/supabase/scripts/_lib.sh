#!/usr/bin/env bash
# Helpers compartidos por todos los scripts de supabase/scripts.
# Source desde otros scripts:   source "$(dirname "$0")/_lib.sh"

set -euo pipefail

# ─── Colors ────────────────────────────────────────────────────────────────
if [[ -t 1 ]]; then
  C_RESET=$'\e[0m'
  C_BOLD=$'\e[1m'
  C_DIM=$'\e[2m'
  C_RED=$'\e[31m'
  C_GREEN=$'\e[32m'
  C_YELLOW=$'\e[33m'
  C_BLUE=$'\e[34m'
  C_MAGENTA=$'\e[35m'
  C_CYAN=$'\e[36m'
else
  C_RESET= C_BOLD= C_DIM= C_RED= C_GREEN= C_YELLOW= C_BLUE= C_MAGENTA= C_CYAN=
fi

log()   { printf '%s%s%s\n' "$C_DIM" "$*" "$C_RESET" >&2; }
info()  { printf '%s%s%s\n' "$C_CYAN" "$*" "$C_RESET" >&2; }
ok()    { printf '%s✓%s %s\n' "$C_GREEN" "$C_RESET" "$*" >&2; }
warn()  { printf '%s⚠%s %s\n' "$C_YELLOW" "$C_RESET" "$*" >&2; }
err()   { printf '%s✗%s %s\n' "$C_RED" "$C_RESET" "$*" >&2; }
die()   { err "$@"; exit 1; }

# ─── Locate this script's directory + load .env ────────────────────────────
LIB_DIR="$( cd "$( dirname "${BASH_SOURCE[0]:-$0}" )" && pwd )"

load_env() {
  local env_file="${LIB_DIR}/.env"
  if [[ ! -f "$env_file" ]]; then
    die ".env no encontrado en ${env_file}. Copiá .env.example a .env y completalo."
  fi
  set -a
  # shellcheck disable=SC1090
  source "$env_file"
  set +a
}

# ─── Sanity checks ─────────────────────────────────────────────────────────
require_var() {
  local name="$1"
  if [[ -z "${!name:-}" || "${!name}" == *"XXXXX"* ]]; then
    die "$name no está seteado en .env (o tiene placeholder)."
  fi
}

require_cmd() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1 || die "Comando requerido no encontrado: $cmd"
}

# ─── Management API helper ─────────────────────────────────────────────────
# uso: mgmt_api GET /v1/projects/{ref}/...
# requiere SUPABASE_ACCESS_TOKEN cargado vía load_env
mgmt_api() {
  local method="$1"; shift
  local path="$1"; shift
  curl -fsSL \
    -X "$method" \
    -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
    -H "Content-Type: application/json" \
    "https://api.supabase.com${path}" "$@"
}

# Helper para queries SQL contra la Management API.
# Recibe la query como único argumento, la wrappea como JSON con jq,
# y la manda al endpoint /database/query. Evita problemas de escaping de quotes.
#
# Uso:   mgmt_sql "select count(*) from tasaciones"
#        mgmt_sql "$(cat << 'EOF'
#                  select id, email from profiles
#                  where rol = 'tasador'
#                  EOF
#                  )"
mgmt_sql() {
  local query="$1"
  local body
  body=$(jq -n --arg q "$query" '{query: $q}')
  curl -fsSL \
    -X POST \
    -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$body" \
    "https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}/database/query"
}

# ─── REST/PostgREST helper (anon) ──────────────────────────────────────────
rest_api() {
  local method="$1"; shift
  local path="$1"; shift
  curl -fsSL \
    -X "$method" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    "${SUPABASE_PROJECT_URL}/rest/v1${path}" "$@"
}

# ─── psql wrapper ──────────────────────────────────────────────────────────
# Requiere DATABASE_URL en .env. Usa libpq si está disponible.
psql_query() {
  require_var DATABASE_URL
  if [[ "$DATABASE_URL" == *"PASSWORD"* ]]; then
    die "DATABASE_URL contiene placeholder PASSWORD. Pegá la connection string real desde Dashboard → Settings → Database → Connection string."
  fi
  local psql_bin
  psql_bin="$(command -v psql || true)"
  if [[ -z "$psql_bin" ]]; then
    # Probar en path estándar de Homebrew para libpq
    if [[ -x /opt/homebrew/opt/libpq/bin/psql ]]; then
      psql_bin=/opt/homebrew/opt/libpq/bin/psql
    elif [[ -x /usr/local/opt/libpq/bin/psql ]]; then
      psql_bin=/usr/local/opt/libpq/bin/psql
    else
      die "psql no encontrado. Instalalo con: brew install libpq && brew link --force libpq"
    fi
  fi
  "$psql_bin" "$DATABASE_URL" "$@"
}

# ─── Headers ───────────────────────────────────────────────────────────────
banner() {
  local title="$1"
  printf '\n%s━━━ %s ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%s\n' \
    "$C_BOLD$C_CYAN" "$title" "$C_RESET"
}
