# Supabase — Scripts de observabilidad y gestión

CLI tooling para gestionar el proyecto Supabase de Tasainmuebles **sin entrar al Dashboard web**. Los scripts usan la Management API de Supabase y `psql` (cuando se necesita SQL).

## Setup inicial

```bash
cd supabase/scripts

# 1. Copiar template y completar con tus credenciales
cp .env.example .env
# Editar .env y llenar:
#   - SUPABASE_ACCESS_TOKEN  (https://supabase.com/dashboard/account/tokens)
#   - SUPABASE_ANON_KEY      (Dashboard → Settings → API Keys → anon/public)
#   - DATABASE_URL           (Dashboard → Settings → Database → Connection string)

# 2. Marcar como ejecutables (se hace una sola vez)
chmod +x *.sh

# 3. Dependencias requeridas
brew install jq          # parser de JSON
brew install libpq        # para psql (si no lo tenés)
brew link --force libpq   # poner psql en PATH
```

## Scripts disponibles

| Script | Función |
|---|---|
| `status.sh` | Resumen del proyecto: tablas, rows, migrations recientes, conexiones DB, contadores de advisors |
| `advisors.sh [security\|performance\|all]` | Detalle de warnings del linter de Supabase |
| `logs.sh [servicio] [limit]` | Tail logs por servicio (api / postgres / auth / storage / realtime / edge-function) |
| `rls.sh` | Reporte de RLS: tablas sin RLS, tablas sin policies, detalle por tabla |
| `users.sh` | Profiles + memberships en entidades + entidades sin miembros |
| `tasaciones.sh` | Stats del workflow Q02: counts por estado, tiempos promedio entre transiciones, distribución por entidad |
| `migrations.sh` | Diff de migrations: aplicadas en remoto vs presentes en el repo |
| `query.sh "<sql>"` | Ejecutar SQL arbitrario contra la DB (read+write con DATABASE_URL del pooler) |

## Ejemplos

```bash
# Estado general del proyecto en una pantalla
./status.sh

# Sólo warnings de seguridad
./advisors.sh security

# Últimas 100 entradas de log del Auth
./logs.sh auth 100

# Auditoría completa de RLS
./rls.sh

# Quién está en qué entidad
./users.sh

# Cómo va el workflow de tasaciones
./tasaciones.sh

# ¿Está el repo sincronizado con la DB?
./migrations.sh

# SQL directo
./query.sh "select count(*) from tasaciones group by estado"
./query.sh -f scripts/some_admin.sql
echo "vacuum analyze" | ./query.sh         # con stdin
./query.sh                                  # modo interactivo (REPL)
```

## Convenciones

- **Read-only por default.** Los scripts NO modifican el estado a menos que se les pase SQL de escritura explícito (en `query.sh`).
- **`.env` nunca se commitea.** Sólo `.env.example` está en git.
- **Salida con color** en terminales con TTY; plana en pipes.
- **Exit codes:** 0 = OK, 1 = error de setup, otro = error de ejecución (HTTP, SQL, etc.).

## Stack interno

- **Management API** (`https://api.supabase.com/v1/projects/{ref}/...`) — con `SUPABASE_ACCESS_TOKEN` Bearer.
  - Endpoint `database/query` permite SQL arbitrario (usa la cuenta de servicio internamente).
  - Endpoint `advisors?type=security|performance` corre los linters.
  - Endpoint `analytics/endpoints/logs.all` consulta Logflare (usado por `logs.sh`).
- **PostgREST** (`{project_url}/rest/v1/...`) — con `apikey: anon` o `service_role` Bearer.
- **psql** (libpq) — conexión directa para queries complejas y modo interactivo.

## Roadmap

- [ ] `seed.sh` — reset + reseed para dev (vía `supabase db reset` con Docker)
- [ ] `backup.sh` — pg_dump del schema+datos (snapshot manual)
- [ ] `tests/rls-roles.sh` — impersonation de roles para validar RLS end-to-end
- [ ] `realtime.sh` — listar suscripciones y canales activos
- [ ] `storage.sh` — listar objetos en buckets + tamaños
