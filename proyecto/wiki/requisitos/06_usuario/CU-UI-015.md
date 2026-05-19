---
id: CU-UI-015
nivel: usuario
tipo: caso-de-uso
estilo: esqueleto
estado: pendiente-fase3
version: 1
ultima_modificacion: 2026-05-14
moscow: could
fase: Fase 3
trazabilidad:
  rc_origen: [RC-028]
---

# CU-UI-015 — Cliente B2B compra paquete de suscripción mensual

## Actor principal
[[T-019]] Owner de una [[T-010]] Entidad (banco, Poder Judicial, cadena de inmobiliarias).

## Resumen
Owner contrata un paquete mensual de N tasaciones pre-pagadas (ej: 1000 tasaciones/mes a precio reducido). El sistema descuenta del saldo cada vez que se ejecuta una tasación. Saldo se renueva mensualmente o por compra adicional.

## Por qué NO está en MVP-6sem
- Modelo de suscripción B2B → Fase 3 explícita.
- Requiere facturación recurrente + módulo contable maduro (Fase 2).

## Fase
Could (Fase 3). Vinculado a CRF-010 + DP-012 (Poder Judicial).

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

### Referencias entrantes

#### Reglas de Negocio (Negocio)

- [BR-NEG-004](../05_negocio/BR-NEG-004.md) — Modelo de comisión disruptivo 90/10 *(via `usuario`)*

<!-- AUTOGEN:trazabilidad END -->
