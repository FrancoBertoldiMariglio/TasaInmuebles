# Decisiones de Scope MVP — Tasa Inmuebles
*Hito 1 — Demo Colegio de Arquitectos (~2026-06-25)*

> Documento generado el 2026-05-19 10:22 a. m. desde `mvp-builder.html`. Lista los artefactos del wiki que entran al MVP, con referencia al archivo fuente. **Snapshot de la decisión de scope, no reemplaza el wiki.**

**Total de artefactos en MVP**: 49
- Casos de Uso: 10
- Requisitos Funcionales: 20
- Atributos de Calidad: 5
- Reglas de Negocio (Software): 13
- Reglas de Negocio (Negocio): 1

---

## Casos de Uso (Nivel Usuario) (10)

| ID | Título | Fase | Archivo |
|---|---|---|---|
| **CU-UI-001** | CU-UI-001 — Tasador crea una tasación nueva end-to-end | MVP-6sem | `wiki/requisitos/06_usuario/CU-UI-001.md` |
| **CU-UI-002** | CU-UI-002 — Tasador inicia sesión en la plataforma | MVP-6sem | `wiki/requisitos/06_usuario/CU-UI-002.md` |
| **CU-UI-003** | CU-UI-003 — Tasador consulta sus tasaciones ("Mis tasaciones", pantalla principal de la app mobile) | MVP-6sem | `wiki/requisitos/06_usuario/CU-UI-003.md` |
| **CU-UI-004** | CU-UI-004 — Comité de tasación cierra el valor final | MVP-6sem (versión manual sin Robotomus real) | `wiki/requisitos/06_usuario/CU-UI-004.md` |
| **CU-UI-005** | CU-UI-005 — Tasador comparte la tasación con el solicitante | MVP-6sem | `wiki/requisitos/06_usuario/CU-UI-005.md` |
| **CU-UI-006** | CU-UI-006 — Admin pre-carga usuarios (arquitectos del Colegio) | MVP-6sem | `wiki/requisitos/06_usuario/CU-UI-006.md` |
| **CU-UI-009** | CU-UI-009 — Sistema asigna tasador automáticamente por zona | Fase 2 | `wiki/requisitos/06_usuario/CU-UI-009.md` |
| **CU-UI-010** | CU-UI-010 — Owner consulta dashboard B2B agregado (web + mobile embebida) | Fase 2 | `wiki/requisitos/06_usuario/CU-UI-010.md` |
| **CU-UI-012** | CU-UI-012 — Tasador certificado firma tasación con inspección ocular | Fase 2 | `wiki/requisitos/06_usuario/CU-UI-012.md` |
| **CU-UI-014** | CU-UI-014 — Cliente B2C realiza una Tasación Referencial desde la app mobile | MVP-6sem | `wiki/requisitos/06_usuario/CU-UI-014.md` |

## Requisitos Funcionales (Nivel Software) (20)

