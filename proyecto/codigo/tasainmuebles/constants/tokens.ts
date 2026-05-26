import { Platform } from 'react-native';

export const colors = {
  // Brand
  coral: '#F87171',
  coralDeep: '#EF4444',
  coralSoft: '#FEE2E2',
  coralSoft2: '#FFE8E8',

  // Surfaces
  navy: '#2A3140',
  navy2: '#353C4D',
  bg: '#F4F5F8',
  bg2: '#EEF0F5',
  card: '#FFFFFF',
  border: '#E5E7EB',
  borderSoft: '#EEF0F4',

  // Status
  mint: '#10B981',
  mint2: '#34D399',
  mintSoft: '#D1FAE5',
  mustard: '#FBBF24',
  mustardSoft: '#FEF3C7',
  info: '#60A5FA',
  infoSoft: '#DBEAFE',

  // Text
  text: '#1F2937',
  text2: '#374151',
  muted: '#9CA3AF',
  muted2: '#6B7280',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 28,
  full: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

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
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
} as const;

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
    },
    android: { elevation: 3 },
  }),
  card: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 24,
    },
    android: { elevation: 4 },
  }),
} as const;
