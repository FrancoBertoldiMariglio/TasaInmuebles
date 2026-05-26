import React, { useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../constants/tokens';

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  rightElement?: React.ReactNode;
}

const DURATION = 260;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  rightElement,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState(0);

  const heightAnim = useSharedValue(defaultOpen ? -1 : 0); // -1 signals "use measured height"
  const rotateAnim = useSharedValue(defaultOpen ? 1 : 0);

  const measuredHeight = useSharedValue(0);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      if (h > 0 && measuredHeight.value !== h) {
        measuredHeight.value = h;
        if (open) {
          heightAnim.value = h;
        }
      }
    },
    [open, measuredHeight, heightAnim],
  );

  const toggle = () => {
    const next = !open;
    setOpen(next);

    const target = next ? measuredHeight.value : 0;
    heightAnim.value = withTiming(target, { duration: DURATION, easing: EASING });
    rotateAnim.value = withTiming(next ? 1 : 0, {
      duration: DURATION,
      easing: EASING,
    });
  };

  const animatedContainer = useAnimatedStyle(() => ({
    height: heightAnim.value <= 0 && open ? undefined : heightAnim.value,
    overflow: 'hidden',
  }));

  const animatedChevron = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateAnim.value * 180}deg` }],
  }));

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.header,
          open && styles.headerOpen,
          pressed && styles.headerPressed,
        ]}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
      >
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.headerRight}>
          {rightElement}
          <Animated.View style={animatedChevron}>
            <Feather
              name="chevron-down"
              size={18}
              color={open ? colors.coral : colors.muted2}
            />
          </Animated.View>
        </View>
      </Pressable>

      {/* Animated body */}
      <Animated.View style={animatedContainer}>
        {/* Hidden absolute view for measurement */}
        <View style={styles.measureContainer} onLayout={onLayout} pointerEvents="none">
          <View style={styles.body}>{children}</View>
        </View>
        {/* Visible content */}
        <View style={styles.body}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.md,
    backgroundColor: colors.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
  },
  headerOpen: {
    backgroundColor: colors.coralSoft,
  },
  headerPressed: {
    opacity: 0.8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    fontFamily: typography.family,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  measureContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0,
    zIndex: -1,
  },
});
