# Graph Report - .  (2026-05-15)

## Corpus Check
- 86 files · ~128,929 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 577 nodes · 951 edges · 48 communities detected
- Extraction: 84% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 147 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `CU-UI-001 — Tasador crea una tasación nueva end-to-end` - 41 edges
2. `CU-UI-014 — Cliente B2C realiza Tasación Referencial desde app mobile` - 25 edges
3. `Matriz de Stakeholders — Poder vs Interés` - 25 edges
4. `T-026 (Tasación)` - 25 edges
5. `RF-008 — validación de guardado` - 24 edges
6. `RF-016 — cálculo Fitt-Servini` - 21 edges
7. `AC-001 — tiempo flujo end-to-end` - 21 edges
8. `AC-003 — usabilidad mobile en campo` - 21 edges
9. `RF-019 — captura Tasación referencial` - 20 edges
10. `RF Index — Índice de Requisitos Funcionales` - 20 edges

## Surprising Connections (you probably didn't know these)
- `Robotomus (módulo IA interno)` --references--> `Brief Cocucci — Tasa Inmuebles PDF`  [EXTRACTED]
  CLAUDE.md → analisis/Tasa Inmuebles es una plataforma de gestión de tasaciones inmobiliarias….pdf
- `Comité de tasación` --depicts--> `Tabs: Tasacion / Comite de tasacion`  [EXTRACTED]
  CLAUDE.md → analisis/imgs/WhatsApp Image 2026-05-14 at 12.45.44 (2).jpeg
- `Comité de tasación` --depicts--> `Ficha tasacion 1578 - vista detalle mobile`  [EXTRACTED]
  CLAUDE.md → analisis/imgs/WhatsApp Image 2026-05-14 at 12.45.44 (1).jpeg
- `Fitt y Servini (manual de tasación argentino)` --semantically_similar_to--> `Z-Value (Zillow, homologación referencia internacional)`  [INFERRED] [semantically similar]
  CLAUDE.md → proyecto/wiki/requisitos/staging/glosario-candidato.md
- `Entidad B2B (cliente corporativo agrupador)` --references--> `Brief Cocucci — Tasa Inmuebles PDF`  [EXTRACTED]
  CLAUDE.md → analisis/Tasa Inmuebles es una plataforma de gestión de tasaciones inmobiliarias….pdf

