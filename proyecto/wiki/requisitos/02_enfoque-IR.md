---
artefacto: enfoque-IR
iniciativa: tasa-inmuebles
estado: aprobado
version: 1
ultima_modificacion: 2026-05-14
skill_responsable: dimensionar-iniciativa
fuentes:
  - 00_fundamentos.md
  - 01_stakeholders/matriz-poder-interes.md
  - ../../CLAUDE.md
---

# 02 — Enfoque de Ingeniería de Requisitos

> Define qué técnica de IR aplicamos según la triple restricción + Cynefin. Las decisiones de granularidad, cadencia y obligatoriedad documental se derivan de acá.

## Metodología base (no negociable)

Tres restricciones metodológicas impuestas por Franco (CTO) y aceptadas por la sociedad:

### 1. SDD — [[T-025]] Spec-Driven Development

Toda funcionalidad se especifica antes de codear. El código se genera (mayormente con asistencia de IA) a partir de las especificaciones, no se escribe a mano desde cero. Esto justifica toda la inversión de tiempo en este árbol IR (`proyecto/wiki/requisitos/`).

### 2. Casos de uso, no Historias de usuario (Fase 1)

Durante la Fase 1 (MVP-6sem + iteraciones hasta Hito 2), se usan [[T-003]] al nivel "valor" por defecto. Las HU recién aparecen cuando se le agreguen funcionalidades al producto ya construido (Fase 2+). Decisión consensuada en reunión-01 (transcript:L119, Franco).

### 3. Mobile-first para el flujo del tasador

[[T-017]] es política de diseño. El flujo del [[T-028]] (relevamiento en campo, geolocalización, fotos, descripción) es mobile-first. Los dashboards del [[T-019]] son web con versión mobile embebida, no al revés. Decisión consensuada en reunión-01 (transcript:L127, Franco).

### Implicancias técnicas

- Stack frontend debe soportar PWA o app mobile (decisión técnica pendiente Q06).
- Stack backend debe exponer API consumible desde mobile + web.
- Workflow: captura → transcripción → casos de uso → IA genera código.

---

## Triple restricción

| Variable | Estado | Detalle |
|----------|--------|---------|
| **Tiempo** | **FIJO** | Hito 1 (MVP demo Colegio): **2026-06-25** (6 semanas desde 2026-05-14). Hito 2 (cierre acuerdo): ~2026-10-19. |
| Alcance | variable | Se serrucha agresivamente para llegar al Hito 1. |
| Costo | variable | Equipo Franco (3 personas) + tiempo de los 3 socios. Sin sueldo en fase pre-revenue. |

**Justificación:**
El acuerdo con el Colegio de Arquitectos tiene fecha. Si llegamos tarde a la demo del Hito 1, perdemos credibilidad institucional con el Colegio y comprometemos la firma de Hito 2. El alcance es la única palanca que podemos mover sin tocar el deadline.

**Scope mínimo no-negociable (define el "éxito" del MVP):**
~10 arquitectos del Colegio completan un flujo "nueva tasación" end-to-end sobre inmuebles reales: login pre-cargado → mobile-first (geolocalizar + datos + descripción + fotos) → guardar → comité manual → PDF simple → compartir.

---

## Cynefin

| Dominio | Aplica a | Justificación |
|---------|----------|---------------|
| **Complicado** | Mayoría del sistema (login, ABM, dashboard, flujo de tasación, generación de PDF, comité manual, persistencia, módulo contable Fase 2, integraciones) | Hay cookbook conocido. Análisis experto + diseño explícito llevan a la solución correcta. |
| **Complejo** | Robotomus IA (calidad de inferencia depende de datos) · Ranking de tasadores (depende de comportamiento real) · UX del comité conversacional · Modelo de precios variable | Cause-effect solo se ve en retrospectiva. Requiere probar-medir-aprender, no especificar exhaustivo. |
| Claro | ~0% | Nada del dominio es "cookbook puro" porque la combinación Uber + autotasador + comité + IA propia es novedosa en AR. |
| Caótico | 0% | No estamos en emergencia. Hay tiempo, equipo, know-how y maqueta vieja como referencia. |

**Implicancia:** dominio **mayormente complicado** con dos bordes complejos bien identificados. Los bordes complejos se aíslan y se diseñan con experimentos.

---

## Técnica recomendada

