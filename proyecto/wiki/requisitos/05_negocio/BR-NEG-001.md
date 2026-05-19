---
id: BR-NEG-001
nivel: negocio
tipo: vision
estado: borrador
version: 2
ultima_modificacion: 2026-05-14
fuente: 00_fundamentos.md (visión + métrica éxito)
stakeholders: [S-001, S-002, S-003, S-004, S-005, S-007, S-008, S-009]
trazabilidad:
  rc_origen: [RC-013, RC-014, RC-022]
  usuario: [CU-UI-001, CU-UI-002, CU-UI-003, CU-UI-004, CU-UI-005, CU-UI-014]
  software: []
moscow: foundational
fase: transversal
changelog:
  v2: "Tipo aclarado a 'vision' (no era 'objetivo-negocio' genérico). Cambio derivado de la recategorización del 2026-05-14 (Opción C)."
---

# BR-NEG-001 — Reducir tiempo y fricción de tasaciones inmobiliarias certificadas

## Problema / Objetivo de negocio

Las tasaciones inmobiliarias profesionales en Argentina son hoy un proceso **lento, caro y opaco**: el cliente llama a una inmobiliaria, espera días por la visita, recibe un informe en PDF sin trazabilidad, y la inmobiliaria retiene el 50% del cobro. No hay un canal estandarizado que conecte demanda con tasadores matriculados ni un mecanismo que aproveche datos históricos para acelerar el armado del informe.

## Visión

Construir una plataforma estilo "Uber de tasación" que conecte demanda con tasadores matriculados ([[T-028]]), genere informes apoyados por IA propia ([[T-023]]) entrenada con la base histórica más grande del país ([[T-013]]), y modifique el reparto financiero para favorecer al tasador profesional.

## Stakeholders impactados

| ID | Stakeholder | Beneficio |
|----|-------------|-----------|
| S-005 | Arquitectos matriculados | Nueva fuente de ingresos con comisión 90% |
| S-007 | Particulares | Tasaciones rápidas, baratas, certificables |
| S-008 | Inmobiliarias B2B | Dashboard agregado + estandarización |
| S-009 | Bancos | Servicio estandarizado de tasaciones para hipotecas |
| S-019 | Modelo tradicional 50/50 | **Pierde** margen — riesgo de resistencia (mitigación pendiente DS-02) |

## Métrica de éxito (3 años)

- Volumen: tasaciones/mes crece sostenidamente.
- Cobertura: red de tasadores matriculados activa en al menos 3 provincias argentinas.
- Adopción B2B: al menos 1 banco + 1 cadena inmobiliaria + 1 fuero del Poder Judicial usando el producto.

## Restricciones derivadas

- Acuerdo con [[T-004]] (BR-NEG-003) condiciona alcance y plazos del MVP.
- Compliance Ley 25.326 (S-014) condiciona manejo de datos personales y scraping.
- Comisión 90/10 (BR-NEG-004) condiciona modelo financiero.

---

<!-- AUTOGEN:trazabilidad START -->
## Trazabilidad detallada (auto-generada)

> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.

### Referencias salientes

#### Resuelto por (CU usuario)

- [CU-UI-001](../06_usuario/CU-UI-001.md) — Tasador crea una tasación nueva end-to-end
- [CU-UI-002](../06_usuario/CU-UI-002.md) — Tasador inicia sesión en la plataforma
- [CU-UI-003](../06_usuario/CU-UI-003.md) — Tasador consulta sus tasaciones ("Mis tasaciones", pantalla principal de la app mobile)
- [CU-UI-004](../06_usuario/CU-UI-004.md) — Comité de tasación cierra el valor final
- [CU-UI-005](../06_usuario/CU-UI-005.md) — Tasador comparte la tasación con el solicitante
- [CU-UI-014](../06_usuario/CU-UI-014.md) — Cliente B2C realiza una Tasación Referencial desde la app mobile

### Referencias entrantes

#### Casos de Uso (Usuario)

- [CU-UI-001](../06_usuario/CU-UI-001.md) — Tasador crea una tasación nueva end-to-end *(via `negocio`)*
- [CU-UI-002](../06_usuario/CU-UI-002.md) — Tasador inicia sesión en la plataforma *(via `negocio`)*
- [CU-UI-003](../06_usuario/CU-UI-003.md) — Tasador consulta sus tasaciones ("Mis tasaciones", pantalla principal de la app mobile) *(via `negocio`)*
- [CU-UI-004](../06_usuario/CU-UI-004.md) — Comité de tasación cierra el valor final *(via `negocio`)*
- [CU-UI-005](../06_usuario/CU-UI-005.md) — Tasador comparte la tasación con el solicitante *(via `negocio`)*
- [CU-UI-006](../06_usuario/CU-UI-006.md) — Admin pre-carga usuarios (arquitectos del Colegio) *(via `negocio`)*
- [CU-UI-014](../06_usuario/CU-UI-014.md) — Cliente B2C realiza una Tasación Referencial desde la app mobile *(via `negocio`)*
- [CU-UI-017](../06_usuario/CU-UI-017.md) — Back Office administrativo (web standalone, Fase 2) *(via `negocio`)*

#### Requisitos Funcionales

- [RF-001](../07_software/RF/RF-001.md) — Seleccionar tipo de inmueble *(via `negocio`)*
- [RF-002](../07_software/RF/RF-002.md) — Capturar motivo de tasación *(via `negocio`)*
- [RF-003](../07_software/RF/RF-003.md) — Geolocalizar inmueble *(via `negocio`)*
- [RF-016](../07_software/RF/RF-016.md) — Calcular valor técnico vía fórmula Fitt-Servini *(via `negocio`)*
- [RF-017](../07_software/RF/RF-017.md) — Pantalla de bienvenida con CTA bifurcado *(via `negocio`)*
- [RF-018](../07_software/RF/RF-018.md) — Autoregistro de Cliente B2C (email + password) *(via `negocio`)*
- [RF-019](../07_software/RF/RF-019.md) — Captura de Tasación Referencial (Cliente B2C) *(via `negocio`)*
- [RF-020](../07_software/RF/RF-020.md) — Generar PDF de Tasación Referencial *(via `negocio`)*

<!-- AUTOGEN:trazabilidad END -->
