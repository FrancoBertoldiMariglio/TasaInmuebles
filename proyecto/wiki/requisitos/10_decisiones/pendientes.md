---
artefacto: decisiones-pendientes (vista consolidada)
iniciativa: tasa-inmuebles
estado: vivo
version: 1
ultima_modificacion: 2026-05-14
skill_responsable: clasificar-requisitos (promoción DP) + curaduría manual
---

# 10 — Decisiones pendientes del proyecto

> **Single pane of glass** de todo lo que el proyecto tiene abierto y necesita decisión. Consolida 4 series de IDs distintas pero con propósito común:

| Serie | Significa | Origen | Vive en |
|---|---|---|---|
| **DP-NNN** | Decisión Pendiente surgida durante elicitación | `staging/decisiones-pendientes.md` (procesar-transcripcion) | Acá (canónico) |
| **DS-NN** | Decisión derivada de Stakeholders | `01_stakeholders/matriz-poder-interes.md` | Allá (canónico), referenciada acá |
| **DF-NN** | Decisión derivada de Fundamentos | `00_fundamentos.md` | Allá (canónico), referenciada acá |
| **Q-NN** | Pregunta estructural del alcance funcional | `proyecto/wiki/00_preguntas_pendientes.md` | Allá (formato rico para socios), referenciada acá |

> **Cómo leer:**
> - Las **DP** son decisiones operativas que surgen de reuniones específicas. Listadas en detalle acá.
> - Las **DS, DF, Q** son decisiones estructurales / arquitectónicas / de visión. Tienen su archivo propio con contexto + opciones + recomendación. Acá solo hay un índice con título + estado + flag bloqueante.

---

## DP — Decisiones Pendientes del transcript de reunión-01

> Promovidas desde `staging/decisiones-pendientes.md` el 2026-05-14. IDs canónicos `DP-NNN`. Cierre de cada DP requiere: decisión + fecha + quién cerró + impacto en artefactos afectados.

### Estado

| Estado | Cantidad |
|---|---|
| `[PENDIENTE]` | 14 |
| `[EN DEBATE]` | 0 |
| `[RESPONDIDA]` | 0 |
| Bloqueantes MVP-6sem | 1 (DP-006) |

### Tabla

| ID | Tema | Origen | Bloquea MVP | Quién decide |
|----|------|--------|------|--------------|
| **DP-001** | Identidad real de los consultores externos (S-004 = `consultor1`, `consultor2`) — NO son developers, son asesores del ecosistema Cocucci | transcript:L53 (Speaker D) | No | Franco / Cocucci |
| **DP-002** | Reparto del 90% cuando el tasador pertenece a una inmobiliaria intermedia (DS-02 vinculado) | transcript:L209-213 (Sebastián) | No (Fase 2) | Cocucci + Sebastián |
| **DP-003** | Modelo de monetización completo: suscripción B2B, paquetes mensuales, tarifa variable por superficie/distancia (Q04 vinculado) | transcript:L215 (Cocucci) | No (Fase 2) | Sebastián (PO) |
| **DP-004** | Pasarela de pagos concreta + flujo de cobranza completo (Q06 parcial) | transcript:L217 (Sebastián) | No (Fase 2) | Franco (técnica) + Sebastián (modelo) |
| **DP-005** | Homologación de inferencia automática (modelo Z-Value de Zillow) | transcript:L175, L187 (Cocucci, Speaker D) | No (largo plazo) | Cocucci con Colegio |
| **DP-006** | **Lista exacta de los ~10 arquitectos del Colegio que usarán el MVP** | transcript:L385 (Cocucci) | **Sí — BLOQUEANTE MVP** | Cocucci con Colegio |
| **DP-007** | Stack final (frontend, backend, BD, infra) — CLAUDE.md §5 | transcript:L193-195 (Franco/Cocucci) | Sí | Franco (CTO) |
| **DP-008** | Cómo se reconstruye T-016 Métricas a partir de T-013 Inmoclick | transcript:L163 (Cocucci) | No (Fase 2) | Cocucci + Franco |
| **DP-009** | Métricas configurables por cliente en dashboards | transcript:L291 (Cocucci) | No (Fase 2) | Sebastián (PO) |
| **DP-010** | UX del comité: vista colaborativa, videoconferencia, votación individual (Q02 vinculado) | transcript:L369 (Cocucci) | Sí (versión manual MVP) | Sebastián + Franco |
| **DP-011** | Registro de valor de transacción real para medir precisión del tasador (Q08 vinculado) | transcript:L339 (Cocucci) | No (Fase 2-3) | Sebastián (PO) |
| **DP-012** | Acuerdo con Poder Judicial (caso bolsa mensual de tasaciones) | transcript:L207 (Cocucci) | No (largo plazo) | Cocucci |
| **DP-013** | Legalidad del scraping de portales (Ley 25.326 — DS-03 vinculado) | transcript:L361-365 (Franco, Cocucci) — contradicción C-004 | No (Fase 2 Robotomus) | Cocucci + asesor legal externo |
| **DP-014** | Refuerzo externo si bus-factor de Franco se vuelve crítico | snowman.md (mitigación) | No (preventivo) | Cocucci (sponsor) |

