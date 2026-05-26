import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, layout, opacity, radius } from '../../constants/tokens';
import Icon, { IconName, IconSize } from './Icon';

export type IconButtonVariant = 'ghost' | 'soft' | 'solid';

export interface IconButtonProps {
  name: IconName;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconSize;
  color?: keyof typeof colors;
  accessibilityLabel: string;
  disabled?: boolean;
}

const sizeMap: Record<Exclude<IconSize, number>, number> = {
  xs: 28,
  sm: 32,
  md: 36,
  lg: 40,
  xl: 44,
  '2xl': 52,
};

export default function IconButton({
  name,
  onPress,
  variant = 'ghost',
  size = 'lg',
  color = 'text',
  accessibilityLabel,
  disabled,
}: IconButtonProps) {
  const dim = typeof size === 'number' ? size + 16 : sizeMap[size];
  const bg =
    variant === 'solid' ? colors.text :
    variant === 'soft' ? colors.bg2 :
    colors.transparent;
  const iconColor: keyof typeof colors = variant === 'solid' ? 'white' : color;
  const containerStyle: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: radius.full,
    backgroundColor: bg,
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={layout.hitSlop}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        containerStyle,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Icon name={name} size={size} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: opacity.pressed },
  disabled: { opacity: opacity.disabled },
});