## Hyperedges (group relationships)
- **CUs MVP-6sem con actor Tasador (flujo core)** — cu_ui_001, cu_ui_002, cu_ui_003, cu_ui_005, actor_tasador [EXTRACTED 0.95]
- **CUs vinculados a Robotomus / IA (Fase 2)** — cu_ui_004, cu_ui_008, cu_ui_013, cu_ui_014, actor_robotomus [INFERRED 0.85]
- **CUs orientados a Owner B2B / Entidad** — cu_ui_007, cu_ui_010, cu_ui_011, cu_ui_015, actor_owner, actor_entidad_b2b [INFERRED 0.80]
- **Flujo CU-UI-001: captura nueva tasación profesional** — rf_001, rf_002, rf_003, rf_004, rf_005, rf_006, rf_007, rf_008, rf_009, rf_016 [INFERRED 0.85]
- **Flujo CU-UI-005: generación y compartido de PDF** — rf_012, rf_013, rf_014, rf_020 [INFERRED 0.85]
- **Flujo CU-UI-004: comité de tasación y cierre de valor** — rf_009, rf_015, rf_016 [INFERRED 0.80]
- **Flujo CU-UI-014: autoservicio Cliente B2C tasación referencial** — rf_017, rf_018, rf_019, rf_020, rf_016 [INFERRED 0.85]
- **BRs tipo Cálculo (fórmulas determinísticas)** — br_001, br_006, br_019 [INFERRED 0.85]
- **BRs tipo Hecho (afirmaciones del dominio)** — br_004, br_005, br_014, br_015, br_018 [INFERRED 0.85]
- **BRs tipo Restricción (prohibiciones)** — br_007, br_008, br_009, br_021 [INFERRED 0.85]
- **BRs tipo Habilitador (condiciones de permiso)** — br_002, br_022 [INFERRED 0.85]
- **BRs que gobiernan cálculo Fitt-Servini (valor técnico)** — br_004, br_006, br_018, br_019 [INFERRED 0.80]
- **BRs que definen máquina de estados de la Tasación** — br_014, br_015 [INFERRED 0.80]
- **ACs en categoría Performance** — ac_001, ac_012, ac_013 [INFERRED 0.90]
- **ACs y BRs relacionados a privacidad/compliance/seguridad** — ac_005, br_022, br_021 [INFERRED 0.75]
- **BRs y ACs específicos del Cliente B2C / Tasación referencial** — br_021, br_022, ac_013, br_007 [INFERRED 0.75]
- **La sociedad — 3 socios fundadores** — cristian_cocucci, sebastian_rios, franco_bertoldi [EXTRACTED 1.00]
- **Decisiones tomadas 2026-05-14** — decision_20260514_fitt_servini_mvp, decision_20260514_mvp_6sem, decision_20260514_rehacer_maqueta, ambig_a002, ambig_a011, ambig_a016, ambig_a017 [EXTRACTED 1.00]
- **Decisiones bloqueantes del MVP-6sem** — dp_006, ds_04, ds_07, ds_08 [EXTRACTED 1.00]
- **Términos protegidos del glosario** — t_013, t_016, t_023 [EXTRACTED 1.00]
- **Estados del flujo de tasación profesional** — t_002, t_014, t_022, t_009, t_027, t_007 [EXTRACTED 1.00]
- **Pilares Cockburn (fundamentos)** — pilar_negocio, pilar_colaboracion, pilar_producto [EXTRACTED 1.00]
- **Snowman DSDM — 6 roles** — snowman_sponsor, snowman_visionario, snowman_po, snowman_ba, snowman_cto, snowman_celulas [EXTRACTED 1.00]
- **Requisitos globales aprobados 2026-05-14 (6 RG)** — rg_001, rg_002, rg_003, rg_004, rg_005, rg_006 [EXTRACTED 1.00]
- **Hitos del proyecto Tasa Inmuebles** — hito_1_mvp_demo, hito_2_cierre_acuerdo [EXTRACTED 1.00]
- **Ambigüedades bloqueantes MVP resueltas** — ambig_a002, ambig_a011, ambig_a016, ambig_a017 [EXTRACTED 1.00]
- **Ecosistema Robotomus (datos+IA)** — t_023, t_013, t_016, t_024, t_012, t_008, t_029 [EXTRACTED 1.00]
- **Metodología base no negociable** — t_025, t_003, t_017, metodologia_sdd_cu_mobilefirst [EXTRACTED 1.00]

## Communities

### Community 0 - "Núcleo Reglas + Calidad MVP"
Cohesion: 0.12
Nodes (70): AC-001 — tiempo flujo end-to-end, AC-003 — usabilidad mobile en campo, AC-005 — compliance Ley 25.326, AC-012, AC-013, AC Index - Índice de Atributos de Calidad, BR-001: Cálculo de comisión 90/10, BR-002 (+62 more)

### Community 1 - "Staging Candidatos + Decisiones"
Cohesion: 0.04
Nodes (69): CAC-003 — Usabilidad mobile en campo, CAC-005 — Compliance Ley 25.326, CAC-012 — Performance flujo crítico MVP, CBR-002 — Verificación de matrícula y capacitación, CBR-003 — Comisión 90/10, CBR-005 — Certificación requiere inspección ocular, CBR-012 — Scraping cuestionable por Ley 25.326, Comisión 90/10 (tasador 90% / plataforma 10%) (+61 more)

### Community 2 - "Actores y Stakeholders"
Cohesion: 0.05
Nodes (58): Admin de plataforma (S-023), Cliente B2C (actor / T-037), Comité de tasación (actor / T-006), Robotomus (actor / T-023), Solicitante (actor / T-032), Soporte / mesa de ayuda (S-024), Tasador (actor / T-028), BR-NEG-001 — visión de negocio (+50 more)

### Community 3 - "Maquetas UI y Componentes"
Cohesion: 0.04
Nodes (51): Concepto: ABM de usuarios con rol y matricula profesional, Comision / Honorarios del tasador, Concepto: Dashboard del tasador con KPIs y workflow, Concepto: Estados de tasacion (A editar / A tasar / A publicar), Robotomus (asistente IA de valor referencial), Concepto: Robotomus (asistente IA documentado en centro de ayuda), Rol Administrador, Rol Secretaria (+43 more)

