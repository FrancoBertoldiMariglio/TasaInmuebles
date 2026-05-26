import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';
import { colors, radius, spacing, typography } from '../../constants/tokens';

function Isotipo({ size }: { size: number }) {
  const r = size / 2;
  const petalH = size * 0.22;
  const petalW = size * 0.38;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id="g2" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#FB923C" />
          <Stop offset="50%" stopColor="#F87171" />
          <Stop offset="100%" stopColor="#2DD4BF" />
        </RadialGradient>
      </Defs>
      <Ellipse
        cx={r}
        cy={r - petalH * 0.6}
        rx={petalW * 0.55}
        ry={petalH}
        fill="url(#g2)"
        opacity={0.95}
      />
      <Ellipse
        cx={r}
        cy={r + petalH * 0.6}
        rx={petalW * 0.55}
        ry={petalH}
        fill="url(#g2)"
        opacity={0.85}
      />
      <Ellipse
        cx={r - petalH * 0.6}
        cy={r}
        rx={petalH}
        ry={petalW * 0.55}
        fill="url(#g2)"
        opacity={0.9}
      />
      <Ellipse
        cx={r + petalH * 0.6}
        cy={r}
        rx={petalH}
        ry={petalW * 0.55}
        fill="url(#g2)"
        opacity={0.8}
      />
    </Svg>
  );
}

export default function BienvenidaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Isotipo size={64} />
        <Text style={styles.wordmark}>Tasainmuebles</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.headline}>Tasaciones que se firman.</Text>
        <Text style={styles.body}>
          Profesionales matriculados, validados en comité, entregados en PDF.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.push('/(auth)/registro' as never)}
          activeOpacity={0.85}
        >
          <Text style={styles.btnPrimaryText}>Quiero tasar mi propiedad</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnOutlineText}>Soy Tasador · Iniciar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.caption}>Argentina · Colegio de Arquitectos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    gap: 12,
  },
  wordmark: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: 8,
  },
  headline: {
    fontSize: 26,
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 34,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.muted2,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    gap: spacing.md,
  },
  btnPrimary: {
    backgroundColor: colors.coral,
    borderRadius: radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: colors.coral,
    borderRadius: radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnOutlineText: {
    color: colors.coral,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  caption: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
