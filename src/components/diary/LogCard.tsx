import dog from '@/assets/images/dog_img.png';
import Image from 'next/image';
import Card from '../common/Card';

export default function LogCard() {
  return (
    <Card className="card__hover flex flex-col gap-3 border-1 border-[var(--color-primary-500)]">
      <div className="mb-2 flex justify-between border-b border-[var(--color-primary-500)] pb-3">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            src={dog}
            alt="프로필 이미지"
            width={32}
            height={32}
          />
          <span>이마음</span>
        </div>
        <span>2025. 7. 3</span>
      </div>
      <div>
        <span className="inline-block w-[78px] text-[var(--color-primary-500)]">
          몸무게
        </span>
        <span>36.3kg</span>
      </div>
      <div>
        <span className="inline-block w-[78px] text-[var(--color-primary-500)]">
          산책시간
        </span>
        <span>2시간 45분</span>
      </div>
      <div>
        <span className="text-[var(--color-primary-500)]">관찰노트</span>
        <p className="mt-4">
          더워서 걸을 때 좀 힘들어함 그거 빼고는 괜찮아 보였음 밥을 좀 적게 먹음
          간식을 많이 먹여서 그런듯 낮잠 자는 시간이 늘어난 것 같음
        </p>
      </div>
    </Card>
  );
}
