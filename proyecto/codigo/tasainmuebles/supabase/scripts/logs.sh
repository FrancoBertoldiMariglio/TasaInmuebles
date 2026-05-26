#!/usr/bin/env bash
# Logs por servicio del proyecto (últimas N entradas dentro de la ventana indicada).
#
# Uso:
#   ./logs.sh                       # todos los servicios, últimas 24h, 50 entradas
#   ./logs.sh postgres              # solo Postgres
#   ./logs.sh auth 100              # 100 entradas de Auth
#   ./logs.sh api                   # PostgREST (REST API)
#   ./logs.sh edge                  # Edge Functions
#   ./logs.sh realtime              # WebSocket realtime
#   ./logs.sh storage               # uploads/downloads
#
# Variables opcionales:
#   LOGS_HOURS=2 ./logs.sh postgres   # ventana de 2 horas en vez de 24

source "$(dirname "$0")/_lib.sh"
load_env
require_var SUPABASE_PROJECT_REF
require_var SUPABASE_ACCESS_TOKEN
require_cmd jq

LIMIT="${2:-50}"
HOURS="${LOGS_HOURS:-24}"

# ISO timestamps (compatible BSD date de macOS / GNU date de Linux).
# El endpoint Logflare REQUIERE ambos (start + end) o devuelve 0 resultados.
ISO_END=$(date -u +%Y-%m-%dT%H:%M:%SZ)
ISO_START=$(date -u -v -"${HOURS}"H +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d "${HOURS} hours ago" +%Y-%m-%dT%H:%M:%SZ)

urlencode() {
  jq -rn --arg s "$1" '$s | @uri'
}

table_for_service() {
  case "$1" in
    postgres) echo "postgres_logs" ;;
    auth)     echo "auth_logs" ;;
    api)      echo "edge_logs" ;;
    storage)  echo "storage_logs" ;;
    realtime) echo "realtime_logs" ;;
    edge)     echo "function_edge_logs" ;;
    function) echo "function_logs" ;;
    *)        echo "" ;;
  esac
}

fetch_logs() {
  local service="$1"
  local tbl
  tbl=$(table_for_service "$service")
  if [[ -z "$tbl" ]]; then
    warn "Servicio desconocido: $service"
    return
  fi
  banner "Logs — $service (últimas $LIMIT entradas, ventana ${HOURS}h)"

  # Query mínimo: timestamp + event_message. Para detalle más fino, usar
  # query.sh con psql contra la DB (postgres_logs queda fuera del scope SQL).
  local sql="select t.timestamp, t.event_message from $tbl t order by t.timestamp desc limit $LIMIT"

  local sql_enc start_enc end_enc
  sql_enc=$(urlencode "$sql")
  start_enc=$(urlencode "$ISO_START")
  end_enc=$(urlencode "$ISO_END")

  local resp
  resp=$(curl -fsSL \
    -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
    "https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}/analytics/endpoints/logs.all?sql=${sql_enc}&iso_timestamp_start=${start_enc}&iso_timestamp_end=${end_enc}" \
    2>/dev/null) || {
      warn "fallo en el query Logflare para $service"
      return
    }

  # Verificar errores
  local err
  err=$(echo "$resp" | jq -r '.error // empty' 2>/dev/null)
  if [[ -n "$err" ]]; then
    warn "$err"
    return
  fi

  local n
  n=$(echo "$resp" | jq -r '.result | length' 2>/dev/null || echo 0)
  if [[ "$n" == "0" || "$n" == "null" ]]; then
    printf '  %s(sin entradas en la ventana indicada)%s\n' "$C_DIM" "$C_RESET"
    return
  fi

  # Render — invertido (más recientes al final) + timestamp legible.
  # Logflare devuelve timestamp como int epoch microseconds.
  echo "$resp" | jq -r '.result | reverse | .[] |
    ((.timestamp / 1000000) | strftime("%H:%M:%S")) + "  " +
    ((.event_message // "") | gsub("\n"; " ⏎ ")[0:220])' \
    2>/dev/null | sed "s/^/  /"
}

case "${1:-}" in
  ""|all)
    for s in postgres auth api edge realtime storage; do fetch_logs "$s"; done
    ;;
  postgres|auth|api|storage|realtime|edge|function)
    fetch_logs "$1"
    ;;
  *)
    die "Uso: $0 [postgres|auth|api|edge|realtime|storage|all] [limit=50]"
    ;;
esac
