# 00 — Preguntas pendientes del alcance

> Documento vivo. Cada pregunta resuelta migra a `01_alcance_funcional.md` y queda marcada acá como **RESPONDIDA** con la decisión + fecha + quién la cerró. Cuando todas estén resueltas, este archivo se archiva en `proyecto/decisiones/`.

## Convención

- **Estado**: `[PENDIENTE]` · `[EN DEBATE]` · `[RESPUESTA PARCIAL]` · `[RESPONDIDA]`
- **Bloquea alcance**: indica si la decisión es necesaria para redactar `01_alcance_funcional.md` (sí) o si puede esperar a una fase posterior (no).
- **Decisión**: vacío hasta que se cierra. Formato: `[YYYY-MM-DD] [Quién cerró] — texto de la decisión.`
- **Respuesta parcial**: se eligió un subset de las opciones propuestas; lo no elegido queda explícitamente listado como **propuesta pendiente** (no descartado).

---

## Q01 — Granularidad del modelo de Entidades B2B

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: sí

### Contexto
Una "Entidad" es un cliente B2B (Remax, Banco Galicia, Poder Judicial, Colegio de Arquitectos). La pregunta es qué tan rica es internamente. Cae en cascada sobre roles, permisos, dashboards multinivel, billing y ABM. En reunión-01 Sebastián dijo "vamos a pensarlo eso un poquito, no me queda totalmente claro cómo sería".

### Opciones
- **A) Plano** — Entidad con N tasadores + Owner(s). Dashboards a 2 niveles (Tasador / Owner). Un tasador puede pertenecer a varias Entidades. Sin sub-equipos.
- **B) Jerárquico (2 niveles)** — Sub-entidades (`Remax Nacional > Remax Cuyo > Remax Mendoza`). Dashboards a 3 niveles. Permisos por nivel.
- **C) Multi-tenant genérico** — Árbol libre, cualquier nodo puede ser entidad de cobro/cliente/agrupador. Permisos heredables.

### Recomendación
**A** para alcance Fase 1-2, con **nota explícita en Fase 3** de "evolución a B si entra cliente tipo Remax Nacional o banco grande". C descartado (over-engineering sin caso de uso real hoy).

### Decisión
_pendiente_

---

## Q02 — Estados del workflow de tasación

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: sí

### Contexto
La máquina de estados de una tasación define qué se puede hacer en cada momento, qué muestra el dashboard, qué transiciones son válidas. La transcripción menciona al menos: borrador, inspección ocular, para tasar, en comité, tasada. El PDF agrega: PDF generado, compartida.

### Opciones
- **A) Mínima (5 estados)**: `Borrador → Inspección hecha → En comité → Tasada → Compartida`.
- **B) Extendida (10 estados)**: A + `Firmada digital`, `Pagada`, `Archivada`, `Rechazada`, `Cancelada`.
- **C) Estados + sub-estados**: cada estado con sub-estados (ej: `En comité {esperando tasadores, listo para votar, votada}`).

### Recomendación
**B** para alcance completo (cubre Fase 2 con módulo contable y firma digital). El MVP-Colegio se queda con el subset de A.

### Decisión
_pendiente_

---

## Q03 — Catálogo de tipos / motivos de tasación

**Estado**: `[RESPONDIDA]` · **Bloquea alcance**: sí

### Contexto
La transcripción y la maqueta vieja listan estos motivos: venta, alquiler, asesoramiento de valores para particulares, tasación para empresas, expropiaciones, divisiones/fraccionamientos, sucesión, tasación judicial, tasación extrajudicial, hipoteca. Algunos requieren cumplimiento legal específico (judicial necesita oficio; expropiación normativa).

### Opciones
- **A) Catálogo mínimo (3 tipos)**: venta, alquiler, asesoramiento. Hipoteca y judicial se postergan hasta tener compliance.
- **B) Catálogo completo cerrado (10 tipos)**: todos los motivos de la maqueta. Implica investigar requisitos por tipo y modelar campos diferenciales (oficio, decreto, foja, etc.).
- **C) Catálogo extensible**: tabla de `tipo_tasacion` configurable por admin con campos comunes + campos JSON específicos por tipo. Arrancás con 3-4 base, agregás resto sin código.

### Recomendación
**C**. Permite arrancar acotado y crecer por configuración. Es la opción menos costosa a largo plazo.

### Decisión
**[2026-05-14] [Franco Bertoldi]** — Opción **B** aceptada: catálogo completo cerrado de **10 tipos**:

