# Tasainmuebles Design System

Source-of-truth para tokens visuales del mobile (iOS + Android).

## Files

- **`tokens.json`** — W3C DTCG spec ([Design Tokens Community Group](https://www.designtokens.org/)). Provider-agnostic. Importable a Style Dictionary, Tokens Studio, Penpot, Figma (vía plugin), o cualquier tool que respete el spec.
- **`../constants/tokens.ts`** — Mirror tipado para consumo desde React Native. Mantener en sync manualmente hasta que sumemos Style Dictionary build-step.

## Convención

Token layer | Quién lo consume | Ejemplo
--- | --- | ---
**`palette.*`** (primitive) | Solo otros tokens. **Nunca** screens. | `palette.coral.400`
**`brand.*` / `surface.*` / `text.*` / `status.*`** (semantic) | Screens y componentes | `colors.coral`, `colors.text`, `colors.mustardText`

Si necesitás un color y no está en semantic — agregalo al layer semantic, no metas hex inline.

## Cómo agregar un token nuevo

1. Si es un valor físico nuevo: agregalo a `palette.*` en JSON + a `palette` privado en `tokens.ts`.
2. Mapealo a un nombre semántico en `brand/surface/text/status` (JSON) y en `colors` (ts).
3. Bumpear `$version` en `tokens.json`.
4. Si rompe screens existentes, anotar en el commit con `BREAKING:`.

## Migración pendiente (audit Fase 1)

Aproximadamente 85 referencias hardcoded de hex/rgba se detectaron en el codebase al cierre de Fase 1. Las screens más críticas:

- `app/(tasador)/home.tsx` — chips, KPI cards
- `app/(b2c)/nueva.tsx`, `app/(b2c)/resultado.tsx` — bandera mustard `#92400E`
- `app/(tasador)/detalle/[id].tsx` — múltiples soft tints

Estas se irán migrando incrementalmente en Fase 2 al refactorizar cada primitivo. No hacer un sweep masivo; aprovechar cada feature que toque la screen.

## Roadmap

- [x] Fase 1: tokens W3C DTCG + extender `tokens.ts` con motion/zIndex/opacity/layout
- [ ] Fase 2: primitivos faltantes (Text, Stack, Divider, Icon, Toast, EmptyState, Skeleton, Switch, Chip, IconButton, ListItem, BottomSheet)
- [ ] Fase 3: showcase in-app `/design-system` + doc en `proyecto/wiki/design-system.md`
- [ ] Futuro: Style Dictionary build-step para regenerar `tokens.ts` desde `tokens.json` automáticamente
