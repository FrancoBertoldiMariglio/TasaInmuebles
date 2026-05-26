# Tasa Inmuebles — Proyecto Cocucci

> Plataforma de gestión de tasaciones inmobiliarias. Clientes solicitan tasaciones, profesionales matriculados las ejecutan, un comité valida valores apoyado por IA, y el sistema genera documentación, métricas y facturación automática.

**Código interno del proyecto:** `Cocucci`
**Nombre comercial del producto:** `Tasa Inmuebles` (dominio: `tasacioninmuebles.com`, ya en poder de la sociedad)

---

## 1. Sociedad y roles

El proyecto se ejecuta bajo una sociedad de tres personas. Toda decisión documentada en estas sesiones debe respetar esta distribución de responsabilidades.

| Persona | Rol | Responsabilidad |
|---|---|---|
| **Cristian Cocucci** | Dueño del know-how ISEO / inmobiliario | Aporta know-how del negocio inmobiliario, vínculo con Colegio de Arquitectos, dueño de la base histórica (Inmoclick, ~20 años de datos). Modo "supervisor / aportador de know-how". |
| **Sebastián Ríos** | COO / Product Owner | Nexo entre el equipo de negocio (Cocucci) y el equipo técnico (Franco). Define producto, casos de uso, modelo de entidades, mercadeo y producto extendido. |
| **Franco Bertoldi** | CTO / Jefe de operaciones de desarrollo | Decide stack, arquitectura, metodología, herramientas y proceso de delivery. Es el usuario principal de Claude Code en este proyecto. Experiencia fuerte en ML (tesis de ingeniería sobre scraping + entrenamiento de modelos de tasación). |

Speakers en transcripciones (`analisis/reunion-01/transcript.txt`):
- Speaker A → Sebastián Ríos
- Speaker B → Cristian Cocucci
- Speaker C → Franco Bertoldi (usuario)
- Speaker D → integrante del equipo técnico de Franco (confirmar identidad en próxima reunión)

---

## 2. Producto

Tasa Inmuebles combina **dos productos en uno**:

1. **"Uber de tasación"** — los clientes (particulares, empresas, bancos) solicitan una tasación; el sistema asigna a un tasador matriculado cercano y especializado en el tipo de inmueble; el comité valida; se entrega un PDF firmado.
2. **Autotasador** — un cliente puede autocompletar los datos de su propiedad y obtener una tasación referencial generada por IA, opcionalmente certificable por un colegiado mediante inspección ocular y pago adicional.

### Tipos de usuario

- **Particulares / clientes** — solicitan, ven estado, descargan PDF, firman autorización de venta.
- **Empresas** (bancos, constructoras, inmobiliarias) — administran solicitudes múltiples, dashboard corporativo, expedientes, facturación.
- **Profesionales / tasadores** (arquitectos, corredores inmobiliarios matriculados) — crean tasaciones, participan en comité, ven estadísticas, cobran honorarios.

### Modelo "entidad" (cliente B2B)

Una entidad (Remax, banco, constructora, Poder Judicial) puede agrupar inmuebles + tasadores habilitados + sus propios dashboards. Un tasador puede pertenecer a varias entidades. Hay una segunda etapa con "mundo abierto" (particulares sueltos). Detalle pendiente de modelado.

### Comisión / flujo financiero

- Cliente paga la tasación → sistema registra ingreso.
- **90% al tasador, 10% a Tasa Inmuebles.**
- Tasaciones simples (sin inspección ocular, firmadas solo por la plataforma) son baratas.
- Para certificar y firmar (con inspección ocular del colegiado) se cobra un plus significativo.
- Casos de uso pendientes: suscripciones B2B (paquetes mensuales de tasaciones), tarifas variables según superficie/distancia/tipo.

### Núcleo IA — "Robotomus"

Asistente interno de IA. Tres funciones principales:

