-- ============================================================================
-- Q02 — Modelo de 4 estados (Pendiente → En proceso → En comité → Completada)
-- Implementa BR-026, BR-027, BR-028, BR-029. Obsoletiza BR-008, BR-009.
-- Aplicada vía MCP el 2026-05-26.
-- ============================================================================

begin;

-- ─── 1. Nuevas columnas timestamp (sub-hitos internos BR-027) ──────────────
alter table public.tasaciones
  add column if not exists tasador_asignado_at              timestamptz,
  add column if not exists visita_programada_at             timestamptz,
  add column if not exists inspeccion_ocular_completada_at  timestamptz,
  add column if not exists enviado_a_comite_at              timestamptz,
  add column if not exists completada_at                    timestamptz;

comment on column public.tasaciones.tasador_asignado_at              is 'BR-027 sub-hito 1: entrada al estado En proceso (asignación de tasador).';
comment on column public.tasaciones.visita_programada_at             is 'BR-027 sub-hito 2: tasador agendó la inspección ocular con el solicitante.';
comment on column public.tasaciones.inspeccion_ocular_completada_at  is 'BR-027 sub-hito 3: inspección física + carga inicial completas. BR-028 pre-condición para pasar a En comité.';
comment on column public.tasaciones.enviado_a_comite_at              is 'BR-028 post-condición: el tasador envió la tasación al comité.';
comment on column public.tasaciones.completada_at                    is 'BR-029 post-condición: el comité cerró el valor final.';

-- ─── 2. Backfill timestamps desde estados viejos ───────────────────────────
update public.tasaciones
   set tasador_asignado_at = coalesce(tasador_asignado_at, created_at)
 where tasador_id is not null;

update public.tasaciones
   set inspeccion_ocular_completada_at = coalesce(inspeccion_ocular_completada_at, updated_at)
 where estado::text in ('a_editar','a_tasar','en_comite','tasada','compartida');

update public.tasaciones
   set enviado_a_comite_at = coalesce(enviado_a_comite_at, updated_at)
 where estado::text in ('en_comite','tasada','compartida');

update public.tasaciones
   set completada_at = coalesce(completada_at, cierre_at, updated_at)
 where estado::text in ('tasada','compartida');

update public.tasaciones
   set pdf_compartido_at = coalesce(pdf_compartido_at, updated_at)
 where estado::text = 'compartida';

update public.tasaciones
   set cierre_metodo = coalesce(cierre_metodo, 'legacy_seed')
 where estado::text in ('tasada','compartida');

-- ─── 3. Nuevo enum estado_tasacion_v2 ──────────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_type where typname = 'estado_tasacion_v2') then
    create type public.estado_tasacion_v2 as enum (
      'pendiente', 'en_proceso', 'en_comite', 'completada'
    );
  end if;
end $$;

-- ─── 4. Cambiar el tipo de la columna estado ────────────────────────────────
-- Mapping viejo → nuevo:
--   borrador (sin tasador) → pendiente
--   borrador (con tasador) → en_proceso (caso seed)
--   a_editar, a_tasar      → en_proceso
--   en_comite              → en_comite
--   tasada, compartida     → completada

alter table public.tasaciones alter column estado drop default;

alter table public.tasaciones
  alter column estado type public.estado_tasacion_v2
  using case
    when estado::text = 'borrador' and tasador_id is null then 'pendiente'::public.estado_tasacion_v2
    when estado::text = 'borrador' and tasador_id is not null then 'en_proceso'::public.estado_tasacion_v2
    when estado::text = 'a_editar'   then 'en_proceso'::public.estado_tasacion_v2
    when estado::text = 'a_tasar'    then 'en_proceso'::public.estado_tasacion_v2
    when estado::text = 'en_comite'  then 'en_comite'::public.estado_tasacion_v2
    when estado::text = 'tasada'     then 'completada'::public.estado_tasacion_v2
    when estado::text = 'compartida' then 'completada'::public.estado_tasacion_v2
  end;

alter table public.tasaciones alter column estado set default 'pendiente'::public.estado_tasacion_v2;
alter table public.tasaciones alter column estado set not null;

-- ─── 5. Renombrar enums + drop del viejo ───────────────────────────────────
alter type public.estado_tasacion    rename to estado_tasacion_legacy;
alter type public.estado_tasacion_v2 rename to estado_tasacion;
drop type public.estado_tasacion_legacy;

-- ─── 6. State machine — BR-026, BR-028, BR-029 ─────────────────────────────
create or replace function public.enforce_estado_transitions()
  returns trigger
  language plpgsql
  security definer
  set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if new.estado <> 'pendiente' then
      raise exception 'Nueva tasación debe nacer en estado pendiente (se intentó %)', new.estado
        using errcode = '23514';
    end if;
    return new;
  end if;

  if old.estado = new.estado then
    return new;
  end if;

  -- BR-026: pendiente → en_proceso
  if old.estado = 'pendiente' and new.estado = 'en_proceso' then
    if new.tasador_id is null then
      raise exception 'BR-026: para pasar a en_proceso se debe asignar un tasador (tasador_id es null)'
        using errcode = '23514';
    end if;
    new.tasador_asignado_at := coalesce(new.tasador_asignado_at, now());
    return new;
  end if;

  -- BR-028: en_proceso → en_comite
  if old.estado = 'en_proceso' and new.estado = 'en_comite' then
    if new.inspeccion_ocular_completada_at is null then
      raise exception 'BR-028: para pasar a en_comite la inspección ocular debe estar completada (inspeccion_ocular_completada_at es null)'
        using errcode = '23514';
    end if;
    new.enviado_a_comite_at := coalesce(new.enviado_a_comite_at, now());
    return new;
  end if;

  -- BR-029: en_comite → completada
  if old.estado = 'en_comite' and new.estado = 'completada' then
    if coalesce(new.valor_ars, 0) <= 0 and coalesce(new.valor_usd, 0) <= 0 then
      raise exception 'BR-029: para completar la tasación se debe definir un valor (ARS o USD) > 0'
        using errcode = '23514';
    end if;
    if new.cierre_metodo is null then
      raise exception 'BR-029: para completar la tasación se debe especificar cierre_metodo (fitt_servini | propuesta | override)'
        using errcode = '23514';
    end if;
    new.completada_at := coalesce(new.completada_at, now());
    return new;
  end if;

  raise exception 'Transición de estado inválida: % → % (ver Q02 y BR-026 a BR-029)', old.estado, new.estado
    using errcode = '23514';
end $$;

drop trigger if exists tasaciones_enforce_estado on public.tasaciones;
create trigger tasaciones_enforce_estado
  before insert or update on public.tasaciones
  for each row execute function public.enforce_estado_transitions();

revoke execute on function public.enforce_estado_transitions() from public, anon, authenticated;

comment on function public.enforce_estado_transitions() is
  'Q02 — State machine de estados de tasación. Implementa BR-026 (pendiente→en_proceso), BR-028 (en_proceso→en_comite), BR-029 (en_comite→completada). Solo se invoca desde el trigger BEFORE INS/UPD.';

commit;
