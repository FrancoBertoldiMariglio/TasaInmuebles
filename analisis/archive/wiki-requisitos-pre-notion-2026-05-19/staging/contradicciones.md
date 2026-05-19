---
artefacto: contradicciones (tombstone — todas resueltas)
fuente: ../../../analisis/reunion-01/transcript.txt
procesado: 2026-05-14
ultima_actualizacion: 2026-05-14
total_contradicciones: 5
contradicciones_cerradas: 5/5
estado: cerrado
---

# Contradicciones detectadas en transcript — **CERRADO**

> ✓ **Las 5 contradicciones detectadas están resueltas al 2026-05-14.** Este archivo queda como tombstone para auditoría histórica.

## Resumen de cierres

| ID | Tema | Resolución | Destino |
|----|------|------------|---------|
| **C-001** | Prioridad Uber de tasación vs Autotasador | Falso positivo — orden de construcción definido en fundamentos | `00_fundamentos.md` + `02_enfoque-IR.md` |
| **C-002** | Casos de uso vs Historias de usuario | Falso positivo — política CU al nivel valor en Fase 1 | `02_enfoque-IR.md § Metodología base` |
| **C-003** | Maqueta vieja: usar o rehacer | Falso positivo — decisión de rehacer documentada | `CLAUDE.md §3` |
| **C-004** | Scraping legal o ilegal | **Contradicción real** — promovida a decisión pendiente | **DP-013** en `../10_decisiones/pendientes.md` |
| **C-005** | Asignación automática vs elección manual | Falso positivo — consolidado en CRF-006 (ambos modos coexisten) | `staging/candidatos-rf.md` CRF-006 |

> Para el detalle histórico de cada contradicción (citas, análisis, lógica de resolución), ver la tabla original más abajo.

## Detalle histórico (preservado)

## Contradicciones internas al transcript

### C-001 — Prioridad: Uber de tasación vs Autotasador

| Afirmación | Cita | Línea | Speaker |
|------------|------|-------|---------|
| **A** | "Primero tenemos que resolver el core, que va a ser ese, el núcleo va a ser la IA que tase" | L131 | D |
| **B** | "por prioridades sería la lógica de la urbanización" (= Uber primero) | L131 | D |
| **C** | "Eso sería lo principal de la aplicación y luego la tasa inmueble" | L133 | B |

**Análisis:** el mismo Speaker D dice las dos cosas casi seguidas. La frase que cierra (Speaker B → "ese sería lo principal") confirma que **la prioridad es Uber/urbanización primero**, IA después. La aparente contradicción se resuelve leyéndolo como "el corazón conceptual del producto es la IA, pero el orden de construcción empieza por la mecánica del Uber".

**Resolución propuesta:** consolidar en BR/decisión: "Orden de construcción del producto: (1) Uber de tasación + comité manual en MVP, (2) Robotomus IA real en Fase 2, (3) Autotasador B2C en Fase 3." Ya plasmado en `00_fundamentos.md` y `02_enfoque-IR.md`.

---

### C-002 — Casos de uso vs Historias de usuario

| Afirmación | Cita | Línea | Speaker |
|------------|------|-------|---------|
| **A** | "para el MVP nos enfoquemos en los casos de uso, la metodología de casos de uso, no metodología de historia de usuario" | L119 | C |
| **B** | "es los casos de uso básicos, pero cómo lo usaría un inmobiliario, cómo lo usaría un responsable del banco, cómo lo usaría un particular, cómo lo usaríamos nosotros inclusive. Los diferentes casos de uso..." | L113 | B |
| **C** | "Sí, a nosotros nos sirve ver la tasación y ya eso también para eso, de forma simple, digamos. Sin complicaciones, no hace falta hacer un diagrama, un board, todo eso" | L107-109 | B,C |

**Análisis:** no es contradicción dura. A y B coinciden (casos de uso). C es solicitud de informalidad. La tensión real es **rigurosidad de IR vs velocidad** — resuelta por el enfoque MoSCoW + CU al nivel valor (no fully-dressed), ya en `02_enfoque-IR.md`.

