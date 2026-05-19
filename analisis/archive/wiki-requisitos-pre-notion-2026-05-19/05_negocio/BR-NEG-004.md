---
id: BR-NEG-004
nivel: negocio
tipo: decision-modelo-monetizacion
estado: borrador
version: 2
ultima_modificacion: 2026-05-14
fuente: transcript:L207 (Cocucci) + CBR-003, CBR-004
stakeholders: [S-001, S-005, S-006, S-019]
trazabilidad:
  rc_origen: [RC-026, RC-027]
  usuario: [CU-UI-015]
  software: [BR-001]
moscow: foundational
fase: transversal (registro), aplicación efectiva Fase 2
changelog:
  v2: "Tipo aclarado a 'decision-modelo-monetizacion' tras recategorización Opción C (2026-05-14)."
---

# BR-NEG-004 — Modelo de comisión disruptivo 90/10

## Decisión

La [[T-021]] retiene **10%** del cobro de cada [[T-026]]; el [[T-028]] recibe **90%**.

## Justificación de negocio

El modelo tradicional argentino de tasación reparte ~50/50 entre el tasador individual y la inmobiliaria que lo emplea. Tasa Inmuebles disrupta este reparto desplazando el margen al tasador individual, lo cual:

- **Atrae tasadores matriculados** ([[T-028]]) al producto (incentivo financiero directo).
- **Reduce costo para el cliente final** ([[T-020]]) porque el overhead de la plataforma es bajo.
- **Genera resistencia previsible en S-019** (inmobiliarias del modelo 50/50): pierden el ~40% de margen sobre cada tasación que su tasador haga via la plataforma.

## Excepción: reparto cuando hay inmobiliaria intermedia

Cuando el tasador pertenece a una inmobiliaria, el 90% se subdivide entre tasador e inmobiliaria según acuerdo entre ellos (no entre Tasa Inmuebles y ninguno). **Pendiente DS-02**: definir si Tasa Inmuebles ofrece un plan B2B donde la inmobiliaria conserve algo del margen para mitigar el riesgo de boicot.

## Aplicación efectiva

- **MVP-6sem:** el modelo se documenta pero no se cobra (el módulo contable es Fase 2). Las tasaciones del MVP son a costo cero para los arquitectos (acuerdo Colegio).
- **Fase 2:** se implementa el cobro vía pasarela de pagos + factura electrónica.

## Stakeholders desfavorecidos

| ID | Stakeholder | Daño |
|----|-------------|------|
| S-019 | Inmobiliarias del modelo tradicional 50/50 | Pierden ~40% de margen sobre cada tasación |

Mitigación pendiente DS-02.

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

### Referencias salientes

#### Resuelto por (CU usuario)

- [CU-UI-015](../06_usuario/CU-UI-015.md) — Cliente B2B compra paquete de suscripción mensual

#### Implementado por (RF software)

- [BR-001](../07_software/BR/BR-001.md) — Cálculo de comisión 90/10

### Referencias entrantes

#### Reglas de Negocio (Software)

- [BR-001](../07_software/BR/BR-001.md) — Cálculo de comisión 90/10 *(via `negocio`)*

<!-- AUTOGEN:trazabilidad END -->
