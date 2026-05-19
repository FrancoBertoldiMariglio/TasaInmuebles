# Mobile App v0 — Design Brief — Tasa Inmuebles

> Brief consolidado para pegar al inicio de una conversación con **Claude Design** (claude.ai/design). Objetivo: producir un primer-shot del prototipo mobile del MVP del Hito 1, listo para iterar conversacionalmente.
>
> **Cómo usarlo**: pegar este documento entero en la primera turno de la conversación con Claude Design + adjuntar las 31 imágenes de referencia ubicadas en `analisis/imgs/`. Indicar explícitamente: "estas imágenes son la maqueta de referencia del producto; replicá fielmente la paleta, la tipografía y los patrones de componentes".

---

## 1. Proyecto en una página

**Tasa Inmuebles** es una plataforma argentina de gestión de tasaciones inmobiliarias. Combina dos productos en una sola app mobile:

1. **"Uber de tasación"** profesional: arquitectos matriculados del Colegio de Arquitectos relevan inmuebles en campo, los validan en comité y entregan un PDF firmado al solicitante.
2. **Autotasador B2C**: particulares completan datos básicos de su propiedad y obtienen una tasación referencial gratuita en PDF (no certificada).

El MVP a entregar el 2026-06-25 es una demo al Colegio de Arquitectos con ~10 matriculados completando tasaciones reales end-to-end. La app es **mobile-only**: el v0 a generar acá es la única superficie de UI del MVP.

Dominio comercial: `tasacioninmuebles.com`. Nombre corto en el logo: "**Tasainmuebles**".

---

## 2. Audiencia

| Rol | Quién es | Cómo entra al sistema |
|---|---|---|
| **Tasador profesional** | Arquitecto matriculado del Colegio. ~10 personas en el MVP. Usa la app en el campo durante visitas a inmuebles. | Login con email + password (credenciales pre-cargadas por admin) |
| **Cliente B2C** | Particular sin matrícula que quiere una tasación referencial gratuita de su inmueble. Acceso público. | Autoregistro con email + password + aceptación de términos |
| **Comité de tasación** | Subgrupo de 3-4 tasadores (los socios + el autor) que valida tasaciones profesionales. | Mismo login que tasador (los miembros del comité son tasadores con un permiso adicional) |
| **Solicitante (pasivo)** | Cliente final del tasador profesional. **No opera el sistema** — recibe el PDF por email o WhatsApp. | N/A |

**Bifurcación por rol**: la app es una sola, pero la pantalla de bienvenida tiene un CTA bifurcado **"Soy Tasador (login)"** vs **"Soy Cliente / Quiero tasar mi propiedad (autoregistro)"**.

---

## 3. Identidad de marca

> Esta sección está **basada en la maqueta WhatsApp existente** (ver `analisis/imgs/`). Respetar fielmente; no proponer alternativas.

### 3.1 Logo

- **Wordmark**: "**Tasa**inmuebles" — "Tasa" en peso bold con color coral del sistema; "inmuebles" en peso bold pero en gris oscuro/negro.
- **Isotipo**: 4 pétalos/formas redondeadas dispuestas en cuadrado, en gradiente del coral del sistema hacia el teal/azul-verde. Funciona como favicon y como avatar de la app.
- **Variantes que Claude Design debe proponer**: versión monocroma (para fondos coral), versión solo-isotipo (para favicon y splash), versión wordmark sin isotipo (header reducido).

### 3.2 Paleta (extraída de la maqueta)

