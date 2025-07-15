'use client';
import { useSearchParams } from 'next/navigation';
import { useDiaryForm } from '@/hooks/useDiaryForm';
import FeedInput from '@/components/diary/create/FeedInput';
import WalkingInput from '@/components/diary/create/WalkingInput';
import diary from '@/assets/images/diary.svg';
import Note from '@/components/diary/create/Note';
import SingleInput from '@/components/diary/create/SingleInput';
import Calendar from '@/components/diary/Calendar';
import SelectBox from '@/components/common/SelectBox';
import DiaryProfile from '@/components/diary/DiaryProfile';
import MobileTitle from '@/components/common/MobileTitle';
import Image from 'next/image';
import DiaryCard from '@/components/diary/DiaryCard';

const feedUnitOptions = [
  { label: '그램', value: 'GRAM' },
  { label: '스푼', value: 'SPOON' },
  { label: '스쿱', value: 'SCOOP' },
  { label: '컵', value: 'CUP' },
];

export default function DiaryWrite() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  const petIdParam = searchParams.get('petId');

  const {
    selected,
    setSelected,
    selectedPetId,
    setSelectedPetId,
    weight,
    setWeight,
    sleepTime,
    setSleepTime,
    note,
    setNote,
    feedAmount,
    setFeedAmount,
    feedTimeHour,
    setFeedTimeHour,
    feedTimeMinute,
    setFeedTimeMinute,
    selectedUnit,
    setSelectedUnit,
    walkStartHour,
    setWalkStartHour,
    walkStartMinute,
    setWalkStartMinute,
    walkEndHour,
    setWalkEndHour,
    walkEndMinute,
    setWalkEndMinute,
    pets,
    selectedPetName,

    handleSubmit,
  } = useDiaryForm(petIdParam, dateParam);

  const petOptions = pets.map((pet) => ({
    value: pet.petId.toString(),
    label: pet.name,
  }));
  return (
    <main className="flex h-full flex-col pt-6 pb-5 text-sm sm:m-0 sm:block sm:w-full sm:pt-4 sm:pb-0">
      <MobileTitle title="멍멍일지" closePage={() => {}} onClick={() => {}} />
      <div className="relative flex w-full flex-col gap-6 px-4 sm:px-19">
        <div className="flex justify-between gap-6 sm:hidden sm:justify-start sm:pl-3">
          <div className="flex grow-2 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 py-[11px] leading-[1.2] sm:w-[160px]">
            {selected?.toLocaleDateString('ko-KR')}
          </div>
          <div className="flex grow-5 items-center justify-center rounded-xl border-1 border-[var(--color-primary-500)] px-4 py-[11px] leading-[1.2] sm:w-[160px]">
            {selectedPetName}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <div className="hidden text-base sm:block">
            <SelectBox
              value={selectedPetId}
              setValue={setSelectedPetId}
              options={petOptions}
              width="116px"
              borderColor="var(--color-primary-500)"
              footstep
              hasBorder
            />
          </div>
          <button
            className="w-[115px] cursor-pointer rounded-xl bg-[var(--color-primary-500)] text-base"
            onClick={handleSubmit}
          >
            저장하기
          </button>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14 sm:pt-1">
          <div className="flex flex-col items-center gap-6 sm:min-w-105 sm:gap-7">
            <div className="hidden w-full justify-between sm:flex">
              <Image src={diary} alt="오늘의 멍멍일지를 적어보아요!" />
              <Calendar selected={selected} setSelected={setSelected} />
            </div>
            <DiaryProfile />
            <DiaryCard className="w-full sm:h-[205px]" title="오늘의 건강기록">
              <SingleInput
                title="몸무게"
                id="weight"
                value={weight}
                onChange={setWeight}
              />
              <SingleInput
                title="수면시간"
                id="sleep"
                value={sleepTime}
                onChange={setSleepTime}
              />
            </DiaryCard>
          </div>
          <div className="flex grow flex-col gap-6 sm:gap-12">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-14">
              <FeedInput
                feedUnitOptions={feedUnitOptions}
                selectedUnit={selectedUnit}
                setSelectedUnit={setSelectedUnit}
                feedAmount={feedAmount}
                setFeedAmount={setFeedAmount}
                feedTimeHour={feedTimeHour}
                setFeedTimeHour={setFeedTimeHour}
                feedTimeMinute={feedTimeMinute}
                setFeedTimeMinute={setFeedTimeMinute}
              />
              <WalkingInput
                walkStartHour={walkStartHour}
                setWalkStartHour={setWalkStartHour}
                walkStartMinute={walkStartMinute}
                setWalkStartMinute={setWalkStartMinute}
                walkEndHour={walkEndHour}
                setWalkEndHour={setWalkEndHour}
                walkEndMinute={walkEndMinute}
                setWalkEndMinute={setWalkEndMinute}
              />
            </div>
            <Note value={note} onChange={setNote} />
          </div>
        </div>
      </div>
    </main>
  );
}
