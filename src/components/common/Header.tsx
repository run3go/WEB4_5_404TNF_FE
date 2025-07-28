'use client';

import user_default_image from '@/assets/images/default-profile.svg';
import { useAuthStore } from '@/stores/authStoe';
import { useSidebarStore } from '@/stores/sidebarStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NotificationModal from '../notification/NotificationModal';
import Button from './Button';
import Card from './Card';
import Icon from './Icon';
import { useNotificationStore } from '@/stores/Notification';

export default function Header() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNewNotificaton, setIsNewNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { open } = useSidebarStore();
  const { userInfo, isLogin } = useAuthStore();
  const notifications = useNotificationStore((state) => state.notifications);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);
    setIsLoading(true);

    const storedValue = sessionStorage.getItem('isNotification');
    setIsNewNotification(storedValue === 'true');

    if (isLogin) {
      setUserId(null);
    }
  }, [isLogin]);

  useEffect(() => {
    if (!notifications || notifications.length === 0) return;

    const hasUnread = notifications.some((n) => !n.isRead);
    sessionStorage.setItem('isNotification', hasUnread.toString());
    setIsNewNotification(hasUnread);
  }, [notifications]);

  if (!isLoading) {
    return null;
  }

  return (
    <>
      <div className="mb-[2.6vh] hidden items-center justify-end gap-7 pr-[2.43vw] sm:flex">
        {userId || isLogin ? (
          <>
            <div className="relative">
              <div
                ref={modalRef}
                className="cursor-pointer"
                onClick={() => setIsNotificationOpen((prev) => !prev)}
              >
                <Icon
                  width="28px"
                  height="28px"
                  left="-304px"
                  top="-18px"
                  className="cursor-pointer"
                />
                {isNewNotificaton && (
                  <div className="absolute top-[-2px] right-[2px]">
                    <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500"></p>
                  </div>
                )}
              </div>
              {isNotificationOpen && (
                <NotificationModal
                  onClose={() => setIsNotificationOpen(false)}
                />
              )}
            </div>
            <Link href={`/profile/${userInfo?.userId}`}>
              <div className="relative h-9 w-9">
                <Image
                  className="cursor-pointer rounded-full"
                  src={userInfo?.imgUrl || user_default_image}
                  alt="유저 프로필"
                  fill
                  priority
                />
              </div>
            </Link>
          </>
        ) : (
          <Link href={'/login'}>
            <Button className="h-[36px] w-[95px] text-center text-[16px]">
              로그인
            </Button>
          </Link>
        )}
      </div>
      <Card className="fixed top-0 right-0 left-0 z-100 flex h-18 w-screen items-center justify-center rounded-none bg-[var(--color-background)] px-4 sm:hidden">
        <Icon
          className="absolute left-6 cursor-pointer"
          onClick={open}
          width="18px"
          height="10px"
          left="-340px"
          top="-80px"
        />

        <Link href="/">
          <Image
            className="cursor-pointer"
            src={'/images/mobile-logo.svg'}
            alt="모바일 로고"
            width={117}
            height={20}
            priority
          />
        </Link>
      </Card>
      {/* 헤더 아래 공간 */}
      <div className="h-18 w-screen sm:hidden" />
    </>
  );
}