| ID | Título | Fase | Archivo |
|---|---|---|---|
| **RF-001** | RF-001 — Seleccionar tipo de inmueble | MVP-6sem | `wiki/requisitos/07_software/RF/RF-001.md` |
| **RF-002** | RF-002 — Capturar motivo de tasación | MVP-6sem | `wiki/requisitos/07_software/RF/RF-002.md` |
| **RF-003** | RF-003 — Geolocalizar inmueble | MVP-6sem | `wiki/requisitos/07_software/RF/RF-003.md` |
| **RF-004** | RF-004 — Capturar datos del solicitante | MVP-6sem | `wiki/requisitos/07_software/RF/RF-004.md` |
| **RF-005** | RF-005 — Capturar detalles del inmueble | MVP-6sem | `wiki/requisitos/07_software/RF/RF-005.md` |
| **RF-006** | RF-006 — Subir fotos del inmueble | MVP-6sem | `wiki/requisitos/07_software/RF/RF-006.md` |
| **RF-007** | RF-007 — Capturar descripción del inmueble | MVP-6sem | `wiki/requisitos/07_software/RF/RF-007.md` |
| **RF-008** | RF-008 — Validar y guardar tasación | MVP-6sem | `wiki/requisitos/07_software/RF/RF-008.md` |
| **RF-009** | RF-009 — Transicionar a "Por tasar" / enviar a comité | MVP-6sem | `wiki/requisitos/07_software/RF/RF-009.md` |
| **RF-010** | RF-010 — Login con email + password | MVP-6sem | `wiki/requisitos/07_software/RF/RF-010.md` |
| **RF-011** | RF-011 — Listar tasaciones del tasador ("Mis tasaciones", pantalla principal app mobile) | MVP-6sem | `wiki/requisitos/07_software/RF/RF-011.md` |
| **RF-012** | RF-012 — Generar PDF de tasación | MVP-6sem | `wiki/requisitos/07_software/RF/RF-012.md` |
| **RF-013** | RF-013 — Descargar PDF (opción A de "Compartir") | MVP-6sem | `wiki/requisitos/07_software/RF/RF-013.md` |
| **RF-014** | RF-014 — Enviar PDF por mail al solicitante (opción C de "Compartir") | MVP-6sem | `wiki/requisitos/07_software/RF/RF-014.md` |
| **RF-015** | RF-015 — Cerrar valor final en comité | MVP-6sem | `wiki/requisitos/07_software/RF/RF-015.md` |
| **RF-016** | RF-016 — Calcular valor técnico vía fórmula Fitt-Servini | MVP-6sem | `wiki/requisitos/07_software/RF/RF-016.md` |
| **RF-017** | RF-017 — Pantalla de bienvenida con CTA bifurcado | MVP-6sem | `wiki/requisitos/07_software/RF/RF-017.md` |
| **RF-018** | RF-018 — Autoregistro de Cliente B2C (email + password) | MVP-6sem | `wiki/requisitos/07_software/RF/RF-018.md` |
| **RF-019** | RF-019 — Captura de Tasación Referencial (Cliente B2C) | MVP-6sem | `wiki/requisitos/07_software/RF/RF-019.md` |
| **RF-020** | RF-020 — Generar PDF de Tasación Referencial | MVP-6sem | `wiki/requisitos/07_software/RF/RF-020.md` |

## Atributos de Calidad (No Funcionales) (5)

| ID | Título | Fase | Archivo |
|---|---|---|---|
| **AC-001** | AC-001 — Tiempo total del flujo Nueva Tasación (profesional) | MVP-6sem | `wiki/requisitos/07_software/NF/AC-001.md` |
| **AC-003** | AC-003 — Usabilidad mobile en campo | MVP-6sem | `wiki/requisitos/07_software/NF/AC-003.md` |
| **AC-005** | AC-005 — Compliance con Ley 25.326 (Protección de Datos Personales) | MVP-6sem (upfront desde día 1) | `wiki/requisitos/07_software/NF/AC-005.md` |
| **AC-012** | AC-012 — Performance de carga inicial de la app mobile | MVP-6sem | `wiki/requisitos/07_software/NF/AC-012.md` |
| **AC-013** | AC-013 — Performance del cálculo Fitt-Servini + render de resultado (flujo Cliente B2C) | MVP-6sem | `wiki/requisitos/07_software/NF/AC-013.md` |

## Reglas de Negocio (Software, operativas) (13)

| ID | Título | Fase | Archivo |
|---|---|---|---|
| **BR-002** | BR-002 — Habilitador de matrícula vigente para Tasador profesional | MVP-6sem | `wiki/requisitos/07_software/BR/BR-002.md` |
| **BR-004** | BR-004 — Catálogo cerrado de tipos de inmueble | MVP-6sem | `wiki/requisitos/07_software/BR/BR-004.md` |
| **BR-005** | BR-005 — Catálogo cerrado de 10 motivos de tasación | MVP-6sem | `wiki/requisitos/07_software/BR/BR-005.md` |
| **BR-006** | BR-006 — Escala ordinal estado_conservacion + coeficientes Fitt-Servini | MVP-6sem | `wiki/requisitos/07_software/BR/BR-006.md` |
| **BR-007** | BR-007 — Restricción de cantidad máxima de fotos por tasación | MVP-6sem | `wiki/requisitos/07_software/BR/BR-007.md` |
| **BR-008** | BR-008 — Restricción de longitud mínima de descripción | MVP-6sem | `wiki/requisitos/07_software/BR/BR-008.md` |
| **BR-009** | BR-009 — Restricción: solo arquitectos del Colegio en MVP-6sem (rol Tasador) | MVP-6sem (caduca al expandir a otros colegios) | `wiki/requisitos/07_software/BR/BR-009.md` |
| **BR-014** | BR-014 — Hecho: transición Borrador → Inspección hecha | MVP-6sem | `wiki/requisitos/07_software/BR/BR-014.md` |
| **BR-015** | BR-015 — Hecho: transición automática Inspección hecha → Por tasar | MVP-6sem | `wiki/requisitos/07_software/BR/BR-015.md` |
| **BR-018** | BR-018 — Hecho: toda tasación lleva dos índices de valor | MVP-6sem | `wiki/requisitos/07_software/BR/BR-018.md` |
| **BR-019** | BR-019 — Cálculo: Fórmula Fitt-Servini lite | MVP-6sem | `wiki/requisitos/07_software/BR/BR-019.md` |
| **BR-021** | BR-021 — Restricción: PDF de Tasación referencial requiere disclaimer | MVP-6sem | `wiki/requisitos/07_software/BR/BR-021.md` |
| **BR-022** | BR-022 — Habilitador: visibilidad de tasaciones del Cliente B2C | MVP-6sem | `wiki/requisitos/07_software/BR/BR-022.md` |

