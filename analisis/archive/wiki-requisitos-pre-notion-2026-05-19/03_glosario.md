---
artefacto: glosario
iniciativa: tasa-inmuebles
estado: borrador
version: 2
ultima_modificacion: 2026-05-14
skill_responsable: armar-glosario
total_terminos: 38
pendientes_de_definicion: 0
source_transcripts:
  - ../../analisis/reunion-01/transcript.txt
fuentes_complementarias:
  - ../../analisis/“Tasa Inmuebles…pdf
  - ../00_fundamentos.md
  - ../01_stakeholders/matriz-poder-interes.md
  - ../staging/glosario-candidato.md
  - ../../analisis/imgs/ (capturas WhatsApp de maqueta vieja)
terminos_protegidos:
  - T-013 Inmoclick
  - T-016 Métricas
  - T-023 Robotomus
changelog:
  v2: "Agregado T-032 Solicitante (también Referente) tras cierre de A-016."
  v3: "Agregados T-033 Mis tasaciones, T-034 Dashboard Owner web, T-035 Dashboard Owner mobile primitiva. Resuelve la ambigüedad de 'dashboard' detectada por Franco (2026-05-14)."
  v4: "Agregados T-036 Tasación referencial, T-037 Cliente B2C, T-038 Generada (estado). Tras decisión de Franco de sumar autotasador al MVP con MOBILE-ONLY + login bifurcado (2026-05-14). T-020 Particular actualizado como sinónimo informal de T-037. T-017 Mobile First extiende cobertura al Cliente B2C."
---

# 03 — Glosario (LEL — Léxico Extendido del Lenguaje)

> Vocabulario canónico del dominio de Tasa Inmuebles. **Toda mención** de un término del dominio en otro artefacto (CU, RF, BR, AC) debe hipervincularse con `[[T-NNN]]`. Las skills `validar-consistencia` y `clasificar-requisitos` usan este glosario para chequear términos no definidos.
>
> **Categorías LEL:** `Sujeto` (actor) · `Objeto` (cosa, dato, documento) · `Verbo` (acción) · `Estado` (situación temporal).
> **Términos protegidos:** nombres propios internos del producto que no se traducen ni reemplazan por sinónimos.

---

## T-001 — Acuerdo (con el Colegio de Arquitectos)

- **Categoría:** Objeto
- **Noción:** Convenio formal de 6 meses firmado entre Cristian Cocucci y el [[T-004]] que habilita la colaboración profesional para el desarrollo del MVP de [[T-021]]. Fecha estimada de firma: 2026-04-19 (a confirmar).
- **Impacto:** De su firma derivan los hitos del proyecto. **Hito 1** (MVP demo) ~2026-06-25. **Hito 2** (cierre del acuerdo) ~2026-10-19. Si el acuerdo se cierra antes de Hito 2 sin renovación, el MVP debe estar funcional.
- **Sinónimos:** Convenio · Contrato de colaboración Cocucci-Colegio
- **Relacionados:** [[T-004]] · [[T-018]]
- **Menciones:** transcript:L191 (Cocucci)
- **Confianza:** Alta

## T-002 — Borrador

- **Categoría:** Estado
- **Noción:** Estado inicial de una [[T-026]] recién creada por un [[T-028]] mientras todavía no se completó la inspección ocular ni se enviaron los datos al comité. Permite edición libre por parte del tasador autor.
- **Impacto:** Una tasación en Borrador es editable, no es visible en el comité, no genera notificaciones a otros tasadores. Transiciona a [[T-014]] cuando el tasador se retira del inmueble y guarda los datos relevados.
- **Sinónimos:** —
- **Relacionados:** [[T-014]] · [[T-022]] · [[T-026]]
- **Menciones:** transcript:L329-331 (Cocucci, Franco)
- **Confianza:** Alta

## T-003 — Caso de uso

- **Categoría:** Objeto
- **Noción:** Unidad de especificación funcional con la estructura `caso → requisitos → precondiciones → poscondiciones → resultado`. Captura el valor que el sistema entrega a un actor en un escenario concreto. **Reemplaza** a las historias de usuario durante la Fase 1.
- **Impacto:** Es el artefacto principal del nivel Usuario en la pirámide IR. Se escribe **al nivel "valor"** (no fully-dressed) por defecto, salvo el flujo crítico de nueva tasación que va fully-dressed.
- **Sinónimos:** CU · CU-UI · Use Case (Cockburn)
- **Relacionados:** [[T-025]] · [[T-018]]
- **Menciones:** transcript:L119 (Franco), L113 (Cocucci)
- **Confianza:** Alta

## T-004 — Colegio de Arquitectos

- **Categoría:** Sujeto
- **Noción:** Institución profesional argentina que matricula y regula a arquitectos colegiados. Partner inicial del proyecto: provee a los ~10 arquitectos usuarios del MVP-6sem y aporta validación profesional / homologación del producto.
- **Impacto:** Su acuerdo con Cocucci ([[T-001]]) define los hitos del proyecto. Es **stakeholder S-012** (clase favorecido, cuadrante Involucrar). Una mala demo del MVP daña la reputación del Colegio y arriesga la firma de Hito 2.
- **Sinónimos:** Colegio · CdA
- **Relacionados:** [[T-001]] · [[T-018]] · [[T-028]] · [[T-030]] (su fórmula técnica)
- **Menciones:** transcript:L171, L191; CLAUDE.md §3
- **Confianza:** Alta

