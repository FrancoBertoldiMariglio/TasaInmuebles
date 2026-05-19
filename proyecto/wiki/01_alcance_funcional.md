# Alcance Funcional — Tasa Inmuebles (Proyecto Cocucci)

> Documento base estable. Define qué hace el sistema, para quién, con qué componentes y bajo qué restricciones. No incluye detalle de arquitectura interna (ver `02_arquitectura.md`), flujos detallados (`03_FL.md`) ni requisitos funcionales (`04_RF.md`).
>
> **Estado**: Alcance prematuro generado el 2026-05-15 a partir de `proyecto/wiki/requisitos/` (artefactos IR del 2026-05-14) y `analisis/reunion-01/`. Decisiones de stack y framework **pendientes** — ver §8 y §11.

---

## 1. Objetivo y Propuesta de Valor

Tasa Inmuebles es una plataforma de gestión de tasaciones inmobiliarias que articula, ejecuta y certifica la valuación de propiedades para clientes particulares, empresas (bancos, constructoras, inmobiliarias) y organismos (poder judicial), apoyándose en profesionales matriculados, un comité de validación y asistencia algorítmica.

El sistema cubre el ciclo completo: desde la solicitud de tasación o el autorregistro del cliente, pasando por el relevamiento profesional en campo, el cálculo automático del valor técnico (manual Fitt y Servini del Colegio de Arquitectos), la validación por comité, hasta la generación del PDF firmado y su entrega al solicitante.

Convive en una sola plataforma un modelo dual: tasaciones profesionales asignadas a tasadores matriculados ("Uber de tasación") y tasaciones referenciales autoservicio para particulares ("Autotasador").

**Criterio de éxito del MVP (Hito 1, 2026-06-25):** ~10 arquitectos matriculados del Colegio de Arquitectos completan al menos una tasación end-to-end cada uno, con valor técnico calculado automáticamente, validado por comité y entregado en PDF.

**Valor Agregado:**

- Profesionaliza la operación de tasación argentina mediante valor técnico Fitt-Servini calculado automáticamente, evitando que el matriculado lo arme a mano.
- Permite trazabilidad completa del proceso: quién relevó, quién validó, qué comparables se usaron, qué valor se cerró y por qué.
- Habilita decisiones basadas en datos al consolidar histórico de tasaciones, comparables y comportamiento del mercado (apoyado por la base histórica Inmoclick, incorporación Fase 2).
- Reduce fricción para el solicitante: autoservicio referencial gratuito, escalable a tasación certificada con inspección ocular cuando el caso lo requiere.
- Diferenciador para el Colegio de Arquitectos: producto que respeta el marco profesional del matriculado (matrícula obligatoria, comité, firma colegiada en certificadas).

---

## 2. Componentes del Sistema

**A. Captura de Tasación Profesional**

Módulo mobile-first para que el tasador matriculado releve un inmueble en campo. Es el flujo crítico del MVP.

- Seleccionar tipo de inmueble (casa, departamento, terreno, galpón, local, oficina) y motivo (10 opciones del catálogo).
- Capturar ubicación vía geolocalización del dispositivo o ingreso manual con autocomplete de domicilio.
- Registrar datos del solicitante (cliente final): nombre, apellido, teléfono, email opcional.
- Subir entre 1 y 15 fotografías del inmueble desde el dispositivo.
- Capturar detalles estructurados: superficie total, cubierta, dormitorios, baños, antigüedad, estado de conservación (escala 1-5), amenities.
- Persistir borradores y permitir retomar el relevamiento desde el último punto guardado.
- Validar campos requeridos y transicionar la tasación al estado "lista para comité".

**B. Comité de Tasación**

Espacio colaborativo para que un grupo de tasadores (en MVP: 3 socios + el autor del relevamiento) discuta, valide y cierre el valor final de una tasación profesional.

- Visualizar el relevamiento completo en lectura compartida (datos, fotos, descripción).
- Contrastar el valor técnico Fitt-Servini (calculado automáticamente) con el valor referencial Robotomus (placeholder en MVP).
- Registrar observaciones por participante.
- Aceptar el valor Fitt-Servini o ingresar un valor override manual con motivo opcional.
- Transicionar la tasación al estado "Tasada" al cerrar el valor.

