'use client';

import Link from 'next/link';
import Image from 'next/image';
import symbol from '@/assets/images/alternative-image.svg';
import LogCard from '@/components/diary/LogCard';

interface Props {
  isLoading: boolean;
  diaryList: DiaryItem[];
}

export default function DiaryListSection({ isLoading, diaryList }: Props) {
  if (isLoading) {
    return (
      <div className="mt-40 flex w-full flex-col items-center justify-center gap-1 py-8 sm:mt-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary-500)] border-t-transparent" />
        <span className="text-sm text-[var(--color-grey)]">불러오는 중...</span>
      </div>
    );
  }

  if (diaryList.length === 0) {
    return (
      <div className="mt-40 flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--color-grey)] sm:mt-64 sm:gap-3 sm:py-0">
        <Image
          src={symbol}
          alt="작성된 멍멍일지가 없습니다"
          className="h-auto w-16 sm:w-24"
        />
        <p className="w-full text-center text-sm sm:text-base">
          작성된 멍멍일지가 없습니다
        </p>
      </div>
    );
  }

  return (
    <ul className="scrollbar-hidden mb-10 flex flex-col gap-5 pt-2 pb-4 sm:mb-0 sm:h-[625px] sm:flex-row sm:flex-wrap sm:gap-[53px] sm:overflow-y-scroll sm:px-3 sm:pt-5">
      {diaryList.map((item) => (
        <li
          key={item.lifeRecordId}
          className="w-full sm:basis-[calc(33%-31px)]"
        >
          <Link href={`/diary/${item.lifeRecordId}`}>
            <LogCard
              petName={item.pet.name}
              recordAt={item.recordAt}
              weight={item.weight}
              walkingTime={item.walkingTime}
              content={item.content}
              imageUrl={item.pet.url ?? null}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
