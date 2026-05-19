---
id: CU-UI-013
nivel: usuario
tipo: caso-de-uso
estilo: esqueleto
estado: pendiente-fase2
version: 1
ultima_modificacion: 2026-05-14
moscow: should
fase: Fase 2 (dual-track — borde complejo)
trazabilidad:
  rc_origen: [RC-016, RC-018]
---

# CU-UI-013 — Sistema entrena Robotomus con Inmoclick + scraping

## Actor principal
[[T-021]] Plataforma (sistema interno) + S-003 Franco como responsable ML.

## Resumen
Pipeline batch que: (a) lee datos históricos de [[T-013]], (b) ejecuta scraping ético de portales ([[T-024]] — sujeto a DS-03 legal), (c) genera la capa intermedia [[T-016]], (d) entrena el modelo de inferencia con confianza, (e) lo despliega como servicio que CU-UI-008 invoca.

## Por qué NO está en MVP-6sem
- Robotomus real es Fase 2.
- Dependencias críticas: DS-03 (legalidad scraping), reconstrucción de Métricas, recolección de Inmoclick.
- Bordes complejos del Cynefin → discovery + experimentos antes de codear.

## Fase
Should (Fase 2). Vinculado al objetivo de ML de la tesis de Franco.

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

<!-- AUTOGEN:trazabilidad END -->