## T-005 — Comisión

- **Categoría:** Objeto
- **Noción:** Porcentaje del cobro de una [[T-026]] que retiene la [[T-021]]. **Fija en 10%** según regla CBR-003. El [[T-028]] recibe el 90% restante. Excepción: cuando el tasador pertenece a una inmobiliaria intermedia, el 90% se subdivide entre ambos según acuerdo (CBR-004, pendiente DP-002).
- **Impacto:** Modelo de monetización principal del producto. Genera registro contable obligatorio (RG-004). Restructura el reparto histórico 50/50 del modelo inmobiliario tradicional (riesgo de boicot — stakeholder desfavorecido S-019).
- **Sinónimos:** Fee · Comisión de plataforma
- **Relacionados:** [[T-021]] · [[T-026]] · [[T-028]]
- **Menciones:** transcript:L207 (Cocucci); CBR-003, CBR-004
- **Confianza:** Alta

## T-006 — Comité de tasación

- **Categoría:** Sujeto / Estado
- **Noción:** Grupo de tasadores que se reúne (presencial o por videoconferencia) para revisar y validar el valor final propuesto para una [[T-026]] específica. También nombra el **estado** en que se encuentra una tasación durante esa revisión (ver [[T-009]]).
- **Impacto:** En el MVP el comité es **manual** (sin [[T-023]] real, sin votación electrónica). En Fase 2+ se diseñará UX colaborativa (DP-010 pendiente). El acta del comité es input obligatorio para la generación del PDF final.
- **Sinónimos:** Comité · Mesa de tasación
- **Relacionados:** [[T-009]] · [[T-023]] · [[T-026]] · [[T-029]] · [[T-030]]
- **Menciones:** transcript:L339, L371 (Cocucci)
- **Confianza:** Alta

## T-007 — Compartida

- **Categoría:** Estado
- **Noción:** Estado final de una [[T-026]] después de que el PDF se generó y se entregó al cliente (particular, banco, inmobiliaria). La tasación ya no es editable en este estado.
- **Impacto:** Una vez compartida, cualquier modificación requiere abrir una nueva versión de la tasación (versionado — pendiente, decisión latente del 00_preguntas_pendientes.md). El registro queda inmutable para auditoría.
- **Sinónimos:** Entregada · Cerrada
- **Relacionados:** [[T-027]] · [[T-026]]
- **Menciones:** transcript:L371; PDF Cocucci §5 (flujo comité)
- **Confianza:** Alta

## T-008 — Confianza (de la inferencia)

- **Categoría:** Objeto
- **Noción:** Porcentaje declarado por el modelo [[T-023]] que indica qué tan completos son los datos de entrada del usuario respecto al universo de variables que el modelo espera. Rango esperado: **90–99%** (CBR-011). Se calcula sobre **completitud de variables**, no sobre calidad del entrenamiento (CBR-010).
- **Impacto:** Se muestra al [[T-006]] como indicador de cuánto confiar en el valor referencial de Robotomus. En el MVP no se calcula (Robotomus es placeholder); aparece como Fase 2.
- **Sinónimos:** % de confianza · Calidad de inferencia
- **Relacionados:** [[T-012]] · [[T-023]] · [[T-029]]
- **Menciones:** transcript:L341 (Franco), L349 (Franco)
- **Confianza:** Alta

## T-009 — En comité

- **Categoría:** Estado
- **Noción:** Estado de una [[T-026]] en el que fue enviada al [[T-006]] y está siendo discutida o votada. Sub-estados posibles (DP-010, pendiente): esperando-tasadores, listo-para-votar, votada.
- **Impacto:** Bloquea la edición por parte del tasador autor. Los participantes del comité pueden agregar observaciones y propuestas de valor. Transiciona a [[T-027]] cuando se cierra el valor final.
- **Sinónimos:** En revisión de comité
- **Relacionados:** [[T-006]] · [[T-022]] · [[T-027]]
- **Menciones:** transcript:L331-339
- **Confianza:** Alta

## T-010 — Entidad

- **Categoría:** Objeto / Sujeto
- **Noción:** Cliente B2B que agrupa inmuebles, tasadores habilitados y owners. Ejemplos: una inmobiliaria (Remax), un banco (Galicia), una constructora, el Poder Judicial, el propio [[T-004]]. Un [[T-028]] puede pertenecer a varias entidades.
- **Impacto:** En Fase 1 el modelo es **plano** (Entidad → N tasadores + Owner). En Fase 3 puede evolucionar a jerárquico (2 niveles: red → sucursal). Cada entidad tiene su propio dashboard agregado.
- **Sinónimos:** Cliente corporativo · Organización
- **Relacionados:** [[T-019]] · [[T-028]] · [[T-005]]
- **Menciones:** transcript:L197 (Sebastián), L199 (Cocucci)
- **Confianza:** Alta

## T-011 — Fitt y Servini

