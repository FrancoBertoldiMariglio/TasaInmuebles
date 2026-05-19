---
id: CU-UI-011
nivel: usuario
tipo: caso-de-uso
estilo: esqueleto
estado: pendiente-fase2
version: 1
ultima_modificacion: 2026-05-14
moscow: should
fase: Fase 2
trazabilidad:
  rc_origen: [RC-026, RC-030, RC-031]
---

# CU-UI-011 — Sistema cobra tasación vía pasarela de pagos

## Actor principal
[[T-021]] Plataforma + [[T-020]] Particular o [[T-010]] Entidad.

## Resumen
Antes de entregar el PDF, el sistema cobra al solicitante: muestra QR de pago vía Mercado Pago / Stripe / dLocal (a decidir). Una vez confirmado el pago, libera el PDF. Calcula automáticamente la [[T-005]] de 10% para Tasa Inmuebles y 90% para el tasador. Si hay inmobiliaria intermedia, aplica reparto de DS-02.

## Por qué NO está en MVP-6sem
- MVP usa tasaciones gratuitas para los 10 arquitectos del Colegio (acuerdo).
- Módulo contable + facturación electrónica + factura AFIP → Fase 2 explícitamente.

## Fase
Should (Fase 2). Vinculado a BR-NEG-004 + AFIP (S-013).

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

<!-- AUTOGEN:trazabilidad END -->
