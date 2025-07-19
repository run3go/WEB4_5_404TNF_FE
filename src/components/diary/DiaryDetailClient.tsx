'use client';

import diary from '@/assets/images/diary.svg';
import Image from 'next/image';
import MobileTitle from '../common/MobileTitle';
import SelectBox from '../common/SelectBox';
import Calendar from './Calendar';
import DiaryCard from './DiaryCard';
import DiaryProfile from './DiaryProfile';
import { useDiaryForm } from '@/lib/hooks/diary/useDiaryForm';
import { useDiaryDetail } from '@/lib/hooks/diary/useDiaryDetail';

const feedUnitOptions = [
  { label: 'g', value: 'GRAM' },
  { label: '스푼', value: 'SPOON' },
  { label: '스쿱', value: 'SCOOP' },
  { label: '컵', value: 'CUP' },
];

const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  const hour = date.getHours().toString().padStart(1, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${hour}시 ${minute}분`;
};

export default function DiaryDetailClient({ logId }: { logId: number }) {
  const {
    selectedPetName,
    selectedPetAge,
    selectedPetDays,
    breedLabel,
    sizeLabel,
    formatAge,
  } = useDiaryForm();

  const { data, isLoading, error } = useDiaryDetail(logId);

  if (isLoading) return <p>로딩 중...</p>;
  if (error || !data) return <p>데이터를 불러올 수 없습니다.</p>;
  const { recordAt, weight, sleepTime, content, feedingList, walkingList } =
    data;

  const options = [
    { value: '이마음', label: '이마음' },
    { value: '이구름', label: '이구름' },
    { value: '이솜', label: '이솜' },
  ];

  // const feedingList = data.feedingList;
  // const walkingList = data.walkingList;

  return (
    <main className="flex h-full flex-col pt-6 pb-5 text-sm sm:m-0 sm:block sm:w-full sm:pt-9 sm:pb-0">
      <MobileTitle title="멍멍일지" closePage={() => {}} />
      <div className="relative flex h-full w-full flex-col gap-6 px-4 sm:px-19">
        <div className="flex w-full justify-between gap-6 sm:hidden sm:justify-start sm:pl-3">
          {/* <div className="flex grow-2 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 py-[11px] leading-[1.2] sm:w-[160px]">
            {recordAt}
          </div> */}
          <div className="flex grow-5 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 py-[11px] leading-[1.2] sm:w-[160px]">
            {selectedPetName}
          </div>
        </div>
        <div className="absolute -top-2 right-[65px] hidden self-end text-base sm:block">
          <SelectBox options={options} width="105px" footstep />
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14 sm:pt-10">
          <div className="flex flex-col items-center gap-6 sm:min-w-105 sm:gap-7">
            <div className="hidden w-full justify-between sm:flex">
              <Image src={diary} alt="오늘의 멍멍일지를 적어보아요!" />
              <Calendar selected={new Date(recordAt)} setSelected={() => {}} />
            </div>
            <DiaryProfile
              name={selectedPetName}
              age={selectedPetAge}
              days={selectedPetDays}
              breedLabel={breedLabel}
              sizeLabel={sizeLabel}
              formatAge={formatAge}
            />
            <DiaryCard className="w-full sm:h-[205px]" title="오늘의 건강기록">
              <div className="mb-2 text-sm sm:mb-6 sm:text-base">
                <span className="inline-block w-[110px] cursor-default text-[var(--color-primary-500)]">
                  몸무게
                </span>
                <span>{weight} kg</span>
              </div>
              <div className="text-sm sm:text-base">
                <span className="inline-block w-[110px] cursor-default text-[var(--color-primary-500)]">
                  수면시간
                </span>
                <span>{sleepTime}시간</span>
              </div>
            </DiaryCard>
          </div>
          <div className="flex grow flex-col gap-6 sm:gap-12">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-14">
              <DiaryCard className="min-h-50 grow sm:h-71" title="식사량">
                <ul className="-mt-3 px-2">
                  {(feedingList as Feeding[]).map((item, idx) => {
                    const unitLabel =
                      feedUnitOptions.find((opt) => opt.value === item.unit)
                        ?.label ?? item.unit;

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
              <DiaryCard className="min-h-50 grow sm:h-71" title="산책">
                <ul className="-mt-3 px-2">
                  {(walkingList as Walking[]).map((item, idx) => {
                    const start = formatTime(item.startTime);
                    const end = formatTime(item.endTime);
                    return (
                      <li
                        key={idx}
                        className="border-b border-[var(--color-primary-300)] py-[9px]"
                      >
                        <span>
                          {start} ~ {end}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </DiaryCard>
            </div>
            <DiaryCard className="mb-7 h-full w-full sm:mb-0" title="관찰노트">
              <p>{content}</p>
            </DiaryCard>
          </div>
        </div>
      </div>
    </main>
  );
}
