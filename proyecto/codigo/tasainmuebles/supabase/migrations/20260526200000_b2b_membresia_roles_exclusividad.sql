-- ============================================================================
-- B2B v2 — Membresía N:M con roles[], exclusividad de tasador, RLS por rol.
-- Cierra:  DS-18 (modelo N:M con roles[]), DS-19 (exclusividad de tasador).
-- Implementa: BR-030, BR-031, BR-032, BR-033, BR-034, BR-035.
-- Refactoriza:  20260526190000_b2b_model_entidades.sql (modelo viejo con
--               profiles.entidad_id 1:1). Esta migration ELIMINA esa FK.
-- ============================================================================

begin;

-- ─── 1. Ampliar enums ───────────────────────────────────────────────────────
alter type public.tipo_entidad add value if not exists 'unipersonal';

do $$
begin
  if not exists (select 1 from pg_type where typname = 'rol_entidad_miembro') then
    create type public.rol_entidad_miembro as enum (
      'admin',       -- gestiona la entidad: invita, aprueba, ve todo
      'tasador',     -- ejecuta tasaciones
      'solicitante'  -- pide tasaciones, solo ve las propias (BR-033)
    );
  end if;
end $$;

-- ─── 2. tasaciones.creado_por — necesario para BR-033 ──────────────────────
-- El Solicitante user ve solo las tasaciones que él creó. solicitante_id
-- apunta a tabla solicitantes (entidad de contacto), no a auth user, así
-- que necesitamos un campo dedicado de "user creador".
alter table public.tasaciones
  add column if not exists creado_por uuid references public.profiles(id) on delete set null;

create index if not exists tasaciones_creado_por_idx
  on public.tasaciones(creado_por) where creado_por is not null;

comment on column public.tasaciones.creado_por is
  'User (profile) que creó la tasación. Usado por BR-033 para Solicitantes.';

-- ─── 3. Tabla entidad_miembros (BR-031) ────────────────────────────────────
create table if not exists public.entidad_miembros (
  entidad_id uuid not null references public.entidades(id) on delete cascade,
  user_id    uuid not null references public.profiles(id)  on delete cascade,
  roles      public.rol_entidad_miembro[] not null
             check (array_length(roles, 1) > 0),
  created_at timestamptz not null default now(),
  primary key (entidad_id, user_id)
);

create index if not exists entidad_miembros_user_idx
  on public.entidad_miembros(user_id);

comment on table public.entidad_miembros is
  'N:M user ↔ entidad con roles[] por par. PK (entidad_id, user_id). DS-18.';

-- ─── 4. Backfill desde profiles.entidad_id ─────────────────────────────────
insert into public.entidad_miembros (entidad_id, user_id, roles)
select
  p.entidad_id,
  p.id,
  case p.rol
    when 'admin'       then array['admin']::public.rol_entidad_miembro[]
    when 'tasador'     then array['tasador']::public.rol_entidad_miembro[]
    when 'comite'      then array['tasador']::public.rol_entidad_miembro[]
    when 'cliente_b2b' then array['solicitante']::public.rol_entidad_miembro[]
    when 'cliente_b2c' then array['solicitante']::public.rol_entidad_miembro[]
  end
from public.profiles p
where p.entidad_id is not null
on conflict (entidad_id, user_id) do nothing;

-- ─── 5. Drop profiles.entidad_id — entidad_miembros es la única fuente ─────
alter table public.profiles drop column if exists entidad_id;

-- ─── 6. BR-035: partial unique index — tasador máx 1 entidad comercial ─────
create unique index if not exists entidad_miembros_tasador_comercial_unico
  on public.entidad_miembros(user_id)
  where 'tasador' = any(roles)
    and entidad_id in (select id from public.entidades where tipo <> 'unipersonal');

comment on index public.entidad_miembros_tasador_comercial_unico is
  'BR-035: un user con rol tasador en exactamente 1 entidad NO unipersonal.';

-- ─── 7. Helper: chequeo de rol del user actual en una entidad ──────────────
create or replace function public.user_has_role_in_entidad(
  _entidad uuid,
  _role    public.rol_entidad_miembro
) returns boolean
  language sql
  stable
  security definer
  set search_path = public
as $$
  select exists(
    select 1 from public.entidad_miembros
    where entidad_id = _entidad
      and user_id    = (select auth.uid())
      and _role      = any(roles)
  );
$$;

revoke execute on function public.user_has_role_in_entidad(uuid, public.rol_entidad_miembro) from public;
grant  execute on function public.user_has_role_in_entidad(uuid, public.rol_entidad_miembro) to authenticated;

