import React from 'react';
import { View } from 'react-native';
import { colors, spacing } from '../../constants/tokens';

export interface DividerProps {
  variant?: 'default' | 'soft';
  orientation?: 'horizontal' | 'vertical';
  inset?: keyof typeof spacing | 0;
}

export default function Divider({
  variant = 'default',
  orientation = 'horizontal',
  inset = 0,
}: DividerProps) {
  const color = variant === 'soft' ? colors.borderSoft : colors.border;
  const insetValue = inset === 0 ? 0 : spacing[inset];
  if (orientation === 'vertical') {
    return (
      <View
        style={{
          width: 1,
          alignSelf: 'stretch',
          backgroundColor: color,
          marginVertical: insetValue,
        }}
      />
    );
  }
  return (
    <View
      style={{
        height: 1,
        alignSelf: 'stretch',
        backgroundColor: color,
        marginHorizontal: insetValue,
      }}
    />
  );
}