- **Categoría:** Objeto
- **Noción:** Autores del manual estándar argentino de tasación técnica. Su fórmula determinística (m² cubiertos × categoría × coeficientes de antigüedad, frente/fondo, etc.) es el **valor técnico canónico** que usan los arquitectos del [[T-004]].
- **Impacto:** **En MVP-6sem el sistema calcula la fórmula automáticamente** (RF-016) usando una versión simplificada "Fitt-Servini lite" — la tabla de valor/m² por tipo + categoría + zona está hardcodeada y se carga junto con un arquitecto del Colegio antes del Hito 1 (DS-08 pendiente). En Fase 2 se refina (coef frente/fondo dinámico, tipo de cambio API, tabla administrable). Decisión actualizada el 2026-05-14 (Franco): la fórmula entra al MVP como diferenciador.
- **Sinónimos:** Manual de tasación técnica del Colegio · Fórmula Fitt-Servini · Fitt-Servini lite (versión MVP)
- **Relacionados:** [[T-030]] · [[T-004]]
- **Menciones:** transcript:L163 (Cocucci); RF-016 (implementación MVP).
- **Confianza:** Alta

## T-012 — Inferencia

- **Categoría:** Verbo / Objeto
- **Noción:** En machine learning, estimación de un valor (precio del inmueble) a partir de datos históricos + datos del usuario, con un porcentaje de [[T-008]] asociado. Es la operación principal de [[T-023]].
- **Impacto:** Cada llamada a Robotomus genera una inferencia con `(valor_estimado, % confianza, datos_usados_para_inferir)`. Auditable: el resultado se guarda con su input.
- **Sinónimos:** Predicción · Estimación
- **Relacionados:** [[T-008]] · [[T-023]] · [[T-029]]
- **Menciones:** transcript:L341 (Franco)
- **Confianza:** Alta

## T-013 — Inmoclick **(término protegido)**

- **Categoría:** Objeto / Sujeto
- **Noción:** Base de datos histórica propietaria de Cristian Cocucci con ~20 años de antigüedad y más de 400 inmobiliarias publicadoras. Fuente primaria de datos para entrenar el modelo de [[T-023]].
- **Impacto:** Las 400+ inmobiliarias publicadoras son stakeholder silencioso S-022 (clase desfavorecido): sus datos alimentan al modelo que compite con ellas. Decisión legal pendiente DS-03 sobre TOS históricos y anonimización.
- **Sinónimos:** (nombre propio, no se traduce ni se sustituye)
- **Relacionados:** [[T-016]] · [[T-023]] · [[T-024]]
- **Menciones:** transcript:L163 (Cocucci), L351 (Cocucci); CLAUDE.md §2
- **Confianza:** Alta

## T-014 — Inspección hecha

- **Categoría:** Estado
- **Noción:** Estado de una [[T-026]] cuando el [[T-028]] ya completó la inspección ocular en el inmueble y guardó los datos relevados (geolocalización + datos + descripción + fotos). Aún no fue tasada por el comité.
- **Impacto:** Es la transición que habilita el envío a [[T-006]]. Para una [[T-026]] **certificada** ([[T-015]]), este estado requiere visita física del colegiado; para una **simple**, basta con relevamiento mobile.
- **Sinónimos:** Relevamiento documentado · Inspección completada
- **Relacionados:** [[T-002]] · [[T-022]] · [[T-015]]
- **Menciones:** transcript:L329-331 (Cocucci)
- **Confianza:** Alta

## T-015 — Inspección ocular

- **Categoría:** Verbo
- **Noción:** Visita física del [[T-028]] al inmueble para relevar datos in situ (estado del inmueble, materiales, fotos reales, geolocalización). Para una [[T-026]] **certificada**, esta visita es realizada por un colegiado y es **requisito legal** de su firma profesional (CBR-005).
- **Impacto:** Diferencia entre tasación **simple** (sin colegiado, firmada por la [[T-021]], precio bajo) y **certificada** (con colegiado, firma profesional, precio significativamente mayor — CBR-013). En el MVP-6sem solo se prueba el flujo simple.
- **Sinónimos:** Visita ocular · Relevamiento in situ
- **Relacionados:** [[T-014]] · [[T-026]] · [[T-028]]
- **Menciones:** transcript:L251 (Cocucci)
- **Confianza:** Alta

## T-016 — Métricas **(término protegido)**

- **Categoría:** Objeto
- **Noción:** Base de datos intermedia agregada (a reconstruir) que pre-procesa los datos de [[T-013]] en estructuras consultables rápidamente: agregados por zona, por tipo de inmueble, por m² cubierto, por período. Capa entre Inmoclick y [[T-023]].
- **Impacto:** Sin Métricas, las consultas de Robotomus contra Inmoclick directamente serían inaceptablemente lentas para el flujo del [[T-006]] (CAC-001 pendiente Planguage). Está fuera del MVP-6sem.
- **Sinónimos:** (nombre propio, no se traduce)
- **Relacionados:** [[T-013]] · [[T-023]]
- **Menciones:** transcript:L163 (Cocucci)
- **Confianza:** Alta

## T-017 — Mobile First

