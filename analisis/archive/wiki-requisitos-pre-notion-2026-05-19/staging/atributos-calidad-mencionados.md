---
artefacto: atributos-calidad-mencionados (input vivo)
fuente: ../../../analisis/reunion-01/transcript.txt
procesado: 2026-05-14
ultima_actualizacion: 2026-05-14
total_atributos: 12
indexados_en: ../07_software/NF/_INDEX.md
ac_archivos_creados: 0/12 (pendientes — los crea `crear-atributo-calidad`)
estado: VIVO — input para `crear-atributo-calidad`
---

# Atributos de calidad mencionados (NF) — **INPUT VIVO**

> ⏳ **Promoción parcial:** los 12 candidatos están indexados en [`../07_software/NF/_INDEX.md`](../07_software/NF/_INDEX.md) con IDs propuestos `AC-001..AC-012`, **pero ningún archivo `AC-NNN.md` se creó todavía**. La especificación formal con Planguage (escala / metro / mín / objetivo / máx / contexto) la genera `crear-atributo-calidad`.
>
> Este archivo sigue siendo **input vivo** hasta que `crear-atributo-calidad` materialice los 4 AC críticos MVP (AC-001 tiempo flujo, AC-003 usabilidad mobile, AC-005 compliance Ley 25.326, AC-012 performance carga).

| Candidato | Categoría | Cita / contexto | Línea | Estado del AC |
|-----------|-----------|-----------------|-------|---------------|
| CAC-001 | **Performance** | "no le va a preguntar a inmoclick, le va a preguntar a métricas y chao" — base intermedia para evitar tiempos prohibitivos contra Inmoclick | L163 | Pendiente Planguage. Métrica: tiempo de respuesta de Robotomus < ?? segundos. |
| CAC-002 | **Performance** | "el dato que te voy a dar es de calidad, y para nosotros el valor de ese inmueble es X porque he comparado y pim pum pam" — calidad de inferencia | L163 | Pendiente. Métrica: % confianza inferencia ≥ 90% (ver CBR-011). |
| CAC-003 | **Usabilidad** | "Mobile First" + "una vista donde se cargue la propiedad" — usabilidad en campo, dispositivo móvil | L127 | Pendiente. Contexto crítico: tasador en la calle, sin Wi-Fi confiable, con guantes/clima. |
| CAC-004 | **Usabilidad** | "los flacos, mientras más rápido hagan las cosas, olvídate" — eficiencia del tasador | L339 | Ambigüedad detectada ("rápido"). Ver `ambiguedades.md` A-002. |
| CAC-005 | **Seguridad** | "Ley argentina que es la Ley de Protección de Datos" — compliance Ley 25.326 | L365 | Pendiente. Categoría: privacidad + cumplimiento legal. Aplica a datos personales del particular y del tasador. |
| CAC-006 | **Compliance** | "homologarse sería genial" + caso Zillow Z-Value | L173-183 | Pendiente. Homologación profesional/regulatoria. Difícil de cuantificar pre-acuerdo. |
| CAC-007 | **Disponibilidad** | "robotomus... le va a preguntar a métricas y chao" — disponibilidad de la capa Métricas | L163 | Pendiente. Métrica: SLA % uptime de Métricas y de motor de IA. |
| CAC-008 | **Trazabilidad / Auditabilidad** | "Yo, supónete, me viene el juez, le digo: oye, flaco, yo me metí a Zona Pro" + "podría cotejar el valor de transacción con el valor de tasación y ver cuál fue el tasador que más le pega" | L363, L339 | Pendiente. Cubre origen de datos de Robotomus + auditoría de tasación por tasador. |
| CAC-009 | **Escalabilidad** | "tasador... no es lo mismo un tasador para una finca que un tasador para una casa, para un departamento. Son especialistas" + escenarios con 100s/1000s de tasadores | L171, L199 | Pendiente. Métrica: nro. tasadores soportados sin degradar match. |
| CAC-010 | **Mantenibilidad** | "los desarrollos no terminan nunca, siempre vas a tener que ir haciendo upgrade, upgrade" — implícito en estilo de trabajo | L37 | Pendiente. Vinculado a stack abierto (RC-006). |
| CAC-011 | **Interoperabilidad** | "Inmoclick" + "scraping" + "OpenAI" + "Google Maps" — múltiples integraciones | RC-018, marco | Pendiente. Catálogo de integraciones ya cerrado parcialmente en Q06. |
| CAC-012 | **Performance del flujo crítico (MVP)** | "que la aplicación mobile se pueda abrir y puedas ir a hacer un relevamiento del inmueble y puedas guardar los datos" — UX rápida en campo | L385 | Pendiente. Métrica: tiempo de carga inicial mobile < 3 s en 4G; guardado sin pérdida si offline. |

## Atributos detectados pero descartados pre-MVP

- **CAC-005 (compliance Ley 25.326)**: forzado a entrar al MVP-6sem por excepción del marco (`02_enfoque-IR.md` excepción 2 — upfront no negociable).
- **CAC-012 (performance flujo crítico)**: entra al MVP-6sem porque el flujo "nueva tasación" es el centro del entregable.

El resto (CAC-001-002 Robotomus, CAC-007 disponibilidad de Métricas, CAC-009 escalabilidad, CAC-011 integraciones) se especifica en Fase 2 con `crear-atributo-calidad`.

## Observaciones

- **Casi todos los AC requieren Planguage** porque las menciones en transcript usan **palabras prohibidas** (rápido, calidad, bonito, simple, etc.) — ver `ambiguedades.md`.
- **CAC-003 (mobile usabilidad)** es el AC con contexto de uso más rico documentable: "tasador en la calle". Esto importa más que un % de uptime en este producto.
- **Sin cuantificar, ningún AC existe** (§ 5 marco). Pre-MVP debemos cuantificar al menos CAC-003 (usabilidad mobile), CAC-005 (compliance), CAC-012 (performance flujo crítico).
