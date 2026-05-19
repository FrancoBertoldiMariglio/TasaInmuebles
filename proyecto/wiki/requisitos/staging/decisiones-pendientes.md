---
artefacto: staging-decisiones-pendientes
fuente: ../../../analisis/reunion-01/transcript.txt
procesado: 2026-05-14
total_decisiones: 14
estado_promocion: completo (2026-05-14)
promovido_a: ../10_decisiones/pendientes.md
---

# Decisiones pendientes detectadas en transcript — **PROMOVIDAS**

> ✓ **Promoción completada el 2026-05-14.** Las 12 entradas originales detectadas por `procesar-transcripcion` (DP-S1..DP-S12) + 2 sumadas durante análisis posterior (DP-S13 scraping legal, DP-S14 bus-factor) migraron a [`../10_decisiones/pendientes.md`](../10_decisiones/pendientes.md) con IDs canónicos `DP-001..DP-014`.
>
> Esta tabla queda como **tombstone histórico** (registro de origen). Cualquier actualización futura va al doc canónico.

## Mapping de IDs

| ID staging (antes) | ID canónico (ahora) | Tema corto |
|---|---|---|
| DP-S1 | **DP-001** | Identidad consultores externos |
| DP-S2 | **DP-002** | Reparto 90% con inmobiliaria intermedia |
| DP-S3 | **DP-003** | Modelo de monetización completo |
| DP-S4 | **DP-004** | Pasarela de pagos + flujo de cobranza |
| DP-S5 | **DP-005** | Homologación Z-Value |
| DP-S6 | **DP-006** | Lista exacta de 10 arquitectos del Colegio (**bloqueante MVP**) |
| DP-S7 | **DP-007** | Stack final |
| DP-S8 | **DP-008** | Reconstrucción Métricas desde Inmoclick |
| DP-S9 | **DP-009** | Métricas configurables |
| DP-S10 | **DP-010** | UX del comité (videoconferencia, votación) |
| DP-S11 | **DP-011** | Registro de valor de transacción real |
| DP-S12 | **DP-012** | Acuerdo Poder Judicial |
| DP-S13 (de contradicciones.md) | **DP-013** | Legalidad del scraping |
| DP-S14 (de snowman.md) | **DP-014** | Refuerzo externo si bus-factor crítico |

## Tabla original (preservada para auditoría)

