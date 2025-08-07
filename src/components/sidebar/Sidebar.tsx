'use client';
import AuthProvider from '@/provider/AuthProvider';
import { useAuthStore } from '@/stores/authStoe';
import { useSidebarStore } from '@/stores/sidebarStore';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import AuthSection from './AuthSection';
import Logo from './Logo';
import SidebarLinks from './SidebarLinks';

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();
  const { userInfo } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) return null;

  return (
    <AuthProvider>
      {isOpen && (
        <div
          className="fixed inset-0 z-[170] bg-[#2B2926]/50 md:hidden"
          onClick={close}
        />
      )}
      <div
        className={twMerge(
          `fixed top-0 left-0 z-200 transition-transform duration-300 ease-in-out ${!isOpen ? '-translate-x-full' : 'sm:-translate-x-0'} h-full w-60 flex-col items-center bg-[var(--color-primary-100)] text-[var(--color-black)]`,
          'md:relative md:my-[5.2vh] md:ml-14 md:flex md:h-[calc(89.4vh)] md:w-[220px] md:translate-x-0 md:rounded-[50px] md:bg-[var(--color-background)] md:p-8 dark:bg-[#343434] md:dark:bg-[var(--color-black)]',
        )}
      >
        <Logo />
        <div className="flex h-[calc(89.4vh-50px)] flex-col justify-between md:h-[calc(89.4vh-122.5px)]">
          <SidebarLinks role={userInfo?.role} />
          <AuthSection />
        </div>
      </div>
    </AuthProvider>
  );
}
