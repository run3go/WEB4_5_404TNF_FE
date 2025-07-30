'use client';
import { logout } from '@/api/auth';
import user_default_image from '@/assets/images/default-profile.svg';
import AuthProvider from '@/provider/AuthProvider';
import { useAuthStore } from '@/stores/authStoe';
import { useSidebarStore } from '@/stores/sidebarStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import Settings from './Settings';

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();
  const { setLogout, isLogin, userInfo } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setUserId(null);
      setRole(null);
      sessionStorage.clear();
      setLogout();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);
    const storedRole = sessionStorage.getItem('role');
    setRole(storedRole);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  if (!isLoading) return null;

  return (
    <>
      <AuthProvider>
        {isOpen && (
          <div
            className="fixed inset-0 z-[170] bg-[#2B2926]/50 sm:hidden"
            onClick={close}
          />
        )}
        <div
          className={`fixed top-0 left-0 z-200 transition-transform duration-300 ease-in-out ${!isOpen ? '-translate-x-full' : 'sm:-translate-x-0'} h-full w-60 flex-col items-center overflow-x-hidden overflow-y-auto bg-[var(--color-primary-100)] text-[var(--color-black)] sm:relative sm:my-[5.2vh] sm:ml-14 sm:flex sm:h-[calc(89.4vh)] sm:w-[220px] sm:translate-x-0 sm:rounded-[50px] sm:bg-[var(--color-background)] sm:p-8 dark:bg-[#343434] sm:dark:bg-[var(--color-black)]`}
        >
          <Link href="/">
            <Image
              className="hidden sm:block"
              src="/images/logo.svg"
              alt="멍멍일지 로고"
              width={156}
              height={122}
              priority
            />
          </Link>

          <Link href="/">
            <Image
              className="mx-auto block pt-8 sm:hidden"
              src="/images/logo.svg"
              alt="멍멍일지 로고"
              width={100}
              height={78}
              priority
            />
          </Link>

          <div className="flex h-[calc(89.4vh-50px)] flex-col justify-between sm:h-[calc(89.4vh-122.5px)]">
            <div className="mt-[34px] text-sm font-medium sm:mt-12 sm:text-[16px]">
              {/* 대시보드 */}
              <Link
                href={'/dashboard'}
                className={`sidebar__content group relative ${pathname === '/dashboard' && 'sidebar__content-active'}`}
              >
                <div
                  className={`absolute ${pathname === '/dashboard' && 'opacity-0'}`}
                >
                  <Icon width="24px" height="24px" left="-26px" top="-23px" />
                </div>
                <div
                  className={`absolute opacity-0 ${pathname === '/dashboard' && 'opacity-100'} `}
                >
                  <Icon width="24px" height="24px" left="-28px" top="-310px" />
                </div>
                <p className="pl-10">대시보드</p>
              </Link>

              {/* 일정 */}
              <Link
                href={'/schedule'}
                className={`sidebar__content group relative ${pathname === '/schedule' && 'sidebar__content-active'}`}
              >
                <div
                  className={`absolute ${pathname === '/schedule' && 'opacity-0'}`}
                >
                  <Icon width="24px" height="24px" left="-66px" top="-21px" />
                </div>
                <div
                  className={`absolute opacity-0 ${pathname === '/schedule' && 'opacity-100'} `}
                >
                  <Icon width="24px" height="24px" left="-68px" top="-308px" />
                </div>
                <p className="pl-10">일정</p>
              </Link>

              {/* 멍멍일지 */}
              <Link
                href="/diary"
                className={`sidebar__content group relative ${pathname.startsWith('/diary') && 'sidebar__content-active'}`}
              >
                <div
                  className={`absolute ${pathname.startsWith('/diary') && 'opacity-0'}`}
                >
                  <Icon width="24px" height="24px" left="-108px" top="-21px" />
                </div>
                <div
                  className={`absolute opacity-0 ${pathname.startsWith('/diary') && 'opacity-100'} `}
                >
                  <Icon width="24px" height="24px" left="-110px" top="-308px" />
                </div>
                <span className="pl-10">멍멍일지</span>
              </Link>

              {/* 게시판 */}
              <Link
                href={'/post/question'}
                className={`sidebar__content group relative ${pathname.includes('/post') && 'sidebar__content-active'}`}
              >
                <div
                  className={`absolute ${pathname.includes('/post') && 'opacity-0'}`}
                >
                  <Icon width="28px" height="16px" left="-144px" top="-25px" />
                </div>
                <div
                  className={`absolute opacity-0 ${pathname.includes('/post') && 'opacity-100'} `}
                >
                  <Icon width="28px" height="16px" left="-146px" top="-312px" />
                </div>
                <p className="pl-10">게시판</p>
              </Link>

              {/* 가이드 */}
              <Link
                href={'/guide'}
                className={`sidebar__content group relative ${pathname === '/guide' && 'sidebar__content-active'}`}
              >
                <div
                  className={`absolute ${pathname === '/guide' && 'opacity-0'}`}
                >
                  <Icon width="25px" height="26px" left="-186px" top="-20px" />
                </div>
                <div
                  className={`absolute opacity-0 ${pathname === '/guide' && 'opacity-100'} `}
                >
                  <Icon width="25px" height="26px" left="-197px" top="-309px" />
                </div>
                <p className="pl-10">멍초보가이드</p>
              </Link>

              {/* 관리자 */}
              {(userInfo?.role === 'ROLE_ADMIN' || role) && (
                <Link
                  href={'/admin'}
                  className={`sidebar__content group relative ${pathname.startsWith('/admin') && 'sidebar__content-active'} `}
                >
                  <div
                    className={`absolute ${pathname === '/admin' && 'opacity-0'}`}
                  >
                    <Icon
                      width="24px"
                      height="26px"
                      left="-342px"
                      top="-20px"
                    />
                  </div>
                  <div
                    className={`absolute opacity-0 ${pathname.startsWith('/admin') && 'opacity-100'} `}
                  >
                    <Icon
                      width="24px"
                      height="26px"
                      left="-382px"
                      top="-20px"
                    />
                  </div>
                  <p className="pl-10">관리자페이지</p>
                </Link>
              )}
            </div>
            <div className="text-sm font-medium sm:text-[16px]">
              <div>
                <div
                  className="relative flex h-[52px] w-[220px] cursor-pointer items-center gap-3 py-3 pl-8 sm:pl-6"
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
                    className="flex h-[52px] w-[220px] cursor-pointer items-center gap-3 py-3 pl-8 sm:hidden sm:pl-6"
                  >
                    <Image
                      className="h-6 w-6 cursor-pointer rounded-full"
                      src={userInfo?.imgUrl || user_default_image}
                      alt="유저 프로필"
                      width={24}
                      height={24}
                      priority
                    />
                    <p className="dark:text-[var(--color-background)]">
                      마이페이지
                    </p>
                  </Link>
                  <div
                    className="flex h-[52px] w-[220px] cursor-pointer items-center gap-2 py-3 pl-8 sm:pl-6"
                    onClick={handleLogout}
                  >
                    <Icon
                      width="28px"
                      height="28px"
                      left="-264px"
                      top="-18px"
                    />
                    <p className="dark:text-[var(--color-background)]">
                      로그아웃
                    </p>
                  </div>
                </>
              ) : (
                <Link
                  href={'/login'}
                  className="flex h-[52px] w-[220px] cursor-pointer items-center gap-2 py-3 pl-8 sm:pl-6"
                >
                  <Icon width="28px" height="28px" left="-264px" top="-18px" />
                  <p className="dark:text-[var(--color-background)]">로그인</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