1. **Valor referencial automático** — scraping y consultas a portales inmobiliarios + base histórica Inmoclick + comparables por zona. No pega contra Inmoclick directo; pega contra una **base intermedia "Métricas"** que pre-agrega datos (por zona, por tipo, por m² cubierto, etc.) para evitar tiempos prohibitivos. Esta base hay que reconstruirla.
2. **Asistente de descripción de inmueble** — el tasador describe verbalmente, Robotomus completa la ficha estructurada y mejora redacción.
3. **Insights** — tendencia de mercado, alertas de precio fuera de rango, calidad de inferencia con % de confianza (Franco: "la confianza la determina la completitud de variables que entra al modelo, no el entrenamiento, si el modelo está bien entrenado").

Robotomus convive con un **segundo índice**: el **valor técnico del Colegio de Arquitectos** (fórmula determinística tipo Fitt y Servini: m² cubiertos × categoría × coeficientes de antigüedad, frente/fondo, etc.). El comité contrasta ambos.

### Flujo "nueva tasación" (caminos del MVP)

```
Inicio → Geolocalizar → Datos básicos → Asistente IA (descripción) → Fotos
→ Guardar borrador → Enviar a comité
→ Tasadores revisan + Robotomus + Valor Colegio → Definir valor final
→ Generar PDF → Compartir con cliente (descarga / expediente / autorización venta)
→ Módulo contable (pago tasador, comisión, facturación)
```

---

## 3. Estado actual y deadlines

- **2026-04-19 (aprox.)** — Firma del acuerdo de 6 meses con el Colegio de Arquitectos. **CONFIRMAR FECHA EXACTA.**
- **2026-05-14** — Reunión-01 (kickoff técnico). Transcripción completa en `analisis/reunion-01/transcript.txt`.
- **2026-05-19** — Reunión-02 (refinamiento producto). Cerró decisiones clave: tipo de tasación dual venta+alquiler por default (DS-10), rentabilidad alquiler configurable (DS-09), Robotomus se mantiene como mock en MVP (DS-11), comité con propuestas individuales persistidas (DS-12). Transcripción en `analisis/reunion-02/transcript.txt`.
- **2026-05-19** — **Migración del catálogo de requisitos a Notion.** 9 DBs bajo la página "Requisitos" son ahora source of truth. Los `.md` locales pre-migración quedan archivados en `analisis/archive/wiki-requisitos-pre-notion-2026-05-19/` como historia inmutable.
- **2026-05-21** — Reunión-03 (impromptu con Sebastián, revisión de alcance). Introdujo modelo Entidad-Propiedad-Tasador (DS-02 refinado), padrón inmobiliario como ID canónico (DP-022), onboarding tasadores Fase 2 (DP-023), radios censales INDEC (Q14), competidor potencial mencionado en tercera persona. Transcripción en `analisis/reunion-03/transcript.txt`.
- **2026-05-26** — Reunión-04 (revisión MVP demo + cierre de modelo de estados). Los 3 socios presentes. Demo en vivo de la app mobile funcionando (React Native + Expo + Supabase + Vercel). **Decisiones cerradas**: stack confirmado (DP-007), padrón inmobiliario canónico (DP-022), modelo de 4 estados Pendiente → En proceso → En comité → Completada (Q02), modelo de cobro y pasarela fuera-de-mobile por restricción Apple (DS-14). **Refinamientos**: DS-02 con 3 roles internos B2B (Admin/Tasador/Solicitante) + Entidad unipersonal, DS-12 con Planning Poker explícito, CU-UI-006 con flujo de auto-registro + aprobación, CU-UI-007 promovido de Fase 2 a MVP. **Nuevos artefactos**: 5 BR Software (BR-025 padrón + BR-026 a BR-029 transiciones de estado), RF-024 invitar tasadores, DP-024 algoritmo de asignación. **Identificado**: competidor local Jorge Sánchez (S-026, Ingeniero civil con cotizador automático para inmobiliarias). Transcripción en `analisis/reunion-04/transcript.txt`.
- **2026-06-25 (Hito 1 — MVP demo Colegio)** — 6 semanas desde reunión-01. Demo intermedia funcional para el Colegio. El alcance del MVP está pensado contra esta fecha (no contra la fecha de cierre del acuerdo). Decisión confirmada por Franco el 2026-05-14.
- **~2026-10-19 (Hito 2 — cierre acuerdo, estimado)** — Cierre formal del acuerdo de 6 meses con el Colegio. El MVP de las 6 semanas es la demo intermedia, no el entregable final. Entre Hito 1 y Hito 2 se ejecutan iteraciones que extienden el producto. **CONFIRMAR FECHA EXACTA.**

