'use client';
import SelectBox from '@/components/common/SelectBox';
import Calendar from '@/components/diary/Calendar';
import FeedInput from '@/components/diary/create/FeedInput';
import Note from '@/components/diary/create/Note';
import SingleInput from '@/components/diary/create/SingleInput';
import WalkingInput from '@/components/diary/create/WalkingInput';
import diary from '@/assets/images/diary.svg';
import MobileTitle from '@/components/common/MobileTitle';
import DiaryCard from '@/components/diary/DiaryCard';
import DiaryProfile from '@/components/diary/DiaryProfile';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { parseISO } from 'date-fns';
import { getPetsByUserId, Pet } from '@/api/diary';

type Option = { value: string; label: string };

export default function DiaryWrite() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  const petIdParam = searchParams.get('petId');

  const parsedDate = dateParam ? parseISO(dateParam) : new Date();
  const [selected, setSelected] = useState<Date | undefined>(parsedDate);

  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState('GRAM');

  const petOptions: Option[] = [
    ...pets.map((pet) => ({
      value: pet.petId.toString(),
      label: pet.name,
    })),
  ];

  const feedUnitOptions = [
    { label: 'g', value: 'GRAM' },
    { label: '스푼', value: 'SPOON' },
    { label: '스쿱', value: 'SCOOP' },
    { label: '컵', value: 'CUP' },
  ];

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // test useId
        const res = await getPetsByUserId(10004);
        setPets(res);

        const defaultId = petIdParam || res[0]?.petId?.toString();
        setSelectedPetId(defaultId || '');
      } catch (err) {
        console.error(err);
      }
    };

    fetchPets();
  }, [petIdParam]);

  const selectedPetName =
    petOptions.find((opt) => opt.value === selectedPetId)?.label || '';

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
          <button className="w-[115px] cursor-pointer rounded-xl bg-[var(--color-primary-500)] text-base">
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
              <SingleInput title="몸무게" id="weight" />
              <SingleInput title="수면시간" id="sleep" />
            </DiaryCard>
          </div>
          <div className="flex grow flex-col gap-6 sm:gap-12">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-14">
              <FeedInput
                feedUnitOptions={feedUnitOptions}
                selectedUnit={selectedUnit}
                setSelectedUnit={setSelectedUnit}
              />
              <WalkingInput />
            </div>
            <Note />
          </div>
        </div>
      </div>
    </main>
  );
}
