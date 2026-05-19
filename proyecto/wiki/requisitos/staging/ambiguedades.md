---
artefacto: ambiguedades
fuente: ../../../analisis/reunion-01/transcript.txt
procesado: 2026-05-14
ultima_actualizacion: 2026-05-14
total_ambiguedades: 17
ambiguedades_resueltas: 4 (A-002, A-011, A-016, A-017)
basadas_en: marco-fernando.md § 17 (palabras prohibidas)
---

# Ambigüedades detectadas — Palabras prohibidas (§ 17 marco)

> Toda aparición de palabras prohibidas o cuantificadores vagos en un requerimiento es **ambigüedad detectada** y gatilla la skill `traducir-requerimiento` para resolver.
>
> **Palabras prohibidas (§ 17):** rápido, lento, simple, complejo, amigable, intuitivo, fácil, difícil, robusto, seguro (sin nivel), escalable (sin número), responsivo, flexible, moderno, bonito, claro, eficiente, óptimo, mejor, confiable, disponible (sin SLA), performante, usable.
>
> **Cuantificadores vagos:** muchos, pocos, algunos, varios, bastante, suficiente.

| ID | Cita ambigua | Línea | Palabra disparadora | Reformulación propuesta | Skill |
|----|--------------|-------|---------------------|--------------------------|-------|
| A-001 | "se va a demorar un millón de años en buscar esos datos" | L163 | hipérbole + "millón" vago | "Una consulta de Robotomus directamente sobre Inmoclick supera `<X>` segundos en `<Y>` percentil de carga, lo cual es inaceptable para una experiencia interactiva del comité." Requiere CAC-001 con Planguage. | `traducir-requerimiento` |
| A-002 | "los flacos, mientras más rápido hagan las cosas, olvídate" | L339 | **rápido** | "El tiempo total para completar una nueva tasación end-to-end (desde abrir la app hasta enviar al comité) debe ser ≤ `<N>` minutos en condiciones típicas." Genera CAC-004 con Planguage. | `traducir-requerimiento` |
| A-003 | "ese va a ser casi el caso más de uso que va a haber, porque los flacos, mientras más rápido hagan las cosas" | L339 | "casi" + "más" | "El flujo 'sin pasar por comité' es la variante esperada para >X% de las tasaciones." Requiere medición o estimación documentada. | `traducir-requerimiento` |
| A-004 | "una herramienta como inmoclick... son herramientas muy fuertes" | L323 | "fuertes" | "Las herramientas internas (inmoclick, métricas) reducen el tiempo del tasador para preparar una visita en `<%>` versus búsqueda manual." Requiere AC. | `traducir-requerimiento` |
| A-005 | "es bastante flexible su género" (refiriéndose al Colegio) | L191 | **flexible** + cuantificador vago "bastante" | Reformular como BR: "El plazo del acuerdo Cocucci-Colegio admite ajustes acordados por consentimiento explícito; no es unilateralmente extensible." | `traducir-requerimiento` |
| A-006 | "tiene que ser, tenemos que convertir a que el inmobiliario considere a tasa inmueble como el disparador para levantar inmuebles" | L113 | aspiración subjetiva | Reformular como métrica de éxito: "X% de los tasadores que probaron la app la usan al menos una vez por semana en los siguientes 3 meses." | `traducir-requerimiento` |
| A-007 | "una manera de homologarlo, aunque no nos demos cuenta, medio indiferentemente" | L191 | "medio" vago | Reformular: "La homologación queda fuera del alcance del MVP-6sem; será un objetivo explícito de Fase 2 con criterio de éxito a definir." | Decisión, no AC. |
| A-008 | "buenísimo el proyecto, vamos para adelante" | L191 | **bueno (sin métrica)** | No es un requisito — es entusiasmo. Descartado como ambigüedad. | — |
| A-009 | "Esos son datos, pero datos muy valiosos para un owner de una empresa" | L287 | **valiosos** | Reformular: "Las métricas mostradas en el dashboard del owner debe permitir responder al menos las siguientes preguntas: `<lista>` ." Genera AC de usabilidad. | `traducir-requerimiento` |
| A-010 | "Si hacés esto al final terminamos siendo un mini Uber" | L335 | "mini" | Descriptivo, no requisito. Descartado. | — |
| A-011 | "El login, los logins, el login es importante, yo no sé si es un módulo muy difícil de... pero tampoco es algo que sea imprescindible" | L385 | **difícil** + **imprescindible** sin criterio | Reformular: "El login del MVP se reduce a autenticación email+password pre-cargado por admin para los `<N>` arquitectos del Colegio. No incluye autoregistro, SSO ni recuperación de contraseña." | `traducir-requerimiento` |
| A-012 | "tampoco es algo que sea imprescindible, más bien lo podemos loguear nosotros" | L385 | **imprescindible** | Cubierto por A-011 (misma cita). | — |
| A-013 | "que esto está OK y encima está homologado por esta entidad que te dice que son conformes los datos" | L173 | **OK** sin criterio | Reformular: "El dato es 'conforme' cuando cumple los AC `<lista>` que el Colegio defina por escrito." Genera AC de calidad de datos. | `traducir-requerimiento` |
| A-014 | "te da unos datos como excavar la tierra no sé cuánto para atrás" | L163 | hipérbole | Descriptivo, no requisito. Descartado. | — |
| A-015 | "Robotomus hace un scraping... el promedio de valores es este, que es bastante real y bastante cercano a la realidad" | L163 | **bastante real / cercano** | Reformular como AC: "El valor de Robotomus se considera 'aceptable' cuando difiere del valor del comité en ≤ X% en al menos Y% de los casos." Genera AC de precisión. | `traducir-requerimiento` |
| A-016 | "los datos van a quedar guardados, van a quedar registrados, se los van a poder compartir al banco o al particular que pidió la tasación" | L133 | implícito sin formato | Reformular: "Una tasación 'guardada' incluye `<lista de campos>` y es compartible vía `<canal>` (URL, descarga PDF, expediente). El formato de compartir es `<tipo>`." | `traducir-requerimiento` |
| A-017 | "Yo entiendo que todas esas cosas son buenas para las organizaciones gigantes y acá es un producto, como decía recién, tiene que funcionar" | L103 | **funcionar** sin criterio | Reformular como métrica de éxito del MVP: "El MVP 'funciona' cuando `<N>` arquitectos del Colegio completan al menos una tasación end-to-end con PDF generado y compartido al cliente, durante la semana de la demo." | `traducir-requerimiento` |

