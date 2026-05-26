import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
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
    </>
  );
}