### Principal: **PRIORIZACIÓN MoSCoW + Casos de uso al nivel "valor"**

Para el grueso del sistema (la parte complicada).

**Por qué:**
Tiempo fijo + complicado → matriz Fernando devuelve "MoSCoW + CU al nivel valor". El upfront completo no entra en 6 semanas y tampoco hace falta porque la mayoría de los flujos son conocidos.

**Implicancias operativas:**

| Decisión | Aplicada en MVP-6sem |
|----------|----------------------|
| **Granularidad de CU** | Nivel "valor" (precondición + flujo principal + postcondición). NO fully-dressed por defecto. **Excepción**: el flujo "nueva tasación" — al ser el corazón del MVP, se escribe fully-dressed. |
| **Granularidad de RF** | Fina solo para los RF del flujo crítico. Gruesa para los demás. |
| **Cadencia de validación** | Bisemanal (alineada con sesiones IR pactadas: S02 = 2026-05-28, S03 = 2026-06-11, demo = 2026-06-25). |
| **Priorización** | MoSCoW estricta: **Must / Should / Could / Won't**. Cada candidato a feature pasa el filtro "¿esto hace que 10 arquitectos tasen un inmueble end-to-end?". |
| **Documentación mandatoria** | RF + AC + BR para Must. RG aplican siempre (transversales). CU al nivel valor para Must y Should; Could y Won't quedan como párrafo en `05_negocio/` sin desarrollar. |
| **Estados** | Solo `borrador → validado → aprobado`. `Obsoleto` se difiere a post-MVP. |
| **Cambios** | Modo lite (editar directo + nota en `11_cambios/`). CR formal recién post-Hito 1. |

### Excepción 1 — Componentes complejos: **DUAL-TRACK (discovery + delivery)**

Aplica a Robotomus, ranking de tasadores, UX del comité, pricing variable.

**Por qué:** problema complejo no se especifica upfront. Se descubre con experimentos cortos en paralelo al delivery.

**Implicancias:**
- En el MVP-6sem **no entran**. Se reemplazan por placeholders:
  - Robotomus → "promedio simple" hardcodeado o sin valor referencial.
  - Ranking → asignación manual del admin.
  - Comité conversacional → vista simple con campos editables.
  - Pricing → único valor fijo o configurado a mano.
- Para Fase 2 (entre Hito 1 y Hito 2), discovery dedicada: experimentos con métricas claras, hipótesis explícitas, criterio de "éxito" antes de codear.
- Los artefactos IR para estos componentes se escriben como **escenarios** (no CU fully-dressed) + **atributo de calidad** (Planguage con escala/meta/mín/objetivo/máx).

### Excepción 2 — Compliance: **UPFRONT NO NEGOCIABLE**

Aplica a Ley 25.326 (Protección de Datos Personales — AR), AFIP (Fase 2), validación de matrículas profesionales.

**Por qué:**
El compliance no admite descubrimiento iterativo: un dato mal recolectado al inicio puede generar multa, denuncia o bloqueo regulatorio. La AAIP (S-014) y AFIP (S-013) son stakeholders con poder alto que aún no opinaron — hay que cumplir antes de que opinen.

**Implicancias:**
- Política de privacidad + consentimiento explícito + derecho al olvido desde **el día 1**, aunque solo haya 10 arquitectos usándolo.
- RG-003 (TLS) y RG-004 (audit trail) son obligatorios, ya están propuestos en `04_requisitos-globales.md`.
- Un AC específico para "manejo de datos personales" se especifica con Planguage antes del MVP.
- Vinculado a decisión pendiente **DS-04** (matriz de stakeholders).

### Excepción 3 — Casos de uso B2C (autotasador, Fase 3+): **DUAL-TRACK SCRUM**

Aplica al producto B2C con incertidumbre de mercado real (cuando una ama de casa pueda autotasar su propiedad).

**Por qué:** la regla § 19 del marco: B2C con incertidumbre → dual-track Scrum. Hoy no es alcance, queda registrado para que en Fase 3 no se trate como upfront.

---

## Matriz de decisión aplicada a Tasa Inmuebles

