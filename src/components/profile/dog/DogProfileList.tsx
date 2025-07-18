'use client';
import alternativeImage from '@/assets/images/alternative-image.svg';
import Card from '@/components/common/Card';
import { usePetProfiles } from '@/lib/hooks/usePetProfiles';
import { useAuthStore } from '@/stores/authStoe';
import { useProfileStore } from '@/stores/profileStore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../common/Icon';
import DogProfileCard from './DogProfileCard';
import DogProfileEdit from './DogProfileEdit';
import RegistCard from './RegistCard';

export default function DogProfileList() {
  const params = useParams();
  const userId = params?.userId as string;
  const userInfo = useAuthStore((state) => state.userInfo);
  const isMyProfile = userInfo?.userId === Number(userId);

  const { data: petProfiles = [] } = usePetProfiles(userId);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const togglePage = useProfileStore((state) => state.toggleEditingPetProfile);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const toggleProfileModal = () => {
    setIsProfileModalOpen((state) => !state);
  };

  return (
    <div className="mb-20 w-full">
      <h2 className="text-sm text-[var(--color-primary-500)] sm:text-xl">
        댕댕이 프로필
      </h2>
      {isMobile ? (
        <div className="mt-6 flex flex-col gap-6">
          {petProfiles &&
            petProfiles.map((profile, index) => (
              <DogProfileCard
                key={index}
                togglePage={togglePage}
                profile={profile}
              />
            ))}
          {isMyProfile && (
            <div onClick={togglePage}>
              <Card className="card__hover flex h-[188px] w-full max-w-150 items-center justify-center p-0 sm:h-[316px]">
                <Icon
                  className="hidden sm:block"
                  width="47px"
                  height="47px"
                  left="-26px"
                  top="-242px"
                />
                <Icon
                  className="block sm:hidden"
                  width="20px"
                  height="20px"
                  left="-266px"
                  top="-75px"
                />
              </Card>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <button
            ref={prevRef}
            className={twMerge(
              'absolute top-1/2 -left-6 z-50 -translate-y-1/2',
              currentPage === 0 ? 'hidden' : '',
            )}
          >
            <Icon
              width="12px"
              height="20px"
              left="-107px"
              top="-164px"
              className="cursor-pointer"
            />
          </button>
          {petProfiles.length > 1 && (
            <button
              ref={nextRef}
              className={twMerge(
                'absolute top-1/2 right-2 z-50 -translate-y-1/2',
                currentPage === petProfiles.length - 1 ? 'hidden' : '',
              )}
            >
              <Icon
                width="12px"
                height="20px"
                left="-152px"
                top="-164px"
                className="cursor-pointer"
              />
            </button>
          )}
          <div className="relative w-full max-w-[calc(598px*2+80px)] overflow-x-hidden">
            <Swiper
              className="w-full overflow-x-hidden"
              modules={[Navigation, Pagination]}
              slidesPerView="auto"
              spaceBetween={50}
              onSlideChange={(swiper) => setCurrentPage(swiper.realIndex)}
              onBeforeInit={(swiper) => {
                if (
                  typeof swiper.params.navigation === 'object' &&
                  swiper.params.navigation !== null
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
            >
              {petProfiles.length === 0 && (
                <SwiperSlide className="!w-[598px]">
                  <Card className="my-7 ml-4 flex h-20 w-full max-w-150 flex-col items-center justify-center p-0 sm:h-[308px]">
                    <Image
                      src={alternativeImage}
                      alt="등록된 강아지가 없어요"
                    />
                    <span className="mt-4 text-[var(--color-grey)]">
                      등록된 강아지가 없어요
                    </span>
                  </Card>
                </SwiperSlide>
              )}
              {petProfiles &&
                petProfiles.map((profile, index) => (
                  <SwiperSlide key={index} className="!w-[598px]">
                    <DogProfileCard profile={profile} />
                  </SwiperSlide>
                ))}
              {isMyProfile && (
                <SwiperSlide className="!w-[598px]">
                  <RegistCard openModal={toggleProfileModal} />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
          {isProfileModalOpen &&
            isMyProfile &&
            createPortal(
              <DogProfileEdit closeModal={toggleProfileModal} petId={0} />,
              document.body,
            )}
        </div>
      )}
    </div>
  );
}