### Community 4 - "Acuerdo Colegio + Decisiones Hito 1"
Cohesion: 0.07
Nodes (41): BR-NEG-003: Acuerdo 6 meses con Colegio de Arquitectos, CBR-001: MVP antes cierre acuerdo Colegio, CLAUDE.md (project instructions), Colegio de Arquitectos, C-003: Maqueta vieja usar/rehacer (falso positivo), Cristian Cocucci (Sponsor + Visionario), Decisión 2026-05-14: Fitt-Servini calculado automático en MVP, Decisión 2026-05-14: MVP dimensionado contra 6 semanas (Hito 1) (+33 more)

### Community 5 - "Fundamentos y Reglas Negocio"
Cohesion: 0.05
Nodes (40): A-017: Criterio éxito MVP 10/10 (RESUELTA), BR-NEG-002 (movido): Hito 1 demo Colegio, BR-NEG-004: Modelo comisión 90/10, BR-NEG-005 (movido): Metodología SDD + CU + mobile-first, CAC-005: Compliance Ley 25.326, CBR-003: 90/10 comisión (Cálculo), CBR-004: Reparto inmobiliaria intermedia (Cálculo), C-001: Uber vs Autotasador (falso positivo) (+32 more)

### Community 6 - "Perfil Tasador y Centro Ayuda"
Cohesion: 0.06
Nodes (38): Centro de Ayuda, Matrícula / Profesional colegiado (Arquitecto), Perfil de Tasador / Profesional matriculado, Política de Privacidad / Cumplimiento legal, Publicacion en CRM/portales inmobiliarios (feature mencionada), Robotomus (asistente IA de tasación), Botón Editar información, Bloque Información General (nombre, rol, dirección, teléfono, DNI, matrícula, profesión) (+30 more)

### Community 7 - "UI Crear/Editar Tasación"
Cohesion: 0.08
Nodes (32): Caso de uso: Crear/editar nueva tasacion, Entidad: Solicitante / cliente final (Particular), Decision UX: mobile-first para flujo del tasador, Motivo de tasacion: para venta (catalogo), Concepto: tasacion valorada / lista para compartir, Taxonomia tipo de inmueble: Casa / Departamento / Terreno, Acordeon completo: Motivo, Ubicacion, Solicitante, Fotos, Detalles, Descripcion del inmueble, Boton primario: Guardar cambios (editar) (+24 more)

### Community 8 - "Estados y Ciclo Vida Tasación"
Cohesion: 0.08
Nodes (31): Concepto: Archivar tasacion (accion sobre tasacion finalizada o descartada), Concepto: Edicion de tasacion existente, Concepto: Estados de tasacion (A tasar, en proceso, archivada, etc.), Concepto: Tasacion (entidad principal del dominio), Boton Editar (primario coral, full width), Datos basicos: Tasacion 1578, Fecha alta 13/07/23, Tipo de inmueble, Referente Mario Perez, Domicilio Joaquin V. Gonzales 1895, Motivo Venta, Badge de estado: A tasar (amarillo), Acordeones Mas informacion: Ubicacion, Solicitante, Fotos, Detalles, Descripcion del inmueble (+23 more)

### Community 9 - "Back Office y Asignación"
Cohesion: 0.09
Nodes (28): Caso de uso: Asignar tasacion a tasador, Ciclo de vida de tasacion (borrador -> editada -> lista -> publicada), Comité de tasación, Decision UX: desktop para back office / dashboards, Inmuebles comparables (insumo de valoracion), Rol: Admin / operaciones (back office), Tasador (rol matriculado), Acordeon Datos de tasacion (Descripcion, Caracteristicas, Superficies, Servicios, Valorar) (+20 more)

### Community 10 - "Navegación Mobile y Branding"
Cohesion: 0.1
Nodes (23): Estados de tasación: Pendiente/Sin asignar/En proceso, Matrícula colegiada (Profesión + Matrícula), Decisión de diseño: Mobile-first, Rol: Administrador, Rol: Tasador, Ciclo de vida: Tasación (alta -> editar -> valorar -> publicar/compartir), Bottom Nav: Home/Tasaciones/+/Estadísticas/Comunicaciones, Branding: Tasainmuebles header (+15 more)

