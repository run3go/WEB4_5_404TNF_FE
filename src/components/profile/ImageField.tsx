import d_defaultProfile from '@/assets/images/dark-default-profile.svg';
import defaultProfile from '@/assets/images/default-profile.svg';
import { useThemeStore } from '@/stores/themeStore';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
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
  const theme = useThemeStore((state) => state.theme);
  const [error, setError] = useState(false);
  const fallbackImage = theme === 'dark' ? d_defaultProfile : defaultProfile;

  const getImageSrc = () => {
    if (error) return fallbackImage;
    if (image) return image;
    return fallbackImage;
  };
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
          src={getImageSrc()}
          alt={alt}
          width={120}
          height={120}
          priority
          onError={() => setError(true)}
        />
        <span className="text-[var(--color-grey)] group-hover:text-[var(--color-black)] dark:group-hover:text-[var(--color-background)]">
          사진 선택하기
        </span>
      </label>
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