1. Venta
2. Alquiler
3. Asesoramiento de valores para particulares
4. Tasación para empresas
5. Expropiaciones
6. Divisiones / fraccionamientos
7. Sucesión
8. Tasación judicial
9. Tasación extrajudicial
10. Hipoteca

El alcance documenta los 10 tipos. El subset que se activa en el MVP-Colegio se decide en una fase posterior. Pendiente investigar **campos diferenciales y requisitos legales por tipo** (judicial requiere oficio, expropiación normativa, hipoteca requiere garantía, etc.) — abrir una pregunta Q11 si se vuelve bloqueante.

---

## Q04 — Modelo de monetización

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: sí

### Contexto
La transcripción menciona cuatro modelos de cobro coexistiendo: (1) pago por tasación individual, (2) suscripción B2B con paquetes mensuales (caso Poder Judicial), (3) plus por inspección ocular / firma colegiada, (4) tarifa variable por superficie/distancia (un castillo de 1500m² no vale lo mismo que una casa de 100m²).

### Opciones
- **A) Sólo 1+3** — pago individual + plus por firma. Simple. El MVP-Colegio arranca con pago manual fuera de la app.
- **B) 1+3 en alcance, 2+4 como Fase 2-3** — alcance documenta los cuatro pero secuenciados.
- **C) Los 4 desde el alcance completo** — alcance describe los cuatro modelos con detalle. Fase MVP usa subset, fases siguientes activan el resto.

### Recomendación
**C**. El alcance completo es el "source of truth estático", documenta TODOS los modelos aunque el MVP arranque con un subset. Hace explícito que el sistema de pricing tiene que ser pluggable desde el día 1.

### Decisión
_pendiente_

---

## Q05 — Onboarding, verificación y ranking de tasadores

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: sí

### Contexto
¿Cómo entra un tasador al sistema? La transcripción menciona verificación de matrícula, capacitación obligatoria ("le vamos a dar un curso de uso de la plataforma"), especialización por tipo de inmueble (no es lo mismo tasar una finca que un depto) y ranking por estrellas.

### Opciones
- **A) Onboarding manual, sin ranking** — admin crea usuarios uno a uno y verifica matrícula a ojo. Sin estrellas. Asignación de tasaciones manual. **Suficiente para MVP-Colegio (~10 arquitectos)**.
- **B) Onboarding asistido + ranking simple** — el tasador se autoregistra, sube foto de matrícula, admin aprueba. Ranking por estrellas (1-5) del cliente y del comité. Asignación automática por zona + especialización + ranking.
- **C) Marketplace completo** — registro libre, verificación automática (API del Colegio si existe), ranking + reviews + especialización + pricing dinámico por tasador.

### Recomendación
**B** para alcance completo. El MVP-Colegio usa A como subset.

### Decisión
_pendiente_

---

## Q06 — Integraciones externas: confirmación de catálogo y fase

**Estado**: `[RESPUESTA PARCIAL]` · **Bloquea alcance**: sí (lista)

### Contexto
Propuesta de integraciones identificadas en transcripción + PDF, con fase sugerida. Confirmar / mover.

| Integración | Por qué | Fase sugerida |
|---|---|---|
| Google Maps (geolocalización) | crítica desde día 1 | **1** |
| OpenAI API (o equivalente) — asistente IA y descripción de inmueble | crítica desde día 1 | **1** |
| OCR de imágenes (escanear escrituras, planos) | mejora UX | **2** |
| Pasarela de pagos (Mercado Pago, Stripe, dLocal) | crítico para flujo Uber | **2** |
| Firma digital colegiada (API del Colegio si existe; fallback manual) | crítico para certificación | **2** |
| Import histórico Inmoclick → Métricas | crítico para Robotomus | **2** |
| Scraping ético portales (ZonaProp, ArgenProp, MercadoLibre, etc.) | crítico para Robotomus | **2-3** (con resguardo legal Ley de Protección de Datos) |
| API consumo bancos / empresas B2B | crítico para escalado B2B | **2-3** |
| Homologación tipo Z-Value (Zillow) | nice-to-have, depende del Colegio | **3** |
| WhatsApp Business API (notificaciones transaccionales) | mejora UX, alta penetración en AR | **2** |
| Pasarela de identidad (validar matrícula contra Colegios) | mejora compliance | **2-3** |

### Recomendación
Confirmar la tabla tal cual o decir qué subir/bajar de fase.

