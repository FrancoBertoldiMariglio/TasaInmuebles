---
artefacto: glosario-candidato (tombstone — todos promovidos)
fuente: ../../../analisis/reunion-01/transcript.txt
procesado: 2026-05-14
ultima_actualizacion: 2026-05-14
total_terminos: 27
terminos_promovidos: 27/27
terminos_adicionales_post_promocion: 8 (T-026 desambiguado en 3 + T-032 Solicitante + T-033 Mis tasaciones + T-034 Dashboard web + T-035 Dashboard mobile)
estado: cerrado
promovido_a: ../03_glosario.md
---

# Glosario candidato — **PROMOVIDO**

> ✓ **Promoción completada el 2026-05-14.** Los 27 términos candidatos fueron promovidos a [`../03_glosario.md`](../03_glosario.md) con IDs canónicos `T-001..T-031`. Posteriormente se agregaron 4 términos adicionales (T-032..T-035) durante refinamientos. Total actual del glosario: **35 términos**.
>
> Este archivo queda como tombstone para auditoría histórica.

## Mapping de términos (orden alfabético del glosario canónico)

| Término | ID canónico |
|---|---|
| Acuerdo | T-001 |
| Borrador (estado) | T-002 |
| Caso de uso | T-003 |
| Colegio de Arquitectos | T-004 |
| Comisión | T-005 |
| Comité de tasación | T-006 |
| Compartida (estado) | T-007 |
| Confianza (de la inferencia) | T-008 |
| En comité (estado) | T-009 |
| Entidad | T-010 |
| Fitt y Servini | T-011 |
| Inferencia | T-012 |
| Inmoclick **(protegido)** | T-013 |
| Inspección hecha (estado) | T-014 |
| Inspección ocular | T-015 |
| Métricas **(protegido)** | T-016 |
| Mobile First | T-017 |
| MVP | T-018 |
| Owner | T-019 |
| Particular | T-020 |
| Plataforma | T-021 |
| Por tasar (estado) | T-022 |
| Robotomus **(protegido)** | T-023 |
| Scraping | T-024 |
| SDD (Spec-Driven Development) | T-025 |
| Tasación | T-026 (con 3 acepciones internas a/b/c) |
| Tasada (estado) | T-027 |
| Tasador | T-028 |
| Valor de mercado | T-029 |
| Valor técnico | T-030 |
| Z-Value (Zillow) | T-031 |
| Solicitante (alias: Referente) | T-032 (agregado post-cierre A-016) |
| Mis tasaciones (pantalla principal app mobile) | T-033 (agregado en fix dashboard) |
| Dashboard Owner web | T-034 (agregado en fix dashboard) |
| Dashboard Owner mobile primitivo | T-035 (agregado en fix dashboard) |

## Tabla original de candidatos (preservada)

**Categorías LEL:** Sujeto · Objeto · Verbo · Estado