| ID | Tema | Cita gatilladora | Línea | Speaker | Quién debería decidir | Bloqueante |
|----|------|------------------|-------|---------|------------------------|------------|
| DP-S1 | Identidad real de los consultores externos (consultor1, consultor2) — Speaker D del transcript probablemente sea uno de ellos | "trabajamos con una arquitectura, no sé, el Franco decide todo" | L53 | D | Franco / Cocucci | No (no son developers — son asesores; el desarrollo lo hace Franco solo) |
| DP-S2 | Reparto del 90% cuando hay inmobiliaria intermedia | "si vos tenés una inmobiliaria, la inmobiliaria va a haber una repartija... el tema para definir ahí, a mí me parece lo más complejo" | L209-213 | A | Cocucci + Sebastián | Sí para Fase 2 (no para MVP-6sem) |
| DP-S3 | Modelo de monetización completo (suscripción, paquetes, tarifa variable) | "vos, Seba, dijiste que había variantes, había posibilidades, pero también son otros casos de uso" | L215 | B | Sebastián como PO | Sí para Fase 2 |
| DP-S4 | Pasarela de pagos concreta + flujo de cobranza | "Lo único para mí que tenemos que terminar de definir es todo el tema de cobranza. Está muy lindo que repartir para un lado, para otro, sino cómo cobra el tipo" | L217 | A | Franco (técnica) + Sebastián (modelo) | Sí para Fase 2 |
| DP-S5 | Homologación de la inferencia automática (tipo Z-Value) | "Si pudiera homologarse sería genial" / "Avanzamos por ahí también" | L175, L187 | B,D | Cocucci con Colegio | No para MVP. Largo plazo. |
| DP-S6 | Cuántos arquitectos del Colegio van a usar el MVP | "le podemos crear el usuario nosotros a los 10 arquitectos que vayan a participar" | L385 | B | Cocucci con Colegio | **Bloqueante MVP**: confirmar lista exacta antes del Hito 1. |
| DP-S7 | Stack final (frontend, backend, DB) | "tiene alguna preferencia de framework, lenguaje de programación? — Nada, libre uso" | L193-195 | C,B | Franco como CTO | Sí. Está abierto en CLAUDE.md §5. |
| DP-S8 | Cómo se reconstruye Métricas a partir de Inmoclick | "lo vamos a tener que hacer porque no sé si lo voy a recuperar todo eso, pero es en métricas generamos casilleros con datos" | L163 | B | Cocucci + Franco (técnica) | No para MVP (Robotomus es placeholder). |
| DP-S9 | Métricas configurables por cliente | "podríamos hacerlas variables en toda la posibilidad de que, qué sé yo, si me decís Cristian, le puedo abrir el juego para que ellos se armen sus propias métricas. Pero en principio la gente..." | L291 | B | Sebastián como PO | No para MVP (KPIs fijos). |
| DP-S10 | UX del comité (vista colaborativa, videoconferencia, votos individuales) | "Acá poníamos participantes, quienes habíamos participado, y ponía, lo habíamos hecho medio manual" | L369 | B | Sebastián (PO) + Franco (UX) | Sí para MVP versión simple. |
| DP-S11 | Registro de valor de transacción real (para medir precisión del tasador) | "yo lo tenía previsto inclusive de irlo dejando registrado, porque... después se hace la venta. Si nosotros registramos el valor de transacción... yo puedo cotejar el valor de transacción con el valor de tasación" | L339 | B | Sebastián (PO) | No (Fase 2-3). Vinculado a Q08. |
| DP-S12 | Acuerdo con Poder Judicial (caso de uso paquete mensual) | "Estoy pensando en voz alta, ¿no? Y tenés una bolsa de 1000 tasaciones, por ejemplo, todos los meses X cantidad" | L207 | B | Cocucci | No para MVP. Largo plazo. |

## Decisiones que cierran preguntas del enfoque anterior (00_preguntas_pendientes.md)

| DP-S# | Cierra / vincula | Pregunta original |
|-------|------------------|---------------------|
| DP-S2 | DS-02 + Q01 | Modelo Entidades B2B + reparto con inmobiliaria |
| DP-S3 | Q04 | Modelo de monetización |
| DP-S4 | Q06 (parcial — pasarela concreta) | Catálogo de integraciones |
| DP-S10 | Q02 | Estados del workflow (sub-estados del comité) |
| DP-S11 | Q08 | Trazabilidad de valor de transacción real |

## Frases de duda que NO requieren decisión formal

Estas frases del transcript señalan inseguridad pero ya quedaron resueltas en `00_fundamentos.md` o en este procesamiento:

- "¿No habíamos especificado cuál era el MVP?" (L1) → resuelto en 00_fundamentos.md (MVP = flujo nueva tasación).
- "¿Cómo hacemos eso?" (L11) → operativizado en cadencia bisemanal.
- "Eso depende de cada usuario." (L241) → propio de configuración runtime, no requiere decisión.

## Observaciones

- **6 de 12 decisiones pendientes están vinculadas a preguntas Q01-Q10 del enfoque anterior** — buena señal de coherencia entre los dos análisis.
- **Solo 1 decisión es bloqueante para el MVP-6sem**: DP-S6 (lista exacta de los ~10 arquitectos). Sin esto no podemos pre-cargar los usuarios.
- **DP-S10 (UX comité)** debe resolverse antes de empezar a implementar CRF-022 (flujo comité). Versión "manual con campos editables" del enfoque IR es la decisión por defecto si no hay otra.
