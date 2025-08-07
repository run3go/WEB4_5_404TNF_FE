import { logout } from '@/api/auth';
import user_default_image from '@/assets/images/default-profile.svg';
import { useAuthStore } from '@/stores/authStoe';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '../common/Icon';
import Settings from '../common/Settings';

export default function AuthSection() {
  const { setLogout, isLogin, userInfo } = useAuthStore();
  const [userId, setUserId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      sessionStorage.clear();
      setLogout();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setUserId(sessionStorage.getItem('userId'));
  }, []);

  return (
    <div className="text-sm font-medium md:text-[16px]">
      <div>
        <div
          className="relative flex h-[52px] w-[220px] cursor-pointer items-center gap-3 py-3 pl-8 md:pl-6"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Icon width="24px" height="26px" left="-297px" top="-252px" />
          <p className="dark:text-[var(--color-background)]">설정</p>
        </div>
        {isSettingsOpen && (
          <Settings onClose={() => setIsSettingsOpen(false)} />
        )}
      </div>
      {userId || isLogin ? (
        <>
          <Link
            href={`/profile/${userId}`}
            className="flex h-[52px] w-[220px] cursor-pointer items-center gap-3 py-3 pl-8 md:hidden md:pl-6"
          >
            <Image
              className="h-6 w-6 cursor-pointer rounded-full"
              src={userInfo?.imgUrl || user_default_image}
              alt="유저 프로필"
              width={24}
              height={24}
              priority
            />
            <p className="dark:text-[var(--color-background)]">마이페이지</p>
          </Link>
          <div
            className="flex h-[52px] w-[220px] cursor-pointer items-center gap-2 py-3 pl-8 md:pl-6"
            onClick={handleLogout}
          >
            <Icon width="28px" height="28px" left="-264px" top="-18px" />
            <p className="dark:text-[var(--color-background)]">로그아웃</p>
          </div>
        </>
      ) : (
        <Link
          href={'/login'}
          className="flex h-[52px] w-[220px] cursor-pointer items-center gap-2 py-3 pl-8 md:pl-6"
        >
          <Icon width="28px" height="28px" left="-264px" top="-18px" />
          <p className="dark:text-[var(--color-background)]">로그인</p>
        </Link>
      )}
    </div>
  );
}