Hay una maqueta vieja del sistema con el dominio `tasacioninmuebles.com` ya armada. **Decisión tomada en reunión-01: rehacer desde cero, no rescatar la maqueta.** Sirve solo como referencia de qué funcionalidades se necesitan.

---

## 4. MVP y roadmap (fases)

> Regla: **el primer entregable (Hito 1 — MVP) se dimensiona contra las 6 semanas** desde reunión-01 (target ~2026-06-25), no contra el cierre de octubre.

### Fase 1 — MVP demo Colegio (Hito 1, ~2026-06-25, 6 semanas)
Objetivo: **~10 arquitectos completan un flujo "nueva tasación" end-to-end** sobre inmuebles reales.

- Login básico **pre-cargado**: usuarios creados a mano por admin para los ~10 arquitectos. Sin auto-registro.
- ABM de usuarios mínimo (solo lo necesario para los 10).
- Dashboard básico (lista de tasaciones del tasador).
- Nueva tasación **mobile-first**: geolocalización + datos básicos + descripción (con o sin asistente IA) + fotos + guardar borrador.
- Comité de tasación **manual** (sin Robotomus real; con "promedio fake" como placeholder). **Valor técnico Fitt-Servini calculado automáticamente** (decisión 2026-05-14) — diferenciador profesional para el Colegio.
- Generación de **PDF de tasación simple** (firmado por la plataforma, sin inspección ocular).
- Persistencia y compartido del PDF al cliente final.

**Fuera del MVP-6sem** (se difiere para iteraciones siguientes entre Hito 1 y Hito 2):
- Robotomus IA real entrenado.
- Tasación certificada (con inspección ocular formal).
- Firma digital colegiada.
- Módulo contable, facturación, pasarela de pagos.
- Dashboards con métricas avanzadas.
- Marketplace, autoregistro, ranking de tasadores.

### Fase 2
- Robotomus IA (entrenamiento real, inferencia con confianza).
- Estadísticas avanzadas (dashboards de owner / banco con KPIs configurables).
- Contabilidad automática (facturación, cobros, pagos a tasador, comisión).
- Firma digital.
- Integración con bancos.

### Fase 3
- Machine Learning sobre la base histórica + scraping.
- Tasación automática end-to-end (cliente final con autoservicio).
- API externa para terceros.
- Marketplace de tasadores.

---

## 5. Stack técnico — **CONFIRMADO en reunión-04 (2026-05-26)**

> Decisión registrada en Notion como **DP-007 (Decidida 2026-05-26)**. La decisión previa DP-S7 quedó como tombstone (duplicada conceptual del setup inicial).

### Stack del MVP-6sem y Fase 2+

