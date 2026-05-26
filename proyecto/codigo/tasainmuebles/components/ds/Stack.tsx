import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { spacing } from '../../constants/tokens';

export type StackGap = keyof typeof spacing | number;
export type StackAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type StackJustify =
  | 'flex-start' | 'flex-end' | 'center'
  | 'space-between' | 'space-around' | 'space-evenly';

interface StackBaseProps extends ViewProps {
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  flex?: number;
  padding?: StackGap;
  paddingX?: StackGap;
  paddingY?: StackGap;
}

function resolveGap(g: StackGap | undefined): number | undefined {
  if (g === undefined) return undefined;
  if (typeof g === 'number') return g;
  return spacing[g];
}

function makeStack(direction: 'row' | 'column') {
  return function Stack({
    gap,
    align,
    justify,
    wrap,
    flex,
    padding,
    paddingX,
    paddingY,
    style,
    children,
    ...rest
  }: StackBaseProps) {
    const baseStyle: ViewStyle = {
      flexDirection: direction,
      gap: resolveGap(gap),
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : undefined,
      flex,
      padding: resolveGap(padding),
      paddingHorizontal: resolveGap(paddingX),
      paddingVertical: resolveGap(paddingY),
    };
    return (
      <View {...rest} style={[baseStyle, style]}>
        {children}
      </View>
    );
  };
}

export const VStack = makeStack('column');
export const HStack = makeStack('row');

export function Spacer({ size = 'md' }: { size?: StackGap }) {
  const v = resolveGap(size) ?? 0;
  return <View style={{ width: v, height: v }} />;
}
