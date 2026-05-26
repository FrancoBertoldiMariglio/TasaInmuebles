import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, spacing, typography } from '../../constants/tokens';

type Variant = 'primary' | 'outline' | 'dark' | 'ghost' | 'disabled';
type Size = 'sm' | 'md' | 'full';

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  onPress?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const containerStyles: Record<Variant, object> = {
  primary: {
    backgroundColor: colors.coral,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.coral,
  },
  dark: {
    backgroundColor: colors.navy,
    borderWidth: 0,
  },
  ghost: {
    backgroundColor: colors.transparent,
    borderWidth: 0,
  },
  disabled: {
    backgroundColor: colors.border,
    borderWidth: 0,
  },
};

const textStyles: Record<Variant, object> = {
  primary: { color: colors.white },
  outline: { color: colors.coral },
  dark: { color: colors.white },
  ghost: { color: colors.coral },
  disabled: { color: colors.muted },
};

const sizeStyles: Record<Size, { container: object; text: object }> = {
  sm: {
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs + 2,
      borderRadius: radius.sm,
    },
    text: { fontSize: typography.sizes.sm, lineHeight: 18 },
  },
  md: {
    container: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      borderRadius: radius.md,
    },
    text: { fontSize: typography.sizes.md, lineHeight: 22 },
  },
  full: {
    container: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      borderRadius: radius.md,
      alignSelf: 'stretch' as const,
    },
    text: { fontSize: typography.sizes.md, lineHeight: 22 },
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  onPress,
  children,
  disabled = false,
  loading = false,
  icon,
}: ButtonProps) {
  const effectiveVariant: Variant = disabled ? 'disabled' : variant;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        containerStyles[effectiveVariant],
        sizeStyles[size].container,
        size === 'full' && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabledOpacity,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={effectiveVariant === 'primary' ? colors.white : colors.coral}
            style={styles.spinner}
          />
        ) : icon ? (
          <View style={styles.iconWrap}>{icon}</View>
        ) : null}
        <Text
          style={[
            styles.label,
            textStyles[effectiveVariant],
            sizeStyles[size].text,
          ]}
          numberOfLines={1}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    fontWeight: typography.weights.semibold,
    fontFamily: typography.family,
    textAlign: 'center',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: spacing.xs,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  disabledOpacity: {
    opacity: 0.7,
  },
});
