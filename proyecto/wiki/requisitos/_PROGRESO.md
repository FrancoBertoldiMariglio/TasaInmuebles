# Progreso de IR — tasa-inmuebles

> Dashboard vivo del estado de la ingeniería de requisitos. Cada skill que escribe artefactos actualiza la fila correspondiente.

**Iniciativa:** tasa-inmuebles
**Proyecto:** Cocucci
**Wiki:** `/Users/francobertoldi/Documents/Cocucci/proyecto/wiki/requisitos/`
**Bootstrap:** 2026-05-14 — `ir-nueva-iniciativa`

| Fase | Estado | Skill responsable | Última actualización |
|------|--------|-------------------|----------------------|
| Fundamentos (Mundo 0) | completo (snowman pendiente) | definir-fundamentos | 2026-05-14 |
| Stakeholders | completo (matriz + snowman) | identificar-stakeholders + armar-snowman | 2026-05-14 |
| Enfoque IR | completo | dimensionar-iniciativa | 2026-05-14 |
| Staging poblado | completo (8 archivos) | procesar-transcripcion | 2026-05-14 |
| Glosario | completo (32 términos T-001..T-032) | armar-glosario | 2026-05-14 |
| Requisitos globales | **6 RG aprobados** (RG-001..006) + RG-007 i18n diferido a Fase 2 | crear-requisitos-globales | 2026-05-14 |
| Nivel Negocio (BR-NEG) | completo (3 archivos: 001 visión, 003 restricción contractual, 004 monetización; 002 y 005 movidos — ver _TOMBSTONES.md) | clasificar-requisitos | 2026-05-14 |
| Nivel Usuario (CU-UI) | borrador (17 archivos: 7 MVP + CU-UI-014 autotasador agregado al MVP + 9 Fase 2/3) | crear-caso-uso | 2026-05-14 |
| Nivel Software (RF) | borrador (20 esqueletos MVP — RF-001..RF-020: incluye Fitt-Servini RF-016 + autotasador RF-017..RF-020) | clasificar-requisitos | 2026-05-14 |
| Atributos de calidad (AC) | 5 críticos MVP con Planguage completo (AC-001, AC-003, AC-005, AC-012, AC-013). 8 candidatos restantes para Fase 2. | crear-atributo-calidad | 2026-05-14 |
| Reglas de negocio (BR) | 14 críticas MVP formalizadas con clasificación 5 tipos (5 Hechos, 4 Restricciones, 2 Habilitadores, 3 Cálculos). 6 candidatos restantes para Fase 2. | crear-regla-negocio | 2026-05-14 |
| Decisiones pendientes (DP) | completo (14 DP promovidas a 10_decisiones/pendientes.md + índices DS/DF/Q cruzados) | clasificar-requisitos + curaduría manual | 2026-05-14 |
| Trazabilidad | completa (60 nodos, 87 edges, 100% cobertura N→S MVP) | trazabilidad-completa | 2026-05-14 |
| Handoff SDD | vacío | ir-handoff-sdd | — |

## Material fuente disponible

| Recurso | Ruta | Notas |
|---|---|---|
| Transcripción reunion-01 | `../../analisis/reunion-01/transcript.txt` | Speakers A=Sebastián, B=Cocucci, C=Franco, D=miembro técnico (a confirmar) |
| Audio reunion-01 | `../../analisis/reunion-01/Palmares Open Mall 4.m4a` | Fuente del transcript |
| Brief Cocucci | `../../analisis/“Tasa Inmuebles…pdf` | 8 páginas, diagramas + stack recomendado |
| Capturas WhatsApp | `../../analisis/imgs/` | 30 imágenes de la maqueta vieja (UI de referencia) |

## Próximos pasos

1. ~~`definir-fundamentos`~~ ✓ completo 2026-05-14.
2. ~~`identificar-stakeholders`~~ ✓ matriz completa 2026-05-14 (22 stakeholders, 3 desfavorecidos detectados).
3. ~~`armar-snowman`~~ ✓ v2: 6 roles asignados, 3 overlaps esperables, célula = solo Franco (bus-factor 1), consultor1/consultor2 como asesores externos.
4. ~~`dimensionar-iniciativa`~~ ✓ MoSCoW + dual-track para bordes complejos + upfront para compliance.
5. ~~`ir-procesar-clase`~~ ✓ staging poblado 2026-05-14 (55 RC + 21 CRF + 18 CBR + 12 CAC + 27 glosario + 12 decisiones + 17 ambigüedades + 5 contradicciones).
6. ~~`armar-glosario`~~ ✓ 31 términos promovidos (incluye desambiguación T-026 en 3 acepciones + 6 estados desplegados). 3 términos protegidos (Robotomus, Inmoclick, Métricas).
7. ~~`traducir-requerimiento`~~ ✓ 4 ambigüedades bloqueantes resueltas (A-002, A-011, A-016, A-017). Modelo de datos de Tasación confirmado. 2 nuevas preguntas pendientes derivadas (Q11 nomenclatura UI, Q12 lista amenities) — no bloqueantes.
8. ~~`clasificar-requisitos`~~ ✓ 5 BR-NEG + 16 CU-UI + 15 RF + índices AC/BR creados (2026-05-14).
9. ~~`crear-atributo-calidad`~~ ✓ 5 AC críticos MVP completos (AC-001, AC-003, AC-005, AC-012, AC-013) con Planguage formal el 2026-05-14.
10. ~~`crear-regla-negocio`~~ ✓ 14 BR críticas MVP formalizadas con 5 tipos § 7 marco el 2026-05-14.
11. `crear-caso-uso` — desarrollar los 5 CU-UI MVP al nivel "valor" (los esqueletos ya están). CU-UI-001 ya está fully-dressed.
12. ~~`validar-terna`~~ ✓ 20/20 RF con terna completa (13 con AC+BR, 7 con AC+sin_br_aplicable justificado). 0 AC huérfanos. 1 BR esperada-huérfana (BR-001 Fase 2). Reporte: `_reportes/validacion-terna-2026-05-14.md`.
13. ~~`trazabilidad-completa`~~ ✓ 09_trazabilidad.md generado 2026-05-14 — 60 nodos, 87 edges, 100% cobertura N→S MVP, diagrama Mermaid + tablas detalladas + análisis de impacto.
14. `ir-handoff-sdd` — generar `12_handoff-sdd/manifest.md` para `sandinas-wiki-skills`.

## Hitos del proyecto

- **Hito 1 — MVP demo Colegio:** 2026-06-25 (6 semanas desde 2026-05-14).
- **Hito 2 — Cierre acuerdo Colegio:** ~2026-10-19 (a confirmar).

## Cadencia de IR

Bisemanal durante las 6 semanas del MVP. Sesiones pactadas: 2026-05-28 (S02), 2026-06-11 (S03), 2026-06-25 (demo Colegio).
