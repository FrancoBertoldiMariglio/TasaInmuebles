#!/usr/bin/env bash
# Resumen del proyecto: estado del proyecto, tablas, rows, migrations recientes,
# y conteo de advisors. Idempotente, solo lee.

source "$(dirname "$0")/_lib.sh"
load_env
require_var SUPABASE_PROJECT_REF
require_var SUPABASE_ACCESS_TOKEN
require_cmd jq

banner "Proyecto"
mgmt_api GET "/v1/projects/${SUPABASE_PROJECT_REF}" | jq -r '
  "  Nombre:      \(.name)",
  "  Ref:         \(.ref)",
  "  Región:      \(.region)",
  "  Status:      \(.status)",
  "  Postgres:    \(.database.version) (\(.database.release_channel))",
  "  Creado:      \(.created_at)"
'

banner "Tablas (public) — rows aproximados"
mgmt_sql "select relname as tabla, n_live_tup as rows_estimados from pg_stat_user_tables where schemaname = 'public' order by relname" \
  | jq -r '.[] | "  \(.tabla | (. + (" " * (24 - length))))  \(.rows_estimados)"'

banner "Migrations aplicadas (últimas 10)"
mgmt_api GET "/v1/projects/${SUPABASE_PROJECT_REF}/database/migrations" \
  | jq -r 'sort_by(.version) | reverse | .[0:10] | reverse | .[] | "  \(.version)  \(.name)"'

banner "Conexiones DB activas"
mgmt_sql "select usename, count(*) as conns from pg_stat_activity where datname = 'postgres' group by usename order by conns desc" \
  | jq -r '.[] | "  \(.usename | (. + (" " * (24 - length))))  \(.conns) conn"'

banner "Advisors — security"
sec_count=$(mgmt_api GET "/v1/projects/${SUPABASE_PROJECT_REF}/advisors/security" | jq -r '.lints | length')
printf "  Warnings: %s%s%s (correr ./advisors.sh security para detalle)\n" "$C_YELLOW" "$sec_count" "$C_RESET"

banner "Advisors — performance"
perf_count=$(mgmt_api GET "/v1/projects/${SUPABASE_PROJECT_REF}/advisors/performance" | jq -r '.lints | length')
printf "  Warnings: %s%s%s (correr ./advisors.sh performance para detalle)\n\n" "$C_YELLOW" "$perf_count" "$C_RESET"