### Community 11 - "Preguntas Pendientes Q01-Q13"
Cohesion: 0.14
Nodes (15): A-016: Semántica guardar+compartir (RESUELTA), 00 Preguntas pendientes (Q01..Q13), Q01: Granularidad Entidades B2B, Q02: Estados workflow tasación, Q03: Catálogo tipos/motivos (RESPONDIDA), Q04: Modelo monetización, Q05: Onboarding/ranking tasadores, Q06: Integraciones externas (PARCIAL) (+7 more)

### Community 12 - "Metodología SDD + Roles Snowman"
Cohesion: 0.15
Nodes (14): Transcripción reunión-01 (386 líneas), Cockburn 3 pilares (Negocio / Colaboración / Producto), DSDM Snowman (6 roles), SDD (Spectrum Development), Franco Bertoldi (CTO), Sebastián Ríos (Product Owner / COO), Speaker D (miembro técnico equipo Franco, identidad pendiente), Rationale: Casos de uso vs HU (SDD necesita CU bien escritos) (+6 more)

### Community 13 - "Modelo B2B Multi-Entidad"
Cohesion: 0.22
Nodes (14): Entidad B2B (actor / T-010), Owner de Entidad (actor / T-019), Particular (actor / T-007), Plataforma (actor / T-021), Comisión 90/10 (T-005), Dashboard Owner versión mobile embebida (T-035), Dashboard Owner versión web (T-034), CU-UI-007 — Cliente solicita tasación desde web pública (+6 more)

### Community 14 - "UI Publicación + Compartido PDF"
Cohesion: 0.18
Nodes (12): Lifecycle: Entrega / compartido de PDF al cliente, Lifecycle: Publicacion / Alta de tasacion, Boton: Cancelar, Boton: Publicar (envia tasacion), Ilustracion: documento firmado con manos, Mensaje: La tasacion 1578 ha sido cargada completamente, Boton: Compartir PDF por WhatsApp, Input: Email + boton Compartir (+4 more)

### Community 15 - "Compliance Scraping Ley 25.326"
Cohesion: 0.5
Nodes (4): C-004: Scraping legal vs ilegal (REAL), DP-013: Legalidad scraping, DS-02: Modelo B2B para inmobiliarias (mitig S-019), RC-054: Scraping legalmente cuestionable

### Community 16 - "Flujos Canónicos MVP"
Cohesion: 0.67
Nodes (3): CRF-021: Flujo completo nueva tasación, CRF-022: Flujo comité tasación, RC-055: Flujos canónicos del MVP

### Community 17 - "Datos Recolección Tasación"
Cohesion: 1.0
Nodes (2): CRF-001: Fotos + descripción + geolocalización, RC-011: Datos a recolectar en nueva tasación

### Community 18 - "Tiempo Objetivo Flujo"
Cohesion: 1.0
Nodes (2): A-002: Tiempo objetivo flujo (RESUELTA), CAC-004: Tiempo flujo (Usabilidad)

### Community 19 - "Rol BA y Consultores"
Cohesion: 1.0
Nodes (2): DF-03: Rol BA Franco+Sebastián, DP-001: Identidad consultores externos

### Community 20 - "Staging: Candidatos RF"
Cohesion: 1.0
Nodes (1): Staging: Candidatos RF (tombstone, 21 CRF)

### Community 21 - "Staging: Candidatos BR"
Cohesion: 1.0
Nodes (1): Staging: Candidatos BR (vivo, 19 CBR)

### Community 22 - "Staging: Ambigüedades"
Cohesion: 1.0
Nodes (1): Staging: Ambigüedades (17 A-NNN)

### Community 23 - "Staging: Atributos Calidad"
Cohesion: 1.0
Nodes (1): Staging: Atributos calidad mencionados (12 CAC)

### Community 24 - "Staging: Glosario Candidato"
Cohesion: 1.0
Nodes (1): Staging: Glosario candidato (27 términos, tombstone)

### Community 25 - "Staging: Decisiones Pendientes"
Cohesion: 1.0
Nodes (1): Staging: Decisiones pendientes (14 DP, tombstone)

### Community 26 - "Staging: Contradicciones"
Cohesion: 1.0
Nodes (1): Staging: Contradicciones (5 C-NNN, cerrado)

### Community 27 - "Staging: Requerimientos Crudos"
Cohesion: 1.0
Nodes (1): Staging: Requerimientos crudos (55 RC)

### Community 28 - "CRF-004: Doble Índice"
Cohesion: 1.0
Nodes (1): CRF-004: Doble índice (Robotomus + Fitt-Servini)

