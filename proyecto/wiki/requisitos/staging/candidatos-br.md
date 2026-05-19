---
artefacto: candidatos-br (input vivo)
fuente: ../../../analisis/reunion-01/transcript.txt
procesado: 2026-05-14
ultima_actualizacion: 2026-05-14
total_candidatos: 19
indexados_en: ../07_software/BR/_INDEX.md
br_archivos_creados: 0/19 (pendientes — los crea `crear-regla-negocio`)
estado: VIVO — input para `crear-regla-negocio`
changelog:
  2026-05-14: "Agregado CBR-019 (fórmula Fitt-Servini lite) tras decisión de Franco de mover Fitt-Servini al MVP."
---

# Candidatos a Reglas de Negocio (BR) — **INPUT VIVO**

> ⏳ **Promoción parcial:** los 19 candidatos están indexados en [`../07_software/BR/_INDEX.md`](../07_software/BR/_INDEX.md) con IDs propuestos `BR-001..BR-020` (incluye BR-019 Fitt-Servini y BR-020 Fitt-Servini refinada Fase 2), **pero ningún archivo `BR-NNN.md` se creó todavía**. Estos archivos los genera la skill `crear-regla-negocio` con clasificación formal en los 5 tipos (Hecho / Restricción / Habilitador / Inferencia / Cálculo).
>
> Este archivo sigue siendo **input vivo** hasta que `crear-regla-negocio` materialice las 12 BR críticas MVP.

**Tipos de BR (§ 7):** `Hecho` · `Restricción` · `Habilitador` · `Inferencia` · `Cálculo`

| Candidato | RC origen | Línea | Enunciado | Tipo | Parámetros / Fuente |
|-----------|-----------|-------|-----------|------|----------------------|
| CBR-001 | RC-001, RC-021 | L5, L191 | El producto debe tener un MVP funcional para el Colegio antes del cierre del acuerdo de 6 meses con el Colegio de Arquitectos. | Restricción | Acuerdo firmado Cocucci-Colegio. Duración 6 meses. Hito 1 = 2026-06-25. Hito 2 = ~2026-10-19. |
| CBR-002 | RC-020 | L171 | Solo tasadores con **matrícula vigente verificada** y que hayan completado el **curso de uso de la plataforma** pueden registrar tasaciones. | Habilitador | Verificación contra Colegio (manual al inicio, automatizable Fase 2-3). |
| CBR-003 | RC-026 | L207 | La plataforma retiene **10%** del cobro de cada tasación. El tasador recibe **90%**. | Cálculo | Constantes 90/10. Excepción cuando hay inmobiliaria intermedia (CBR-004). |
| CBR-004 | RC-027 | L209 | Cuando el tasador pertenece a una inmobiliaria, el reparto del 90% se subdivide entre tasador e inmobiliaria según acuerdo entre ellos. | Cálculo | A definir (DS-02). Vinculado a S-019 (desfavorecidos). |
| CBR-005 | RC-031 | L223 | Una tasación **certificada por un colegiado** requiere previamente que se realice una **inspección ocular** del inmueble por parte del colegiado. | Restricción | Sin inspección ocular, la tasación es "simple" (firmada por la plataforma). |
| CBR-006 | RC-035 | L251 | La firma de un colegiado equivale a su responsabilidad profesional sobre la tasación. La plataforma no firma como persona física. | Hecho | Régimen profesional argentino (Colegios). |
| CBR-007 | RC-032 | L227 | La tarifa de una tasación es variable según superficie cubierta del inmueble (un castillo de 1500 m² no vale lo mismo que una casa de 100 m²). | Cálculo | Fórmula a definir post-MVP. |
| CBR-008 | RC-033 | L227 | La asignación geográfica del tasador minimiza el plus por distancia: la plataforma elige tasadores cercanos al inmueble. | Habilitador | Vinculado a CRF-006. |
| CBR-009 | RC-034 | L247 | El MVP solo admite tasadores que pertenezcan al Colegio de Arquitectos. | Restricción | Contractual con el Colegio. Caduca al expandir a otros colegios (S-015). |
| CBR-010 | RC-053 | L349 | La **confianza** de la inferencia de Robotomus se calcula sobre la **completitud de variables del usuario**, no sobre la calidad del entrenamiento. | Inferencia | Fórmula a definir cuando se entrene el modelo (Fase 2). |
| CBR-011 | RC-052 | L341 | La confianza esperada de Robotomus debe estar entre **90% y 99%**. | Hecho | Rango referencial declarado por Franco. |
| CBR-012 | RC-054 | L361 | El scraping de portales inmobiliarios públicos puede ser **legalmente cuestionable** según la Ley 25.326 de Protección de Datos Personales. | Restricción | Compliance. Requiere opinión legal antes de Fase 2. |
| CBR-013 | RC-036 | L251 | Las tasaciones simples (sin inspección ocular) tienen un costo significativamente menor que las certificadas. | Cálculo | Constantes referenciales: $20.000 simple / $300.000 certificada. No normativas. |
| CBR-014 | RC-049, RC-050 | L329-331 | Una tasación **finaliza la inspección ocular** cuando el tasador se retira del inmueble y guarda los datos relevados. | Hecho | Define la transición Borrador → Inspección hecha. |
| CBR-015 | RC-050 | L331 | Una tasación en estado "Inspección hecha" pasa automáticamente al estado "Por tasar/Comité" para entrar a la lista de espera de tasación. | Hecho | Define transición de estados. |
| CBR-016 | RC-044, RC-046 | L319, L327 | El catálogo de tipos de inmueble es: **casa, departamento, terreno, galpón, local, oficina**. Cerrado. | Hecho | Catálogo fijo Fase 1. Extensible vía admin en Fase 2. |
| CBR-017 | RC-046 | L327 | El catálogo de motivos de tasación es de **10 elementos**: venta, alquiler, asesoramiento de valores para particulares, tasación para empresas, expropiaciones, divisiones/fraccionamientos, sucesión, tasación judicial, tasación extrajudicial, hipoteca. | Hecho | Cierra Q03. Validación legal por tipo es pendiente (DS-03 derivada). |
| CBR-018 | RC-017, RC-051 | L163, L339 | Cada tasación lleva **dos índices de valor** (mercado vía Robotomus, técnico vía Fitt-Servini) que el comité contrasta para definir el valor final. | Hecho | **En MVP el valor técnico SÍ se calcula automáticamente** (RF-016 + BR-019); Robotomus sigue siendo placeholder. Actualizado el 2026-05-14. |
| **CBR-019 (nuevo)** | derivado de RC-017 | L163 | Fórmula Fitt-Servini lite: `valor_construccion + valor_terreno`, con coeficientes BR-006 (conservación) + tabla de valor/m² configurable (DS-08 pendiente). | Cálculo | **MVP** — implementación en RF-016. |

## Observaciones

- **5 BR son constantes detectadas automáticamente**: CBR-003 (90/10), CBR-007 (variable por m²), CBR-011 (90-99% confianza), CBR-013 ($20K/$300K), CBR-017 (10 motivos).
- **2 BR críticas de compliance** que entran al alcance pre-MVP: CBR-002 (matrícula), CBR-012 (scraping/Ley 25.326).
- **3 BR de definición de estados** (CBR-014, CBR-015) están vinculadas a la pregunta abierta Q02 — su resolución cierra esa Q.
