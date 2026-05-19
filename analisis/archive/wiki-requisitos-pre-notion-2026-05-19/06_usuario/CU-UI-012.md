---
id: CU-UI-012
nivel: usuario
tipo: caso-de-uso
estilo: esqueleto
estado: pendiente-fase2
version: 1
ultima_modificacion: 2026-05-14
moscow: should
fase: Fase 2
trazabilidad:
  rc_origen: [RC-031, RC-035, RC-036]
---

# CU-UI-012 — Tasador certificado firma tasación con inspección ocular

## Actor principal
[[T-028]] Tasador colegiado (con matrícula vigente).

## Resumen
Un cliente solicita upgrade de tasación simple a certificada. El tasador realiza [[T-015]] (visita física al inmueble), corrobora datos, firma profesionalmente. El sistema genera PDF certificado con firma digital del colegiado + datos del Colegio + diferencial de cobro (precio significativamente mayor — CBR-013).

## Por qué NO está en MVP-6sem
- Requiere firma digital colegiada (integración Q06 pendiente).
- Requiere coordinar inspección ocular (logística externa).
- En MVP solo se prueba el flujo "simple", firmado por la plataforma (RC-014).

## Fase
Should (Fase 2). Vinculado a BR-005 + CBR-006 (responsabilidad profesional).

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

<!-- AUTOGEN:trazabilidad END -->
