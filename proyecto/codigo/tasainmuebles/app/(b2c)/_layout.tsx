import { Tabs, useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/tokens';

function FABButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      accessibilityLabel="Nueva tasación"
      accessibilityRole="button"
    >
      <View style={styles.fabInner}>
        <Feather name="plus" size={28} color={colors.white} />
      </View>
    </Pressable>
  );
}

export default function B2CLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.coral,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        ...Platform.select({
          android: {
            tabBarAndroidRipple: { borderless: true, radius: 32 },
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Inicio',
        }}
      />
      <Tabs.Screen
        name="tasaciones"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
          tabBarLabel: 'Tasaciones',
          tabBarButton: (props) => (
            <Pressable
              {...(props as object)}
              onPress={() => router.push('/(b2c)/home')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nueva"
        options={{
          tabBarLabel: '',
          tabBarButton: () => (
            <FABButton onPress={() => router.push('/(b2c)/nueva')} />
          ),
        }}
      />
      <Tabs.Screen
        name="ayuda"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="help-circle" size={size} color={color} />
          ),
          tabBarLabel: 'Ayuda',
          tabBarButton: (props) => (
            <Pressable
              {...(props as object)}
              onPress={() => router.push('/coming-soon')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarLabel: 'Perfil',
          tabBarButton: (props) => (
            <Pressable
              {...(props as object)}
              onPress={() => router.push('/coming-soon')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="resultado"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const TAB_BAR_HEIGHT = 68;
const FAB_SIZE = 60;
const FAB_OFFSET = 22;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.navy,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 0,
    height: TAB_BAR_HEIGHT,
    paddingBottom: Platform.select({ ios: 8, android: 4 }),
    paddingTop: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: FAB_OFFSET,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.coral,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fabPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  fabInner: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
