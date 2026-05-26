import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BrandBar from '../../components/brand/BrandBar';
import Button from '../../components/ui/Button';
import { colors, radius, spacing, typography } from '../../constants/tokens';

export default function B2CHomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <BrandBar userName="C" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Mis tasaciones</Text>

        <View style={styles.emptyWrap}>
          <View style={styles.illustration}>
            <Feather name="file-plus" size={64} color={colors.coral} />
          </View>

          <Text style={styles.emptyTitle}>
            Todavía no tasaste{'\n'}ninguna propiedad
          </Text>

          <Text style={styles.emptyBody}>
            Tocá el + para tasar tu primera propiedad y obtené un PDF
            referencial gratuito.
          </Text>

          <View style={styles.btnWrap}>
            <Button
              variant="primary"
              onPress={() => router.push('/(b2c)/nueva')}
            >
              + Nueva tasación
            </Button>
          </View>

          <View style={styles.banner}>
            <Feather name="info" size={14} color="#92400E" />
            <Text style={styles.bannerText}>
              Las tasaciones referenciales no están certificadas
              profesionalmente. Para certificación, consultá con un tasador
              colegiado.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 110,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    fontFamily: typography.family,
    letterSpacing: -0.3,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    gap: 14,
  },
  illustration: {
    width: 200,
    height: 140,
    borderRadius: radius.lg,
    backgroundColor: colors.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    fontFamily: typography.family,
    marginTop: -10,
    lineHeight: 24,
  },
  emptyBody: {
    fontSize: 14,
    color: colors.muted2,
    textAlign: 'center',
    fontFamily: typography.family,
    lineHeight: 21,
  },
  btnWrap: {
    marginTop: spacing.sm,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.mustardSoft,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: spacing.md,
  },
  bannerText: {
    flex: 1,
    color: '#92400E',
    fontSize: 11,
    lineHeight: 16,
    fontFamily: typography.family,
  },
});
