'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignupAccessControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAgreeTerms, setIsAgreeTerms] = useState<string | null>(null);
  const [isGetAgree, setIsGetAgree] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('isAgreeTerms');
    setIsAgreeTerms(stored);
    setIsGetAgree(true);
  }, []);

  useEffect(() => {
    if (!isGetAgree) return;

    if (pathname === '/signup' && isAgreeTerms !== 'true') {
      router.replace('/terms');
      return;
    }
  }, [isGetAgree, isAgreeTerms, pathname, router]);

  if (!isGetAgree) return null;

  if (!isAgreeTerms) return null;

  return <>{children}</>;
}