**C. Cálculo de Valor Técnico Fitt-Servini**

Motor determinístico que calcula el valor técnico de un inmueble aplicando la fórmula del manual de tasación argentino Fitt y Servini, según los lineamientos del Colegio de Arquitectos.

- Calcular valor de construcción a partir de superficie cubierta × categoría × coeficientes de antigüedad y estado de conservación.
- Calcular valor de terreno a partir de superficie no cubierta × valor del metro cuadrado de zona (tabla parametrizable).
- Aplicar coeficientes correctivos (frente/fondo, ubicación) según la configuración de la zona.
- Devolver valor en pesos argentinos (ARS) y dólares estadounidenses (USD) con desglose visible (construcción, terreno, coeficientes aplicados).
- Calcular automáticamente al guardar la tasación, sin requerir intervención manual del tasador.

**D. Autotasación Referencial B2C**

Flujo paralelo al profesional para que un cliente particular obtenga una tasación referencial gratuita desde la misma app mobile, sin matriculación ni inspección ocular.

- Permitir autoregistro de cliente B2C con email + password y consentimiento de tratamiento de datos.
- Reutilizar el formulario simplificado de inmueble (sin geolocalización; ubicación manual).
- Disparar el cálculo automático de valor técnico Fitt-Servini lite + Robotomus mock.
- Generar PDF de tasación referencial con disclaimer "no certificada profesionalmente".
- Permitir descarga del PDF o envío al email del cliente.
- Exponer un listado privado de las tasaciones referenciales del cliente.

**E. Generación y Distribución de PDF**

Componente transversal que materializa una tasación cerrada (profesional o referencial) en un documento PDF descargable y compartible.

- Generar PDF a partir de un template parametrizable (datos del inmueble, fotos, valores ARS/USD, fecha, firmantes).
- Distinguir entre PDF profesional (con firma de plataforma + identificadores de tasador y comité) y PDF referencial (con disclaimer destacado).
- Habilitar descarga directa al dispositivo.
- Habilitar envío por email al solicitante (o al cliente B2C) vía proveedor SMTP externo.
- Persistir el PDF generado para descarga posterior desde la ficha de la tasación.
- Registrar auditoría del envío (timestamp, destinatario, estado).

**F. Gestión de Usuarios e Identidad**

Subsistema mínimo para el MVP que soporta los roles definidos (tasador profesional, cliente B2C, admin de plataforma) y sus mecanismos de acceso.

- Pre-carga de usuarios profesionales por admin (script o panel mínimo), sin autoregistro.
- Autoregistro de clientes B2C con email + password.
- Login con email + password y emisión de token de sesión.
- Asociación de cada usuario a uno y solo uno de los roles: tasador, cliente B2C, admin de plataforma.
- Permisos de visibilidad por rol: cada tasador ve sus propias tasaciones; cada cliente B2C ve sus propias tasaciones referenciales; admin ve todo.

**G. Repositorio de Tasaciones y Workflow de Estados**

Persistencia y gobierno del ciclo de vida de cada tasación (profesional o referencial), incluyendo sus transiciones, historial y visibilidad.

- Persistir cada tasación con sus datos estructurados, fotos, valores y vinculaciones a actores.
- Soportar el ciclo de estados de tasación profesional (Borrador → Inspección hecha → Por tasar → En comité → Tasada → Compartida).
- Soportar el ciclo de estados de tasación referencial (Borrador → Generada → Compartida).
- Permitir listado y filtrado por estado, tipo de inmueble, fecha y otros atributos.
- Permitir retomar borradores parciales.
- Mantener registro de auditoría de transiciones.

**H. Núcleo IA Robotomus (placeholder MVP, real Fase 2)**

Módulo de inteligencia artificial que entrega valor referencial de mercado, asiste en la descripción de inmuebles y produce insights. En el MVP funciona como placeholder; el modelo real se entrena en Fase 2 con la base histórica Inmoclick y datos de scraping.

- En MVP: devolver un valor referencial mock (constante o promedio fake) visible en el comité con etiqueta "Robotomus en desarrollo".
- En Fase 2: calcular valor de mercado real a partir de comparables, scraping de portales (ZonaProp, ArgenProp, MercadoLibre) e Inmoclick.
- En Fase 2: asistir al tasador para describir un inmueble verbalmente y estructurar la ficha.
- En Fase 2: producir insights de tendencia y confianza de la inferencia.

