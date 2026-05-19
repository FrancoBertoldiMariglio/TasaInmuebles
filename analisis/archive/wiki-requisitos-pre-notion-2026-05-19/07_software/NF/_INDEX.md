# Índice de Atributos de Calidad (AC) — `07_software/NF/`

> Los AC se especifican con Planguage (§ 5 marco). La skill `clasificar-requisitos` NO crea AC directamente — los lista acá como pendientes para que `crear-atributo-calidad` los genere con el rigor formal Planguage.

**Convención IDs:** `AC-NNN`. No se reusan.

## Candidatos detectados (12 desde staging/atributos-calidad-mencionados.md)

### Críticos MVP-6sem (Planguage completo)

| AC | Categoría | Fuente | Status |
|----|-----------|--------|--------|
| **[AC-001](AC-001.md)** | Performance | Cierre A-002 — tiempo flujo nueva tasación profesional ≤ 8 min p80 | ✓ Planguage completo |
| **[AC-003](AC-003.md)** | Usabilidad | CAC-003 — usabilidad mobile en campo (doble escala SUS + soporte requerido) | ✓ Planguage completo |
| **[AC-005](AC-005.md)** | Compliance | DS-04 — Ley 25.326 (checklist auditable de 7 ítems) | ✓ Planguage completo |
| **[AC-012](AC-012.md)** | Performance | CAC-012 — tiempo carga inicial mobile ≤ 3 s p95 en 4G | ✓ Planguage completo |
| **[AC-013](AC-013.md)** | Performance | Autotasador MVP — Fitt-Servini en mobile B2C ≤ 5 s p95 | ✓ Planguage completo |
| **AC-013** | Performance | Cálculo Fitt-Servini en mobile para flujo Cliente B2C, target ≤ 5 s | pendiente Planguage |

### Fase 2+

| AC propuesto | Categoría | Fuente | Status |
|--------------|-----------|--------|--------|
| **AC-002** | Performance | Cierre A-002 — tiempo Robotomus ≤ 5 s (p95) | pendiente, dependiente de Robotomus real |
| **AC-004** | Performance | CAC-004 — eficiencia del tasador, vinculado a AC-001 | redundante con AC-001 (consolidar) |
| **AC-006** | Compliance | CAC-006 — homologación profesional (tipo Z-Value) | aspiracional Fase 3 |
| **AC-007** | Disponibilidad | CAC-007 — uptime Métricas/Robotomus | pendiente Planguage |
| **AC-008** | Trazabilidad | CAC-008 — auditabilidad origen datos + tasador | pendiente Planguage |
| **AC-009** | Escalabilidad | CAC-009 — nro tasadores soportados | pendiente Planguage |
| **AC-010** | Mantenibilidad | CAC-010 — implícito en stack open source | descartable |
| **AC-011** | Interoperabilidad | CAC-011 — integraciones Google Maps, OpenAI, etc. | implícito en RF, no requiere AC formal |

## Plantilla Planguage (§ 5 marco)

Cada AC debe tener:
- Nombre + Categoría
- Escala (unidad de medida)
- Metro (cómo se mide)
- Mínimo (peor caso aceptable)
- Objetivo (valor deseado)
- Máximo (techo aspiracional)
- Contexto (condiciones de uso)
- Fuente (stakeholder u documento)

## Próximo paso

✓ 5 AC críticos MVP formalizados con Planguage (2026-05-14). Los demás (AC-002 Robotomus real, AC-004 redundante, AC-006 a AC-011) se especifican en Fase 2 cuando lleguen los subsistemas que los requieren.

**Pendiente operativo antes del Hito 1:**
- AC-005 ítems 1-7 del checklist deben quedar `OK` con artefacto demostrable.
- AC-005 ítem extra: contratar revisión legal externa (~1 día honorarios) — recomendación de Franco.
