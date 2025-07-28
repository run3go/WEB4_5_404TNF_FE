import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface NotificationStore {
  notifications: NotificationInfo[];
  setNotifications: (notifications: NotificationInfo[]) => void;
  addNotification: (notification: NotificationInfo) => void;
  isReadNotification: (notiId: number) => void;
  clearNotification: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    immer((set) => ({
      notifications: [],
      setNotifications: (notifications) =>
        set((state) => {
          state.notifications = notifications;
        }),
      addNotification: (notification) =>
        set((state) => {
          state.notifications.push(notification);
        }),
      isReadNotification: (notiId) =>
        set((state) => {
          const noti = state.notifications.find((n) => n.notiId === notiId);
          if (noti) noti.isRead = true;
        }),

      clearNotification: () =>
        set((state) => {
          state.notifications = [];
          sessionStorage.setItem('isNotification', 'false');
        }),
    })),
  ),
);
