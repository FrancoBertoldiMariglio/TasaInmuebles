#!/usr/bin/env bash
# Usuarios + memberships.

source "$(dirname "$0")/_lib.sh"
load_env
require_var SUPABASE_PROJECT_REF
require_var SUPABASE_ACCESS_TOKEN
require_cmd jq

banner "Profiles"
mgmt_sql "
  select email, rol::text as rol,
         coalesce(nombre || ' ' || apellido, '—') as nombre,
         coalesce(matricula, '—') as matricula
  from public.profiles
  order by created_at
" | jq -r '.[] | "  \(.email | (. + " " * (40 - length))) \(.rol | (. + " " * (14 - length))) \(.nombre)  matrícula: \(.matricula)"'

banner "Memberships en entidades"
mgmt_sql "
  select e.nombre as entidad, e.tipo::text as tipo, p.email,
         m.roles::text as roles
  from public.entidad_miembros m
  join public.entidades e on e.id = m.entidad_id
  join public.profiles  p on p.id = m.user_id
  order by e.nombre, p.email
" | jq -r 'group_by(.entidad) | .[] |
    "\n  🏢 \(.[0].entidad) (\(.[0].tipo))",
    (.[] | "    \(.email | (. + " " * (40 - length))) \(.roles)")'

banner "Entidades sin miembros"
mgmt_sql "
  select e.nombre, e.tipo::text as tipo
  from public.entidades e
  where not exists (select 1 from public.entidad_miembros m where m.entidad_id = e.id)
  order by e.nombre
" | jq -r 'if length == 0 then "  (ninguna — todas tienen al menos 1 miembro)" else .[] | "  ⚠ \(.nombre) (\(.tipo))" end'
