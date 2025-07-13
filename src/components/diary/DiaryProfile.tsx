import dog from '@/assets/images/dog_img.png';
import Image from 'next/image';
import Card from '../common/Card';

export default function DiaryProfile() {
  return (
    <Card className="m-0 w-full p-0 sm:p-0">
      <h3 className="rounded-t-[12px] bg-[var(--color-primary-300)] py-2 text-center text-lg">
        이마음
      </h3>
      <div className="flex gap-8 px-6 py-4">
        <Image
          className="h-30 w-30 rounded-[12px]"
          src={dog}
          alt="강아지 프로필"
          priority
        />
        <div className="flex flex-col justify-around text-sm sm:text-base">
          <span>골든 리트리버 (대형견)</span>
          <span>5년 6개월</span>
          <span>
            가족이 된지{' '}
            <strong className="font-medium text-[var(--color-primary-500)]">
              1943
            </strong>
            일
          </span>
        </div>
      </div>
    </Card>
  );
}
