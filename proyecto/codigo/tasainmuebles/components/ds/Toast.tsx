import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { colors, motion, radius, shadows, spacing, zIndex } from '../../constants/tokens';
import Text from './Text';
import Icon, { IconName } from './Icon';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  show: (opts: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_ICON: Record<ToastVariant, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  danger: 'alert-octagon',
};

const VARIANT_COLOR: Record<ToastVariant, keyof typeof colors> = {
  info: 'info',
  success: 'mint',
  warning: 'mustard',
  danger: 'coralDeep',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState<ToastOptions | null>(null);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    opacity.value = withTiming(0, { duration: motion.duration.fast });
    translateY.value = withTiming(-20, {
      duration: motion.duration.fast,
      easing: Easing.bezier(...motion.easing.accelerate),
    }, () => {
      runOnJS(setCurrent)(null);
    });
  }, [opacity, translateY]);

  const show = useCallback((opts: ToastOptions) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrent(opts);
    opacity.value = withTiming(1, { duration: motion.duration.base });
    translateY.value = withTiming(0, {
      duration: motion.duration.base,
      easing: Easing.bezier(...motion.easing.emphasized),
    });
    timeoutRef.current = setTimeout(dismiss, opts.duration ?? 3000);
  }, [opacity, translateY, dismiss]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const glassOn = Platform.OS === 'ios' && isLiquidGlassSupported;

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {current ? (
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.host,
            { top: insets.top + spacing.md },
            animatedStyle,
          ]}
        >
          <Pressable onPress={dismiss} style={styles.toastWrap}>
            {glassOn ? (
              <LiquidGlassView
                effect="regular"
                tintColor={colors.glassWhiteTint}
                style={[styles.toast, styles.toastGlass]}
              >
                <ToastContent options={current} />
              </LiquidGlassView>
            ) : (
              <View style={styles.toast}>
                <ToastContent options={current} />
              </View>
            )}
          </Pressable>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

function ToastContent({ options }: { options: ToastOptions }) {
  const variant = options.variant ?? 'info';
  return (
    <>
      <Icon name={VARIANT_ICON[variant]} size="lg" color={VARIANT_COLOR[variant]} />
      <Text variant="bodyStrong" color="text" style={{ flex: 1 }}>
        {options.message}
      </Text>
    </>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    zIndex: zIndex.toast,
    alignItems: 'center',
  },
  toastWrap: {
    width: '100%',
    maxWidth: 480,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    ...shadows.lg,
  },
  toastGlass: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});
