# 00 — Fundamentos (Cockburn 3 pilares)

**Estado:** completo (con un ítem pendiente: snowman formal)
**Última actualización:** 2026-05-14
**Skill responsable:** `definir-fundamentos`

> Los tres pilares definen el "por qué" de la iniciativa antes de tocar requisitos. Sin esto, los RF no tienen anclaje al objetivo de negocio y la trazabilidad queda coja.

---

## Pilar 1 — Negocio (el problema)

### Triple restricción

**Variable fija: TIEMPO.** Alcance y costo son variables.

- **Hito 1 (MVP demo Colegio):** 2026-06-25 (6 semanas desde 2026-05-14).
- **Hito 2 (cierre acuerdo 6 meses con Colegio de Arquitectos):** ~2026-10-19 (a confirmar fecha exacta de firma).

El MVP de las 6 semanas no es el cierre del acuerdo: es la **demo intermedia funcional** para mostrarle al Colegio que el proyecto avanza con tracción. El acuerdo total sigue corriendo hasta octubre.

**Técnica de IR recomendada:** **MoSCoW** (priorización agresiva). Cada feature que entre al MVP tiene que pasar el test: "¿esto hace que ~10 arquitectos del Colegio puedan tasar un inmueble end-to-end?". Si no, queda fuera.

### Cynefin

**Complicado** (mayoritario) con **bordes complejos**.

- **Complicado**: la mayoría del sistema (login, ABM, dashboard, flujo de tasación, generación de PDF, comité manual, persistencia) es análisis experto con cookbook conocido.
- **Complejo**: Robotomus IA (calidad de inferencia depende de datos), ranking de tasadores (depende de comportamiento real), comité conversacional (depende de UX iterativa). Estos requieren **probar–medir–aprender**, no se especifican exhaustivamente arriba.

Implicancia: la mayor parte del MVP se trabaja con técnicas clásicas de IR. Los bordes complejos se aíslan y se diseñan con experimentos chicos de feedback rápido.

### Valor de negocio principal

> Reducir el tiempo y la fricción de obtener una tasación inmobiliaria certificada profesionalmente, conectando demanda con tasadores matriculados y agregando IA para acelerar el armado del informe.

### Métrica de éxito del MVP (Hito 1)

**Criterio estricto 10/10** (decisión cierre A-017, 2026-05-14): los **10 de 10 arquitectos** del Colegio:

1. Inician sesión con credenciales pre-cargadas por admin.
2. Crean al menos una tasación sobre un inmueble real (admite más de una si quieren).
3. Completan el flujo end-to-end: geolocalizar + datos + 3+ fotos + descripción + guardar + enviar a comité.
4. El comité (los 3 socios + el arquitecto autor) cierra el valor final.
5. Se genera el PDF y se descarga o se envía por mail al solicitante.

**Métricas duras (flujo profesional):**
- Adopción: ≥ 10 tasaciones completas end-to-end (1 por arquitecto mínimo).
- Calidad: **0 errores P0** + **0 pérdidas de datos**.
- Sin métrica de satisfacción (NPS) en MVP-6sem.

**Métrica showcase (flujo autotasador Cliente B2C):**
- Demo funcional al Colegio: durante la presentación, mostrar al menos **3 tasaciones referenciales generadas en vivo** desde la app mobile (CTA bifurcado → autoregistro → captura → cálculo Fitt-Servini → PDF con disclaimer).
- No exige adopción real de Clientes B2C externos en MVP — es showcase de feature parity con el modelo "Autotasador" mencionado por Cocucci en la reunión.

**Implicancia operativa:**
- El criterio 10/10 es estricto: no se admite ningún arquitecto que no pueda usar la plataforma. Hay que **reservar tiempo de la semana de demo** para soporte personalizado a cualquier arquitecto atascado.
- Si no se cumple, arriesga la firma de Hito 2 (cierre acuerdo) y la continuidad del proyecto en su forma actual.

**Diferenciadores funcionales MVP** (agregados el 2026-05-14):

1. **Cálculo automático del valor técnico Fitt-Servini** (RF-016 + BR-019). Los arquitectos del Colegio ven el valor profesional pre-calculado al abrir el comité.
2. **Autotasador para Cliente B2C** (CU-UI-014) con MOBILE-ONLY y login bifurcado. Demuestra que la plataforma cubre el caso "Uber de tasación + Autotasador" en una sola app mobile. Las **Tasaciones referenciales** generadas llevan disclaimer "no certificada profesionalmente" — refuerza el rol del tasador colegiado, no compite con él.

Lo que **NO** entra al MVP-6sem (queda para fases siguientes):
- Robotomus IA real entrenado (la inferencia ML sigue siendo Fase 2; en MVP es placeholder).
- Firma digital colegiada.
- Módulo contable / pasarela de pagos.
- Tasación certificada (con inspección ocular formal).
- Dashboards con métricas avanzadas (Owner B2B — Fase 2).
- Marketplace / autoregistro de tasadores.

### Stakeholders críticos para escalación

| Persona | Rol | Tipo de decisión que cierra |
|---------|-----|------------------------------|
| Cristian Cocucci | Sponsor + Visionario | Alcance, acuerdo Colegio, modelo de negocio. |
| Sebastián Ríos | Product Owner | Producto, casos de uso, prioridad funcional. |
| Franco Bertoldi | CTO | Stack, arquitectura, plazos técnicos. |

**Protocolo:** primero consenso de los 3. Sin consenso: negocio → Cocucci; técnico → Franco; producto-técnico → conversación a 3.

---

## Pilar 2 — Colaboración (cómo trabajamos)

### Cadencia de IR

