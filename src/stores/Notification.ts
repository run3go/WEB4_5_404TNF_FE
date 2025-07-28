import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface NotificationStore {
  isNewNotification: boolean;
  notifications: NotificationInfo[];
  setNotifications: (notifications: NotificationInfo[]) => void;
  addNotification: (notification: NotificationInfo) => void;
  clearNotificationFlag: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    immer((set) => ({
      isNewNotification: false,
      notifications: [],
      setNotifications: (notifications) =>
        set((state) => {
          state.notifications = notifications;
        }),
      addNotification: (notification) =>
        set((state) => {
          state.notifications.push(notification);
          state.isNewNotification = true;
        }),
      clearNotificationFlag: () =>
        set((state) => {
          state.isNewNotification = false;
        }),
    })),
  ),
);
