import { useAuthStore } from '@/stores/authStoe';
import Image from 'next/image';
import Link from 'next/link';
import NoPetImg from '../../assets/images/alternative-image.svg';

export default function NoPets({
  content = '일정을 등록하려면',
}: {
  content?: string;
}) {
  const { userInfo } = useAuthStore();

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-8 sm:gap-10">
        <Image
          className="mt-5 w-[100px] sm:h-[112px] sm:w-[146px]"
          src={NoPetImg}
          alt="로고 이미지"
          width={146}
          height={112}
        />
        <div className="flex cursor-default flex-col items-center gap-2 text-sm sm:text-[20px]">
          <p>반려견 정보가 없어요!</p>
          <p>{content} 먼저 반려견 프로필을 등록해주세요.</p>
        </div>
        <Link
          href={`/profile/${userInfo?.userId}`}
          className="rounded-[50px] bg-[var(--color-pink-300)] px-4 py-3 text-sm shadow-[0_3px_8px_rgba(0,0,0,0.24)] hover:bg-[var(--color-pink-500)] sm:px-7 sm:py-5 sm:text-[20px] dark:text-[var(--color-black)]"
        >
          프로필 등록하러 가기
        </Link>
      </div>
    </>
  );
}
