import { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';
import { colors, typography } from '../../constants/tokens';

function Isotipo({ size }: { size: number }) {
  const r = size / 2;
  const petalW = size * 0.38;
  const petalH = size * 0.22;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id="g1" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#FB923C" />
          <Stop offset="50%" stopColor="#F87171" />
          <Stop offset="100%" stopColor="#2DD4BF" />
        </RadialGradient>
      </Defs>
      {/* pétalo arriba */}
      <Ellipse
        cx={r}
        cy={r - petalH * 0.6}
        rx={petalW * 0.55}
        ry={petalH}
        fill="url(#g1)"
        opacity={0.95}
      />
      {/* pétalo abajo */}
      <Ellipse
        cx={r}
        cy={r + petalH * 0.6}
        rx={petalW * 0.55}
        ry={petalH}
        fill="url(#g1)"
        opacity={0.85}
      />
      {/* pétalo izquierda */}
      <Ellipse
        cx={r - petalH * 0.6}
        cy={r}
        rx={petalH}
        ry={petalW * 0.55}
        fill="url(#g1)"
        opacity={0.9}
      />
      {/* pétalo derecha */}
      <Ellipse
        cx={r + petalH * 0.6}
        cy={r}
        rx={petalH}
        ry={petalW * 0.55}
        fill="url(#g1)"
        opacity={0.8}
      />
    </Svg>
  );
}

export default function SplashScreen() {
  const router = useRouter();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/(auth)/bienvenida');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Animated.View style={{ opacity: logoOpacity }}>
          <Isotipo size={80} />
        </Animated.View>

        <Animated.View style={[styles.textBlock, { opacity: textOpacity }]}>
          <Text style={styles.wordmark}>Tasainmuebles</Text>
          <Text style={styles.subtitle}>Tasaciones inmobiliarias profesionales</Text>
        </Animated.View>
      </View>

      <Animated.View style={[styles.footer, { opacity: textOpacity }]}>
        <Text style={styles.version}>v1.0 · MVP Hito 1</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  textBlock: {
    alignItems: 'center',
    gap: 6,
  },
  wordmark: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.muted,
    fontWeight: typography.weights.regular,
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  version: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
});