## Ambigüedades descartadas (no son requisitos)

- A-008, A-010, A-014: hipérboles / entusiasmo / descriptivos.

## Ambigüedades bloqueantes para MVP-6sem — **RESUELTAS**

> Cierre por sesión 2026-05-14 con Franco. Las resoluciones se aplican a CAC, BR y CU correspondientes durante `clasificar-requisitos`.

---

### A-002 — RESUELTA: Tiempo objetivo del flujo

**Decisión [2026-05-14]:** se generan **dos AC separados** porque tienen escala distinta:

- **CAC-004a (humano):** Tiempo total para que el [[T-028]] complete una [[T-026]] end-to-end (desde abrir la app hasta el botón "enviar a comité") debe ser **≤ 8 minutos** en condiciones típicas (inmueble residencial estándar, 6 fotos, descripción de 200 palabras, conexión 4G).
  - Escala: minutos transcurridos cronómetro.
  - Métrica: percentil 80 sobre tasaciones reales del MVP-6sem.
  - Mínimo aceptable: 8 min. Objetivo: 6 min. Máximo aspiracional: 4 min.
- **CAC-004b (Robotomus):** Tiempo de respuesta de la inferencia [[T-023]] debe ser **≤ 5 segundos** desde request hasta response del valor referencial.
  - Escala: segundos desde request hasta JSON response.
  - Métrica: percentil 95 sobre llamadas reales (excluyendo cold start).
  - Mínimo aceptable: 5 s. Objetivo: 2 s. Máximo aspiracional: 500 ms.
  - Contexto: en MVP-6sem Robotomus es placeholder y el AC se valida con el placeholder, aunque el target real entra cuando Robotomus es modelo Fase 2.

