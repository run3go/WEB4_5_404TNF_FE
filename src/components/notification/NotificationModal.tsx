'use client';

import { useEffect, useRef } from 'react';
import Icon from '../common/Icon';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getNotifications,
  removeNotification,
  removeNotifications,
} from '@/api/notification';
import { useAuthStore } from '@/stores/authStoe';

interface NotificationModalProps {
  onClose: () => void;
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data } = useQuery({
    queryKey: ['notification-list'],
    queryFn: () => getNotifications(),
    enabled: isLogin,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const removeNotificationsMutation = useMutation({
    mutationFn: removeNotifications,
  });

  const removeNotificationMutation = useMutation({
    mutationFn: removeNotification,
  });

  useEffect(() => {
    sessionStorage.setItem('isNotification', 'false');
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute top-full right-0 z-50 mt-2 flex h-[360px] w-[360px] flex-col rounded-lg border border-[var(--color-primary-200)] bg-[var(--color-background)] p-4 shadow-lg"
    >
      <div className="flex items-center justify-between p-2">
        <p className="cursor-default text-lg font-bold">Notification</p>
        <p
          className="cursor-pointer text-xs text-[var(--color-grey)]"
          onClick={() => removeNotificationsMutation.mutate()}
        >
          전체삭제
        </p>
      </div>
      <ul className="scrollbar-hidden flex-1 space-y-1 overflow-y-auto">
        {data?.map((notification: NotificationInfo) => (
          <li
            key={notification.notiId}
            className="relative w-full rounded-xl text-sm"
          >
            <div className="group flex cursor-pointer items-center rounded-xl p-2 transition-colors duration-300 ease-in-out hover:bg-[color:var(--color-primary-200)]">
              <div className="flex w-full items-center">
                <Icon width="16px" height="14px" left="-26px" top="-79px" />
                <p className="h-auto w-full truncate overflow-hidden pl-2 leading-[1.4] whitespace-nowrap group-hover:pr-6">
                  {notification.content}
                </p>
              </div>
              <Icon
                width="14px"
                height="14px"
                left="-151px"
                top="-79px"
                className="absolute right-2 hidden group-hover:block"
                onClick={() => {
                  removeNotificationMutation.mutate({
                    notiId: notification.notiId,
                    type: notification.type,
                  });
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
