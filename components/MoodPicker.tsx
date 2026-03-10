import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Mood } from '../services/affirmation';

interface MoodOption {
  mood: Mood;
  emoji: string;
  label: string;
}

const MOODS: MoodOption[] = [
  { mood: 'calm', emoji: '😌', label: 'Спокоен' },
  { mood: 'stressed', emoji: '😤', label: 'Тревога' },
  { mood: 'sad', emoji: '😔', label: 'Грустно' },
];

interface Props {
  selected: Mood | null;
  onSelect: (mood: Mood) => void;
}

export function MoodPicker({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {MOODS.map((item) => (
        <TouchableOpacity
          key={item.mood}
          style={[
            styles.option,
            selected === item.mood && styles.optionSelected,
          ]}
          onPress={() => onSelect(item.mood)}
          activeOpacity={0.75}
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={[styles.label, selected === item.mood && styles.labelSelected]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  option: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1a0d3a',
    borderWidth: 1.5,
    borderColor: '#3d2070',
    minWidth: 80,
  },
  optionSelected: {
    backgroundColor: '#2d1060',
    borderColor: '#a78bfa',
  },
  emoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
  },
  labelSelected: {
    color: '#e9d5ff',
  },
});
