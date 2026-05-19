# Índice de Requisitos Funcionales (RF) — `07_software/RF/`

> Lista canónica de RF promovidos desde el staging. Cada RF tiene su `RF-NNN.md` con header YAML + flujo paso a paso. La promoción a CU se hace con `crear-caso-uso`; la traducción de RF a tests se hace con SDD downstream.

**Convención IDs:** `RF-NNN`. No se reusan.

## RF del MVP-6sem (Must)

| RF | Título | CU origen | Estado |
|----|--------|-----------|--------|
| **RF-001** | Seleccionar tipo de inmueble | CU-UI-001 | esqueleto |
| **RF-002** | Capturar motivo de tasación | CU-UI-001 | esqueleto |
| **RF-003** | Geolocalizar inmueble (HTML5 + Google Maps) | CU-UI-001 | esqueleto |
| **RF-004** | Capturar datos del solicitante | CU-UI-001 | esqueleto |
| **RF-005** | Capturar detalles del inmueble | CU-UI-001 | esqueleto |
| **RF-006** | Subir fotos del inmueble | CU-UI-001 | esqueleto |
| **RF-007** | Capturar descripción del inmueble | CU-UI-001 | esqueleto |
| **RF-008** | Validar y guardar tasación | CU-UI-001 | esqueleto |
| **RF-009** | Transicionar a "Por tasar" / enviar a comité | CU-UI-001 | esqueleto |
| **RF-010** | Login con email + password | CU-UI-002 | esqueleto |
| **RF-011** | Listar tasaciones del tasador | CU-UI-003 | esqueleto |
| **RF-012** | Generar PDF de tasación | CU-UI-005 | esqueleto |
| **RF-013** | Descargar PDF | CU-UI-005 | esqueleto |
| **RF-014** | Enviar PDF por mail al solicitante | CU-UI-005 | esqueleto |
| **RF-015** | Cerrar valor final en comité | CU-UI-004 | esqueleto |
| **RF-016** | Calcular valor técnico vía fórmula Fitt-Servini | CU-UI-001 (trigger), CU-UI-004 (consumo), CU-UI-014 (consumo) | esqueleto |
| **RF-017** | Pantalla de bienvenida con CTA bifurcado (Tasador / Cliente B2C) | CU-UI-002 + CU-UI-014 | esqueleto |
| **RF-018** | Autoregistro de Cliente B2C (email + password) | CU-UI-014 | esqueleto |
| **RF-019** | Captura de Tasación Referencial | CU-UI-014 | esqueleto |
| **RF-020** | Generar PDF de Tasación Referencial (con disclaimer obligatorio) | CU-UI-014 | esqueleto |

## RF de Fase 2+

Se generan a partir de CU-UI-007 a CU-UI-016 mediante `clasificar-requisitos` cuando los CU se desarrollen.

## Pendiente

Cada esqueleto debe completarse con: pasos detallados (paso a paso § 4 marco), inputs/outputs, validaciones, errores. La skill `crear-caso-uso` puede tomar un CU y desplegarlo en sus RF.
