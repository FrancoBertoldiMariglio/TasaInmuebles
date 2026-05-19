---
id: BR-NEG-003
nivel: negocio
tipo: restriccion-contractual
estado: aprobado
version: 2
ultima_modificacion: 2026-05-14
fuente: transcript:L191 (Cocucci) + CLAUDE.md §3
stakeholders: [S-001, S-012]
trazabilidad:
  rc_origen: [RC-001, RC-021]
  usuario: []
  software: []
moscow: foundational
fase: transversal
changelog:
  v2: "Tipo confirmado 'restriccion-contractual' tras recategorización Opción C (2026-05-14). Referencias a BR-NEG-002 actualizadas."
---

# BR-NEG-003 — Acuerdo de 6 meses con el Colegio de Arquitectos

## Restricción

El [[T-001]] firmado entre Cristian Cocucci ([[T-019]] Sponsor) y el [[T-004]] tiene **duración de 6 meses**.

## Fechas clave

- **Firma (estimada):** 2026-04-19. **A confirmar fecha exacta.**
- **Hito 1 — MVP demo:** ~2026-06-25 (6 semanas desde reunión-01).
- **Hito 2 — Cierre acuerdo:** ~2026-10-19 (6 meses desde firma). **A confirmar fecha exacta.**

## Cláusulas relevantes (según reunión-01)

- El Colegio facilita ~10 arquitectos matriculados como usuarios MVP.
- Al cierre del acuerdo, el Colegio puede emitir un informe validando la herramienta y a las empresas que la construyeron.
- El acuerdo "es bastante flexible" (Cocucci, transcript:L191) — admite renovación o extensión por consentimiento mutuo.

## Implicancias operativas

- El alcance del MVP-6sem está dimensionado contra Hito 1 (ver `00_fundamentos.md § Métrica de éxito del MVP`), no contra Hito 2.
- Entre Hito 1 y Hito 2 se ejecutan iteraciones que extienden el producto hacia Fase 2 (Robotomus real, certificación, módulo contable).
- Cualquier renegociación del acuerdo es responsabilidad de Cocucci como contacto único con el Colegio.

## Riesgo

Si el MVP-6sem no cumple el criterio 10/10 documentado en `00_fundamentos.md § Métrica de éxito del MVP`, arriesga la firma de Hito 2 y la continuidad del proyecto en su forma actual.

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

### Referencias entrantes

#### Reglas de Negocio (Software)

- [BR-009](../07_software/BR/BR-009.md) — Restricción: solo arquitectos del Colegio en MVP-6sem (rol Tasador) *(via `negocio`)*

<!-- AUTOGEN:trazabilidad END -->
