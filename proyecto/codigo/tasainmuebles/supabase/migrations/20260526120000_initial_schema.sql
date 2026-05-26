-- ============================================================================
-- Tasainmuebles MVP — Schema inicial
-- Cubre CUs: CU-UI-001, 002, 003, 004, 005, 014
-- Decisiones: DS-16 (Supabase BaaS), DP-S7 (stack)
-- ============================================================================

-- ─── Extensiones ─────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";   -- gen_random_uuid()

-- ─── Enums ───────────────────────────────────────────────────────────────────
create type tipo_inmueble as enum (
  'casa', 'depto', 'terreno', 'galpon', 'local', 'oficina'
);

create type motivo_tasacion as enum (
  'venta', 'alquiler', 'sucesion', 'divorcio', 'judicial',
  'garantia', 'contable', 'seguro', 'donacion', 'otro'
);

create type estado_tasacion as enum (
  'borrador',          -- en edición por el tasador
  'a_editar',          -- requiere correcciones
  'a_tasar',           -- lista para comité
  'en_comite',         -- valorándose
  'tasada',            -- valor cerrado
  'compartida'         -- PDF entregado al solicitante
);

create type rol_usuario as enum (
  'tasador',           -- arquitecto matriculado del Colegio
  'comite',            -- subgrupo de tasadores con permiso adicional
  'admin',             -- backoffice
  'cliente_b2c'        -- autoregistrado para tasación referencial
);

create type estado_conservacion as enum (
  'muy_bueno', 'bueno', 'regular', 'a_reciclar'
);

-- ─── Trigger helper para updated_at ──────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- TABLA: profiles — perfil de usuario (extiende auth.users)
-- CU-UI-002 (Login tasador), CU-UI-014 (Cliente B2C), CU-UI-006 (Admin)
-- ============================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  rol rol_usuario not null default 'cliente_b2c',
  nombre text,
  apellido text,
  telefono text,
  matricula text,                                     -- número de matrícula del Colegio (solo tasadores)
  acepto_terminos_at timestamptz,                     -- Ley 25.326 — solo B2C
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create index profiles_rol_idx on public.profiles(rol);

comment on table public.profiles is 'Perfil extendido de cada usuario. PK = auth.users.id';

-- ============================================================================
-- TABLA: solicitantes — datos del solicitante de una tasación profesional
-- CU-UI-001 sección "Solicitante"
-- ============================================================================
create table public.solicitantes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  telefono text not null,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger solicitantes_updated_at
  before update on public.solicitantes
  for each row execute function public.handle_updated_at();

comment on table public.solicitantes is 'Persona física que solicita una tasación profesional (no es usuario del sistema)';

-- ============================================================================
-- TABLA: tasaciones — núcleo del MVP
-- CU-UI-001, 003, 004, 005, 014
-- ============================================================================
create table public.tasaciones (
  id uuid primary key default gen_random_uuid(),
  numero serial unique,                               -- "1578" como ven los usuarios

  -- Ownership y workflow
  tasador_id uuid references public.profiles(id) on delete restrict,
  cliente_b2c_id uuid references public.profiles(id) on delete cascade,  -- solo si es B2C
  estado estado_tasacion not null default 'borrador',
  es_referencial boolean not null default false,     -- true = B2C, false = profesional

  -- Inmueble
  tipo tipo_inmueble not null,
  motivo motivo_tasacion not null,
  domicilio text,
  lat double precision,
  lng double precision,

  -- Solicitante (solo profesional)
  solicitante_id uuid references public.solicitantes(id) on delete set null,

  -- Detalles físicos
  sup_total numeric(10,2),                            -- m²
  sup_cubierta numeric(10,2),
  dormitorios integer,
  banios integer,
  antiguedad_anios integer,
  estado_conservacion estado_conservacion,
  amenities text[] default '{}',                     -- ['pileta','cochera',...]
  descripcion text,

  -- Valoración
  valor_ars numeric(15,2),
  valor_usd numeric(15,2),
  valor_fitt_servini_ars numeric(15,2),               -- valor técnico calculado
  valor_robotomus_ars numeric(15,2),                  -- valor IA (Fase 2)
  cierre_metodo text,                                 -- 'fitt_servini' | 'override' | 'comite'
  cierre_motivo text,                                 -- comentario si override
  cierre_at timestamptz,

  -- PDF compartido
  pdf_url text,
  pdf_generado_at timestamptz,
  pdf_compartido_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Constraint: una tasación es B2C O profesional, no ambas
  constraint tasacion_ownership_check check (
    (es_referencial = true and cliente_b2c_id is not null and tasador_id is null) or
    (es_referencial = false and tasador_id is not null)
  )
);

create trigger tasaciones_updated_at
  before update on public.tasaciones
  for each row execute function public.handle_updated_at();

create index tasaciones_tasador_idx on public.tasaciones(tasador_id) where tasador_id is not null;
create index tasaciones_cliente_idx on public.tasaciones(cliente_b2c_id) where cliente_b2c_id is not null;
create index tasaciones_estado_idx on public.tasaciones(estado);
create index tasaciones_created_idx on public.tasaciones(created_at desc);

comment on table public.tasaciones is 'Tasación profesional o referencial B2C';