- **Categoría:** Objeto / Atributo
- **Noción:** Política de diseño con tres consecuencias concretas:
  1. **Todo el flujo del [[T-028]] Tasador es exclusivamente app mobile.** [[T-033]] Mis tasaciones, CU-UI-001 Nueva tasación, CU-UI-004 Comité — todo se opera desde el celular. **No hay versión web del tasador**.
  2. **Todo el flujo del [[T-037]] Cliente B2C es exclusivamente app mobile** (decisión 2026-05-14). Mismo cliente que el tasador con CTA bifurcado al iniciar app: "Soy tasador" / "Soy cliente". Sin web pública en MVP. **Captación web (SEO, landing) → Fase 2.**
  3. **El [[T-019]] Owner B2B tiene dos canales** (Fase 2): [[T-034]] Dashboard web (uso primario, escritorio, vista completa) + [[T-035]] Dashboard mobile primitivo (embebido en la app del tasador, para owners que también tasan).
- **Impacto:** Afecta selección de stack (frontend), patrones de UI (touch-first, formularios verticales) y AC de performance (CAC-003 pendiente). **El MVP-6sem es 100% mobile para los dos roles activos del producto (Tasador y Cliente B2C).** Owner B2B aparece recién en Fase 2.
- **Sinónimos:** Mobile-first · MF
- **Relacionados:** [[T-026]] · [[T-028]] · [[T-037]] · [[T-021]] · [[T-033]] · [[T-034]] · [[T-035]]
- **Menciones:** transcript:L127 (Speaker D), L385 (Cocucci)
- **Confianza:** Alta

## T-018 — MVP

- **Categoría:** Objeto
- **Noción:** Producto Mínimo Viable. En este proyecto, el subset funcional entregable para la **demo al [[T-004]]** (Hito 1, 2026-06-25, 6 semanas desde reunión-01). Definido por la métrica de éxito: ~10 arquitectos completan un flujo nueva tasación end-to-end sobre inmuebles reales.
- **Impacto:** Es la unidad de priorización MoSCoW de la iniciativa. Todo candidato a RF/CU/BR pasa por el filtro "¿esto entra al MVP-6sem?". Lo que no entra se difiere a Fase 2+.
- **Sinónimos:** MVP-6sem · MVP-Colegio · Hito 1
- **Relacionados:** [[T-001]] · [[T-004]] · [[T-003]]
- **Menciones:** transcript:L13, L375 (Cocucci)
- **Confianza:** Alta

## T-019 — Owner

- **Categoría:** Sujeto
- **Noción:** Persona dueña o responsable de una [[T-010]] (inmobiliaria, banco, constructora). Tiene acceso al dashboard agregado de todos los tasadores que pertenecen a su entidad y a las tasaciones que se hicieron bajo su organización.
- **Impacto:** El owner es decisor B2B. En Fase 2, owners de múltiples entidades pueden alternar entre ellas vía selector (CRF-016). Es el principal consumidor de KPIs y métricas avanzadas.
- **Sinónimos:** Dueño · Responsable · CEO de la inmobiliaria
- **Relacionados:** [[T-010]] · [[T-028]]
- **Menciones:** transcript:L267 (Cocucci), L275 (Cocucci)
- **Confianza:** Alta

## T-020 — Particular

- **Categoría:** Sujeto
- **Noción:** Término **informal** del dominio inmobiliario para cliente final no-corporativo (en oposición a Empresas / Entidades B2B [[T-010]]). En **el modelo de datos del producto** se usa el rol técnico [[T-037]] **Cliente B2C** como sinónimo formal — esa es la palabra que aparece en RFs y en código. "Particular" se mantiene en docs de negocio y conversaciones con stakeholders.
- **Impacto:** Es el destinatario natural del PDF de tasación profesional (CU-UI-005) y el usuario activo del flujo de autotasación (CU-UI-014 → [[T-036]] Tasación referencial). **En MVP-6sem es usuario activo del producto vía login B2C** (decisión 2026-05-14). Stakeholder S-007 promovido de "mantener informado" a **"involucrar"** (poder y interés ambos medios-altos).
- **Sinónimos:** [[T-037]] Cliente B2C (sinónimo técnico formal) · Cliente final · Solicitante
- **Relacionados:** [[T-026]] · [[T-021]] · [[T-037]] · [[T-036]]
- **Menciones:** transcript:L219, L251 (Cocucci); PDF Cocucci §2B; CU-UI-014.
- **Confianza:** Alta

## T-021 — Plataforma

- **Categoría:** Objeto
- **Noción:** Tasa Inmuebles como producto/sistema completo. Cocucci la distingue explícitamente de "una persona física que pueda firmar y hacerse responsable" — la plataforma firma como sistema, no como profesional matriculado.
- **Impacto:** Define el sujeto que cobra la [[T-005]], administra usuarios, registra tasaciones, genera PDFs simples. Una tasación firmada por la plataforma (sin [[T-015]]) es **simple**; para que sea **certificada** requiere firma de un colegiado.
- **Sinónimos:** Sistema · Producto · Tasa Inmuebles
- **Relacionados:** [[T-005]] · [[T-015]] · [[T-026]]
- **Menciones:** transcript:L251 (Cocucci)
- **Confianza:** Alta

## T-022 — Por tasar