| Token | Hex aprox | Uso semántico |
|---|---|---|
| `primary` | `#F87171` / `~coral salmon` | Acciones primarias (botones "Guardar cambios", "Editar", "Ver tasación"), tabs activas, links de énfasis, FAB de "Nueva tasación" |
| `primary-soft` | `#FEE2E2` / `~pale coral` | Estado seleccionado de chips (ej: "Casa" seleccionado), fondo de botones outline al hover, paginación activa |
| `surface-dark` | `#2A3140` / `~navy charcoal` | Cards del dashboard "Tasaciones" (con patrón de mapa sutil al fondo), bottom navigation bar, botón "Fotos" oscuro contained |
| `success` | `#10B981` / `~mint green` | Badge "Apta para tasar", barra de progreso de tasación, valores Robotomus, indicador "A tasar" en KPI |
| `warning` | `#FBBF24` / `~mustard yellow` | Badge "Pendientes", indicador "A editar" en KPI card, badge "A tasar" |
| `info` | `#60A5FA` / `~soft blue` | Badge "En proceso", chips secundarios, avatar del comité |
| `surface-bg` | `#F4F5F8` / `~very pale grey-blue` | Fondo general de la app |
| `surface-card` | `#FFFFFF` | Fondo de cards |
| `text-primary` | `#1F2937` / `~near-black` | Títulos, valores grandes, labels |
| `text-muted` | `#9CA3AF` / `~medium grey` | Subtítulos, hints en inputs, breadcrumbs secundarios |

> Las hex son aproximaciones; **Claude Design debe extraer los valores exactos desde las imágenes adjuntadas**.

### 3.3 Tipografía

- **Familia**: sans-serif geométrica de cuerpo ancho (estilo Manrope / Inter / DM Sans). Si Claude Design tiene que elegir, **Manrope** es la más cercana al look observado.
- **Pesos usados**: Regular (400), Medium (500), Semibold (600), Bold (700).
- **Jerarquía**:
  - H1 / KPIs grandes: 32-40px Bold (números "149", "03")
  - H2 / Títulos de sección: 20-24px Semibold ("Tasaciones", "Listado de tasaciones")
  - H3 / Labels de campos: 14-16px Medium
  - Body: 14-16px Regular
  - Caption / metadata: 12-13px Regular muted

### 3.4 Iconografía

- Estilo lineal, peso fino, esquinas redondeadas (estilo **Lucide** o **Feather Icons**).
- Iconos de **tipos de inmueble** (casa, departamento, terreno, galpón, local, oficina) en coral cuando el chip está seleccionado y en gris cuando no.
- Iconos funcionales: lápiz (editar), papel (tasaciones), barras (estadísticas), megáfono (comunicaciones), casa (home), + (FAB nueva tasación), campana (notificaciones), tres puntos (overflow menu).

### 3.5 Ilustraciones

Para modales de éxito y empty states: ilustración plana, líneas finas, paleta acotada al coral del sistema + pasteles complementarios. Estilo de la captura `12.45.49.jpeg` (mano firmando checklist sobre mancha de color suave).

### 3.6 Mascota Robotomus

El módulo IA "Robotomus" tiene una **mascota propia visible en la ficha del comité**: un robot mint/verde con antena, cara amigable y pixel-art-style. Mantenerla en el v0 como branding del componente IA. En MVP se muestra con etiqueta "Robotomus en desarrollo".

### 3.7 Tono de voz

- **Formal pero accesible**. Castellano rioplatense neutral.
- Profesional sin ser frío. Mensajes de éxito con calidez visible (ej: "Tasación editada exitosamente. La tasación #1578 ha sido modificada.").
- Errores claros y accionables, nunca culpando al usuario ("No se pudo obtener tu ubicación. Ingresá el domicilio manualmente.").

---

## 4. Alcance del one-shot (mobile MVP)

Las pantallas a generar cubren los 7 casos de uso del MVP del Hito 1. **No incluir** pantallas de Fase 2 (dashboard B2B, back office admin web, etc.).

---

## 5. Pantallas a generar

Lista cerrada de pantallas + estados. Numeración para que Claude Design pueda referenciarlas en la conversación.

### 5.1 Onboarding y autenticación

1. **Splash** — logo Tasainmuebles centrado sobre fondo coral suave o blanco. 1.5s antes de transicionar.
2. **Bienvenida bifurcada** — Logo + dos CTAs: "Soy Tasador" (outline) y "Quiero tasar mi propiedad" (primario coral).
3. **Login Tasador** — Email + password + botón "Iniciar sesión" + link "Olvidé mi contraseña" (link disabled o muteado en MVP).
4. **Autoregistro Cliente B2C** — Email + password + repetir password + checkbox "Acepto términos y consentimiento de datos (Ley 25.326)" + botón "Crear cuenta".

