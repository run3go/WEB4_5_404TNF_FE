'use client';

import Card from '@/components/common/Card';
import { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../common/Icon';
import DogProfileCard from './DogProfileCard';

export default function DogProfileList() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="mb-20 w-full">
      <h2 className="text-sm text-[var(--color-primary-500)] sm:text-2xl">
        댕댕이 프로필
      </h2>
      {isMobile ? (
        <div className="mt-6 flex flex-col gap-6">
          <DogProfileCard />
          <DogProfileCard />
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
          <button
            ref={nextRef}
            className={twMerge(
              'absolute top-1/2 right-6 z-50 -translate-y-1/2',
              // 반련견 정보 배열의 길이 - 2
              currentPage === 1 ? 'hidden' : '',
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
              <SwiperSlide className="!w-[598px]">
                <DogProfileCard />
              </SwiperSlide>
              <SwiperSlide className="!w-[598px]">
                <DogProfileCard />
              </SwiperSlide>
              <SwiperSlide className="!w-[582px]">
                <div className="pr-10">
                  <Card className="card__hover my-7 ml-4 flex h-20 w-full max-w-150 items-center justify-center p-0 sm:h-[316px]">
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
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
