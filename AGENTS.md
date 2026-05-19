# AGENTS.md — Cocucci / Tasa Inmuebles

> Catálogo de **agentes, skills y MCPs** que se usan en este proyecto, y **cuándo invocar cada uno**. Toda sesión de Claude Code abierta desde `Cocucci/` debería poder elegir un agente correcto sin pensarlo.

Para el contexto de negocio del proyecto ver `CLAUDE.md`.

---

## 1. Principios generales

1. **Llamar al agente correcto, no al genérico.** Si la tarea encaja con un agente especializado de la lista, usarlo; no caer en el general-purpose por reflejo.
2. **Paralelizar agentes independientes.** Si hay 2+ tareas sin dependencia entre ellas (ej: análisis de seguridad de un módulo + revisión de tests + chequeo de tipos), lanzarlas en una sola tanda.
3. **Subagentes son protectores del contexto.** Para exploraciones grandes (leer 10 archivos, buscar patrones cross-repo), delegar a un agente Explore o general-purpose y pedir reporte corto, en vez de cargar todo al hilo principal.
4. **No proactividad excesiva.** No invocar agentes sin necesidad. Si la tarea es trivial (renombrar una variable, fixear un typo), hacerlo directo.

---

## 2. Agentes para fases del producto

### Para captura de requerimientos / casos de uso (Fase 1)

| Cuándo | Agente / Skill |
|---|---|
| Transcribir una grabación de reunión (`.m4a`, `.mp3`, `.wav`, `.mp4`) | Skill **`transcribir-clase`** o **`sandinas-transcription:transcribir-reunion`** |
| Convertir transcripción en casos de uso estructurados | Agente **`feature-dev:code-architect`** con prompt que fuerce formato SDD (caso de uso → requisitos → pre/poscondiciones) |
| Brainstorming de un flujo nuevo (antes de escribir nada) | Skill **`superpowers:brainstorming`** o **`sandinas-dev-workflows:brainstorming`** |
| Diseñar un caso de uso end-to-end con codificación pensada | Skill **`feature-dev:feature-dev`** |
| Escribir un plan de implementación a partir de un spec | Skill **`superpowers:writing-plans`** o **`sandinas-dev-workflows:writing-plans`** |
| Documentar un flujo funcional en la wiki | Skill **`sandinas-wiki-skills:crear-flujo`** |
| Documentar el alcance funcional inicial | Skill **`sandinas-wiki-skills:crear-alcance`** |
| Documentar arquitectura con ADRs | Skill **`sandinas-wiki-skills:crear-arquitectura`** |
| Modelo de datos | Skill **`sandinas-wiki-skills:crear-modelo-datos`** |
| Casos de uso atómicos / RF (después de tener flujos) | Skill **`sandinas-wiki-skills:crear-rf`** |
| Lineamientos visuales / RF-UI | Skills **`sandinas-wiki-skills:crear-rf-ui`** y **`sandinas-wiki-skills:crear-lineamientos-visuales`** |

### Para diseño UI/UX (mobile-first del tasador + dashboards web)

| Cuándo | Agente / Skill |
|---|---|
| Diseñar pantallas en Figma directamente | Skill **`sandinas-design-workflows:disenar-figma`** + **`sandinas-design-workflows:conectar-figma`** (vía TalkToFigma MCP) |
| Generar componentes React production-grade con buena estética | Skill **`frontend-design:frontend-design`** |
| Leer una pantalla de Figma para llevar a código | MCP `claude.ai Figma` → `get_design_context` |
| Trazabilidad entre Figma y código (cuando exista) | Skill **`sandinas-design-workflows:trazabilidad-ui`** |

### Para el núcleo IA (Robotomus, Fase 2-3)

