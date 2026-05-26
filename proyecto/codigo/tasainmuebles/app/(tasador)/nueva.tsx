import React, { useState } from 'react';
import {
  Alert,
  Modal,
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
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

import { colors, radius, spacing, typography } from '../../constants/tokens';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Accordion from '../../components/ui/Accordion';
import ModalSuccess from '../../components/ui/ModalSuccess';
import { MotivoTasacion, TipoInmueble } from '../../types/tasacion';

type TipoOpt = {
  key: TipoInmueble;
  label: string;
  icon: keyof typeof Feather.glyphMap;
};

const TIPOS: TipoOpt[] = [
  { key: 'casa', label: 'Casa', icon: 'home' },
  { key: 'depto', label: 'Departamento', icon: 'grid' },
  { key: 'terreno', label: 'Terreno', icon: 'square' },
  { key: 'galpon', label: 'Galpón', icon: 'package' },
  { key: 'local', label: 'Local', icon: 'shopping-bag' },
  { key: 'oficina', label: 'Oficina', icon: 'briefcase' },
];

const MOTIVOS: { key: MotivoTasacion; label: string }[] = [
  { key: 'venta', label: 'Tasación para venta' },
  { key: 'alquiler', label: 'Tasación para alquiler' },
  { key: 'sucesion', label: 'Sucesión' },
  { key: 'divorcio', label: 'Divorcio' },
  { key: 'judicial', label: 'Judicial' },
  { key: 'garantia', label: 'Garantía' },
  { key: 'contable', label: 'Contable' },
  { key: 'seguro', label: 'Seguro' },
  { key: 'donacion', label: 'Donación' },
  { key: 'otro', label: 'Otro' },
];

const ESTADOS_INMUEBLE = ['Muy bueno', 'Bueno', 'Regular', 'A reciclar'];

const AMENITIES = [
  'Pileta',
  'Parrilla',
  'Cochera',
  'Dependencia',
  'Balcón',
  'Terraza',
  'Jardín',
  'Baulera',
];

const ACCORDION_KEYS = [
  'motivo',
  'ubicacion',
  'solicitante',
  'fotos',
  'detalles',
  'descripcion',
] as const;
type AccordionKey = (typeof ACCORDION_KEYS)[number];

type FormData = {
  motivo: MotivoTasacion;
  domicilio: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  supTotal: string;
  supCubierta: string;
  dormitorios: string;
  banios: string;
  antiguedad: string;
  estado: string;
  amenities: string[];
  descripcion: string;
};

const PHOTO_SLOTS_FILLED = 5;
const PHOTO_SLOTS_EMPTY = 3;

export default function NuevaTasacionScreen() {
  const router = useRouter();

  const [tipo, setTipo] = useState<TipoInmueble>('casa');
  const [openAccordion, setOpenAccordion] = useState<AccordionKey | null>(
    'motivo',
  );
  const [data, setData] = useState<FormData>({
    motivo: 'venta',
    domicilio: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    supTotal: '',
    supCubierta: '',
    dormitorios: '',
    banios: '',
    antiguedad: '',
    estado: 'Bueno',
    amenities: [],
    descripcion: '',
  });

  const [motivoModal, setMotivoModal] = useState(false);
  const [estadoModal, setEstadoModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [filledPhotos, setFilledPhotos] = useState<number[]>(
    Array.from({ length: PHOTO_SLOTS_FILLED }, (_, i) => i + 1),
  );

  const showDormBanios = !['terreno', 'local', 'oficina'].includes(tipo);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleAccordion = (key: AccordionKey) =>
    setOpenAccordion((curr) => (curr === key ? null : key));

  const toggleAmenity = (a: string) =>
    setData((d) => ({
      ...d,
      amenities: d.amenities.includes(a)
        ? d.amenities.filter((x) => x !== a)
        : [...d.amenities, a],
    }));

  const handleUbicacion = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Sin permiso',
          'No se puede obtener tu ubicación. Ingresá el domicilio manualmente.',
        );
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      update(
        'domicilio',
        `${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`,
      );
    } catch (e) {
      Alert.alert('Error', 'No se pudo obtener tu ubicación.');
    }
  };

  const handleGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sin permiso', 'Habilitá el acceso a la galería desde ajustes.');
      return;
    }
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });
  };

  const handleTomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sin permiso', 'Habilitá el acceso a la cámara desde ajustes.');
      return;
    }
    await ImagePicker.launchCameraAsync({ quality: 0.7 });
  };

  const removePhoto = (n: number) =>
    setFilledPhotos((arr) => arr.filter((x) => x !== n));

  const handleGuardar = () => {
    if (!data.nombre.trim() || !data.apellido.trim() || !data.telefono.trim()) {
      Alert.alert(
        'Datos incompletos',
        'Completá nombre, apellido y teléfono del solicitante',
      );
      setOpenAccordion('solicitante');
      return;
    }
    if (data.descripcion.length < 50) {
      Alert.alert(
        'Descripción muy corta',
        'La descripción debe tener al menos 50 caracteres',
      );
      setOpenAccordion('descripcion');
      return;
    }
    setSuccessModal(true);
  };

  const handleVerTasacion = () => {
    setSuccessModal(false);
    router.replace('/(tasador)/detalle/1578');
  };

  const motivoLabel =
    MOTIVOS.find((m) => m.key === data.motivo)?.label ?? 'Seleccionar';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Feather name="arrow-left" size={18} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Nueva tasación</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Tipo de inmueble */}
        <Card style={styles.card}>
          <Text style={styles.sectionLabel}>Tipo de inmueble</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tipoRow}
          >
            {TIPOS.map((t) => {
              const selected = tipo === t.key;
              return (
                <Pressable
                  key={t.key}
                  onPress={() => setTipo(t.key)}
                  style={[styles.tipoChip, selected && styles.tipoChipActive]}
                >
                  <Feather
                    name={t.icon}
                    size={18}
                    color={selected ? colors.white : colors.muted2}
                  />
                  <Text
                    style={[
                      styles.tipoChipText,
                      selected && styles.tipoChipTextActive,
                    ]}
                  >
                    {t.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Card>

        {/* Datos de solicitud */}
        <Card style={styles.card}>
          <Text style={styles.sectionLabel}>Datos de solicitud</Text>
          <View style={styles.accordionStack}>
            {/* 1. Motivo */}
            <Accordion
              key={`motivo-${openAccordion === 'motivo'}`}
              title="Motivo"
              defaultOpen={openAccordion === 'motivo'}
              rightElement={
                <Pressable
                  onPress={() => toggleAccordion('motivo')}
                  style={StyleSheet.absoluteFill}
                />
              }
            >
              <View style={{ gap: spacing.sm }}>
                <Text style={styles.fieldLabel}>
                  Seleccione un motivo para su tasación
                </Text>
                <TouchableOpacity
                  style={styles.pseudoSelect}
                  onPress={() => setMotivoModal(true)}
                >
                  <Text style={styles.pseudoSelectText}>{motivoLabel}</Text>
                  <Feather name="chevron-down" size={18} color={colors.muted2} />
                </TouchableOpacity>
                <Text style={styles.hint}>
                  10 motivos disponibles · seleccioná el más relevante
                </Text>
              </View>
            </Accordion>

            {/* 2. Ubicación */}
            <Accordion
              key={`ubicacion-${openAccordion === 'ubicacion'}`}
              title="Ubicación"
              defaultOpen={openAccordion === 'ubicacion'}
            >
              <View style={{ gap: spacing.md }}>
                <Button
                  variant="outline"
                  size="full"
                  onPress={handleUbicacion}
                  icon={<Feather name="map-pin" size={16} color={colors.coral} />}
                >
                  Usar mi ubicación actual
                </Button>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>o</Text>
                  <View style={styles.dividerLine} />
                </View>
                <Input
                  label="Ingresá un domicilio"
                  placeholder="Calle, número, ciudad"
                  value={data.domicilio}
                  onChangeText={(v) => update('domicilio', v)}
                />
                {data.domicilio.length > 0 && (
                  <View style={styles.previewPill}>
                    <Feather name="map-pin" size={14} color={colors.coralDeep} />
                    <Text style={styles.previewPillText} numberOfLines={1}>
                      {data.domicilio}
                    </Text>
                  </View>
                )}
              </View>
            </Accordion>

            {/* 3. Solicitante */}
            <Accordion
              key={`solicitante-${openAccordion === 'solicitante'}`}
              title="Solicitante"
              defaultOpen={openAccordion === 'solicitante'}
            >
              <View style={{ gap: spacing.md }}>
                <Input
                  label="Nombre"
                  required
                  placeholder="Nombre"
                  value={data.nombre}
                  onChangeText={(v) => update('nombre', v)}
                  autoCapitalize="words"
                />
                <Input
                  label="Apellido"
                  required
                  placeholder="Apellido"
                  value={data.apellido}
                  onChangeText={(v) => update('apellido', v)}
                  autoCapitalize="words"
                />
                <Text style={styles.fieldLabel}>
                  Número de teléfono <Text style={styles.req}>*</Text>
                </Text>
                <View style={styles.phoneRow}>
                  <View style={styles.countrySelect}>
                    <Text style={styles.countryText}>+54 🇦🇷</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      label=""
                      placeholder="261 555 0000"
                      keyboardType="phone-pad"
                      value={data.telefono}
                      onChangeText={(v) => update('telefono', v)}
                    />
                  </View>
                </View>
                <Input
                  label="Email"
                  placeholder="email@ejemplo.com"
                  value={data.email}
                  onChangeText={(v) => update('email', v)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  rightIcon={<Feather name="mail" size={18} color={colors.muted2} />}
                />
                <Text style={styles.caption}>
                  Los datos del solicitante se almacenan únicamente para fines de
                  tasación profesional, en cumplimiento de la Ley 25.326.
                </Text>
              </View>
            </Accordion>

            {/* 4. Fotos */}
            <Accordion
              key={`fotos-${openAccordion === 'fotos'}`}
              title="Fotos"
              defaultOpen={openAccordion === 'fotos'}
            >
              <View style={{ gap: spacing.md }}>
                <View style={styles.photoGrid}>
                  {filledPhotos.map((n) => (
                    <View key={`f-${n}`} style={styles.photoSlot}>
                      <View style={styles.photoFilled}>
                        <Text style={styles.photoFilledText}>foto {n}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.photoRemove}
                        onPress={() => removePhoto(n)}
                      >
                        <Feather name="x" size={12} color={colors.white} />
                      </TouchableOpacity>
                    </View>
                  ))}
                  {Array.from({ length: PHOTO_SLOTS_EMPTY }).map((_, i) => (
                    <View key={`e-${i}`} style={styles.photoSlot}>
                      <View style={styles.photoEmpty}>
                        <Text style={styles.photoEmptyText}>+ slot</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={styles.photoActions}>
                  <View style={{ flex: 1 }}>
                    <Button
                      variant="dark"
                      size="full"
                      onPress={handleTomarFoto}
                      icon={<Feather name="camera" size={16} color={colors.white} />}
                    >
                      Tomar foto
                    </Button>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button
                      variant="outline"
                      size="full"
                      onPress={handleGaleria}
                      icon={<Feather name="image" size={16} color={colors.coral} />}
                    >
                      Galería
                    </Button>
                  </View>
                </View>
                <Text style={styles.caption}>
                  {filledPhotos.length} / 15 fotos · mínimo 3 recomendadas
                </Text>
              </View>
            </Accordion>

            {/* 5. Detalles */}
            <Accordion
              key={`detalles-${openAccordion === 'detalles'}`}
              title="Detalles"
              defaultOpen={openAccordion === 'detalles'}
            >
              <View style={{ gap: spacing.md }}>
                <View style={styles.grid2}>
                  <View style={styles.grid2Col}>
                    <Input
                      label="Sup. total (m²)"
                      placeholder="0"
                      keyboardType="numeric"
                      value={data.supTotal}
                      onChangeText={(v) => update('supTotal', v)}
                    />
                  </View>
                  <View style={styles.grid2Col}>
                    <Input
                      label="Sup. cubierta (m²)"
                      placeholder="0"
                      keyboardType="numeric"
                      value={data.supCubierta}
                      onChangeText={(v) => update('supCubierta', v)}
                    />
                  </View>
                  {showDormBanios && (
                    <>
                      <View style={styles.grid2Col}>
                        <Input
                          label="Dormitorios"
                          placeholder="0"
                          keyboardType="numeric"
                          value={data.dormitorios}
                          onChangeText={(v) => update('dormitorios', v)}
                        />
                      </View>
                      <View style={styles.grid2Col}>
                        <Input
                          label="Baños"
                          placeholder="0"
                          keyboardType="numeric"
                          value={data.banios}
                          onChangeText={(v) => update('banios', v)}
                        />
                      </View>
                    </>
                  )}
                  <View style={styles.grid2Col}>
                    <Input
                      label="Antigüedad (años)"
                      placeholder="0"
                      keyboardType="numeric"
                      value={data.antiguedad}
                      onChangeText={(v) => update('antiguedad', v)}
                    />
                  </View>
                  <View style={styles.grid2Col}>
                    <Text style={styles.fieldLabel}>Estado</Text>
                    <TouchableOpacity
                      style={styles.pseudoSelect}
                      onPress={() => setEstadoModal(true)}
                    >
                      <Text style={styles.pseudoSelectText}>{data.estado}</Text>
                      <Feather
                        name="chevron-down"
                        size={18}
                        color={colors.muted2}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.subLabel}>Amenities</Text>
                <View style={styles.amenityWrap}>
                  {AMENITIES.map((a) => {
                    const active = data.amenities.includes(a);
                    return (
                      <Pressable
                        key={a}
                        onPress={() => toggleAmenity(a)}
                        style={[
                          styles.amenityChip,
                          active && styles.amenityChipActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.amenityText,
                            active && styles.amenityTextActive,
                          ]}
                        >
                          {active ? '✓ ' : ''}
                          {a}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </Accordion>

            {/* 6. Descripción */}
            <Accordion
              key={`descripcion-${openAccordion === 'descripcion'}`}
              title="Descripción del inmueble"
              defaultOpen={openAccordion === 'descripcion'}
            >
              <View style={{ gap: spacing.sm }}>
                <Input
                  label=""
                  placeholder="Al menos 50 caracteres..."
                  multiline
                  value={data.descripcion}
                  onChangeText={(v) => update('descripcion', v)}
                />
                <View style={styles.descMeta}>
                  <Text style={styles.captionInline}>Mínimo 50 caracteres</Text>
                  <Text
                    style={[
                      styles.captionInline,
                      data.descripcion.length >= 50 && styles.captionMint,
                    ]}
                  >
                    {data.descripcion.length >= 50 ? '✓ ' : ''}
                    {data.descripcion.length} / mín. 50
                  </Text>
                </View>
              </View>
            </Accordion>
          </View>
        </Card>

        <View style={{ marginTop: 18 }}>
          <Button variant="primary" size="full" onPress={handleGuardar}>
            Guardar cambios
          </Button>
        </View>
      </ScrollView>

      {/* Modal motivo */}
      <SelectorModal
        visible={motivoModal}
        title="Motivo de la tasación"
        options={MOTIVOS.map((m) => ({ key: m.key, label: m.label }))}
        selectedKey={data.motivo}
        onSelect={(k) => {
          update('motivo', k as MotivoTasacion);
          setMotivoModal(false);
        }}
        onClose={() => setMotivoModal(false)}
      />

      {/* Modal estado */}
      <SelectorModal
        visible={estadoModal}
        title="Estado del inmueble"
        options={ESTADOS_INMUEBLE.map((e) => ({ key: e, label: e }))}
        selectedKey={data.estado}
        onSelect={(k) => {
          update('estado', k);
          setEstadoModal(false);
        }}
        onClose={() => setEstadoModal(false)}
      />

      <ModalSuccess
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        title="Tasación creada exitosamente"
        subtitle="La tasación #1578 ha sido dada de alta. Ya está lista para editar."
        illustration="paper-up"
        primaryLabel="Ver tasación"
        onPrimary={handleVerTasacion}
        secondaryLabel="Cerrar"
        onSecondary={() => setSuccessModal(false)}
      />
    </SafeAreaView>
  );
}

interface SelectorModalProps {
  visible: boolean;
  title: string;
  options: { key: string; label: string }[];
  selectedKey: string;
  onSelect: (key: string) => void;
  onClose: () => void;
}

function SelectorModal({
  visible,
  title,
  options,
  selectedKey,
  onSelect,
  onClose,
}: SelectorModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalClose}>
              <Feather name="x" size={18} color={colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ maxHeight: 420 }}>
            {options.map((o) => {
              const sel = o.key === selectedKey;
              return (
                <TouchableOpacity
                  key={o.key}
                  style={styles.optionRow}
                  onPress={() => onSelect(o.key)}
                >
                  <Text style={styles.optionText}>{o.label}</Text>
                  <View style={[styles.radio, sel && styles.radioActive]}>
                    {sel && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F2F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    fontFamily: typography.family,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: spacing.md,
  },
  card: {
    gap: spacing.md,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    fontFamily: typography.family,
  },
  // Tipos
  tipoRow: {
    gap: spacing.sm,
    paddingVertical: 4,
  },
  tipoChip: {
    minWidth: 70,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F4F0F1',
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tipoChipActive: {
    backgroundColor: colors.coral,
  },
  tipoChipText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.muted2,
    fontFamily: typography.family,
  },
  tipoChipTextActive: {
    color: colors.white,
  },
  // Accordion stack
  accordionStack: {
    gap: spacing.sm,
  },
  // Generic field bits
  fieldLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text2,
    fontFamily: typography.family,
    marginBottom: 2,
  },
  req: {
    color: colors.coral,
  },
  hint: {
    fontSize: typography.sizes.xs,
    color: colors.muted,
    fontFamily: typography.family,
  },
  caption: {
    fontSize: 11,
    color: colors.muted,
    fontFamily: typography.family,
    lineHeight: 16,
  },
  captionInline: {
    fontSize: 11,
    color: colors.muted,
    fontFamily: typography.family,
  },
  captionMint: {
    color: colors.mint,
    fontWeight: typography.weights.semibold,
  },
  // Pseudo-select
  pseudoSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.select({ ios: spacing.md, android: spacing.sm + 2 }),
  },
  pseudoSelectText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontFamily: typography.family,
  },
  // Ubicación
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontFamily: typography.family,
  },
  previewPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.bg2,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignSelf: 'flex-start',
  },
  previewPillText: {
    fontSize: typography.sizes.sm,
    color: colors.text2,
    fontFamily: typography.family,
    maxWidth: 240,
  },
  // Solicitante
  phoneRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-end',
  },
  countrySelect: {
    width: 88,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.select({ ios: spacing.md, android: spacing.sm + 2 }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontFamily: typography.family,
    fontWeight: typography.weights.medium,
  },
  // Fotos
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoSlot: {
    width: '31.5%',
    aspectRatio: 1,
    position: 'relative',
  },
  photoFilled: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoFilledText: {
    fontSize: typography.sizes.xs,
    color: colors.muted2,
    fontFamily: typography.family,
  },
  photoRemove: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoEmpty: {
    flex: 1,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg2,
  },
  photoEmptyText: {
    fontSize: typography.sizes.xs,
    color: colors.muted2,
    fontFamily: typography.family,
  },
  photoActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  // Detalles grid
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  grid2Col: {
    width: '47.5%',
    gap: spacing.xs,
  },
  subLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text2,
    fontFamily: typography.family,
    marginTop: spacing.xs,
  },
  amenityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: '#F1F2F6',
  },
  amenityChipActive: {
    backgroundColor: colors.coralSoft,
  },
  amenityText: {
    fontSize: typography.sizes.sm,
    color: colors.muted2,
    fontFamily: typography.family,
    fontWeight: typography.weights.medium,
  },
  amenityTextActive: {
    color: colors.coralDeep,
    fontWeight: typography.weights.semibold,
  },
  // Descripción
  descMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  modalTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    fontFamily: typography.family,
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.bg2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  optionText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontFamily: typography.family,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: colors.coral,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.coral,
  },
});
