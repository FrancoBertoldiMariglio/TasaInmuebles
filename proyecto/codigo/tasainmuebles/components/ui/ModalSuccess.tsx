import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { colors, radius, spacing, typography } from '../../constants/tokens';
import Button from './Button';

export type ModalSuccessIllustration =
  | 'check'
  | 'archive'
  | 'claps'
  | 'paperplane'
  | 'paper-up';

export interface ModalSuccessProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  illustration?: ModalSuccessIllustration;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}

function Illustration({ kind }: { kind: ModalSuccessIllustration }) {
  if (kind === 'check') {
    return (
      <View style={styles.checkCircle}>
        <Feather name="check" size={42} color={colors.white} />
      </View>
    );
  }
  const emojiMap: Record<Exclude<ModalSuccessIllustration, 'check'>, string> = {
    archive: '📦',
    claps: '👏👏',
    paperplane: '✈️',
    'paper-up': '📄⬆️',
  };
  return (
    <View style={styles.emojiWrap}>
      <Text style={styles.emoji}>{emojiMap[kind]}</Text>
    </View>
  );
}

export default function ModalSuccess({
  visible,
  onClose,
  title,
  subtitle,
  illustration = 'check',
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: ModalSuccessProps) {
  const glassOn = Platform.OS === 'ios' && isLiquidGlassSupported;

  const content = (
    <>
      <Pressable
        onPress={onClose}
        style={styles.closeBtn}
        accessibilityLabel="Cerrar"
      >
        <Feather name="x" size={20} color={colors.muted2} />
      </Pressable>

      <Illustration kind={illustration} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.btnRow}>
        {secondaryLabel ? (
          <>
            <View style={styles.btnCell}>
              <Button
                variant="outline"
                size="full"
                onPress={onSecondary}
              >
                {secondaryLabel}
              </Button>
            </View>
            <View style={styles.btnCell}>
              <Button variant="primary" size="full" onPress={onPrimary}>
                {primaryLabel}
              </Button>
            </View>
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <Button variant="primary" size="full" onPress={onPrimary}>
              {primaryLabel}
            </Button>
          </View>
        )}
      </View>
    </>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.scrim} onPress={onClose}>
        <Pressable
          style={styles.cardWrap}
          onPress={(e) => e.stopPropagation()}
        >
          {glassOn ? (
            <LiquidGlassView
              effect="regular"
              tintColor="rgba(255,255,255,0.85)"
              style={[styles.card, styles.cardGlass]}
            >
              {content}
            </LiquidGlassView>
          ) : (
            <View style={styles.card}>{content}</View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(42,49,64,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['2xl'],
  },
  cardWrap: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'stretch',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    paddingTop: 28,
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['2xl'],
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  cardGlass: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: spacing.sm,
    zIndex: 2,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.mint2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emojiWrap: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
    textAlign: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: typography.family,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted2,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 21,
    fontFamily: typography.family,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    alignSelf: 'stretch',
  },
  btnCell: {
    flex: 1,
  },
});
