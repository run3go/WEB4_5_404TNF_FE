'use client';

import { useAuthStore } from '@/stores/authStoe';
import { notFound, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthAccessControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin, userInfo } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
  }, []);
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (!storedUserId && !isLogin && isAdminPage) {
      router.replace('/mungdogdiarymung');
      return;
    }

    if (!storedUserId && !isLogin && !isPublic) {
      router.replace('/login');
    }
  }, [isLogin, isPublic, router, isAdminPage]);

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role');
    if (isAdminPage && !storedRole && userInfo?.role !== 'ROLE_ADMIN') {
      notFound();
    }
  });

  if (!isLoading) return null;

  if (!isLogin && !isPublic) return null;

  return <>{children}</>;
}
