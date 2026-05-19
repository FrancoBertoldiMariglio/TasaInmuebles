---
artefacto: requerimientos-crudos
fuente: ../../../analisis/reunion-01/transcript.txt
procesado: 2026-05-14
ultima_actualizacion: 2026-05-14
iniciativa: tasa-inmuebles
skill_responsable: procesar-transcripcion + clasificar-requisitos
total_items: 55
items_promovidos: ~38 (negocio + usuario + software)
items_diferidos: ~17 (Fase 2+)
speakers:
  A: Sebastián Ríos (PO)
  B: Cristian Cocucci (Sponsor + Visionario)
  C: Franco Bertoldi (CTO)
  D: consultor externo del ecosistema Cocucci (identidad pendiente, ver DS-01)
---

## Promociones realizadas por `clasificar-requisitos` (2026-05-14)

Los items se promovieron a los siguientes artefactos. Para detalle ver cada archivo `BR-NEG-NNN.md`, `CU-UI-NNN.md`, `RF-NNN.md`:

| Items RC | Promovido a |
|----------|-------------|
| RC-001, RC-021 | BR-NEG-003 (acuerdo Colegio) |
| RC-013, RC-014, RC-022 | BR-NEG-001 (visión) + Hito 1 (ver `00_fundamentos.md`) |
| RC-008, RC-009, RC-010 | `02_enfoque-IR.md § Metodología base` (SDD + CU + mobile-first) |
| RC-026, RC-027 | BR-NEG-004 (comisión 90/10) |
| RC-011, RC-044-050, RC-055 | CU-UI-001 (fully-dressed) + RF-001 a RF-009 |
| RC-014, RC-054 | CU-UI-002 (login) + RF-010 |
| RC-037-040 | CU-UI-003 (dashboard tasador) + RF-011 |
| RC-051, RC-055 | CU-UI-004 (comité) + RF-015 |
| RC-014, RC-055 | CU-UI-005 (compartir) + RF-012, RF-013, RF-014 |
| RC-054 | CU-UI-006 (admin pre-carga) |
| RC-015, RC-016, RC-017, RC-018, RC-051, RC-052 | CU-UI-008 (Robotomus, Fase 2) |
| RC-019, RC-033 | CU-UI-009 (asignación auto, Fase 2) |
| RC-024, RC-025, RC-041 | CU-UI-010 (dashboard B2B, Fase 2) |
| RC-028 | CU-UI-007 + CU-UI-015 (captación + suscripción) |
| RC-029 | CU-UI-007 (captación, Fase 2) |
| RC-030, RC-031 | CU-UI-011 (pasarela pagos, Fase 2) |
| RC-035, RC-036 | CU-UI-012 (certificación, Fase 2) |
| RC-020 | CU-UI-016 (ranking, Fase 3) + BR-002 pendiente |

### Items NO promovidos (quedan en staging para revisión futura)

- RC-002, RC-003, RC-004 — contexto histórico (sin valor de RF directo).
- RC-005, RC-006, RC-007 — preferencias de tooling (no son requisitos, son decisiones técnicas).
- RC-012 — pregunta, no requerimiento.
- RC-023 — implícito en modelo (un usuario con múltiples roles).
- RC-032 — vinculado a CBR-007 / BR-017 Fase 2.
- RC-034 — restricción del MVP, capturada en `00_fundamentos.md § Métrica de éxito del MVP`.
- RC-042, RC-043 — RC-053 — definiciones técnicas absorbidas en CU/RF.

# Requerimientos crudos — reunión-01

> Material pre-clasificación. **Todo lo extraído es requerimiento (pedido), NO requisito**. La validación, traducción y promoción a `05_negocio/`, `06_usuario/`, `07_software/` la hace `clasificar-requisitos`.
>
> **Convención:**
> - `RC-NNN`: ID del requerimiento crudo (no se reusa).
> - Nivel: `N`=Negocio · `U`=Usuario · `S`=Software · `?`=ambiguo.
> - Tipo: `F`=Funcional · `NF`=No funcional · `BR`=Regla de negocio · `?`=ambiguo · `MIX`=mezcla.
> - Confianza: `A`=Alta (la cita lo dice claro) · `M`=Media (requiere interpretación razonable) · `B`=Baja (asumido).

## Tabla principal