| Subsistema | Cynefin | Variable fija | Técnica aplicada |
|------------|---------|---------------|------------------|
| Login + ABM usuarios | complicado | tiempo | MoSCoW + CU nivel valor |
| "Mis tasaciones" (T-033, pantalla principal mobile del tasador) | complicado | tiempo | MoSCoW + CU nivel valor — **MVP** |
| Dashboard Owner web (T-034) | complicado | tiempo | MoSCoW — **Fase 2**, fuera de MVP |
| Dashboard Owner mobile primitivo (T-035) | complicado | tiempo | MoSCoW — **Fase 2**, fuera de MVP |
| Flujo "nueva tasación" (crítico MVP) | complicado | tiempo | **Upfront + CU fully-dressed** (excepción para el flujo central) |
| Comité de tasación | complicado | tiempo | MoSCoW + CU nivel valor |
| Generación PDF | complicado | tiempo | MoSCoW + CU nivel valor |
| Robotomus IA | **complejo** | — | **Dual-track** (no MVP) |
| Cálculo Fitt-Servini (T-030 valor técnico) | complicado | tiempo | **MoSCoW + MVP** — fórmula determinística, no ML (RF-016 + BR-019). Diferenciador para el Colegio. |
| Autotasador Cliente B2C (T-036 Tasación referencial) | complicado | tiempo | **MoSCoW + MVP** — reusa Fitt-Servini + mock Robotomus + login bifurcado. MOBILE-ONLY, sin web pública. Showcase del modelo "Uber + Autotasador" en la misma app. |
| Ranking de tasadores | **complejo** | — | **Dual-track** (no MVP) |
| Módulo contable / pasarelas | complicado | tiempo (Fase 2) | MoSCoW + Upfront para compliance AFIP |
| Compliance Ley 25.326 | complicado | tiempo | **Upfront no negociable** (desde día 1) |
| Autotasador B2C | complejo | — | **Dual-track Scrum** (Fase 3+) |

---

## Cadencia de elicitación / validación

Definida en `00_fundamentos.md`:

| Sesión | Fecha (aprox) | Foco |
|--------|---------------|------|
| Reunión-01 ✓ | 2026-05-14 | Workshop inicial (kickoff técnico). |
| S-02 | ~2026-05-28 | Validación primera tanda de RF/CU del MVP + ajustes de alcance. |
| S-03 | ~2026-06-11 | Validación pre-demo: revisar el flujo "nueva tasación" implementado + feedback. |
| Demo Colegio | ~2026-06-25 | Hito 1. |

Entre sesiones: trabajo IR asincrónico vía artefactos en `requisitos/`. Cocucci aprueba lo de negocio, Sebastián aprueba CU/funcional, Franco aprueba RF/técnico.

---

## Reglas de obligatoriedad documental (resumen)

| Artefacto | Cuándo es obligatorio | Cuándo se difiere |
|-----------|----------------------|-------------------|
| **CU (nivel valor)** | Toda funcionalidad Must y Should | Could y Won't |
| **CU fully-dressed** | Solo el flujo "nueva tasación" (corazón del MVP) | Resto |
| **RF detallado** | Toda funcionalidad Must del MVP | Should y siguientes (RF al nivel gruesa) |
| **AC (atributo de calidad)** | Compliance + performance del flujo crítico (TLS, tiempo de carga, etc.) | Otros AC se difieren |
| **BR (regla de negocio)** | Toda regla mencionada por Cocucci o derivada de tipo de tasación | Reglas inferidas por Robotomus (no aplican al MVP) |
| **RG (requisito global)** | Los 4 RG ya propuestos (moneda, decimales, TLS, audit) | Otros RG se agregan si surgen |
| **Glosario** | Términos mencionados ≥2 veces en transcripción | Definiciones de proveedores tecnológicos (no aportan al dominio) |
| **Trazabilidad** | Una pasada antes del Hito 1 | Trazabilidad completa post-MVP |

---

## Próximo paso

Con los **fundamentos + stakeholders + enfoque IR cerrados**, queda la elicitación pura:

**Opción A — `armar-glosario`**: barrer el transcript + PDF para extraer términos del dominio y armar el LEL. Da base de vocabulario consistente para todo lo que viene.

**Opción B — `ir-procesar-clase`** sobre `analisis/reunion-01/transcript.txt`: procesamiento crudo del transcript que llena el `staging/` con requerimientos crudos, candidatos RF, candidatos BR, atributos de calidad mencionados, decisiones pendientes, ambigüedades y contradicciones.

**Recomendado: B primero**, porque alimenta automáticamente a A (los términos del glosario aparecen mejor cuando hay material ya escaneado).
