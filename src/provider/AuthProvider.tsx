'use client';

import { getUserProfile } from '@/api/auth';
import { useAuthStore } from '@/stores/authStoe';
import { useEffect } from 'react';

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
            role: data.role,
            nickname: data.nickname,
            provider: data.provider,
            imgUrl: data.imgUrl,
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