- **Categoría:** Estado
- **Noción:** Estado intermedio de una [[T-026]] que ya tuvo [[T-014]] y entra a la lista de espera para ser tomada por el [[T-006]]. Aún no se inició el proceso de discusión.
- **Impacto:** En el MVP, todas las tasaciones que pasan a este estado son visibles para los ~10 arquitectos del Colegio. En Fase 2+ puede haber asignación automática por especialización o ranking.
- **Sinónimos:** En cola · Pendiente de comité
- **Relacionados:** [[T-014]] · [[T-009]]
- **Menciones:** transcript:L331 (Cocucci)
- **Confianza:** Alta

## T-023 — Robotomus **(término protegido)**

- **Categoría:** Sujeto
- **Noción:** Módulo interno de IA propio del producto. Tres funciones declaradas: (a) valor referencial automático por inferencia, (b) asistente de descripción del inmueble (parsea texto libre del tasador y completa ficha estructurada), (c) insights de mercado (tendencias, alertas de precio fuera de rango).
- **Impacto:** En el MVP-6sem **se reemplaza por un placeholder** ("promedio fake" según transcript:L377): el comité ve un valor pero no es inferencia real. La versión real es Fase 2 con borde **complejo** del Cynefin → dual-track.
- **Sinónimos:** (nombre propio, no se traduce)
- **Relacionados:** [[T-013]] · [[T-016]] · [[T-012]] · [[T-008]] · [[T-029]]
- **Menciones:** transcript:L163 (Cocucci), L339 (Cocucci), L377 (Franco)
- **Confianza:** Alta

## T-024 — Scraping

- **Categoría:** Verbo
- **Noción:** Extracción automatizada de datos publicados en portales inmobiliarios (ZonaProp, ArgenProp, MercadoLibre Inmuebles, etc.) que alimenta a [[T-016]] y eventualmente a [[T-023]] para enriquecer comparables.
- **Impacto:** Tiene **riesgo legal vigente** según la Ley argentina 25.326 de Protección de Datos Personales (CBR-012). Cocucci lo plantea como pragmático ("se hace"); Franco recuerda que "legalmente no se puede" (transcript:L361). Decisión legal pendiente DP-013 / DS-03. Stakeholder S-020 desfavorecido.
- **Sinónimos:** Web scraping · Crawling de portales
- **Relacionados:** [[T-013]] · [[T-016]] · [[T-023]] · [[T-029]]
- **Menciones:** transcript:L353-365 (Franco, Cocucci)
- **Confianza:** Alta

## T-036 — Tasación referencial

- **Categoría:** Objeto / Tipo
- **Noción:** Variante de [[T-026]] **Tasación** generada por un [[T-037]] **Cliente B2C** desde la app mobile sin tasador profesional ni comité humano. El sistema calcula automáticamente el valor combinando [[T-030]] Valor técnico (Fitt-Servini, RF-016) + [[T-029]] Valor de mercado (Robotomus mock en MVP). Se entrega como PDF con disclaimer "Tasación referencial. No certificada profesionalmente."
- **Impacto:** Es la 2ª línea de producto del MVP-6sem (junto con la tasación profesional). **No es válida legalmente para firma de operaciones** (hipotecas, sucesión, judicial). En Fase 2 puede haber upgrade a certificada (CU-UI-012) pagando plus + inspección ocular de un colegiado.
- **Sinónimos:** Autotasación · Tasación auto-servicio · Tasación sin firma
- **Relacionados:** [[T-026]] · [[T-037]] · [[T-016]] · [[T-023]] · [[T-030]] · [[T-038]]
- **Menciones:** transcript:L223, L251 (Cocucci); CU-UI-014 (caso de uso); RF-019, RF-020 (implementación).
- **Confianza:** Alta

## T-037 — Cliente B2C

- **Categoría:** Sujeto
- **Noción:** Rol técnico del [[T-020]] Particular cuando opera como **usuario autenticado** de la app mobile para hacer [[T-036]] Tasaciones referenciales sobre inmuebles propios o que pretende analizar. Distinto del **Cliente B2B** ([[T-010]] Entidad: bancos, inmobiliarias, juzgados). El término "Cliente B2C" se usa en modelo de datos y RFs; "Particular" se mantiene como sinónimo informal del dominio.
- **Impacto:** Tiene cuenta propia con email + password autoregistrado (RF-018). Cada Cliente B2C ve solo sus tasaciones referenciales. En Fase 2 puede pedir upgrade a tasación profesional certificada con pago.
- **Sinónimos:** Particular ([[T-020]] — alias informal) · Usuario consumidor · End-user del flujo autotasación
- **Relacionados:** [[T-020]] · [[T-036]] · [[T-010]] (Cliente B2B, contraparte)
- **Menciones:** CU-UI-014, CU-UI-018 (login bifurcado); RF-017, RF-018.
- **Confianza:** Alta

## T-038 — Generada (estado de tasación referencial)

- **Categoría:** Estado
- **Noción:** Estado de una [[T-036]] **Tasación referencial** una vez que el sistema completó el cálculo Fitt-Servini + Robotomus mock y persistió el valor. Equivalente conceptual de [[T-027]] **Tasada** pero **sin participación humana** (sin [[T-006]] Comité, sin votación, sin sobrescritura).
- **Impacto:** Una tasación en estado Generada **no transiciona a Tasada** (esa transición solo aplica a profesionales con comité). Puede transicionar a [[T-007]] **Compartida** cuando el [[T-037]] Cliente B2C descarga el PDF o se lo envía a su email. La diferencia con T-027 es clave para reportes y trazabilidad: separa tasaciones humanas validadas vs tasaciones automáticas.
- **Sinónimos:** Calculada · Auto-generada
- **Relacionados:** [[T-036]] · [[T-027]] (NO confundir — diferencia clave es validación humana) · [[T-007]]
- **Menciones:** CU-UI-014; RF-019, RF-020.
- **Confianza:** Alta

