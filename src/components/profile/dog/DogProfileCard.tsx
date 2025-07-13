'use client';

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
}: {
  togglePage?: () => void;
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  const closeVaccineModal = () => {
    setIsVaccineModalOpen(false);
  };

  return (
    <Card className="card__hover m-0 max-w-150 p-0 sm:my-7 sm:ml-4 sm:p-0">
      <h3 className="rounded-t-[12px] bg-[var(--color-primary-300)] py-[9px] text-center text-sm sm:py-[18px] sm:text-xl">
        이마음
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
            골든 리트리버 (대형견)
          </div>
          <div>
            <span className="profile-title-style">나이</span>
            5년 6개월
          </div>
          <div className="flex items-center">
            <span className="profile-title-style">성별</span>
            <span>여아</span>
            <Icon
              className="mr-2 ml-1 inline-block"
              width="12px"
              height="19px"
              left="-110px"
              top="-79px"
            />
            <span>(중성화 O)</span>
          </div>
          <div className="hidden sm:block">
            <span className="mr-3 text-[var(--color-grey)]">등록번호</span>
            410100012761071
          </div>
          <span>
            가족이 된지
            <strong className="font-medium text-[var(--color-primary-500)]">
              1943
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
