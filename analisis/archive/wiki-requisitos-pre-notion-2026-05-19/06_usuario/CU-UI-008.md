---
id: CU-UI-008
nivel: usuario
tipo: caso-de-uso
estilo: esqueleto
estado: pendiente-fase2
version: 1
ultima_modificacion: 2026-05-14
moscow: should
fase: Fase 2 (dual-track — borde complejo)
trazabilidad:
  rc_origen: [RC-015, RC-016, RC-017, RC-018, RC-051, RC-052]
---

# CU-UI-008 — Robotomus calcula valor referencial automático

## Actor principal
[[T-023]] Robotomus (módulo IA del sistema).

## Resumen
Al crear una tasación, el sistema invoca Robotomus que retorna `(valor_estimado, % confianza, fuente)` basado en inferencia sobre [[T-013]] + scraping de portales + capa [[T-016]] Métricas.

## Por qué NO está en MVP-6sem
- Cynefin **complejo** → dual-track con experimentos antes de codear.
- MVP usa "promedio fake" (RC-053).
- Robotomus real es Fase 2 con métricas claras (AC-002 ≤ 5 s, calidad mínima de inferencia).

## Trazabilidad
Should (Fase 2). Vinculado a BR-001 cálculo confianza + AC-002 tiempo.

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

<!-- AUTOGEN:trazabilidad END -->
