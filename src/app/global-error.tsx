'use client';

import Button from '@/components/common/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GlobalError() {
  const router = useRouter();
  return (
    <>
      <div className="flex min-h-screen w-screen items-center justify-center bg-[url('/images/404-mobile-new.png')] bg-cover sm:bg-[url('/images/bg.png')] dark:bg-[url('/images/dark-bg.png')]">
        <div className="flex h-[90vh] w-[90vw] justify-center bg-cover bg-center bg-no-repeat sm:rounded-[50px] sm:bg-[url('/images/404-new.png')] dark:sm:bg-[url('/images/404-dark.png')]">
          <div className="flex flex-col items-center gap-8 pt-45 sm:gap-12">
            <div className="flex cursor-default flex-col items-center justify-center gap-3 text-xl font-bold sm:text-[40px]">
              <h1 className="text-[var(--color-primary-500)]">
                잠시 후 다시 확인해주세요 !
              </h1>
              <h1>지금 이 서비스와 연결할 수 없습니다</h1>
              <h1>문제를 해결하기 위해 열심히 노력하고 있습니다.</h1>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
              <Button
                className="w-50 bg-[var(--color-primary-300)] pb-4 text-base hover:bg-[var(--color-primary-500)] sm:h-20 sm:w-[262px] sm:text-2xl"
                onClick={() => router.back()}
              >
                이전으로 가기
              </Button>
              <Link href={'/'}>
                <Button className="w-50 bg-[var(--color-primary-300)] pb-4 text-base hover:bg-[var(--color-primary-500)] sm:h-20 sm:w-[262px] sm:text-2xl">
                  메인으로 가기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
