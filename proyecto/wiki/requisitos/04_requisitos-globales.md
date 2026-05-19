---
artefacto: requisitos-globales
iniciativa: tasa-inmuebles
estado: 6_aprobados_1_diferido_fase2
version: 3
ultima_modificacion: 2026-05-14
skill_responsable: crear-requisitos-globales
total_rg_aprobados: 6
total_rg_diferidos: 1
---

# 04 — Requisitos Globales (RG)

> Invariantes transversales que aplican a **TODO RF** del producto (salvo override documentado). Son el **primer criterio de aceptación** que QA aplica antes de validar cualquier funcionalidad específica.

**Convención IDs:** `RG-NNN`. No se reusan.

## RG aprobados

| ID | Enunciado corto | Aprobado por | Fecha |
|----|------------------|---------------|-------|
| **RG-001** | Moneda explícita + tipo de cambio | Franco Bertoldi (CTO) | 2026-05-14 |
| **RG-002** | Precisión decimal 2 + half-up | Franco Bertoldi (CTO) | 2026-05-14 |
| **RG-003** | TLS 1.2+ en todo el transporte | Franco Bertoldi (CTO) | 2026-05-14 |
| **RG-004** | Audit trail (created/updated + acciones críticas) | Franco Bertoldi (CTO) | 2026-05-14 |
| **RG-005** | Validación de input en bordes | Franco Bertoldi (CTO) | 2026-05-14 |
| **RG-006** | Logs estructurados JSON | Franco Bertoldi (CTO) | 2026-05-14 |

## RG diferidos

| ID | Enunciado corto | Diferido a | Fecha decisión | Nota |
|----|------------------|------------|----------------|------|
| **RG-007** | i18n (textos user-facing como keys) | Fase 2 | 2026-05-14 | MVP: mantener strings consolidados en `messages.ts` para preparar i18n sin overhead. |

---

## RG-001 — Unidad de medida del valor monetario

```yaml
id: RG-001
estado: aprobado
aprobado_por: Franco Bertoldi (CTO)
fecha_aprobacion: 2026-05-14
ultima_modificacion: 2026-05-14
```

### Enunciado

> Todo valor monetario que el sistema retorne, persista o muestre **debe llevar explícitamente su moneda** (`ARS` o `USD`). Cuando aplica conversión, debe incluir el `tipo_cambio_referencia` usado.

### Justificación

En Argentina las tasaciones se publican y operan en **USD y ARS indistintamente**. Sin moneda explícita, los datos no son comparables, no son utilizables por Robotomus (Fase 2) ni por el módulo contable. Caso concreto: la transcripción menciona "tasación a 20.000" sin aclarar si es ARS o USD — esto NO debe ocurrir en el producto.

### AC implícito en todo RF que devuelva valor monetario

- Response (API o UI) incluye:
  - `valor: number` (≥ 0, formato consistente con RG-002).
  - `moneda: ARS | USD` (enum estricto).
  - `tipo_cambio_referencia: number | null` (solo presente si hubo conversión; formato `ARS_por_USD` por convención).
  - `fecha_tipo_cambio: ISO 8601 | null`.

### Test asociado

- [ ] Toda response con valor monetario tiene los 4 campos.
- [ ] Endpoint que devuelve solo ARS sin conversión retorna `tipo_cambio_referencia: null`.
- [ ] Endpoint que convierte de USD a ARS retorna ambos valores con su tipo de cambio.

### RFs afectados

RF-016 (Fitt-Servini), RF-019 (captura referencial), RF-012 (PDF profesional), RF-020 (PDF referencial), RF-015 (cerrar comité). Todo RF futuro de cobro/facturación (Fase 2).

---

## RG-002 — Precisión decimal y redondeo

```yaml
id: RG-002
estado: aprobado
aprobado_por: Franco Bertoldi (CTO)
fecha_aprobacion: 2026-05-14
ultima_modificacion: 2026-05-14
```

### Enunciado

> Los valores monetarios se almacenan y muestran con **exactamente 2 decimales**, redondeo **half-up** (5 redondea hacia arriba). Los cálculos intermedios pueden usar más precisión, pero el valor final persistido y mostrado es de 2 decimales.

### Justificación

Estándar contable argentino. Evita problemas de redondeo en facturación (Fase 2), en la comisión 90/10 (BR-001), y en la reconciliación. Sin precisión consistente, dos sistemas que reciben el mismo dato pueden discrepar en centavos.

### AC implícito en todo RF de cálculo monetario

