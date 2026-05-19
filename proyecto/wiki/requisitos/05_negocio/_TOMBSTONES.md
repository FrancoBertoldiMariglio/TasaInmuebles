# Tombstones de `05_negocio/`

> Registro de IDs `BR-NEG-NNN` que existieron y fueron eliminados o reclasificados. **Los IDs NO se reusan** (regla del plugin IR § folder-structure). Esta lista preserva trazabilidad histórica.

## Convención

| Campo | Valor |
|---|---|
| ID | El ID original que dejó de existir. |
| Estado | `movido` (fue reclasificado a otro lugar) · `eliminado` (descartado) · `merged` (fusionado con otro). |
| Fecha | Cuándo se mató. |
| Destino | Dónde fue movido si aplica. |
| Razón | Por qué se mató. |

## Registros

### BR-NEG-002 — Hito 1: Demo funcional al Colegio antes de 2026-06-25

- **Estado:** `movido`
- **Fecha:** 2026-05-14
- **Destino:** `00_fundamentos.md` § "Métrica de éxito del MVP (Hito 1)" (ampliada con criterio 10/10 estricto + métricas duras).
- **Razón:** Un **hito de proyecto** (milestone) no es estrictamente un *business requirement* — es una fecha objetivo con criterio de cumplimiento. La info ya estaba parcialmente duplicada en `00_fundamentos.md`. Se consolidó allá y se agregó la info adicional de criterio 10/10 + 0 errores P0 que vino del cierre de A-017. Reclasificación detectada por Franco el 2026-05-14.

### BR-NEG-005 — Metodología de captura: SDD + casos de uso + mobile-first

- **Estado:** `movido`
- **Fecha:** 2026-05-14
- **Destino:** `02_enfoque-IR.md` § "Metodología base (no negociable)" (nueva sección al inicio del archivo).
- **Razón:** Es una **decisión metodológica del proceso de desarrollo**, no un requirement del producto. Lo que el negocio **requiere** es el producto que resuelve un problema; el **cómo** lo construimos (SDD + CU + mobile-first) es restricción operativa de proceso. El lugar natural es el documento de enfoque de IR. Reclasificación detectada por Franco el 2026-05-14.

---

## Referencias que apuntaban a IDs tumbados

Cuando una referencia decía `BR-NEG-002`, se actualizó a:
- `00_fundamentos.md § Métrica de éxito MVP` si el contexto era el hito.
- `BR-NEG-001` si el contexto era cubrir la visión (donde la métrica de éxito materializa la visión).

Cuando una referencia decía `BR-NEG-005`, se actualizó a:
- `02_enfoque-IR.md § Metodología base` o se simplemente eliminó (porque era info redundante).

Detalle por archivo: ver `git log` o el changelog de cada CU/RF tocado.