### Decisión
**[2026-05-14] [Franco Bertoldi]** — **Respuesta parcial**. Confirmadas como integraciones del alcance:

| Integración | Restricción / nota |
|---|---|
| Google Maps | — |
| **Motor de IA (el más barato disponible)** | **No atado a OpenAI**: evaluar Gemini Flash, Claude Haiku, modelos open source vía Groq/Together, etc. Decisión de proveedor pendiente; criterio principal = costo por token. |
| Pasarela de pagos | Proveedor concreto (Mercado Pago / Stripe / dLocal) pendiente. |
| Import histórico Inmoclick → Métricas | — |
| Homologación tipo Z-Value (Zillow) | Sigue subiendo de Fase 3 a alcance confirmado; depende de poder cerrarlo con alguna entidad homologadora. |
| WhatsApp Business API | Confirmada como integración del producto, **pero ver Q07**: hoy no se usa para notificaciones transaccionales (Q07 decidió canal email + in-app). Queda como integración prevista para uso futuro (captación, chatbot, mensajería). |

**Propuestas pendientes** (no descartadas, requieren decisión posterior):

- OCR de imágenes
- Firma digital colegiada
- Scraping ético portales (ZonaProp, ArgenProp, etc.)
- API consumo bancos / empresas B2B
- Pasarela de identidad (validar matrícula contra Colegios)

---

## Q07 — Notificaciones, mensajería y chatbot

**Estado**: `[RESPONDIDA]` · **Bloquea alcance**: no (puede esperar a Fase 2)

### Contexto
Canales para notificar y comunicar a cliente / tasador / comité. La transcripción mencionó in-app, WhatsApp, mail, y un chatbot inicial de captación en el sitio web (Cocucci: "cuando solicitabas tasador te daba dos opciones: que me llamen y te pedía 3 datos nada más").

### Opciones
- **A) Solo in-app + email** — notifico asignación, comité agendado, tasación entregada por email + dentro de la app.
- **B) A + WhatsApp transaccional** — agrega WhatsApp para eventos críticos (asignación, comité agendado, PDF listo).
- **C) B + chatbot conversacional de captación** — chatbot en el sitio web pregunta motivo, zona y forma de contacto; deriva al sistema.

### Recomendación
**B** para alcance completo. **C** como Fase 3 / nice-to-have. MVP-Colegio puede vivir con A.

### Decisión
**[2026-05-14] [Franco Bertoldi]** — Opción **A** aceptada **por ahora** (in-app + email).

- Las opciones B (WhatsApp transaccional) y C (chatbot de captación) quedan **diferidas a evaluación posterior**, no descartadas.
- WhatsApp Business API sigue confirmada en Q06 como integración del producto, pero **no se la cablea al sistema de notificaciones todavía**. Si se reactiva en el futuro, se documenta como Q07-bis.

---

## Q08 — Trazabilidad de valor de transacción real

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: no

### Contexto
Cocucci propuso en reunión-01 registrar el **valor de transacción real** (cuando el inmueble efectivamente se vende) y compararlo con el valor tasado, para medir precisión del tasador y alimentar el modelo. "Si nosotros registramos el valor de transacción, puedo cotejar y ver cuál fue el tasador que más le pega".

### Opciones
- **A) Sí, alcance Fase 2** — campo opcional `valor_de_cierre` + métrica `precisión del tasador` en dashboard de owner y de tasador. Opt-in (depende de que el cliente vuelva).
- **B) Sí, alcance Fase 3** — solo cuando haya volumen. Requiere que el cliente vuelva con fricción cero (link en email post-tasación con un botón "registrar valor de cierre").
- **C) No-goal por ahora** — registra fricción alta, ROI dudoso hasta tener volumen, se posterga hasta nuevo aviso.

### Recomendación
**A**, pero **opt-in y sin presionar**. Es un dato que vale oro a futuro y cuesta poco habilitarlo.

### Decisión
_pendiente_

---

## Q09 — Documentos generados por la plataforma

**Estado**: `[RESPUESTA PARCIAL]` · **Bloquea alcance**: sí (lista)

### Contexto
Lista propuesta de documentos a generar. Confirmar / sumar / sacar.

