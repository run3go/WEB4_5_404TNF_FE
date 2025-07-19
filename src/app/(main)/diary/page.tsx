'use client';
import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import LogCard from '@/components/diary/LogCard';
import DateInput from '@/components/common/DateInput';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPetsByUserId } from '@/api/diary';

type Option = { value: string; label: string };

export default function Diary() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>('all');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // test userId
        const res = await getPetsByUserId(10002);
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

  return (
    <main className="flex h-full flex-col items-center p-6 sm:block sm:p-0 sm:px-12 sm:py-7">
      <div className="mb-3 flex w-full justify-between">
        <div className="flex w-full justify-between gap-6 sm:justify-start sm:pl-3">
          <DateInput
            selected={selectedDate}
            setSelected={setSelectedDate}
            showAllDate
            disableFuture={true}
            className="w-[137px] rounded-xl border-1 border-[var(--color-primary-500)] sm:w-[220px]"
          />
          <SelectBox
            value={selectedPetId}
            setValue={setSelectedPetId}
            options={petOptions}
            width="178px"
            borderColor="var(--color-primary-500)"
            footstep
            hasBorder
          />
        </div>
        <Link
          className="hidden items-center gap-2 sm:flex"
          href={'/diary/write'}
        >
          <Icon width="14px" height="14px" left="-231px" top="-79px" />
          <span className="inline-block w-20 font-medium">기록하기</span>
        </Link>
      </div>
      <ul className="scrollbar-hidden flex flex-col gap-5 pt-2 pb-4 sm:h-[700px] sm:flex-row sm:flex-wrap sm:gap-[53px] sm:overflow-y-scroll sm:px-3 sm:pt-10">
        {Array(9)
          .fill(0)
          .map((item, i) => (
            <li key={i} className="basis-[calc(33%-31px)]">
              <LogCard />
            </li>
          ))}
      </ul>
      <div className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden">
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
    </main>
  );
}
