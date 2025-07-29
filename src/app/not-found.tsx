import Button from '@/components/common/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className="flex min-h-screen w-screen items-center justify-center bg-[url('/images/404-mobile-new.png')] bg-cover sm:bg-[url('/images/bg.png')] dark:bg-[url('/images/dark-bg.png')]">
        <div className="flex h-[90vh] w-[90vw] justify-center bg-cover bg-center bg-no-repeat sm:rounded-[50px] sm:bg-[url('/images/404-new.png')] dark:sm:bg-[url('/images/404-dark.png')]">
          <div className="flex flex-col items-center gap-8 pt-45 sm:gap-12">
            <div className="flex cursor-default flex-col items-center justify-center gap-3 text-xl font-bold sm:text-[40px]">
              <h1 className="text-[var(--color-primary-500)]">404!</h1>
              <h1>냄새를 따라왔는데... 여긴 아닌가봐요.</h1>
              <h1>다시 발자국을 따라가볼까요?</h1>
            </div>
            <Link href={'/'}>
              <Button className="w-50 bg-[var(--color-primary-300)] pb-4 text-base hover:bg-[var(--color-primary-500)] sm:h-20 sm:w-70 sm:text-2xl">
                메인으로 가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
