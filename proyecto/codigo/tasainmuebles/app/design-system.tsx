import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Text,
  VStack,
  HStack,
  Spacer,
  Divider,
  Icon,
  IconButton,
  Chip,
  Switch,
  EmptyState,
  Skeleton,
  ListItem,
  BottomSheet,
  ToastProvider,
  useToast,
} from '../components/ds';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { colors, layout, motion, opacity, radius, shadows, spacing, typography, zIndex } from '../constants/tokens';

export default function DesignSystemScreen() {
  return (
    <ToastProvider>
      <Showcase />
    </ToastProvider>
  );
}

function Showcase() {
  const router = useRouter();
  const toast = useToast();
  const [switchOn, setSwitchOn] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.appBar}>
        <IconButton
          name="arrow-left"
          variant="soft"
          size="md"
          accessibilityLabel="Volver"
          onPress={() => router.back()}
        />
        <Text variant="title">Design System</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Section title="Foundations · Color" subtitle="semantic colors (palette below)">
          <ColorSwatch name="coral" value={colors.coral} />
          <ColorSwatch name="coralDeep" value={colors.coralDeep} />
          <ColorSwatch name="coralBg" value={colors.coralBg} />
          <ColorSwatch name="navy" value={colors.navy} />
          <ColorSwatch name="text" value={colors.text} />
          <ColorSwatch name="text2" value={colors.text2} />
          <ColorSwatch name="muted2" value={colors.muted2} />
          <ColorSwatch name="bg" value={colors.bg} />
          <ColorSwatch name="card" value={colors.card} />
          <ColorSwatch name="border" value={colors.border} />
          <ColorSwatch name="mint" value={colors.mint} />
          <ColorSwatch name="mustard" value={colors.mustard} />
          <ColorSwatch name="mustardText" value={colors.mustardText} />
          <ColorSwatch name="info" value={colors.info} />
          <ColorSwatch name="danger" value={colors.danger} />
        </Section>

        <Section title="Foundations · Spacing">
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const).map((k) => (
            <HStack key={k} gap="md" align="center" style={styles.row}>
              <Text variant="caption" color="muted2" style={{ width: 40 }}>{k}</Text>
              <View style={{ width: spacing[k], height: 12, backgroundColor: colors.coral, borderRadius: 4 }} />
              <Text variant="caption" color="muted">{spacing[k]}px</Text>
            </HStack>
          ))}
        </Section>

        <Section title="Foundations · Radius">
          <HStack gap="md" wrap>
            {(['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const).map((k) => (
              <VStack key={k} gap="xs" align="center">
                <View style={{ width: 56, height: 56, borderRadius: radius[k], backgroundColor: colors.coralSoft }} />
                <Text variant="caption" color="muted2">{k}</Text>
              </VStack>
            ))}
          </HStack>
        </Section>

        <Section title="Foundations · Shadows">
          <HStack gap="lg" wrap>
            {(['sm', 'md', 'card', 'lg'] as const).map((k) => (
              <VStack key={k} gap="xs" align="center">
                <View style={[{ width: 64, height: 64, borderRadius: radius.md, backgroundColor: colors.card }, shadows[k]]} />
                <Text variant="caption" color="muted2">{k}</Text>
              </VStack>
            ))}
          </HStack>
        </Section>

        <Section title="Foundations · Motion / Z-index / Opacity">
          <Text variant="caption" color="muted2">duration.fast {motion.duration.fast}ms · base {motion.duration.base}ms · slow {motion.duration.slow}ms</Text>
          <Text variant="caption" color="muted2">zIndex modal {zIndex.modal} · toast {zIndex.toast} · overlay {zIndex.overlay}</Text>
          <Text variant="caption" color="muted2">opacity disabled {opacity.disabled} · pressed {opacity.pressed} · glass {opacity.glass}</Text>
          <Text variant="caption" color="muted2">layout tabBar {layout.tabBarHeight} · appBar {layout.appBarHeight} · fab {layout.fabSize}</Text>
        </Section>

        <Section title="Typography variants">
          <Text variant="display">42</Text>
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="title">Title 17</Text>
          <Text variant="body">Body text — descripción genérica con line-height normal.</Text>
          <Text variant="bodyStrong">Body strong — para énfasis dentro de body.</Text>
          <Text variant="label">Label form input</Text>
          <Text variant="caption">Caption — meta info, secundario.</Text>
          <Text variant="overline">Overline tracking</Text>
        </Section>

        <Section title="Icons">
          <HStack gap="md" wrap align="center">
            <Icon name="home" size="xs" />
            <Icon name="home" size="sm" />
            <Icon name="home" size="md" />
            <Icon name="home" size="lg" />
            <Icon name="home" size="xl" />
            <Icon name="home" size="2xl" />
            <Icon name="heart" color="coral" size="xl" />
            <Icon name="check-circle" color="mint" size="xl" />
            <Icon name="alert-triangle" color="mustard" size="xl" />
          </HStack>
        </Section>

        <Section title="IconButton">
          <HStack gap="md" wrap align="center">
            <IconButton name="bell" variant="ghost" accessibilityLabel="Notificaciones" />
            <IconButton name="settings" variant="soft" accessibilityLabel="Ajustes" />
            <IconButton name="plus" variant="solid" accessibilityLabel="Agregar" />
            <IconButton name="trash-2" variant="soft" color="danger" accessibilityLabel="Borrar" />
            <IconButton name="lock" variant="ghost" accessibilityLabel="Bloqueado" disabled />
          </HStack>
        </Section>

        <Section title="Buttons (legacy components/ui/Button)">
          <VStack gap="sm">
            <Button variant="primary" size="full">Primary full</Button>
            <Button variant="outline" size="full">Outline full</Button>
            <Button variant="dark" size="full">Dark full</Button>
            <HStack gap="sm">
              <Button variant="primary" size="sm">SM</Button>
              <Button variant="outline" size="sm">SM outline</Button>
            </HStack>
          </VStack>
        </Section>

        <Section title="Chip">
          <HStack gap="sm" wrap>
            <Chip label="Neutral" variant="neutral" />
            <Chip label="Primary" variant="primary" />
            <Chip label="Success" variant="success" leadingIcon="check" />
            <Chip label="Warning" variant="warning" />
            <Chip label="Info" variant="info" leadingIcon="info" />
            <Chip label="Danger" variant="danger" trailingIcon="x" />
            <Chip label="Small" variant="primary" size="sm" />
          </HStack>
        </Section>

        <Section title="Badge (legacy)">
          <HStack gap="sm" wrap>
            <Badge variant="mustard">A editar</Badge>
            <Badge variant="info">En proceso</Badge>
            <Badge variant="mint">Tasada</Badge>
          </HStack>
        </Section>

        <Section title="Switch">
          <HStack gap="md" align="center">
            <Switch value={switchOn} onValueChange={setSwitchOn} accessibilityLabel="Demo" />
            <Text variant="label">{switchOn ? 'On' : 'Off'}</Text>
            <Spacer size="md" />
            <Switch value={false} onValueChange={() => {}} disabled accessibilityLabel="Disabled" />
            <Text variant="label" color="muted">Disabled</Text>
          </HStack>
        </Section>

        <Section title="Input (legacy)">
          <Input label="Email" placeholder="email@ejemplo.com" />
          <Input label="Password" placeholder="••••••••" />
        </Section>

        <Section title="Card (legacy)">
          <Card>
            <Text variant="h3">Card title</Text>
            <Text variant="body" color="muted2">Card body con padding por defecto.</Text>
          </Card>
        </Section>

        <Section title="ListItem">
          <Card padding={0}>
            <ListItem
              title="Mario Pérez"
              subtitle="13/07/2026 · #1578"
              leadingIcon="user"
              trailing={<Badge variant="mustard">A tasar</Badge>}
              showChevron
              onPress={() => {}}
            />
            <ListItem
              title="Marcos Barroso"
              subtitle="05/28/2026 · #5603"
              leadingIcon="user"
              trailing={<Badge variant="info">Sin asignar</Badge>}
              showChevron
              onPress={() => {}}
            />
            <ListItem
              title="Camila Pereyra"
              subtitle="17/09/2025 · #4472"
              leadingIcon="user"
              trailing={<Badge variant="info">En proceso</Badge>}
              showChevron
              onPress={() => {}}
              divider={false}
            />
          </Card>
        </Section>

        <Section title="Divider">
          <Text variant="body">Texto antes</Text>
          <Divider />
          <Text variant="body">Texto medio</Text>
          <Divider variant="soft" inset="md" />
          <Text variant="body">Texto final</Text>
        </Section>

        <Section title="Skeleton">
          <VStack gap="sm">
            <Skeleton height={20} width="60%" />
            <Skeleton height={16} width="90%" />
            <Skeleton height={16} width="80%" />
          </VStack>
        </Section>

        <Section title="EmptyState">
          <Card>
            <EmptyState
              icon="inbox"
              title="Sin tasaciones todavía"
              description="Cuando crees tu primera tasación va a aparecer acá."
              actionLabel="Nueva tasación"
              onAction={() => toast.show({ message: 'CTA disparado', variant: 'success' })}
            />
          </Card>
        </Section>

        <Section title="Toast">
          <HStack gap="sm" wrap>
            <Button variant="primary" size="sm" onPress={() => toast.show({ message: 'Guardado correctamente', variant: 'success' })}>Success</Button>
            <Button variant="outline" size="sm" onPress={() => toast.show({ message: 'Información del sistema', variant: 'info' })}>Info</Button>
            <Button variant="outline" size="sm" onPress={() => toast.show({ message: 'Algo a revisar', variant: 'warning' })}>Warning</Button>
            <Button variant="outline" size="sm" onPress={() => toast.show({ message: 'No se pudo conectar', variant: 'danger' })}>Danger</Button>
          </HStack>
        </Section>

        <Section title="BottomSheet">
          <Button variant="dark" size="full" onPress={() => setSheetOpen(true)}>Abrir BottomSheet</Button>
        </Section>

        <Spacer size="3xl" />
      </ScrollView>

      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="Sheet demo">
        <Text variant="body" color="muted2" align="center">
          Sheet con Liquid Glass en iOS 26+. Tocá fuera para cerrar.
        </Text>
        <Spacer size="lg" />
        <Button variant="primary" size="full" onPress={() => setSheetOpen(false)}>Cerrar</Button>
      </BottomSheet>
    </SafeAreaView>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <VStack gap="md" style={styles.section}>
      <VStack gap="xs">
        <Text variant="overline" color="muted2">{title}</Text>
        {subtitle ? <Text variant="caption" color="muted">{subtitle}</Text> : null}
      </VStack>
      {children}
    </VStack>
  );
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <HStack gap="md" align="center" style={styles.row}>
      <View style={[styles.swatch, { backgroundColor: value }]} />
      <VStack gap="none" flex={1}>
        <Text variant="bodyStrong">{name}</Text>
        <Text variant="caption" color="muted2">{value}</Text>
      </VStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
  },
  scroll: {
    padding: spacing.lg,
    gap: spacing['2xl'],
  },
  section: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  row: {
    paddingVertical: spacing.xs,
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
});
