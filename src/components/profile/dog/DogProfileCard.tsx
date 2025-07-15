'use client';

import { petBreedData, petSizeData } from '@/assets/data/pet';
import dog from '@/assets/images/dog_img.png';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import Card from '../../common/Card';
import Icon from '../../common/Icon';
import DogProfileEdit from './DogProfileEdit';
import VaccineModal from './VaccineModal';

export default function DogProfileCard({
  togglePage,
  profile,
}: {
  togglePage?: () => void;
  profile: PetProfile;
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);

  const breed = petBreedData.find(
    (data) => data.value === profile.breed,
  )?.label;
  const size = petSizeData.find((data) => data.value === profile.size)?.label;

  const calculateAge = () => {
    const numAge = Number(profile.age);
    const year = Math.floor(numAge / 12);
    const month = numAge % 12;
    return `${year ? year + '년 ' : ''}${month ? month + '개월' : ''}`;
  };
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  const closeVaccineModal = () => {
    setIsVaccineModalOpen(false);
  };
  console.log(profile);
  return (
    <Card className="card__hover m-0 max-w-150 p-0 sm:my-7 sm:ml-4 sm:p-0">
      <h3 className="rounded-t-[12px] bg-[var(--color-primary-300)] py-[9px] text-center text-sm sm:py-[18px] sm:text-xl">
        {profile.name}
      </h3>
      <div
        className="flex gap-8 px-6 py-4"
        onClick={() =>
          isMobile && togglePage ? togglePage() : setIsProfileModalOpen(true)
        }
      >
        <Image
          className="h-31 w-31 rounded-[12px] sm:h-55 sm:w-55"
          src={dog}
          alt="강아지 프로필"
          priority
        />
        <div className="flex flex-col justify-around text-sm sm:text-base">
          <div>
            <span className="profile-title-style">견종</span>
            {breed} ({size})
          </div>
          <div>
            <span className="profile-title-style">나이</span>
            {calculateAge()}
          </div>
          <div className="flex items-center">
            <span className="profile-title-style">성별</span>
            <span>{profile.sex ? '여아' : '남아'}</span>
            {profile.sex ? (
              <Icon
                className="mr-2 ml-1 inline-block"
                width="12px"
                height="19px"
                left="-110px"
                top="-79px"
              />
            ) : (
              <Icon
                className="mr-2 ml-1 inline-block"
                width="16px"
                height="16px"
                left="-71px"
                top="-80px"
              />
            )}
            <span>(중성화 {profile.isNeutered ? 'O' : 'X'})</span>
          </div>
          <div className="hidden sm:block">
            <span className="mr-3 text-[var(--color-grey)]">등록번호</span>
            {profile.registNumber}
          </div>
          <span>
            가족이 된지
            <strong className="font-medium text-[var(--color-primary-500)]">
              {profile.metday}
            </strong>
            일
          </span>
          <button
            className="cursor-pointer self-start underline hover:text-[var(--color-primary-500)]"
            onClick={(e) => {
              e.stopPropagation();
              setIsVaccineModalOpen(true);
            }}
          >
            예방접종 정보 보기
          </button>
        </div>
      </div>
      {/* 반려견 정보 등록/수정 (스크롤 막기 기능 구현 필요) */}
      {isProfileModalOpen &&
        createPortal(
          <DogProfileEdit closeModal={closeProfileModal} />,
          document.body,
        )}
      {isVaccineModalOpen &&
        createPortal(
          <VaccineModal closeModal={closeVaccineModal} />,
          document.body,
        )}
    </Card>
  );
}
