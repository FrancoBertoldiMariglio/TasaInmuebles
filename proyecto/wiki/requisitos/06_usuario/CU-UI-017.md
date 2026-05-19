---
id: CU-UI-017
nivel: usuario
tipo: caso-de-uso
estilo: esqueleto
estado: pendiente-fase2
version: 1
ultima_modificacion: 2026-05-14
moscow: should
fase: Fase 2
trazabilidad:
  rc_origen: []
  negocio: [BR-NEG-001]
  software_rf: []
---

# CU-UI-017 — Back Office administrativo (web standalone, Fase 2)

## Actor principal
**S-023 Admin de plataforma** (rol interno de Tasa Inmuebles, distinto a sponsor/PO/CTO).

## Actores secundarios
- **S-024 Soporte / mesa de ayuda** (rol interno, puede ver tasaciones de cualquier usuario para asistir, no para modificar).
- **S-001 Cocucci** (sponsor — acceso completo).

## Resumen
El **Back Office** es un módulo web standalone para usuarios internos de Tasa Inmuebles. Aglutina **todas las funciones administrativas** del sistema (CRUD de entidades, parámetros, soporte, reportes) en una sola UI. No es producto para usuarios finales — es herramienta interna.

## Por qué NO está en MVP-6sem
- En MVP la única función administrativa real es **pre-cargar 10 usuarios arquitectos** (CU-UI-006), que se resuelve con un script CLI / seeder. No justifica una UI completa.
- El back office se vuelve necesario cuando entren **Owners B2B**, **soporte real**, **catálogos administrables** y **mesa de ayuda** — todo eso es Fase 2.

## Funciones del Back Office (catálogo)

### A — Usuarios e identidad
- ABM de usuarios (tasadores, owners, admins, soporte).
- Asignar / cambiar roles.
- Suspender / banear / reactivar usuarios.
- Resetear contraseñas.
- Aprobar registros pendientes de tasadores (onboarding asistido — Q05 opción B).

### B — Entidades B2B
- CRUD de Entidades (Remax, banco, juzgado, etc.).
- Asignar tasadores a entidades.
- Configurar reparto de comisión cuando hay inmobiliaria intermedia (DS-02).

### C — Parámetros del sistema
- **Tabla valor/m² Fitt-Servini** (DS-08) — la pieza clave que destraba el MVP.
- Tipo de cambio ARS↔USD manual.
- Catálogo de tipos de inmueble (extender más allá de los 6 iniciales).
- Catálogo de motivos de tasación.
- Catálogo de amenities (Q12).
- Configurar comisión 90/10 (modificable a futuro).

### D — Operaciones
- Asignación manual de tasaciones (override de matching automático).
- Cancelar / refund tasaciones.
- Re-emitir PDF.
- Monitorear estados de tasaciones (lista global, no solo por user).

### E — Soporte / mesa de ayuda
- Ver tasaciones de cualquier usuario (lectura, no modificación).
- Responder consultas vía ticketing interno o link a un canal externo.
- Auditar acciones del usuario.

### F — Auditoría y reportes
- Logs de acciones admin (qué admin tocó qué, cuándo).
- Reporte de tasaciones por período / tasador / zona / motivo.
- Export CSV / Excel.
- Estado del sistema (Robotomus, integraciones).

### G — Configuración del producto
- Versionado de fórmula Fitt-Servini (cuando se refine en Fase 3, BR-020).
- Configuración del proveedor SMTP (DS-07).
- Configuración de pasarela de pagos.
- Toggle de features (feature flags — opcional Fase 3).

## Canal y stack
- **Web standalone** (escritorio). No mobile-first — el admin trabaja en oficina.
- Comparte backend con la app mobile (mismo API, distinto cliente).
- Acceso restringido: roles `admin`, `superadmin`, `soporte` con permisos diferenciados.
- Auditoría obligatoria de cada acción (RG-004 aplica).

## Roles y permisos (preliminar)

| Rol | Puede |
|-----|-------|
| **superadmin** (Franco / Cocucci en MVP) | Todo |
| **admin** | A, B, C, D (sin G) |
| **soporte** | Solo E (lectura) + F (lectura) |
| **contador** (Fase 2-3) | D parcial + F (lectura + export contable) |

## Relación con MVP-6sem (CU-UI-006)

En MVP-6sem, lo único administrativo real es **CU-UI-006 (pre-carga de los 10 arquitectos)**, que se resuelve con un seeder CLI / script Python (sin UI). En Fase 2, **CU-UI-006 se absorbe dentro de CU-UI-017** como una función más del módulo "A — Usuarios e identidad".

## Implicancias arquitectónicas

- **App separada** (otro deploy, otro dominio tipo `admin.tasacioninmuebles.com`). Ventaja: aislamiento de seguridad y release independiente. Desventaja: dos pipelines de CI/CD.
- **Misma base de datos** que el producto principal.
- **Mismo backend (API)** con autorización por rol.
- Stack frontend: típicamente algo simple tipo Refine, RetoolUI, o React + librería de admin UI (Mantine/Ant Design). Decisión técnica DP-007.

## Fase y prioridad
**Should — Fase 2.** Vinculado a Q05 (onboarding tasadores), Q06 (integraciones), Q12 (amenities), DS-02 (reparto B2B), DS-08 (tabla Fitt-Servini administrable).

## Stakeholders nuevos
- **S-023 Admin de plataforma** — agregar a matriz.
- **S-024 Soporte / mesa de ayuda** — agregar a matriz.
- **(Fase 2-3) Contador interno** — pendiente, no agregar todavía.

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

### Referencias salientes

#### Resuelve problema de negocio

- [BR-NEG-001](../05_negocio/BR-NEG-001.md) — Reducir tiempo y fricción de tasaciones inmobiliarias certificadas

<!-- AUTOGEN:trazabilidad END -->
