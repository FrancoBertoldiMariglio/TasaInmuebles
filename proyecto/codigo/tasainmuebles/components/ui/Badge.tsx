import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../constants/tokens';

export type BadgeVariant = 'coral' | 'mint' | 'mustard' | 'info';

export interface BadgeProps {
  variant: BadgeVariant;
  children: string;
}

const variantStyles: Record<
  BadgeVariant,
  { container: object; text: object }
> = {
  coral: {
    container: { backgroundColor: colors.coralSoft },
    text: { color: colors.coralDeep },
  },
  mint: {
    container: { backgroundColor: colors.mintSoft },
    text: { color: colors.mint },
  },
  mustard: {
    container: { backgroundColor: colors.mustardSoft },
    text: { color: '#92400E' }, // amber-800 — readable on mustard soft
  },
  info: {
    container: { backgroundColor: colors.infoSoft },
    text: { color: '#1D4ED8' }, // blue-700 — readable on info soft
  },
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <View style={[styles.container, variantStyles[variant].container]}>
      <Text style={[styles.label, variantStyles[variant].text]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs - 1,
    borderRadius: radius.full,
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.family,
    letterSpacing: 0.2,
  },
});
