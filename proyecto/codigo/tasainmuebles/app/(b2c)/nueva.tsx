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
import * as ImagePicker from 'expo-image-picker';

import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import ModalSuccess from '../../components/ui/ModalSuccess';
import { colors, radius, spacing, typography } from '../../constants/tokens';
import { TipoInmueble } from '../../types/tasacion';

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

const ESTADOS_INMUEBLE = ['Muy bueno', 'Bueno', 'Regular', 'A reciclar'];

export default function B2CNuevaScreen() {
  const router = useRouter();

  const [tipo, setTipo] = useState<TipoInmueble>('depto');
  const [domicilio, setDomicilio] = useState('');
  const [supTotal, setSupTotal] = useState('');
  const [supCubierta, setSupCubierta] = useState('');
  const [dormitorios, setDormitorios] = useState('');
  const [banios, setBanios] = useState('');
  const [antiguedad, setAntiguedad] = useState('');
  const [estado, setEstado] = useState('Bueno');
  const [descripcion, setDescripcion] = useState('');
  const [estadoModal, setEstadoModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const showDormBanios = !['terreno', 'local', 'oficina'].includes(tipo);

  const handleElegirFotos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Sin permiso',
        'Habilitá el acceso a la galería desde ajustes.',
      );
      return;
    }
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });
  };

  const handleCalcular = () => {
    const faltantes: string[] = [];
    if (!tipo) faltantes.push('Tipo de inmueble');
    if (!domicilio.trim()) faltantes.push('Domicilio');
    if (!supTotal.trim()) faltantes.push('Superficie total');

    if (faltantes.length > 0) {
      Alert.alert('Faltan datos', `Completá: ${faltantes.join(', ')}`);
      return;
    }

    setSuccessModal(true);
  };

  const handleVerResultado = () => {
    setSuccessModal(false);
    router.push({
      pathname: '/(b2c)/resultado',
      params: {
        domicilio: domicilio.trim(),
        sup: supTotal.trim(),
        tipo,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
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
        <View style={styles.bannerTop}>
          <Feather name="info" size={14} color="#92400E" />
          <Text style={styles.bannerTopText}>
            Tasación referencial, no certificada profesionalmente.
          </Text>
        </View>

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

        {/* Domicilio */}
        <Card style={styles.card}>
          <Input
            label="Domicilio"
            placeholder="Calle, número, ciudad"
            value={domicilio}
            onChangeText={setDomicilio}
          />
        </Card>

        {/* Detalles */}
        <Card style={styles.card}>
          <Text style={styles.sectionLabel}>Detalles del inmueble</Text>
          <View style={styles.grid2}>
            <View style={styles.grid2Col}>
              <Input
                label="Sup. total (m²)"
                placeholder="0"
                keyboardType="numeric"
                value={supTotal}
                onChangeText={setSupTotal}
              />
            </View>
            <View style={styles.grid2Col}>
              <Input
                label="Sup. cubierta (m²)"
                placeholder="0"
                keyboardType="numeric"
                value={supCubierta}
                onChangeText={setSupCubierta}
              />
            </View>

            {showDormBanios && (
              <>
                <View style={styles.grid2Col}>
                  <Input
                    label="Dormitorios"
                    placeholder="0"
                    keyboardType="numeric"
                    value={dormitorios}
                    onChangeText={setDormitorios}
                  />
                </View>
                <View style={styles.grid2Col}>
                  <Input
                    label="Baños"
                    placeholder="0"
                    keyboardType="numeric"
                    value={banios}
                    onChangeText={setBanios}
                  />
                </View>
              </>
            )}

            <View style={styles.grid2Col}>
              <Input
                label="Antigüedad (años)"
                placeholder="0"
                keyboardType="numeric"
                value={antiguedad}
                onChangeText={setAntiguedad}
              />
            </View>
            <View style={styles.grid2Col}>
              <Text style={styles.fieldLabel}>Estado</Text>
              <TouchableOpacity
                style={styles.pseudoSelect}
                onPress={() => setEstadoModal(true)}
              >
                <Text style={styles.pseudoSelectText}>{estado}</Text>
                <Feather
                  name="chevron-down"
                  size={18}
                  color={colors.muted2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Fotos */}
        <Card style={styles.card}>
          <Text style={styles.sectionLabel}>Fotos (opcional)</Text>
          <View style={styles.photoGrid}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={styles.photoSlot}>
                <View style={styles.photoEmpty}>
                  <Text style={styles.photoEmptyText}>+ foto</Text>
                </View>
              </View>
            ))}
          </View>
          <Button variant="outline" size="full" onPress={handleElegirFotos}>
            Elegir fotos
          </Button>
        </Card>

        {/* Descripción */}
        <Card style={styles.card}>
          <Text style={styles.sectionLabel}>Descripción (opcional)</Text>
          <Input
            label=""
            placeholder="Describí tu propiedad..."
            multiline
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </Card>

        <View style={{ marginTop: 18 }}>
          <Button variant="primary" size="full" onPress={handleCalcular}>
            Calcular valor referencial
          </Button>
        </View>
      </ScrollView>

      <Modal
        visible={estadoModal}
        animationType="fade"
        transparent
        onRequestClose={() => setEstadoModal(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setEstadoModal(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Estado del inmueble</Text>
              <TouchableOpacity
                onPress={() => setEstadoModal(false)}
                style={styles.modalClose}
              >
                <Feather name="x" size={18} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 420 }}>
              {ESTADOS_INMUEBLE.map((e) => {
                const sel = e === estado;
                return (
                  <TouchableOpacity
                    key={e}
                    style={styles.optionRow}
                    onPress={() => {
                      setEstado(e);
                      setEstadoModal(false);
                    }}
                  >
                    <Text style={styles.optionText}>{e}</Text>
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

      <ModalSuccess
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        title="Cálculo listo"
        subtitle="Generamos un valor referencial para tu propiedad."
        illustration="check"
        primaryLabel="Ver resultado"
        onPrimary={handleVerResultado}
      />
    </SafeAreaView>
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
    paddingBottom: 110,
    gap: spacing.md,
  },
  bannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.mustardSoft,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  bannerTopText: {
    flex: 1,
    color: '#92400E',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: typography.family,
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
  fieldLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text2,
    fontFamily: typography.family,
    marginBottom: 2,
  },
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
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  grid2Col: {
    width: '47.5%',
    gap: spacing.xs,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoSlot: {
    width: '31.5%',
    aspectRatio: 1,
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
