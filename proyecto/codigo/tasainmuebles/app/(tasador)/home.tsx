import React, { useState, useMemo } from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography, shadows } from '@/constants/tokens';
import { EstadoTasacion } from '@/types/tasacion';
import { useTasaciones } from '@/hooks/useTasaciones';
import { TasacionConSolicitante } from '@/lib/queries/tasaciones';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { useGlassSupport } from '@/hooks/useGlassSupport';

// ─── Types ─────────────────────────────────────────────────────────────────

type TabId = 'todas' | 'pendientes' | 'sin_asignar' | 'en_proceso';

interface KpiCardProps {
  label: string;
  value: string | number;
  color: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'pendientes', label: 'Pendientes' },
  { id: 'sin_asignar', label: 'Sin asignar' },
  { id: 'en_proceso', label: 'En proceso' },
];

const ESTADO_BADGE: Record<EstadoTasacion, { bg: string; text: string; label: string }> = {
  borrador:    { bg: colors.coralSoft,   text: colors.coral,   label: 'Sin asignar' },
  a_editar:   { bg: colors.mustardSoft,  text: colors.mustard, label: 'A editar'    },
  a_tasar:    { bg: colors.mustardSoft,  text: colors.mustard, label: 'A tasar'     },
  en_comite:  { bg: colors.infoSoft,     text: colors.info,    label: 'En proceso'  },
  tasada:     { bg: colors.mintSoft,     text: colors.mint,    label: 'Tasada'      },
  compartida: { bg: colors.mintSoft,     text: colors.mint,    label: 'Compartida'  },
};

function matchesTab(t: TasacionConSolicitante, tab: TabId): boolean {
  if (tab === 'todas') return true;
  if (tab === 'pendientes') return t.estado === 'a_tasar' || t.estado === 'a_editar';
  if (tab === 'sin_asignar') return t.estado === 'borrador';
  if (tab === 'en_proceso') return t.estado === 'en_comite';
  return true;
}

function matchesQuery(t: TasacionConSolicitante, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  const nombre = t.solicitante?.nombre?.toLowerCase() ?? '';
  const apellido = t.solicitante?.apellido?.toLowerCase() ?? '';
  const domicilio = (t.domicilio ?? '').toLowerCase();
  const numero = String(t.numero ?? '');
  return (
    numero.includes(q) ||
    nombre.includes(q) ||
    apellido.includes(q) ||
    domicilio.includes(q)
  );
}

function formatNumero(n: number | null | undefined): string {
  return String(n ?? 0).padStart(4, '0');
}

function formatFecha(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// ─── KPI Card ──────────────────────────────────────────────────────────────

function KpiCard({ label, value, color, icon, onPress }: KpiCardProps) {
  const glassOn = useGlassSupport();

  const inner = (
    <>
      {/* Dashed circle with icon */}
      <View style={[styles.kpiCircle]}>
        <Feather name={icon} size={18} color={colors.white} />
      </View>

      {/* Label */}
      <Text style={[styles.kpiLabel, { color }]}>{label}</Text>

      {/* Value */}
      <Text style={styles.kpiValue}>
        {typeof value === 'number' ? String(value).padStart(2, '0') : value}
      </Text>

      {/* CTA */}
      <Text style={styles.kpiCta}>Ver tasaciones →</Text>
    </>
  );

  if (glassOn) {
    return (
      <LiquidGlassView
        effect="regular"
        tintColor="rgba(42,49,64,0.65)"
        interactive
        style={[styles.kpiCard, styles.kpiCardGlass]}
      >
        <TouchableOpacity
          style={styles.kpiTouchable}
          onPress={onPress}
          activeOpacity={0.82}
        >
          {inner}
        </TouchableOpacity>
      </LiquidGlassView>
    );
  }

  return (
    <TouchableOpacity style={styles.kpiCard} onPress={onPress} activeOpacity={0.82}>
      {inner}
    </TouchableOpacity>
  );
}

// ─── Brand Bar ─────────────────────────────────────────────────────────────

function BrandBar() {
  const insets = useSafeAreaInsets();
  const { profile, signOut } = useAuth();
  const initial = (profile?.nombre?.charAt(0) ?? profile?.email?.charAt(0) ?? 'T').toUpperCase();

  function abrirMenuCuenta() {
    Alert.alert(
      profile?.email ?? 'Mi cuenta',
      '¿Qué querés hacer?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            void signOut();
          },
        },
      ],
      { cancelable: true },
    );
  }

  return (
    <View style={[styles.brandBar, { paddingTop: insets.top + 8 }]}>
      {/* Logo */}
      <View style={styles.brandLogo}>
        <View style={styles.brandLogoIcon}>
          <Feather name="home" size={14} color={colors.white} />
        </View>
        <Text style={styles.brandLogoText}>Tasainmuebles</Text>
      </View>

      {/* Actions */}
      <View style={styles.brandActions}>
        <TouchableOpacity style={styles.brandIconBtn} activeOpacity={0.7}>
          <Feather name="bell" size={18} color={colors.white} />
          <View style={styles.brandBadge} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandIconBtn}
          activeOpacity={0.7}
          onPress={abrirMenuCuenta}
          accessibilityLabel="Más opciones"
        >
          <Feather name="more-vertical" size={18} color={colors.white} />
        </TouchableOpacity>

        {/* Avatar — tap o long-press para abrir menú de cuenta */}
        <TouchableOpacity
          style={styles.brandAvatar}
          activeOpacity={0.8}
          onPress={abrirMenuCuenta}
          onLongPress={abrirMenuCuenta}
          accessibilityLabel="Mi cuenta"
        >
          <Text style={styles.brandAvatarText}>{initial}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Home Screen ───────────────────────────────────────────────────────────

