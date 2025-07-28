'use client';
import Icon from '@/components/common/Icon';
import DiaryListHeader from '@/components/diary/DiaryListHeader';
import DiaryListSection from '@/components/diary/DiaryListSection';
import Confirm from '@/components/common/Confirm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetDiaryList } from '@/lib/hooks/diary/api/useGetDiaryList';
import { useGetPets } from '@/lib/hooks/diary/api/useGetPets';

export default function Diary() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedPetId, setSelectedPetId] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const userId =
    typeof window !== 'undefined'
      ? Number(sessionStorage.getItem('userId'))
      : null;

  const { data: pets = [] } = useGetPets(userId);

  const petOptions: { value: string; label: string }[] = [
    { value: 'all', label: '모든 강아지' },
    ...pets.map((pet) => ({
      value: pet.petId.toString(),
      label: pet.name,
    })),
  ];

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiaryList({
    petId: selectedPetId !== 'all' ? Number(selectedPetId) : undefined,
    recordAt: selectedDate ? formatDate(selectedDate) : undefined,
  });

  const diaryList = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <main className="scrollbar-hidden flex h-full flex-col items-center overflow-y-auto p-6 sm:block sm:p-0 sm:px-12 sm:py-7">
      <DiaryListHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedPetId={selectedPetId}
        setSelectedPetId={setSelectedPetId}
        petOptions={petOptions}
        petsLength={pets.length}
        isMobile={isMobile}
        onClickWrite={() => {
          if (pets.length === 0) {
            setShowConfirm(true);
          } else {
            router.push('/diary/write');
          }
        }}
      />
      <div className="w-full">
        <DiaryListSection
          isLoading={isLoading}
          diaryList={diaryList}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
      {/* mobile: post button */}
      <div
        className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden"
        onClick={() => {
          if (pets.length === 0) {
            setShowConfirm(true);
          } else {
            router.push('/diary/write');
          }
        }}
      >
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
      {showConfirm && (
        <Confirm
          description={`아직 등록된 강아지가 없어요.\n먼저 강아지를 등록해주세요!`}
          confirmText="확인"
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            router.push(`/profile/${sessionStorage.getItem('userId')}`);
          }}
        />
      )}
    </main>
  );
}
