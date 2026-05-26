-- ============================================================================
-- Fixes detectados por Supabase advisors (security + performance)
-- Aplicada vía MCP el 2026-05-26
-- ============================================================================

-- ─── 1. search_path explícito en funciones SECURITY DEFINER restantes ──────

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_user_rol()
returns public.rol_usuario
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select rol from public.profiles where id = (select auth.uid())
$$;

-- ─── 2. REVOKE EXECUTE de funciones que NO deben ser llamables vía REST ─────

revoke execute on function public.handle_new_user() from anon, authenticated, public;

-- ─── 3. Índices en FKs no indexadas ─────────────────────────────────────────
create index if not exists comite_propuestas_tasador_idx
  on public.comite_propuestas(tasador_id);

create index if not exists tasaciones_solicitante_idx
  on public.tasaciones(solicitante_id)
  where solicitante_id is not null;

-- ─── 4. RLS policies refactorizadas con (select auth.uid()) ─────────────────
-- Patrón "InitPlan optimization": auth.uid() se evalúa 1 vez por query.

-- profiles ──────────────────────────────────────────────────────────────────
drop policy if exists profile_self_read   on public.profiles;
drop policy if exists profile_self_update on public.profiles;
drop policy if exists profile_admin_all   on public.profiles;

create policy profile_self_read on public.profiles for select
  using (
    id = (select auth.uid())
    or (select public.current_user_rol()) = 'admin'
  );

create policy profile_self_update on public.profiles for update
  using (id = (select auth.uid()));

create policy profile_admin_all on public.profiles for all
  using ((select public.current_user_rol()) = 'admin');

-- solicitantes ──────────────────────────────────────────────────────────────
drop policy if exists solicitantes_pro_read  on public.solicitantes;
drop policy if exists solicitantes_pro_write on public.solicitantes;

create policy solicitantes_pro_read on public.solicitantes for select
  using ((select public.current_user_rol()) in ('tasador','comite','admin'));

create policy solicitantes_pro_write on public.solicitantes for all
  using ((select public.current_user_rol()) in ('tasador','comite','admin'));

-- tasaciones ────────────────────────────────────────────────────────────────
drop policy if exists tasaciones_tasador_own on public.tasaciones;
drop policy if exists tasaciones_b2c_own     on public.tasaciones;

create policy tasaciones_tasador_own on public.tasaciones for all
  using (
    tasador_id = (select auth.uid())
    or (select public.current_user_rol()) in ('comite','admin')
  );

create policy tasaciones_b2c_own on public.tasaciones for all
  using (cliente_b2c_id = (select auth.uid()));

-- tasacion_fotos ────────────────────────────────────────────────────────────
drop policy if exists fotos_acceso on public.tasacion_fotos;

create policy fotos_acceso on public.tasacion_fotos for all
  using (
    exists (
      select 1 from public.tasaciones t
      where t.id = tasacion_id
        and (
          t.tasador_id = (select auth.uid())
          or t.cliente_b2c_id = (select auth.uid())
          or (select public.current_user_rol()) in ('comite','admin')
        )
    )
  );

-- comite_propuestas ─────────────────────────────────────────────────────────
drop policy if exists comite_own_read  on public.comite_propuestas;
drop policy if exists comite_own_write on public.comite_propuestas;

create policy comite_own_read on public.comite_propuestas for select
  using (
    (select public.current_user_rol()) in ('comite','admin')
    or tasador_id = (select auth.uid())
  );

create policy comite_own_write on public.comite_propuestas for all
  using (
    tasador_id = (select auth.uid())
    and (select public.current_user_rol()) in ('comite','admin')
  );

-- storage.objects (fotos del bucket) ────────────────────────────────────────
drop policy if exists fotos_storage_read   on storage.objects;
drop policy if exists fotos_storage_write  on storage.objects;
drop policy if exists fotos_storage_delete on storage.objects;

create policy fotos_storage_read on storage.objects for select
  using (
    bucket_id = 'tasacion-fotos'
    and exists (
      select 1 from public.tasaciones t
      where t.id::text = (storage.foldername(name))[1]
        and (
          t.tasador_id = (select auth.uid())
          or t.cliente_b2c_id = (select auth.uid())
          or (select public.current_user_rol()) in ('comite','admin')
        )
    )
  );

create policy fotos_storage_write on storage.objects for insert
  with check (
    bucket_id = 'tasacion-fotos'
    and exists (
      select 1 from public.tasaciones t
      where t.id::text = (storage.foldername(name))[1]
        and (
          t.tasador_id = (select auth.uid())
          or t.cliente_b2c_id = (select auth.uid())
        )
    )
  );

create policy fotos_storage_delete on storage.objects for delete
  using (
    bucket_id = 'tasacion-fotos'
    and exists (
      select 1 from public.tasaciones t
      where t.id::text = (storage.foldername(name))[1]
        and (
          t.tasador_id = (select auth.uid())
          or t.cliente_b2c_id = (select auth.uid())
        )
    )
  );
