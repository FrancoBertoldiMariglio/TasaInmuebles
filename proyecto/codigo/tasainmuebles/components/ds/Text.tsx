import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '../../constants/tokens';

export type TextVariant =
  | 'display'   // hero numbers — 40px bold
  | 'h1'        // 32 bold
  | 'h2'        // 24 bold
  | 'h3'        // 20 semibold
  | 'title'     // 17 semibold (appbar, cards)
  | 'body'      // 14 regular
  | 'bodyStrong'// 14 semibold
  | 'caption'   // 12 regular muted
  | 'label'     // 13 medium
  | 'overline'; // 11 medium uppercase tracking

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: keyof typeof colors;
  align?: TextStyle['textAlign'];
  numberOfLines?: number;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, TextStyle> = {
  display: {
    fontSize: typography.sizes['6xl'],
    fontWeight: typography.weights.extrabold,
    lineHeight: typography.sizes['6xl'] * typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h1: {
    fontSize: typography.sizes['5xl'],
    fontWeight: typography.weights.bold,
    lineHeight: typography.sizes['5xl'] * typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    lineHeight: typography.sizes['3xl'] * typography.lineHeights.snug,
  },
  h3: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes['2xl'] * typography.lineHeights.snug,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.xl * typography.lineHeights.snug,
  },
  body: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.md * typography.lineHeights.normal,
  },
  bodyStrong: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.md * typography.lineHeights.normal,
  },
  caption: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.sm * typography.lineHeights.normal,
  },
  label: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    lineHeight: typography.sizes.base * typography.lineHeights.snug,
  },
  overline: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    letterSpacing: typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },
};

const defaultColor: Record<TextVariant, keyof typeof colors> = {
  display: 'text',
  h1: 'text',
  h2: 'text',
  h3: 'text',
  title: 'text',
  body: 'text2',
  bodyStrong: 'text',
  caption: 'muted2',
  label: 'text2',
  overline: 'muted2',
};

export default function Text({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...rest
}: TextProps) {
  const resolvedColor = colors[color ?? defaultColor[variant]];
  return (
    <RNText
      {...rest}
      style={[
        styles.base,
        variantStyles[variant],
        { color: resolvedColor, textAlign: align },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: typography.family,
  },
});
