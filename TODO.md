# TODO — Tasa Inmuebles (Cocucci)

> Tareas pendientes a nivel proyecto. Se complementa con `proyecto/wiki/requisitos/_PROGRESO.md` (dashboard de IR) — este archivo es el backlog ejecutivo, no el dashboard.

**Última actualización**: 2026-05-15
**Hito 1 (MVP demo Colegio)**: 2026-06-25 — ~6 semanas

---

## AVANCES EJECUTADOS

### 2026-05-15 — Handoff prematuro IR → SDD

Se ejecutó un handoff prematuro al ámbito SDD sin completar los pasos cross-cutting de Ruta B (CU-UI fully-dressed). Artefactos generados:

- **`proyecto/wiki/01_alcance_funcional.md`** — Alcance funcional completo (11 secciones), 100% con info disponible. Sección §8 Tecnología registra stack como PENDIENTE (DP-S7). Generado con skill `sandinas-wiki-skills:crear-alcance` y template oficial.
- **`proyecto/wiki/02_arquitectura.md`** — Arquitectura del MVP Hito 1 sin decisiones de stack. Incluye 3 diagramas C4 (Contexto, Contenedores, Secuencia crítica), tabla explícita de **apps por dispositivo** (mobile-only en MVP, web a Fase 2), y stack table con todas las filas PENDIENTE. Generado con skill `sandinas-wiki-skills:crear-arquitectura`.
- **`proyecto/wiki/ADR/ADR-001..006.md`** — 6 ADRs cerrados:
  - ADR-001: App mobile única bifurcada por rol (tasador + B2C).
  - ADR-002: Mobile-only MVP; web y back office a Fase 2.
  - ADR-003: Stack tecnológico diferido (DP-S7).
  - ADR-004: Comunicación 100% síncrona en MVP; eventos a Fase 2.
  - ADR-005: Object storage separado para fotos + PDFs.
  - ADR-006: Monolito modular preferido en MVP; división a Fase 2.

**Prioridad de Decisiones del Proyecto** registrada en `02_arquitectura.md` §0 como **derivada del contexto, revisable con PO**: `Mantenibilidad > Seguridad > Costo > Performance > Estabilidad`.

**Lo que NO se hizo en el handoff prematuro** (sigue pendiente en este TODO):

- No se ejecutó `sandinas-ingenieria-requisitos:ir-handoff-sdd` (no se generó `12_handoff-sdd/manifest.md`). El handoff fue directo a los artefactos SDD; el manifest formal queda como tarea de cierre.
- No se actualizó `02_enfoque-IR.md` para reflejar el cambio de meta (de "solo el corazón fully-dressed" a "los 6 MVP fully-dressed").
- No se actualizó `_PROGRESO.md` paso 11.
- No se cerraron las 4 decisiones cross-cutting bloqueantes (siguen como ítems abiertos abajo).
- No se subió ningún CU-UI a fully-dressed.

### Próximos pasos sugeridos (post-handoff prematuro)

1. **Validar la Prioridad de Decisiones con PO (Sebastián)** en próxima sesión. Si la ordena distinto, actualizar `02_arquitectura.md` §0 y revisar los ADRs afectados.
2. **Cerrar DP-S7** (stack tecnológico) antes de empezar a codear. Esto desbloquea:
   - Refinar `01_alcance_funcional.md` §8 Tecnología con versiones concretas.
   - Refinar `02_arquitectura.md` §6 Stack y la Vista de Despliegue.
   - Cerrar ADR-003 con la elección final (o reemplazarlo con un ADR de "stack elegido").
3. **Cerrar las otras decisiones cross-cutting** (Q02 estados, DP-006 lista Colegio, DS-07 SMTP) — ver TAREA ACTIVA más abajo.
4. **Retomar fully-dress de los 6 CU-UI MVP** (esta es la TAREA ACTIVA original — el handoff prematuro no la reemplaza).
5. **Cerrar el handoff IR formalmente** con `sandinas-ingenieria-requisitos:ir-handoff-sdd` cuando el wiki esté maduro.

---

## TAREA ACTIVA — Subir los 6 CU-UI MVP no-001 a fully-dressed (Cockburn)

**Decisión tomada (2026-05-15)**: subir los 6 CU-UI marcados como `fase: MVP-6sem` (excluyendo CU-UI-001 que ya está fully-dressed) al estilo **fully-dressed (Cockburn)**.

