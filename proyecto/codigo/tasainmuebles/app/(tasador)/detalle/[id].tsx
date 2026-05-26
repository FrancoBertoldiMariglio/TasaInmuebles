import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Badge, { BadgeVariant } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import ModalSuccess from '../../../components/ui/ModalSuccess';
import { colors, radius, spacing, typography } from '../../../constants/tokens';
import {
  EstadoTasacion,
  MotivoTasacion,
  SAMPLE_TASACIONES,
  TipoInmueble,
} from '../../../types/tasacion';

const TIPO_LABELS: Record<TipoInmueble, string> = {
  casa: 'Casa',
  depto: 'Departamento',
  terreno: 'Terreno',
  galpon: 'Galpón',
  local: 'Local',
  oficina: 'Oficina',
};

const MOTIVO_LABELS: Record<MotivoTasacion, string> = {
  venta: 'venta',
  alquiler: 'alquiler',
  sucesion: 'sucesión',
  divorcio: 'divorcio',
  judicial: 'tasación judicial',
  garantia: 'garantía',
  contable: 'contable',
  seguro: 'seguro',
  donacion: 'donación',
  otro: 'otro',
};

const MOTIVO_LABELS_TITLE: Record<MotivoTasacion, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  sucesion: 'Sucesión',
  divorcio: 'Divorcio',
  judicial: 'Tasación judicial',
  garantia: 'Garantía',
  contable: 'Contable',
  seguro: 'Seguro',
  donacion: 'Donación',
  otro: 'Otro',
};

const ESTADO_BADGE: Record<
  EstadoTasacion,
  { variant: BadgeVariant; label: string }
> = {
  borrador: { variant: 'mustard', label: 'A editar' },
  a_editar: { variant: 'mustard', label: 'A editar' },
  a_tasar: { variant: 'mustard', label: 'A tasar' },
  en_comite: { variant: 'info', label: 'En proceso' },
  tasada: { variant: 'mint', label: 'Tasada' },
  compartida: { variant: 'mint', label: 'Compartida' },
};

const ESTADO_PROGRESS: Record<EstadoTasacion, number> = {
  borrador: 30,
  a_editar: 30,
  a_tasar: 64,
  en_comite: 85,
  tasada: 100,
  compartida: 100,
};

function formatMoney(n: number): string {
  if (!n) return '0';
  return n.toLocaleString('es-AR');
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailField}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function PhotoPlaceholder({
  height,
  label,
  fontSize = 11,
  showArrows = false,
}: {
  height: number;
  label: string;
  fontSize?: number;
  showArrows?: boolean;
}) {
  return (
    <View style={[styles.photoPlaceholder, { height }]}>
      <Text style={[styles.photoLabel, { fontSize }]}>{label}</Text>
      {showArrows ? (
        <>
          <View style={[styles.photoArrow, styles.photoArrowLeft]}>
            <Feather name="chevron-left" size={16} color={colors.text2} />
          </View>
          <View style={[styles.photoArrow, styles.photoArrowRight]}>
            <Feather name="chevron-right" size={16} color={colors.text2} />
          </View>
        </>
      ) : null}
    </View>
  );
}

function MoreInfoRow({
  label,
  isLast,
}: {
  label: string;
  isLast?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.moreRow, !isLast && styles.moreRowBorder]}
    >
      <Text style={styles.moreRowLabel}>{label}</Text>
      <Feather name="chevron-right" size={18} color={colors.muted} />
    </TouchableOpacity>
  );
}