## T-033 — Mis tasaciones (pantalla principal de la app mobile)

- **Categoría:** Objeto
- **Noción:** Vista principal de la app mobile del [[T-028]] Tasador, equivalente al `home` de la app. Lista todas las tasaciones propias del tasador autenticado ordenadas por fecha descendente, con filtros básicos (estado, tipo, motivo, fecha) y CTA principal "+ Nueva tasación".
- **Impacto:** Es la primera pantalla que se ve al iniciar sesión (CU-UI-002) y donde se vuelve al guardar (CU-UI-001 paso 13). En MVP-6sem **es la única vista de inicio del tasador** — no hay equivalente web. **No confundir con [[T-034]] Dashboard Owner web ni con [[T-035]] Dashboard Owner mobile embebida**, que son del Owner B2B y aparecen recién en Fase 2.
- **Sinónimos:** Home de la app · Pantalla principal · Listado de mis tasaciones
- **Relacionados:** [[T-026]] · [[T-028]] · [[T-017]] · [[T-034]] · [[T-035]]
- **Menciones:** CU-UI-001 (return point), CU-UI-002 (post-login), CU-UI-003 (caso de uso completo), RF-011 (implementación).
- **Confianza:** Alta

## T-034 — Dashboard Owner versión web (Fase 2+)

- **Categoría:** Objeto
- **Noción:** Vista agregada **completa** del [[T-019]] Owner de una [[T-010]] Entidad. Accesible vía browser desktop. Incluye: KPIs (tasaciones del mes, comparación mes anterior, ingresos, ranking de tasadores), filtros avanzados, gráficos, métricas configurables, export a CSV/Excel/PDF.
- **Impacto:** Es el canal **primario** de análisis del Owner (oficina, escritorio). Aparece recién en Fase 2 — **no existe en MVP-6sem** porque no hay Owner B2B en MVP. Stack frontend probablemente Next.js/React; comparte backend con [[T-033]] y [[T-035]].
- **Sinónimos:** Dashboard Owner web · Vista de análisis Owner · Panel de control Owner
- **Relacionados:** [[T-019]] · [[T-010]] · [[T-035]] · [[T-033]] (NO confundir)
- **Menciones:** CU-UI-010, transcript:L385 ("el dashboard... sí es web").
- **Confianza:** Alta

## T-035 — Dashboard Owner versión mobile (primitiva, embebida en app del tasador) (Fase 2+)

- **Categoría:** Objeto
- **Noción:** Versión **deliberadamente simplificada** del [[T-034]] Dashboard Owner web, embebida como sección dentro de la app mobile del [[T-028]] Tasador. Visible solo para usuarios que tienen rol de [[T-019]] Owner además de Tasador. Muestra KPIs básicos (tasaciones del mes, ingresos, comparación) sin configuración avanzada ni export.
- **Impacto:** Decisión arquitectónica explícita (Franco, transcript:L385): "tiene su versión mobile que va a estar embebido en la versión mobile de tasación". **No replica el web** — el propósito de la app mobile sigue siendo tasar inmuebles + flujo Uber, no análisis denso. Aparece en Fase 2.
- **Sinónimos:** Dashboard Owner mobile · Dashboard embebido · Vista Owner reducida
- **Relacionados:** [[T-019]] · [[T-034]] · [[T-033]] (NO confundir) · [[T-017]]
- **Menciones:** CU-UI-010, transcript:L385.
- **Confianza:** Alta

## T-032 — Solicitante (también: Referente)

- **Categoría:** Sujeto
- **Noción:** Persona que solicita una [[T-026]] sobre un inmueble. Habitualmente es un [[T-020]] (cliente final), aunque también puede ser un representante de una [[T-010]] (banco, inmobiliaria, juzgado). Sus datos se capturan en la sección "Solicitante" del formulario de carga: nombre, apellido, teléfono (requerido), email (opcional, pero requerido si se usa "compartir por mail").
- **Impacto:** Es el **destinatario final** del PDF de tasación, lo reciba el [[T-028]] descargándolo o vía mail pre-diseñado. Se persiste en la entidad Tasación. En la UI MVP aparece con dos etiquetas distintas: "Solicitante" en el formulario de carga y "Referente" en la ficha de consulta (ver pregunta pendiente Q11 en `00_preguntas_pendientes.md` sobre cuál label unificar).
- **Sinónimos:** Referente · Cliente solicitante
- **Relacionados:** [[T-020]] · [[T-026]] · [[T-010]] · [[T-028]]
- **Menciones:** PDF Cocucci §2B (rol "Particulares Clientes"); imágenes WhatsApp 12.45.44 (3) — formulario solicitante; 12.45.44 (1) — ficha referente.
- **Confianza:** Alta (con pendiente Q11 sobre nomenclatura UI)