---

## 3. Funcionalidad y Flujos de Trabajo

- **Entrada:** relevamiento mobile del tasador profesional en campo (datos del inmueble + fotos + geolocalización + datos del solicitante) o autoregistro del cliente B2C con captura simplificada sin geolocalización.
- **Procesamiento:** validación de campos requeridos, cálculo automático del valor técnico Fitt-Servini, paso por comité con discusión y override opcional (sólo profesional), generación del PDF firmado.
- **Salida:** PDF de tasación descargable (o enviado por email), listado actualizado de tasaciones del actor, valores en ARS y USD, registro de auditoría del proceso.
- **Retroalimentación:** las observaciones del comité y las tasaciones cerradas alimentan el histórico que (Fase 2) entrena el modelo Robotomus y refina los coeficientes de la fórmula Fitt-Servini.

---

## 4. Actores y Responsabilidades

### Actores

| Actor | Tipo | Alcance | Descripción |
|---|---|---|---|
| Tasador profesional (arquitecto matriculado) | Humano | Individual, opera en campo | Releva inmuebles, participa en comité, comparte tasaciones con solicitantes |
| Comité de tasación | Humano (colectivo) | Grupal, ~4 personas en MVP | Valida y cierra el valor final de cada tasación profesional |
| Cliente B2C | Humano | Individual, externo | Autotasa su propiedad obteniendo PDF referencial gratuito |
| Solicitante (cliente final del tasador) | Humano (pasivo) | Individual, externo | Recibe el PDF de tasación; no opera el sistema |
| Admin de plataforma | Humano | Corporativo, único en MVP | Pre-carga usuarios profesionales, mantiene parametría base |
| Plataforma | Sistema | Transversal | Persiste, valida, calcula Fitt-Servini, orquesta transiciones de estado, genera PDF |
| Colegio de Arquitectos | Organizacional (externo) | Stakeholder corporativo | Define la lista de los ~10 matriculados habilitados para el piloto del Hito 1 |
| Proveedor SMTP externo | Sistema (externo) | Servicio | Entrega los emails con PDF adjunto al solicitante o cliente B2C |

### Actividades por Actor

**TASADOR PROFESIONAL**

- Iniciar sesión con email y password.
- Visualizar la pantalla principal "Mis tasaciones" con todas las tasaciones del propio actor.
- Crear una nueva tasación end-to-end desde el dispositivo mobile (tipo, motivo, ubicación, solicitante, fotos, detalles, descripción).
- Editar una tasación en estado Borrador o Inspección hecha.
- Guardar borradores parciales y retomarlos.
- Participar como miembro del comité de tasación en tasaciones donde sea designado.
- Aceptar valor Fitt-Servini o cargar override manual con motivo.
- Generar el PDF de una tasación cerrada y descargarlo o enviarlo al solicitante.

**COMITÉ DE TASACIÓN**

- Visualizar el detalle completo del relevamiento.
- Visualizar el valor técnico Fitt-Servini calculado automáticamente.
- Visualizar el valor referencial Robotomus (placeholder en MVP).
- Agregar observaciones al campo compartido de la tasación.
- Cerrar el valor final de la tasación (aceptar Fitt-Servini u override manual).
- Transicionar la tasación al estado Tasada.

**CLIENTE B2C**

- Autoregistrarse con email, password y aceptación de términos.
- Iniciar sesión.
- Visualizar "Mis tasaciones referenciales".
- Crear una nueva tasación referencial completando un formulario simplificado.
- Descargar el PDF referencial o solicitar envío a su email.

**ADMIN DE PLATAFORMA**

- Pre-cargar usuarios profesionales (los ~10 arquitectos del Colegio en el MVP) con datos: nombre, apellido, email, matrícula colegiada, DNI.
- Generar credenciales iniciales y distribuirlas por canal externo.
- Marcar un usuario como activado.
- (Fase 2) Operar el back office completo para gestión de usuarios, parametría y reportes.

**SOLICITANTE (pasivo)**

