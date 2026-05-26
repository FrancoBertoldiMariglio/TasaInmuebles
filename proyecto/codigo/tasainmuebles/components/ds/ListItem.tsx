import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, opacity, spacing } from '../../constants/tokens';
import Text from './Text';
import Icon, { IconName } from './Icon';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leadingIcon?: IconName;
  trailing?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  divider?: boolean;
}

export default function ListItem({
  title,
  subtitle,
  leadingIcon,
  trailing,
  onPress,
  showChevron,
  divider = true,
}: ListItemProps) {
  const content = (
    <View style={[styles.row, divider && styles.rowBorder]}>
      {leadingIcon ? (
        <View style={styles.leading}>
          <Icon name={leadingIcon} size="lg" color="muted2" />
        </View>
      ) : null}
      <View style={styles.body}>
        <Text variant="bodyStrong" color="text">{title}</Text>
        {subtitle ? (
          <Text variant="caption" color="muted2">{subtitle}</Text>
        ) : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      {showChevron ? (
        <Icon name="chevron-right" size="lg" color="muted" />
      ) : null}
    </View>
  );
  if (!onPress) return content;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: opacity.pressed }]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  leading: {
    width: 28,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  trailing: {
    marginLeft: spacing.sm,
  },
});