-- ============================================================================
-- TABLA: tasacion_fotos — fotos de un inmueble
-- CU-UI-001 sección "Fotos", CU-UI-014
-- ============================================================================
create table public.tasacion_fotos (
  id uuid primary key default gen_random_uuid(),
  tasacion_id uuid not null references public.tasaciones(id) on delete cascade,
  storage_path text not null,                         -- path en bucket "tasacion-fotos"
  orden integer not null default 0,
  descripcion text,                                   -- ej "cocina", "habitación"
  created_at timestamptz not null default now()
);

create index tasacion_fotos_tasacion_idx on public.tasacion_fotos(tasacion_id, orden);

comment on table public.tasacion_fotos is 'Fotos del inmueble. Archivos en bucket Storage tasacion-fotos';

-- ============================================================================
-- TABLA: comite_propuestas — propuestas individuales de cada miembro del comité
-- CU-UI-004 (Comité cierra valor final)
-- ============================================================================
create table public.comite_propuestas (
  id uuid primary key default gen_random_uuid(),
  tasacion_id uuid not null references public.tasaciones(id) on delete cascade,
  tasador_id uuid not null references public.profiles(id) on delete cascade,
  valor_ars numeric(15,2),
  valor_usd numeric(15,2),
  notas text,
  created_at timestamptz not null default now(),
  unique (tasacion_id, tasador_id)
);

create index comite_propuestas_tasacion_idx on public.comite_propuestas(tasacion_id);

comment on table public.comite_propuestas is 'Cada miembro del comité deja su propuesta individual antes del cierre consensuado (DS-12)';

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
alter table public.profiles            enable row level security;
alter table public.solicitantes        enable row level security;
alter table public.tasaciones          enable row level security;
alter table public.tasacion_fotos      enable row level security;
alter table public.comite_propuestas   enable row level security;

-- ─── Helper: rol del usuario actual ─────────────────────────────────────────
create or replace function public.current_user_rol()
returns rol_usuario language sql stable security definer as $$
  select rol from public.profiles where id = auth.uid()
$$;

-- ─── profiles: cada uno ve su propio perfil; admin ve todos ─────────────────
create policy "profile_self_read"  on public.profiles for select
  using (id = auth.uid() or public.current_user_rol() = 'admin');

create policy "profile_self_update" on public.profiles for update
  using (id = auth.uid());

create policy "profile_admin_all"   on public.profiles for all
  using (public.current_user_rol() = 'admin');

-- ─── solicitantes: tasadores y admin gestionan; B2C no ──────────────────────
create policy "solicitantes_pro_read"  on public.solicitantes for select
  using (public.current_user_rol() in ('tasador','comite','admin'));

create policy "solicitantes_pro_write" on public.solicitantes for all
  using (public.current_user_rol() in ('tasador','comite','admin'));

-- ─── tasaciones: tasador ve las suyas; B2C ve las suyas; comité ve todas ───
create policy "tasaciones_tasador_own" on public.tasaciones for all
  using (
    tasador_id = auth.uid() or
    public.current_user_rol() in ('comite','admin')
  );

create policy "tasaciones_b2c_own" on public.tasaciones for all
  using (
    cliente_b2c_id = auth.uid()
  );

-- ─── tasacion_fotos: misma lógica vía join ──────────────────────────────────
create policy "fotos_acceso" on public.tasacion_fotos for all
  using (
    exists (
      select 1 from public.tasaciones t
      where t.id = tasacion_id
        and (
          t.tasador_id = auth.uid() or
          t.cliente_b2c_id = auth.uid() or
          public.current_user_rol() in ('comite','admin')
        )
    )
  );

-- ─── comite_propuestas: cada tasador del comité ve y gestiona la suya ──────
create policy "comite_own_read" on public.comite_propuestas for select
  using (
    public.current_user_rol() in ('comite','admin') or
    tasador_id = auth.uid()
  );

create policy "comite_own_write" on public.comite_propuestas for all
  using (
    tasador_id = auth.uid() and
    public.current_user_rol() in ('comite','admin')
  );

-- ============================================================================
-- TRIGGER: auto-crear profile al confirmar auth.users
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, rol)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data->>'rol')::rol_usuario, 'cliente_b2c')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- STORAGE: bucket tasacion-fotos
-- ============================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tasacion-fotos',
  'tasacion-fotos',
  false,                                              -- privado
  10485760,                                           -- 10MB máx por foto
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
on conflict (id) do nothing;

-- RLS para el bucket: solo el dueño de la tasación (o comité) puede subir/leer
create policy "fotos_storage_read" on storage.objects for select
  using (
    bucket_id = 'tasacion-fotos' and
    exists (
      select 1 from public.tasaciones t
      where t.id::text = (storage.foldername(name))[1]
        and (
          t.tasador_id = auth.uid() or
          t.cliente_b2c_id = auth.uid() or
          public.current_user_rol() in ('comite','admin')
        )
    )
  );

create policy "fotos_storage_write" on storage.objects for insert
  with check (
    bucket_id = 'tasacion-fotos' and
    exists (
      select 1 from public.tasaciones t
      where t.id::text = (storage.foldername(name))[1]
        and (
          t.tasador_id = auth.uid() or
          t.cliente_b2c_id = auth.uid()
        )
    )
  );

create policy "fotos_storage_delete" on storage.objects for delete
  using (
    bucket_id = 'tasacion-fotos' and
    exists (
      select 1 from public.tasaciones t
      where t.id::text = (storage.foldername(name))[1]
        and (t.tasador_id = auth.uid() or t.cliente_b2c_id = auth.uid())
    )
  );