## T-025 — SDD (Spec-Driven Development)

- **Categoría:** Objeto
- **Noción:** Metodología de captura de requerimientos propuesta por Franco: reunión con stakeholders → grabación → transcripción → procesamiento a [[T-003]] estructurados → especificaciones → IA genera el código a partir de las especificaciones. Es por qué no se codifica a mano.
- **Impacto:** Justifica toda la inversión de tiempo en este árbol IR (`proyecto/wiki/requisitos/`). Sin SDD, el proceso sería historias de usuario en Jira y codificación manual.
- **Sinónimos:** Spec-Driven Development · Specification-Driven Development · Especificación-driven development
- **Relacionados:** [[T-003]] · [[T-018]]
- **Menciones:** transcript:L105 (Franco), L119 (Franco) — **nota:** el transcript dice "Spectrum Development" por error de reconocimiento de voz; el término correcto que Franco usa es "Spec-Driven Development".
- **Confianza:** Alta

## T-026 — Tasación

- **Categoría:** Objeto (entidad central — **3 acepciones**)
- **Noción:** Concepto polisémico del dominio. Las tres acepciones se distinguen por contexto:
  - **T-026a — Tasación como acción.** El acto profesional de un [[T-028]] de estimar el valor de un inmueble. Verbo: "tasar". Ej: "voy a tasar la casa".
  - **T-026b — Tasación como documento.** El informe (PDF) generado al final del proceso, con valor estimado, datos del inmueble, firma (plataforma o colegiado), foto, geolocalización. Ej: "te entrego la tasación".
  - **T-026c — Tasación como entidad en el sistema.** El registro persistido en la base con sus estados ([[T-002]] → [[T-014]] → [[T-022]] → [[T-009]] → [[T-027]] → [[T-007]]). Es lo que el sistema CRUDea. Ej: "la tasación nº 142 está en comité".
- **Impacto:** El sistema modela principalmente T-026c. Los RF que generan documentos producen T-026b. Los CU que describen el flujo del tasador hablan de T-026a. **Cada RF/CU debe especificar a cuál acepción se refiere si no es obvia por el contexto.**
- **Sinónimos:** Valuación inmobiliaria (sinónimo general, no usado en el producto)
- **Relacionados:** todos los estados [[T-002]] [[T-014]] [[T-022]] [[T-009]] [[T-027]] [[T-007]] · [[T-028]] · [[T-021]] · [[T-029]] · [[T-030]]
- **Menciones:** transcript:passim
- **Confianza:** Alta

## T-027 — Tasada

- **Categoría:** Estado
- **Noción:** Estado de una [[T-026]] después de que el [[T-006]] cerró el valor final y antes de que el PDF se genere y se entregue al cliente.
- **Impacto:** Una vez tasada, el valor final queda registrado y los participantes del comité firman (en MVP de forma simbólica, en Fase 2 con firma digital). Transiciona a [[T-007]] al generar el PDF.
- **Sinónimos:** Valor cerrado · Resolución firmada
- **Relacionados:** [[T-009]] · [[T-007]] · [[T-006]]
- **Menciones:** transcript:L371 (Cocucci)
- **Confianza:** Alta

## T-028 — Tasador

- **Categoría:** Sujeto
- **Noción:** Profesional matriculado (arquitecto o corredor inmobiliario) habilitado para crear, ejecutar y participar en [[T-006]] de [[T-026]]. En el MVP-6sem son los ~10 arquitectos del [[T-004]]; en Fase 2+ se incorporan corredores inmobiliarios.
- **Impacto:** Su matrícula debe estar **verificada** (CBR-002) y debe haber completado el curso de uso de la plataforma. Recibe el 90% de la [[T-005]] cobrada (CBR-003). Su [[T-015]] habilita la firma profesional de una tasación certificada.
- **Sinónimos:** Profesional matriculado · Arquitecto / Corredor · Tasador habilitado
- **Relacionados:** [[T-004]] · [[T-006]] · [[T-015]] · [[T-026]] · [[T-005]]
- **Menciones:** transcript:L163, L171 (Cocucci)
- **Confianza:** Alta

## T-029 — Valor de mercado

- **Categoría:** Objeto
- **Noción:** Valor referencial de un inmueble obtenido por [[T-023]] a partir de comparables publicados en portales scrapados ([[T-024]]) y agregados en [[T-016]]. Cocucci lo describe como "más cercano a la realidad que el valor técnico" porque refleja precios de oferta del mercado real.
- **Impacto:** En el MVP es **placeholder** (promedio simple o sin valor); en Fase 2+ es inferencia real con [[T-008]]. El [[T-006]] lo contrasta con [[T-030]] para definir el valor final.
- **Sinónimos:** Valor de oferta · Valor scrapping · Valor Robotomus
- **Relacionados:** [[T-023]] · [[T-030]] · [[T-006]] · [[T-012]] · [[T-024]]
- **Menciones:** transcript:L163 (Cocucci)
- **Confianza:** Alta

## T-030 — Valor técnico

