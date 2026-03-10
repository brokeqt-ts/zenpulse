import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

export type Plan = 'monthly' | 'yearly';

interface Props {
  selected: Plan;
  onSelect: (plan: Plan) => void;
}

const { width } = Dimensions.get('window');

export function PlanToggle({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {/* Monthly */}
      <TouchableOpacity
        style={[styles.plan, selected === 'monthly' && styles.planSelected]}
        onPress={() => onSelect('monthly')}
        activeOpacity={0.8}
      >
        <Text style={[styles.planName, selected === 'monthly' && styles.planNameSelected]}>
          Месячный
        </Text>
        <Text style={[styles.price, selected === 'monthly' && styles.priceSelected]}>
          299 ₽
        </Text>
        <Text style={[styles.period, selected === 'monthly' && styles.periodSelected]}>
          в месяц
        </Text>
      </TouchableOpacity>

      {/* Yearly */}
      <TouchableOpacity
        style={[styles.plan, styles.planYearly, selected === 'yearly' && styles.planSelectedYearly]}
        onPress={() => onSelect('yearly')}
        activeOpacity={0.8}
      >
        <View style={styles.saveBadge}>
          <Text style={styles.saveBadgeText}>Выгода 60%</Text>
        </View>
        <Text style={[styles.planName, selected === 'yearly' && styles.planNameSelected]}>
          Годовой
        </Text>
        <Text style={[styles.price, selected === 'yearly' && styles.priceSelected]}>
          1 490 ₽
        </Text>
        <Text style={[styles.period, selected === 'yearly' && styles.periodSelected]}>
          ≈ 124 ₽ / мес
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  plan: {
    flex: 1,
    backgroundColor: '#1a0d3a',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#3d2070',
    position: 'relative',
    minHeight: 80,
    justifyContent: 'center',
  },
  planYearly: {
    borderColor: '#7c3aed',
  },
  planSelected: {
    backgroundColor: '#2d1060',
    borderColor: '#a78bfa',
  },
  planSelectedYearly: {
    backgroundColor: '#2d1060',
    borderColor: '#c084fc',
  },
  saveBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#7c3aed',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  saveBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  planName: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  planNameSelected: {
    color: '#e9d5ff',
  },
  price: {
    color: '#e9d5ff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  priceSelected: {
    color: '#ffffff',
  },
  period: {
    color: '#6b7280',
    fontSize: 12,
  },
  periodSelected: {
    color: '#a78bfa',
  },
});
