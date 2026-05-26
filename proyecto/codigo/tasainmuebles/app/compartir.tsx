import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Isotipo from '../components/brand/Isotipo';
import { colors, radius, spacing, typography } from '../constants/tokens';
import { SAMPLE_TASACIONES, type MotivoTasacion, type TipoInmueble } from '../types/tasacion';

const TIPO_LABELS: Record<TipoInmueble, string> = {
  casa: 'Casa',
  depto: 'Depto',
  terreno: 'Terreno',
  galpon: 'Galpón',
  local: 'Local',
  oficina: 'Oficina',
};

const MOTIVO_LABELS: Record<MotivoTasacion, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  sucesion: 'Sucesión',
  divorcio: 'Divorcio',
  judicial: 'Judicial',
  garantia: 'Garantía',
  contable: 'Contable',
  seguro: 'Seguro',
  donacion: 'Donación',
  otro: 'Otro',
};

export default function CompartirScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id ?? '1578';

  const tasacion =
    SAMPLE_TASACIONES.find((t) => t.id === id) ?? SAMPLE_TASACIONES[0];

  const valorARS = tasacion.valorARS || 142500000;
  const valorUSD = tasacion.valorUSD || 175000;
  const hasEmail = !!tasacion.solicitante.email;

  const buildHtml = () => `
    <html><body style="font-family:sans-serif;padding:24px;color:#1F2937">
      <h1 style="color:#EF4444">Informe de Tasación #${tasacion.id}</h1>
      <p><b>Domicilio:</b> ${tasacion.domicilio}</p>
      <p><b>Tipo:</b> ${TIPO_LABELS[tasacion.tipo]}</p>
      <p><b>Motivo:</b> ${MOTIVO_LABELS[tasacion.motivo]}</p>
      <p><b>Valor AR$:</b> $ ${valorARS.toLocaleString('es-AR')}</p>
      <p><b>Valor USD:</b> US$ ${valorUSD.toLocaleString('en-US')}</p>
      <p style="margin-top:40px;font-size:11px;color:#666">Firmado digitalmente · Tasainmuebles</p>
    </body></html>
  `;

  const generateAndShare = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html: buildHtml() });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          dialogTitle: 'Compartir tasación',
          mimeType: 'application/pdf',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('Compartir', 'PDF generado en: ' + uri);
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudo generar el PDF.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.appBar}>
        <Pressable
          onPress={() => router.dismiss()}
          style={styles.backBtn}
          accessibilityLabel="Volver"
        >
          <Feather name="arrow-left" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.appBarTitle}>Compartir tasación</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <Text style={styles.cardTitle}>Tasación #{tasacion.id}</Text>
          <Text style={styles.cardSubtitle}>
            {tasacion.domicilio} · {TIPO_LABELS[tasacion.tipo]} ·{' '}
            {MOTIVO_LABELS[tasacion.motivo]}
          </Text>

          <View style={styles.pdfPreviewOuter}>
            <View style={styles.pdfPreviewInner}>
              <View style={styles.pdfBrandRow}>
                <Isotipo size={20} />
                <Text style={styles.pdfBrandText}>
                  <Text style={{ color: colors.coral }}>Tasa</Text>inmuebles
                </Text>
              </View>
              <View style={styles.pdfSeparator} />
              <Text style={styles.pdfMeta}>
                INFORME DE TASACIÓN — N° {tasacion.id}
              </Text>
              <Text style={styles.pdfAddress}>{tasacion.domicilio}</Text>
              <View style={styles.pdfBar} />
              <Text style={styles.pdfDesc}>
                Casa estilo californiano sobre lote propio, con jardín delantero
                y galería techada. Excelente luminosidad.
              </Text>
              <View style={styles.pdfBarsRow}>
                <View style={styles.pdfBarThin} />
                <View style={styles.pdfBarThin} />
              </View>
              <Text style={styles.pdfFooter}>
                Firmado digitalmente · 14/05/2026
              </Text>
            </View>
          </View>

          {!hasEmail && (
            <View style={styles.banner}>
              <Feather name="info" size={16} color="#92400E" />
              <Text style={styles.bannerText}>
                El solicitante no tiene email cargado. Tocá el botón para enviar
                por WhatsApp.
              </Text>
            </View>
          )}

          <View style={{ marginBottom: 8 }}>
            <Button variant="primary" size="full" onPress={generateAndShare}>
              📥 Descargar PDF
            </Button>
          </View>

          {hasEmail ? (
            <Button variant="outline" size="full" onPress={generateAndShare}>
              📧 Enviar por email
            </Button>
          ) : (
            <Button variant="primary" size="full" disabled>
              📧 Enviar por email
            </Button>
          )}
        </Card>

        <View style={{ height: 12 }} />

        <Card>
          <Text style={styles.sectionTitle}>Compartir por WhatsApp</Text>

          <View style={styles.fileRow}>
            <View style={styles.fileIcon}>
              <Text style={styles.fileIconText}>PDF</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fileName}>
                Tasación {tasacion.id} · {MOTIVO_LABELS[tasacion.motivo]}{' '}
                {TIPO_LABELS[tasacion.tipo]}.pdf
              </Text>
              <Text style={styles.fileSize}>2.8 MB</Text>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Button variant="primary" size="full" onPress={generateAndShare}>
              🔗 Compartir
            </Button>
          </View>
        </Card>
      </ScrollView>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.bg,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    fontSize: 16,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
  },
  scroll: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.family,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.muted2,
    marginBottom: 14,
    fontFamily: typography.family,
  },
  pdfPreviewOuter: {
    backgroundColor: colors.bg2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  pdfPreviewInner: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
  },
  pdfBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  pdfBrandText: {
    fontSize: 12,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    fontFamily: typography.family,
  },
  pdfSeparator: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 8,
  },
  pdfMeta: {
    fontSize: 9,
    color: colors.muted,
    marginBottom: 4,
    fontFamily: typography.family,
  },
  pdfAddress: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: 6,
    fontFamily: typography.family,
  },
  pdfBar: {
    height: 40,
    backgroundColor: '#EEF0F4',
    marginBottom: 6,
    borderRadius: 2,
  },
  pdfDesc: {
    fontSize: 9,
    color: colors.muted,
    lineHeight: 13,
    marginBottom: 6,
    fontFamily: typography.family,
  },
  pdfBarsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  pdfBarThin: {
    flex: 1,
    height: 6,
    backgroundColor: '#EEF0F4',
    borderRadius: 2,
  },
  pdfFooter: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 4,
    fontFamily: typography.family,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.mustardSoft,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  bannerText: {
    flex: 1,
    color: '#92400E',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: typography.family,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: 8,
    fontFamily: typography.family,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 12,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIconText: {
    fontSize: 11,
    fontWeight: typography.weights.extrabold,
    color: colors.coralDeep,
    fontFamily: typography.family,
  },
  fileName: {
    fontSize: 13,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    fontFamily: typography.family,
  },
  fileSize: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
    fontFamily: typography.family,
  },
});