| Cuándo | Agente / Skill |
|---|---|
| Diseñar el pipeline de datos Inmoclick → Métricas → Robotomus | Agente **`code-architect`** (es decisión arquitectural fuerte, vale la análisis profundo) |
| Construir / migrar prompts contra Claude API | Skill **`document-skills:claude-api`** |
| Construir prompts/MCP/tools para Claude API | Skill **`claude-api`** |
| Consultar docs actualizadas de una librería (LangChain, OpenAI SDK, transformers, etc.) | MCP `claude.ai Context7` → `resolve-library-id` + `query-docs` |
| Buscar papers / modelos / datasets de tasación | MCP `claude.ai Hugging Face` → `paper_search`, `hub_repo_search`, `space_search` |

### Para desarrollo de código (Fase 1 onwards)

| Cuándo | Agente / Skill |
|---|---|
| TDD obligatorio para feature nueva | Skill **`tdd-workflow`** o **`superpowers:test-driven-development`** |
| Plan de ejecución antes de tocar código | Skill **`plan`** |
| Code review post-implementación | Agente **`feature-dev:code-reviewer`** o **`pr-review-toolkit:code-reviewer`** |
| Detección de silent failures / catch vacíos | Agente **`pr-review-toolkit:silent-failure-hunter`** |
| Análisis de tipos / invariantes | Agente **`pr-review-toolkit:type-design-analyzer`** |
| Test coverage de un PR | Agente **`pr-review-toolkit:pr-test-analyzer`** |
| Análisis de comentarios (¿son necesarios? ¿son correctos?) | Agente **`pr-review-toolkit:comment-analyzer`** |
| Build roto | Agente **`build-validator`** |
| Verificación end-to-end de la app | Agente **`verify-app`** |
| Simplificar código recién escrito | Agente **`code-simplifier`** o skill **`simplify`** |
| Refactor estructurado | Skill **`refactor-clean`** |
| Debugging sistemático | Skill **`superpowers:systematic-debugging`** o **`sandinas-dev-workflows:systematic-debugging`** |
| Revisión de seguridad antes de commit | Skill **`security-review`** + agente del rule set **`security-reviewer`** |
| Tests E2E con Playwright | Skill **`e2e`** + MCP `plugin_playwright_playwright` |
| Verificación de coverage 80%+ | Skill **`test-coverage`** |

### Para operaciones de Git

| Cuándo | Agente / Skill |
|---|---|
| Estado del repo / cambios pendientes | Skill **`sandinas-git-tools:git-status`** |
| Crear branch para una feature | Skill **`sandinas-git-tools:git-branch-create`** |
| Commit atómico siguiendo conventional commits | Skill **`sandinas-developer-toolkit:commit`** o **`commit-commands:commit`** |
| Commit + push + PR en un solo paso | Skill **`commit-commands:commit-push-pr`** |
| Sincronizar / pull / merge | Skill **`sandinas-git-tools:git-sync`** o **`sandinas-git-tools:git-merge`** |
| Resolver conflictos | Skill **`sandinas-git-tools:git-conflicts-detect`** + **`sandinas-git-tools:git-conflicts-resolve`** |
| Limpiar branches gone | Skill **`commit-commands:clean_gone`** |
| Trabajar en worktree aislado | Skill **`superpowers:using-git-worktrees`** o **`sandinas-dev-workflows:using-git-worktrees`** |
| Review de PR completo | Skill **`pr-review-toolkit:review-pr`** o **`code-review:code-review`** |

---

## 3. Gestión de proyecto (Notion + tracking)

| Cuándo | Herramienta |
|---|---|
| Crear / actualizar páginas en Notion (board del proyecto) | MCP `claude.ai Notion` → `notion-create-pages`, `notion-update-page`, `notion-query-database-view` |
| Buscar info en Notion | MCP `claude.ai Notion` → `notion-search` |
| Crear historia de usuario (recién en Fase 2) | Skill **`sandinas-scrum-skills:crear-hu`** |
| Sincronizar HU a herramienta externa (Jira/Azure DevOps) | Skill **`sandinas-scrum-skills:sync-hu`** |

**Recordatorio del CLAUDE.md §6:** durante Fase 1 (MVP Colegio de Arquitectos) se usan **casos de uso**, no historias de usuario. Las HU recién aparecen cuando se incorporen funcionalidades sobre el producto ya construido.