### Community 29 - "CRF-017: Tipos Inmueble"
Cohesion: 1.0
Nodes (1): CRF-017: Tipos de inmueble

### Community 30 - "CRF-019: Motivos Tasación"
Cohesion: 1.0
Nodes (1): CRF-019: Motivos de tasación (10)

### Community 31 - "CRF-020: Geolocalización"
Cohesion: 1.0
Nodes (1): CRF-020: Geolocalización tap mapa

### Community 32 - "CRF-023: Estados Tasación"
Cohesion: 1.0
Nodes (1): CRF-023: Estados de tasación

### Community 33 - "CBR-002: Matrícula+Curso"
Cohesion: 1.0
Nodes (1): CBR-002: Matrícula verificada + curso plataforma (Habilitador)

### Community 34 - "CBR-017: Catálogo Motivos"
Cohesion: 1.0
Nodes (1): CBR-017: Catálogo 10 motivos (Hecho)

### Community 35 - "CBR-018: Dos Índices Valor"
Cohesion: 1.0
Nodes (1): CBR-018: Dos índices de valor (Hecho)

### Community 36 - "CBR-019: Fitt-Servini Lite"
Cohesion: 1.0
Nodes (1): CBR-019: Fitt-Servini lite (Cálculo)

### Community 37 - "A-011: Login MVP"
Cohesion: 1.0
Nodes (1): A-011: Alcance del login MVP (RESUELTA)

### Community 38 - "CAC-001: Performance Robotomus"
Cohesion: 1.0
Nodes (1): CAC-001: Performance Robotomus

### Community 39 - "CAC-003: Usabilidad Mobile"
Cohesion: 1.0
Nodes (1): CAC-003: Usabilidad mobile

### Community 40 - "CAC-012: Performance MVP"
Cohesion: 1.0
Nodes (1): CAC-012: Performance flujo crítico MVP

### Community 41 - "C-005: Asignación Auto/Manual"
Cohesion: 1.0
Nodes (1): C-005: Asignación auto vs manual (falso positivo)

### Community 42 - "DP-007: Stack Final Pendiente"
Cohesion: 1.0
Nodes (1): DP-007: Stack final (frontend/backend/BD)

### Community 43 - "DF-02: Fecha Firma Colegio"
Cohesion: 1.0
Nodes (1): DF-02: Fecha exacta firma acuerdo Colegio

### Community 44 - "T-015: Inspección Ocular"
Cohesion: 1.0
Nodes (1): T-015: Inspección ocular

### Community 45 - "T-034: Dashboard Owner Web"
Cohesion: 1.0
Nodes (1): T-034: Dashboard Owner web

### Community 46 - "T-035: Dashboard Owner Mobile"
Cohesion: 1.0
Nodes (1): T-035: Dashboard Owner mobile primitivo

### Community 47 - "RG-007: i18n Fase 2"
Cohesion: 1.0
Nodes (1): RG-007: i18n (diferido Fase 2)

## Ambiguous Edges - Review These
- `Tasación simple (sin inspección ocular, firmada por la plataforma)` → `Inspección ocular`  [AMBIGUOUS]
  CLAUDE.md · relation: semantically_similar_to

