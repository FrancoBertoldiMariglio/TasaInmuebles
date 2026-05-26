-- ============================================================================
-- Mergear policies permisivas múltiples en una sola con OR + restringir a
-- role authenticated. Aplicada vía MCP el 2026-05-26.
-- Ref: https://supabase.com/docs/guides/database/database-linter?lint=0006
-- ============================================================================

-- ─── profiles ──────────────────────────────────────────────────────────────
drop policy if exists profile_self_read   on public.profiles;
drop policy if exists profile_self_update on public.profiles;
drop policy if exists profile_admin_all   on public.profiles;

create policy profile_select on public.profiles for select
  to authenticated
  using (
    id = (select auth.uid())
    or (select public.current_user_rol()) = 'admin'
  );

create policy profile_update on public.profiles for update
  to authenticated
  using (
    id = (select auth.uid())
    or (select public.current_user_rol()) = 'admin'
  );

create policy profile_admin_insert on public.profiles for insert
  to authenticated
  with check ((select public.current_user_rol()) = 'admin');

create policy profile_admin_delete on public.profiles for delete
  to authenticated
  using ((select public.current_user_rol()) = 'admin');

-- ─── solicitantes ──────────────────────────────────────────────────────────
drop policy if exists solicitantes_pro_read  on public.solicitantes;
drop policy if exists solicitantes_pro_write on public.solicitantes;

create policy solicitantes_pro_access on public.solicitantes for all
  to authenticated
  using ((select public.current_user_rol()) in ('tasador','comite','admin'))
  with check ((select public.current_user_rol()) in ('tasador','comite','admin'));

-- ─── tasaciones ────────────────────────────────────────────────────────────
drop policy if exists tasaciones_tasador_own on public.tasaciones;
drop policy if exists tasaciones_b2c_own     on public.tasaciones;

create policy tasaciones_access on public.tasaciones for all
  to authenticated
  using (
    tasador_id = (select auth.uid())
    or cliente_b2c_id = (select auth.uid())
    or (select public.current_user_rol()) in ('comite','admin')
  )
  with check (
    tasador_id = (select auth.uid())
    or cliente_b2c_id = (select auth.uid())
    or (select public.current_user_rol()) in ('comite','admin')
  );

-- ─── tasacion_fotos ────────────────────────────────────────────────────────
drop policy if exists fotos_acceso on public.tasacion_fotos;

create policy fotos_access on public.tasacion_fotos for all
  to authenticated
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
  )
  with check (
    exists (
      select 1 from public.tasaciones t
      where t.id = tasacion_id
        and (
          t.tasador_id = (select auth.uid())
          or t.cliente_b2c_id = (select auth.uid())
        )
    )
  );

-- ─── comite_propuestas ─────────────────────────────────────────────────────
drop policy if exists comite_own_read  on public.comite_propuestas;
drop policy if exists comite_own_write on public.comite_propuestas;

create policy comite_select on public.comite_propuestas for select
  to authenticated
  using (
    (select public.current_user_rol()) in ('comite','admin')
    or tasador_id = (select auth.uid())
  );

create policy comite_write on public.comite_propuestas for insert
  to authenticated
  with check (
    tasador_id = (select auth.uid())
    and (select public.current_user_rol()) in ('comite','admin')
  );

create policy comite_modify on public.comite_propuestas for update
  to authenticated
  using (
    tasador_id = (select auth.uid())
    and (select public.current_user_rol()) in ('comite','admin')
  );

create policy comite_remove on public.comite_propuestas for delete
  to authenticated
  using (
    tasador_id = (select auth.uid())
    and (select public.current_user_rol()) in ('comite','admin')
  );

-- ─── storage.objects ────────────────────────────────────────────────────────
drop policy if exists fotos_storage_read   on storage.objects;
drop policy if exists fotos_storage_write  on storage.objects;
drop policy if exists fotos_storage_delete on storage.objects;

create policy fotos_storage_read on storage.objects for select
  to authenticated
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
  to authenticated
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
  to authenticated
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