### 5.2 Tasador profesional (núcleo del MVP)

5. **Mis Tasaciones** (home tasador) — Header con logo + avatar + campana + tres puntos. Dos cards KPI en navy con patrón sutil de mapa: "A editar (149)" en amarillo, "A tasar (03)" en verde, con botón "Ver tasaciones" cada una. Debajo: "Listado de tasaciones" con search bar pill + tabs filtro ("Todas", "Pendientes", "Sin asignar", "En proceso"). Tabla con columnas ID, FECHA, USUARIO, TASADOR. Paginación numerada al pie. Bottom nav: Home / Tasaciones / **FAB coral con +** / Estadísticas / Comunicaciones.
6. **Nueva Tasación** (acordeón) — Header con flecha atrás + título "Nueva tasación". Card "Tipo de inmueble" con chips horizontales scrolleables: Casa, Departamento, Terreno, Galpón, Local, Oficina. Debajo, card "Datos de solicitud" con acordeones colapsables: **Motivo** (con dropdown "Tasación para venta"), **Ubicación**, **Solicitante**, **Fotos**, **Detalles**, **Descripción del inmueble**. Al final, botón primario coral full-width "Guardar cambios".
7. **Nueva Tasación — sección Motivo expandida** — Mostrar el acordeón "Motivo" abierto con un dropdown "Seleccione un motivo para su tasación" mostrando "Tasación para venta" como ejemplo seleccionado. Catálogo de 10 motivos (venta, alquiler, sucesión, divorcio, judicial, garantía, contable, seguro, donación, otro).
8. **Nueva Tasación — sección Ubicación expandida** — Botón "Usar mi ubicación actual" (con icon de pin) + separador "o" + campo de input con autocomplete (mock) "Ingresá un domicilio".
9. **Nueva Tasación — sección Solicitante expandida** — Inputs: Nombre*, Apellido*, Teléfono* (prefijo AR +54), Email (opcional). Marcar requeridos con asterisco.
10. **Nueva Tasación — sección Fotos expandida** — Grid de hasta 15 slots para fotos. Botón "Tomar foto" con icon de cámara + botón "Elegir de galería" con icon de imagen. Si hay fotos cargadas, mostrar thumbnails con X para eliminar.
11. **Nueva Tasación — sección Detalles expandida** — Inputs: superficie total (m²), superficie cubierta (m²), dormitorios, baños (estos dos ocultos si tipo=terreno/local/oficina), antigüedad (años), estado de conservación (slider 1-5 o chips), amenities (checkboxes: pileta, parrilla, cochera, dependencia, balcón, terraza, jardín, baulera).
12. **Nueva Tasación — sección Descripción expandida** — Textarea con contador de caracteres ("0 / mínimo 50"), placeholder "Describí el inmueble en al menos 50 caracteres".
13. **Detalle de Tasación — tab Tasación** (mockup `12.45.44 (1).jpeg`) — Header con flecha atrás + "Tasación 1578". Tabs: **Tasación** (activa, underline coral) / **Comité de tasación**. Card "Presentación del inmueble" con carousel de fotos (flechas L/R), badge "A tasar" en amarillo, datos en grid 2 columnas (Tasación 1578 / Fecha alta, Tipo de inmueble / Referente, Domicilio / Motivo), valores "Valor en AR$ 0" y "Valor en USD 0", barra de progreso mint con avatares de participantes + "3 días" estimados. Sección "Más información" con acordeones colapsables (Ubicación, Solicitante, Fotos, Detalles, Descripción). Botón primario full-width "✏️ Editar".
14. **Detalle de Tasación — tab Comité** (mockup `12.45.44 (2).jpeg`) — Misma estructura pero tab Comité activa. Card con título narrativo ("Tasacion para venta en calle Joaquin V. González 1895."), referente, toggle de vista Fotos / Mapa. Carousel grande de fotos + 3 thumbnails debajo. Card "Datos de tasación" con botón "✏️ Editar" coral. Acordeones (Descripción, Características, Superficies, Servicios, **Valorar tasación**). Card **Robotomus** con mascota mint a la izquierda + "Valor en AR$ $0.000,00" y "Valor en USD $0.000,00" en cards bordeadas con dashed, etiqueta "Robotomus en desarrollo". Sección "Inmuebles similares" con contador.
15. **Comité — Cerrar Valor (modal o sheet)** — Modal con dos opciones: "Aceptar valor Fitt-Servini" (primario coral) o "Override manual". Si override, dos inputs (ARS y USD) + textarea opcional "Motivo del override".
16. **Generar PDF / Compartir** — Pantalla con preview del PDF + dos botones: "Descargar PDF" (primario coral) y "Enviar por email" (outline). Si el solicitante no tiene email cargado, el segundo botón está disabled con tooltip explicativo.