export default function TasadorHome() {
  const router  = useRouter();
  const [tab, setTab]       = useState<TabId>('todas');
  const [query, setQuery]   = useState('');
  const { tasaciones, loading, error, refetch } = useTasaciones();

  // KPI counts
  const countAEditar  = tasaciones.filter((t) => t.estado === 'a_editar').length;
  const countATasar   = tasaciones.filter((t) => t.estado === 'a_tasar').length;
  const countAPublicar= tasaciones.filter((t) => t.estado === 'tasada').length;

  const filtered = useMemo(
    () => tasaciones.filter((t) => matchesTab(t, tab) && matchesQuery(t, query)),
    [tasaciones, tab, query],
  );

  function handleKpiPress(filterTab: TabId) {
    setTab(filterTab);
    setQuery('');
  }

  function handleRowPress(tasacion: TasacionConSolicitante) {
    router.push(`/detalle/${tasacion.id}` as any);
  }

  if (error) {
    console.error('[home] Error cargando tasaciones:', error);
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      <BrandBar />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        {error ? (
          <View style={styles.errorBanner}>
            <Feather name="alert-circle" size={16} color={colors.white} />
            <Text style={styles.errorBannerText}>
              Error al cargar tasaciones. Tirá para recargar.
            </Text>
          </View>
        ) : null}

        {/* Section title */}
        <Text style={styles.sectionTitle}>Tasaciones</Text>

        {/* KPI Cards — horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.kpiRow}
          style={styles.kpiScroll}
        >
          <KpiCard
            label="A editar"
            value={countAEditar}
            color={colors.mustard}
            icon="edit-2"
            onPress={() => handleKpiPress('pendientes')}
          />
          <KpiCard
            label="A tasar"
            value={countATasar}
            color={colors.mint2}
            icon="file-text"
            onPress={() => handleKpiPress('pendientes')}
          />
          <KpiCard
            label="A publicar"
            value={countAPublicar}
            color={colors.info}
            icon="share-2"
            onPress={() => handleKpiPress('todas')}
          />
        </ScrollView>

        {/* Listado card */}
        <View style={[styles.listCard, shadows.card]}>
          <Text style={styles.listCardTitle}>Listado de tasaciones</Text>

          {/* Search pill */}
          <View style={styles.searchPill}>
            <Feather name="search" size={15} color={colors.muted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por ID, usuario o domicilio…"
              placeholderTextColor={colors.muted}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            <TouchableOpacity style={styles.searchSlidersBtn} activeOpacity={0.7}>
              <Feather name="sliders" size={15} color={colors.muted2} />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsRow}
            style={styles.tabsScroll}
          >
            {TABS.map((t) => {
              const isActive = t.id === tab;
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.tabChip, isActive && styles.tabChipActive]}
                  onPress={() => setTab(t.id)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colId]}>ID</Text>
            <Text style={[styles.tableHeaderCell, styles.colFecha]}>FECHA</Text>
            <Text style={[styles.tableHeaderCell, styles.colUsuario]}>USUARIO</Text>
            <Text style={[styles.tableHeaderCell, styles.colEstado]}>ESTADO</Text>
          </View>

          {/* Table rows */}
          {loading && tasaciones.length === 0 ? (
            <View>
              {[0, 1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.skeletonRow} />
              ))}
            </View>
          ) : tasaciones.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name="inbox" size={32} color={colors.muted} />
              <Text style={styles.emptyText}>
                Todavía no tenés tasaciones · tocá el + para crear la primera
              </Text>
            </View>
          ) : filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name="inbox" size={32} color={colors.muted} />
              <Text style={styles.emptyText}>Sin resultados</Text>
            </View>
          ) : (
            filtered.map((t, idx) => {
              const badge   = ESTADO_BADGE[t.estado as EstadoTasacion] ?? ESTADO_BADGE.borrador;
              const isLast  = idx === filtered.length - 1;
              const isEven  = idx % 2 === 0;
              const nombre = t.solicitante?.nombre ?? '';
              const apellido = t.solicitante?.apellido ?? '';
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[
                    styles.tableRow,
                    isEven && styles.tableRowEven,
                    !isLast && styles.tableRowBorder,
                  ]}
                  onPress={() => handleRowPress(t)}
                  activeOpacity={0.72}
                >
                  <Text style={[styles.tableCell, styles.colId, styles.cellId]}>
                    #{formatNumero(t.numero)}
                  </Text>
                  <Text style={[styles.tableCell, styles.colFecha]}>
                    {formatFecha(t.created_at)}
                  </Text>
                  <Text style={[styles.tableCell, styles.colUsuario]} numberOfLines={1}>
                    {nombre} {apellido}
                  </Text>
                  <View style={styles.colEstado}>
                    <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.badgeText, { color: badge.text }]}>
                        {badge.label}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}

          {/* Pagination */}
          <View style={styles.pagination}>
            {['1', '·', '2', '·', '3', '·', '4', '·', '5', '·', '..', '·', '17'].map(
              (p, i) => {
                const isNum     = !isNaN(Number(p));
                const isCurrent = p === '2';
                if (p === '·') {
                  return (
                    <Text key={i} style={styles.pageEllipsis}>
                      ·
                    </Text>
                  );
                }
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.pageBtn, isCurrent && styles.pageBtnActive]}
                    activeOpacity={isNum ? 0.7 : 1}
                  >
                    <Text
                      style={[styles.pageBtnText, isCurrent && styles.pageBtnTextActive]}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </View>

        {/* Spacer for the expo-router Tabs bar at the bottom */}
        <View style={{ height: spacing.lg }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Layout
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 110,
  },

  // BrandBar
  brandBar: {
    backgroundColor: colors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  brandLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandLogoIcon: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogoText: {
    color: colors.white,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    letterSpacing: -0.3,
  },
  brandActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  brandIconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  brandBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: colors.coral,
    borderWidth: 1.5,
    borderColor: colors.navy,
  },
  brandAvatar: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  brandAvatarText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },

  // Section title
  sectionTitle: {
    fontSize: 22,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },

  // KPI Cards
  kpiScroll: {
    marginHorizontal: -spacing.lg,
  },
  kpiRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xs,
  },
  kpiCardGlass: {
    backgroundColor: 'transparent',
  },
  kpiTouchable: {
    flex: 1,
  },
  kpiCard: {
    width: 148,
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing.lg,
    // Subtle pattern via secondary layer
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.navy,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: { elevation: 6 },
    }),
  },
  kpiCircle: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  kpiLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    letterSpacing: 0.2,
    marginBottom: spacing.xs,
  },
  kpiValue: {
    fontSize: 30,
    fontWeight: typography.weights.extrabold,
    color: colors.white,
    lineHeight: 36,
  },
  kpiCta: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255,255,255,0.65)',
    marginTop: spacing.sm,
    fontWeight: typography.weights.medium,
  },

  // List card
  listCard: {
    backgroundColor: colors.card,
    borderRadius: radius['2xl'],
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  listCardTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },

  // Search pill
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.sm + 2 : spacing.xs + 2,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.sizes.base,
    color: colors.text,
    padding: 0,
  },
  searchSlidersBtn: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },

  // Tabs
  tabsScroll: {
    marginHorizontal: -spacing.lg,
    marginBottom: spacing.md,
  },
  tabsRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  tabChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    backgroundColor: '#F1F2F6',
  },
  tabChipActive: {
    backgroundColor: colors.coral,
  },
  tabLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.muted2,
  },
  tabLabelActive: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
  },

  // Table
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.xs,
  },
  tableHeaderCell: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
  },
  tableRowEven: {
    backgroundColor: colors.bg2,
  },
  tableRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSoft,
  },
  tableCell: {
    fontSize: typography.sizes.sm,
    color: colors.text2,
  },
  cellId: {
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },

  // Column widths
  colId:      { width: 58 },
  colFecha:   { width: 72 },
  colUsuario: { flex: 1, paddingRight: spacing.xs },
  colEstado:  { width: 82, alignItems: 'flex-end' },

  // Badge
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },

  // Skeleton
  skeletonRow: {
    height: 40,
    marginVertical: 4,
    borderRadius: radius.sm,
    backgroundColor: colors.bg2,
  },

  // Error banner
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.coral,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
  },
  errorBannerText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    flex: 1,
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sizes.base,
    color: colors.muted,
    fontWeight: typography.weights.medium,
  },

  // Pagination
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs - 1,
    marginTop: spacing.lg,
    flexWrap: 'wrap',
  },
  pageBtn: {
    minWidth: 28,
    height: 28,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.xs,
  },
  pageBtnActive: {
    backgroundColor: colors.coral,
  },
  pageBtnText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.muted2,
  },
  pageBtnTextActive: {
    color: colors.white,
    fontWeight: typography.weights.bold,
  },
  pageEllipsis: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    paddingHorizontal: 2,
  },

});
