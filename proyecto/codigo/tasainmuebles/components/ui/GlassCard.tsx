import React from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import Card, { CardProps } from './Card';

export interface GlassCardProps extends CardProps {
  /**
   * Whether to attempt Liquid Glass when supported. When false (or unsupported)
   * the component falls back to the regular solid Card so Android and iOS <26
   * keep their current look.
   */
  glassEffect?: boolean;
  effect?: 'regular' | 'clear';
  tintColor?: string;
}

export default function GlassCard({
  glassEffect = true,
  effect = 'regular',
  tintColor,
  variant = 'surface',
  style,
  children,
  ...rest
}: GlassCardProps) {
  const canUseGlass =
    Platform.OS === 'ios' && isLiquidGlassSupported && glassEffect;

  if (!canUseGlass) {
    return (
      <Card variant={variant} style={style} {...rest}>
        {children}
      </Card>
    );
  }

  const glassTint =
    tintColor ??
    (variant === 'dark'
      ? 'rgba(42,49,64,0.65)'
      : 'rgba(255,255,255,0.35)');

  const baseStyle: StyleProp<ViewStyle> = {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 18,
  };

  return (
    <LiquidGlassView
      effect={effect}
      tintColor={glassTint}
      interactive
      style={[baseStyle, style]}
    >
      {children}
    </LiquidGlassView>
  );
}