## Reglas de Negocio (Nivel Negocio, conceptuales) (1)

| ID | Título | Fase | Archivo |
|---|---|---|---|
| **BR-NEG-001** | BR-NEG-001 — Reducir tiempo y fricción de tasaciones inmobiliarias certificadas | transversal | `wiki/requisitos/05_negocio/BR-NEG-001.md` |

---

## Anexo A — Contexto del proyecto

> Los siguientes artefactos NO son scope MVP en el sentido estricto, pero son contexto necesario para entender las decisiones. Referencias a archivos del wiki para consulta.

### Fundamentos (Cockburn 3 pilares)
- `proyecto/wiki/requisitos/00_fundamentos.md`

### Stakeholders
- `proyecto/wiki/requisitos/01_stakeholders/matriz-poder-interes.md` (matriz poder/interés, 22 stakeholders)
- `proyecto/wiki/requisitos/01_stakeholders/snowman.md` (6 roles DSDM)

### Enfoque IR
- `proyecto/wiki/requisitos/02_enfoque-IR.md` (MoSCoW + dual-track + Cynefin)

### Requisitos Globales
- `proyecto/wiki/requisitos/04_requisitos-globales.md` (RG-001..006, invariantes del sistema)

### Decisiones Pendientes
- `proyecto/wiki/requisitos/10_decisiones/pendientes.md` (DP, DS, Q abiertas)
- `proyecto/wiki/00_preguntas_pendientes.md` (Q01..Q12)

---

## Anexo B — Trazabilidad MVP (cascada por CU)

- **CU-UI-001** arrastra (20): AC-001, AC-003, AC-005, BR-004, BR-005, BR-006, BR-007, BR-008, BR-014, BR-015, BR-NEG-001, RF-001, RF-002, RF-003, RF-004, RF-005, RF-006, RF-007, RF-008, RF-009
- **CU-UI-002** arrastra (6): AC-005, AC-012, BR-002, BR-009, BR-NEG-001, RF-010
- **CU-UI-003** arrastra (4): AC-003, AC-012, BR-NEG-001, RF-011
- **CU-UI-004** arrastra (8): AC-001, AC-013, BR-006, BR-018, BR-019, BR-NEG-001, RF-015, RF-016
- **CU-UI-005** arrastra (6): AC-001, AC-005, BR-NEG-001, RF-012, RF-013, RF-014
- **CU-UI-006** arrastra (1): BR-NEG-001
- **CU-UI-009** arrastra (0): —
- **CU-UI-010** arrastra (0): —
- **CU-UI-012** arrastra (0): —
- **CU-UI-014** arrastra (17): AC-001, AC-003, AC-005, AC-012, AC-013, BR-006, BR-007, BR-008, BR-019, BR-021, BR-022, BR-NEG-001, RF-016, RF-017, RF-018, RF-019, RF-020

---

## Anexo C — Artefactos del wiki NO incluidos

- **Casos de Uso (Nivel Usuario)** (7): CU-UI-007, CU-UI-008, CU-UI-011, CU-UI-013, CU-UI-015, CU-UI-016, CU-UI-017
- **Reglas de Negocio (Software, operativas)** (1): BR-001
- **Reglas de Negocio (Nivel Negocio, conceptuales)** (2): BR-NEG-003, BR-NEG-004

---

*Generado por mvp-builder.html. Wiki: `/Users/francobertoldi/Documents/Cocucci/proyecto/wiki/`*
