import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../constants/tokens';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('m.barroso@tasainmuebles.ar');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  function handleLogin() {
    if (email.trim().length === 0 || password.trim().length === 0) return;
    router.replace('/(tasador)/home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>Bienvenido de vuelta</Text>
          <Text style={styles.subtitle}>Ingresá con tu cuenta de tasador.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputRow, emailFocused && styles.inputRowFocused]}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.muted}
                placeholder="nombre@ejemplo.com"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              <Feather name="mail" size={18} color={emailFocused ? colors.coral : colors.muted} />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={[styles.inputRow, passwordFocused && styles.inputRowFocused]}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.muted}
                placeholder="••••••••"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={18}
                  color={passwordFocused ? colors.coral : colors.muted}
                />
              </Pressable>
            </View>
          </View>

          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.btnPrimary,
            email.trim().length === 0 || password.trim().length === 0
              ? styles.btnPrimaryDisabled
              : null,
          ]}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.btnPrimaryText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerLabel}>credenciales pre-cargadas por admin</Text>
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.registerLink}>
          ¿No tenés cuenta?{' '}
          <Text style={styles.registerLinkHighlight}>Registrate como cliente</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing['3xl'],
    padding: 4,
  },
  titleBlock: {
    gap: spacing.sm,
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: 26,
    fontWeight: typography.weights.bold,
    color: colors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.muted2,
  },
  form: {
    gap: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    gap: spacing.md,
    backgroundColor: colors.white,
  },
  inputRowFocused: {
    borderColor: colors.coral,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
    padding: 0,
    margin: 0,
  },
  forgotPassword: {
    fontSize: typography.sizes.base,
    color: colors.muted2,
    textAlign: 'right',
  },
  btnPrimary: {
    backgroundColor: colors.coral,
    borderRadius: radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  btnPrimaryDisabled: {
    opacity: 0.5,
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabel: {
    fontSize: typography.sizes.xs,
    color: colors.muted,
    textAlign: 'center',
    flexShrink: 1,
  },
  registerLink: {
    fontSize: typography.sizes.base,
    color: colors.muted2,
    textAlign: 'center',
  },
  registerLinkHighlight: {
    color: colors.coral,
    fontWeight: typography.weights.medium,
  },
});