- Recibir el PDF de tasación por email o por canal externo (WhatsApp, mail manual del tasador).

**PLATAFORMA (sistema)**

- Validar todos los inputs en cada operación.
- Calcular el valor técnico Fitt-Servini al guardar la tasación.
- Persistir el ciclo de vida de cada tasación con su historial.
- Generar los PDFs profesional y referencial.
- Orquestar el envío por SMTP cuando se solicita.
- Registrar auditoría de operaciones críticas.

---

## 5. Funcionalidades (Alcance MVP)

> Las siguientes funcionalidades representan el alcance del Hito 1 (demo Colegio, 2026-06-25). Cada una mapea a uno o más componentes de §2.

- **ABM Tasación Profesional (Captura Mobile):** Permite al tasador relevar un inmueble desde la app mobile, completando tipo, motivo, ubicación, solicitante, fotos, detalles y descripción. Soporta borrador y retomar. Solo el tasador autor puede ejecutar; el comité solo visualiza hasta cerrar valor. Mapea a Componente A.

- **Cálculo Automático Valor Técnico Fitt-Servini:** Al guardar la tasación, la plataforma calcula automáticamente el valor técnico aplicando la fórmula del manual Fitt y Servini, devolviendo desglose construcción + terreno + coeficientes. No requiere intervención del tasador. Mapea a Componente C.

- **Cierre de Valor en Comité (Visualización + ABM Override):** Permite a cualquier miembro del comité visualizar el relevamiento, los dos índices de valor (Fitt-Servini y Robotomus mock), agregar observaciones y cerrar el valor final eligiendo aceptar Fitt-Servini u override manual con motivo opcional. Mapea a Componente B.

- **ABML "Mis Tasaciones" (Pantalla Principal Mobile):** Listado mobile de las tasaciones del actor logueado, con filtros por estado, tipo de inmueble, motivo y rango de fechas, ordenado por fecha descendente. Cada fila muestra ID, domicilio, tipo, motivo, estado con badge de color, fecha y valor (si está Tasada). Permite tocar una fila para detalle, "+ Nueva tasación" para disparar el flujo de captura, y "Editar" sobre tasaciones en Borrador o Inspección hecha. Mapea a Componente G.

- **Generación PDF de Tasación Profesional:** Genera el PDF profesional firmado por la plataforma con todos los datos de la tasación cerrada, IDs del tasador autor y del comité, valores en ARS y USD, fecha. Disponible una vez cerrado el valor. Mapea a Componente E.

- **Distribución PDF Profesional (Descarga + Envío SMTP):** Permite descargar el PDF al dispositivo del tasador y/o enviarlo por email al solicitante (si tiene email). Persiste el registro de envío (timestamp, destinatario, estado). Mapea a Componente E.

- **Autoregistro Cliente B2C:** Permite a un particular crear cuenta con email, password y aceptación de términos. Solo cuentas con rol cliente B2C. Sin verificación por email en MVP. Mapea a Componente F.

- **Login Profesional y B2C:** Autenticación por email + password para ambos roles. Emite token de sesión. Redirige al home correspondiente al rol. Mapea a Componente F.

- **ABM Tasación Referencial B2C:** Permite al cliente B2C completar el formulario simplificado de inmueble (sin geolocalización, ubicación manual, fotos opcionales) y disparar el cálculo automático Fitt-Servini lite + Robotomus mock. Mapea a Componentes D y C.

- **Generación PDF de Tasación Referencial:** Genera PDF referencial con disclaimer destacado "No certificada profesionalmente. Para certificación, consulte con un tasador colegiado." Sin firma colegiada. Mapea a Componente E.

- **Distribución PDF Referencial (Descarga + Envío SMTP):** Permite al cliente B2C descargar el PDF o solicitar envío al email registrado en su cuenta. Mapea a Componente E.

- **Pre-carga de Usuarios Profesionales (Admin):** Permite al admin de plataforma crear las cuentas de los arquitectos del Colegio con datos completos (nombre, apellido, email, matrícula, DNI) y generar credenciales iniciales aleatorias. En MVP se ejecuta vía script u operación administrativa (no panel UI productivo). Mapea a Componente F.

