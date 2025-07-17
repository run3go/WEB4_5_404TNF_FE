'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from './Card';
import Icon from './Icon';
import NotificationModal from '../notification/NotificationModal';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useAuthStore } from '@/stores/authStoe';
import user_default_image from '@/assets/images/default-profile.svg';
import Button from './Button';

export default function Header() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { open } = useSidebarStore();
  const { isLogin, userInfo } = useAuthStore();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <>
      <div className="mb-[2.6vh] hidden items-center justify-end gap-7 pr-[2.43vw] sm:flex">
        {isLogin ? (
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
              </div>
              {isNotificationOpen && (
                <NotificationModal
                  onClose={() => setIsNotificationOpen(false)}
                />
              )}
            </div>
            <Link href={`/profile/${userInfo?.userId}`}>
              <Image
                className="cursor-pointer rounded-full"
                src={userInfo?.userImg || user_default_image}
                alt="유저 프로필"
                width={36}
                height={36}
                priority
              />
            </Link>
          </>
        ) : (
          <Link href={'/login'}>
            <Button className="h-[36px] w-[95px] text-center text-[20px]">
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
