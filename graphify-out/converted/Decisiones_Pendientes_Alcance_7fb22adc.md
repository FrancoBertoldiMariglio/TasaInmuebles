<!-- converted from Decisiones_Pendientes_Alcance.docx -->


TASA INMUEBLES
Proyecto Cocucci
Decisiones pendientes
del alcance funcional
Documento de trabajo para la sociedad

# Resumen ejecutivo
Este documento consolida las decisiones que la sociedad necesita cerrar para poder redactar el alcance funcional completo de Tasa Inmuebles. Cada decisión pendiente afecta directamente la forma del producto: cómo se modelan los clientes empresa, cómo se factura, cómo se da de alta un tasador, qué documentos genera la plataforma, y qué quedará explícitamente fuera del producto.
Cada sección sigue el mismo formato: contexto del problema, opciones viables con sus ventajas y desventajas, recomendación del equipo técnico, y un espacio para que cada socio anote su decisión, firmando con su nombre y la fecha. Una vez cerradas, las decisiones migran al documento de alcance funcional como fuente única de verdad.
## Estado de las preguntas pendientes
# Cómo leer este documento
Cada pregunta sigue la misma estructura, de modo que se puede leer en cualquier orden:
- Contexto. De qué se trata el problema y por qué importa cerrarlo.
- Opciones. Las alternativas viables con sus ventajas y desventajas, en lenguaje accesible.
- Recomendación. La propuesta del equipo técnico, sin que sea una imposición.
- Decisión. Espacio para que el socio que cierra la decisión la deje escrita, con nombre y fecha.
Las preguntas con "Respuesta parcial" ya tienen una porción cerrada (lo que ya se confirmó en una primera ronda) y un bloque amarillo aclarando lo que falta decidir.
# Q01 — Granularidad del modelo de Entidades B2B
Estado: Pendiente    ·    Bloquea alcance: Sí
### Contexto
Una "Entidad" es un cliente corporativo del producto: por ejemplo Remax, Banco Galicia, el Poder Judicial o el propio Colegio de Arquitectos. La pregunta es qué tan rica es internamente cada Entidad, porque eso determina cuántos roles distintos hay que construir, cuántos niveles de dashboards, cómo funcionan los permisos y cómo se factura.
En la reunión inicial, Sebastián marcó que esta arista no le quedaba clara y que la queríamos pensar mejor antes de avanzar. Es importante cerrarla porque cualquier decisión sobre permisos, billing y reportes deriva de acá.
### Opciones


# Q02 — Estados del flujo de tasación
Estado: Pendiente    ·    Bloquea alcance: Sí
### Contexto
Una tasación atraviesa varios momentos: arranca como borrador, pasa por una visita al inmueble, entra a un comité que la valida, queda firmada, se entrega al cliente y eventualmente se cobra. Cada uno de esos momentos es un "estado" del sistema, y la lista de estados define qué se puede hacer en cada paso, qué muestra el panel y qué transiciones son válidas.
La transcripción de la reunión inicial menciona al menos cinco estados básicos. La maqueta vieja agrega "PDF generado" y "compartida". Los estados extra (firma digital, pago, archivado) son necesarios sólo cuando entren en juego el módulo contable y la firma colegiada (Fase 2 en adelante).
### Opciones


# Q04 — Modelo de monetización
Estado: Pendiente    ·    Bloquea alcance: Sí
### Contexto
La plataforma puede cobrar de varias formas y la mayoría no se excluyen entre sí. En la reunión se identificaron cuatro modelos: cobro por tasación individual, suscripción para clientes B2B con paquetes mensuales, plus por inspección ocular y firma colegiada, y tarifa variable según superficie o distancia.
La elección define cuánto del módulo contable hay que construir en cada fase, qué pasarela de pagos elegir, y qué flexibilidad necesita el sistema de pricing.
### Opciones


# Q05 — Onboarding, verificación y ranking de tasadores
Estado: Pendiente    ·    Bloquea alcance: Sí
### Contexto
La pregunta es cómo entra un tasador al sistema y cómo se diferencia uno de otro. En la reunión se mencionaron tres ideas distintas: verificación de matrícula (que el tasador sea realmente un profesional habilitado), capacitación obligatoria sobre el uso de la plataforma, y un sistema de ranking por estrellas que permita asignar mejor las tasaciones.
Para el MVP del Colegio basta con dar de alta a mano a los diez arquitectos que vayan a usar la herramienta. Pero apenas el producto crezca, esa carga manual deja de escalar.
### Opciones