| Término | Categoría | Frecuencia | Speakers | Definición tentativa | Fuente / nota |
|---------|-----------|-----------|----------|----------------------|---------------|
| **Tasación** | Objeto | muy alta | A,B,C,D | Cálculo profesional del valor de un inmueble, simple (firmada por la plataforma) o certificada (firmada por colegiado tras inspección ocular). | RC-035, L251 |
| **Tasador** | Sujeto | muy alta | A,B,C,D | Profesional matriculado (arquitecto o corredor inmobiliario) habilitado para tasar inmuebles. | RC-020, L171 |
| **Comité de tasación** | Sujeto / Estado | alta | A,B,C | Grupo de tasadores que revisa y valida un valor final propuesto para una tasación. Estado intermedio entre "guardada" y "tasada". | RC-051, L339 |
| **Robotomus** | Sujeto | alta | B,C | Módulo interno de IA que provee valor referencial automático + asistencia en descripción + insights. Nombre comercial dentro del producto. | RC-015, L163 |
| **Inmoclick** | Objeto / Sujeto | alta | B,C | Base de datos histórica propiedad de Cocucci (~20 años, +400 inmobiliarias publicadoras). Fuente primaria de datos para entrenar Robotomus. | RC-016, L163 |
| **Métricas** | Objeto | media | B | Base de datos intermedia agregada que pre-procesa los datos de Inmoclick para evitar consultas costosas en tiempo real. A reconstruir. | RC-016, L163 |
| **Inspección ocular** | Verbo | alta | A,B | Visita física del tasador colegiado al inmueble. Acción necesaria para certificar una tasación. | RC-035, L251 |
| **Valor de mercado** | Objeto | alta | B | Valor referencial obtenido por Robotomus a partir de comparables públicos. Cocucci dice: "más cercano a la realidad que el valor técnico". | RC-017, L163 |
| **Valor técnico** | Objeto | alta | B | Valor determinístico calculado con la fórmula de Fitt y Servini del Colegio de Arquitectos (m² × categoría × coeficientes). | RC-017, L163 |
| **Fitt y Servini** | Objeto | media | A,B | Autores del manual estándar argentino de tasación técnica. Su fórmula es el valor técnico canónico del Colegio. | L163 |
| **Owner** | Sujeto | alta | B,C | Dueño/responsable de una Entidad B2B (inmobiliaria, banco, constructora). Tiene dashboard agregado de sus tasadores. | RC-037, L267 |
| **Entidad** | Objeto / Sujeto | alta | A,B | Cliente B2B que agrupa inmuebles + tasadores habilitados + owners. Ej: Remax, Banco Galicia, Poder Judicial. | RC-024, L197 |
| **MVP** | Objeto | alta | A,B,C,D | Producto Mínimo Viable. En este proyecto: subset entregable para la demo al Colegio de Arquitectos (Hito 1, 2026-06-25). | L13, L375 |
| **Colegio de Arquitectos** | Sujeto | muy alta | A,B,D | Institución profesional con la que Cocucci firmó acuerdo de 6 meses. Provee a los ~10 arquitectos del MVP y la homologación profesional. | RC-021, L191 |
| **Acuerdo** | Objeto | alta | A,B | Convenio formal Cocucci-Colegio de duración 6 meses. Su firma origina los hitos del proyecto. | RC-021, L191 |
| **SDD (Spec-Driven Development)** | Objeto | media | C | Metodología de captura de requerimientos: grabación → transcripción → casos de uso → IA genera código a partir de especificaciones. **Nota:** transcript dice "Spectrum Development" por error de reconocimiento de voz; el término correcto es Spec-Driven Development. | RC-008, L105 |
| **Caso de uso** | Objeto | alta | A,B,C | Unidad de especificación funcional con marco "caso → requisitos → precondiciones → poscondiciones". Reemplaza a las HU en Fase 1. | RC-009, L119 |
| **Inferencia** | Verbo / Objeto | media | C | En ML: estimación de un valor (precio del inmueble) a partir de datos históricos + datos del usuario, con porcentaje de confianza asociado. | RC-052, L341 |
| **Confianza (de la inferencia)** | Objeto | media | C | % declarado por el modelo. Depende de completitud de variables del usuario, no de calidad del entrenamiento. | RC-053, L349 |
| **Scraping** | Verbo | media | B,C | Extracción automática de datos publicados en portales (ZonaProp, ArgenProp, MercadoLibre). Riesgo legal vigente (Ley 25.326). | RC-018, RC-054 |
| **Z-Value (Zillow)** | Objeto | baja | C | Valor de tasación automática que publica Zillow (referencia internacional). Está homologado en EE.UU. | L183 |
| **Particular** | Sujeto | media | A,B | Cliente final que solicita tasación de un inmueble propio. Diferenciado de Empresas y Tasadores. | RC-029, PDF |
| **Inspección ocular pendiente** | Estado | media | C | Estado de una tasación a la que aún no se le hizo visita física. | RC-049, L329 |
| **Borrador / Inspección hecha / Por tasar / En comité / Tasada / Compartida** | Estado | alta | B,C | Estados del flujo de tasación (ver CBR-014, CBR-015 y CRF-023). | L329-339 |
| **Plataforma** | Objeto | alta | A,B,C | Tasa Inmuebles como producto. Cocucci la diferencia explícitamente de "una persona física que pueda firmar". | RC-035, L251 |
| **Mobile First** | Objeto / Atributo | media | C,D | Política de diseño: la app prioriza la experiencia en dispositivo móvil. El flujo de tasación es mobile-first; los dashboards son web con versión mobile. | RC-010, L127, L385 |
| **Comisión** | Objeto | media | B | Porcentaje que se queda la plataforma por cada tasación. **10%** según CBR-003. | RC-026, L207 |

## Términos detectados con definición pendiente

- **"Castillo"** (RC-032, L227): unidad informal para "inmueble grande" (1500 m²+). No es término técnico — ¿lo incorporamos? Probable: dejar fuera del glosario y aclarar dentro de CBR-007.
- **"Razonable" / "calidad / buena tasación"** (RC-017, RC-051): subjetivos. Requieren Planguage en CAC.
- **"Match" / "Asignar"** (RC-019, L171): falta especificar el algoritmo. Definición pendiente cuando se diseñe CRF-006.

## Términos no relevantes (excluidos del glosario)

- Nombres propios de personas no-stakeholder (ej: "Silvana Pacheco", "Federico tanto", "el Pablo"): mencionados como ejemplos.
- Marcas de proveedores tecnológicos (Notion, Trello, AWS, GitLab): técnicas, no del dominio.
- "Carpa", "loma del culo": coloquialismos sin valor de dominio.

## Observaciones

- **El término más cargado es "Tasación"** — tiene al menos 3 acepciones contextuales (acción, documento, estado). `armar-glosario` debería desambiguar con sub-entradas.
- **"Robotomus", "Inmoclick" y "Métricas"** son nombres propios internos del producto. Conviene marcarlos como **términos protegidos** (no traducir, no inventar sinónimos).
- **El glosario de estados** (Borrador → ... → Compartida) está en una sola fila por brevedad pero merece desplegarse en `armar-glosario` con uno por estado.