---

## DS — Decisiones derivadas de Stakeholders (índice)

> Detalles en [`../01_stakeholders/matriz-poder-interes.md`](../01_stakeholders/matriz-poder-interes.md) sección "Decisiones derivadas y pendientes".

| ID | Tema | Bloquea MVP |
|----|------|--------|
| **DS-01** | Identidad real consultores externos (S-004) — duplicado con DP-001 | No |
| **DS-02** | Modelo B2B para inmobiliarias (mitigación de S-019 desfavorecidos del 50/50) | No (Fase 2) |
| **DS-03** | Estrategia legal scraping (S-020) + uso de datos Inmoclick (S-022) — duplicado parcial con DP-013 | No (Fase 2) |
| **DS-04** | Compliance Ley 25.326 (S-014) — política de privacidad y consentimiento | Sí MVP-6sem |
| **DS-05** | Confirmar jurisdicción del Colegio (S-012) — Mendoza? Nacional? | No (operativo) |
| **DS-06** | Relevar competencia local (otras plataformas AR de tasación) | No |
| **DS-07** | **Elegir proveedor SMTP para mail pre-diseñado** (RF-014) — Resend / Postmark / Mailgun / SES | **Sí — BLOQUEANTE MVP** |
| **DS-08** | **Tabla parametrizada de valor/m² por tipo × categoría × zona** (RF-016 Fitt-Servini lite) | **Sí — BLOQUEANTE MVP** |

---

## DF — Decisiones derivadas de Fundamentos (índice)

> Detalles en [`../00_fundamentos.md`](../00_fundamentos.md) sección "Decisiones pendientes derivadas".

| ID | Tema | Bloquea MVP |
|----|------|--------|
| **DF-01** | Identidad real consultores externos — duplicado con DP-001 / DS-01 | No |
| **DF-02** | Fecha exacta de firma del acuerdo Colegio (para fijar Hito 2 con precisión) | No |
| **DF-03** | Rol BA: ¿Franco + Sebastián compartido o uno solo? | No (operativo) |

---

## Q — Preguntas estructurales del alcance (índice)

> Detalles en [`../../00_preguntas_pendientes.md`](../../00_preguntas_pendientes.md) (vive en la raíz de la wiki para facilitar consulta por los socios).

