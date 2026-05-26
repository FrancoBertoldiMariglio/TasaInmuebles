-- ============================================================================
-- Modelo B2B: entidades + rol cliente_b2b + entidad_id en profiles/tasaciones
-- Habilita dashboards corporativos para inmobiliarias, bancos, constructoras,
-- juzgados, etc. Cada user B2B pertenece a 1 entidad y ve solo las tasaciones
-- de su organización vía RLS.
-- Aplicada vía MCP el 2026-05-26.
-- ============================================================================

-- ─── 1. Nuevo valor en enum rol_usuario ─────────────────────────────────────
alter type public.rol_usuario add value if not exists 'cliente_b2b';

-- ─── 2. Tipo enum para tipo de entidad ─────────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_type where typname = 'tipo_entidad') then
    create type public.tipo_entidad as enum (
      'inmobiliaria', 'banco', 'constructora', 'juzgado', 'otro'
    );
  end if;
end $$;

-- ─── 3. Tabla entidades ─────────────────────────────────────────────────────
create table if not exists public.entidades (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  tipo public.tipo_entidad not null,
  cuit text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists entidades_updated_at on public.entidades;
create trigger entidades_updated_at
  before update on public.entidades
  for each row execute function public.handle_updated_at();

comment on table public.entidades is 'Cliente corporativo B2B (inmobiliaria, banco, constructora, juzgado). Agrupa users y tasaciones bajo una organización';

-- ─── 4. FKs en profiles y tasaciones ────────────────────────────────────────
alter table public.profiles
  add column if not exists entidad_id uuid references public.entidades(id) on delete set null;

alter table public.tasaciones
  add column if not exists entidad_id uuid references public.entidades(id) on delete set null;

create index if not exists tasaciones_entidad_idx
  on public.tasaciones(entidad_id) where entidad_id is not null;

create index if not exists profiles_entidad_idx
  on public.profiles(entidad_id) where entidad_id is not null;

-- ─── 5. RLS ─────────────────────────────────────────────────────────────────
alter table public.entidades enable row level security;

drop policy if exists entidades_self_read on public.entidades;
create policy entidades_self_read on public.entidades for select to authenticated
  using (
    id = (select entidad_id from public.profiles where id = auth.uid())
    or (select public.current_user_rol()) = 'admin'
  );

drop policy if exists entidades_admin_write on public.entidades;
create policy entidades_admin_write on public.entidades for all to authenticated
  using ((select public.current_user_rol()) = 'admin')
  with check ((select public.current_user_rol()) = 'admin');

-- tasaciones: ampliar policy para incluir clientes B2B de la misma entidad
drop policy if exists tasaciones_access on public.tasaciones;
create policy tasaciones_access on public.tasaciones for all to authenticated
  using (
    tasador_id = (select auth.uid())
    or cliente_b2c_id = (select auth.uid())
    or entidad_id = (select entidad_id from public.profiles where id = auth.uid())
    or (select public.current_user_rol()) in ('comite','admin')
  )
  with check (
    tasador_id = (select auth.uid())
    or cliente_b2c_id = (select auth.uid())
    or entidad_id = (select entidad_id from public.profiles where id = auth.uid())
    or (select public.current_user_rol()) in ('comite','admin')
  );
