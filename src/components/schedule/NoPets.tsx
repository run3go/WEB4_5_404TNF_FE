import Image from 'next/image';
import NoPetImg from '../../assets/images/alternative-image.svg';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStoe';

export default function NoPets() {
  const { userInfo } = useAuthStore();

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <Image
          className="mt-5"
          src={NoPetImg}
          alt="로고 이미지"
          width={146}
          height={112}
        />
        <div className="flex cursor-default flex-col items-center gap-2 text-[20px]">
          <p>반려견 정보가 없어요!</p>
          <p>일정을 등록하려면 먼저 반려견 프로필을 등록해주세요.</p>
        </div>
        <Link
          href={`/profile/${userInfo?.userId}`}
          className="rounded-[50px] bg-[var(--color-pink-300)] px-7 py-5 text-[20px] shadow-[0_3px_8px_rgba(0,0,0,0.24)] hover:bg-[var(--color-pink-500)]"
        >
          프로필 등록하러 가기
        </Link>
      </div>
    </>
  );
}