| ID | Spk | Línea | Cita literal (fragmento) | Nivel | Tipo | Confianza | Notas |
|----|-----|-------|--------------------------|-------|------|-----------|-------|
| RC-001 | A | L5 | "machar este proyecto con los plazos que tenés con el colegio de arquitectos" | N | BR | A | Restricción de tiempo. Origen del Hito 1 + Hito 2. |
| RC-002 | C | L23 | "estamos en una etapa realmente donde está desarrollándose todo" | N | ? | A | Justifica no separar células de desarrollo y mantenimiento. |
| RC-003 | D | L41 | "actualmente la marca tasación inmuebles ya está, como tenemos el dominio, había algo ya hecho" | N | ? | A | Dominio `tasacioninmuebles.com` ya en poder de la sociedad. |
| RC-004 | D | L49 | "hay que hacerlo de nuevo. Es mejor hacerlo de nuevo que agarrar eso y malgastarlo" | N | ? | A | Decisión: rehacer la maqueta vieja desde cero. |
| RC-005 | D | L59 | "nuestra idea sería meter AWS en algunas cosas y tener repositorio en GitLab con el CI/CD armado" | S | NF | A | Infra/tooling: AWS + GitLab CI/CD. Restricción técnica. |
| RC-006 | D | L73 | "somos muy open source de la forma en la que tratamos de usar, no sé, no pagamos ninguna herramienta básicamente" | N | NF | A | Preferencia de stack: open source / gratuito. |
| RC-007 | D | L81 | "para mí un Trello, para tablero, me torqué acá... acá tiene que andar el producto y eso es lo fundamental" | N | ? | A | Política de no-overhead en tooling de seguimiento. |
| RC-008 | C | L105 | "ya nosotros ya no codificamos, nosotros nos dedicamos al análisis y usamos una metodología que se denomina SDD, se llama Spectrum Development, significa desarrollo orientado a las especificaciones" | N | ? | A | Metodología SDD impuesta por Franco. **Cita literal preservada**, pero el término correcto es **Spec-Driven Development** (no "Spectrum") — error de reconocimiento de voz del transcript. Ver [[T-025]]. |
| RC-009 | C | L119 | "para el MVP nos enfoquemos en los casos de uso, la metodología de casos de uso, no metodología de historia de usuario" | N | ? | A | Casos de uso > Historias de usuario en Fase 1. |
| RC-010 | D | L127 | "la app va a apuntar a Mobile First, una vista donde se cargue la propiedad con estos formularios" | U | NF | A | Mobile-first para el flujo del tasador. |
| RC-011 | D | L127 | "los datos que le va a pedir básicamente son fotos del inmueble, una descripción del inmueble, toda la info que se le pueda dar que lleve a ver si los materiales, todas esas cosas va dentro de la descripción, la geolocalización" | U | F | A | Datos a recolectar en nueva tasación. |
| RC-012 | C | L129 | "¿Cuál es lo principal? ¿Uber de tasación o autotasador?" | N | ? | A | Pregunta clave que dispara priorización. |
| RC-013 | D | L131 | "tenemos que resolver el core, que va a ser ese, el núcleo va a ser la IA que tase, y yo entiendo que después va a tener que resolver... pero por prioridades sería la lógica de la urbanización" | N | ? | A | Prioridad: Uber primero, IA después (Fase 2). |
| RC-014 | B | L133 | "el vago pueda apretar y loguearse... ir a hacer la tasación. Que releve los datos, que guarde los datos, y si se comunica con la IA o no, no hay problema en esta primera instancia porque los datos van a quedar guardados" | U | F | A | MVP: relevamiento + guardado, sin IA real. |
| RC-015 | B | L163 | "el robotomus, ¿qué hace? El robotomus agarra y dice: a ver, ¿qué hizo Cristian?... lo ordena todo y lo enchufa. Casa, casa, 3 dormitorios, 3 dormitorios, va llenando porque eso fue textual, fue describiendo, llenó la ficha" | S | F | M | Robotomus parsea descripción libre → llena ficha estructurada. |
| RC-016 | B | L163 | "hicimos una base de datos intermedia que se llama Métricas... no le va a preguntar a inmoclick, le va a preguntar a métricas y chao" | S | NF | A | Capa intermedia de datos pre-agregada (cachés por zona/tipo). |
| RC-017 | B | L163 | "Vamos a tener un valor de mercado, un valor técnico de tasación de arquitectos, validado por el Colegio de Arquitectos" | U | F | A | Doble índice: Robotomus (mercado) + Fitt-Servini (técnico Colegio). |
| RC-018 | B | L163 | "robotomus hace un scraping, agarra y busca valores de mercado publicados" | S | F | A | Robotomus consulta portales scrapados. Vinculado a riesgo legal S-020. |
| RC-019 | B | L171 | "tasación inmuebles nuestro... Agarra esa solicitud, se fija todos los tasadores en la zona... el solicitante podría elegir si quiere la inmobiliaria que le tase o el tasador que le tase, porque podemos hacer una red de tasadores" | U | F | A | Match Uber: asigna tasador por zona + permite elección manual. |
| RC-020 | B | L171 | "cualquiera que nosotros vamos a verificar que esté matriculado. De hecho, le vamos a dar un curso de uso de la plataforma" | N | BR | A | Verificación de matrícula + capacitación obligatoria del tasador. |
| RC-021 | B | L191 | "el acuerdo con el Colegio de Arquitectos, un acuerdo que yo me siento con ustedes acá en el café... 6 meses, ya hemos consumido casi un mes o 25 días, no sé cuánto habrá pasado de la firma" | N | BR | A | Acuerdo 6 meses. Origen de Hito 2 (~2026-10-19). |
| RC-022 | B | L195 | "un sistema tipo Uber es lo que más se nos acomoda porque están los mostradores bien definidos" | N | ? | A | Arquitectura conceptual: Uber-like. |
| RC-023 | B | L195 | "un tasador puede ser tasador, pero puede ser consumidor de la tasación" | U | F | A | Un mismo usuario puede tener múltiples roles (tasador + cliente). |
| RC-024 | A | L197 | "tenés como ciertas entidades... una entidad es una inmobiliaria, un banco, son clientes que a su vez agrupan inmuebles para publicar. Además tienen tasadores habilitados para su, porque no tasan con cualquiera, tasan con lo que ellos quieren tasar habitualmente. Ese tasador a su vez puede tasar para esa entidad o para otra" | N | F | A | Modelo Entidad B2B: agrupa inmuebles + tasadores. Un tasador puede pertenecer a varias entidades. |
| RC-025 | B | L199 | "primer burbuja sería el tasador... segunda burbuja, que es el owner de esa empresa que tiene 100 flacos... esa agencia REMAC forma parte de todos los REMAC de Argentina" | N | F | A | Jerarquía potencial 3 niveles: tasador → owner sucursal → owner red. |
| RC-026 | B | L207 | "en el caso nuestro de tasación inmueble Uber, va a ser 90% para el tasador, 10% para tasa inmueble" | N | BR | A | **Constante: 90/10**. Tipo cálculo. |
| RC-027 | A | L209 | "si vos tenés una inmobiliaria, la inmobiliaria va a haber una repartija" | N | BR | M | El modelo 90/10 cambia cuando el tasador es de una inmobiliaria — reparto a definir. Vinculado a S-019 (riesgo desfavorecidos). |
| RC-028 | B | L215 | "vengan empresas que nos contraten un paquete de tasaciones mensuales, sí, y que quieran pagar a fin de mes o que quieran pagar al principio. Entonces, como una suscripción" | N | F | M | Modelo de suscripción B2B con paquetes mensuales. |
| RC-029 | B | L219 | "página web de tasacioninmuebles.com, si vos eras particular, vos podías solicitar un tasador... medio que ya pasaba al proceso físico, el tasador te llamaba" | U | F | M | Captación: particular solicita y un humano lo llama (modelo viejo). |
| RC-030 | B | L223 | "primero te daba el QR, vos pagabas y te llegaba el informe" | U | F | A | Pago previo (QR) → entrega informe. |
| RC-031 | B | L223 | "si ese informe querías que fuese firmado por un colegiado, pagabas el plus y venía la firma del colegiado" | N | BR | A | Tasación certificada = simple + plus por firma. |
| RC-032 | B | L227 | "no es lo mismo tasar un castillo de 1500 metros cuadrados cubiertos que una casa de 100 metros cuadrados cubiertos. Entonces esas tabulaciones... el sistema va a ir aprendiendo, las vamos a tener que tener porque la tasación no es fija" | N | BR | A | **Tarifa variable por superficie**. Origen de Q04 modelo monetización. |
| RC-033 | B | L227 | "le tengo que cobrar un plus por distancia... el tasacion inmueble va a evitar eso porque... le va a asignar un tasador de La Valle, no va a asignar un tasador de acá" | N | BR | A | Distancia se mitiga por asignación geográfica del Uber. |
| RC-034 | D | L247 | "hoy por hoy el convenio que tenemos con Ingeniería de Arquitectos no nos podemos saltear. Tazadores, por lo cual vamos a obeliscar esa parte" | N | BR | A | MVP solo arquitectos del Colegio. Restricción contractual. |
| RC-035 | B | L251 | "Tasa inmuebles es una herramienta del sistema, no sería una persona física que pueda firmar y hacerse responsable de la tasación. Para hacerse responsable... ir in situ, ir hasta el inmueble" | N | BR | A | Inspección ocular del colegiado = condición necesaria para certificación. |
| RC-036 | B | L251 | "de 20.000 va a pasar a valer 300.000, es decir, va a tener que pagar 280.000 pesos más por la firma" | N | BR | M | **Constantes: $20.000 simple / $300.000 certificada**. Indicativas, no normativas. |
| RC-037 | B | L267 | "este es el dashboard para el tasador inmobiliario, para el owner sería acá... yo acá tengo todos los tasadores. Silvana Pacheco tasó una casa y está en para comité de tasación, todavía no se la ha valorado, por eso el color" | U | F | A | Dashboard owner: lista de tasaciones de tasadores con estado por color. |
| RC-038 | B | L271 | "Acá podés filtrar por lo que querás. O querés filtrar por, a ver, todas las tasaciones de casa" | U | F | A | Filtros de dashboard. |
| RC-039 | B | L275 | "este mes hemos llevado tasado 20 inmuebles... Comparación versus mes anterior" | U | F | A | KPIs sugeridos: tasaciones mes, comparación período. |
| RC-040 | B | L287 | "tiempo promedio de tasación, zonas más tasadas" | U | F | A | KPIs adicionales del dashboard owner. |
| RC-041 | C | L285 | "si supongamos soy dueño de 2 inmobiliarias... tendría que ir arriba a la derecha y elijo qué inmobiliaria, entonces los datos se refrescan con los datos de la otra inmobiliaria" | U | F | M | Multi-tenant selector por usuario (estilo Google Workspace). |
| RC-042 | C | L289 | "esas métricas son fijas o les gustaría que sean variables? Porque ponele que pase un cliente y se le ocurre una métrica que nosotros no" | U | F | M | Dashboards con métricas configurables. Postergado por Cocucci. |
| RC-043 | C | L293 | "La aplicación mobile es el punto copado de todo esto. El dashboard está buenísimo, pero el dashboard te va a andar cuando ya tengas datos corriendo" | N | ? | A | Priorizar mobile en MVP por encima de dashboard. |
| RC-044 | B | L319 | "nueva tasación, ¿qué tipo de inmueble? ¿Casa, departamento, terreno, galpón, local, oficina?" | U | F | A | **Tipos de inmueble (catálogo)**: casa, depto, terreno, galpón, local, oficina. |
| RC-045 | B | L323 | "mi idea es dar las dos opciones. Si quieren llenar un formulario así como está acá, que lo llenen, pero mi idea es que describan el inmueble y a partir de la descripción nosotros podemos dejar... poner a robotomus como asistente para decir: ¿querés que te ayudo con la descripción del inmueble?" | U | F | A | Doble flujo: formulario manual o descripción libre asistida por IA. |
| RC-046 | B | L327 | "casa, acá pongo qué motivo: tasación para venta, tasación para alquiler, particulares para asesoramiento de valores, tasación para empresas, expropiaciones, divisiones, fraccionamientos, estudios, tasación judicial extrajudicial" | U | F | A | **Motivos de tasación (catálogo)**: 10 tipos (cierra Q03). |
| RC-047 | B | L327 | "Ubicación, acá tocabas ubicación, geolocalizabas en el mapa así y ya registrabas la ubicación" | U | F | A | Geolocalización via tap en mapa. |
| RC-048 | B | L327 | "Detalles, superficie total, superficie construible, pim pum pam" | U | F | A | Campos de detalle: superficie total + superficie construible (mínimo). |
| RC-049 | C | L329 | "no es lo mismo crear una inspección pendiente que guardarla y darla como finalizada. ¿O cuándo finaliza una inspección?" | S | F | A | Pregunta sobre estados — gatilla Q02 (estados del workflow). |
| RC-050 | B | L331 | "La inspección finaliza cuando ya te fuiste de la casa. Lo que pasa que ahí quedan los datos guardados del relevamiento, pero no está tasada. Bien, eso es inspección ocular, relevamiento documentado. Bien, pasa al estado, pasa al estado a tasar o por tasar, entra en una lista de tasaciones" | S | F | A | Definición canónica del estado "inspección hecha" + transición a "por tasar". |
| RC-051 | B | L339 | "comité de tasación... aparece robotomus. ¿Qué dice robotomus? Te da un valor, y acá te dice cantidad de valoración... la valoración es nula. Si no te dice que es regular, si no te dice que es más o menos buena, si no te dice que es buena o si no te dice que es excelente" | U | F | M | Indicador 4-niveles de calidad Robotomus: nula/regular/buena/excelente. |
| RC-052 | C | L341 | "machine learning eso se llama inferencia. La inferencia es, en base a datos históricos, en base a lo que veo en internet, estimo con un porcentaje de confianza que este valor vale esto. Y la confianza va del 90 al 99%" | S | NF | A | Definición técnica de inferencia + rango de confianza esperado 90-99%. |
| RC-053 | C | L349 | "la calidad de inferencia, casi nunca... ¿por qué sería mala o por qué debería ser mala? Porque faltan datos del lado del usuario, no porque esté mal entrenado" | N | BR | A | **Regla**: confianza del modelo se calcula sobre completitud de variables del usuario, no calidad del entrenamiento. |
| RC-054 | C | L361 | "Legalmente no se puede hacer. Esa es la respuesta corta... Con fines académicos" | N | BR | A | Scraping de portales = legalmente cuestionable. Vinculado a DS-03 + Ley 25.326. |
| RC-055 | B | L371 | "Flujo de nueva tasación: inicio nueva tasación, geolocalizar inmueble, completar datos básicos, asistente ayuda IA, subir fotografías, guardar borrador, enviar a comité. Flujo comité de tasación: tasación recibida, revisión del inmueble, consulta robotomus IAA, consulta valor colegio de arquitectos, discusión comité, definir valor final, guardar resolución, generar PDF, compartir al cliente" | U | F | A | **Flujos canónicos del MVP** end-to-end. |