## Knowledge Gaps
- **265 isolated node(s):** `Coordinador técnico (DSDM)`, `Células de equipo (DSDM)`, `Corredores inmobiliarios matriculados (S-006)`, `Particulares (clientes finales, S-007)`, `Inmobiliarias B2B / Remax (S-008)` (+260 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Datos Recolección Tasación`** (2 nodes): `CRF-001: Fotos + descripción + geolocalización`, `RC-011: Datos a recolectar en nueva tasación`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tiempo Objetivo Flujo`** (2 nodes): `A-002: Tiempo objetivo flujo (RESUELTA)`, `CAC-004: Tiempo flujo (Usabilidad)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Rol BA y Consultores`** (2 nodes): `DF-03: Rol BA Franco+Sebastián`, `DP-001: Identidad consultores externos`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Staging: Candidatos RF`** (1 nodes): `Staging: Candidatos RF (tombstone, 21 CRF)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Staging: Candidatos BR`** (1 nodes): `Staging: Candidatos BR (vivo, 19 CBR)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Staging: Ambigüedades`** (1 nodes): `Staging: Ambigüedades (17 A-NNN)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Staging: Atributos Calidad`** (1 nodes): `Staging: Atributos calidad mencionados (12 CAC)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Staging: Glosario Candidato`** (1 nodes): `Staging: Glosario candidato (27 términos, tombstone)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Staging: Decisiones Pendientes`** (1 nodes): `Staging: Decisiones pendientes (14 DP, tombstone)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Staging: Contradicciones`** (1 nodes): `Staging: Contradicciones (5 C-NNN, cerrado)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Staging: Requerimientos Crudos`** (1 nodes): `Staging: Requerimientos crudos (55 RC)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CRF-004: Doble Índice`** (1 nodes): `CRF-004: Doble índice (Robotomus + Fitt-Servini)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CRF-017: Tipos Inmueble`** (1 nodes): `CRF-017: Tipos de inmueble`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CRF-019: Motivos Tasación`** (1 nodes): `CRF-019: Motivos de tasación (10)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CRF-020: Geolocalización`** (1 nodes): `CRF-020: Geolocalización tap mapa`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CRF-023: Estados Tasación`** (1 nodes): `CRF-023: Estados de tasación`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CBR-002: Matrícula+Curso`** (1 nodes): `CBR-002: Matrícula verificada + curso plataforma (Habilitador)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CBR-017: Catálogo Motivos`** (1 nodes): `CBR-017: Catálogo 10 motivos (Hecho)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CBR-018: Dos Índices Valor`** (1 nodes): `CBR-018: Dos índices de valor (Hecho)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CBR-019: Fitt-Servini Lite`** (1 nodes): `CBR-019: Fitt-Servini lite (Cálculo)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `A-011: Login MVP`** (1 nodes): `A-011: Alcance del login MVP (RESUELTA)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CAC-001: Performance Robotomus`** (1 nodes): `CAC-001: Performance Robotomus`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CAC-003: Usabilidad Mobile`** (1 nodes): `CAC-003: Usabilidad mobile`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CAC-012: Performance MVP`** (1 nodes): `CAC-012: Performance flujo crítico MVP`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `C-005: Asignación Auto/Manual`** (1 nodes): `C-005: Asignación auto vs manual (falso positivo)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `DP-007: Stack Final Pendiente`** (1 nodes): `DP-007: Stack final (frontend/backend/BD)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `DF-02: Fecha Firma Colegio`** (1 nodes): `DF-02: Fecha exacta firma acuerdo Colegio`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `T-015: Inspección Ocular`** (1 nodes): `T-015: Inspección ocular`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `T-034: Dashboard Owner Web`** (1 nodes): `T-034: Dashboard Owner web`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `T-035: Dashboard Owner Mobile`** (1 nodes): `T-035: Dashboard Owner mobile primitivo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `RG-007: i18n Fase 2`** (1 nodes): `RG-007: i18n (diferido Fase 2)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Tasación simple (sin inspección ocular, firmada por la plataforma)` and `Inspección ocular`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `Cristian Cocucci (Sponsor + Visionario)` connect `Actores y Stakeholders` to `Staging Candidatos + Decisiones`, `Metodología SDD + Roles Snowman`?**
  _High betweenness centrality (0.333) - this node is a cross-community bridge._
- **Why does `S-001 — Cristian Cocucci (Sponsor + Visionario)` connect `Actores y Stakeholders` to `Núcleo Reglas + Calidad MVP`?**
  _High betweenness centrality (0.329) - this node is a cross-community bridge._
- **Why does `Colegio de Arquitectos (S-012)` connect `Staging Candidatos + Decisiones` to `Actores y Stakeholders`?**
  _High betweenness centrality (0.292) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `CU-UI-001 — Tasador crea una tasación nueva end-to-end` (e.g. with `CU-UI-003 — Tasador consulta sus tasaciones (Mis tasaciones)` and `CU-UI-014 — Cliente B2C realiza Tasación Referencial desde app mobile`) actually correct?**
  _`CU-UI-001 — Tasador crea una tasación nueva end-to-end` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `RF-008 — validación de guardado` (e.g. with `RF-001 — selector tipo de inmueble` and `RF-002 — motivo de tasación`) actually correct?**
  _`RF-008 — validación de guardado` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Coordinador técnico (DSDM)`, `Células de equipo (DSDM)`, `Corredores inmobiliarios matriculados (S-006)` to the rest of the system?**
  _265 weakly-connected nodes found - possible documentation gaps or missing edges._