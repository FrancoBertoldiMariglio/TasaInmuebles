---
artefacto: snowman
iniciativa: tasa-inmuebles
estado: borrador
version: 2
ultima_modificacion: 2026-05-14
skill_responsable: armar-snowman
fuentes:
  - ../matriz-poder-interes.md
  - ../00_fundamentos.md
roles_asignados: 6/6
overlaps_detectados: 3
huecos: 0
celula_dev:
  size: 1
  developer_unico: Franco Bertoldi
consultores_externos:
  - consultor1 (asesor / integración con ecosistema Cocucci)
  - consultor2 (asesor / integración con ecosistema Cocucci)
---

# Snowman DSDM — Tasa Inmuebles

> Pirámide de 6 roles DSDM con su owner asignado y trazabilidad a los stakeholders identificados en [matriz-poder-interes.md](matriz-poder-interes.md).

```
                            ┌──────────────────┐
                            │   GOBERNANZA     │
                            │   (cabeza)       │
                            │                  │
                            │   Sponsor        │
                            │   Visionario     │
                            │   Product Owner  │
                            └──────────────────┘
                                     │
                            ┌────────┴─────────┐
                            │   EJECUCIÓN      │
                            │   (panza)        │
                            │                  │
                            │   Business       │
                            │   Analyst        │
                            │                  │
                            │   Coordinador    │
                            │   técnico        │
                            │                  │
                            │   Células de     │
                            │   equipo         │
                            └──────────────────┘
```

---

## Cabeza del muñeco — Gobernanza

### Sponsor

- **Owner:** Cristian Cocucci — `S-001`
- **Compromiso:**
  - Financia el desarrollo en fase pre-revenue.
  - Firmó y banca políticamente el acuerdo con el Colegio de Arquitectos.
  - Aporta el activo estratégico Inmoclick (~20 años de datos) y su red profesional.
- **Autoridad de escalación:** alcance, modelo de negocio, decisiones que tocan al Colegio de Arquitectos.

### Visionario

- **Owner:** Cristian Cocucci — `S-001` *(overlap con Sponsor — ver advertencias)*
- **Visión en una oración:**
  > "Transformar la tasación inmobiliaria argentina en un servicio digital, geolocalizado, certificado y data-driven, donde un tasador matriculado pueda cobrar 90% mientras la plataforma se queda con 10%, apoyado por IA propia entrenada con la base histórica más grande del país."
- **Horizonte:** 3 fases, deadline simbólico Colegio en octubre 2026, expansión nacional Fase 3.

### Product Owner

- **Owner:** Sebastián Ríos — `S-002`
- **Autoridad de decisión:**
  - Prioriza el backlog del MVP (qué entra a las 6 semanas, qué queda fuera).
  - Define casos de uso (CU-UI) y los valida con Cocucci.
  - Es el **nexo** formal entre el equipo de negocio (Cocucci) y el equipo técnico (Franco).
  - Aprueba los artefactos en estado `validado → aprobado` para cosas funcionales.

---

## Panza del muñeco — Ejecución

### Business Analyst (experto de negocio)

**Rol compartido con división explícita** (decisión DF-03 en `00_fundamentos.md`):

| Sub-rol | Owner | Foco |
|---------|-------|------|
| **BA funcional** | Sebastián Ríos — `S-002` | Casos de uso (CU-UI), reglas de negocio (BR), flujos de usuario, validación con stakeholders no técnicos. |
| **BA técnico** | Franco Bertoldi — `S-003` | Requisitos funcionales (RF), atributos de calidad (AC), trazabilidad, glosario, requisitos globales (RG). |

**Conocimiento de dominio cotidiano:** lo aporta Cocucci como visionario, pero el BA es quien lo traduce a artefactos.

### Coordinador técnico

- **Owner:** Franco Bertoldi — `S-003`
- **Equipos a cargo:** 1 célula de desarrollo (3 personas incluyéndose).
- **Decisiones que cierra:**
  - Stack (frontend, backend, BD, infra).
  - Arquitectura del MVP y de Fases 2/3.
  - Métodos de trabajo internos del equipo dev.
  - Code review, deploy, CI/CD.

### Células de equipo

- **Célula 1 — Desarrollo MVP** (1 persona)
  - **Franco Bertoldi (`S-003`)** — CTO + coord. técnico + **único desarrollador**. Construye end-to-end: arquitectura, frontend mobile, backend, infra, ML (a partir de Fase 2).
- **Foco actual:** todo el MVP-6sem (Hito 1) lo construye Franco solo.
- **Capacity asumida:** dedicación significativa pero no exclusiva (Franco mantiene otras responsabilidades). A confirmar horas/semana.

### Consultores externos (no son célula de desarrollo)

Dos consultores del ecosistema profesional de Cocucci colaboran en modo **asesor / integrador**, NO desarrollan código:

