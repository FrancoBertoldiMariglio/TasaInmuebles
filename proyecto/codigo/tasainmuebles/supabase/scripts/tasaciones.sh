#!/usr/bin/env bash
# Stats del workflow de tasaciones (Q02 — 4 estados).

source "$(dirname "$0")/_lib.sh"
load_env
require_var SUPABASE_PROJECT_REF
require_var SUPABASE_ACCESS_TOKEN
require_cmd jq

banner "Counts por estado"
mgmt_sql "
  select estado::text as estado, count(*) as n,
         sum(case when es_referencial then 1 else 0 end) as b2c,
         sum(case when not es_referencial then 1 else 0 end) as b2b
  from public.tasaciones
  group by estado
  order by case estado
    when 'pendiente'  then 1
    when 'en_proceso' then 2
    when 'en_comite'  then 3
    when 'completada' then 4
  end
" | jq -r '.[] | "  \(.estado | (. + " " * (14 - length)))  total: \(.n | tostring | (. + " " * (4 - length)))  B2B: \(.b2b)  B2C: \(.b2c)"'

banner "Timestamps poblados (cobertura)"
mgmt_sql "
  select
    count(*) filter (where tasador_asignado_at is not null) as con_asignado,
    count(*) filter (where inspeccion_ocular_completada_at is not null) as con_inspec,
    count(*) filter (where enviado_a_comite_at is not null) as con_envio,
    count(*) filter (where completada_at is not null) as con_cierre,
    count(*) filter (where pdf_compartido_at is not null) as con_pdf
  from public.tasaciones
" | jq -r '.[] |
    "  con tasador_asignado_at:        \(.con_asignado)",
    "  con inspec_completada_at:       \(.con_inspec)",
    "  con enviado_a_comite_at:        \(.con_envio)",
    "  con completada_at:              \(.con_cierre)",
    "  con pdf_compartido_at:          \(.con_pdf)"'

banner "Tiempos promedio entre transiciones (horas)"
mgmt_sql "
  select
    extract(epoch from avg(inspeccion_ocular_completada_at - tasador_asignado_at)) / 3600.0 as h_asig_a_inspec,
    extract(epoch from avg(enviado_a_comite_at - inspeccion_ocular_completada_at)) / 3600.0 as h_inspec_a_comite,
    extract(epoch from avg(completada_at - enviado_a_comite_at)) / 3600.0 as h_comite_a_cierre
  from public.tasaciones
" | jq -r '.[] |
    "  ⏱  asignación → inspección: \(((.h_asig_a_inspec    // 0)|tostring)[0:7]) h",
    "  ⏱  inspección → comité:     \(((.h_inspec_a_comite // 0)|tostring)[0:7]) h",
    "  ⏱  comité → cierre:         \(((.h_comite_a_cierre // 0)|tostring)[0:7]) h"'

banner "Distribución por entidad"
mgmt_sql "
  select e.nombre as entidad, count(t.id) as n,
         sum(case when t.estado='completada' then 1 else 0 end) as completadas,
         coalesce(sum(t.valor_usd), 0) as valor_usd_total
  from public.entidades e
  left join public.tasaciones t on t.entidad_id = e.id
  group by e.nombre
  order by n desc
" | jq -r '.[] | "  🏢 \(.entidad | (. + " " * (28 - length)))  total: \(.n | tostring | (. + " " * (4 - length)))  completadas: \(.completadas)  USD acumulado: \(.valor_usd_total)"'

banner "Integridad — BR-030 ownership check"
mgmt_sql "
  select count(*) as huerfanas
  from public.tasaciones
  where (es_referencial = true and (cliente_b2c_id is null or entidad_id is not null or tasador_id is not null))
     or (es_referencial = false and (entidad_id is null or tasador_id is null or cliente_b2c_id is not null))
" | jq -r '.[] | if .huerfanas == 0 then "  ✓ todas las tasaciones cumplen tasacion_ownership_check (BR-030)" else "  ⚠ \(.huerfanas) tasaciones violan el ownership check" end'