- **Repositorio y Workflow de Estados de Tasación:** Persiste cada tasación con su ciclo de vida (Borrador → Inspección hecha → Por tasar → En comité → Tasada → Compartida para profesional; Borrador → Generada → Compartida para referencial) y orquesta las transiciones según las acciones del actor. Mapea a Componente G.

- **Visualización de Valor Robotomus (Placeholder):** Muestra en el comité y en el PDF profesional una etiqueta "Robotomus en desarrollo" con valor mock. Sirve de placeholder visible para preservar el espacio del producto futuro. Mapea a Componente H.

---

## 6. Fuera de Alcance / Evolución Futura

| Item | Motivo de exclusión | Horizonte estimado |
|---|---|---|
| Robotomus IA real (entrenamiento con Inmoclick + scraping) | Borde complejo, dual-track discovery; no rinde el riesgo para Hito 1 | Fase 2 |
| Inspección ocular certificada + firma digital colegiada | Requiere acuerdo formal Colegio + firma digital legal | Fase 2 |
| Pasarela de pagos (cobro de tasaciones, comisión 90/10) | Compliance financiera + integración pasarela | Fase 2 |
| Módulo contable (facturación AFIP, liquidación a tasadores) | Compliance fiscal AR | Fase 2 |
| Dashboards B2B (banco, constructora, inmobiliaria) | Requiere modelo de entidad B2B (Q01 pendiente) | Fase 2 |
| Autoregistro de tasadores con validación de matrícula | Requiere integración con API del Colegio (no existe hoy) | Fase 2-3 |
| Asignación automática de tasador por zona | Requiere modelo de geografía + carga real | Fase 2 |
| API externa para terceros (bancos integrados) | Requiere modelo de seguridad + SLA | Fase 3 |
| Marketplace de tasadores (ranking, reviews, especialización) | Solo aplica con masa crítica de usuarios | Fase 3 |
| Suscripciones B2B (paquetes mensuales) | Depende de modelo de pago + entidades B2B | Fase 3 |
| Captación web pública (SEO, landing del autotasador) | El MVP usa solo la app mobile como canal | Fase 2 |
| Geolocalización automática para tasación referencial B2C | Decisión 2026-05-14: ubicación manual en MVP | Fase 2 |
| Verificación de email en autoregistro B2C | Reduce fricción en MVP | Fase 2 |
| Magic links, OTP, SSO, MFA | No críticos para piloto cerrado | Fase 2 |
| Recuperación de contraseña self-service | El admin regenera en MVP | Fase 2 |
| Multi-tenant (selector de entidad activa para tasador) | Requiere modelo de entidad B2B | Fase 2 |
| Refinamiento de Fitt-Servini (coef frente/fondo dinámico, depreciación no-lineal, tipo de cambio API) | El cálculo lite es suficiente para validar producto | Fase 2 |
| Indicador 4 niveles de calidad Robotomus | Depende de Robotomus real | Fase 2 |
| Videoconferencia integrada en comité | Fuera de scope; el comité se coordina por canal externo | No previsto |
| Compresión automática de fotos | Optimización post-MVP | Fase 2 |

---

## 7. Restricciones

| Tipo | Restricción | Impacto en alcance |
|---|---|---|
| Tiempo | Hito 1 a 6 semanas desde 2026-05-14 (target ~2026-06-25) | Alcance acotado al flujo del tasador + autotasación referencial mock; difiere Robotomus real, pagos, firma digital |
| Tiempo | Hito 2 (cierre acuerdo Colegio) ~2026-10-19 (fecha por confirmar) | Marca el límite externo del proyecto piloto con el Colegio |
| Regulatoria | Ley 25.326 — Protección de Datos Personales (AR) | Consentimiento explícito en autoregistro; auditoría; checklist 7/7 (AC-005) |
| Organizacional | Sociedad de 3 personas (sponsor + PO + CTO) sin equipo de desarrollo contratado | Decisiones de alcance las cierra esta terna; sin estructura jerárquica corporativa |
| Organizacional | Colegio de Arquitectos como stakeholder externo crítico | El acuerdo de 6 meses fija el frame temporal; los matriculados del piloto los provee el Colegio (DP-006 pendiente) |
| Técnica | Mobile-first obligatorio para el flujo del tasador (relevamiento en campo) | El flujo de captura no admite versión desktop en MVP; la web (Fase 2) es solo para dashboards B2B |
| Técnica | Stack tecnológico no decidido (DP-S7) | El alcance se documenta sin amarrarse a un framework; arquitectura mantiene la decisión abierta |
| Presupuesto | Proyecto autofinanciado por la sociedad | Sesgo fuerte a herramientas open source y planes gratuitos siempre que sea viable |

