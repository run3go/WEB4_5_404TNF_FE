'use client';

import { useNotificationStore } from '@/stores/Notification';
import { useEffect } from 'react';

export default function NotificationProvider() {
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
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
  }, [addNotification]);

  return null;
}