**Resolución propuesta:** sin acción adicional. La política está documentada.

---

### C-003 — Estado de la maqueta vieja: ¿usar o rehacer?

| Afirmación | Cita | Línea | Speaker |
|------------|------|-------|---------|
| **A** | "actualmente la marca tasación inmuebles ya está, como tenemos el dominio, había algo ya hecho... sirve como para entender" | L41 | D |
| **B** | "hay que hacerlo de nuevo. Es mejor hacerlo de nuevo que agarrar eso y malgastarlo" | L49 | D |

**Análisis:** mismo speaker, frases seguidas. **No es contradicción real**: la maqueta vieja sirve como **referencia funcional** pero **no se reutiliza código**. Ya está cerrado en CLAUDE.md §3.

**Resolución propuesta:** sin acción adicional.

---

### C-004 — Scraping: legal o ilegal

| Afirmación | Cita | Línea | Speaker |
|------------|------|-------|---------|
| **A** | "Legalmente no se puede hacer. Esa es la respuesta corta... Con fines académicos" | L361 | C |
| **B** | "si vos podés escrapear de una manera pública, si los datos están públicos, a ver... Tribago empezó con scrapping" | L363 | B |
| **C** | "vamos a lo que es idóneo y la realidad. La realidad es que la gente lo hace. Cuál es el tema? Que en los papeles hay una ley argentina que es la Ley de Protección de Datos" | L365 | C |

**Análisis:** **contradicción real** entre la posición pragmática de Cocucci (B) y la legal de Franco (C). La síntesis del propio Franco al final (C) reconoce que "se hace en la práctica" pero "hay una ley". Es una decisión abierta con riesgo legal.

**Resolución propuesta:** mover a `10_decisiones/pendientes.md` con ID `DP-013`. Vinculado a `DS-03` (estrategia legal scraping) ya identificada en la matriz de stakeholders (S-020). **Bloqueante para Fase 2** (Robotomus real). No bloquea MVP-6sem.

---

### C-005 — Asignación: automática vs elección manual

| Afirmación | Cita | Línea | Speaker |
|------------|------|-------|---------|
| **A** | "el tasacion inmueble le va a asignar un tasador de La Valle, no va a asignar un tasador de acá" | L227 | B |
| **B** | "El solicitante podría elegir si quiere la inmobiliaria que le tase o el tasador que le tase" | L171 | B |

**Análisis:** no es contradicción dura. Cocucci plantea las **dos modalidades coexistiendo**: por defecto automática por zona (A), opcional elección manual (B). Solo está mal expresado.

**Resolución propuesta:** consolidar en CRF-006 con dos sub-flujos: (a) asignación automática por zona, (b) elección manual del solicitante con sobrescritura del default.

---

## Contradicciones potenciales con CLAUDE.md (resueltas previamente)

### CC-001 — Deadline: 6 meses vs 6 semanas

CLAUDE.md (versión original) decía que el MVP se dimensionaba contra octubre 2026. En esta sesión (2026-05-14) el usuario corrigió: el MVP es a 6 semanas (~2026-06-25), y octubre es el cierre del acuerdo completo.

**Resolución aplicada:** ya actualizada en CLAUDE.md y en `00_fundamentos.md`. Dos hitos numerados (Hito 1 = 2026-06-25, Hito 2 = ~2026-10-19). Sin acción adicional.

---

## Observaciones

- De las 5 contradicciones detectadas, **4 son falsas positivas** (C-001, C-002, C-003, C-005) — son matices que el modelo de extracción interpretó como contradicción pero se resuelven al leer el contexto completo.
- **Solo C-004 (legalidad del scraping) es una contradicción real** y abre una decisión legal (DP-013) cuyo cierre depende de opinión jurídica externa.
- La contradicción más importante del proyecto **no aparece en el transcript**: el desfasaje conceptual entre el modelo 90/10 y el modelo tradicional 50/50 de las inmobiliarias (S-019). El transcript no lo enuncia porque ningún speaker representa a la inmobiliaria perdedora. Esto refuerza la necesidad de incluir explícitamente stakeholders ausentes.
