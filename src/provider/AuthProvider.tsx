'use client';

import { useEffect } from 'react';
import { getUserProfile } from '@/api/auth';
import { useAuthStore } from '@/stores/authStoe';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setLogin = useAuthStore((state) => state.setLogin);

  useEffect(() => {
    const restoreUser = async () => {
      const userId = sessionStorage.getItem('userId');

      if (userId) {
        try {
          const data = await getUserProfile(userId);

          const userInfo = {
            userId: data.userId,
            email: data.email,
            name: data.name,
            nickname: data.nickname,
            provider: data.provider,
            userImg: data.userImg,
          };

          setLogin(userInfo);
        } catch (err) {
          console.error('세션 복원 실패:', err);
          sessionStorage.removeItem('userId');
        }
      }
    };

    restoreUser();
  }, [setLogin]);

  return <>{children}</>;
}
