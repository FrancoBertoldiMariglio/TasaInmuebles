import React from 'react';
import {
  Alert,
  Platform,
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

import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { colors, radius, spacing, typography } from '../../constants/tokens';
import { TipoInmueble } from '../../types/tasacion';

const TIPO_LABELS: Record<TipoInmueble, string> = {
  casa: 'Casa',
  depto: 'Departamento',
  terreno: 'Terreno',
  galpon: 'Galpón',
  local: 'Local',
  oficina: 'Oficina',
};

function pricePerM2(tipo: TipoInmueble): number {
  switch (tipo) {
    case 'depto':
      return 1500;
    case 'casa':
      return 1200;
    case 'oficina':
      return 1300;
    case 'local':
      return 1100;
    case 'galpon':
      return 700;
    case 'terreno':
    default:
      return 600;
  }
}

function formatARS(v: number): string {
  if (v >= 1_000_000) {
    return `$ ${(v / 1_000_000).toFixed(1)}M`;
  }
  if (v >= 1_000) {
    return `$ ${(v / 1_000).toFixed(1)}K`;
  }
  return `$ ${v.toLocaleString('es-AR')}`;
}

function formatUSD(v: number): string {
  if (v >= 1_000_000) {
    return `US$ ${(v / 1_000_000).toFixed(2)}M`;
  }
  if (v >= 1_000) {
    return `US$ ${(v / 1_000).toFixed(1)}K`;
  }
  return `US$ ${v.toLocaleString('en-US')}`;
}

export default function B2CResultadoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    domicilio?: string;
    sup?: string;
    tipo?: string;
  }>();

  const domicilio = params.domicilio ?? 'Domicilio no especificado';
  const sup = params.sup ?? '';
  const tipo = (params.tipo as TipoInmueble) ?? 'depto';

  const supNum = sup ? parseInt(sup, 10) || 0 : 0;
  const baseValueUSD = supNum > 0 ? supNum * pricePerM2(tipo) : 100000;
  const valueUSD = baseValueUSD;
  const valueARS = baseValueUSD * 830;

  const valueARSFormatted = formatARS(valueARS);
  const valueUSDFormatted = formatUSD(valueUSD);
  const valueARSFull = valueARS.toLocaleString('es-AR');
  const valueUSDFull = valueUSD.toLocaleString('en-US');

  const buildHtml = () => `
    <html><body style="font-family:sans-serif;padding:40px;color:#1F2937">
      <div style="background:#FEF3C7;padding:12px;border-radius:8px;color:#92400E;margin-bottom:24px;font-size:12px">
        TASACION REFERENCIAL — NO CERTIFICADA PROFESIONALMENTE
      </div>
      <h1 style="color:#F87171">Tasainmuebles</h1>
      <h2>Tasación referencial</h2>
      <p><b>Domicilio:</b> ${domicilio}</p>
      <p><b>Tipo:</b> ${TIPO_LABELS[tipo]}</p>
      <p><b>Superficie total:</b> ${sup || '-'} m²</p>
      <hr/>
      <h3>Valor estimado</h3>
      <p style="font-size:24px"><b>AR$ ${valueARSFull}</b></p>
      <p style="font-size:24px"><b>US$ ${valueUSDFull}</b></p>
      <p style="color:#666;font-size:11px;margin-top:40px">
        Esta tasación es referencial y no constituye un informe profesional.
        Para una tasación oficial firmada por un tasador colegiado, ingresá a tasainmuebles.com.
      </p>
    </body></html>
  `;

  const handleDescargarPDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html: buildHtml() });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          dialogTitle: 'Compartir tasación referencial',
          mimeType: 'application/pdf',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('PDF generado', 'Ubicación: ' + uri);
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudo generar el PDF.');
    }
  };

  const handleEmail = () => {
    Alert.alert(
      'Próximamente',
      'Enviaremos el PDF a tu email cuando habilitemos esa funcionalidad.',
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.appBar}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Volver"
          accessibilityRole="button"
        >
          <Feather name="arrow-left" size={18} color={colors.text} />
        </Pressable>
        <Text style={styles.appBarTitle}>Tasación referencial</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Card dark con valor */}
        <Card variant="dark" padding={22} style={styles.valueCard}>
          <Text style={styles.valueLabel}>VALOR REFERENCIAL</Text>
          <Text style={styles.valueAddress}>{domicilio}</Text>

          <View style={styles.valueGrid}>
            <View style={styles.valueCell}>
              <Text style={styles.valueCellLabel}>AR$</Text>
              <Text style={styles.valueCellAmount}>{valueARSFormatted}</Text>
              <Text style={styles.valueCellRange}>± 12%</Text>
            </View>
            <View style={styles.valueCell}>
              <Text style={styles.valueCellLabel}>USD</Text>
              <Text style={styles.valueCellAmount}>{valueUSDFormatted}</Text>
              <Text style={styles.valueCellRange}>± 12%</Text>
            </View>
          </View>
        </Card>

        {/* Card Robotomus */}
        <View style={styles.robotomusCard}>
          <View style={styles.robotomusHeader}>
            <View style={styles.robotomusIcon}>
              <Text style={styles.robotomusEmoji}>🤖</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.robotomusTitle}>Análisis Robotomus</Text>
              <Text style={styles.robotomusSubtitle}>
                en desarrollo · resultado de muestra
              </Text>
            </View>
          </View>
          <Text style={styles.robotomusBody}>
            En la zona se relevaron{' '}
            <Text style={styles.bold}>14 inmuebles comparables</Text> (2 dorm.,
            70–90 m²). El valor promedio observado es{' '}
            <Text style={styles.bold}>US$ 1.450 / m²</Text>. Tu propiedad cae
            dentro del rango P40–P60 de la muestra.
          </Text>
        </View>

        {/* Banner advertencia */}
        <View style={styles.warningBanner}>
          <Feather name="info" size={14} color="#92400E" />
          <Text style={styles.warningText}>
            <Text style={styles.bold}>No certificada profesionalmente.</Text>{' '}
            Para una tasación oficial firmada, contactá con un tasador
            colegiado.
          </Text>
        </View>

        <View style={{ marginTop: spacing.md, marginBottom: 8 }}>
          <Button variant="primary" size="full" onPress={handleDescargarPDF}>
            📥 Descargar PDF
          </Button>
        </View>

        <Button variant="outline" size="full" onPress={handleEmail}>
          📧 Enviar a mi email
        </Button>
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
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  valueCard: {
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: typography.family,
    marginBottom: 4,
    fontWeight: '600',
  },
  valueAddress: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: typography.family,
    textAlign: 'center',
  },
  valueGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    alignSelf: 'stretch',
  },
  valueCell: {
    flex: 1,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
  },
  valueCellLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: typography.family,
    fontWeight: '500',
  },
  valueCellAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    fontFamily: typography.family,
    marginTop: 2,
  },
  valueCellRange: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: typography.family,
    marginTop: 4,
  },
  robotomusCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: 12,
  },
  robotomusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  robotomusIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.mint2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotomusEmoji: {
    fontSize: 28,
  },
  robotomusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    fontFamily: typography.family,
  },
  robotomusSubtitle: {
    fontSize: 11,
    color: colors.mint,
    fontWeight: '600',
    fontFamily: typography.family,
    marginTop: 2,
  },
  robotomusBody: {
    fontSize: 13,
    color: colors.text2,
    fontFamily: typography.family,
    lineHeight: 20,
    marginTop: 10,
  },
  bold: {
    fontWeight: '700',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.mustardSoft,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  warningText: {
    flex: 1,
    color: '#92400E',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: typography.family,
  },
});
