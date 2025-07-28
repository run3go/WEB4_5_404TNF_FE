import { petBreedData } from '@/assets/data/pet';
import defaultDogProfile from '@/assets/images/default-dog-profile.svg';
import { calculateAge, calculateMetDay } from '@/lib/utils/date';
import Image from 'next/image';
import Card from '../common/Card';
import Icon from '../common/Icon';

export default function ProfileCard({
  profile,
}: {
  profile?: DashboardProfile;
}) {
  if (!profile) return;
  const breedName = petBreedData
    .filter((breed) => breed.value === profile.breed)
    .map((breed) => breed.label);
  console.log(profile);
  return (
    <Card className="flex w-full flex-row-reverse justify-end sm:flex-row sm:justify-between">
      <ul className="flex flex-col gap-3 text-sm font-medium sm:gap-[12px] sm:text-lg">
        <li className="flex items-center">
          <span className="mr-3 text-[var(--color-grey)]">이름</span>
          <span>{profile.name}</span>
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
        <li>
          <span className="mr-3 text-[var(--color-grey)]">견종</span>
          <span>{breedName}</span>
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
        className="mr-3 h-[126px] w-[126px] rounded-xl sm:mr-0 sm:h-[150px] sm:w-[150px]"
        src={profile.image || defaultDogProfile}
        alt="강아지 이미지"
        width={150}
        height={150}
        priority
      ></Image>
    </Card>
  );
}
