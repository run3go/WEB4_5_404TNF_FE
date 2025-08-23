'use client';

import d_diary from '@/assets/images/dark-diary.svg';
import diary from '@/assets/images/diary.svg';
import DateInput from '@/components/common/DateInput';
import Icon from '@/components/common/Icon';
import MobileTitle from '@/components/common/MobileTitle';
import SelectBox from '@/components/common/SelectBox';
import Calendar from '@/components/diary/Calendar';
import FeedInput from '@/components/diary/create/FeedInput';
import Note from '@/components/diary/create/Note';
import SingleInput from '@/components/diary/create/SingleInput';
import WalkingInput from '@/components/diary/create/WalkingInput';
import DiaryCard from '@/components/diary/DiaryCard';
import DiaryProfile from '@/components/diary/DiaryProfile';
import { useDiaryForm } from '@/lib/hooks/diary/state/useDiaryForm';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function DiaryWriteClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId') || undefined;
  const recordAt = searchParams.get('recordAt') || undefined;

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
    feedingList,
    setFeedingList,
    pets,
    selectedPetName,
    selectedPetAge,
    selectedPetDays,
    breedLabel,
    sizeLabel,
    formatAge,
    handleSubmit,
    walkingList,
    setWalkingList,
    isSubmitting,
    selectedPet,
  } = useDiaryForm(petId, recordAt);

  const petOptions = pets.map((pet) => ({
    value: pet.petId.toString(),
    label: pet.name,
  }));

  const onClickSave = async () => {
    try {
      const lifeRecordId = await handleSubmit();
      router.push(`/diary/${lifeRecordId}`);
    } catch (err) {
      console.error('등록 실패:', err);
    }
  };
  return (
    <main className="flex h-full flex-col pt-6 pb-5 text-sm md:m-0 md:block md:w-full md:pt-4 md:pb-0">
      <MobileTitle
        title="멍멍일지"
        closePage={() => router.back()}
        onClick={onClickSave}
      />
      <div className="relative flex w-full flex-col gap-3 px-4 md:gap-6 md:px-19">
        {/* mobile */}
        <div className="flex w-full justify-between gap-5 md:hidden md:justify-start md:pl-3">
          <div className="flex-[1.5] md:w-[220px]">
            <DateInput
              selected={selected}
              setSelected={setSelected}
              disableFuture={true}
              className="rounded-xl border-1 border-[var(--color-primary-500)]"
              align="left"
            />
          </div>
          <div className="flex-1 md:w-[160px]">
            <SelectBox
              value={selectedPetId}
              setValue={setSelectedPetId}
              options={petOptions}
              width="100%"
              borderColor="var(--color-primary-500)"
              footstep
              hasBorder
              type="diary"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="hidden md:block">
            <button
              className="flex cursor-pointer items-center gap-2 text-base"
              onClick={() => router.back()}
            >
              <Icon width="8px" height="13px" left="-425px" top="-320px" />
              <p>뒤로가기</p>
            </button>
          </div>
          <div className="flex justify-end gap-3">
            <div className="hidden text-base md:block">
              <SelectBox
                value={selectedPetId}
                setValue={setSelectedPetId}
                options={petOptions}
                width="135px"
                borderColor="var(--color-primary-500)"
                footstep
                hasBorder
                type="diary"
              />
            </div>
            <button
              className={twMerge(
                'hidden w-[115px] rounded-xl bg-[var(--color-primary-200)] text-base md:block dark:text-[var(--color-black)]',
                !isSubmitting &&
                  'cursor-pointer hover:bg-[var(--color-primary-500)]',
              )}
              onClick={onClickSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>

        <div className="grid-cols-[1fr_2fr] gap-6 md:gap-14 md:pt-1 lg:grid">
          <div className="flex flex-col items-center gap-6 md:min-w-105 md:gap-7">
            <div className="hidden w-full justify-between md:flex">
              <Image
                src={diary}
                alt="오늘의 멍멍일지를 적어보아요!"
                className="ml-5 block h-auto w-[120px] dark:hidden"
                priority
              />
              <Image
                src={d_diary}
                alt="오늘의 멍멍일지를 적어보아요!"
                className="ml-5 hidden h-auto w-[120px] dark:block"
                priority
              />
              <Calendar selected={selected} setSelected={setSelected} />
            </div>
            <DiaryProfile
              name={selectedPetName}
              age={selectedPetAge}
              days={selectedPetDays}
              breedLabel={breedLabel}
              sizeLabel={sizeLabel}
              formatAge={formatAge}
              imageUrl={selectedPet?.imgUrl ?? null}
            />
            <DiaryCard className="w-full md:h-[205px]" title="오늘의 건강기록">
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
          <div className="flex flex-col gap-6 pb-8 md:gap-12 md:pb-0 lg:h-full">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-4">
              <div className="flex flex-col md:flex-1">
                <FeedInput
                  feedingList={feedingList}
                  setFeedingList={setFeedingList}
                />
              </div>
              <div className="flex flex-col md:flex-1">
                <WalkingInput
                  walkingList={walkingList}
                  setWalkingList={setWalkingList}
                />
              </div>
            </div>
            <Note value={note} onChange={setNote} />
          </div>
        </div>
      </div>
    </main>
  );
}
