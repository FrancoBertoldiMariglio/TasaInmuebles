import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { colors, radius, spacing, typography } from '../../constants/tokens';

export default function RegistroScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [accept, setAccept] = useState(false);

  const handleSubmit = () => {
    if (!accept) return;
    router.replace('/(b2c)/home');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            accessibilityRole="button"
            accessibilityLabel="Volver"
          >
            <Feather name="arrow-left" size={18} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Creá tu cuenta</Text>
          <Text style={styles.subtitle}>
            Tasá tu inmueble en minutos. Gratis y sin certificación.
          </Text>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="vos@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              label="Contraseña"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              hint="Debe tener al menos 8 caracteres y una mayúscula."
              autoCapitalize="none"
            />
            <Input
              label="Repetir contraseña"
              placeholder="Repetí tu contraseña"
              value={password2}
              onChangeText={setPassword2}
              secureTextEntry
              autoCapitalize="none"
            />

            <Pressable
              style={styles.checkboxRow}
              onPress={() => setAccept((v) => !v)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: accept }}
            >
              <View
                style={[styles.checkbox, accept && styles.checkboxActive]}
              >
                {accept && (
                  <Feather name="check" size={12} color={colors.white} />
                )}
              </View>
              <Text style={styles.checkboxText}>
                Acepto los{' '}
                <Text style={styles.link}>Términos y Condiciones</Text> y el
                tratamiento de mis datos conforme a la{' '}
                <Text style={styles.link}>Ley 25.326</Text>.
              </Text>
            </Pressable>

            <View style={styles.submitWrap}>
              <Button
                variant={accept ? 'primary' : 'disabled'}
                size="full"
                onPress={handleSubmit}
                disabled={!accept}
              >
                Crear cuenta
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F2F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    fontFamily: typography.family,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted2,
    fontFamily: typography.family,
    marginTop: 6,
    lineHeight: 20,
  },
  form: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: colors.coral,
    borderColor: colors.coral,
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: colors.muted2,
    fontFamily: typography.family,
    lineHeight: 18,
  },
  link: {
    color: colors.coralDeep,
    fontWeight: '600',
  },
  submitWrap: {
    marginTop: 18,
  },
});
