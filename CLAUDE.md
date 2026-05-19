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

## 5. Stack técnico — **DECISIÓN PENDIENTE**

> El stack final lo define Franco como CTO. Esta sección es un registro de candidatos e inputs, no una decisión.

### Recomendación del PDF de Cocucci (`analisis/“Tasa Inmuebles…pdf`)
- Frontend: React / Next.js + Material UI o Tailwind, dashboard responsive
- Backend: Node.js / NestJS **o** Laravel
- BD: PostgreSQL
- IA: OpenAI API, OCR de imágenes, Google Maps para geolocalización
- PDF: generador dinámico
- Infra: AWS + (Supabase **o** Firebase)

### Restricciones / preferencias declaradas por Franco en reunión-01
- Infra en **AWS**.
- Repositorio en **GitLab** con CI/CD armado.
- Sesgo fuerte a **open source** y herramientas gratuitas siempre que sea posible.
- **Mobile-first** para el flujo del tasador (relevamiento en campo); web para dashboards de owner / banco (con versión mobile embebida).
- Libertad para elegir framework y lenguaje.

### Pendiente decidir y registrar acá cuando se defina
- Framework frontend final (Next.js vs alternativa).
- Framework backend final (NestJS vs alternativa).
- BaaS / Supabase vs stack custom sobre AWS.
- Estrategia de datos (Inmoclick → Métricas → Robotomus): cómo se reconstruye la base intermedia y dónde corre el modelo.

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
- **Wiki del proyecto**: `proyecto/wiki/` (vacío todavía; se llenará a partir de esta reunión y siguientes).
- **Análisis de fuentes primarias**: `analisis/` (transcripts, PDFs, imágenes).
- Generación de documentación apoyada en IA siempre que sea posible.

### Canales
- Grupo de WhatsApp acordado (Cristian + Sebastián + Franco) para novedades cortas y comunicaciones asincrónicas.

---

## 7. Estructura del repositorio

```
Cocucci/
├── CLAUDE.md            # Este archivo. Contexto persistente para Claude.
├── AGENTS.md            # Catálogo de agentes/skills/MCPs y cuándo invocarlos.
├── analisis/            # Fuente primaria (PDFs, transcripciones, imágenes).
│   ├── reunion-01/
│   │   ├── Palmares Open Mall 4.m4a    # Audio original.
│   │   └── transcript.txt              # Transcripción de la reunión-01.
│   ├── imgs/                            # Capturas WhatsApp de la maqueta vieja.
│   └── "Tasa Inmuebles…".pdf           # Brief de Cocucci con diagramas y stack.
└── proyecto/
    └── wiki/            # Documentación viva del proyecto (casos de uso, ADRs, etc.).
```

No hay todavía repo de código. Cuando se cree, irá a GitLab y se mantendrá fuera de este árbol o como submódulo, según se decida.

---

## 8. Reglas operativas para Claude

> Estas reglas son específicas de este proyecto. Las reglas globales de `~/.claude/rules/*.md` (coding style, testing, security, git workflow, etc.) **siguen aplicando** y no se duplican acá.

1. **Idioma**: trabajar en **español rioplatense** (es el idioma de los stakeholders y de toda la documentación de origen). Código y comentarios técnicos pueden ir en inglés si el stack lo amerita.

2. **No tocar `analisis/`** salvo lectura. Es fuente primaria inmutable. Nuevas transcripciones se agregan como `analisis/reunion-NN/transcript.txt`.

3. **Antes de proponer arquitectura o stack**, releer `CLAUDE.md` § 5 (decisión pendiente). No inventar decisiones cerradas que no estén registradas acá.

4. **Antes de definir un caso de uso o flujo funcional**, revisar `analisis/reunion-01/transcript.txt` y el PDF de Cocucci. La sociedad ya consensuó muchas cosas que no hay que re-derivar.

5. **MVP-first**. Si una propuesta no aporta al objetivo "demo al Colegio de Arquitectos antes de octubre 2026", marcarla explícitamente como Fase 2 o Fase 3.

6. **Casos de uso, no historias de usuario** (durante Fase 1). Formato: caso de uso → requisitos → precondiciones → poscondiciones.

7. **No crear archivos `.md` espontáneos** en `proyecto/wiki/` sin que el usuario lo pida. La wiki se construye con curaduría humana, no como subproducto de cada sesión.

8. **Verificar el deadline del Colegio** (`~2026-10-19`) la primera vez que se cite en una sesión. Está marcado como estimado y necesita confirmación del usuario.

9. **Decisiones nuevas**: si en una sesión se cierra una decisión (stack, framework, fecha, alcance), proponer al usuario incorporarla a este CLAUDE.md antes de seguir.

10. **Graphify activo en este proyecto.** Existe `graphify-out/` con grafo de conocimiento del repo. Antes de leer archivos completos para responder preguntas sobre arquitectura, contexto, relaciones entre entidades o ubicación de algo, **consultar primero el grafo** vía las tools `mcp__graphify-cocucci__*` (`graph_stats`, `god_nodes`, `get_node`, `get_neighbors`, `get_community`, `shortest_path`, `query_graph`). Solo caer a `Read`/`Grep` cuando hace falta modificar un archivo o el grafo no tiene la info. Esto reduce ~71× el costo de tokens y acelera las respuestas. Las reglas generales de uso de graphify están en `~/.claude/rules/graphify-mcp.md`. Si el repo se modifica mucho sin actualizar el grafo, correr `/graphify --update` para refrescarlo.

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
