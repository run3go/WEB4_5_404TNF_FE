import Icon from '../common/Icon';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { usePathname } from 'next/navigation';

export default function PostCreateImages({
  pickedImages,
  setPickedImages,
}: {
  pickedImages: (File | string)[];
  setPickedImages: Dispatch<SetStateAction<(File | string)[]>>;
}) {
  const path = usePathname();
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
      <div
        className={`flex items-end gap-6 ${path.includes('create') ? 'w-[55vw] pl-[8.37vw]' : 'w-[45vw]'}`}
      >
        <label
          className="flex h-[120px] w-[120px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] bg-[#E1E1E1]"
          htmlFor="inputFile"
        >
          <Icon width="22px" height="22px" left="-301px" top="-121px" />
          <p className="text-[16px] font-medium">{`${pickedImages?.length} / 5`}</p>
        </label>
        <input
          type="file"
          id="inputFile"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />

        {pickedImages?.length > 0 && (
          <Swiper
            spaceBetween={24}
            slidesPerView="auto"
            className={`!h-[135px] ${path.includes('create') ? '!w-[45vw] !pr-[1.4vw]' : '!w-[36.8vw]'} `}
          >
            {pickedImages?.map((preview, i) => (
              <SwiperSlide key={i} className="!w-[120px]">
                <div className="relative h-[120px] w-[120px]">
                  <Image
                    className="mt-[15px] rounded-[20px] object-cover"
                    src={getPreviewUrl(preview)}
                    alt={`선택한 이미지${i}`}
                    fill
                    priority
                  />
                  <div
                    className="absolute top-[5px] right-[-10px] z-[300px] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-[#FCC389]"
                    onClick={() => handleRemoveImage(i)}
                  >
                    <Icon
                      width="12px"
                      height="12px"
                      left="-72px"
                      top="-126px"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