| Documento | Quién lo recibe | Fase |
|---|---|---|
| **PDF de tasación simple** (firmado por la plataforma, sin inspección ocular) | Cliente | **1** |
| **PDF de tasación certificada** (firmado por colegiado tras inspección ocular) | Cliente / banco | **1-2** |
| **Expediente para banco / empresa** (PDF + fotos + geo + datos del tasador) | Empresa B2B | **2** |
| **Autorización de venta firmada** (declaración del particular para autorizar publicación) | Inmobiliaria | **2** |
| **Acta de comité** (registro de quiénes participaron y qué valor propuso cada uno) | Tasadores / auditoría | **1-2** |
| **Recibo / factura electrónica** | Cliente | **2** |
| **Informe de mercado por zona** (output del scraping/métricas, para clientes B2B) | Empresa B2B | **3** |

### Recomendación
Confirmar la tabla, o agregar el informe de mercado por zona en Fase 2 si Cocucci ve que tiene demanda temprana de los bancos.

### Decisión
**[2026-05-14] [Franco Bertoldi]** — **Respuesta parcial**. Confirmados como documentos del alcance:

- **PDF de tasación simple** (firmado por la plataforma, sin inspección ocular).
- **Recibo / factura electrónica**.

**Propuestas pendientes** (no descartadas, requieren decisión posterior):

- PDF de tasación certificada (firmado por colegiado tras inspección ocular)
- Expediente para banco / empresa
- Autorización de venta firmada
- Acta de comité
- Informe de mercado por zona

> **Observación**: el modelo de negocio en `CLAUDE.md` describe que el diferencial de monetización es la firma colegiada tras inspección ocular (tasación simple barata → certificada cara). Si no entra el documento "PDF de tasación certificada" al alcance, ese diferencial queda fuera del producto. **Revisar antes de cerrar el alcance final.**

---

## Q10 — No-goals explícitos del producto

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: sí

### Contexto
Los no-goals son imprescindibles para que el alcance no se infle. Propuesta inicial mía a confirmar/editar.

### Propuesta de no-goals
1. **NO** somos plataforma de **publicación/venta** de inmuebles. Inmoclick ya cubre eso. Tasa Inmuebles es solo tasación + datos.
2. **NO** gestionamos **contratos de alquiler** ni cobranza de alquileres.
3. **NO** intermediamos **hipotecas** ni operaciones financieras. Podemos ser partner / proveedor del banco, no producto financiero.
4. **NO** valuamos **empresas, fondos de comercio, llaves de negocio, vehículos, maquinaria**. Solo inmuebles físicos (urbanos y rurales).
5. **NO** operamos fuera de **Argentina** en Fase 1-2.
6. **NO** somos **CRM inmobiliario** (gestión de leads, prospectos, embudo de venta). Solo tasación. Si la inmobiliaria quiere un CRM, lo integra.
7. **NO** sustituimos al **arquitecto / corredor matriculado** en su responsabilidad legal. La firma profesional es necesaria para certificación.

### Recomendación
Confirmar la lista tal cual, o ajustar redacción y agregar lo que falte.

### Decisión
_pendiente_

---

## Q11 — Nomenclatura UI: "Solicitante" vs "Referente"

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: no (es UI, no modelo) · **Origen**: cierre de A-016 (2026-05-14)

### Contexto
En la maqueta vieja, la **misma entidad** (la persona que pide la tasación) aparece con dos etiquetas distintas:
- **"Solicitante"** en el formulario de carga (imagen `WhatsApp Image 2026-05-14 at 12.45.44 (3).jpeg`) — sección expandible con campos Nombre, Apellido, Teléfono, Email.
- **"Referente"** en la ficha de consulta (imagen `WhatsApp Image 2026-05-14 at 12.45.44 (1).jpeg`) — label corto al lado de Domicilio, Motivo, Fecha alta.

Conceptualmente es la misma persona y se modela como un único registro. Confirmado por Franco el 2026-05-14: "Referente = Solicitante del formulario". Lo único que queda abierto es **qué label usar en la UI definitiva** para que sea consistente.

### Opciones
- **A) Usar "Solicitante" en todos lados** — coincide con el rol funcional descripto en el PDF de Cocucci ("Particulares Clientes"). Más claro para usuarios nuevos.
- **B) Usar "Referente" en todos lados** — más corto, cabe mejor en el espacio de la ficha de consulta. Coincide con jerga inmobiliaria tradicional.
- **C) Mantener ambos labels (Solicitante en formulario, Referente en ficha)** — como en la maqueta vieja. Risk: confusión semántica.

### Recomendación
**A (Solicitante en todos lados)**. Razón: cuando entre el caso de uso B2B (banco, juzgado), "Referente" tiene otra acepción en inmobiliaria (suele significar el corredor de la operación, no quien pide la tasación). "Solicitante" es inequívoco.

