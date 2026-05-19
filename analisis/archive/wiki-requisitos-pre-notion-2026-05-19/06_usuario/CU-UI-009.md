---
id: CU-UI-009
nivel: usuario
tipo: caso-de-uso
estilo: esqueleto
estado: pendiente-fase2
version: 1
ultima_modificacion: 2026-05-14
moscow: should
fase: Fase 2
trazabilidad:
  rc_origen: [RC-019, RC-033]
---

# CU-UI-009 — Sistema asigna tasador automáticamente por zona

## Actor principal
[[T-021]] Plataforma.

## Resumen
Recibida una solicitud (CU-UI-007), el sistema busca tasadores activos cercanos al inmueble (radius search desde lat/lng), considera especialización por tipo de inmueble + ranking, y asigna. El solicitante puede sobrescribir manualmente la elección.

## Por qué NO está en MVP-6sem
- Asignación es manual (admin) en MVP — el flujo viene "asignado" porque el arquitecto autor coincide con el tasador.
- Requiere mapa de tasadores con disponibilidad — Fase 2.

## Fase
Should (Fase 2). Vinculado a CRF-006 + BR-008.

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

<!-- AUTOGEN:trazabilidad END -->
