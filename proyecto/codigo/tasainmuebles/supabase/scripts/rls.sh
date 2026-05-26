#!/usr/bin/env bash
# Reporte de RLS por tabla en schema public.
#
# Salida:
#   - Tablas SIN RLS habilitada (✗)
#   - Tablas CON RLS pero SIN policies (semáforo en rojo)
#   - Tablas con policies: cuenta + lista de policies por acción

source "$(dirname "$0")/_lib.sh"
load_env
require_var SUPABASE_PROJECT_REF
require_var SUPABASE_ACCESS_TOKEN
require_cmd jq

banner "RLS — estado por tabla en schema public"

tables_json=$(mgmt_sql "
  select c.relname as tabla,
         c.relrowsecurity as rls_on,
         (select count(*) from pg_policies p
            where p.schemaname = 'public' and p.tablename = c.relname) as n_policies
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'r'
  order by c.relname
")

printf '\n%sTablas sin RLS:%s\n' "$C_RED" "$C_RESET"
sin_rls=$(echo "$tables_json" | jq -r '.[] | select(.rls_on == false) | "  ✗ " + .tabla')
if [[ -z "$sin_rls" ]]; then
  printf '  %s(ninguna — perfecto)%s\n' "$C_DIM" "$C_RESET"
else
  echo "$sin_rls"
fi

printf '\n%sCon RLS pero sin policies (peligro):%s\n' "$C_YELLOW" "$C_RESET"
sin_pol=$(echo "$tables_json" | jq -r '.[] | select(.rls_on == true and .n_policies == 0) | "  ⚠ " + .tabla')
if [[ -z "$sin_pol" ]]; then
  printf '  %s(ninguna)%s\n' "$C_DIM" "$C_RESET"
else
  echo "$sin_pol"
fi

printf '\n%sCon RLS + policies:%s\n' "$C_GREEN" "$C_RESET"
echo "$tables_json" | jq -r '.[] | select(.rls_on == true and .n_policies > 0) | "  ✓ \(.tabla) — \(.n_policies) policy/ies"'

banner "Detalle de policies"
policies_json=$(mgmt_sql "
  select tablename, policyname, cmd, roles::text as roles_text, permissive
  from pg_policies
  where schemaname = 'public'
  order by tablename, policyname
")

echo "$policies_json" | jq -r '
  group_by(.tablename) | .[] |
    "\n  📋 " + .[0].tablename,
    (.[] | "    \(.cmd | (. + " " * (8 - length))) \(.policyname) → \(.roles_text)")
'