### Decisión
_pendiente_ — alineación operativa, no bloquea modelo de datos ni RF.

---

## Q12 — Lista canónica de amenities

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: no (extensible vía admin) · **Origen**: cierre de A-016 (2026-05-14)

### Contexto
Al cerrar A-016 quedó que el campo `Detalles > amenities` es **lista de strings** (checkboxes en UI). Faltó confirmar la lista canónica de opciones disponibles para el MVP.

### Propuesta inicial (sin confirmar)
- Pileta · Parrilla · Quincho · Garage (cochera) · Jardín · Terraza · Balcón · Gimnasio · SUM · Seguridad 24h · Ascensor · Lavadero

### Opciones
- **A) Aceptar la lista de 12 amenities propuesta.**
- **B) Recortar a un subset mínimo MVP** (ej: 6 más comunes: pileta, garage, parrilla, balcón, jardín, ascensor).
- **C) Lista vacía + campo de texto libre** para que el tasador escriba lo que quiera. **NO recomendado** porque rompe input estructurado para Robotomus (las amenities como input al ML necesitan ser categóricas).

### Recomendación
**A**. La lista de 12 cubre el 95% de casos urbanos argentinos. En Fase 2 se puede agregar admin para que owners extiendan la lista. Para Robotomus es lista cerrada (vector binario de presencia).

### Decisión
_pendiente_

---

## Q13 — Nav de la app mobile cuando el usuario tiene roles múltiples (Owner + Tasador)

**Estado**: `[PENDIENTE]` · **Bloquea alcance**: no (Fase 2) · **Origen**: aclaración Web + mobile embebida (2026-05-14)

### Contexto
En Fase 2 aparece el Owner B2B (banco, Remax, Poder Judicial), que **también puede ser un tasador activo** (caso típico: dueño de inmobiliaria que también tasa él mismo de vez en cuando). El Owner B2B accede a su dashboard agregado en dos canales: T-034 web (uso primario) y T-035 mobile primitivo embebido en la app del tasador.

Pregunta de UX: cuando este usuario "Owner + Tasador" abre la app mobile, **¿qué ve primero?**

### Opciones
- **A) Default: "Mis tasaciones" (T-033)** — porque el propósito de la app mobile es operar tasaciones. El dashboard mobile (T-035) está accesible vía nav drawer / pestaña secundaria. Coherente con "mobile primero para tasar".
- **B) Default: T-035 Dashboard mobile** — si el usuario es Owner, asumimos que abre la app principalmente para ver agregado. Coherente con "ver mi negocio primero".
- **C) Selector inicial** — la primera vez le preguntamos al usuario qué vista quiere por defecto. Cada vez después, recuerda su elección.
- **D) Toggle global** — botón visible en todo momento para alternar entre las dos vistas.

### Recomendación
**A**, coherente con el principio T-017 Mobile-First: el propósito de la app mobile es **operar**, no analizar. El dashboard mobile es **secundario**. Si un Owner B2B quiere análisis denso, va al T-034 web.

### Decisión
_pendiente_ (Fase 2, no bloqueante para MVP)

---

## Próximos pasos

1. **Vos decidís** sobre cada Q (de a una o en bloque).
2. **Yo migro** las respuestas a `01_alcance_funcional.md` y marco la Q como `[RESPONDIDA]` con link a la sección donde quedó plasmada.
3. Las Q que tengan flag **Bloquea alcance: no** podemos dejarlas abiertas mientras avanzamos con el doc principal.

### Aristas adicionales detectadas durante el brainstorm (para sumar si querés)

- **Soporte / mesa de ayuda** (Sebastián mencionó en reunión que era "inevitable", parte robotizable). ¿Entra al alcance o se trata como operación externa?
- **Compliance Ley 25.326 (Protección de Datos AR)** específico para scraping de portales y manejo de datos de los inmuebles tasados. ¿Lo dejamos como requisito no-funcional explícito en el alcance o lo movemos a un doc propio de cumplimiento?
- **Modelo de roles internos** (admin de plataforma, soporte, contador). ¿Forman parte del modelo de Entidades o son usuarios separados de "back office Tasa Inmuebles"?
- **Multi-moneda** (ARS, USD, indexación). En AR las tasaciones se publican en USD muchas veces. ¿Lo documentamos como requisito desde el día 1?
- **Versionado de la tasación** (si se re-tasa el mismo inmueble 6 meses después, ¿es una tasación nueva o una versión? Cocucci mencionó que el sistema "va aprendiendo").
