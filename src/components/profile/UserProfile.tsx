import defaultProfile from '@/assets/images/default-profile.svg';
import Image from 'next/image';
import Icon from '../common/Icon';

export default function UserProfile() {
  return (
    <div className="mb-20">
      <h2 className="mr-7 inline text-2xl text-[var(--color-primary-500)]">
        마이 프로필
      </h2>
      <button className="inline-flex h-10 w-25 cursor-pointer items-center justify-center gap-2 rounded-[30px] border-1 border-[var(--color-grey)]">
        <Icon width="14px" height="14px" left="-225px" top="-168px" />
        <span className="text-[var(--color-grey)]">수정</span>
      </button>
      <div className="mt-7 flex gap-7">
        <Image
          className="rounded-full"
          src={defaultProfile}
          alt="프로필 이미지"
          width={160}
          height={160}
        />
        <div className="flex flex-col justify-around text-xl">
          <div>
            <span className="inline-block w-[93px] text-[var(--color-grey)]">
              이메일
            </span>
            user@naver.com
          </div>
          <div>
            <span className="inline-block w-[93px] text-[var(--color-grey)]">
              이름
            </span>
            홍길동
          </div>
          <div>
            <span className="inline-block w-[93px] text-[var(--color-grey)]">
              닉네임
            </span>
            닉네임
          </div>
          <div>
            <span className="inline-block w-[93px] text-[var(--color-grey)]">
              가입유형
            </span>
            NAVER
          </div>
        </div>
      </div>
    </div>
  );
}
