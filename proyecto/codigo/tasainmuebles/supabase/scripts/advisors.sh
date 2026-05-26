#!/usr/bin/env bash
# Detalle de advisors del proyecto. Dos modos:
#   ./advisors.sh           → security + performance, todos los warnings
#   ./advisors.sh security  → solo security
#   ./advisors.sh performance → solo performance
#
# Cada warning incluye título, nivel, descripción corta y link a remediation.

source "$(dirname "$0")/_lib.sh"
load_env
require_var SUPABASE_PROJECT_REF
require_var SUPABASE_ACCESS_TOKEN
require_cmd jq

show_advisors() {
  local type="$1"
  banner "Advisors — $type"
  local resp
  resp=$(mgmt_api GET "/v1/projects/${SUPABASE_PROJECT_REF}/advisors/${type}")
  local n
  n=$(echo "$resp" | jq -r '.lints | length')
  if [[ "$n" == "0" ]]; then
    ok "Sin warnings de $type."
    return
  fi
  printf "%sTotal: %s%s\n\n" "$C_YELLOW$C_BOLD" "$n" "$C_RESET"
  echo "$resp" | jq -r '.lints[] |
    "  \(.level)  \(.title)
    \(.detail)
    \(.remediation)
    "'
}

case "${1:-}" in
  security|sec)
    show_advisors security
    ;;
  performance|perf)
    show_advisors performance
    ;;
  ""|all)
    show_advisors security
    show_advisors performance
    ;;
  *)
    die "Uso: $0 [security|performance|all]"
    ;;
esac
