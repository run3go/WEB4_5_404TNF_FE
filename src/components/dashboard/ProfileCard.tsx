import dog from '@/assets/images/dog_img.png';
import Image from 'next/image';
import Card from '../common/Card';
import Icon from '../common/Icon';

export default function ProfileCard() {
  return (
    <Card className="flex w-full max-w-[560px] flex-row-reverse justify-end sm:flex-row sm:justify-between">
      <ul className="flex flex-col gap-3 text-sm font-medium sm:gap-[18px] sm:text-lg">
        <li className="flex items-center">
          <span className="mr-3 text-[var(--color-grey)]">이름</span>
          <span>이마음</span>
          <Icon
            className="ml-2"
            width="12px"
            height="19px"
            left="-110px"
            top="-79px"
          />
        </li>
        <li>
          <span className="mr-3 text-[var(--color-grey)]">견종</span>
          <span>골든 리트리버</span>
        </li>
        <li>
          <span className="mr-3 text-[var(--color-grey)]">나이</span>
          <span>5년 6개월</span>
        </li>
        <li>
          <span>
            가족이 된지{' '}
            <strong className="font-medium text-[var(--color-primary-500)]">
              1943
            </strong>
            일
          </span>
        </li>
      </ul>
      <Image
        className="mr-3 h-[126px] w-[126px] rounded-xl sm:mr-0 sm:h-40 sm:w-40"
        src={dog}
        alt="강아지 이미지"
        width={162}
        height={162}
        priority
      ></Image>
    </Card>
  );
}
