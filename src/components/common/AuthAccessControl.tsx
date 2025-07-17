'use client';

import { useAuthStore } from '@/stores/authStoe';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthAccessControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter();
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const isRoot = pathname === '/';
  const publicPaths = ['/post', '/guide', '/signup', '/terms', '/login'];
  const isPublic =
    isRoot || publicPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);
    setChecked(true);
  }, []);

  useEffect(() => {
    if (checked && !userId && !isLogin && !isPublic) {
      router.replace('/login');
    }
  }, [checked, userId, isLogin, isPublic, router]);

  if (!checked) return null;

  if (!isLogin && !isPublic) return null;

  return <>{children}</>;
}
