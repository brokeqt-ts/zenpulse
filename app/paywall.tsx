import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { PlanToggle, Plan } from '../components/PlanToggle';
import { useSubscription } from '../hooks/useSubscription';

const { width, height } = Dimensions.get('window');
// Ограничиваем ширину и высоту контейнера — на больших экранах выглядит как мобильный
const CONTENT_MAX_WIDTH = 430;
const CONTENT_MAX_HEIGHT = 900;

const BENEFITS = [
  { icon: '🧘', text: 'Безлимитные медитации и сон-истории' },
  { icon: '🤖', text: 'AI-настрой дня по твоему настроению' },
  { icon: '🎵', text: 'Эксклюзивные звуковые ландшафты' },
  { icon: '📊', text: 'Статистика прогресса и стрика' },
  { icon: '🌙', text: 'Персональный план на 30 дней' },
];

export default function PaywallScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');
  const [loading, setLoading] = useState(false);
  const { subscribe } = useSubscription();

  const handleSubscribe = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    await subscribe();
    setLoading(false);
    router.replace('/meditations');
  };

  return (
    <LinearGradient
      colors={['#0d0620', '#1a0533', '#0d1a40']}
      style={styles.gradient}
    >
      <View style={styles.outer}>
      <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 8 }]}>
        <View style={styles.header}>
          <Text style={styles.logo}>✦ ZenPulse</Text>
          <Text style={styles.headline}>
            Найди своё{' '}
            <Text style={styles.headlineAccent}>внутреннее спокойствие</Text>
          </Text>
        </View>

        <View style={styles.planSection}>
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Всё включено в Premium</Text>
            {BENEFITS.map((b, i) => (
              <View key={i} style={styles.benefitRow}>
                <Text style={styles.benefitIcon}>{b.icon}</Text>
                <Text style={styles.benefitText}>{b.text}</Text>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionLabel}>Выбери тариф</Text>
          <PlanToggle selected={selectedPlan} onSelect={setSelectedPlan} />
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleSubscribe}
          activeOpacity={0.9}
          disabled={loading}
        >
          <LinearGradient
            colors={['#7c3aed', '#9333ea', '#7c3aed']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.ctaText}>Попробовать бесплатно</Text>
                <Text style={styles.ctaSub}>
                  {selectedPlan === 'yearly'
                    ? '3 дня бесплатно, затем 1 490 руб/год'
                    : '3 дня бесплатно, затем 299 руб/мес'}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footnote}>Отмена в любое время · Без скрытых платежей</Text>
        <TouchableOpacity onPress={() => router.replace('/meditations')}>
          <Text style={styles.restoreLink}>Уже подписан? Войти</Text>
        </TouchableOpacity>
      </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  outer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    height: Math.min(height, CONTENT_MAX_HEIGHT),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    color: '#a78bfa',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headline: {
    color: '#f3f0ff',
    fontSize: Math.min(26, width * 0.067),
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: Math.min(32, width * 0.082),
  },
  headlineAccent: {
    color: '#c084fc',
  },
  benefitsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#3d2070',
  },
  benefitsTitle: {
    color: '#e9d5ff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  benefitIcon: {
    fontSize: 15,
    marginRight: 8,
    width: 22,
    textAlign: 'center',
  },
  benefitText: {
    color: '#d1d5db',
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  checkmark: {
    color: '#7c3aed',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
  },
  planSection: {
    width: '100%',
    gap: 8,
  },
  sectionLabel: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  ctaGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  ctaSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  footnote: {
    color: '#6b7280',
    fontSize: 11,
    textAlign: 'center',
  },
  restoreLink: {
    color: '#7c3aed',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
