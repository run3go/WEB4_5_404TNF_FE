import defaultProfile from '@/assets/images/default-profile.svg';
import Icon from '@/components/common/Icon';
import { useProfileStore } from '@/stores/profileStore';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import UserProfileEdit from './UserProfileEdit';

export default function UserProfile({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const togglePage = useProfileStore((state) => state.toggleEditingUserProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mb-18 sm:mb-20">
      <h2 className="mr-7 inline text-sm text-[var(--color-primary-500)] sm:text-xl">
        마이 프로필
      </h2>
      <button
        onClick={() => (isMobile ? togglePage() : setIsModalOpen(true))}
        className="inline-flex h-[26px] w-[66px] cursor-pointer items-center justify-center gap-2 rounded-[30px] border-1 border-[var(--color-grey)] text-[10px] sm:h-10 sm:w-25 sm:text-base"
      >
        <Icon
          className="hidden sm:block"
          width="14px"
          height="14px"
          left="-225px"
          top="-168px"
        />
        <Icon
          className="block sm:hidden"
          width="9px"
          height="9px"
          left="-31px"
          top="-127px"
        />
        <span className="text-[var(--color-grey)]">수정</span>
      </button>
      <div className="mt-7 flex gap-7">
        <Image
          className="h-25 w-25 rounded-full sm:h-40 sm:w-40"
          src={defaultProfile}
          alt="프로필 이미지"
          width={160}
          height={160}
        />
        <div className="flex flex-col justify-around text-xs sm:text-base">
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              이메일
            </span>
            {userProfile.email}
          </div>
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              이름
            </span>
            {userProfile.name}
          </div>
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              닉네임
            </span>
            {userProfile.nickname}
          </div>
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              가입유형
            </span>
            {userProfile.provider}
          </div>
        </div>
      </div>
      {/* 유저 정보 수정 (스크롤 막기 기능 구현 필요) */}

      {isModalOpen &&
        createPortal(
          <UserProfileEdit closeModal={closeModal} />,
          document.body,
        )}
    </div>
  );
}
