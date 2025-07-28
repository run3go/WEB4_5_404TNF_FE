'use client';

import { useAuthStore } from '@/stores/authStoe';
import { useNotificationStore } from '@/stores/Notification';
import { useEffect, useState } from 'react';

export default function NotificationProvider() {
  const [userId, setUserId] = useState<string | boolean | null>(null);
  const isLogin = useAuthStore((state) => state.isLogin);
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  useEffect(() => {
    setUserId(sessionStorage.getItem('userId'));
  }, []);
  useEffect(() => {
    setUserId(isLogin);
    if (!userId) return;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notification/v1/subscribe`,
      { withCredentials: true },
    );

    eventSource.addEventListener('noti', (event) => {
      try {
        const notification = JSON.parse(event.data);
        addNotification(notification);
        sessionStorage.setItem('isNotification', 'true');
      } catch (e) {
        console.error('알림 파싱 실패', e);
      }
    });
    eventSource.onerror = (e) => {
      console.error('SSE 에러', e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [addNotification, userId, isLogin]);

  return null;
}
