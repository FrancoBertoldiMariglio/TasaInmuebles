# Índice de Reglas de Negocio (BR) — `07_software/BR/`

> Las BR se clasifican en 5 tipos (§ 7 marco): Hecho · Restricción · Habilitador · Inferencia · Cálculo. La skill `clasificar-requisitos` NO crea BR directamente — las lista acá como pendientes para que `crear-regla-negocio` las genere con la clasificación formal.

**Convención IDs:** `BR-NNN`. No se reusan.

## Candidatos detectados (18 desde staging/candidatos-br.md + 2 nuevos)

### Críticos MVP-6sem (formalizados con clasificación 5 tipos § 7 marco)

| BR | Tipo | Resumen | Aplica a RF | Status |
|----|------|---------|-------------|--------|
| **[BR-001](BR-001.md)** | Cálculo | Comisión 90/10 (10% plataforma, 90% tasador) | (módulo contable Fase 2) | ✓ formalizado |
| **[BR-002](BR-002.md)** | Habilitador | Verificación matrícula + curso obligatorio para Tasador | RF-010 | ✓ formalizado |
| **[BR-004](BR-004.md)** | Hecho | Catálogo cerrado de 6 tipos de inmueble | RF-001, RF-019 | ✓ formalizado |
| **[BR-005](BR-005.md)** | Hecho | Catálogo cerrado de 10 motivos de tasación | RF-002 | ✓ formalizado |
| **[BR-006](BR-006.md)** | **Cálculo** (con Hecho secundario) | Escala 1-5 estado_conservacion + coef Fitt-Servini | RF-005, RF-016, RF-019 | ✓ formalizado |
| **[BR-007](BR-007.md)** | Restricción | Máx 15 fotos por tasación profesional, máx 5 referencial | RF-006, RF-019 | ✓ formalizado |
| **[BR-008](BR-008.md)** | Restricción | Descripción mínima 50 caracteres | RF-007, RF-008, RF-019 | ✓ formalizado |
| **[BR-009](BR-009.md)** | Restricción | MVP solo arquitectos del Colegio (rol tasador) | RF-010, RF-018 | ✓ formalizado |
| **[BR-014](BR-014.md)** | Hecho | Transición Borrador → Inspección hecha | RF-008 | ✓ formalizado |
| **[BR-015](BR-015.md)** | Hecho | Transición automática Inspección hecha → Por tasar | RF-009, RF-016 | ✓ formalizado |
| **[BR-018](BR-018.md)** | Hecho | Doble índice valor (Robotomus + Fitt-Servini) | RF-015, RF-016 | ✓ formalizado |
| **[BR-019](BR-019.md)** | Cálculo | Fórmula Fitt-Servini lite v1 | RF-016 | ✓ formalizado (depende DS-08) |
| **[BR-021](BR-021.md)** | Restricción | Disclaimer obligatorio en PDF Tasación referencial | RF-020 | ✓ formalizado (texto pendiente validación legal) |
| **[BR-022](BR-022.md)** | Habilitador | Cliente B2C ve solo sus propias tasaciones referenciales | RF-018, RF-019 | ✓ formalizado |

### Fase 2+

| BR propuesto | Tipo | Fuente | Status |
|--------------|------|--------|--------|
| **BR-003** | Cálculo | CBR-004 — reparto cuando hay inmobiliaria intermedia | pendiente DS-02 |
| **BR-010** | Inferencia | CBR-010 — confianza Robotomus = completitud variables usuario | Fase 2 (Robotomus real) |
| **BR-011** | Hecho | CBR-011 — confianza Robotomus esperada 90-99% | Fase 2 |
| **BR-012** | Restricción | CBR-012 — scraping legalmente cuestionable Ley 25.326 | pendiente DS-03 (legal) |
| **BR-013** | Cálculo | CBR-013 — costo certificada >> simple | Fase 2 (pricing variable) |
| **BR-016** | Habilitador | CBR-005 — inspección ocular requerida para certificación | Fase 2 |
| **BR-017** | Cálculo | CBR-007 — tarifa variable por superficie | Fase 2 |
| **BR-020** | Cálculo | Fitt-Servini refinada: coef frente/fondo dinámico desde geometría del terreno + depreciación no-lineal + tipo de cambio API | Fase 2 |

## Plantilla BR (§ 7 marco)

Cada BR debe tener:
- Tipo (Hecho · Restricción · Habilitador · Inferencia · Cálculo)
- Enunciado claro
- Parámetros (si aplica)
- Fuente de autoridad (regulación, acuerdo, decisión del sponsor)
- RF que la aplican (trazabilidad)

## Próximo paso

✓ **14 BR críticas MVP formalizadas el 2026-05-14** con clasificación en los 5 tipos del § 7 del marco.

### Distribución por tipo

| Tipo | Cantidad MVP | IDs |
|------|--------------|-----|
| **Hecho** | 5 | BR-004, BR-005, BR-014, BR-015, BR-018 |
| **Restricción** | 4 | BR-007, BR-008, BR-009, BR-021 |
| **Habilitador** | 2 | BR-002, BR-022 |
| **Cálculo** | 3 | BR-001, BR-006, BR-019 |
| **Inferencia** | 0 (las inferencias son de Robotomus → Fase 2) | — |

### Pendiente operativo antes del Hito 1

- **BR-019** depende de DS-08 (tabla `valor_m2_*`) — bloqueante MVP.
- **BR-021** depende de validación legal del texto del disclaimer.
- **BR-009** depende de DS-05 (jurisdicción del Colegio).

Las BR de Fase 2+ se formalizan cuando se desarrolle el RF correspondiente.