- **Categoría:** Objeto
- **Noción:** Valor de un inmueble calculado por la **fórmula determinística** de [[T-011]] (m² cubiertos × categoría × coeficientes de antigüedad, frente/fondo, terreno). No es predicción ni inferencia: es **cuenta**.
- **Impacto:** Es el segundo índice (junto con [[T-029]]) que el [[T-006]] contrasta para definir el valor final. **En MVP-6sem el sistema lo calcula automáticamente** (RF-016) usando Fitt-Servini lite — el comité ve el valor pre-calculado al abrir la tasación y puede aceptarlo (botón "Usar valor Fitt-Servini") u overridearlo manualmente con motivo opcional. Decisión actualizada el 2026-05-14.
- **Sinónimos:** Valor Colegio · Valor Fitt-Servini · Valor determinístico
- **Relacionados:** [[T-011]] · [[T-029]] · [[T-006]] · [[T-004]]
- **Menciones:** transcript:L163-165 (Cocucci, Franco); RF-016 (implementación MVP); CU-UI-004 (consumo).
- **Confianza:** Alta

## T-031 — Z-Value (Zillow)

- **Categoría:** Objeto
- **Noción:** Estimación de valor inmobiliario automática que publica la plataforma estadounidense Zillow. Está **homologada** en EE.UU. Referencia internacional citada por Franco como benchmark de homologación de inferencia automática para Tasa Inmuebles.
- **Impacto:** Aspiración de Fase 3 (DP-005 pendiente): conseguir que el valor automático de [[T-023]] sea homologado por una entidad argentina (probablemente el [[T-004]]). Fuera del MVP-6sem.
- **Sinónimos:** Zestimate
- **Relacionados:** [[T-023]] · [[T-029]] · [[T-004]]
- **Menciones:** transcript:L181-183 (Sebastián, Franco)
- **Confianza:** Media (referencia externa, no enunciada formalmente)

---

## Apéndice — Términos detectados con definición pendiente

Ninguno. **38 términos finales** (v4, 2026-05-14). Distribución:

- **26 conceptos del staging inicial (v1):** T-001 a T-005, T-008, T-010 a T-013, T-015 a T-021, T-023 a T-025, T-028 a T-031.
- **6 estados de tasación desplegados (v1):** T-002 Borrador, T-014 Inspección hecha, T-022 Por tasar, T-009 En comité, T-027 Tasada, T-007 Compartida.
- **T-026 Tasación desambiguada en 3 acepciones internas (v1):** acción / documento / entidad — sigue siendo 1 ID, pero documentado con 3 sentidos.
- **+3 en v3 (2026-05-14, decisiones de pantalla):** T-033 Mis tasaciones, T-034 Dashboard Owner web, T-035 Dashboard Owner mobile.
- **+3 en v4 (2026-05-14, autotasador al MVP):** T-036 Tasación referencial, T-037 Cliente B2C, T-038 Generada (estado).

**Total: 26 + 6 + 3 + 3 = 38**. Todos los términos se promovieron con definición canónica y confianza Alta o Media.

## Apéndice — Términos descartados del glosario

- **"Castillo"** (transcript:L227): unidad informal de Cocucci para "inmueble grande". No es término técnico. La idea queda capturada en CBR-007 (tarifa variable por superficie).
- **"Calidad" / "buena tasación" / "razonable"**: subjetivos. Requieren Planguage cuando entren a AC, no son términos del glosario.
- **"Match" / "asignar tasador"**: falta especificar el algoritmo. Cuando se diseñe CRF-006, se decidirá si el verbo merece entrada propia.
- **Nombres propios sin valor de dominio** (Silvana Pacheco, Federico tanto, Lean): mencionados como ejemplos.
- **Marcas de proveedores tecnológicos** (AWS, GitLab, Notion, Trello, OpenAI, Google Maps, Mercado Pago): técnicas, no del dominio.

## Apéndice — Resumen de hiperenlaces

| Término | Veces referenciado por otros |
|---------|------------------------------|
| [[T-026]] Tasación | 15 (es el término central) |
| [[T-028]] Tasador | 9 |
| [[T-006]] Comité | 7 |
| [[T-023]] Robotomus | 7 |
| [[T-021]] Plataforma | 5 |
| [[T-004]] Colegio de Arquitectos | 5 |
| [[T-029]] Valor de mercado | 4 |
| [[T-030]] Valor técnico | 4 |
| [[T-013]] Inmoclick | 4 |
| [[T-016]] Métricas | 4 |
| [[T-008]] Confianza | 3 |
| [[T-012]] Inferencia | 3 |
| [[T-015]] Inspección ocular | 3 |
| [[T-014]] Inspección hecha | 3 |
| [[T-005]] Comisión | 3 |
| [[T-024]] Scraping | 3 |
| [[T-032]] Solicitante | 3 (T-026, T-020, T-028) |
| [[T-011]] Fitt y Servini | 2 |
| [[T-018]] MVP | 3 |
| [[T-010]] Entidad | 2 |
| [[T-019]] Owner | 2 |
| [[T-020]] Particular | 2 |
| [[T-031]] Z-Value | 1 |

Los términos más referenciados son los **5 conceptos centrales** del producto: Tasación, Tasador, Comité, Robotomus, Plataforma. Una validación de consistencia futura (`validar-consistencia`) debe asegurar que toda mención de estos términos en CU/RF/BR use el `[[T-NNN]]`.
