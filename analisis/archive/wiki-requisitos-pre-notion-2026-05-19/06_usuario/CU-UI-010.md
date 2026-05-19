---
id: CU-UI-010
nivel: usuario
tipo: caso-de-uso
estilo: esqueleto
estado: pendiente-fase2
version: 1
ultima_modificacion: 2026-05-14
moscow: should
fase: Fase 2
trazabilidad:
  rc_origen: [RC-024, RC-037, RC-039, RC-040, RC-041]
---

# CU-UI-010 — Owner consulta dashboard B2B agregado (web + mobile embebida)

## Actor principal
[[T-019]] Owner de una [[T-010]] Entidad (Remax, banco, constructora, etc.).

## Resumen
Owner accede al dashboard agregado de **todos sus tasadores**. Existe en **dos canales** con UX diferentes pero un solo modelo de datos:

### Canal A — [[T-034]] Dashboard Owner versión web (uso primario)
- Browser desktop / laptop.
- Vista **completa**: tasaciones del mes, comparación mes anterior, tiempo promedio de tasación, zonas más tasadas, ranking interno, filtros avanzados, métricas configurables, export.
- Es el contexto de uso esperado del owner (oficina, escritorio, análisis).

### Canal B — [[T-035]] Dashboard Owner versión mobile (embebida en app del tasador)
- Sección **dentro de la app mobile** del tasador (cuando el owner también es tasador activo).
- Versión **primitiva** del dashboard web: KPIs básicos (tasaciones del mes, comparación, ingresos), sin configuración avanzada ni export.
- Propósito: que un owner que también tasa pueda chequear el agregado en el celular sin abrir la web.
- **Decisión intencional**: la versión mobile **no replica todas las features** del web. El propósito de la app mobile sigue siendo tasar inmuebles + flujo Uber, no análisis denso.

## Por qué NO está en MVP-6sem
- En MVP-6sem la "entidad" es 1 sola (el Colegio) y los 10 arquitectos son **todos tasadores, ningún Owner B2B**.
- Sin Owner, no hay sentido funcional en construir el dashboard.
- El primer Owner B2B aparece en Fase 2 (banco, Remax, Poder Judicial — ver S-008, S-009, S-011).

## Fase
Should (Fase 2). Vinculado a CRF-013 a CRF-016 + Q13 pendiente (nav app mobile cuando user es owner+tasador).

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

<!-- AUTOGEN:trazabilidad END -->
