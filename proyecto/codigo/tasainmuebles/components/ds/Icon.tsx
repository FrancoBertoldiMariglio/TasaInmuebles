import React from 'react';
import { Feather } from '@expo/vector-icons';
import { colors, layout } from '../../constants/tokens';

export type IconName = React.ComponentProps<typeof Feather>['name'];
export type IconSize = keyof typeof layout.iconSize | number;

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: keyof typeof colors;
}

export default function Icon({ name, size = 'lg', color = 'text2' }: IconProps) {
  const resolvedSize = typeof size === 'number' ? size : layout.iconSize[size];
  return <Feather name={name} size={resolvedSize} color={colors[color]} />;
}