### Seguridad

- **Autenticación:** email + password, token de sesión. Sin SSO ni MFA en MVP.
- **Autorización:** rol único por usuario en MVP (tasador, cliente B2C o admin). Visibilidad por rol y propiedad de cada tasación.
- **Auditoría:** registro de acciones críticas (creación, cierre de valor, envío de PDF, transiciones de estado).
- **Cumplimiento Ley 25.326:** consentimiento explícito en autoregistro B2C, posibilidad de baja de cuenta, registro de tratamiento.

---

## 8. Tecnología

> **Estado**: la decisión de stack está **abierta (DP-S7)**. Este alcance documenta las preferencias declaradas por el CTO en la reunión-01 (2026-05-14) y las restricciones inviolables, sin cerrar versiones ni frameworks concretos. La elección final se documenta en `02_arquitectura.md` cuando se cierre.

### Aplicaciones

- **Backend:** stack a definir. Preferencia declarada: framework con buen soporte para REST/GraphQL + ORM maduro + comunidad open source.
- **Frontend del tasador (mobile):** aplicación mobile (nativa, híbrida o web responsiva mobile-first — a decidir). Soporte de cámara, geolocalización y carga de fotos como capacidades inviolables.
- **Frontend B2C (mobile):** misma app mobile que el tasador, con flujo bifurcado en el inicio de sesión (rol cliente B2C vs rol tasador). Decisión 2026-05-14.
- **Frontend de dashboards B2B (Fase 2):** aplicación web responsiva con versión mobile embebida.

### Base de Datos

- Motor a definir. Preferencia declarada en el brief de Cocucci: PostgreSQL como candidato principal.

### Software Cliente

- Para tasador y cliente B2C: dispositivos móviles con cámara, GPS y conexión a internet (3G o superior).
- Para admin: navegador moderno (Chrome, Firefox, Edge, Safari) si el panel admin se materializa como web. En MVP también soportado vía CLI.

### Integraciones Externas

- **Geolocalización y geocoding:** Google Maps Places API (preferencia declarada; alternativas open source no descartadas).
- **Proveedor SMTP:** a definir (DS-07). Candidatos identificados: Resend, Postmark.
- **Base histórica Inmoclick (Fase 2):** acceso al data dump propiedad de Cocucci.
- **Portales inmobiliarios (Fase 2):** scraping de ZonaProp, ArgenProp, MercadoLibre Inmuebles.

---

## 9. Infraestructura y Despliegue

- **Modelo de despliegue:** cloud. Preferencia declarada: **AWS** como plataforma objetivo.
- **Repositorio y CI/CD:** **GitLab** con pipelines automatizados.
- **Escalabilidad:** dimensionada para el piloto del Hito 1 (~10 usuarios, ~30 tasaciones totales). Arquitectura debe permitir crecimiento a Fase 2 sin reescrituras mayores.
- **Sesgo:** open source y planes gratuitos siempre que sea viable (restricción de presupuesto).
- **Referencia detalle técnico:** ver `02_arquitectura.md` (topología de apps por dispositivo, decisiones de containers, almacenamiento de fotos, etc.).

---

## 10. Supuestos y Criterios de Aceptación

### Supuestos

| # | Supuesto | Impacto si es falso |
|---|---|---|
| 1 | El Colegio de Arquitectos entregará la lista de los ~10 matriculados del piloto antes del 2026-06-XX | DP-006 bloquea CU-UI-006 (pre-carga); sin esa lista no hay piloto en el Hito 1 |
| 2 | Los ~10 arquitectos tienen un dispositivo móvil compatible (Android o iOS con cámara y GPS) | El flujo mobile-first del tasador queda inejecutable; habría que improvisar canal alternativo |
| 3 | La sociedad mantendrá la distribución actual de roles (Cocucci know-how, Sebastián PO, Franco CTO) durante todo el Hito 1 | Re-priorización de alcance si cambia el equipo |
| 4 | El acceso a Inmoclick para Fase 2 está garantizado por la propiedad de Cocucci | Fase 2 del Robotomus IA real queda comprometida; habría que recolectar dataset desde cero |
| 5 | La fórmula Fitt-Servini estándar del Colegio es suficientemente determinística como para implementarla sin negociar coeficientes por caso | Si el Colegio exige coeficientes variables por arquitecto, hay que parametrizar más de lo previsto |

