import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'zenpulse_subscribed';

export function useSubscription() {
  const [isSubscribed, setIsSubscribedState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      setIsSubscribedState(value === 'true');
      setLoading(false);
    });
  }, []);

  const subscribe = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
    setIsSubscribedState(true);
  }, []);

  const unsubscribe = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'false');
    setIsSubscribedState(false);
  }, []);

  return { isSubscribed, loading, subscribe, unsubscribe };
}
