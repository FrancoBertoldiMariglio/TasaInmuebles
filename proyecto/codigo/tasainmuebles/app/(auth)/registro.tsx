import React, { useState } from 'react';
import {
  Alert,
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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

function validarPassword(pwd: string): string | null {
  if (pwd.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  if (!/[A-Z]/.test(pwd)) return 'La contraseña debe tener al menos una mayúscula.';
  return null;
}

function traducirErrorRegistro(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('already registered') || m.includes('user already'))
    return 'Ya existe una cuenta con ese email. Intentá iniciar sesión.';
  if (m.includes('invalid email')) return 'El email no es válido.';
  if (m.includes('password')) return 'La contraseña no cumple los requisitos mínimos.';
  if (m.includes('network')) return 'Sin conexión. Revisá tu internet.';
  return msg;
}

export default function RegistroScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [accept, setAccept] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!accept || submitting) return;

    const emailTrim = email.trim();
    if (emailTrim.length === 0) {
      Alert.alert('Falta el email', 'Ingresá un email válido.');
      return;
    }
    const pwdError = validarPassword(password);
    if (pwdError) {
      Alert.alert('Contraseña inválida', pwdError);
      return;
    }
    if (password !== password2) {
      Alert.alert('Las contraseñas no coinciden', 'Repetí la misma contraseña en los dos campos.');
      return;
    }

    setSubmitting(true);
    const { error, userId } = await signUp(emailTrim, password, 'cliente_b2c');
    if (error) {
      setSubmitting(false);
      Alert.alert('No pudimos crear tu cuenta', traducirErrorRegistro(error.message));
      return;
    }

    // Persistir aceptación de Ley 25.326 en el profile (trigger ya lo creó).
    if (userId) {
      const { error: updErr } = await supabase
        .from('profiles')
        .update({ acepto_terminos_at: new Date().toISOString() })
        .eq('id', userId);
      if (updErr) {
        console.warn('[registro] no se pudo persistir acepto_terminos_at:', updErr.message);
      }
    }

    setSubmitting(false);
    // El AuthProvider redirige automáticamente.
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
                variant={accept && !submitting ? 'primary' : 'disabled'}
                size="full"
                onPress={handleSubmit}
                disabled={!accept || submitting}
              >
                {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
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
