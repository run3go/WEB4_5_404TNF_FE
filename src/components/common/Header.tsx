'use client';

import { getNotifications } from '@/api/notification';
import user_default_image from '@/assets/images/default-profile.svg';
import { useAuthStore } from '@/stores/authStoe';
import { useNotificationStore } from '@/stores/Notification';
import { useSidebarStore } from '@/stores/sidebarStore';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NotificationModal from '../notification/NotificationModal';
import Button from './Button';
import Card from './Card';
import Icon from './Icon';

export default function Header() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNewNotificaton, setIsNewNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { open } = useSidebarStore();
  const { userInfo, isLogin } = useAuthStore();
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications,
  );

  const [profileImage, setProfileImage] = useState(userInfo?.imgUrl);

  const modalRef = useRef<HTMLDivElement>(null);

  const fetchAndSetNotifications = useCallback(async () => {
    try {
      const noti = await getNotifications();
      setNotifications(noti);
    } catch (error) {
      console.error('알림 불러오기 실패:', error);
    }
  }, [setNotifications]);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);
    setIsLoading(true);

    const storedValue = sessionStorage.getItem('isNotification');
    setIsNewNotification(storedValue === 'true');

    if (isLogin) {
      setUserId(null);
      fetchAndSetNotifications();
    }
  }, [isLogin, fetchAndSetNotifications]);

  useEffect(() => {
    const hasUnread = notifications?.some((n) => !n.isRead) ?? false;
    sessionStorage.setItem('isNotification', hasUnread.toString());
    setIsNewNotification(hasUnread);
  }, [notifications]);

  if (!isLoading) {
    return null;
  }

  return (
    <>
      <div className="mb-[2.6vh] hidden items-center justify-end gap-7 sm:flex sm:pr-[2.43vw]">
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
                  <div className="absolute top-[2px] right-[8px]">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-[var(--color-red)]"></p>
                  </div>
                )}
              </div>
              {!isMobile && isNotificationOpen && (
                <NotificationModal
                  onClose={() => setIsNotificationOpen(false)}
                />
              )}
            </div>
            <Link href={`/profile/${userInfo?.userId}`}>
              <div className="relative h-9 w-9">
                <Image
                  className="cursor-pointer rounded-full"
                  src={userInfo?.imgUrl || profileImage || user_default_image}
                  alt="유저 프로필"
                  fill
                  priority
                  onError={() => setProfileImage(user_default_image)}
                  sizes="36px"
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
      <Card className="fixed top-0 right-0 left-0 z-50 flex h-18 w-screen items-center justify-between rounded-none bg-[var(--color-background)] px-6 sm:hidden dark:bg-[var(--color-black)]">
        <Icon
          className="cursor-pointer"
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
          </div>
          {isMobile && isNotificationOpen && (
            <NotificationModal onClose={() => setIsNotificationOpen(false)} />
          )}
        </div>
      </Card>
      {/* 헤더 아래 공간 */}
      <div className="h-18 w-screen sm:hidden" />
    </>
  );
}
