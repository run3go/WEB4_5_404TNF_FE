'use client';

import { petBreedData, petSizeData } from '@/assets/data/pet';
import dog from '@/assets/images/dog_img.png';
import { usePetProfile, usePetVaccine } from '@/lib/hooks/useProfiles';
import { calculateAge } from '@/lib/utils/date';
import { useAuthStore } from '@/stores/authStoe';
import { useProfileStore } from '@/stores/profileStore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { twMerge } from 'tailwind-merge';
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
  const params = useParams();
  const userId = params?.userId as string;
  const userInfo = useAuthStore((state) => state.userInfo);
  const isMyProfile = userInfo?.userId === Number(userId);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const { data: vaccineData } = usePetVaccine(profile.petId, isMyProfile);
  const { data: profileData } = usePetProfile(profile.petId, isMyProfile);

  const selectPet = useProfileStore((state) => state.selectPet);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);

  const breed = petBreedData.find(
    (data) => data.value === profile.breed,
  )?.label;
  const size = petSizeData.find((data) => data.value === profile.size)?.label;

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  const closeVaccineModal = () => {
    setIsVaccineModalOpen(false);
  };

  const openProfileModal = () => {
    if (!isMyProfile) return;
    setIsProfileModalOpen(true);
  };
  const openVaccineModal = async () => {
    if (!isMyProfile) return;
    setIsVaccineModalOpen(true);
  };
  const openPage = () => {
    if (!togglePage || !isMyProfile) return;
    selectPet(profile.petId);
    togglePage();
  };

  return (
    <Card className="card__hover m-0 max-w-150 p-0 sm:my-7 sm:ml-4 sm:p-0">
      <h3 className="rounded-t-[12px] bg-[var(--color-primary-300)] py-[9px] text-center text-sm sm:py-[14px] sm:text-lg">
        {profile.name}
      </h3>
      <div
        className="flex gap-8 px-6 py-4"
        onClick={() =>
          isMobile && togglePage ? openPage() : openProfileModal()
        }
      >
        <Image
          className="h-31 w-31 rounded-[12px] sm:h-55 sm:w-55"
          src={dog}
          alt="강아지 프로필"
          priority
        />
        <div
          className={twMerge(
            'flex flex-col justify-center gap-3 text-sm sm:text-base',
          )}
        >
          <div>
            <span className="profile-title-style">견종</span>
            {breed} ({size})
          </div>
          <div>
            <span className="profile-title-style">나이</span>
            {calculateAge(Number(profile.age))}
          </div>
          <div className="flex items-center">
            <span className="profile-title-style">성별</span>
            <span>{profile.sex ? '남아' : '여아'}</span>
            {profile.sex ? (
              <Icon
                className="mr-2 ml-1 inline-block"
                width="16px"
                height="16px"
                left="-71px"
                top="-80px"
              />
            ) : (
              <Icon
                className="mr-2 ml-1 inline-block"
                width="12px"
                height="19px"
                left="-110px"
                top="-79px"
              />
            )}
            <span>(중성화 {profile.isNeutered ? 'O' : 'X'})</span>
          </div>
          {isMyProfile && (
            <div className="hidden sm:block">
              <span className="mr-3 text-[var(--color-grey)]">등록번호</span>
              {profile.registNumber || '-'}
            </div>
          )}
          <span>
            가족이 된지{' '}
            <strong className="font-medium text-[var(--color-primary-500)]">
              {profile.days}
            </strong>
            일
          </span>
          {isMyProfile && (
            <button
              className="cursor-pointer self-start underline hover:text-[var(--color-primary-500)]"
              onClick={(e) => {
                e.stopPropagation();
                openVaccineModal();
              }}
            >
              예방접종 정보 보기
            </button>
          )}
        </div>
      </div>
      {isProfileModalOpen &&
        createPortal(
          <DogProfileEdit
            profileData={profileData}
            closeModal={closeProfileModal}
            petId={profile.petId}
          />,
          document.body,
        )}
      {isVaccineModalOpen &&
        createPortal(
          <VaccineModal
            vaccineData={vaccineData}
            closeModal={closeVaccineModal}
            petId={profile.petId}
          />,
          document.body,
        )}
    </Card>
  );
}
