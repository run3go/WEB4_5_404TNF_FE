'use client';

import { useAuthStore } from '@/stores/authStoe';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthAccessControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter();
  const pathname = usePathname();

  const isRoot = pathname === '/';
  const publicPaths = ['/post', '/guide', '/signup', '/terms', '/login'];
  const isPublic =
    isRoot || publicPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (!isLogin && !isPublic) {
      router.replace('/login');
    }
  }, [isLogin, isPublic, router]);

  if (!isLogin && !isPublic) return null;

  return <>{children}</>;
}