| Capa | Tecnología | Notas |
|---|---|---|
| **Mobile** | React Native + Expo | iOS + Android desde un solo codebase. |
| **Backend (BaaS)** | Supabase | Postgres + Auth + Storage + API + Realtime + Row Level Security. |
| **Frontend web** | Vercel | Hosting del dashboard web (admin de organizaciones). |
| **BD** | Postgres (vía Supabase) | Schema versionado con migrations en `proyecto/codigo/tasainmuebles/supabase/migrations/`. |
| **Lógica compleja** | Edge Functions (Deno/TS) + Postgres Functions | Para Fitt-Servini, Robotomus mock, validaciones, audit trail. Combinable con triggers de BD. |
| **Distribución demo** | TestFlight (iOS) + APK directo (Android) | Requiere cuenta de developer Apple de Cocucci (ya disponible). |
| **Pasarela de pagos** | Mercado Pago (DS-14) | **Fuera de app mobile** por restricción Apple — webhook + redirect + email con QR. |
| **SMTP** | A decidir (DS-07 abierta) | Candidatos: Resend, Postmark. |
| **Hosting de datos** | AWS (debajo de Supabase) | Supabase corre sobre AWS internamente — cumple la restricción "AWS" original de reunión-01. |

### Restricciones declaradas por Franco que se mantienen
- Sesgo fuerte a **open source** y planes gratuitos.
- **Mobile-first** para el flujo del tasador.
- Repositorio versionado con git (en evaluación si va a GitLab o GitHub — el repo local actual usa `git init` simple desde 2026-05-19).

### Subsistemas pendientes
- **Robotomus** (motor IA real): pendiente Fase 2 dual-track. En MVP es mock (constante o promedio simple por tipo de inmueble, DS-11). Cuando arranque Fase 2, definir runtime: ¿Edge Function de Supabase o servicio separado en AWS Lambda?
- **Métricas** (capa intermedia entre Inmoclick y Robotomus): a reconstruir en Fase 2 (DP-008). Probablemente vistas materializadas en Postgres + cron de refresh.
- **Cobros** (módulo contable completo): pendiente Fase 2 (DS-14 cubre la pasarela; el reparto 90/10 al tasador post-cobro queda como sub-decisión).

---

## 6. Metodología y comunicación

### Captura de requerimientos — **Spec-Driven Development (SDD)**, obligatorio

Decidido en reunión-01 por Franco y aceptado por la sociedad:

1. **Toda reunión de captura de requerimientos se graba.**
2. Se transcribe el audio (asistido por IA).
3. Se procesa la transcripción a **casos de uso** estructurados (no historias de usuario hasta Fase 2).
4. Los casos de uso alimentan el motor de IA que genera la base del desarrollo. **Las historias de usuario aparecen recién cuando se le agreguen funcionalidades al producto ya construido**.

**Marco de conversación para captura:** caso de uso → requisitos → precondiciones → poscondiciones → resultado.

### Seguimiento de proyecto
- Tablero Kanban en **Notion** (cuenta personal de Franco, espacio compartido en solo-lectura con Cocucci y Sebastián).
- Tablero secundario / rápido aceptado: **Trello** si se necesita algo más liviano para el lado de los socios.
- Sin ceremonias rígidas. Reuniones bajo demanda.

### Documentación
- **Catálogo de requisitos**: en **Notion** desde 2026-05-19. 9 bases de datos bajo la página "Requisitos": Casos de Uso (CU-UI), Requisitos Funcionales (RF), BR Software, BR-NEG, Atributos de Calidad (AC), Requisitos Globales (RG), Stakeholders, Glosario, Decisiones IR. Cada DB tiene `userDefined:ID` semántico estable (`BR-007`, `CU-UI-014`) y `Notion ID` auto-incremental con prefijo. Para crear, editar, renumerar o consultar cualquier artefacto: invocar el agente **`notion-expert`** (`.claude/agents/notion-expert.md`), que tiene el contexto completo de URLs, schemas y convenciones.
- **Wiki del proyecto**: `proyecto/wiki/` reservada para ADRs (`proyecto/wiki/ADR/`), diseño (`proyecto/wiki/diseno/`), preguntas pendientes y documentos de alcance / arquitectura. **No** para catálogo de requisitos (eso vive en Notion).
- **Análisis de fuentes primarias**: `analisis/` (transcripts, PDFs, imágenes, audios). Incluye `analisis/archive/` con snapshots históricos.
- Generación de documentación apoyada en IA siempre que sea posible.