Esto **cambia el enfoque** declarado en `proyecto/wiki/requisitos/02_enfoque-IR.md`, que originalmente decía que solo el "corazón" iba fully-dressed y el resto a nivel-valor. Decisión consciente del CTO: queremos máximo detalle en todos los CU del MVP antes del Hito 1 para alimentar SDD con artefactos robustos.

### CU-UI a tratar

| ID | Título | Estilo actual | Madurez | Orden recomendado |
|---|---|---|---|---|
| CU-UI-014 | Cliente B2C tasación referencial | nivel-valor (147 líneas, 7/13 secciones) | alta | 1 |
| CU-UI-003 | Tasador consulta "Mis tasaciones" | nivel-valor (49 líneas) | media | 2 |
| CU-UI-002 | Tasador inicia sesión | nivel-valor (49 líneas) | media | 3 |
| CU-UI-005 | Tasador comparte tasación | nivel-valor (69 líneas) | media | 4 |
| CU-UI-006 | Admin pre-carga usuarios | nivel-valor (58 líneas, 4/13 secciones) | baja | 5 |
| CU-UI-004 | Comité cierra valor final | nivel-valor (63 líneas) | baja-media | **6 — último** |

> Referencia template fully-dressed: `proyecto/wiki/requisitos/06_usuario/CU-UI-001.md` (172 líneas, ~13 secciones formales).

---

## Pre-requisito — Decisiones cross-cutting que bloquean o desbloquean

Antes (o en paralelo a) la redacción, cerrar estos puntos para evitar re-trabajo:

### Bloqueantes duros

- [ ] **Q02 — Estados del workflow de tasación**. Fuente: `proyecto/wiki/00_preguntas_pendientes.md`. Bloquea CU-UI-004 (transiciones del comité) y CU-UI-006 (estado "activado" del usuario).
- [ ] **DP-006 — Lista real de los ~10 arquitectos del Colegio**. Bloquea CU-UI-006. Depende de Cocucci.
- [ ] **DS-07 — Proveedor SMTP** (Resend / Postmark / otro). Bloquea pulir CU-UI-005 y CU-UI-014. Decide Franco.
- [ ] **Verificar AC-013 colisión**: CU-UI-014 menciona "AC-013 nuevo pendiente" pero ya existe `proyecto/wiki/requisitos/07_software/NF/AC-013.md`. Confirmar si es el mismo o renumerar.

### AC nuevos a producir (vía skill `crear-atributo-calidad`)

- [ ] AC seguridad login (hash bcrypt/argon2, JWT TTL, refresh, rate limit) — para CU-UI-002.
- [ ] AC performance listado mobile (target tiempo de carga) — para CU-UI-003.
- [ ] AC latencia Fitt-Servini al abrir comité — para CU-UI-004.
- [ ] AC generación PDF (target tiempo + tamaño máximo) — para CU-UI-005 y CU-UI-014.
- [ ] AC SMTP delivery (probablemente Fase 2) — para CU-UI-005 y CU-UI-014.

### BR nuevas / a formalizar (vía skill `crear-regla-negocio`)

- [ ] BR password policy (longitud, complejidad, blacklist) — CU-UI-002, CU-UI-006.
- [ ] BR session lifetime + lockout tras N intentos — CU-UI-002.
- [ ] BR visibilidad de tasaciones por rol (tasador ve solo las suyas; cliente B2C idem) — CU-UI-003, CU-UI-014.
- [ ] BR transiciones de estado (Por tasar → Tasada, Tasada → Compartida, etc.) — CU-UI-004, CU-UI-005, CU-UI-014.
- [ ] BR concurrencia / lock en cierre de valor del comité — CU-UI-004.
- [ ] BR override permitido en comité (¿requiere motivo si difiere de Fitt-Servini en > X%?) — CU-UI-004.
- [ ] BR template PDF (campos obligatorios, logo, firmantes) — CU-UI-005, CU-UI-014.
- [ ] **BR-021** disclaimer "No certificada profesionalmente" en PDF referencial — CU-UI-014.
- [ ] **BR-022** visibilidad cliente B2C — CU-UI-014.
- [ ] BR rol "tasador" en pre-carga; BR matrícula colegiada obligatoria — CU-UI-006.