---

## 4. Documentación de entregables al Colegio de Arquitectos

| Cuándo | Skill |
|---|---|
| Generar un PDF de entrega para mostrar al Colegio | Skill **`sandinas-docs:crear-doc-entrega`** + **`sandinas-docs:doc-to-pdf`** |
| Generar un docx de spec o informe formal | Skill **`document-skills:docx`** o **`sandinas-docs:docx`** |
| Generar diagramas de arquitectura | Skill **`ccc-skills:excalidraw`** o MCP `claude.ai tldraw` |
| Crear PDF combinando varios docs | Skill **`document-skills:pdf`** o **`sandinas-docs:pdf`** |
| Diseño visual estilo poster / one-pager | Skill **`document-skills:canvas-design`** |
| Aplicar un tema visual consistente | Skill **`document-skills:theme-factory`** |

---

## 5. Otros MCPs útiles (referenciar cuando aplique)

- **`claude.ai Google Drive`** — si compartimos artefactos con Cocucci/Sebastián en Drive (read/write).
- **`claude.ai Gmail`** — solo lectura de hilos de correo del proyecto si fuera necesario.
- **`claude.ai Google Calendar`** — agendar próximas reuniones con Cocucci/Sebastián y traer agenda.
- **`claude.ai Fathom`** — si se decide usar Fathom para grabar reuniones (alternativa al `transcribir-clase`).
- **`plugin_sandinas-developer-toolkit_jira`** — solo si se conecta el proyecto a Jira en algún momento. Hoy NO se usa Jira (CLAUDE.md §6).

---

## 6. Lo que **NO** hay que usar (en este proyecto)

- **Agentes `sandinas-dotnet-arquetipo` / `sandinas-dotnet8-arquetipo` / `sandinas-dotnet10-arquetipo`** — el stack no es .NET. Ignorarlos a menos que cambie la decisión de stack (ver `CLAUDE.md` §5).
- **Skill `init`** — no es un proyecto que necesite el init estándar de Claude Code en el root; ya están armados los archivos de contexto a mano.
- **`/loop` y `schedule`** — el flujo del proyecto es asincrónico humano, no requiere tareas recurrentes automatizadas.
- **Agentes de Linked API** (`sandinas-rrhh:linkedin:*`) — no es un proyecto de RR.HH.

---

## 7. Heurística de elección

Cuando una sesión empiece desde `Cocucci/` y la tarea no encaje obvio en la tabla, aplicar este filtro:

1. ¿Es **captura de requerimientos / documentación funcional**? → §2 captura.
2. ¿Es **diseño UI** (mobile o web)? → §2 diseño.
3. ¿Es **decisión técnica / arquitectura / stack**? → `code-architect` + actualizar `CLAUDE.md` §5.
4. ¿Es **escritura de código de feature**? → `feature-dev` o `tdd-workflow` (siempre TDD primero).
5. ¿Es **revisión post-código**? → `code-reviewer` + `silent-failure-hunter` en paralelo.
6. ¿Es **operación de Git**? → §2 git.
7. ¿Es **algo IA / ML / Claude API**? → §2 núcleo IA.
8. Si nada encaja → **`general-purpose`** con prompt detallado.

---

## 8. Checklist al iniciar cualquier sesión de feature

1. Leer `CLAUDE.md` (carga automática).
2. Releer `AGENTS.md` (este archivo) si la tarea es no-trivial.
3. ¿Tarea relacionada con un caso de uso ya conversado en reunión-01? Revisar `analisis/reunion-01/transcript.txt`.
4. ¿Tarea relacionada con un flujo descripto en el PDF de Cocucci? Revisarlo (`analisis/“Tasa Inmuebles…pdf`).
5. Elegir agente / skill por la heurística §7.
6. Si la sesión cierra una decisión (stack, fecha, alcance), proponer al usuario actualizar `CLAUDE.md`.