---

### A-011 — RESUELTA: Alcance del login MVP

**Decisión [2026-05-14]:**

**MVP-6sem (Hito 1):** autenticación **email + password pre-cargada por admin** para los ~10 arquitectos del Colegio. El admin (Franco o Cocucci) crea las cuentas a mano y comparte credenciales por canal externo (WhatsApp/mail manual).

**NO incluye** en MVP-6sem: autoregistro, SSO, recuperación de contraseña, captcha, MFA, invitaciones por email, magic links.

**Post-MVP (Fase 2+):** migración a **Auth0** (o equivalente como Clerk, Supabase Auth) con soporte para:
- Login con Google OAuth.
- SSO empresarial vía dominio (`@empresa.com.ar`) — para clientes B2B grandes (bancos, Remax, Poder Judicial).
- Email + password (mantiene el modo MVP).
- Recuperación de contraseña.
- MFA opcional para owners B2B.

**Implicación arquitectónica:** el backend debe exponer un contrato de identidad agnóstico desde el día 1 (JWT estándar, claim `sub`), aunque adentro el MVP use solo SQL simple. Esto evita refactor pesado al migrar a Auth0.

---

### A-016 — RESUELTA: Semántica de "guardar" + "compartir"

**Decisión [2026-05-14]:** modelo de datos confirmado a partir de las 3 imágenes de la maqueta vieja + ajustes.

**Estructura de Tasación (versión MVP-6sem):**

```
Tasación
├── Identificación (auto-generada)
│   ├── id_tasacion              int auto-incremental
│   ├── fecha_alta               date
│   ├── estado                   enum {[[T-002]] Borrador, [[T-014]] Inspección hecha,
│   │                                  [[T-022]] Por tasar, [[T-009]] En comité,
│   │                                  [[T-027]] Tasada, [[T-007]] Compartida}
│   ├── progreso_pct             float derivado del estado (0..100)
│   └── tasador_id               FK → Usuario (= el [[T-028]] autor, derivado del login)
│
├── Tipo y motivo (form, requerido para guardar)
│   ├── tipo_inmueble            enum: casa | departamento | terreno | galpón | local | oficina
│   └── motivo                   enum (10 opciones, CBR-017): venta | alquiler |
│                                asesoramiento de valores para particulares |
│                                tasación para empresas | expropiaciones |
│                                divisiones/fraccionamientos | sucesión |
│                                tasación judicial | tasación extrajudicial | hipoteca
│
├── Ubicación (form, requerido para guardar)
│   ├── domicilio                string (autocompletado por Google Maps Places API)
│   ├── latitud                  float
│   ├── longitud                 float
│   └── modo_carga               enum: ubicacion_actual | manual_google_maps
│
├── Solicitante (form, requerido para guardar) — sinónimo: Referente
│   ├── nombre                   string (requerido)
│   ├── apellido                 string (requerido)
│   ├── telefono                 string formato E.164 ARG (+54...) (requerido)
│   └── email                    string (opcional pero requerido si se usa "compartir por mail")
│
├── Fotos (form, ≥1 requerida, máx 15)
│   └── fotos[]                  array de URLs/blobs (UI MVP = carrusel simple)
│
├── Detalles (form, requerido para guardar)
│   ├── superficie_total_m2      number (requerido)
│   ├── superficie_cubierta_m2   number (requerido)
│   ├── dormitorios              int (requerido para casa/depto; N/A para terreno/galpón/local/oficina)
│   ├── banos                    int (requerido para casa/depto)
│   ├── antiguedad_anios         int (requerido)
│   ├── estado_conservacion      int 1..5 — escala ordinal (input de [[T-023]])
│   │       1 = A refaccionar    (coef Fitt-Servini 0.40)
│   │       2 = Regular          (coef 0.55)
│   │       3 = Bueno            (coef 0.70)
│   │       4 = Muy bueno        (coef 0.85)
│   │       5 = A estrenar       (coef 1.00)
│   └── amenities[]              array de strings (lista tentativa, ver Q12)
│
├── Descripción (form, mínimo 50 caracteres)
│   └── descripcion              text
│
└── Valoración (comité, auto-generada al cerrar)
    ├── valor_ARS                money (defecto 0)
    ├── valor_USD                money (defecto 0)
    ├── participantes_comite[]   array de FK → Usuario
    └── fecha_tasacion           date (al pasar a [[T-027]] Tasada)
```

