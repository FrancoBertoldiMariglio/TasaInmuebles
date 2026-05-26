import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing } from '../../constants/tokens';

type CardVariant = 'surface' | 'dark';

export interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing | number;
}

export default function Card({
  variant = 'surface',
  children,
  style,
  padding,
}: CardProps) {
  const resolvedPadding =
    padding !== undefined
      ? typeof padding === 'number'
        ? padding
        : spacing[padding]
      : spacing.lg;

  return (
    <View
      style={[
        styles.base,
        variant === 'surface' ? styles.surface : styles.dark,
        { padding: resolvedPadding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 24,
      },
      android: { elevation: 4 },
    }),
  },
  surface: {
    backgroundColor: colors.card,
  },
  dark: {
    backgroundColor: colors.navy,
    // Subtle gradient simulated with a slightly lighter top border
    borderTopWidth: 1,
    borderTopColor: colors.navy2,
  },
});
