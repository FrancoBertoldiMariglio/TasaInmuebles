import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing, typography } from '../../constants/tokens';
import Wordmark from './Wordmark';

export interface BrandBarProps {
  userName?: string;
  onAvatarPress?: () => void;
  onBellPress?: () => void;
  onMenuPress?: () => void;
  notificationCount?: number;
}

export default function BrandBar({
  userName = 'F',
  onAvatarPress,
  onBellPress,
  onMenuPress,
  notificationCount = 0,
}: BrandBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const avatarInitial = userName.charAt(0).toUpperCase();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.sm },
      ]}
    >
      {/* Logo — long-press opens dev /design-system showcase */}
      <Pressable
        onLongPress={() => router.push('/design-system' as never)}
        delayLongPress={800}
        accessibilityRole="button"
        accessibilityLabel="Logo Tasainmuebles"
      >
        <Wordmark size={15} />
      </Pressable>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Actions */}
      <View style={styles.actions}>
        {/* Avatar */}
        <Pressable
          onPress={onAvatarPress}
          style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Perfil"
        >
          <Text style={styles.avatarText}>{avatarInitial}</Text>
        </Pressable>

        {/* Bell */}
        <Pressable
          onPress={onBellPress}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Notificaciones"
        >
          <Feather name="bell" size={20} color={colors.text2} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount > 9 ? '9+' : String(notificationCount)}
              </Text>
            </View>
          )}
        </Pressable>

        {/* More */}
        <Pressable
          onPress={onMenuPress}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Más opciones"
        >
          <Feather name="more-horizontal" size={20} color={colors.text2} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  spacer: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
    fontFamily: typography.family,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  pressed: {
    opacity: 0.7,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: typography.weights.bold,
    color: colors.white,
    fontFamily: typography.family,
  },
});
