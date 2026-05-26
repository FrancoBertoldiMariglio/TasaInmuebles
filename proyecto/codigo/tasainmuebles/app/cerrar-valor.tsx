import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LiquidGlassView } from '@callstack/liquid-glass';
import Button from '../components/ui/Button';
import { useGlassSupport } from '../hooks/useGlassSupport';
import { colors, radius, spacing, typography } from '../constants/tokens';

type Opcion = 'fitt' | 'override';

export default function CerrarValorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id ?? '1578';

  const [opcion, setOpcion] = useState<Opcion>('fitt');
  const [valorARS, setValorARS] = useState('');
  const [valorUSD, setValorUSD] = useState('');

  const isOverride = opcion === 'override';
  const glassOn = useGlassSupport();

  const handleConfirm = () => {
    router.dismiss();
    setTimeout(() => {
      router.push({ pathname: '/compartir', params: { id } });
    }, 50);
  };

  return (
    <Pressable style={styles.scrim} onPress={() => router.dismiss()}>
      <Pressable style={styles.sheetWrap} onPress={(e) => e.stopPropagation()}>
        {glassOn && (
          <LiquidGlassView
            effect="regular"
            tintColor="rgba(255,255,255,0.78)"
            style={styles.sheetGlass}
          />
        )}
        <SafeAreaView
          edges={['bottom']}
          style={[styles.sheet, glassOn && styles.sheetTransparent]}
        >
          <View style={styles.handle} />

          <Text style={styles.title}>Cerrar valor del comité</Text>
          <Text style={styles.subtitle}>
            Elegí cómo cerrar la tasación #{id}.
          </Text>

          <Pressable
            onPress={() => setOpcion('fitt')}
            style={[
              styles.optionBase,
              opcion === 'fitt' ? styles.optionFittActive : styles.optionInactive,
            ]}
          >
            <View style={styles.optionRow}>
              <View style={styles.optionTextWrap}>
                <Text
                  style={[
                    styles.optionTitle,
                    opcion === 'fitt' && { color: colors.coralDeep },
                  ]}
                >
                  Aceptar valor Fitt-Servini
                </Text>
                <Text style={styles.optionSubtitle}>
                  AR$ 142.500.000 · US$ 175.000
                </Text>
              </View>
              <View
                style={[
                  styles.radioCircle,
                  opcion === 'fitt' ? styles.radioCircleActive : styles.radioCircleInactive,
                ]}
              >
                {opcion === 'fitt' && (
                  <Feather name="check" size={14} color={colors.white} />
                )}
              </View>
            </View>
          </Pressable>

          <View style={{ height: 10 }} />

          <Pressable
            onPress={() => setOpcion('override')}
            style={[
              styles.optionBase,
              opcion === 'override' ? styles.optionOverrideActive : styles.optionInactive,
            ]}
          >
            <View style={styles.optionRow}>
              <View style={styles.optionTextWrap}>
                <Text style={styles.optionTitle}>Override manual</Text>
                <Text style={styles.optionSubtitle}>
                  Ingresar valores propios + motivo
                </Text>
              </View>
              <View
                style={[
                  styles.radioCircle,
                  opcion === 'override' ? styles.radioCircleActive : styles.radioCircleInactive,
                ]}
              >
                {opcion === 'override' && (
                  <Feather name="check" size={14} color={colors.white} />
                )}
              </View>
            </View>
          </Pressable>

          <View style={styles.inputsRow}>
            <View style={styles.inputCell}>
              <Text style={styles.inputLabel}>Valor ARS</Text>
              <TextInput
                style={[styles.input, !isOverride && styles.inputDisabled]}
                editable={isOverride}
                value={valorARS}
                onChangeText={setValorARS}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.muted}
              />
            </View>
            <View style={styles.inputCell}>
              <Text style={styles.inputLabel}>Valor USD</Text>
              <TextInput
                style={[styles.input, !isOverride && styles.inputDisabled]}
                editable={isOverride}
                value={valorUSD}
                onChangeText={setValorUSD}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.muted}
              />
            </View>
          </View>

          <View style={{ marginTop: 18 }}>
            <Button variant="primary" size="full" onPress={handleConfirm}>
              Confirmar cierre
            </Button>
          </View>
        </SafeAreaView>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(31,41,55,0.5)',
    justifyContent: 'flex-end',
  },
  sheetWrap: {
    width: '100%',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 26,
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 19,
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
    fontFamily: typography.family,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted2,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 18,
    fontFamily: typography.family,
  },
  optionBase: {
    width: '100%',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  optionFittActive: {
    borderColor: colors.coral,
    backgroundColor: '#FFF7F5',
  },
  optionOverrideActive: {
    borderColor: colors.coral,
    backgroundColor: '#FFF7F5',
  },
  optionInactive: {
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTextWrap: {
    flex: 1,
    paddingRight: spacing.md,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
  },
  optionSubtitle: {
    fontSize: 12,
    color: colors.muted2,
    marginTop: 2,
    fontFamily: typography.family,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    backgroundColor: colors.coral,
  },
  radioCircleInactive: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  inputsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  inputCell: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: colors.text2,
    fontWeight: typography.weights.medium,
    marginBottom: 4,
    fontFamily: typography.family,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.sizes.md,
    color: colors.text,
    backgroundColor: colors.white,
    fontFamily: typography.family,
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    color: colors.muted,
  },
});
