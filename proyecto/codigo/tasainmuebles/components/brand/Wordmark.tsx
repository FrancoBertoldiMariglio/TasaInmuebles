import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../../constants/tokens';
import Isotipo from './Isotipo';

export interface WordmarkProps {
  size?: number;
}

export default function Wordmark({ size = 16 }: WordmarkProps) {
  const isotipoSize = size * 2.4;

  return (
    <View style={styles.container}>
      <Isotipo size={isotipoSize} />
      <View style={styles.textWrap}>
        <Text style={[styles.tasa, { fontSize: size }]}>Tasa</Text>
        <Text style={[styles.inmuebles, { fontSize: size }]}>inmuebles</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  tasa: {
    fontWeight: typography.weights.bold,
    color: colors.coral,
    fontFamily: typography.family,
    letterSpacing: -0.3,
  },
  inmuebles: {
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
    letterSpacing: -0.3,
  },
});
