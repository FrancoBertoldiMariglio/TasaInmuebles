import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../constants/tokens';
import Text from './Text';
import Icon, { IconName } from './Icon';
import Button from '../ui/Button';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size="2xl" color="muted" />
      </View>
      <Text variant="h3" align="center" color="text">
        {title}
      </Text>
      {description ? (
        <Text variant="body" align="center" color="muted2" style={styles.desc}>
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <View style={styles.action}>
          <Button variant="primary" onPress={onAction}>
            {actionLabel}
          </Button>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['4xl'],
    paddingHorizontal: spacing['2xl'],
    gap: spacing.md,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.bg2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  desc: {
    maxWidth: 280,
  },
  action: {
    marginTop: spacing.md,
    minWidth: 200,
  },
});