---

## Gaps por CU (qué falta concretamente)

### Patrón común a los 6

Todos requieren:

1. **Frontmatter**:
   - Cambiar `estilo: nivel-valor` → `estilo: fully-dressed (Cockburn)`.
   - Agregar `fully_dressed_razon: <razón>`.
   - Llenar `trazabilidad.software_ac`, `trazabilidad.software_br`, `trazabilidad.tests`.
2. **Sección Resumen** (párrafo introductorio) — falta en 002, 003, 004, 005, 006.
3. **Sección Actores secundarios** explícita — falta en 002, 003, 004, 006.
4. **Postcondición de falla** — falta en 002, 003, 004, 005, 006.
5. **Frecuencia esperada** — falta en los 6.
6. **Flujo principal en formato tabla** (columnas: #, Actor, Acción) — los 6 tienen lista narrativa.
7. **Flujos alternativos (FA-XXX) en tabla** — falta o está inline.
8. **Excepciones (E-XXX) en tabla** — falta o está mini.
9. **Atributos de calidad relevantes** con AC-XXX vinculados — falta en 002, 003, 004, 005, 006.
10. **Reglas de negocio aplicadas** con BR-XXX vinculados — falta en 002, 003, 004, 005, 006.
11. **Decisiones derivadas / pendientes** sección formal — disperso o ausente.
12. **Trazabilidad inversa narrativa** (referencia explícita a RCs / transcript / imágenes) — todos tienen versión mini.

### Específicos por CU

#### CU-UI-002 — Login

- **Decisiones a tomar**:
  - Algoritmo hash (bcrypt vs argon2).
  - Session strategy (JWT TTL, refresh tokens, single-device o multi).
  - Rate limit / lockout tras N intentos.
  - Biometría: ¿MVP o Fase 2?
- **FAs a documentar**: sesión vigente al abrir app, multi-device.
- **Es a documentar**: cuenta bloqueada, deshabilitada por admin, token expirado mid-flight.
- **Estimación**: +40 líneas.

#### CU-UI-003 — Mis tasaciones

- **Decisiones a tomar**:
  - Empty state (primera carga sin tasaciones).
  - Paginación vs scroll infinito; N por página.
  - Ordenamiento adicional al "fecha desc" default.
  - Si incluye tasaciones donde el usuario es miembro de comité (no solo autor).
- **FAs a documentar**: filtrar por estado, filtrar por tipo, tocar fila para detalle, tocar "+ Nueva", tocar "Editar" en borrador.
- **Es a documentar**: token expirado mid-scroll, error al cargar, conexión intermitente, lista grande, filtro sin resultados.
- **Estimación**: +50 líneas.

#### CU-UI-004 — Comité cierra valor (el más complejo)

- **Decisiones a tomar**:
  - **Concurrencia**: ¿lock al primer participante que abre "Cerrar valor"? ¿O cualquiera puede pisar?
  - **Sincronización mobile**: ¿tiempo real entre dispositivos o sincronización por refresh?
  - **Audit log**: persistir quién cerró + timestamp + participantes activos.
  - **Override sin motivo**: ¿obligatorio si difiere de Fitt-Servini en > X%?
  - **Re-trabajo**: ¿el comité puede mandar la tasación de vuelta a "Por tasar"?
- **FAs a documentar**: aceptar Fitt-Servini, override manual, volver a Por tasar, comité asincrónico (un solo miembro cierra).
- **Es a documentar**: Fitt-Servini no calculado (RF-016 falló), override sin motivo cuando difiere mucho, conexión cae en "Cerrar valor", race condition entre dos participantes.
- **AC vinculados**: AC-001 (tiempo flujo), AC nuevo latencia Fitt-Servini.
- **BR vinculadas**: BR-006 (Fitt-Servini), BR transición Por tasar → Tasada, BR override permitido, BR concurrencia/lock.
- **Estimación**: +80 líneas.

#### CU-UI-005 — Compartir

- **Decisiones a tomar**:
  - Transición a "Compartida": ¿al descargar también o solo al enviar mail?
  - Re-compartir si el comité re-abre la tasación: ¿se invalida el PDF? ¿se versiona?
  - DS-07 cerrar proveedor SMTP.
- **FAs a documentar**: Descargar (Opción A), Enviar por mail (Opción C), ambos combinados.
- **Es a documentar (todos faltan)**: SMTP cae al enviar, email mal-formado pasó validación, PDF excede tamaño, template del PDF falla, botón "Enviar mail" habilitado con solicitante sin email (bug heredado de CU-UI-001 FA-003).
- **AC vinculados**: AC nuevo generación PDF, AC nuevo SMTP delivery (probablemente Fase 2).
- **BR vinculadas**: BR transición Tasada → Compartida, BR template PDF (campos obligatorios, logo, firmantes), BR audit log de envío.
- **Estimación**: +60 líneas.

#### CU-UI-006 — Admin pre-carga

- **Pregunta de fondo**: ¿amerita fully-dress un CU que se ejecuta una sola vez con 10 inputs? Decisión tomada: sí porque opción B (los 6). Pero el ROI es discutible — registrar si en revisión decidimos volver a nivel-valor.
- **Decisiones a tomar**:
  - CSV vs panel mínimo (hoy el CU dice "recomendado CSV" pero no cierra).
  - ¿Qué significa "activado"? ¿Puede loguearse antes?
  - ¿Matrícula colegiada se valida sintácticamente o solo trim?
  - ¿DNI es obligatorio en MVP? ¿Para qué se usa?
  - Política de password inicial (longitud, charset, expiración primer login).
  - DP-006 (lista real del Colegio) sigue bloqueante.
- **FAs a documentar**: CSV, panel individual, regenerar password, deshabilitar usuario.
- **Es a documentar (todas faltan)**: email duplicado, matrícula duplicada o malformada, DNI duplicado, CSV malformado, falla parcial del script.
- **AC vinculados**: probablemente reutiliza AC-005 (compliance Ley 25.326).
- **BR vinculadas**: BR rol "tasador" siempre, BR matrícula obligatoria, BR password initial policy.
- **Estimación**: +60 líneas.

#### CU-UI-014 — Cliente B2C tasación referencial (el más maduro)

- **Decisiones a tomar**:
  - **BR-021** (disclaimer PDF) — texto exacto del disclaimer; ¿pasa por revisión legal antes del Hito 1?
  - **BR-022** (visibilidad cliente B2C) — formalizar vía `crear-regla-negocio`.
  - **AC-013 colisión**: confirmar si el AC-013 mencionado en CU-UI-014 es el mismo formalizado en `07_software/NF/AC-013.md` o requiere nuevo código.
  - Mock Robotomus: ¿constante hardcoded? ¿"En desarrollo"? ¿Promedio sobre Fitt-Servini ± %?
  - Empty state en "Mis tasaciones referenciales".
  - Email cross-rol: ¿un arquitecto puede ser cliente B2C con el mismo email?
  - Transición a Compartida (mismo issue que CU-UI-005).
- **FAs a agregar**: tipo_inmueble = terreno (reutilizar FA-002 de CU-UI-001), cliente con tasación previa, cliente con email colisión con tasador.
- **Es a agregar**: SMTP cae al enviar, RF-020 falla al generar PDF, Fitt-Servini devuelve 0 o negativo, cliente cierra app mid-cálculo, password inválido en autoregistro.
- **Sección Frecuencia esperada**: agregar (MVP-6sem bajo durante demo Colegio; post-MVP alto).
- **Sección Decisiones derivadas / pendientes**: consolidar (hoy dispersas como "BR-021 nuevo pendiente").
- **Formato**: pasar flujo principal + FAs + Es a tabla.
- **Estimación**: +30-40 líneas (el menos lejos).

---

## Orden de ejecución sugerido

**Fase 1 — Desbloqueo (cross-cutting)**

1. Cerrar Q02 (estados del workflow). Skill: revisión manual + posible nuevo nodo en wiki.
2. Verificar AC-013 colisión (leer `07_software/NF/AC-013.md` y comparar con CU-UI-014).
3. Decidir DS-07 proveedor SMTP.
4. (Si Cocucci puede) cerrar DP-006 lista del Colegio.

**Fase 2 — Redacción de los 6 CU-UI**

Orden por menor esfuerzo y menor dependencia:

1. **CU-UI-014** — el menos lejos, da momentum.
2. **CU-UI-003** — segundo más barato, no requiere input externo.
3. **CU-UI-002** — decisiones de seguridad técnicas (decide Franco solo).
4. **CU-UI-005** — necesita DS-07 cerrado en Fase 1.
5. **CU-UI-006** — necesita DP-006 cerrado en Fase 1.
6. **CU-UI-004** — último, requiere sesión coordinada con Cocucci/Sebastián por concurrencia y audit.

**Fase 3 — Cierre IR**

- [ ] Actualizar `proyecto/wiki/requisitos/02_enfoque-IR.md` para reflejar la decisión de que los 6 MVP van fully-dressed (no solo el corazón).
- [ ] Actualizar `proyecto/wiki/requisitos/_PROGRESO.md` paso 11 con la nueva meta.
- [ ] Re-ejecutar `validar-terna` (skill `sandinas-ingenieria-requisitos:validar-terna`) sobre los 6 CU para confirmar AC + BR completos.
- [ ] Re-ejecutar `trazabilidad-completa` para refrescar `09_trazabilidad.md` con los nuevos AC/BR.
- [ ] Avanzar al paso 14 del `_PROGRESO.md`: `ir-handoff-sdd`.

---

## Estimación total

| Componente | Estimación |
|---|---|
| Líneas a redactar | ~+320 (suma de los 6) |
| AC nuevos a producir | 3-5 |
| BR nuevas a formalizar | 8-12 |
| Decisiones cross-cutting a cerrar | 4 (Q02, DP-006, DS-07, AC-013 colisión) |

---

## Pendientes menores no relacionados a CU-UI fully-dress

- [ ] **Actualizar `CLAUDE.md` §7**: dice que `proyecto/wiki/` está "vacío todavía", pero hay 85 archivos de IR. Redactar la estructura real.
- [ ] **Actualizar `CLAUDE.md` §3/§4** si surgen nuevas decisiones de stack o alcance.
- [ ] **Confirmar `~2026-10-19`** como fecha exacta del Hito 2 (marcado como estimado en CLAUDE.md).
- [ ] **Confirmar speakers de la transcripción**: Speaker D sigue sin identificar (referenciado en `CLAUDE.md` §1 y en el grafo).
- [ ] **Tombstone o superseder BR-001 en `07_software/BR/`**: es duplicado de BR-NEG-004 (Modelo de comisión 90/10). Su `fase` declara "aplicación efectiva Fase 2 (módulo contable)". Acciones posibles: (a) mover a `05_negocio/_TOMBSTONES.md` con redirect a BR-NEG-004, o (b) re-flaggear `fase: Fase 2` y agregar `replaces: BR-NEG-004` para mantener la referencia bidireccional. Detectado durante audit de cascada CU→RF→BR/AC el 2026-05-15.

## Herramienta de scope MVP (para reunión con sponsor)

Generada el 2026-05-15:

- **`mvp-builder.html`** (raíz del repo): herramienta drag-and-drop para armar/refinar el scope MVP en vivo durante la reunión con el sponsor. Pre-cargada con los 7 CU MVP + cascada 2-hop + AC-012 transversal (= 40 artefactos). Doble-clickear para abrir en navegador.
- **`proyecto/wiki/diseno/generate_mvp_builder.py`**: generador re-ejecutable. Si el wiki cambia (nuevos CUs/RFs/ACs/BRs o cambios de frontmatter), correr el script para refrescar el HTML.
- **Cascada implementada**: 2-hop forward (CU.software_* directo + RF.br_aplicables/ac_aplicables). Cubre 40/41 artefactos MVP-flagged. El único huérfano (BR-001) está excluido por default por ser duplicado de BR-NEG-004.

---

## Referencias rápidas

- Template fully-dressed: `proyecto/wiki/requisitos/06_usuario/CU-UI-001.md`
- Enfoque IR original: `proyecto/wiki/requisitos/02_enfoque-IR.md`
- Dashboard IR: `proyecto/wiki/requisitos/_PROGRESO.md`
- Preguntas abiertas: `proyecto/wiki/00_preguntas_pendientes.md`
- Decisiones pendientes: `proyecto/wiki/requisitos/10_decisiones/pendientes.md`
- Trazabilidad actual: `proyecto/wiki/requisitos/09_trazabilidad.md`
- Grafo de conocimiento: MCP `mcp__graphify-cocucci__*` (299 nodos, 14 comunidades)
