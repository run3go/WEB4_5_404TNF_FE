'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useRef } from 'react';
import Icon from '../common/Icon';

export default function ImageList({ postImage }: { postImage: PostImage[] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="relative mt-5 px-1 sm:mt-10 sm:px-[54px]">
        <button
          ref={prevRef}
          className="absolute top-1/2 left-[14px] z-10 hidden -translate-y-1/2 text-2xl sm:block"
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
          className="absolute top-1/2 right-[14px] z-10 hidden -translate-y-1/2 text-2xl sm:block"
        >
          <Icon
            width="12px"
            height="20px"
            left="-152px"
            top="-164px"
            className="cursor-pointer"
          />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          slidesPerView="auto"
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
          {postImage?.map((img) => (
            <SwiperSlide
              key={img.articleImgId + img.savePath}
              className="!w-[76.8vw] sm:!w-[300px]"
            >
              <div className="relative flex h-[300px] w-[76.8vw] items-end sm:w-[300px]">
                <Image
                  className="rounded-[10px]"
                  src={img.savePath}
                  alt="포스트 이미지"
                  fill
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