export default function DetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [tab, setTab] = useState<'tasacion' | 'comite'>('tasacion');
  const [editSuccess, setEditSuccess] = useState(false);
  const tasacion = SAMPLE_TASACIONES.find((t) => t.id === id);

  if (!tasacion) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Tasación no encontrada</Text>
          <Text style={styles.notFoundId}>ID: {id}</Text>
          <View style={{ height: spacing.lg }} />
          <Button variant="primary" onPress={() => router.back()}>
            Volver
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const badge = ESTADO_BADGE[tasacion.estado];
  const progress = ESTADO_PROGRESS[tasacion.estado];
  const motivoLow = MOTIVO_LABELS[tasacion.motivo];
  const tipoLabel = TIPO_LABELS[tasacion.tipo];
  const motivoTitle = MOTIVO_LABELS_TITLE[tasacion.motivo];
  const partes = tasacion.domicilio.split(',');
  const calle = partes[0]?.trim() || tasacion.domicilio;
  const ciudad = partes[1]?.trim() || tasacion.domicilio;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityRole="button"
        >
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.appBarTitle}>Tasación {tasacion.id}</Text>
        <View style={styles.appBarSpacer} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <Pressable onPress={() => setTab('tasacion')} style={styles.tabBtn}>
          <Text
            style={[styles.tabLabel, tab === 'tasacion' && styles.tabLabelActive]}
          >
            Tasación
          </Text>
          {tab === 'tasacion' ? <View style={styles.tabUnderline} /> : null}
        </Pressable>
        <Pressable onPress={() => setTab('comite')} style={styles.tabBtn}>
          <Text
            style={[styles.tabLabel, tab === 'comite' && styles.tabLabelActive]}
          >
            Comité de tasación
          </Text>
          {tab === 'comite' ? <View style={styles.tabUnderline} /> : null}
        </Pressable>
      </View>

      {tab === 'tasacion' ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Card Presentación */}
          <Card>
            <Text style={styles.cardTitle}>Presentación del inmueble</Text>

            <View style={{ height: spacing.md }} />
            <PhotoPlaceholder
              height={150}
              label={`foto principal · ${tipoLabel.toLowerCase()}`}
              fontSize={12}
              showArrows
            />

            <View style={{ height: spacing.md }} />
            <Badge variant={badge.variant}>{badge.label}</Badge>

            <View style={{ height: spacing.md }} />
            <View style={styles.grid}>
              <View style={styles.gridCol}>
                <DetailField
                  label={`Tasación ${tasacion.id}`}
                  value={tasacion.domicilio}
                />
              </View>
              <View style={styles.gridCol}>
                <DetailField label="Fecha alta" value={tasacion.fecha} />
              </View>
              <View style={styles.gridCol}>
                <DetailField label="Tipo de inmueble" value={tipoLabel} />
              </View>
              <View style={styles.gridCol}>
                <DetailField label="Referente" value={tasacion.tasador} />
              </View>
              <View style={styles.gridCol}>
                <DetailField label="Domicilio" value={ciudad} />
              </View>
              <View style={styles.gridCol}>
                <DetailField label="Motivo" value={motivoTitle} />
              </View>
            </View>

            {/* Valores */}
            <View style={styles.valoresRow}>
              <View style={styles.valorCol}>
                <Text style={styles.valorLabel}>VALOR EN AR$</Text>
                <Text style={styles.valorAmount}>
                  $ {formatMoney(tasacion.valorARS)}
                </Text>
              </View>
              <View style={styles.valorCol}>
                <Text style={styles.valorLabel}>VALOR EN USD</Text>
                <Text style={styles.valorAmount}>
                  US$ {formatMoney(tasacion.valorUSD)}
                </Text>
              </View>
            </View>

            {/* Progreso */}
            <View style={styles.progresoRow}>
              <Text style={styles.progresoLabel}>Progreso</Text>
              <Feather name="info" size={14} color={colors.muted} />
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            {/* Avatares + plazo */}
            <View style={styles.avatarsPlazoRow}>
              <View style={styles.avatarsRow}>
                <View style={[styles.avatar, { backgroundColor: '#FECACA' }]}>
                  <Text style={styles.avatarText}>JV</Text>
                </View>
                <View
                  style={[
                    styles.avatar,
                    styles.avatarOverlap,
                    { backgroundColor: '#FCD34D' },
                  ]}
                >
                  <Text style={styles.avatarText}>MB</Text>
                </View>
                <View
                  style={[
                    styles.avatar,
                    styles.avatarOverlap,
                    { backgroundColor: '#60A5FA' },
                  ]}
                >
                  <Text style={[styles.avatarText, { color: colors.white }]}>
                    S
                  </Text>
                </View>
              </View>
              <Badge variant="info">📅 3 días</Badge>
            </View>
          </Card>

          {/* Section title */}
          <Text style={styles.sectionTitle}>Más información</Text>

          <Card padding={6}>
            <MoreInfoRow label="Ubicación" />
            <MoreInfoRow label="Solicitante" />
            <MoreInfoRow label="Fotos" />
            <MoreInfoRow label="Detalles" />
            <MoreInfoRow label="Descripción del inmueble" isLast />
          </Card>

          <View style={{ height: 18 }} />
          <Button
            variant="primary"
            size="full"
            icon={<Feather name="edit-2" size={16} color={colors.white} />}
            onPress={() =>
              router.push(`/(tasador)/nueva?edit=${tasacion.id}` as any)
            }
          >
            Editar
          </Button>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Narrativa */}
          <Card>
            <Text style={styles.comiteTitle}>
              Tasación para {motivoLow} en {calle}.
            </Text>
            <Text style={styles.comiteSubtitle}>
              Referente: {tasacion.tasador}
            </Text>

            <View style={styles.miniBtnsRow}>
              <Button variant="dark" size="sm">
                Fotos
              </Button>
              <View style={styles.ghostMiniBtn}>
                <Text style={styles.ghostMiniBtnText}>Mapa</Text>
              </View>
            </View>

            <PhotoPlaceholder height={140} label="foto principal" />

            <View style={{ height: spacing.sm }} />
            <View style={styles.thumbGrid}>
              <View style={styles.thumbItem}>
                <PhotoPlaceholder height={64} label="habitación" fontSize={9} />
              </View>
              <View style={styles.thumbItem}>
                <PhotoPlaceholder height={64} label="baño" fontSize={9} />
              </View>
              <View style={styles.thumbItem}>
                <PhotoPlaceholder height={64} label="cocina" fontSize={9} />
              </View>
            </View>
          </Card>

          {/* Datos de tasación */}
          <View style={{ height: spacing.md }} />
          <Card padding={6}>
            <View style={styles.datosHeader}>
              <Text style={styles.cardTitle}>Datos de tasación</Text>
              <Button
                variant="primary"
                size="sm"
                icon={<Feather name="edit-2" size={12} color={colors.white} />}
                onPress={() => setEditSuccess(true)}
              >
                Editar
              </Button>
            </View>
            <MoreInfoRow label="Descripción" />
            <MoreInfoRow label="Características" />
            <MoreInfoRow label="Superficies" />
            <MoreInfoRow label="Servicios" />
            <MoreInfoRow label="Valorar tasación" isLast />
          </Card>

          {/* Robotomus */}
          <View style={{ height: spacing.md }} />
          <Card style={styles.robotomusCard}>
            <View style={styles.robotomusHeader}>
              <View style={styles.robotomusIconWrap}>
                <Text style={styles.robotomusIcon}>🤖</Text>
              </View>
              <View>
                <Text style={styles.robotomusTitle}>Robotomus</Text>
                <Text style={styles.robotomusBadge}>en desarrollo</Text>
              </View>
            </View>

            <View style={styles.dashedCard}>
              <Text style={styles.dashedLabel}>Valor en AR$</Text>
              <Text style={styles.dashedValue}>$0.000,00</Text>
            </View>
            <View style={{ height: spacing.sm }} />
            <View style={styles.dashedCard}>
              <Text style={styles.dashedLabel}>Valor en USD</Text>
              <Text style={styles.dashedValue}>$0.000,00</Text>
            </View>
          </Card>

          {/* Inmuebles similares */}
          <View style={styles.similarHeader}>
            <Text style={styles.cardTitle}>Inmuebles similares</Text>
            <Text style={styles.similarSubtitle}>
              0 inmuebles · pendiente análisis Robotomus
            </Text>
          </View>

          <View style={{ height: 18 }} />
          <Button
            variant="primary"
            size="full"
            onPress={() =>
              router.push(`/cerrar-valor?id=${tasacion.id}` as any)
            }
          >
            Cerrar valor de tasación
          </Button>
        </ScrollView>
      )}

      <ModalSuccess
        visible={editSuccess}
        onClose={() => setEditSuccess(false)}
        title="Tasación editada exitosamente"
        subtitle={`Los datos de la tasación #${tasacion.id} fueron actualizados.`}
        illustration="check"
        primaryLabel="Ver tasación"
        onPrimary={() => setEditSuccess(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // AppBar
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.bg,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
  },
  appBarSpacer: {
    width: 36,
  },

  // Tabs
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingTop: 14,
    gap: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
    backgroundColor: colors.bg,
  },
  tabBtn: {
    paddingBottom: spacing.sm,
    position: 'relative',
  },
  tabLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.muted2,
    fontFamily: typography.family,
  },
  tabLabelActive: {
    color: colors.coral,
    fontWeight: typography.weights.bold,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.coral,
    borderRadius: 2,
  },

  // ScrollView
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // Card titles
  cardTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
  },

  // Photo placeholder
  photoPlaceholder: {
    backgroundColor: '#E9EBF0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  photoLabel: {
    color: colors.muted2,
    fontFamily: 'Courier',
  },
  photoArrow: {
    position: 'absolute',
    top: '50%',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -13,
  },
  photoArrowLeft: { left: 8 },
  photoArrowRight: { right: 8 },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  gridCol: {
    flexBasis: '47%',
    flexGrow: 1,
  },
  detailField: {
    flexDirection: 'column',
  },
  detailLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: typography.sizes.base,
    color: colors.muted2,
    lineHeight: 18,
    fontFamily: typography.family,
  },

  // Valores
  valoresRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderSoft,
    paddingVertical: 12,
    gap: 12,
  },
  valorCol: {
    flex: 1,
  },
  valorLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: typography.weights.semibold,
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: typography.family,
  },
  valorAmount: {
    fontSize: 17,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
  },

  // Progreso
  progresoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  progresoLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.text2,
    fontFamily: typography.family,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.mintSoft,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.mint,
    borderRadius: 999,
  },

  // Avatares
  avatarsPlazoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  avatarsRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  avatarText: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
  },

  // Section
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
    padding: 4,
    marginTop: 14,
    marginBottom: 8,
  },

  // More info rows
  moreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  moreRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  moreRowLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    fontFamily: typography.family,
  },

  // Comité tab
  comiteTitle: {
    fontSize: 15,
    fontWeight: typography.weights.bold,
    color: colors.text,
    lineHeight: 20,
    fontFamily: typography.family,
  },
  comiteSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.muted2,
    marginTop: 4,
    fontFamily: typography.family,
  },
  miniBtnsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  ghostMiniBtn: {
    backgroundColor: '#F1F2F6',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostMiniBtnText: {
    fontSize: 13,
    color: colors.muted2,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.family,
  },
  thumbGrid: {
    flexDirection: 'row',
    gap: 6,
  },
  thumbItem: {
    flex: 1,
  },

  // Datos header
  datosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },

  // Robotomus
  robotomusCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  robotomusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  robotomusIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.mint2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotomusIcon: {
    fontSize: 28,
  },
  robotomusTitle: {
    fontSize: 15,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
  },
  robotomusBadge: {
    fontSize: 11,
    color: colors.mint,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.family,
  },
  dashedCard: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#6EE7B7',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dashedLabel: {
    fontSize: 12,
    color: colors.mint,
    fontWeight: typography.weights.semibold,
    marginBottom: 4,
    fontFamily: typography.family,
  },
  dashedValue: {
    fontSize: 22,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    fontFamily: typography.family,
  },

  // Similar header
  similarHeader: {
    padding: 4,
    marginTop: 18,
  },
  similarSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
    fontFamily: typography.family,
  },

  // Not found
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: 6,
    fontFamily: typography.family,
  },
  notFoundId: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: typography.family,
  },
});
