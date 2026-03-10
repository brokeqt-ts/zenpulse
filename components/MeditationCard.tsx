import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Meditation } from '../constants/meditations';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface Props {
  item: Meditation;
  isLocked: boolean;
  onPress: () => void;
}

export function MeditationCard({ item, isLocked, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: item.image }}
        style={[styles.image, isLocked && styles.imageLocked]}
        resizeMode="cover"
      />

      {isLocked && (
        <View style={styles.lockOverlay}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.lockText}>Premium</Text>
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.meta}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <Text style={[styles.duration, isLocked && styles.textLocked]}>
            ⏱ {item.duration}
          </Text>
        </View>
        <Text style={[styles.title, isLocked && styles.textLocked]}>
          {item.title}
        </Text>
        <Text style={[styles.description, isLocked && styles.textLocked]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1e1040',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3d2070',
  },
  image: {
    width: '100%',
    height: 140,
  },
  imageLocked: {
    opacity: 0.3,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 5, 20, 0.5)',
  },
  lockIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  lockText: {
    color: '#c084fc',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  info: {
    padding: 14,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#2d1060',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#a78bfa',
    fontSize: 11,
    fontWeight: '600',
  },
  duration: {
    color: '#a78bfa',
    fontSize: 12,
  },
  title: {
    color: '#f3f0ff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: '#9ca3af',
    fontSize: 13,
    lineHeight: 18,
  },
  textLocked: {
    color: '#4b4060',
  },
});
