# 12 — Handoff a SDD (sandinas-wiki-skills)

**[PENDIENTE — `ir-handoff-sdd` lo genera al cierre]**

> Manifest que mapea los artefactos de IR (en este árbol) a los documentos finales de `sandinas-wiki-skills` (`01_alcance_funcional.md`, `02_arquitectura.md`, `crear-flujo`, `crear-rf`, etc.).
>
> El handoff convierte la fuente única de verdad de IR en los entregables formales del proceso SDD.

## Mapeo planificado

| Artefacto IR | Destino SDD | Skill que lo genera |
|--------------|-------------|---------------------|
| `00_fundamentos.md` + `05_negocio/` | `01_alcance_funcional.md` | `sandinas-wiki-skills:crear-alcance` |
| Stakeholders (`01_stakeholders/`) | `01_alcance_funcional.md` (sección actores) | `sandinas-wiki-skills:crear-alcance` |
| `06_usuario/CU-UI-*.md` | `proyecto/wiki/HU/` o flujos | `sandinas-scrum-skills:crear-hu` o `sandinas-wiki-skills:crear-flujo` |
| `07_software/RF/RF-*.md` | `proyecto/wiki/RF-*.md` | `sandinas-wiki-skills:crear-rf` |
| `07_software/NF/AC-*.md` | secciones de calidad por RF | embebido |
| `07_software/BR/BR-*.md` | reglas de negocio anexas a flujos/RF | embebido |
| `08_diagramas/flujos/*.mmd` | `08_diagramas/flujos/` final | copia |

## Estado

`[no preparado]`