- Almacenamiento: tipo `DECIMAL(15, 2)` o equivalente exacto (NO `float` / `double`).
- Cálculo: usar librería de decimal precision (Big.js, decimal.js, BigDecimal según stack).
- Redondeo: `HALF_UP` (no banker's rounding, no truncate).

### Test asociado

- [ ] `1.005 → 1.01` (no `1.00`).
- [ ] `1.004 → 1.00`.
- [ ] Comisión 90/10 sobre `100.05` da `10.01` (plataforma) y `90.05` (tasador) — suma exacta.

### RFs afectados

RF-016, RF-019, RF-015. Toda BR-001 futura de cobro.

---

## RG-003 — Seguridad de transporte (TLS)

```yaml
id: RG-003
estado: aprobado
aprobado_por: Franco Bertoldi (CTO)
fecha_aprobacion: 2026-05-14
ultima_modificacion: 2026-05-14
```

### Enunciado

> Toda comunicación cliente ↔ servidor y servidor ↔ servidor usa **TLS 1.2 o superior** (recomendado TLS 1.3 cuando esté disponible). Tráfico HTTP plano queda **prohibido** en producción.

### Justificación

Datos personales bajo Ley 25.326 (Argentina, AC-005 compliance). Datos del inmueble (geolocalización, fotos, valor) son **información sensible** del usuario. Sin TLS, cualquier ataque MITM compromete tasaciones completas + credenciales.

### AC implícito en todo RF

- API endpoints expuestos solo por HTTPS (HTTP redirect a HTTPS).
- Certificado válido (Let's Encrypt en MVP es aceptable).
- HSTS habilitado con `max-age ≥ 31536000` (1 año).
- Cifrado mínimo: ciphers modernos (sin SSL 3, sin TLS 1.0/1.1, sin RC4, sin 3DES).

### Test asociado

- [ ] Endpoint HTTP rechaza o redirige a HTTPS.
- [ ] Certificate Authority válida (no self-signed en prod).
- [ ] SSL Labs grade ≥ A en producción.

### RFs afectados

TODOS sin excepción.

---

## RG-004 — Audit trail (created/updated + acciones críticas)

```yaml
id: RG-004
estado: aprobado
aprobado_por: Franco Bertoldi (CTO)
fecha_aprobacion: 2026-05-14
ultima_modificacion: 2026-05-14
```

### Enunciado

> Toda entidad persistida en BD lleva **4 campos de auditoría**: `created_at`, `created_by`, `updated_at`, `updated_by`. Las **acciones críticas** generan además un registro inmutable en `audit_log`.

### Lista de acciones críticas (MVP)

- Crear / editar / cerrar [[T-026]] Tasación.
- Login exitoso / fallido de [[T-028]] Tasador o [[T-037]] Cliente B2C.
- Generación de PDF (RF-012, RF-020).
- Envío de mail (RF-014).
- Acciones de admin (CU-UI-006 pre-carga usuarios; en Fase 2 todo CU-UI-017).
- Acceso de soporte (S-024) a datos personales (Fase 2, ya en AC-005 item 6).

### AC implícito

- Esquema de BD: campos created_at, created_by, updated_at, updated_by en toda tabla.
- `audit_log` table: `(id, timestamp, user_id, action, resource_type, resource_id, payload_json)`.
- Inmutabilidad: `audit_log` solo permite INSERT (no UPDATE ni DELETE).

### Test asociado

- [ ] Toda tabla nueva tiene los 4 campos de auditoría.
- [ ] Cada acción crítica genera 1 fila en audit_log.
- [ ] Intento de UPDATE/DELETE sobre audit_log falla a nivel BD.

### RFs afectados

TODOS los que persisten datos. Cumple AC-005 item 6 (logs de acceso a PII).

---

## RG-005 — Validación de input en bordes

```yaml
id: RG-005
estado: aprobado
aprobado_por: Franco Bertoldi (CTO)
fecha_aprobacion: 2026-05-14
ultima_modificacion: 2026-05-14
```

### Enunciado

> Todo endpoint API valida sus inputs (tipo, formato, rango) **antes** de tocar lógica de dominio o BD. Inputs inválidos retornan **HTTP 400** con mensaje específico. **No se confía en validación del cliente** — la del servidor es autoritativa.

### Justificación

Defensa contra inyecciones (SQL, XSS, NoSQL), payloads maliciosos, casts incorrectos. **Crítico desde día 1 del MVP** — agregar después implica revisar todo el código. Refuerza AC-005 (compliance Ley 25.326).

### AC implícito en todo endpoint API

- Schema explícito de input (Zod / Pydantic / Joi / FluentValidation según stack).
- Validación previa a cualquier lógica de negocio.
- Response 400 con cuerpo JSON `{ error: "validation_failed", details: [...] }`.
- Sin información sensible filtrada en mensajes de error (no revelar estructura de BD).

### Test asociado

- [ ] Endpoint que espera `email` rechaza `"not-an-email"` con 400.
- [ ] Endpoint que espera `superficie_total_m2 > 0` rechaza `-5` con 400.
- [ ] Inyección SQL clásica (`' OR 1=1 --`) en cualquier campo es bloqueada por validación o parameterized queries.
- [ ] XSS reflejado (`<script>alert(1)</script>`) en text input es escapado al renderizar.

### RFs afectados

TODOS los endpoints API sin excepción.

---

## RG-006 — Logs estructurados (JSON)

```yaml
id: RG-006
estado: aprobado
aprobado_por: Franco Bertoldi (CTO)
fecha_aprobacion: 2026-05-14
ultima_modificacion: 2026-05-14
```

### Enunciado

> Todos los logs del backend se emiten en **formato JSON estructurado**, con campos mínimos: `timestamp` (ISO 8601 UTC), `level` (debug/info/warn/error), `message`, `trace_id` (correlación de request), `service` (nombre del componente), `user_id` (si autenticado, null si no). No se admiten logs en formato libre / texto plano.

### Justificación

Permite ingesta en sistemas de observabilidad (Datadog, Sentry, ELK, Cloudwatch Insights). Sin estructura, no se pueden calcular métricas (ej. AC-001 tiempo flujo, AC-012 cold start) ni encontrar errores rápido. **Crítico para validar AC-001, AC-012 y AC-013 durante la demo del Hito 1**.

### AC implícito en todo RF

- Logger configurado desde el bootstrap del servicio (pino / structlog / Serilog según stack).
- Toda excepción no manejada loguea con `level=error` + stack trace en `details`.
- Toda request HTTP loguea `request_started` y `request_completed` con `duration_ms`.
- Logs NUNCA incluyen PII en cleartext (passwords, tokens completos, datos del solicitante). Trazas se redactan según `pii_redactor` (Fase 2).

### Test asociado

- [ ] Logs en formato JSON parseables por `jq` u otro parser estándar.
- [ ] `trace_id` se propaga desde request inicial a todas las llamadas downstream.
- [ ] Logs no incluyen passwords ni full JWT (solo prefijo + hash si necesario).
- [ ] Endpoint exposed (`GET /health`) retorna estado de logging configurado.

### RFs afectados

TODOS — es transversal de infraestructura.

---

## RG-007 — i18n (DIFERIDO a Fase 2)

```yaml
id: RG-007
estado: diferido_fase_2
diferido_por: Franco Bertoldi (CTO)
fecha_decision: 2026-05-14
ultima_modificacion: 2026-05-14
```

### Enunciado (propuesta para Fase 2)

> Todo texto visible al usuario en la app (UI labels, mensajes de error, emails, PDFs) **se referencia por clave i18n**, no se hardcodea como string. Default locale: `es-AR`. Otros locales se agregan al expandirse a otros países.

### Razón del diferimiento

- MVP-6sem solo opera en `es-AR` con un acuerdo único con el Colegio de Arquitectos argentino.
- Bus-factor 1 + 6 semanas + alcance ya extendido por sumar autotasador + Fitt-Servini → agregar i18n inflaría costos.
- Expansión a otros países (Chile, Uruguay, México) recién está prevista para Fase 3 (S-015 otros colegios, latente).

### Alternativa MVP (mitigación parcial)

**Mantener todos los strings consolidados** en archivos de constantes (`messages.ts`, `texts.py`) en lugar de hardcoded inline en componentes. Esto prepara el camino para i18n real en Fase 2 con costo cero adicional en MVP.

### Cuándo reactivar

Cuando entre el primer país adicional al acuerdo (Fase 3 más probable). Se invocará `crear-requisitos-globales` para aprobar formalmente RG-007 en ese momento.

---

## Aplicación transversal

Los RG aprobados aplican a **todos los RF MVP sin excepción** salvo override documentado. Por convención, **ningún RF MVP tiene override** — la trazabilidad (`09_trazabilidad.md`) confirma 0 overrides al 2026-05-14.

## Próximo paso

Cerrar la propuesta de RG-005, RG-006, RG-007. Mis recomendaciones:
- **RG-005 aprobar** (validación input — protección básica).
- **RG-006 aprobar** (logs estructurados — costo casi cero, valor alto).
- **RG-007 diferir a Fase 2** (i18n — no necesario en MVP-6sem).
