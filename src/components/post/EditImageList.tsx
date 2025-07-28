'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Icon from '../common/Icon';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export default function ImageList({
  pickedImages,
  setPickedImages,
}: {
  pickedImages: (File | string)[];
  setPickedImages: Dispatch<SetStateAction<(File | string)[]>>;
}) {
  const objectUrls = useRef<string[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxSelectable = 5 - pickedImages.length;
    const selectedFiles = Array.from(files).slice(0, maxSelectable);

    if (selectedFiles.length < files.length) {
      alert('이미지는 최대 5개까지 업로드할 수 있어요!');
    }

    setPickedImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    setPickedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const getPreviewUrl = (img: File | string): string => {
    if (typeof img === 'string') return img;

    const url = URL.createObjectURL(img);
    objectUrls.current.push(url);
    return url;
  };

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.current = [];
    };
  }, []);
  return (
    <>
      <div className="flex w-[45vw] items-end gap-2 px-4">
        <label
          className="mt-[8px] flex h-[80px] w-[80px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] bg-[#E1E1E1]"
          htmlFor="inputMFile"
        >
          <Icon width="22px" height="22px" left="-301px" top="-121px" />
          <p className="text-[16px] font-medium">{`${pickedImages?.length ?? 0} / 5`}</p>
        </label>
        <input
          type="file"
          id="inputMFile"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />

        {(pickedImages?.length ?? 0) > 0 && (
          <div className="relative px-1 sm:mt-10 sm:px-[54px]">
            <Swiper
              spaceBetween={12}
              slidesPerView="auto"
              className="!h-[88px] !w-[68.9vw] !pr-[2.4vw]"
            >
              {pickedImages.map((preview, i) => (
                <SwiperSlide key={i} className="!w-[80px]">
                  <div className="relative flex h-[80px] w-[80px] items-end">
                    <Image
                      className="mt-[8px] rounded-[10px] object-cover"
                      src={getPreviewUrl(preview)}
                      alt={`선택한 이미지${i}`}
                      fill
                      priority
                    />
                    <div
                      className="absolute top-0 right-[-8px] flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full bg-[#FCC389]"
                      onClick={() => handleRemoveImage(i)}
                    >
                      <Icon
                        width="12px"
                        height="12px"
                        left="-72px"
                        top="-126px"
                        className="scale-80"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
}
