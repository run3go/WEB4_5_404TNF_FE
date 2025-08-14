'use client';

import { getPetsByUserId } from '@/api/diary';
import { feedUnit, walkingPace } from '@/assets/data/diary';
import { petBreedData, petSizeData } from '@/assets/data/pet';
import symbol from '@/assets/images/alternative-image.svg';
import d_diary from '@/assets/images/dark-diary.svg';
import diary from '@/assets/images/diary.svg';
import { useDeleteDiary } from '@/lib/hooks/diary/api/useDeleteDiary';
import { useGetDiaryDetail } from '@/lib/hooks/diary/api/useGetDiaryDetail';
import { formatDate, formatTime } from '@/lib/utils/diary/diaryFormat';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Confirm from '../common/Confirm';
import Loading from '../common/Loading';
import MobileTitle from '../common/MobileTitle';
import { Toast } from '../common/Toast';
import Calendar from './Calendar';
import DiaryCard from './DiaryCard';
import DiaryOptionsMenu from './DiaryOptionsMenu';
import DiaryProfile from './DiaryProfile';

export default function DiaryDetailClient({ logId }: { logId: number }) {
  const router = useRouter();

  // diary detail
  const { data, isLoading, error } = useGetDiaryDetail(logId);

  // pet profile
  const [pet, setPet] = useState<PetProfile | null>(null);
  const formatAge = (age: number) => {
    const years = Math.floor(age / 12);
    const months = age % 12;
    return `${years}년 ${months}개월`;
  };
  const getBreedLabel = (breed?: string) =>
    petBreedData.find((b) => b.value === breed)?.label ?? '-';

  const getSizeLabel = (size?: string) =>
    petSizeData.find((s) => s.value === size)?.label ?? '-';
  useEffect(() => {
    const fetchPet = async () => {
      const userId = Number(sessionStorage.getItem('userId')) || null;
      if (!userId || !data?.petId) return;

      const pets: PetProfile[] = await getPetsByUserId(userId);
      const matchedPet = pets.find((p) => p.petId === data.petId);
      setPet(matchedPet || null);
    };

    fetchPet();
  }, [data?.petId]);

  // delete diary
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteMutation = useDeleteDiary();
  const handleDelete = () => {
    setShowConfirm(true);
  };
  const confirmDelete = () => {
    if (!data) return;

    deleteMutation.mutate(data.lifeRecordId, {
      onSuccess: () => {
        Toast.success('멍멍일지 삭제 완료');
        router.push('/diary');
      },
      onError: () => {
        Toast.error('멍멍일지 삭제 실패');
      },
    });
    setShowConfirm(false);
  };

  // options menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(e.target as Node))
        return;
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (isLoading) return <Loading className="size-[320px] md:size-[500px]" />;
  if (error || !data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-64 md:gap-3 md:py-0">
        <Image
          src={symbol}
          alt="작성된 멍멍일지가 없습니다"
          className="ml-[-8px] h-auto w-16 md:w-24"
        />
        <p className="w-full text-center text-sm text-[var(--color-grey)] md:text-base">
          존재하지 않는 멍멍일지 입니다
        </p>
        <button
          className="mt-5 cursor-pointer rounded-full bg-[var(--color-pink-300)] px-8 py-3 hover:bg-[var(--color-pink-500)]"
          onClick={() => router.back()}
        >
          돌아가기
        </button>
      </div>
    );
  }

  const { recordAt, weight, sleepTime, content, feedingList, walkingList } =
    data;

  return (
    <main className="flex h-full flex-col pt-6 pb-5 text-sm md:m-0 md:block md:w-full md:pt-9 md:pb-0">
      <MobileTitle
        title="멍멍일지"
        closePage={() => router.back()}
        showOptionsMenu
        onEdit={() =>
          router.push(
            `/diary/write?petId=${data.petId}&recordAt=${encodeURIComponent(data.recordAt)}`,
          )
        }
        onDelete={handleDelete}
      />
      <div className="relative flex h-full w-full flex-col gap-6 px-4 md:px-19">
        {/* mobile */}
        <div className="flex w-full justify-between gap-6 md:hidden md:justify-start md:pl-3">
          <div className="flex h-[38px] flex-1 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 leading-[1.2] md:w-[160px]">
            {formatDate(data.recordAt)}
          </div>
          <div className="flex h-[38px] flex-1 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 leading-[1.2] md:w-[160px]">
            {pet?.name}
          </div>
        </div>

        {/* web */}
        <div className="absolute -top-2 right-[65px] hidden self-end text-base md:block">
          <DiaryOptionsMenu
            onEdit={() => {
              const petId = data.petId;
              const recordAt = encodeURIComponent(data.recordAt);
              router.push(`/diary/write?petId=${petId}&recordAt=${recordAt}`);
            }}
            onDelete={handleDelete}
          />
        </div>

        {/* content */}
        <div className="grid-cols-[1fr_2fr] gap-6 md:gap-14 md:pt-10 lg:grid">
          <div className="mb-8 flex flex-col items-center gap-6 md:min-w-105 md:gap-7 lg:mb-0">
            <div className="hidden w-full justify-center gap-20 md:flex lg:justify-between">
              <Image
                src={diary}
                alt="오늘의 멍멍일지를 적어보아요!"
                className="ml-5 block h-auto w-[120px] dark:hidden"
                priority
              />
              <Image
                src={d_diary}
                alt="오늘의 멍멍일지를 적어보아요!"
                className="ml-5 hidden dark:block"
                priority
              />
              <Calendar
                selected={new Date(recordAt)}
                setSelected={() => {}}
                readOnly
              />
            </div>
            <DiaryProfile
              name={pet?.name ?? '-'}
              age={Number(pet?.age)}
              days={pet?.days ?? 0}
              breedLabel={getBreedLabel(pet?.breed)}
              sizeLabel={getSizeLabel(pet?.size)}
              formatAge={formatAge}
              imageUrl={pet?.imgUrl ?? null}
            />
            <DiaryCard className="w-full md:h-[205px]" title="오늘의 건강기록">
              <div className="mb-4 text-sm md:mt-2 md:mb-6 md:text-base">
                <span className="inline-block w-[110px] cursor-default text-[var(--color-primary-500)]">
                  몸무게
                </span>
                <span>{weight != null ? `${weight} kg` : '-'}</span>
              </div>
              <div className="text-sm md:text-base">
                <span className="inline-block w-[110px] cursor-default text-[var(--color-primary-500)]">
                  수면시간
                </span>
                <span>{sleepTime != null ? `${sleepTime}시간` : '-'}</span>
              </div>
            </DiaryCard>
          </div>
          <div className="flex flex-col gap-6 md:gap-10 lg:h-full">
            <div className="flex h-full w-full flex-col justify-between gap-8 2xl:flex-row">
              <DiaryCard className="min-h-50 lg:h-71 lg:flex-1" title="식사량">
                <ul className="scrollbar-hidden -mt-3 overflow-y-scroll px-2">
                  {(feedingList as Feeding[]).map((item, idx) => {
                    const unitLabel =
                      feedUnit.find((opt) => opt.value === item.unit)?.label ??
                      item.unit;
                    return (
                      <li
                        key={idx}
                        className="flex border-b border-[var(--color-primary-300)] py-[9px]"
                      >
                        <span className="basis-27">
                          {formatTime(item.mealtime)}
                        </span>
                        <span>
                          {item.amount}
                          {unitLabel}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </DiaryCard>
              <DiaryCard className="min-h-50 lg:h-71 lg:flex-1" title="산책">
                <ul className="scrollbar-hidden -mt-3 overflow-y-scroll px-2">
                  {(walkingList as Walking[]).map((item, idx) => {
                    const start = formatTime(item.startTime);
                    const end = formatTime(item.endTime);
                    return (
                      <li
                        key={idx}
                        className="border-b border-[var(--color-primary-300)] py-[9px]"
                      >
                        <div className="inline-flex gap-2">
                          <span>
                            {start} ~ {end}
                          </span>
                          <span>
                            {'( 강도: '}
                            {walkingPace.find(
                              (opt) => opt.value === String(item.pace),
                            )?.label ?? `${item.pace}`}
                            {' )'}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </DiaryCard>
            </div>
            <DiaryCard
              className="mb-7 hidden min-h-50 w-full 2xl:mb-0 2xl:block 2xl:h-full"
              title="관찰노트"
            >
              <div className="scrollbar-hidden max-h-40 overflow-y-auto md:max-h-[250px]">
                <p>{content}</p>
              </div>
            </DiaryCard>
          </div>
          <DiaryCard
            className="col-span-2 my-8 block min-h-50 lg:mt-0 lg:h-full 2xl:hidden"
            title="관찰노트"
          >
            <div className="scrollbar-hidden max-h-40 overflow-y-auto md:max-h-[250px]">
              <p>{content}</p>
            </div>
          </DiaryCard>
        </div>
      </div>
      {showConfirm && (
        <Confirm
          description="정말 삭제하시겠습니까?"
          confirmText="삭제"
          onClose={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
}
