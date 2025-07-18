'use client';

import { useAuthStore } from '@/stores/authStoe';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthAccessControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin, userInfo } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  const [isGetUserId, setIsGetUserId] = useState(false);

  const isRoot = pathname === '/';
  const isAdminPage = pathname.startsWith('/admin');
  const publicPaths = [
    '/post',
    '/guide',
    '/signup',
    '/terms',
    '/login',
    '/mungdogdiarymung',
  ];
  const isPublic =
    isRoot || publicPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);
    setIsGetUserId(true);
  }, []);

  useEffect(() => {
    if (isGetUserId && !userId && !isLogin && isAdminPage) {
      router.replace('/mungdogdiarymung');
      return;
    }

    if (isGetUserId && !userId && !isLogin && !isPublic) {
      router.replace('/login');
    }

    if (isAdminPage) {
      if (!userInfo?.role) return;

      if (userInfo?.role !== 'ROLE_ADMIN') {
        router.replace('/not-found');
        return;
      }
    }
  }, [
    isGetUserId,
    userId,
    isLogin,
    isPublic,
    router,
    isAdminPage,
    userInfo?.role,
  ]);

  if (!isGetUserId) return null;

  if (!isLogin && !isPublic) return null;

  return <>{children}</>;
}
