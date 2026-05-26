import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../constants/tokens';

export interface InputProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  rightIcon?: React.ReactNode;
  hint?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: TextInput['props']['autoComplete'];
}

export default function Input({
  label,
  required = false,
  placeholder,
  value,
  onChangeText,
  rightIcon,
  hint,
  multiline = false,
  secureTextEntry = false,
  keyboardType = 'default',
  editable = true,
  autoCapitalize = 'sentences',
  autoComplete,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [secureVisible, setSecureVisible] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const showPasswordToggle = secureTextEntry;
  const effectiveSecure = secureTextEntry && !secureVisible;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <View
        style={[
          styles.inputContainer,
          focused && styles.inputFocused,
          !editable && styles.inputDisabled,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            rightIcon || showPasswordToggle ? styles.inputWithIcon : null,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          secureTextEntry={effectiveSecure}
          keyboardType={keyboardType}
          editable={editable}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          selectionColor={colors.coral}
        />

        {showPasswordToggle && (
          <Pressable
            onPress={() => setSecureVisible((v) => !v)}
            style={styles.iconButton}
            accessibilityLabel={
              secureVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
          >
            <Feather
              name={secureVisible ? 'eye-off' : 'eye'}
              size={18}
              color={colors.muted2}
            />
          </Pressable>
        )}

        {!showPasswordToggle && rightIcon && (
          <View style={styles.iconButton}>{rightIcon}</View>
        )}
      </View>

      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text2,
    fontFamily: typography.family,
    marginBottom: 2,
  },
  required: {
    color: colors.coral,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
      },
      android: { elevation: 1 },
    }),
  },
  inputFocused: {
    borderColor: colors.coral,
    ...Platform.select({
      ios: {
        shadowColor: colors.coral,
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  inputDisabled: {
    backgroundColor: colors.bg2,
    borderColor: colors.borderSoft,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.select({ ios: spacing.md, android: spacing.sm + 2 }),
    fontSize: typography.sizes.md,
    color: colors.text,
    fontFamily: typography.family,
  },
  inputMultiline: {
    minHeight: 96,
    paddingTop: spacing.md,
  },
  inputWithIcon: {
    paddingRight: spacing.xs,
  },
  iconButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: typography.sizes.xs,
    color: colors.muted,
    fontFamily: typography.family,
    marginTop: 2,
  },
});
