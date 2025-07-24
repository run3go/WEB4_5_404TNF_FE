'use client';
import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import LogCard from '@/components/diary/LogCard';
import DateInput from '@/components/common/DateInput';
import Link from 'next/link';

import { useCallback, useEffect, useState } from 'react';
import { getDiaryList, getPetsByUserId } from '@/api/diary';
import { useRouter } from 'next/navigation';
import DiaryPagination from '@/components/diary/DiaryPagination';

type Option = { value: string; label: string };
type DiaryItem = {
  lifeRecordId: number;
  pet: { name: string; url: string | null };
  recordAt: string;
  weight: number | null;
  walkingTime: number;
  content: string;
};

export default function Diary() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetsByUserId(
          Number(sessionStorage.getItem('userId')),
        );
        setPets(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPets();
  }, []);

  const petOptions: Option[] = [
    { value: 'all', label: '모든 강아지' },
    ...pets.map((pet) => ({
      value: pet.petId.toString(),
      label: pet.name,
    })),
  ];

  const [diaryList, setDiaryList] = useState<DiaryItem[]>([]);

  const fetchDiaryList = useCallback(async () => {
    try {
      const recordAt = selectedDate
        ? selectedDate.toISOString().slice(0, 10)
        : undefined;
      const petId = selectedPetId !== 'all' ? Number(selectedPetId) : undefined;

      const res = await getDiaryList({
        petId,
        recordAt,
        page: currentPage,
      });

      setDiaryList(res.data || []);
      setTotalPages(res.pageInfo.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  }, [selectedDate, selectedPetId, currentPage]);

  useEffect(() => {
    fetchDiaryList();
  }, [fetchDiaryList]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <main className="flex h-full flex-col items-center p-6 sm:block sm:p-0 sm:px-12 sm:py-7">
      <div className="mb-3 flex w-full justify-between">
        <div className="flex w-full justify-between gap-5 sm:justify-start sm:gap-6 sm:pl-3">
          <div className="flex-1 sm:w-[220px] sm:flex-none">
            <DateInput
              selected={selectedDate}
              setSelected={setSelectedDate}
              showAllDate
              disableFuture={true}
              className="rounded-xl border-1 border-[var(--color-primary-500)] text-sm sm:text-base"
              align="left"
            />
          </div>
          <div className="flex-1 text-sm sm:w-[178px] sm:flex-none sm:text-base">
            <SelectBox
              value={selectedPetId}
              setValue={setSelectedPetId}
              options={petOptions}
              width="100%"
              borderColor="var(--color-primary-500)"
              footstep={!isMobile}
              hasBorder
            />
          </div>
          {selectedDate && (
            <button
              className="ml-2 shrink-0 cursor-pointer text-xs text-[var(--color-primary-500)] underline sm:text-sm"
              onClick={() => setSelectedDate(undefined)}
            >
              전체 날짜
            </button>
          )}
        </div>
        <Link
          className="hidden items-center gap-2 sm:flex"
          href={'/diary/write'}
        >
          <Icon width="14px" height="14px" left="-231px" top="-79px" />
          <span className="inline-block w-20 font-medium">기록하기</span>
        </Link>
      </div>
      <div className="w-full">
        <ul className="scrollbar-hidden flex flex-col gap-5 pt-2 pb-4 sm:h-[625px] sm:flex-row sm:flex-wrap sm:gap-[53px] sm:overflow-y-scroll sm:px-3 sm:pt-5">
          {diaryList.length === 0 ? (
            <p className="w-full text-center">기록이 없습니다.</p>
          ) : (
            diaryList.map((item) => (
              <li
                key={item.lifeRecordId}
                className="w-full sm:basis-[calc(33%-31px)]"
              >
                <LogCard
                  petName={item.pet.name}
                  recordAt={item.recordAt}
                  weight={item.weight}
                  walkingTime={item.walkingTime}
                  content={item.content}
                />
              </li>
            ))
          )}
        </ul>
      </div>

      <DiaryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {/* mobile: post button */}
      <div
        className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden"
        onClick={() => router.push('/diary/write')}
      >
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
    </main>
  );
}
