# Tasainmuebles Design System

> Sistema de tokens + primitivos para coherencia visual y velocidad de dev en la app mobile (`proyecto/codigo/tasainmuebles`). Provider-agnóstico (no atado a Figma).

## Acceso al showcase

En la app: **long-press sobre el logo "Tasainmuebles"** en el `BrandBar` (800ms) → navega a `/design-system`. Pantalla viva con todos los components renderizados, ideal para QA visual y para enseñar la paleta a alguien sin código.

## Estructura

```
proyecto/codigo/tasainmuebles/
├── design-system/
│   ├── tokens.json       ← W3C DTCG spec, source of truth
│   └── README.md         ← convención de capas + roadmap
├── constants/
│   └── tokens.ts         ← mirror tipado de tokens.json para consumo RN
├── components/
│   ├── ds/               ← primitivos del DS (Text, Stack, Chip, Toast...)
│   │   └── index.ts      ← barrel
│   ├── ui/               ← legacy components (Button, Card, Input, Badge)
│   └── brand/            ← BrandBar, Wordmark, Isotipo
└── app/
    └── design-system.tsx ← pantalla showcase
```

## Principios

1. **Tokens primero**. Cero hex hardcoded en pantallas. Si un valor no está en tokens, lo agregás primero al token, después al componente.
2. **Dos capas de color**: `palette.*` (primitivo, valores físicos) → `colors.*` (semántico, rol). Screens solo consumen el semántico.
3. **4pt spacing grid**. Todos los `padding`/`margin`/`gap` salen de `spacing.{xs..6xl}`. Cero magic numbers en estilos.
4. **Glass es opt-in**. Liquid Glass aparece solo donde tiene sentido visual (tab bar, modales, sheets, KPI cards). No es default — usar prop o detección con `useGlassSupport`.
5. **Type-safe sobre flexibilidad**. Variants enumeradas y tipadas (Chip variant, Text variant) en lugar de props sueltos tipo `color="cualquiera"`.
6. **A11y por defecto**. `IconButton` exige `accessibilityLabel`. `Switch` y `Pressable` declaran roles. Toast usa `pointerEvents="box-none"` para no robar foco.

## Catálogo de tokens

### Color (`colors.*`)

- **Brand**: `coral`, `coralDeep`, `coralDeeper`, `coralSoft`, `coralSoft2`, `coralBg`, `accentOrange`, `accentTeal`
- **Surface**: `navy`, `navy2`, `navyDeep`, `bg`, `bg2`, `bg3`, `card`, `chipInactive`, `chipInactiveAlt`
- **Border**: `border`, `borderSoft`, `borderDashed`, `borderSoftAlt`
- **Status**: `mint*`, `mustard*`, `info*`, `danger`, `dangerSoft`
- **Text**: `text`, `text2`, `textSecondary`, `muted`, `muted2`, `textOnDark`, `textOnCoral`
- **Overlay**: `scrimDark`, `scrimDarker`, `scrimLight`, `glassNavyTint`, `glassWhiteTint`

### Spacing / Radius

`xs (4) · sm (8) · md (12) · lg (16) · xl (20) · 2xl (24) · 3xl (32) · 4xl (40) · 5xl (48) · 6xl (64)`

Radius extra: `full (999)` para chips y avatars.

### Typography

10 variants en `<Text>`: `display`, `h1`, `h2`, `h3`, `title`, `body`, `bodyStrong`, `caption`, `label`, `overline`.

Tamaños raw en `typography.sizes`: `xs (11) → 6xl (40)`. Pesos: `regular → extrabold`.

### Motion / Z-index / Opacity / Layout

- `motion.duration.{fast 120ms · base 200ms · slow 320ms · slower 480ms}`
- `motion.easing.{standard · decelerate · accelerate · emphasized}` (curvas estilo iOS/Material)
- `zIndex.{base · raised · dropdown · sticky · fab · navbar · modal · toast · overlay}`
- `opacity.{disabled 0.4 · pressed 0.85 · scrim 0.5 · glass 0.78}`
- `layout.{tabBarHeight 68 · appBarHeight 56 · fabSize 60 · iconSize.{xs..2xl}}`

## Catálogo de primitivos (`components/ds`)

| Componente | Props clave | Glass |
|---|---|---|
| `Text` | `variant`, `color`, `align`, `numberOfLines` | — |
| `VStack` / `HStack` / `Spacer` | `gap`, `align`, `justify`, `wrap`, `padding[X|Y]`, `flex` | — |
| `Divider` | `variant`, `orientation`, `inset` | — |
| `Icon` | `name` (Feather), `size`, `color` | — |
| `IconButton` | `variant` (ghost/soft/solid), `size`, `color`, `accessibilityLabel*` | — |
| `Chip` | `variant`, `size`, `selected`, `leadingIcon`, `trailingIcon` | — |
| `Switch` | `value`, `onValueChange`, `disabled` | — |
| `EmptyState` | `icon`, `title`, `description`, `actionLabel`, `onAction` | — |
| `Skeleton` | `width`, `height`, `borderRadius` | — |
| `Toast` | `useToast().show({ message, variant, duration })` | sí (iOS 26+) |
| `ListItem` | `title`, `subtitle`, `leadingIcon`, `trailing`, `showChevron`, `divider`, `onPress` | — |
| `BottomSheet` | `visible`, `onClose`, `title`, `glass`, `children` | sí (iOS 26+) |

Legacy en `components/ui/`: `Button`, `Card`, `Input`, `Badge`, `Accordion`, `ModalSuccess`, `GlassCard`. No migrar de golpe — refactor incremental cuando se toque la screen.

## Do's & Don'ts

**Do**
- Usar `<Text variant="body" color="muted2">` en lugar de `<RNText style={{ fontSize: 14, color: '#6B7280' }}>`.
- Layout con `<VStack gap="md">` antes que `flexDirection: 'column'` + `gap: 12` manual.
- `colors.scrimDark` para overlays oscuros (es `rgba(15,23,42,0.5)` consistente).
- Disparar feedback con `useToast()` en vez de `Alert.alert`.

**Don't**
- Hex inline (`#F87171`, `rgba(15,23,42,0.5)`).
- `padding: 12` con número crudo — usar `spacing.md`.
- Importar de `components/ui/*` cuando hay primitivo equivalente en `components/ds/*`.
- Crear nuevos colores en componentes — siempre agregarlos al token primero.

## Roadmap

- [x] **Fase 1** — Tokens W3C DTCG + capa semántica + motion/zIndex/opacity/layout
- [x] **Fase 2** — 11 primitivos (Text, Stack, Divider, Icon, IconButton, Chip, Switch, EmptyState, Skeleton, Toast, ListItem, BottomSheet)
- [x] **Fase 3** — Showcase `/design-system` + doc + acceso oculto
- [ ] **Fase 4 (futuro)** — Style Dictionary build-step (`tokens.json` → genera `tokens.ts` automáticamente)
- [ ] **Fase 5 (futuro)** — Theme dark mode (cambiar `palette.*` mapping sin tocar screens)
- [ ] **Migración incremental** — refactor de `app/(tasador)/home.tsx`, `app/(b2c)/*`, `app/(tasador)/detalle/[id].tsx` para eliminar las ~85 referencias hex hardcoded detectadas en audit Fase 1