- **`consultor1`** — opina sobre producto y aporta conocimiento del negocio inmobiliario; ayuda con la integración entre Tasa Inmuebles y los sistemas actuales del ecosistema Cocucci (Inmoclick, prácticas de la inmobiliaria, etc.). Identidad real a confirmar. Trazable a `S-004`.
- **`consultor2`** — mismo rol funcional que consultor1; identidad real a confirmar. Trazable a `S-004`.

**Implicancias importantes:**
- El **bus-factor del desarrollo es 1** (solo Franco). Riesgo crítico ante enfermedad / imprevistos. Mitigación posible: documentación viva del estado del MVP en cada commit.
- Los consultores son un **canal de validación de negocio** y de **integración**, no un canal de aumento de capacity. No se les puede delegar implementación.
- Esto refuerza la decisión de MoSCoW agresivo (`02_enfoque-IR.md`) y la regla "fully-dressed solo para el flujo crítico".

---

## Trazabilidad rol → stakeholder

| Rol DSDM | Owner | Stakeholder ID |
|----------|-------|----------------|
| Sponsor | Cristian Cocucci | `S-001` |
| Visionario | Cristian Cocucci | `S-001` |
| Product Owner | Sebastián Ríos | `S-002` |
| BA funcional | Sebastián Ríos | `S-002` |
| BA técnico | Franco Bertoldi | `S-003` |
| Coordinador técnico | Franco Bertoldi | `S-003` |
| Célula 1 — único developer | Franco Bertoldi | `S-003` |
| Consultor externo 1 (asesor / integrador, NO dev) | `consultor1` (placeholder) | `S-004` |
| Consultor externo 2 (asesor / integrador, NO dev) | `consultor2` (placeholder) | `S-004` |

---

## Advertencias detectadas

### Overlaps (warning — esperable en sociedad de 3)

| Persona | Roles | Riesgo | Mitigación |
|---------|-------|--------|------------|
| Cristian Cocucci | Sponsor + Visionario | Decisiones de visión y de financiamiento las toma la misma persona — sin contrapeso interno. | Sebastián y Franco actúan como contrapeso en sesiones bisemanales. Cocucci comprometió "modo supervisor / aportador de know-how" en reunión-01, no decisor unilateral. |
| Sebastián Ríos | Product Owner + BA funcional | El que define qué hacer es el mismo que escribe los casos de uso. | Validación cruzada con Franco (BA técnico) y con Cocucci (visionario) antes de aprobar CU. |
| Franco Bertoldi | Coord. técnico + BA técnico + único developer | El que define los RF es el mismo que coordina y los implementa. Cero contrapeso interno. | Esperable porque el CTO es quien mejor entiende el sistema. Mitigación: validación de RF con Sebastián (BA funcional) + revisión opcional de los consultores externos antes de cerrar. |

### Huecos

Ninguno. Los 6 roles tienen owner asignado.

### Identidades pendientes (no bloqueantes para el MVP-6sem)

- `consultor1` y `consultor2`: nombre real, vínculo concreto con el ecosistema Cocucci, alcance del asesoramiento. **Cerrar en próxima reunión.**
- Speaker D del transcript reunion-01: probablemente corresponde a uno de los consultores (no a un developer del equipo). Confirmar.

### Riesgo de bus-factor 1

Como Franco es el único desarrollador, **cualquier ausencia inesperada bloquea el MVP**. Mitigaciones aplicables:
- Commits frecuentes con mensajes descriptivos.
- README operativo en el repo (cómo correr local, cómo desplegar, cuáles son los puntos críticos).
- Documentación viva en `proyecto/wiki/` (este árbol IR cumple parcialmente esa función).
- Si la situación se vuelve crítica, decisión de Cocucci como sponsor de contratar refuerzo externo (queda como `DP-014`, no bloqueante hoy).

---

## Cobertura del snowman vs stakeholders externos

El snowman cubre solo a stakeholders **internos al equipo de delivery**. Los stakeholders externos (Colegio de Arquitectos, arquitectos usuarios, bancos, AFIP, AAIP, etc.) se gestionan vía:

- **Colegio de Arquitectos (S-012)** — Cocucci es el contacto único (canal formal del acuerdo).
- **Arquitectos usuarios MVP (S-005)** — Sebastián como PO los entrevista durante las sesiones bisemanales.
- **AAIP / AFIP / reguladores (S-013, S-014)** — Franco coordina compliance técnico (privacidad, datos, facturación electrónica).
- **Resto** — monitoreo pasivo (ver estrategia Mendelow en la matriz).

---

## Próximo paso

`dimensionar-iniciativa` — formaliza Cynefin + triple restricción en `02_enfoque-IR.md`. Como esa información ya quedó en `00_fundamentos.md`, este paso es mayormente extracción + formato canónico.

Alternativa: saltar a `ir-procesar-clase` sobre el transcript de reunión-01, para empezar a poblar `staging/` con material crudo.