### 5.3 Modales transversales

17. **Modal Éxito** (mockup `12.45.49.jpeg`) — Card blanco rounded con X de cerrar arriba. Título "Tasación editada exitosamente". Subtítulo "La tasación # 1578 ha sido modificada." Ilustración decorativa de mano firmando checklist. Dos botones: "Cancelar" (outline coral pálido) + "Ver tasación" (primario coral).
18. **Modal Confirmación de Archivar** — Similar al éxito pero con copy "¿Desea archivar su tasación 1578?" + ilustración acorde. Dos botones: "Cancelar" + "Archivar" (primario coral).
19. **Modal Valoración Exitosa** — Para cuando el comité cierra el valor. Copy de éxito + valores ARS/USD del cierre + botón "Ver tasación".

### 5.4 Cliente B2C — Autotasador

20. **Mis Tasaciones Referenciales** (home B2C) — Versión simplificada del home del tasador. Empty state con ilustración + copy "Todavía no tasaste ninguna propiedad. Tocá el + para empezar." + FAB coral con +.
21. **Nueva Tasación Referencial** — Mismo patrón acordeón que CU-UI-001 pero sin geolocalización (campo de domicilio manual) y sin requerimiento mínimo de fotos. Botón final "Calcular valor" coral.
22. **Resultado de Tasación Referencial** — Pantalla con valor técnico (ARS + USD) en cards grandes, valor Robotomus (mock placeholder), disclaimer destacado **"No certificada profesionalmente. Para certificación, consulte con un tasador colegiado."**, botones "Descargar PDF" y "Enviar a mi email".

---

## 6. Estados a cubrir por pantalla

Para cada pantalla aplican estos estados cuando correspondan:

| Estado | Cuándo aplica | Descripción visual |
|---|---|---|
| **Empty** | Listados sin datos (Mis Tasaciones de B2C recién registrado, listado filtrado sin resultados) | Ilustración + copy + CTA primario |
| **Loading** | Esperando respuesta de backend | Skeleton screens (no spinners centrados a pantalla completa) |
| **Error de validación** | Input requerido vacío al guardar | Campo bordeado en coral + mensaje específico debajo |
| **Error de red** | Sin conexión o timeout | Banner sticky superior coral + reintento manual |
| **Success** | Acción completada exitosamente | Modal con ilustración (ver §5.3) |
| **Disabled** | Acción no disponible (ej: "Enviar email" sin email del solicitante) | Botón con opacity reducida + tooltip al tocar |

---

## 7. Componentes reutilizables a entregar

Claude Design debe producir un design system con estos componentes nombrados y reusables:

- **Button** — variantes: `primary`, `outline`, `ghost`, `disabled`. Tamaños: `sm`, `md`, `lg`, `full-width`.
- **Chip** — variantes: `default`, `selected` (con coral suave de fondo), `with-icon`. Para tipos de inmueble.
- **Badge de estado** — variantes color-coded: `coral` (Sin asignar), `mint` (Apta para tasar), `mustard` (Pendientes / A tasar), `info-blue` (En proceso).
- **Card** — `surface` (blanco), `surface-dark` (navy con patrón sutil de mapa de fondo).
- **Acordeón / Expandable section** — header con label + chevron, expand animado.
- **Input field** — variants: `text`, `email`, `password`, `phone-AR` (con prefijo +54), `textarea` con contador, `dropdown`, `slider`.
- **Tab bar** — activa con underline coral.
- **Bottom navigation** — fondo navy, 5 items con FAB central coral.
- **FAB** — botón circular flotante coral con icono +, sombra suave.
- **Search bar** — pill-shape con icon de lupa + icon de filtros a la derecha.
- **Progress bar** — segmentada mint, con avatars circulares de participantes.
- **Modal / Bottom Sheet** — card blanco rounded con X, título, subtítulo, ilustración opcional, 2 botones (outline + primario).
- **Toast / Banner sticky** — para errores de red.
- **Skeleton loader** — para listados cargando.
- **Avatar** — circular, con iniciales o foto.

