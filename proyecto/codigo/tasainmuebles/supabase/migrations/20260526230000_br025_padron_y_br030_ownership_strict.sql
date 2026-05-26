-- ============================================================================
-- BR-025 — Padrón inmobiliario (campo opcional, clave de unificación BD)
-- BR-030 — Refuerzo del ownership check: tasaciones B2B exigen entidad_id
-- Aplicada vía MCP el 2026-05-26.
-- ============================================================================

begin;

-- ─── 1. BR-025: padron_inmobiliario ────────────────────────────────────────
-- Nullable. Cuando está presente: validar formato alfanumérico extendido y
-- longitud. NO UNIQUE: la clave de unificación permite duplicados intencionales
-- (dos tasaciones de la misma propiedad comparten padrón). DP-022.

alter table public.tasaciones
  add column if not exists padron_inmobiliario text;

alter table public.tasaciones
  drop constraint if exists tasacion_padron_format;

alter table public.tasaciones
  add constraint tasacion_padron_format check (
    padron_inmobiliario is null
    or (
      padron_inmobiliario ~ '^[A-Za-z0-9./\-]+$'
      and char_length(padron_inmobiliario) between 5 and 50
    )
  );

create index if not exists tasaciones_padron_idx
  on public.tasaciones(padron_inmobiliario)
  where padron_inmobiliario is not null;

comment on column public.tasaciones.padron_inmobiliario is
  'BR-025 / DP-022: clave de unificación de propiedades a nivel BD. OPCIONAL. Si presente: alfanumérico + .-/ permitidos, 5-50 chars. Dos tasaciones con el mismo padrón refieren a la misma propiedad física. NO UNIQUE — los duplicados son intencionales.';

comment on index public.tasaciones_padron_idx is
  'BR-025: lookup de propiedad por padrón (sin UNIQUE para permitir múltiples tasaciones de la misma propiedad).';

-- ─── 2. BR-030: refuerzo del ownership check ──────────────────────────────
-- El check viejo solo exigía tasador_id para B2B. Lo extendemos para exigir
-- también entidad_id. Esto es preferible a un SET NOT NULL strict porque las
-- tasaciones B2C (autotasador, cliente_b2c_id no null) NO tienen entidad.

alter table public.tasaciones drop constraint if exists tasacion_ownership_check;

alter table public.tasaciones
  add constraint tasacion_ownership_check check (
    (
      es_referencial = true
      and cliente_b2c_id is not null
      and tasador_id is null
      and entidad_id is null
    )
    or (
      es_referencial = false
      and tasador_id is not null
      and entidad_id is not null
      and cliente_b2c_id is null
    )
  );

comment on constraint tasacion_ownership_check on public.tasaciones is
  'BR-030 (refuerzo): toda tasación profesional (es_referencial=false) DEBE tener entidad_id Y tasador_id. Tasaciones referenciales (B2C) DEBEN tener cliente_b2c_id Y no tener entidad ni tasador. No se mezclan ambos mundos.';

commit;
