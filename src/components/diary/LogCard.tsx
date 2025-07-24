import dog from '@/assets/images/dog_img.png';
import Image from 'next/image';
import Card from '../common/Card';

type Props = {
  petName: string;
  recordAt: string;
  weight: number | null;
  walkingTime: number;
  content: string;
};

export default function LogCard({
  petName,
  recordAt,
  weight,
  walkingTime,
  content,
}: Props) {
  return (
    <Card className="card__hover flex flex-col gap-3 border-1 border-[var(--color-primary-500)] text-sm sm:text-base">
      <div className="mb-2 flex justify-between border-b border-[var(--color-primary-500)] pb-3">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            src={dog}
            alt="프로필 이미지"
            width={32}
            height={32}
          />
          <span>{petName}</span>
        </div>
        <span>{recordAt.replace(/-/g, '. ')}</span>
      </div>
      <div>
        <span className="inline-block w-[78px] text-[var(--color-primary-500)]">
          몸무게
        </span>
        <span>{weight !== null ? `${weight} kg` : '-'}</span>
      </div>
      <div>
        <span className="inline-block w-[78px] text-[var(--color-primary-500)]">
          산책시간
        </span>
        <span>
          {walkingTime === 0
            ? '-'
            : `${Math.floor(walkingTime / 60)}시간 ${walkingTime % 60}분`}
        </span>
      </div>
      <div>
        <span className="text-[var(--color-primary-500)]">관찰노트</span>
        <p className="mt-2 line-clamp-2 h-12 overflow-hidden leading-[1.5rem] text-ellipsis">
          {content !== '' ? content : '-'}
        </p>
      </div>
    </Card>
  );
}
