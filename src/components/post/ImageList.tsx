'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import img from '@/assets/images/dog_img.png';
import Image from 'next/image';
import { useRef } from 'react';
import Icon from '../common/Icon';
const IMAGES = [
  { id: 1, image: img },
  { id: 2, image: img },
  { id: 3, image: img },
  { id: 4, image: img },
  { id: 5, image: img },
];

export default function ImageList() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="relative mt-10 px-[54px]">
        <button
          ref={prevRef}
          className="absolute top-1/2 left-[14px] z-10 -translate-y-1/2 text-2xl"
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
          className="absolute top-1/2 right-[14px] z-10 -translate-y-1/2 text-2xl"
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
          onBeforeInit={(swiper) => {
            if (
              typeof swiper.params.navigation === 'object' &&
              swiper.params.navigation !== null
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          slidesPerView={3.6}
        >
          {IMAGES.map((img) => (
            <SwiperSlide key={img.id}>
              <Image
                className="rounded-[30px]"
                src={img.image}
                alt="강아지"
                width={300}
                height={300}
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