-- ─── 8. BR-034: autocreate Entidad unipersonal al alta de tasador ──────────
create or replace function public.create_unipersonal_for_tasador()
  returns trigger
  language plpgsql
  security definer
  set search_path = public
as $$
declare
  v_entidad_id uuid;
  v_nombre     text;
begin
  if new.rol = 'tasador'
     and not exists(select 1 from public.entidad_miembros where user_id = new.id) then
    v_nombre := trim(coalesce(new.nombre, 'Estudio') || ' ' || coalesce(new.apellido, ''));
    if v_nombre = '' then v_nombre := 'Estudio personal'; end if;

    insert into public.entidades(nombre, tipo)
    values (v_nombre, 'unipersonal')
    returning id into v_entidad_id;

    insert into public.entidad_miembros(entidad_id, user_id, roles)
    values (
      v_entidad_id, new.id,
      array['admin','tasador','solicitante']::public.rol_entidad_miembro[]
    );
  end if;
  return new;
end $$;

drop trigger if exists profiles_create_unipersonal on public.profiles;
create trigger profiles_create_unipersonal
  after insert on public.profiles
  for each row execute function public.create_unipersonal_for_tasador();

-- ─── 9. RLS — entidad_miembros ─────────────────────────────────────────────
alter table public.entidad_miembros enable row level security;

drop policy if exists entidad_miembros_self_read on public.entidad_miembros;
create policy entidad_miembros_self_read on public.entidad_miembros for select to authenticated
  using (
    user_id = (select auth.uid())
    or public.user_has_role_in_entidad(entidad_id, 'admin')
    or (select public.current_user_rol()) = 'admin'
  );

drop policy if exists entidad_miembros_admin_write on public.entidad_miembros;
create policy entidad_miembros_admin_write on public.entidad_miembros for all to authenticated
  using (
    public.user_has_role_in_entidad(entidad_id, 'admin')
    or (select public.current_user_rol()) = 'admin'
  )
  with check (
    public.user_has_role_in_entidad(entidad_id, 'admin')
    or (select public.current_user_rol()) = 'admin'
  );

-- ─── 10. RLS — entidades (re-escrita sin profiles.entidad_id) ──────────────
drop policy if exists entidades_self_read  on public.entidades;
drop policy if exists entidades_admin_write on public.entidades;

create policy entidades_self_read on public.entidades for select to authenticated
  using (
    exists(
      select 1 from public.entidad_miembros m
      where m.entidad_id = entidades.id and m.user_id = (select auth.uid())
    )
    or (select public.current_user_rol()) = 'admin'
  );

create policy entidades_admin_write on public.entidades for all to authenticated
  using (
    (select public.current_user_rol()) = 'admin'
    or public.user_has_role_in_entidad(entidades.id, 'admin')
  )
  with check (
    (select public.current_user_rol()) = 'admin'
    or public.user_has_role_in_entidad(entidades.id, 'admin')
  );

-- ─── 11. RLS — tasaciones BR-033 ───────────────────────────────────────────
drop policy if exists tasaciones_access on public.tasaciones;
create policy tasaciones_access on public.tasaciones for all to authenticated
  using (
    -- Admin global ve todo
    (select public.current_user_rol()) = 'admin'
    -- B2C: el cliente ve sus tasaciones referenciales
    or (cliente_b2c_id is not null and cliente_b2c_id = (select auth.uid()))
    -- B2B Admin o Tasador: todas las de la entidad
    or (entidad_id is not null and (
         public.user_has_role_in_entidad(entidad_id, 'admin')
      or public.user_has_role_in_entidad(entidad_id, 'tasador')
    ))
    -- B2B Solicitante: solo las que él creó
    or (entidad_id is not null
        and public.user_has_role_in_entidad(entidad_id, 'solicitante')
        and creado_por = (select auth.uid()))
  )
  with check (
    (select public.current_user_rol()) = 'admin'
    or (cliente_b2c_id is not null and cliente_b2c_id = (select auth.uid()))
    or (entidad_id is not null and (
         public.user_has_role_in_entidad(entidad_id, 'admin')
      or public.user_has_role_in_entidad(entidad_id, 'tasador')
      or public.user_has_role_in_entidad(entidad_id, 'solicitante')
    ))
  );

-- BR-030: tasaciones.entidad_id NOT NULL — comentado.
-- Aplicar SOLO cuando se confirme que TODOS los registros existentes tienen
-- entidad_id. Para forzarlo, primero backfillear y luego correr:
--   alter table public.tasaciones alter column entidad_id set not null;

commit;
