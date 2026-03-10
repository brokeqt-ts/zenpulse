export interface Meditation {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
  isPremium: boolean;
  description: string;
}

export const MEDITATIONS: Meditation[] = [
  {
    id: '1',
    title: 'Утреннее пробуждение',
    duration: '5 мин',
    category: 'Утро',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    isPremium: false,
    description: 'Мягкое начало дня с осознанным дыханием',
  },
  {
    id: '2',
    title: 'Снятие тревоги',
    duration: '10 мин',
    category: 'Стресс',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80',
    isPremium: false,
    description: 'Техника 4-7-8 для быстрого успокоения',
  },
  {
    id: '3',
    title: 'Глубокий фокус',
    duration: '15 мин',
    category: 'Продуктивность',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80',
    isPremium: true,
    description: 'Войди в состояние потока за 15 минут',
  },
  {
    id: '4',
    title: 'Сканирование тела',
    duration: '20 мин',
    category: 'Расслабление',
    image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=400&q=80',
    isPremium: true,
    description: 'Последовательное расслабление каждой части тела',
  },
  {
    id: '5',
    title: 'Вечерний ритуал',
    duration: '12 мин',
    category: 'Сон',
    image: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=400&q=80',
    isPremium: true,
    description: 'Подготовь разум к глубокому сну',
  },
  {
    id: '6',
    title: 'Любящая доброта',
    duration: '18 мин',
    category: 'Сострадание',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80',
    isPremium: true,
    description: 'Медитация метта для открытия сердца',
  },
];
