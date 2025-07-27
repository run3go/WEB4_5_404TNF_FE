'use client';

import Link from 'next/link';
import Image from 'next/image';
import symbol from '@/assets/images/alternative-image.svg';
import LogCard from '@/components/diary/LogCard';
import { useEffect, useRef } from 'react';
import DiaryCardSkeleton from './DiaryCardSkeleton';

type Props = {
  isLoading: boolean;
  diaryList: DiaryItem[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
};

export default function DiaryListSection({
  isLoading,
  diaryList,
  fetchNextPage,
  hasNextPage,
}: Props) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);
  if (isLoading) {
    return (
      <ul className="scrollbar-hidden flex flex-col gap-5 pt-2 pb-4 sm:h-[625px] sm:flex-row sm:flex-wrap sm:gap-[53px] sm:px-3 sm:pt-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <li
            key={`initial-skeleton-${idx}`}
            className="w-full sm:basis-[calc(33%-31px)]"
          >
            <DiaryCardSkeleton />
          </li>
        ))}
      </ul>
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
      <div ref={loaderRef} className="h-0 w-full" />
      {hasNextPage &&
        Array.from({ length: 6 }).map((_, idx) => (
          <li
            key={`skeleton-${idx}`}
            className="w-full sm:basis-[calc(33%-31px)]"
          >
            <DiaryCardSkeleton />
          </li>
        ))}
    </ul>
  );
}
