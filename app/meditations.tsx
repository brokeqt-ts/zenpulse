import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MeditationCard } from '../components/MeditationCard';
import { MoodPicker } from '../components/MoodPicker';
import { MEDITATIONS, Meditation } from '../constants/meditations';
import { useSubscription } from '../hooks/useSubscription';
import { generateAffirmation, Mood } from '../services/affirmation';

const WIDE_BREAKPOINT = 768;
const CONTAINER_MAX = 880;

export default function MeditationsScreen() {
  const insets = useSafeAreaInsets();
  const { isSubscribed, unsubscribe } = useSubscription();
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth > WIDE_BREAKPOINT;
  const numColumns = isWide ? 2 : 1;
  const containerWidth = Math.min(windowWidth, CONTAINER_MAX);
  // Ширина карточки: в 2 колонки — половина контейнера минус отступы
  const cardWidth = isWide
    ? (containerWidth - 16 * 2 - 12) / 2
    : Math.min(windowWidth - 32, 398);

  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleCardPress = (item: Meditation) => {
    if (item.isPremium && !isSubscribed) {
      router.push('/paywall');
    } else {
      Alert.alert('▶ ' + item.title, item.description + '\n\nПродолжительность: ' + item.duration);
    }
  };

  const handleGenerate = async () => {
    if (!selectedMood) {
      Alert.alert('Выбери настроение', 'Нажми на один из смайликов выше');
      return;
    }
    setGenerating(true);
    setAffirmation(null);
    try {
      const text = await generateAffirmation(selectedMood);
      setAffirmation(text);
    } catch {
      Alert.alert('Ошибка', 'Не удалось сгенерировать аффирмацию');
    } finally {
      setGenerating(false);
    }
  };

  const ListHeader = () => (
    <View style={isWide && { width: containerWidth }}>
      {/* Header */}
      <LinearGradient
        colors={['#0d0620', '#1a0533']}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Твои медитации</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.statusBadge,
              isSubscribed ? styles.statusPremium : styles.statusFree,
            ]}
            onPress={isSubscribed ? () => {
              unsubscribe();
            } : () => router.push('/paywall')}
          >
            <Text style={styles.statusText}>
              {isSubscribed ? '✦ Premium' : '🔒 Free'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* AI Affirmation section */}
      <View style={styles.aiSection}>
        <View style={styles.aiHeader}>
          <Text style={styles.aiIcon}>✨</Text>
          <View>
            <Text style={styles.aiTitle}>AI Настрой дня</Text>
            <Text style={styles.aiSubtitle}>Выбери своё настроение</Text>
          </View>
        </View>

        <MoodPicker selected={selectedMood} onSelect={setSelectedMood} />

        <TouchableOpacity
          style={[styles.generateBtn, generating && styles.generateBtnDisabled]}
          onPress={handleGenerate}
          disabled={generating}
          activeOpacity={0.85}
        >
          {generating ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.generateBtnText}>
              {affirmation ? '🔄 Обновить аффирмацию' : '✦ Сгенерировать'}
            </Text>
          )}
        </TouchableOpacity>

        {affirmation && (
          <View style={styles.affirmationCard}>
            <Text style={styles.affirmationQuote}>"</Text>
            <Text style={styles.affirmationText}>{affirmation}</Text>
          </View>
        )}
      </View>

      {/* Section label */}
      <Text style={styles.sectionLabel}>Все сессии</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#0d0620', '#0d0a1a']} style={styles.gradient}>
      <View style={styles.centered}>
        <FlatList
          key={numColumns}
          data={MEDITATIONS}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <MeditationCard
              item={item}
              isLocked={item.isPremium && !isSubscribed}
              onPress={() => handleCardPress(item)}
              cardWidth={cardWidth}
            />
          )}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={[
            { paddingBottom: insets.bottom + 24 },
            isWide && styles.wideContent,
          ]}
          showsVerticalScrollIndicator={false}
          style={[styles.list, isWide && { maxWidth: CONTAINER_MAX }]}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
    maxWidth: 430,
  },
  wideContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  greeting: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    color: '#f3f0ff',
    fontSize: 26,
    fontWeight: '800',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPremium: {
    backgroundColor: '#2d1060',
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  statusFree: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#374151',
  },
  statusText: {
    color: '#e9d5ff',
    fontSize: 13,
    fontWeight: '700',
  },
  aiSection: {
    margin: 16,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#3d2070',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  aiIcon: {
    fontSize: 28,
  },
  aiTitle: {
    color: '#e9d5ff',
    fontSize: 17,
    fontWeight: '700',
  },
  aiSubtitle: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 1,
  },
  generateBtn: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 12,
  },
  generateBtnDisabled: {
    backgroundColor: '#4c1d95',
  },
  generateBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  affirmationCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
  },
  affirmationQuote: {
    color: '#7c3aed',
    fontSize: 36,
    lineHeight: 30,
    fontWeight: '900',
    marginBottom: 4,
  },
  affirmationText: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  sectionLabel: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 4,
  },
});