### Canales
- Grupo de WhatsApp acordado (Cristian + Sebastián + Franco) para novedades cortas y comunicaciones asincrónicas.

---

## 7. Estructura del repositorio

```
Cocucci/
├── CLAUDE.md            # Este archivo. Contexto persistente para Claude.
├── AGENTS.md            # Catálogo de agentes/skills/MCPs y cuándo invocarlos.
├── .gitignore           # Excluye .m4a (audios), graphify-out/cache/, settings.local.json
├── .claude/
│   ├── agents/
│   │   └── notion-expert.md   # Agente para todo cambio en catálogo de requisitos.
│   └── settings.local.json    # Settings per-usuario (no versionado).
├── analisis/            # Fuente primaria inmutable (PDFs, transcripts, audios).
│   ├── reunion-01/
│   │   ├── grabacion.m4a          # Audio original (no versionado).
│   │   └── transcript.txt
│   ├── reunion-02/
│   │   ├── grabacion.m4a
│   │   └── transcript.txt
│   ├── imgs/                       # Capturas WhatsApp de la maqueta vieja.
│   ├── archive/
│   │   └── wiki-requisitos-pre-notion-2026-05-19/  # Snapshot histórico
│   │       │                                       # del catálogo .md
│   │       │                                       # pre-migración Notion.
│   │       ├── staging/            # CBR/CAC/CRF/RC nunca migrados a Notion.
│   │       ├── 00_fundamentos.md
│   │       ├── 02_enfoque-IR.md
│   │       └── ...
│   ├── mvp-decisions-2026-05-19.md # Snapshot del MVP curado.
│   └── "Tasa Inmuebles…".pdf       # Brief de Cocucci con diagramas y stack.
├── proyecto/
│   └── wiki/            # Doc viva NO-requisitos: ADRs, diseño, alcance.
│       ├── ADR/
│       ├── diseno/
│       ├── 00_preguntas_pendientes.md
│       ├── 01_alcance_funcional.md
│       └── 02_arquitectura.md
└── graphify-out/        # Grafo de conocimiento del repo (derivable con /graphify --update).
```

Git inicializado el 2026-05-19 como red de seguridad. No hay todavía repo de código de la aplicación; cuando se cree, irá a GitLab y se mantendrá fuera de este árbol o como submódulo, según se decida.

---

## 8. Reglas operativas para Claude

> Estas reglas son específicas de este proyecto. Las reglas globales de `~/.claude/rules/*.md` (coding style, testing, security, git workflow, etc.) **siguen aplicando** y no se duplican acá.

1. **Idioma**: trabajar en **español rioplatense** (es el idioma de los stakeholders y de toda la documentación de origen). Código y comentarios técnicos pueden ir en inglés si el stack lo amerita.

2. **No tocar `analisis/`** salvo lectura. Es fuente primaria inmutable. Incluye `analisis/archive/wiki-requisitos-pre-notion-2026-05-19/`, que es el snapshot histórico del catálogo .md pre-migración Notion. Nuevas transcripciones se agregan como `analisis/reunion-NN/transcript.txt`.

3. **Antes de proponer arquitectura o stack**, releer `CLAUDE.md` § 5 (decisión pendiente). No inventar decisiones cerradas que no estén registradas acá.

4. **Antes de definir un caso de uso o flujo funcional**, revisar las transcripciones de reuniones disponibles (`analisis/reunion-01/transcript.txt`, `analisis/reunion-02/transcript.txt`) y el PDF de Cocucci. La sociedad ya consensuó muchas cosas que no hay que re-derivar. Para el estado consolidado actual de cada artefacto, consultar **Notion** (no los .md archivados).

5. **MVP-first**. Si una propuesta no aporta al objetivo "demo al Colegio de Arquitectos antes de octubre 2026", marcarla explícitamente como Fase 2 o Fase 3.

