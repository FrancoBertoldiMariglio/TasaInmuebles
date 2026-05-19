---
artefacto: candidatos-rf (tombstone — todos los del MVP promovidos)
fuente: ../../../analisis/reunion-01/transcript.txt
procesado: 2026-05-14
ultima_actualizacion: 2026-05-14
total_candidatos: 21
rf_mvp_creados: 16 (RF-001..RF-016, incluye RF-016 Fitt-Servini agregado al MVP)
fase_2_pendientes: ~10 CU-UI esqueletos esperan desarrollo en Fase 2
estado: cerrado para MVP — abierto para Fase 2
promovido_a: ../07_software/RF/
---

# Candidatos a Requisitos Funcionales (RF) — **MAPA DE PROMOCIÓN**

> ✓ **Promoción del MVP completada el 2026-05-14.** Los 21 CRF se mapearon así:
> - **CRF Must** → `RF-001..RF-016` (15 RF esqueletos + 1 nuevo Fitt-Servini), todos creados en `../07_software/RF/`.
> - **CRF Should/Could** → esqueletos en `../06_usuario/CU-UI-007..CU-UI-016`, esperan desarrollo en Fase 2 con `crear-caso-uso` y luego promoción a sus RF correspondientes.
>
> Este archivo queda como tombstone + mapa de origen para auditoría histórica.

| Candidato | RC origen | Línea | RF tentativo | Nivel | Fase MVP |
|-----------|-----------|-------|--------------|-------|----------|
| CRF-001 | RC-011 | L127 | El sistema permite al tasador adjuntar fotos, descripción y geolocalización de un inmueble durante el relevamiento. | U | **MVP** |
| CRF-002 | RC-014 | L133 | El sistema persiste los datos de relevamiento incluso si el flujo no llega al comité. | U | **MVP** |
| CRF-003 | RC-015 | L163 | El sistema parsea una descripción libre del tasador y completa los campos estructurados de la ficha del inmueble. | S | Fase 2 |
| CRF-004 | RC-017 | L163 | El sistema calcula y muestra **dos índices** de valor por tasación: (a) valor de mercado (Robotomus, placeholder en MVP) y (b) valor técnico (Fitt-Servini, **calculado automáticamente en MVP** vía RF-016). | U | **MVP** |
| CRF-005 | RC-018 | L163 | El sistema obtiene valores comparables consultando portales inmobiliarios scrapados y la base intermedia "Métricas". | S | Fase 2 |
| CRF-006 | RC-019 | L171 | El sistema asigna automáticamente la solicitud de tasación a un tasador disponible cercano al inmueble, permitiendo al solicitante elegir manualmente. | U | Fase 2 |
| CRF-007 | RC-023 | L195 | Un usuario puede actuar simultáneamente como tasador y como cliente. | S | **MVP** |
| CRF-008 | RC-024 | L197 | El sistema modela una "Entidad B2B" que agrupa inmuebles, tasadores habilitados y owners. Un tasador puede pertenecer a varias entidades. | U | **MVP** (plano, sin jerarquía) |
| CRF-009 | RC-025 | L199 | El sistema soporta jerarquía de entidades en al menos 2 niveles (sucursal/red). | N | Fase 3 (Q01-A) |
| CRF-010 | RC-028 | L215 | El sistema soporta suscripciones B2B con paquetes mensuales de tasaciones pre-pagados. | U | Fase 2 |
| CRF-011 | RC-029 | L219 | Un particular puede solicitar una tasación desde la web pública y derivarse a un tasador o chatbot. | U | Fase 2-3 |
| CRF-012 | RC-030 | L223 | El sistema cobra al cliente mediante QR antes de entregar el informe. | U | Fase 2 |
| CRF-013 | RC-037 | L267 | El sistema muestra al owner un dashboard agregado con todas las tasaciones de sus tasadores. | U | **MVP** (versión simple) |
| CRF-014 | RC-038 | L271 | El sistema permite filtrar tasaciones por tasador, tipo de inmueble, cliente, fecha. | U | **MVP** (subset de filtros) |
| CRF-015 | RC-039,040 | L275,287 | El sistema calcula y muestra KPIs: tasaciones del mes, comparación mes anterior, tiempo promedio, zonas más tasadas. | U | Fase 2 |
| CRF-016 | RC-041 | L285 | El sistema permite al owner alternar entre múltiples entidades a las que pertenece desde la barra superior. | U | Fase 2 |
| CRF-017 | RC-044 | L319 | El sistema permite seleccionar tipo de inmueble al iniciar una tasación: casa, departamento, terreno, galpón, local, oficina. | U | **MVP** |
| CRF-018 | RC-045 | L323 | El sistema ofrece dos modos de carga de datos: formulario manual o descripción libre asistida por IA. | U | **MVP** (sin asistencia IA real; placeholder) |
| CRF-019 | RC-046 | L327 | El sistema permite seleccionar motivo de tasación de un catálogo cerrado de 10 opciones (venta, alquiler, asesoramiento, empresas, expropiación, división/fraccionamiento, sucesión, judicial, extrajudicial, hipoteca). | U | **MVP** (catálogo, validación funcional según motivo es Fase 2) |
| CRF-020 | RC-047 | L327 | El sistema permite geolocalizar el inmueble tocando un mapa y persiste latitud/longitud. | U | **MVP** |
| CRF-021 | RC-055 | L371 | El sistema implementa el **flujo completo de nueva tasación**: geolocalizar → datos básicos → asistente IA → fotos → guardar borrador → enviar a comité. | U | **MVP** (corazón, fully-dressed) |
| CRF-022 | RC-055 | L371 | El sistema implementa el **flujo de comité de tasación**: recepción → revisión → consultas Robotomus + Colegio → discusión → valor final → resolución → PDF → compartir. | U | **MVP** (manual sin Robotomus IA real) |
| CRF-023 | RC-050 | L331 | El sistema modela los estados de una tasación: Borrador → Inspección hecha → Por tasar/Comité → Tasada → Compartida. | S | **MVP** |

## Observaciones

- **CRF del MVP (Must):** 11 candidatos (CRF-001, 002, 004, 007, 008, 013, 014, 017, 018, 019, 020, 021, 022, 023).
- **CRF-021 (flujo nueva tasación)** es el único que va a CU fully-dressed según el enfoque IR. El resto va al nivel "valor".
- **CRF-018 (asistente IA)** entra al MVP solo como placeholder UI; la IA real es Fase 2.
- **CRF-022 (comité)** entra al MVP en versión manual sin Robotomus; el indicador 4-niveles (RC-051) y la confianza (RC-052) son Fase 2.