| ID | Tema | Estado | Bloquea alcance |
|----|------|--------|--------|
| **Q01** | Granularidad del modelo de Entidades B2B | `[PENDIENTE]` | Sí |
| **Q02** | Estados del workflow de tasación | `[PENDIENTE]` | Sí |
| **Q03** | Catálogo de tipos / motivos de tasación | `[RESPONDIDA]` | — |
| **Q04** | Modelo de monetización | `[PENDIENTE]` | Sí (Fase 2) |
| **Q05** | Onboarding, verificación y ranking de tasadores | `[PENDIENTE]` | Sí (Fase 2) |
| **Q06** | Integraciones externas: confirmación de catálogo y fase | `[RESPUESTA PARCIAL]` | Sí (lista) |
| **Q07** | Notificaciones, mensajería y chatbot | `[RESPONDIDA]` | — |
| **Q08** | Trazabilidad de valor de transacción real | `[PENDIENTE]` | No |
| **Q09** | Documentos generados por la plataforma | `[RESPUESTA PARCIAL]` | Sí (lista) |
| **Q10** | No-goals explícitos del producto | `[PENDIENTE]` | Sí |
| **Q11** | Nomenclatura UI: "Solicitante" vs "Referente" | `[PENDIENTE]` | No (es UI) |
| **Q12** | Lista canónica de amenities | `[PENDIENTE]` | No (extensible) |
| **Q13** | Nav app mobile cuando user es Owner + Tasador | `[PENDIENTE]` | No (Fase 2) |

---

## Vista consolidada: bloqueantes MVP-6sem

> Lo único que **debe estar cerrado antes del Hito 1 (2026-06-25)**:

| ID | Tema | Quién cierra |
|----|------|--------------|
| **DP-006** | Lista de los 10 arquitectos del Colegio que usarán el MVP | Cocucci (con Colegio) |
| **DS-04** | Política de privacidad + consentimiento Ley 25.326 desde día 1 | Franco (CTO con redacción legal liviana) |
| **DS-07** | Proveedor SMTP para enviar PDF al solicitante (RF-014) | Franco (CTO) |
| **DS-08** | Tabla valor/m² por tipo × categoría × zona (RF-016 Fitt-Servini) | Cocucci + arquitecto del Colegio |

**Q bloqueantes del alcance funcional** (no del MVP-6sem, pero sí para redactar `01_alcance_funcional.md`):

| ID | Tema | Quién cierra |
|----|------|--------------|
| **Q01** | Granularidad modelo Entidades B2B | Sebastián (PO) |
| **Q02** | Estados del workflow | Sebastián + Franco |
| **Q04** | Modelo de monetización | Sebastián (PO) |
| **Q05** | Onboarding + ranking tasadores | Sebastián (PO) |
| **Q10** | No-goals explícitos | Sebastián (PO) con Cocucci |

---

## Duplicados detectados

Algunos temas aparecen en múltiples series. Mantenemos los IDs separados para preservar trazabilidad histórica, pero los **resolvemos juntos**:

| Tema | IDs vinculados | Resolver una vez = cierra todas |
|------|----------------|--------------------------------|
| Identidad consultores externos | DP-001 / DS-01 / DF-01 | Cocucci en próxima reunión |
| Legalidad scraping | DP-013 / DS-03 | Cocucci + asesor legal |
| Modelo B2B con inmobiliaria | DP-002 / DS-02 / Q04 (parcial) | Sebastián (PO) en próxima sesión |

---

## Cómo cerrar una decisión

1. Editar la fila acá con `[YYYY-MM-DD] [Quién cerró] — texto de la decisión`.
2. Si la decisión genera nuevos artefactos (RF, BR, CU), agregarlos según corresponda.
3. Si la decisión **cierra** una pregunta Q, marcar la Q como `[RESPONDIDA]` en `00_preguntas_pendientes.md`.
4. Marcar la decisión como `[RESPONDIDA]` acá.

## Próximas decisiones críticas

**Antes de la sesión 02 (2026-05-28):**
- DP-006 (Cocucci) — sin esto no se puede crear cuentas pre-cargadas
- DS-08 (Cocucci + arquitecto) — sin esto Fitt-Servini da números irreales

**Antes de empezar a codear (cualquier momento esta semana):**
- DS-07 (Franco) — proveedor SMTP
- DP-007 (Franco) — stack final

**Para próxima reunión completa:**
- Q01, Q02, Q04, Q05, Q10 — preguntas estructurales del alcance
