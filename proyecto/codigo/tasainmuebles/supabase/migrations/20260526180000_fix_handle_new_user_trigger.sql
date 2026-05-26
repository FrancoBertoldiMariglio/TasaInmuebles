-- Fix: el trigger handle_new_user fallaba con "Database error saving new user"
-- porque SECURITY DEFINER necesita search_path explícito para resolver el enum
-- rol_usuario y la tabla profiles. Además agrego manejo defensivo de errores:
-- si por alguna razón el insert falla, NO abortamos el signup (rol queda null y
-- el cliente puede refrescar el profile manualmente). Esto desbloquea registros.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_rol public.rol_usuario;
begin
  -- Resolver rol desde raw_user_meta_data con fallback seguro
  begin
    v_rol := coalesce(
      (new.raw_user_meta_data->>'rol')::public.rol_usuario,
      'cliente_b2c'::public.rol_usuario
    );
  exception when others then
    v_rol := 'cliente_b2c'::public.rol_usuario;
  end;

  -- Insert defensivo: si la inserción falla por cualquier motivo
  -- (ej. row ya existe por reintento), no abortamos el signup
  begin
    insert into public.profiles (id, email, rol)
    values (new.id, new.email, v_rol)
    on conflict (id) do nothing;
  exception when others then
    -- Log silencioso. El signup continúa.
    raise warning 'handle_new_user: profile insert failed for user % — %', new.id, sqlerrm;
  end;

  return new;
end;
$$;

-- Asegurar que el trigger sigue conectado (re-create idempotente)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
