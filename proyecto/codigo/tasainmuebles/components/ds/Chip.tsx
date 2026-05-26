import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing, opacity } from '../../constants/tokens';
import Text from './Text';
import Icon, { IconName } from './Icon';

export type ChipVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'info' | 'danger';
export type ChipSize = 'sm' | 'md';

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  onPress?: () => void;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
}

const variantStyles: Record<ChipVariant, { bg: string; bgSelected: string; text: keyof typeof colors }> = {
  neutral: { bg: colors.chipInactive,  bgSelected: colors.bg2,        text: 'muted2' },
  primary: { bg: colors.coralSoft2,    bgSelected: colors.coralSoft,  text: 'coralDeep' },
  success: { bg: colors.mintBg,        bgSelected: colors.mintSoft,   text: 'mint' },
  warning: { bg: colors.mustardSoft,   bgSelected: colors.mustardSoft,text: 'mustardText' },
  info:    { bg: colors.infoSoft,      bgSelected: colors.infoSoft,   text: 'infoDeep' },
  danger:  { bg: colors.dangerSoft,    bgSelected: colors.coralSoft,  text: 'coralDeep' },
};

export default function Chip({
  label,
  variant = 'neutral',
  size = 'md',
  selected,
  onPress,
  leadingIcon,
  trailingIcon,
}: ChipProps) {
  const v = variantStyles[variant];
  const padV = size === 'sm' ? spacing.xs : spacing.sm;
  const padH = size === 'sm' ? spacing.md : spacing.lg;
  const content = (
    <View
      style={[
        styles.base,
        {
          backgroundColor: selected ? v.bgSelected : v.bg,
          paddingVertical: padV,
          paddingHorizontal: padH,
          gap: 6,
        },
      ]}
    >
      {leadingIcon ? <Icon name={leadingIcon} size="sm" color={v.text} /> : null}
      <Text variant={size === 'sm' ? 'caption' : 'label'} color={v.text}>
        {label}
      </Text>
      {trailingIcon ? <Icon name={trailingIcon} size="sm" color={v.text} /> : null}
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
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
});
