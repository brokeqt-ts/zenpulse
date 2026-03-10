# ZenPulse: AI Meditation App

Прототип мобильного приложения для медитаций с Paywall-экраном и AI-генерацией аффирмаций.

## Стек
- **React Native + Expo** (SDK 51, Expo Router v3)
- **expo-linear-gradient** — градиентные фоны и кнопки
- **react-native-safe-area-context** — корректные отступы на всех устройствах
- **@react-native-async-storage/async-storage** — персистентное хранение флага `isSubscribed`

## Запуск

```bash
npm install
npx expo start
```

Открой в **Expo Go** (iOS/Android) или запусти эмулятор.

## Структура экранов

| Экран | Файл | Описание |
|---|---|---|
| Paywall | `app/paywall.tsx` | Подписка с выбором тарифа |
| Медитации | `app/meditations.tsx` | Список сессий + AI-настрой |

## Логика подписки

```ts
// hooks/useSubscription.ts
const { isSubscribed, subscribe } = useSubscription();

// В MeditationCard:
if (item.isPremium && !isSubscribed) {
  router.push('/paywall'); // замок на карточке
}
```

Флаг `isSubscribed` хранится в AsyncStorage и персистентен между перезапусками.

## AI Настрой дня

Функция `generateAffirmation(mood)` в `services/affirmation.ts` возвращает текст аффирмации на основе настроения (calm / stressed / sad).

Сейчас используется **реалистичный мок** с имитацией задержки 1.2 сек. Для подключения Claude API раскомментируй блок в конце файла и добавь `EXPO_PUBLIC_ANTHROPIC_KEY` в `.env`.

---

## Как ИИ справился с мобильной спецификой

### SafeArea
ИИ был явно проинструктирован использовать `useSafeAreaInsets()` вместо фиксированных `paddingTop`. Это критично для iPhone с Dynamic Island (вырез 59pt) vs iPhone SE (20pt статус-бар). Все экраны оборачивают контент через `insets.top` и `insets.bottom`.

### Навигация
Expo Router (файловая система) — ИИ корректно использует `router.replace()` для замены стека после "покупки" (чтобы кнопка "назад" не вела обратно на Paywall) и `router.push('/paywall')` из заблокированных карточек.

---

## Контрольный вопрос

**«С какими специфическими проблемами мобильной верстки ИИ справляется хуже всего и как ты контролировал его работу?»**

### Проблемы, с которыми ИИ справляется хуже всего:

**1. Адаптивные размеры шрифтов и элементов**
ИИ склонен писать абсолютные значения (`fontSize: 34`, `width: 390`), которые выглядят хорошо на одном устройстве и ломаются на других. Решение — явно требовать `Math.min(34, width * 0.086)` для заголовков и `'100%'` / `Dimensions.get('window').width` для ширины контейнеров.

**2. FlatList + flex-вёрстка**
ИИ часто путает `style` и `contentContainerStyle` у FlatList, что приводит к тому, что список не скроллится (задаёт `flex: 1` в `contentContainerStyle`). Нужно явно контролировать: `style={{ flex: 1 }}` на обёртке, `contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}` на самом списке.

**3. Тапабельные зоны**
ИИ генерирует кнопки меньше 44×44pt — минимума по HIG (Apple) и Material Design. На iPhone SE кнопки особенно критичны, т.к. экран 320pt шириной. Контроль: проверка `minHeight: 44`, `minWidth: 44` на всех `TouchableOpacity`.

**4. Позиционирование overlay-элементов**
`position: 'absolute'` с процентными значениями ведёт себя по-разному на соотношениях 16:9 (SE) vs 19.5:9 (Pro Max). Решение — привязка к родителю через `top: 0, left: 0, right: 0, bottom: 0` вместо числовых отступов.

### Как контролировал:
- Тестировал в эмуляторах iPhone SE (375×667pt) и iPhone 15 Pro Max (430×932pt) после каждого экрана
- Явно указывал в промптах: *«используй SafeAreaView из react-native-safe-area-context», «все размеры только через проценты или Dimensions»*
- Проверял, что кнопки имеют `paddingVertical ≥ 12` и не обрезаются на узких экранах
