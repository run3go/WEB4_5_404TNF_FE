import Image from 'next/image';
import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

export default function ImageField({
  image,
  alt,
  isMobile = false,
  handleImage,
}: {
  image: string;
  alt: string;
  isMobile?: boolean;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <label
        className={twMerge(
          'group mb-10 flex cursor-pointer flex-col items-center gap-4',
          isMobile && 'mb-9 self-center',
        )}
        htmlFor={alt}
      >
        <Image
          className={twMerge(
            'h-30 w-30 rounded-full object-cover',
            isMobile && 'h-25 w-25',
          )}
          src={image}
          alt={alt}
          width={120}
          height={120}
          priority
        />
        <span className="text-[var(--color-grey)] group-hover:text-[var(--color-black)]">
          사진 선택하기
        </span>
      </label>
      {/* <Icon
        className="absolute top-0 right-1 cursor-pointer"
        width="28px"
        height="28px"
        left="-414px"
        top="-375px"
        onClick={resetImage}
      /> */}
      <input
        hidden
        id={alt}
        type="file"
        accept="image/*"
        onChange={handleImage}
      />
    </div>
  );
}
