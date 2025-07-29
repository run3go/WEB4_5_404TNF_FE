import Button from '@/components/common/Button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404',
};

export default function NotFound() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center gap-12 bg-[url('/images/404-mobile.png')] bg-cover bg-center bg-no-repeat pt-45 sm:bg-[url('/images/404.png')]">
        <div className="flex cursor-default flex-col items-center gap-3 text-xl font-bold sm:text-[40px]">
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
    </>
  );
}