# Q06 — Integraciones externas: confirmación del catálogo
Estado: Respuesta parcial    ·    Bloquea alcance: Sí (lista)
### Contexto
El producto se apoya en varias integraciones con servicios externos: mapas, motor de inteligencia artificial, pasarela de pagos, importación de datos históricos, scraping de portales, firma digital, etc. En una primera ronda se confirmaron seis integraciones; quedan cinco más como propuestas que necesitan decisión final.
La decisión define el alcance de las integraciones y la fase en la que entran. Cuanto antes se confirme la lista completa, antes se puede empezar a evaluar proveedores.
### Ya confirmado
- Google Maps para geolocalización.
- Motor de IA: el más barato disponible (sin atarse a OpenAI; evaluar Gemini Flash, Claude Haiku, modelos open source vía Groq u otros).
- Pasarela de pagos (proveedor concreto a definir: Mercado Pago, Stripe, dLocal).
- Import histórico de Inmoclick hacia la base intermedia Métricas.
- Homologación tipo Z-Value (modelo Zillow), sujeta a poder cerrar el acuerdo con una entidad homologadora.
- WhatsApp Business API como integración prevista del producto (no se usa para notificaciones todavía, ver Q07).
### Opciones (para la parte que queda pendiente)



# Q08 — Trazabilidad del valor de transacción real
Estado: Pendiente    ·    Bloquea alcance: No
### Contexto
Cocucci propuso en la reunión inicial registrar el valor real de cierre cuando el inmueble efectivamente se vende, y compararlo contra el valor que en su momento dio el tasador. La idea es medir qué tasador "le pega más" y, eventualmente, usar ese dato para alimentar el modelo de inteligencia artificial.
Es un dato de alto valor a futuro pero requiere que el cliente vuelva a la plataforma a registrar el cierre, lo que tiene fricción. La pregunta es si entra al alcance y en qué fase.
### Opciones


# Q09 — Documentos generados por la plataforma
Estado: Respuesta parcial    ·    Bloquea alcance: Sí (lista)
### Contexto
La plataforma no genera solamente el PDF de la tasación: también puede generar expedientes para bancos, autorizaciones de venta firmadas, actas de comité, recibos electrónicos, informes de mercado. La pregunta es qué documentos entran al alcance completo y en qué fase.
En una primera ronda quedaron confirmados dos documentos. Los otros cinco están como propuestas pendientes y necesitan decisión.
### Ya confirmado
- PDF de tasación simple, firmado por la plataforma, sin inspección ocular.
- Recibo o factura electrónica.
### Opciones (para la parte que queda pendiente)



# Q10 — No-goals explícitos del producto
Estado: Pendiente    ·    Bloquea alcance: Sí
### Contexto
Los "no-goals" son las cosas que el producto deliberadamente NO va a hacer. Documentarlos es tan importante como documentar lo que sí va a hacer, porque evita que el alcance se infle con sugerencias bien intencionadas que no son parte del producto.
Lo que sigue es la propuesta inicial del equipo técnico, basada en lo conversado en la reunión y en el modelo de negocio descripto. La decisión es confirmar la lista o ajustarla.
### Opciones


## Lista propuesta de no-goals
Son los siete puntos sobre los que se pide confirmación:
- Publicación / venta de inmuebles. Inmoclick ya cubre eso. Tasa Inmuebles es sólo tasación y datos.
- Contratos de alquiler y cobranza de alquileres. Fuera de alcance.
- Intermediación de hipotecas u operaciones financieras. Podemos ser partner del banco, no producto financiero.
- Valuación de empresas, fondos de comercio, llaves, vehículos o maquinaria. Sólo inmuebles físicos, urbanos y rurales.
- Operación fuera de Argentina en Fases 1 y 2. La expansión regional queda fuera de las primeras fases.
- CRM inmobiliario (leads, prospectos, embudo de venta). Sólo tasación. Si la inmobiliaria quiere un CRM, lo integra.
- Sustitución del arquitecto o corredor matriculado en su responsabilidad legal. La firma profesional es necesaria para la certificación.
# Próximos pasos
Una vez que las decisiones queden anotadas en este documento:
- Franco vuelca las respuestas al archivo 00_preguntas_pendientes.md del repositorio.
- Cada decisión cerrada migra al documento 01_alcance_funcional.md, que es la fuente única de verdad del alcance.
- Las preguntas no bloqueantes (Q08 y las propuestas pendientes de Q06 y Q09) pueden quedar abiertas mientras se avanza con el alcance principal.
- Una vez redactado el alcance, se identifica el subconjunto que entra en el MVP del Colegio de Arquitectos (deadline aproximado: 19 de octubre de 2026, a confirmar).
## Aristas adicionales detectadas
Durante el brainstorming se detectaron otras aristas que no entran como bloqueantes pero conviene resolver más adelante:
- Soporte y mesa de ayuda (parte robotizable, parte humana). ¿Forma parte del alcance o se trata como operación externa?
- Compliance con la Ley 25.326 de Protección de Datos Personales, especialmente para el scraping de portales y el manejo de datos de inmuebles tasados.
- Modelo de roles internos (administrador de plataforma, soporte, contador). ¿Son parte del modelo de Entidades o son usuarios del back-office de Tasa Inmuebles?
- Multi-moneda (ARS y USD, indexación). En Argentina las tasaciones suelen publicarse en dólares. ¿Lo documentamos como requisito desde el día uno?
- Versionado de tasaciones. Si se vuelve a tasar el mismo inmueble seis meses después, ¿es una tasación nueva o una nueva versión de la misma?

