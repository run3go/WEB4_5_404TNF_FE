import { petBreedData } from '@/assets/data/pet';
import defaultDogProfile from '@/assets/images/default-dog-profile.svg';
import { calculateAge, calculateMetDay } from '@/lib/utils/date';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../common/Card';
import Icon from '../common/Icon';

export default function ProfileCard({
  profile,
}: {
  profile?: DashboardProfile;
}) {
  const [profileImage, setProfileImage] = useState(profile?.imgUrl);
  if (!profile) return;
  const breedName = petBreedData
    .filter((breed) => breed.value === profile.breed)
    .map((breed) => breed.label);
  return (
    <Card className="flex w-full flex-row-reverse justify-end sm:flex-row sm:justify-between md:max-[820px]:p-5">
      <ul
        className={twMerge(
          'flex flex-col gap-3 text-sm font-medium sm:gap-[18px] sm:text-base md:gap-[13px] md:text-base',
          '2xl:max-[1640px]:gap-[18px] 2xl:max-[1640px]:text-base',
          'md:max-[820px]:text-sm 2xl:gap-[12px] 2xl:text-lg',
        )}
      >
        <li className="flex items-center">
          <span className="mr-3 text-[var(--color-grey)]">이름</span>
          <span className="sm:inline-blcok truncate max-[400px]:w-25 sm:w-auto">
            {profile.name}
          </span>
          {profile.sex ? (
            <Icon
              className="ml-2"
              width="16px"
              height="16px"
              left="-71px"
              top="-80px"
            />
          ) : (
            <Icon
              className="ml-2"
              width="12px"
              height="19px"
              left="-110px"
              top="-79px"
            />
          )}
        </li>
        <li className="flex items-center">
          <span className="mr-3 text-[var(--color-grey)]">견종</span>
          <span className="sm:inline-blcok max:w-15 truncate sm:w-auto">
            {breedName}
          </span>
        </li>
        <li>
          <span className="mr-3 text-[var(--color-grey)]">나이</span>
          <span>{calculateAge(profile.age)}</span>
        </li>
        <li>
          <span>
            가족이 된지{' '}
            <strong className="text-[var(--color-primary-500)]">
              {calculateMetDay(profile.metDay)}
            </strong>
            일
          </span>
        </li>
      </ul>
      <Image
        className="mr-3 aspect-square h-[120px] w-30 rounded-xl object-cover sm:mr-0 sm:h-[150px] sm:w-auto md:h-[135px] md:max-[820px]:h-30 md:max-[820px]:w-30 xl:h-[138px] 2xl:h-[150px]"
        src={profile.imgUrl || profileImage || defaultDogProfile}
        alt="강아지 이미지"
        width={0}
        height={150}
        priority
        onError={() => setProfileImage(defaultDogProfile)}
      />
    </Card>
  );
}