## Items que NO entran al MVP-6sem (Won't / Could del MoSCoW)

| ID origen | Por qué se difiere |
|-----------|---------------------|
| RC-015 | Robotomus IA real (Fase 2 dual-track). MVP usa "promedio fake" del transcript L377. |
| RC-016 | Base intermedia Métricas (Fase 2). |
| RC-018 | Scraping de portales (Fase 2-3, depende de DS-03). |
| RC-020 (parcial) | Curso de uso formal — se cubre con onboarding manual del MVP. |
| RC-025 | Jerarquía 3 niveles (Q01 — Fase 3, alcance plano por ahora). |
| RC-027 | Reparto distinto cuando hay inmobiliaria intermedia (DS-02, Fase 2). |
| RC-028 | Suscripción B2B (Fase 2 contable). |
| RC-029 | Captación humana de particulares (Fase 2+). |
| RC-030 | Pago QR (Fase 2 contable). |
| RC-031 | Firma colegiada certificada (Fase 2+). |
| RC-032 | Tarifa variable por superficie (Fase 2). |
| RC-035 | Inspección ocular formal (Fase 2). |
| RC-039–042 | Métricas avanzadas y multi-tenant (Fase 2). |
| RC-051–053 | Indicador de calidad Robotomus + inferencia con confianza (Fase 2). |

## Items que SÍ entran al MVP-6sem (Must)

RC-005, RC-008, RC-009, RC-010, RC-011, RC-014, **RC-017 (Fitt-Servini calculado automáticamente vía RF-016, decisión 2026-05-14)**, RC-019 (match simplificado), RC-021, RC-022, RC-023 (mínimo), RC-024 (plano), RC-026 (registro, no cálculo automático), RC-034, RC-037, RC-044, RC-045 (formulario + IA descripción), RC-046 (10 tipos catálogo), RC-047 (geo), RC-048 (campos básicos), RC-049+RC-050 (estados mínimos), RC-055 (flujos canónicos).