**"Guardar" significa:** persistir todos los campos requeridos en estado [[T-002]] Borrador. Si falta algún campo requerido, validación bloquea el guardado y muestra error específico. La transición a [[T-014]] Inspección hecha sucede cuando el [[T-028]] confirma haber finalizado el relevamiento.

**"Compartir" significa (decisión final A + C):**

- **A) Descarga directa del PDF:** botón "Descargar PDF" siempre disponible en estado ≥ [[T-027]]. Tasador descarga y comparte por su cuenta (WhatsApp, mail externo, papel).
- **C) Envío por mail desde la app:** botón "Enviar al solicitante por mail". La app genera un mail **pre-diseñado** con: PDF adjunto, asunto "Tasación de [domicilio] - Tasa Inmuebles", destinatario = email del solicitante (validación: requerido el campo email del solicitante para esta opción).
- **NO se implementa link único auditable** (opción B). Riesgo asumido: **sin trazabilidad de apertura por parte del cliente**. Si en Fase 2 los clientes B2B (banco, Poder Judicial) lo exigen para auditoría, se agrega entonces.

**Decisión derivada (DS-07):** se necesita proveedor SMTP desde MVP-6sem (no Fase 2 como estaba documentado). Candidatos: Resend, Postmark, Mailgun, SES (plan gratis ~100-3000 mails/mes alcanza). Actualizar Q06 (catálogo de integraciones).

---

### A-017 — RESUELTA: Criterio de éxito del MVP

**Decisión [2026-05-14]:** **criterio estricto 10/10**.

El MVP se considera **exitoso** cuando, durante la semana del Hito 1 (2026-06-25):

1. **10 de 10 arquitectos** del Colegio inician sesión con sus credenciales pre-cargadas.
2. **10 de 10** crean al menos una [[T-026]] sobre un inmueble real (admite más de una por arquitecto si quieren).
3. **10 de 10** completan el flujo end-to-end: geolocalizar + datos + 3+ fotos + descripción + guardar + enviar a comité.
4. El comité (los 3 socios + el arquitecto autor) cierra el valor final de cada tasación.
5. Se genera el PDF y se descarga (opción A) o se envía por mail (opción C).

**Métricas duras:**
- **Adopción**: ≥ 10 tasaciones completas end-to-end (1 por arquitecto mínimo).
- **Calidad**: 0 errores P0 (que impidan completar el flujo). 0 pérdidas de datos.
- **Sin métrica de satisfacción** (NPS / encuesta) en MVP-6sem — se descarta por simplicidad.

**Implicancia operativa:** el criterio 10/10 es estricto. Hay que reservar tiempo de la semana de demo para **soporte personalizado** a cualquier arquitecto que se atasque. Esto debe estar planificado, no improvisado.

---

## Próximo paso

`clasificar-requisitos`: promover candidatos del staging a `05_negocio/`, `06_usuario/`, `07_software/`, usando como input las 4 resoluciones de arriba. Las **13 ambigüedades restantes** (A-001, A-003-010, A-012-015) se traducen a medida que se trabajen sus subsistemas correspondientes.
