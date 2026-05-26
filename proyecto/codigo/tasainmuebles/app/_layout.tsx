import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/tokens';

function RootLayoutNav() {
  const { session, profile, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const first = segments[0] as string | undefined;
    const inAuthGroup = first === '(auth)';
    // Permitimos que el splash inicial corra incluso si ya hay sesión.
    const onSplash = first === 'splash' || (inAuthGroup && segments[1] === 'splash');

    if (!session) {
      if (!inAuthGroup && first !== undefined) {
        router.replace('/(auth)/bienvenida');
      }
      return;
    }

    if (session && profile && inAuthGroup && !onSplash) {
      const isPro =
        profile.rol === 'tasador' ||
        profile.rol === 'comite' ||
        profile.rol === 'admin';
      router.replace(isPro ? '/(tasador)/home' : '/(b2c)/home');
    }
  }, [session, profile, loading, segments, router]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.coral} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tasador)" />
      <Stack.Screen name="(b2c)" options={{ headerShown: false }} />
      <Stack.Screen name="coming-soon" options={{ headerShown: false }} />
      <Stack.Screen
        name="cerrar-valor"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="compartir"
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7F5',
  },
});
