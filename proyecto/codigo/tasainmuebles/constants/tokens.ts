import { Platform } from 'react-native';

// ═══════════════════════════════════════════════════════════════════════════
// PRIMITIVE TOKENS — raw values, never used directly in screens.
// Use semantic tokens below. These exist so the design system has a single
// inventory of physical values that can be re-mapped across themes.
// ═══════════════════════════════════════════════════════════════════════════

const palette = {
  // Brand coral (warm red — primary action)
  coral50: '#FFF7F5',
  coral100: '#FFE8E8',
  coral200: '#FEE2E2',
  coral300: '#FECACA',
  coral400: '#F87171',
  coral500: '#EF4444',
  coral600: '#DC2626',

  // Navy (primary surface in dark contexts — appbar, tab bar)
  navy400: '#475569',
  navy500: '#353C4D',
  navy600: '#2A3140',
  navy700: '#1E293B',
  navy800: '#0F172A',

  // Neutral (text + borders + light surfaces)
  neutral0: '#FFFFFF',
  neutral50: '#F9FAFB',
  neutral100: '#F4F5F8',
  neutral150: '#EEF0F5',
  neutral200: '#EEF0F4',
  neutral250: '#E9EBF0',
  neutral300: '#E5E7EB',
  neutral350: '#D1D5DB',
  neutral400: '#9CA3AF',
  neutral500: '#6B7280',
  neutral600: '#4B5563',
  neutral700: '#374151',
  neutral800: '#1F2937',
  neutral900: '#111827',

  // Mint (success)
  mint50: '#F0FDF4',
  mint100: '#D1FAE5',
  mint200: '#6EE7B7',
  mint400: '#34D399',
  mint500: '#10B981',

  // Mustard (warning / pending)
  mustard50: '#FEF3C7',
  mustard300: '#FCD34D',
  mustard500: '#FBBF24',
  mustard700: '#92400E',

  // Info (neutral informational blue)
  info50: '#DBEAFE',
  info400: '#60A5FA',
  info700: '#1D4ED8',

  // Accent extras (used in brand iconography)
  orange400: '#FB923C',
  teal400: '#2DD4BF',

  // Pinkish gray (decorative bg for inactive chips)
  pink100: '#F4F0F1',
  pink200: '#F1F2F6',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SEMANTIC COLORS — what screens should consume. Names describe ROLE, not hue.
// Keep backward-compatible aliases at the bottom for the existing codebase.
// ═══════════════════════════════════════════════════════════════════════════

export const colors = {
  // ── Brand ───────────────────────────────────────────────────────────────
  coral: palette.coral400,
  coralDeep: palette.coral500,
  coralDeeper: palette.coral600,
  coralSoft: palette.coral200,
  coralSoft2: palette.coral100,
  coralBg: palette.coral50,

  // Accent (logo / icon variants)
  accentOrange: palette.orange400,
  accentTeal: palette.teal400,

  // ── Surfaces ────────────────────────────────────────────────────────────
  navy: palette.navy600,
  navy2: palette.navy500,
  navyDeep: palette.navy700,
  bg: palette.neutral100,
  bg2: palette.neutral150,
  bg3: palette.neutral50,
  card: palette.neutral0,
  border: palette.neutral300,
  borderSoft: palette.neutral200,
  borderDashed: palette.neutral350,
  borderSoftAlt: palette.neutral250,

  // Decorative inactive chip backgrounds
  chipInactive: palette.pink200,
  chipInactiveAlt: palette.pink100,

  // ── Status ──────────────────────────────────────────────────────────────
  mint: palette.mint500,
  mint2: palette.mint400,
  mintLight: palette.mint200,
  mintSoft: palette.mint100,
  mintBg: palette.mint50,
  mustard: palette.mustard500,
  mustardSoft: palette.mustard50,
  mustardDeep: palette.mustard300,
  mustardText: palette.mustard700,
  info: palette.info400,
  infoSoft: palette.info50,
  infoDeep: palette.info700,
  danger: palette.coral500,
  dangerSoft: palette.coral300,

  // ── Text ────────────────────────────────────────────────────────────────
  text: palette.neutral800,
  text2: palette.neutral700,
  textSecondary: palette.neutral600,
  muted: palette.neutral400,
  muted2: palette.neutral500,
  textOnDark: palette.neutral0,
  textOnCoral: palette.neutral0,

  // ── Utility ─────────────────────────────────────────────────────────────
  white: palette.neutral0,
  black: palette.neutral900,
  shadow: palette.navy800,
  transparent: 'transparent',

  // ── Overlays ────────────────────────────────────────────────────────────
  scrimDark: 'rgba(15,23,42,0.5)',
  scrimDarker: 'rgba(42,49,64,0.85)',
  scrimLight: 'rgba(255,255,255,0.85)',
  glassNavyTint: 'rgba(42,49,64,0.55)',
  glassWhiteTint: 'rgba(255,255,255,0.78)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SPACING — 4pt grid scale. Use ONLY these values for padding/margin/gap.
// ═══════════════════════════════════════════════════════════════════════════

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// RADIUS — border-radius scale
// ═══════════════════════════════════════════════════════════════════════════

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 28,
  '3xl': 36,
  full: 999,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════

export const typography = {
  family: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
  sizes: {
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 15,
    xl: 17,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
    '6xl': 40,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.45,
    relaxed: 1.6,
  },
  letterSpacing: {
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 1.2,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SHADOWS / ELEVATION
// ═══════════════════════════════════════════════════════════════════════════

export const shadows = {
  none: Platform.select({
    ios: { shadowColor: 'transparent', shadowOpacity: 0 },
    android: { elevation: 0 },
  }),
  sm: Platform.select({
    ios: {
      shadowColor: palette.navy800,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
  }),
  md: Platform.select({
    ios: {
      shadowColor: palette.navy800,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
    },
    android: { elevation: 3 },
  }),
  card: Platform.select({
    ios: {
      shadowColor: palette.navy800,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 24,
    },
    android: { elevation: 4 },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: palette.navy800,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 32,
    },
    android: { elevation: 8 },
  }),
  navUp: Platform.select({
    ios: {
      shadowColor: palette.navy800,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    android: { elevation: 16 },
  }),
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// MOTION — durations & easings (ms). Use for Animated.timing / withTiming.
// ═══════════════════════════════════════════════════════════════════════════

export const motion = {
  duration: {
    instant: 0,
    fast: 120,
    base: 200,
    slow: 320,
    slower: 480,
  },
  easing: {
    // Match iOS system curves so transitions feel native
    standard: [0.4, 0.0, 0.2, 1] as const, // material-style
    decelerate: [0.0, 0.0, 0.2, 1] as const,
    accelerate: [0.4, 0.0, 1, 1] as const,
    emphasized: [0.2, 0.0, 0, 1] as const,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// Z-INDEX — never use raw numbers; layering becomes unsearchable otherwise.
// ═══════════════════════════════════════════════════════════════════════════

export const zIndex = {
  base: 0,
  raised: 1,
  dropdown: 10,
  sticky: 100,
  fab: 200,
  navbar: 300,
  modal: 1000,
  toast: 2000,
  overlay: 3000,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// OPACITY — common alpha values
// ═══════════════════════════════════════════════════════════════════════════

export const opacity = {
  disabled: 0.4,
  pressed: 0.85,
  scrim: 0.5,
  scrimHeavy: 0.85,
  glass: 0.78,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT — common size constants (tab bar height, FAB, etc)
// ═══════════════════════════════════════════════════════════════════════════

export const layout = {
  tabBarHeight: 68,
  appBarHeight: 56,
  fabSize: 60,
  hitSlop: 8,
  iconSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    '2xl': 28,
  },
} as const;
