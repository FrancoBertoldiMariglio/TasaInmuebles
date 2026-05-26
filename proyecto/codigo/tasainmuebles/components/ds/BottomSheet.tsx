import React from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { colors, radius, spacing } from '../../constants/tokens';
import Text from './Text';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  glass?: boolean;
  children: React.ReactNode;
}

export default function BottomSheet({
  visible,
  onClose,
  title,
  glass = true,
  children,
}: BottomSheetProps) {
  const glassOn = glass && Platform.OS === 'ios' && isLiquidGlassSupported;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.scrim} onPress={onClose}>
        <Pressable style={styles.sheetWrap} onPress={(e) => e.stopPropagation()}>
          {glassOn && (
            <LiquidGlassView
              effect="regular"
              tintColor={colors.glassWhiteTint}
              style={styles.sheetGlass}
            />
          )}
          <SafeAreaView
            edges={['bottom']}
            style={[styles.sheet, glassOn && styles.sheetTransparent]}
          >
            <View style={styles.handle} />
            {title ? (
              <Text variant="h3" align="center" color="text" style={styles.title}>
                {title}
              </Text>
            ) : null}
            {children}
          </SafeAreaView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: colors.scrimDark,
    justifyContent: 'flex-end',
  },
  sheetWrap: {
    width: '100%',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  sheetTransparent: {
    backgroundColor: 'transparent',
  },
  sheetGlass: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.lg,
  },
});