### Criterios de Aceptación de Alto Nivel

| # | Criterio | Verificación |
|---|---|---|
| 1 | Los ~10 arquitectos del Colegio completan al menos una tasación end-to-end cada uno en la app mobile | Auditoría del repositorio: ≥ 10 tasaciones en estado Tasada o Compartida, con autores distintos |
| 2 | Toda tasación profesional pasa por comité antes de cerrar valor | Auditoría: 0 tasaciones cerradas sin paso por estado "En comité" |
| 3 | Toda tasación cerrada produce un PDF descargable persistido | Auditoría: 1:1 entre tasaciones en estado Tasada/Compartida y archivos PDF persistidos |
| 4 | El valor técnico Fitt-Servini se calcula automáticamente sin intervención manual del tasador | Test de regresión: el campo `valor_tecnico` está poblado al guardar la tasación |
| 5 | El tiempo total del flujo de captura mobile end-to-end es ≤ 8 minutos p80 (AC-001) | Telemetría sobre las tasaciones reales del piloto |
| 6 | La app mobile alcanza un score SUS ≥ 68 con los arquitectos del piloto (AC-003) | Encuesta SUS al cierre del Hito 1 |
| 7 | El sistema cumple Ley 25.326 checklist 7/7 (AC-005) | Revisión legal previa al Hito 1 |
| 8 | Cualquier cliente B2C puede generar al menos una tasación referencial end-to-end con PDF descargable | Smoke test al cierre del Hito 1 |

---

## 11. Interesados y Aprobación

| Rol | Persona/Equipo | Responsabilidad |
|---|---|---|
| Product Owner / COO | Sebastián Ríos | Define prioridades, valida alcance, articula con el equipo técnico y con el Colegio |
| Sponsor / Visionario | Cristian Cocucci | Aporta know-how del negocio inmobiliario, vínculo con Colegio, propietario de Inmoclick, decide sobre la visión de producto |
| Tech Lead / CTO | Franco Bertoldi | Define stack, arquitectura, metodología y proceso de delivery; valida viabilidad técnica |
| Stakeholder externo | Colegio de Arquitectos | Aprueba el piloto del Hito 1; provee la lista de matriculados; valida el cumplimiento del marco profesional (matrícula, comité, firma) |
| Decisor de cambios de alcance | Sebastián Ríos (PO) | Todo cambio de alcance pasa por PO con consulta a Sponsor y Tech Lead |

---

## Notas y Referencias

- **Decisión pendiente DP-S7:** stack tecnológico (frontend, backend, base de datos). Ver §8.
- **Decisión pendiente DP-006:** lista de los ~10 arquitectos del Colegio. Bloquea CU-UI-006.
- **Decisión pendiente DS-07:** proveedor SMTP. Bloquea pulido de funcionalidades de distribución de PDF.
- **Pregunta abierta Q01:** granularidad del modelo de Entidades B2B (Plano / Jerárquico / Multi-tenant). No bloquea MVP; afecta Fase 2.
- **Pregunta abierta Q02:** set canónico de estados del workflow de tasación y sus transiciones permitidas. Necesita cerrarse antes de ejecutar CU-UI-004 fully-dressed.
- **Fuente primaria del alcance:** `analisis/reunion-01/transcript.txt` (reunión-01, 2026-05-14) + `analisis/"Tasa Inmuebles…".pdf` (brief de Cocucci) + capturas de la maqueta vieja en `analisis/imgs/`.
- **Trazabilidad detallada:** ver `requisitos/09_trazabilidad.md` (60 nodos, 87 edges, 100% cobertura N→S MVP).
- **Dashboard de ingeniería de requisitos:** ver `requisitos/_PROGRESO.md`.