---

## 8. Flujos de usuario (referencia a CU-UI)

Para cada flujo, ver el caso de uso detallado en `proyecto/wiki/requisitos/06_usuario/`:

| Flow | CU-UI | Pantallas involucradas (de §5) |
|---|---|---|
| Login profesional | CU-UI-002 | 1 → 2 → 3 → 5 |
| Autoregistro B2C | CU-UI-014 (parte 1) | 1 → 2 → 4 → 20 |
| Crear nueva tasación profesional | CU-UI-001 | 5 → 6 → 7..12 → modal success → 13 |
| Consultar mis tasaciones | CU-UI-003 | 5 (con filtros y paginación) |
| Comité cierra valor | CU-UI-004 | 13 → 14 → 15 → 19 (modal valoración exitosa) |
| Compartir PDF | CU-UI-005 | 16 |
| Autotasación referencial B2C | CU-UI-014 (parte 2) | 20 → 21 → 22 |

---

## 9. Referencias visuales

> Adjuntar las **31 imágenes** ubicadas en `analisis/imgs/` al primer mensaje en Claude Design. Indicarle a Claude Design: "**estas son la maqueta de referencia; respetar paleta, tipografía, iconografía y patrones de layout**".

Mapeo de imágenes a pantallas de §5:

| Archivo | Pantalla referida |
|---|---|
| `12.45.43.jpeg` | Listado desktop tabla (referencia tipográfica de la tabla; en mobile mantener mismas columnas) |
| `12.45.43 (1).jpeg` | Pantalla 6 — Nueva tasación acordeón (mobile) ★ **canónica** |
| `12.45.44 (1).jpeg` | Pantalla 13 — Detalle de Tasación tab Tasación ★ **canónica** |
| `12.45.44 (2).jpeg` | Pantalla 14 — Detalle de Tasación tab Comité ★ **canónica** |
| `12.45.44 (3).jpeg` | Pantalla 9 — Sección Solicitante expandida ★ **canónica** |
| `12.45.45 (2).jpeg` | Pantalla 19 — Modal valoración exitosa |
| `12.45.45 (3).jpeg` | Listado desktop con filtros (referencia para listado mobile) |
| `12.45.46.jpeg` y variantes | Tabla usuarios admin (descartar en MVP — admin es CLI) |
| `12.45.48.jpeg` | Pantalla 5 — Home tasador con KPI cards ★ **canónica** |
| `12.45.49.jpeg` | Pantalla 17 — Modal éxito edición ★ **canónica** |
| `12.45.49 (1).jpeg` | Modal "Lista para tasar" — variante del modal éxito |

★ = referencia canónica de estilo. **Estas son las que Claude Design debe mirar primero**.

---

## 10. Restricciones

### 10.1 Accesibilidad

- WCAG 2.1 nivel AA mínimo. Contraste de color verificado (especialmente texto blanco sobre coral primary).
- Tap targets mínimos 44x44px.
- Labels explícitos en todos los inputs (no solo placeholder).
- Soporte para `prefers-reduced-motion` en animaciones de acordeones y modales.
- Lectura por screen readers: orden lógico de tab navigation.

### 10.2 Compliance Ley 25.326 (Datos Personales AR)

- Pantalla 4 (Autoregistro B2C): checkbox **obligatorio** de aceptación de términos y consentimiento de tratamiento de datos. Link al texto legal (placeholder en MVP).
- Pantalla 11 (Solicitante): nota legal pequeña debajo "Los datos del solicitante se almacenan únicamente para fines de tasación profesional, en cumplimiento de la Ley 25.326."

### 10.3 Mobile-first