**Bisemanal** durante las 6 semanas del MVP. Eso da **~3 sesiones** de elicitación/validación:

| Sesión | Cuándo (aprox) | Foco |
|--------|----------------|------|
| Reunión-01 ✓ | 2026-05-14 | Workshop inicial (ya hecho). |
| Sesión-02 | ~2026-05-28 | Validación de RF + ajustes de alcance MVP. |
| Sesión-03 | ~2026-06-11 | Validación de demo + feedback antes del corte. |
| Demo Colegio | ~2026-06-25 | Hito 1: presentación al Colegio. |

Post-MVP (hacia el cierre del acuerdo de octubre): cadencia pasa a ad-hoc.

### Ceremonias

- **Workshop inicial:** ✓ ejecutado en reunión-01 (2026-05-14).
- **Sesiones de validación bisemanales:** las 2 sesiones intermedias arriba.
- **Demo al Colegio:** ~2026-06-25 (Hito 1).
- **Validación final del acuerdo:** ~2026-10-19 (Hito 2, fecha a confirmar).
- **NO se adoptan:** dailies, sprints formales, retrospectivas rígidas, comité de cambios formal pre-MVP.

### Snowman (DSDM) — ver `01_stakeholders/snowman.md` v2

| Rol | Persona |
|-----|---------|
| Sponsor | Cristian Cocucci |
| Visionario | Cristian Cocucci |
| Product Owner | Sebastián Ríos |
| Business Analyst | Franco + Sebastián (compartido — ver DF-03) |
| Coordinador técnico | Franco Bertoldi |
| Células de desarrollo | **Franco Bertoldi como único developer** (célula de 1 persona) |
| Consultores externos | `consultor1`, `consultor2` — opinan sobre producto e integran con el ecosistema Cocucci. **NO desarrollan código**. |

**Riesgo derivado:** bus-factor de desarrollo = 1. Mitigaciones en `snowman.md`.

### Protocolo de conflicto

- Consenso de los 3 socios primero.
- Sin consenso → escalación según ámbito:
  - Negocio / alcance / acuerdo Colegio → **Cocucci** decide.
  - Técnico / arquitectura / stack → **Franco** decide.
  - Producto–técnico mixto → conversación a 3, sin votación formal.
- Las decisiones cerradas quedan registradas en `10_decisiones/` con autor y fecha.

---

## Pilar 3 — Producto (la solución y sus artefactos)

### Artefactos esperados de IR

**SÍ producimos:**
- Casos de uso (CU-UI-NNN) — Cockburn fully-dressed.
- Requisitos funcionales (RF-NNN) — paso a paso.
- Atributos de calidad (AC-NNN) — Planguage.
- Reglas de negocio (BR-NNN) — 5 tipos (hecho / restricción / habilitador / inferencia / cálculo).
- Requisitos globales (RG-NNN) — invariantes.
- Glosario (T-NNN) — LEL hipervinculado.
- Trazabilidad — matriz Negocio ↔ Usuario ↔ Software ↔ Tests.

**NO producimos hasta Fase 2:**
- Historias de usuario (decidido en reunión-01: las HU recién aparecen cuando se le agreguen funcionalidades al producto ya construido).
- ADRs formales (los hace después `crear-arquitectura` del plugin de wiki).

### Tooling downstream

- **`sandinas-wiki-skills`** — consumidor principal. Los artefactos de IR alimentan `01_alcance_funcional.md`, `02_arquitectura.md`, `crear-flujo`, `crear-rf`, etc.
- **Notion** — Kanban del proyecto (cuenta de Franco, compartido en solo-lectura con Cocucci y Sebastián).
- **GitLab** — repo + CI/CD del código.
- **Playwright** — E2E cuando exista código.

**NO se usa:** Jira, Azure DevOps, Confluence formal.

### Ciclo de vida de cada artefacto

Estados válidos: **`borrador → validado → aprobado → obsoleto`**.

| Transición | Quién la hace |
|------------|---------------|
| (vacío) → borrador | BA (Franco/Sebastián) durante elicitación. |
| borrador → validado | BA después de chequeo de consistencia con `validar-terna`. |
| validado → aprobado | PO (Sebastián) para CU/RF. Sponsor (Cocucci) cuando hay impacto de negocio. CTO (Franco) para RF técnicos. |
| aprobado → obsoleto | Cualquiera puede proponer; obligatorio dejar CR (`registrar-cambio`) post-MVP. |

### Política de cambios

- **Pre-MVP (6 semanas próximas):** modo **lite** — editar artefactos directamente + dejar nota en `11_cambios/` informal. Sin CR formal. Justificación: el tiempo es la restricción crítica y el overhead de un CR para cada ajuste mata la velocidad.
- **Post-MVP (después del Hito 1):** todo cambio pasa por **CR formal** con `registrar-cambio`. Quién autoriza: PO funcional · CTO técnico · Sponsor alcance.

---

## Decisiones pendientes derivadas de este documento

| ID | Tema | Bloquea | Resolución |
|----|------|---------|------------|
| DF-01 | Identidad real de `consultor1` y `consultor2` (no son developers — son asesores externos del ecosistema Cocucci) | No bloqueante (resuelta parcialmente v2) | Confirmar en próxima reunión. |
| DF-02 | Fecha exacta de firma del acuerdo Colegio (para fijar Hito 2 con precisión) | No | Cocucci confirma. |
| DF-03 | Rol BA: ¿Franco + Sebastián compartido o uno solo? | No | Decisión operativa. La división propuesta: Franco hace BA técnico (RF/AC/trazabilidad); Sebastián hace BA funcional (CU/BR). |
