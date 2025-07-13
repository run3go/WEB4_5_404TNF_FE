import Image from 'next/image';
import Link from 'next/link';
import Card from './Card';
import Icon from './Icon';

export default function Header() {
  return (
    <>
      <div className="mb-[2.6vh] hidden items-center justify-end gap-7 pr-[2.43vw] sm:flex">
        <Icon
          width="28px"
          height="28px"
          left="-304px"
          top="-18px"
          className="cursor-pointer"
        />
        <Link href={'/profile/1'}>
          <div className="h-9 w-9 cursor-pointer rounded-full bg-black"></div>
        </Link>
      </div>
      <Card className="fixed top-0 right-0 left-0 z-100 flex h-18 w-screen items-center justify-center rounded-none bg-[var(--color-background)] px-4 sm:hidden">
        <Icon
          className="absolute left-6"
          width="18px"
          height="10px"
          left="-340px"
          top="-80px"
        />
        <Image
          src={'/images/mobile-logo.svg'}
          alt="모바일 로고"
          width={117}
          height={20}
          priority
        />
      </Card>
      {/* 헤더 아래 공간 */}
      <div className="h-18 w-screen sm:hidden" />
    </>
  );
}