Documento generado a partir de 00_preguntas_pendientes.md el 14 de mayo de 2026.
| Versión | 1.0 |
| --- | --- |
| Fecha | 14 de mayo de 2026 |
| Autor | Franco Bertoldi · CTO |
| Destinatarios | Cristian Cocucci · Sebastián Ríos · Franco Bertoldi |
| ID | Tema | Estado | ¿Bloquea el alcance? |
| --- | --- | --- | --- |
| Q01 | Modelo de Entidades B2B (granularidad) | Pendiente | Sí |
| Q02 | Estados del flujo de tasación | Pendiente | Sí |
| Q04 | Modelo de monetización | Pendiente | Sí |
| Q05 | Onboarding y ranking de tasadores | Pendiente | Sí |
| Q06 | Integraciones externas | Respuesta parcial | Sí (resta confirmar pendientes) |
| Q08 | Trazabilidad del valor de transacción real | Pendiente | No |
| Q09 | Documentos generados por la plataforma | Respuesta parcial | Sí (resta confirmar pendientes) |
| Q10 | No-goals del producto | Pendiente | Sí |
| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| A) Plano | Una Entidad tiene N tasadores y uno o varios Owners. Sin sub-equipos.
Cubre el 95% de los casos del primer año (Cocucci, una inmobiliaria estándar, un banco chico, el Colegio).
Modelo de datos chico y permisos simples. El MVP del Colegio entra directo. | Si entra un cliente con jerarquía interna (tipo Remax Nacional con 1.000 sucursales), hay que rehacer parte del modelo. |
| B) Jerárquico (2 niveles) | Soporta sub-entidades del tipo Remax Nacional → Remax Cuyo → Remax Mendoza desde el día uno.
Sirve también para bancos grandes y para el Poder Judicial con sus fueros.
Dashboards a tres niveles, con permisos por nivel. | El modelo de datos y los permisos se duplican.
Onboarding B2B más complejo.
Es exceso de ingeniería para el MVP del Colegio. |
| C) Multi-tenant genérico | Máxima flexibilidad: cualquier nodo del árbol puede ser cliente, agrupador o entidad de cobro.
Permisos heredables. | Triplica la complejidad.
No hay caso de uso real que lo justifique hoy.
Alto riesgo para el deadline con el Colegio. |
| Recomendación. Opción A para el alcance de las Fases 1 y 2, con una nota explícita en la Fase 3 de "evolución a B si entra un cliente grande del estilo Remax Nacional o un banco con red de sucursales". La opción C queda descartada porque hoy no hay un caso de uso real que la pida. |
| --- |
| Decisión:
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
Cerrada por: _______________________     Fecha: _____ / _____ / 2026 |
| --- |
| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| A) Mínima (5 estados) | Estados: Borrador → Inspección hecha → En comité → Tasada → Compartida.
Muy simple de implementar.
Suficiente para el MVP del Colegio. | No contempla pago, firma digital ni archivado.
Hay que extender el modelo en cuanto se sume contabilidad o firma colegiada. |
| B) Extendida (10 estados) | Agrega Firmada digital, Pagada, Archivada, Rechazada y Cancelada.
Cubre todo el ciclo de vida hasta Fase 2 con módulo contable y firma.
El MVP del Colegio usa sólo un subconjunto, pero el modelo está listo. | Más estados implican más lógica de transiciones a definir.
Hay que tener clara la regla de quién puede pasar de qué estado a cuál. |
| C) Estados con sub-estados | Granularidad fina: "En comité" se puede descomponer en "esperando tasadores", "listo para votar", "votada".
Mejor trazabilidad de bloqueos. | Mucha complejidad para el valor que aporta.
Confunde al usuario final si no se diseña bien la UI. |
| Recomendación. Opción B para el alcance completo: cubre Fase 2 con módulo contable y firma. El MVP del Colegio usa solamente el subconjunto de cinco estados de la opción A. La opción C se puede sumar más adelante si la auditoría del comité lo requiere. |
| --- |
| Decisión:
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
Cerrada por: _______________________     Fecha: _____ / _____ / 2026 |
| --- |
| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| A) Sólo 1 + 3 | Cobro por tasación individual + plus por firma colegiada.
Muy simple.
El MVP del Colegio puede arrancar con pago manual fuera de la app, sin pasarela. | Deja afuera los acuerdos con bancos y Poder Judicial (paquetes mensuales).
No diferencia precio por tipo de inmueble. |
| B) 1 + 3 ahora; 2 y 4 como Fase 2 y 3 | Alcance documenta los cuatro modelos, pero secuenciados.
Implementación gradual: primero individual, después suscripción, después tarifa variable. | Hay que diseñar el pricing pluggable desde el inicio para no rehacer el módulo en cada fase. |
| C) Los cuatro desde el alcance completo | El alcance describe en detalle los cuatro modelos.
Garantiza que el sistema de pricing sea pluggable desde el día uno.
El MVP arranca con un subconjunto, las fases siguientes activan el resto sin rediseñar. | Más trabajo de documentación inicial.
Riesgo de definir reglas que después no se usan. |
| Recomendación. Opción C. El alcance completo es la fuente única de verdad estática y debe documentar los cuatro modelos aunque el MVP arranque con un subconjunto. Esto fuerza a que el sistema de precios sea flexible desde el principio y evita reescribir el módulo contable en cada fase. |
| --- |
| Decisión:
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
Cerrada por: _______________________     Fecha: _____ / _____ / 2026 |
| --- |
| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| A) Manual, sin ranking | Un administrador crea los usuarios uno por uno y verifica la matrícula a ojo.
Sin sistema de estrellas. Asignación de tasaciones también manual.
Suficiente para el MVP del Colegio (~10 arquitectos). | No escala más allá de un puñado de tasadores.
Sin métricas de calidad ni reputación. |
| B) Asistido + ranking simple | El tasador se registra solo, sube foto de la matrícula, el admin aprueba.
Sistema de estrellas (1 a 5) puntuado por cliente y por comité.
Asignación automática según zona, especialización y ranking. | Más interfaces a construir (formulario de registro, panel de aprobación).
Hay que diseñar bien las reglas de ranking para que sean justas. |
| C) Marketplace completo | Registro libre con verificación automatizable contra el Colegio (si existe la API).
Reviews públicas, especialización por tipo de inmueble, precio dinámico por tasador.
Modelo "Uber" puro. | Mucha complejidad para el valor que aporta hoy.
Verificación contra el Colegio depende de un tercero.
Riesgo regulatorio si el ranking incide en el precio. |
| Recomendación. Opción B para el alcance completo. El MVP del Colegio usa la opción A como subconjunto: alta manual y sin ranking, suficiente para los primeros diez arquitectos. La opción C se evalúa en Fase 3, cuando el volumen lo justifique. |
| --- |
| Decisión:
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
Cerrada por: _______________________     Fecha: _____ / _____ / 2026 |
| --- |
| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| Incluir todas las pendientes | Alcance completo con las 11 integraciones.
No hay que volver a abrir la decisión más adelante. | Algunas integraciones tienen riesgo legal o dependen de terceros (firma colegiada, scraping).
Compromete recursos a evaluar proveedores que tal vez no se usen. |
| Incluir un subconjunto | Se incluye lo que tiene caso de uso claro.
Se deja afuera lo que depende de terceros o tiene riesgo legal.
Foco mejor. | Requiere decisión específica sobre cuáles entran y cuáles no. |
| Dejar todas como propuestas y revisarlas en cada fase | No bloquea el alcance. Se decide cuando llegue el momento. | Las decisiones quedan postergadas y pueden generar deuda de planificación. |
| Recomendación. Recomendamos incluir todas las pendientes en el alcance (opción "Incluir todas"), porque tener catálogo cerrado simplifica la planificación. Las que tengan riesgo legal o de terceros (scraping, firma colegiada, pasarela de identidad) se documentan con notas de riesgo y resguardo. Si se prefiere acotar, la alternativa es excluir solamente scraping y firma colegiada hasta tener compliance. |
| --- |
| Qué queda pendiente de decidir
OCR de imágenes para escanear escrituras, planos y documentos.
Firma digital colegiada (API del Colegio si existe; en su defecto, fallback manual).
Scraping ético de portales inmobiliarios (ZonaProp, ArgenProp, MercadoLibre, etc.).
API de consumo para bancos y empresas B2B.
Pasarela de identidad para validar la matrícula del tasador contra los colegios profesionales. |
| --- |
| Decisión:
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
Cerrada por: _______________________     Fecha: _____ / _____ / 2026 |
| --- |
| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| A) Sí, en Fase 2 | Campo opcional "valor de cierre" en cada tasación.
Métrica de precisión del tasador en el panel del owner y del tasador.
Opt-in: depende de que el cliente vuelva, no se fuerza. | Baja adopción al principio (cliente tiene que volver a la app). |
| B) Sí, en Fase 3 | Se posterga hasta tener volumen.
Cuando se active, se hace con fricción cero (botón en email post-tasación). | Perdemos meses de datos potencialmente valiosos. |
| C) No-goal | Foco en producto core sin distracciones. | Renunciamos a un dato que es estratégico para entrenar el modelo y diferenciarnos. |
| Recomendación. Opción A pero opt-in y sin presionar al cliente. Es un dato valioso a futuro y cuesta poco habilitarlo. Las métricas en los paneles se calculan solamente si hay dato; si no hay, simplemente no se muestran. |
| --- |
| Decisión:
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
Cerrada por: _______________________     Fecha: _____ / _____ / 2026 |
| --- |
| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| Incluir todos los pendientes | Alcance completo. Cubre todos los casos de uso descriptos.
No hay que reabrir la discusión. | Algunos documentos requieren integraciones adicionales (firma digital, módulo contable).
Más superficie de producto a mantener. |
| Incluir sólo PDF certificada + Acta de comité | Cubre el diferencial del negocio (certificada barata vs. firmada cara).
El acta de comité sirve para auditoría desde el día uno. | Quedan afuera expediente B2B y autorización de venta, que son necesarios para escalar. |
| Excluir todos los pendientes | Foco extremo: sólo PDF simple y factura. | Sin tasación certificada, la diferenciación de monetización descripta en CLAUDE.md desaparece.
El producto queda mucho más cerca de una herramienta interna. |
| Recomendación. Como observación importante: el modelo de negocio que describe CLAUDE.md se sostiene en la diferencia "tasación simple barata vs. tasación certificada cara". Si "PDF de tasación certificada" no entra al alcance, ese diferencial desaparece. La recomendación es incluir al menos PDF certificada y Acta de comité (opción intermedia), y revisar antes de cerrar el alcance final si conviene sumar los demás. |
| --- |
| Qué queda pendiente de decidir
PDF de tasación certificada, firmado por un colegiado tras inspección ocular.
Expediente para banco o empresa (PDF + fotos + geolocalización + datos del tasador).
Autorización de venta firmada por el particular.
Acta de comité (registro de participantes y valores propuestos).
Informe de mercado por zona (salida del scraping y de Métricas, para clientes B2B). |
| --- |
| Decisión:
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
Cerrada por: _______________________     Fecha: _____ / _____ / 2026 |
| --- |
| Opción | Ventajas | Desventajas |
| --- | --- | --- |
| A) Aceptar la lista | Foco claro: tasación únicamente.
Evita discusiones recurrentes sobre features fuera de alcance. | Eventualmente alguno de los no-goals podría revertirse si aparece una oportunidad de negocio (queda explícitamente abierto a revisión). |
| B) Ajustar la lista | Permite incorporar o sacar no-goals según visión de los socios. | Requiere debate explícito en cada cambio. |
| Recomendación. Aceptar la lista propuesta como punto de partida, con la regla explícita de que cualquiera puede proponer revertir un no-goal cuando aparezca una oportunidad concreta de negocio que lo justifique. |
| --- |
| Decisión:
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
Cerrada por: _______________________     Fecha: _____ / _____ / 2026 |
| --- |