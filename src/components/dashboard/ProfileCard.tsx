import dog from '@/assets/images/dog_img.png';
import Image from 'next/image';
import Card from '../common/Card';

export default function ProfileCard() {
  return (
    <Card className="flex h-[210px] w-[558px] justify-between">
      <ul className="flex flex-col gap-[18px] text-xl font-medium">
        <li>
          <span className="mr-3 text-[var(--gray)]">이름</span>
          <span>이마음</span>
        </li>
        <li>
          <span className="mr-3 text-[var(--gray)]">견종</span>
          <span>골든 리트리버</span>
        </li>
        <li>
          <span className="mr-3 text-[var(--gray)]">나이</span>
          <span>5년 6개월</span>
        </li>
        <li>
          <span>가족이 된지 1943일</span>
        </li>
      </ul>
      <Image
        className="rounded-xl"
        src={dog}
        alt="강아지 이미지"
        width={162}
        height={162}
        priority
      ></Image>
    </Card>
  );
}