- Diseño optimizado para celulares con pantalla 360-414px de ancho.
- Soporte para safe-area iOS (notch, dynamic island, home indicator).
- Soporte para gestos: swipe en carousels de fotos, pull-to-refresh en listados.

### 10.4 No lock-in técnico

- El v0 es **prototipo visual**, no código de producción.
- No asumir framework de UI específico (ni Tailwind, ni Material, ni iOS native, ni Flutter). Si Claude Design genera código, que sea HTML/CSS o React vanilla con design tokens nombrados, fácilmente portable.
- Las decisiones de stack están abiertas (DP-S7); el v0 será adaptado al stack final cuando se cierre.

---

## 11. Fuera del alcance de este one-shot

- App web (dashboards B2B, back office admin) — Fase 2, se hará en una segunda pasada de Claude Design.
- Verificación de email en autoregistro B2C — Fase 2.
- Magic links, OTP, SSO, MFA — Fase 2.
- Pasarela de pagos — Fase 2.
- Inspección ocular certificada con firma digital colegiada — Fase 2.
- Asignación automática de tasador por zona — Fase 2.
- Robotomus IA real — Fase 2 (en este v0, Robotomus es placeholder visual).
- Marketplace de tasadores con ranking + reviews — Fase 3.

---

## 12. Pedidos explícitos a Claude Design

Cuando se inicie la conversación, pedir explícitamente:

1. **Aplicar fielmente la paleta y tipografía observadas en las imágenes adjuntas** (sección 3 de este brief). No proponer alternativas estéticas distintas; respetar el sistema existente.
2. **Generar todas las pantallas listadas en §5** en una primera pasada, incluso si las primeras son ásperas. Iterar después.
3. **Producir un design system reutilizable** con los componentes nombrados en §7. Cada pantalla debe consumir componentes del system, no estilos one-off.
4. **Entregar el handoff bundle a Claude Code** una vez aprobado el v0, para poder consumirlo en este proyecto.
5. **Proponer 3 variantes del isotipo Tasainmuebles** (4 pétalos en gradiente): la canónica observada + una simplificada para favicon + una monocroma para fondos coral.
6. **Generar el empty state, loading state y error state** para cada pantalla listada que aplique.
7. **No incluir** nada del scope de Fase 2 (sección 11).
8. **Microcopy en castellano rioplatense neutral**, formal pero accesible. Confirmaciones con calidez ("Tasación creada exitosamente"), errores accionables ("No se pudo obtener tu ubicación. Ingresá el domicilio manualmente.").

---

## 13. Output esperado

- **Prototipo interactivo navegable** en Claude Design con las 22 pantallas + estados.
- **Design system documentado** (componentes, tokens, tipografía, paleta).
- **Handoff bundle para Claude Code** cuando se apruebe.
- **Exportable** a URL pública (para compartir con Cocucci y Sebastián para validación), PDF y opcionalmente PPTX para el pitch al Colegio.

---

## 14. Próxima iteración (post-v0)

Después del primer-shot, iterar conversacionalmente sobre:

1. Cierre de tipografía concreta (Manrope vs Inter vs DM Sans).
2. Refinamiento de la mascota Robotomus (mantener estilo o evolucionar).
3. Empty states ilustrados específicos por pantalla.
4. Animaciones y microinteracciones (transiciones entre acordeones, feedback haptic, etc.).
5. Modo oscuro (Fase 2).
6. Versión web responsiva del back office (Fase 2 — brief separado).

---

## Referencias del proyecto

- Alcance: `proyecto/wiki/01_alcance_funcional.md`
- Arquitectura: `proyecto/wiki/02_arquitectura.md` (especialmente §3.1 — apps por dispositivo)
- Casos de uso: `proyecto/wiki/requisitos/06_usuario/CU-UI-001.md` a `CU-UI-014.md`
- Estados del workflow: pendientes de cerrar (Q02 en `00_preguntas_pendientes.md`) — asumir set canónico: Borrador → Inspección hecha → Por tasar → En comité → Tasada → Compartida.
- Glosario de términos del dominio: `proyecto/wiki/requisitos/03_glosario.md`.
