---
artefacto: reporte-validacion-terna
iniciativa: tasa-inmuebles
fecha: 2026-05-14
skill: validar-terna
---

# Validación de Terna — RF MVP (2026-05-14)

> Implementa § 3 del marco (la terna tatuada): "cada RF debe tener su pata de AC y su pata de BR". Verificación cross-sourced sobre los 20 RF MVP, 5 AC y 14 BR formalizados.

## Resultado global

```
RFs total MVP-6sem:   20 (RF-001..RF-020)
Terna completa:       20/20 (100%)
  - Con AC + BR:      13/20
  - Con AC + sin_br_aplicable justificado: 7/20

AC huérfanos (sin RF que los use):  0/5
BR huérfanas (sin RF que las use):  1/14 (BR-001 — esperada, Fase 2)
Referencias obsoletas ("-pendiente"): 0 (todas limpias)
```

## Detalle por RF

| RF | AC vinculados | BR vinculados | Terna |
|----|---------------|---------------|-------|
| **RF-001** Tipo inmueble | AC-003 | BR-004 | ✓ completa |
| **RF-002** Motivo | AC-003 | BR-005 | ✓ completa |
| **RF-003** Geolocalizar | AC-003 | `sin_br_aplicable` (operativa, RG aplicables) | ✓ completa |
| **RF-004** Datos solicitante | AC-003, AC-005 | `sin_br_aplicable` (operativa, AC-005 + RG-004 protegen) | ✓ completa |
| **RF-005** Detalles | AC-003 | BR-004, BR-006 | ✓ completa |
| **RF-006** Subir fotos | AC-001, AC-003 | BR-007 | ✓ completa |
| **RF-007** Descripción | AC-003 | BR-008 | ✓ completa |
| **RF-008** Validar y guardar | AC-001, AC-003, AC-005 | BR-006, BR-007, BR-008, BR-014 | ✓ completa |
| **RF-009** Por tasar | AC-001 | BR-015 | ✓ completa |
| **RF-010** Login | AC-005, AC-012 | BR-002, BR-009 | ✓ completa |
| **RF-011** Listar tasaciones | AC-003, AC-012 | `sin_br_aplicable` (visibilidad implícita en JWT) | ✓ completa |
| **RF-012** Generar PDF profesional | AC-001 | `sin_br_aplicable` (operativa, sin BR catálogo MVP) | ✓ completa |
| **RF-013** Descargar PDF | AC-005 | `sin_br_aplicable` (operativa, autorización JWT) | ✓ completa |
| **RF-014** Enviar PDF mail | AC-005 | `sin_br_aplicable` (operativa, integración SMTP) | ✓ completa |
| **RF-015** Cerrar comité | AC-001 | BR-018 | ✓ completa |
| **RF-016** Fitt-Servini | AC-013 | BR-006, BR-019 | ✓ completa |
| **RF-017** CTA bifurcado | AC-003, AC-012 | `sin_br_aplicable` (routing por sesión) | ✓ completa |
| **RF-018** Autoregistro B2C | AC-003, AC-005 | BR-022 | ✓ completa |
| **RF-019** Captura referencial | AC-003, AC-013 | BR-006, BR-007, BR-008, BR-019, BR-022 | ✓ completa |
| **RF-020** PDF referencial | AC-001, AC-005 | BR-021 | ✓ completa |

## Huérfanos detectados

### BR huérfanas

| BR | Estado |
|----|--------|
| **BR-001** Comisión 90/10 | **Huérfana esperada**: documentada como "MVP-6sem (modelo); aplicación efectiva Fase 2". El RF de cobro existirá en Fase 2 (módulo contable). No requiere acción. |

### AC huérfanos

Ninguno. Los 5 AC formalizados están todos vinculados a al menos 1 RF.

## Aplicación de RG (Requisitos Globales)

**6 RG aprobados** el 2026-05-14 por Franco (CTO). Aplican transversalmente a todos los RF.

| RG | Aplica transversalmente |
|----|-------------------------|
| RG-001 Moneda + tipo de cambio | RF-012, RF-015, RF-016, RF-019, RF-020 |
| RG-002 Precisión decimal | RF-015, RF-016, RF-019 |
| RG-003 TLS | TODOS los RF |
| RG-004 Audit trail | TODOS los RF que persisten |
| RG-005 Validación input | TODOS los endpoints API |
| RG-006 Logs estructurados JSON | TODOS los RF backend |

RG-007 i18n diferido a Fase 2.

## Conclusión

- ✓ La terna tatuada está completa para los 20 RF MVP.
- ✓ Cero referencias obsoletas a `-pendiente`.
- ✓ Cero AC huérfanos.
- ✓ 1 BR esperada-huérfana (BR-001 documentada para Fase 2).
- ✓ **6 RG aprobados formalmente** el 2026-05-14 (RG-001..RG-006). RG-007 i18n diferido a Fase 2.

## Próximo paso

**`trazabilidad-completa`** — generar `09_trazabilidad.md` con matriz N ↔ U ↔ S ↔ Tests. Insumo principal para `ir-handoff-sdd`.