6. **Casos de uso, no historias de usuario** (durante Fase 1). Formato: caso de uso → requisitos → precondiciones → poscondiciones.

7. **El catálogo de requisitos vive en Notion, no en archivos `.md`.** Cualquier solicitud del usuario para crear, editar, renombrar, renumerar o consultar un CU-UI, RF, BR Software, BR-NEG, AC, RG, Stakeholder, término del glosario o Decisión IR debe ejecutarse contra las 9 DBs de Notion vía MCP `mcp__claude_ai_Notion__*`, **no** escribiendo archivos `.md` locales. Para esto invocar el agente especializado **`notion-expert`** (`.claude/agents/notion-expert.md`), que tiene URLs canónicas, schemas y convenciones. NO crear archivos `.md` espontáneos en `proyecto/wiki/` ni regenerar el catálogo viejo en `analisis/archive/`: ese directorio es inmutable.

8. **`proyecto/wiki/` queda reservada para documentos NO-requisitos**: ADRs (`ADR/`), diseño (`diseno/`), preguntas pendientes, alcance, arquitectura. No crear archivos ahí sin pedido explícito del usuario.

9. **Verificar el deadline del Colegio** (`~2026-10-19`) la primera vez que se cite en una sesión. Está marcado como estimado y necesita confirmación del usuario.

10. **Decisiones nuevas**: si en una sesión se cierra una decisión (stack, framework, fecha, alcance), proponer al usuario incorporarla a este CLAUDE.md antes de seguir. Las decisiones de producto / IR (DP / DS / Q / A) se cargan también en la DB "Decisiones IR" de Notion vía `notion-expert`.

11. **Graphify activo en este proyecto.** Existe `graphify-out/` con grafo de conocimiento del repo. Antes de leer archivos completos para responder preguntas sobre arquitectura, contexto, relaciones entre entidades o ubicación de algo, **consultar primero el grafo** vía las tools `mcp__graphify-cocucci__*` (`graph_stats`, `god_nodes`, `get_node`, `get_neighbors`, `get_community`, `shortest_path`, `query_graph`). Solo caer a `Read`/`Grep` cuando hace falta modificar un archivo o el grafo no tiene la info. Esto reduce ~71× el costo de tokens y acelera las respuestas. Las reglas generales de uso de graphify están en `~/.claude/rules/graphify-mcp.md`. **Importante**: el archivado del 2026-05-19 movió los `.md` de requisitos a `analisis/archive/`; los `source_file` del grafo siguen apuntando al path viejo hasta que se corra `/graphify --update`. Para consultas sobre el estado actual de requisitos, **siempre preferir Notion** sobre el grafo o los archivos.

---

## 9. Glosario rápido

- **Inmoclick** — base de datos histórica propiedad de Cocucci, ~20 años, millones de registros, +400 inmobiliarias publicando. Insumo principal para entrenar Robotomus.
- **Métricas** — base intermedia agregada (a reconstruir) que sirve como capa de consulta rápida para Robotomus. Evita ir contra Inmoclick en tiempo real.
- **Robotomus** — asistente interno de IA. Devuelve valor referencial + asiste descripción + tira insights.
- **Comité de tasación** — vista colaborativa donde varios tasadores discuten y validan un valor final (puede ser por videoconferencia). Estado intermedio entre "guardada" y "firmada".
- **Inspección ocular** — visita física del tasador al inmueble. Es lo que diferencia tasación simple de tasación certificada.
- **Valor técnico** — valor calculado por fórmula determinística (Fitt y Servini, manual estándar del Colegio de Arquitectos). Convive con el valor de mercado de Robotomus.
- **Fitt y Servini** — autores del manual de tasación argentino usado por los corredores inmobiliarios para tasación técnica.
- **SDD (Spec-Driven Development)** — metodología que usa Franco: especificaciones → IA genera el desarrollo, en vez de codificar a mano. Justifica la importancia de los casos de uso bien escritos.
