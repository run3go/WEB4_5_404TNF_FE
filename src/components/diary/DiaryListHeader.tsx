'use client';

import DateInput from '@/components/common/DateInput';
import SelectBox from '@/components/common/SelectBox';

type Props = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedPetId: string;
  setSelectedPetId: (id: string) => void;
  petOptions: { value: string; label: string }[];
  petsLength: number;
  isMobile: boolean;
  onClickWrite: () => void;
};

export default function DiaryListHeader({
  selectedDate,
  setSelectedDate,
  selectedPetId,
  setSelectedPetId,
  petOptions,
  onClickWrite,
}: Props) {
  return (
    <div className="mb-5 flex w-full justify-between sm:py-2">
      <div className="flex w-full justify-between gap-3 sm:justify-start sm:gap-6 sm:pl-3">
        <div className="flex-[1.5] sm:w-[220px] sm:flex-none">
          <DateInput
            selected={selectedDate}
            setSelected={setSelectedDate}
            showAllDate
            disableFuture={true}
            className="h-[34px] rounded-xl border-1 border-[var(--color-primary-500)] text-xs sm:h-[42px] sm:text-base"
            align="left"
          />
        </div>
        <div className="flex-1 text-xs sm:w-[145px] sm:flex-none sm:text-base">
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
        {selectedDate && (
          <button
            className="ml-2 shrink-0 cursor-pointer text-xs text-[var(--color-primary-500)] underline sm:text-sm"
            onClick={() => setSelectedDate(undefined)}
          >
            전체 날짜
          </button>
        )}
      </div>
      <button
        className="mr-3 hidden h-[42px] w-[116px] cursor-pointer items-center rounded-xl bg-[var(--color-primary-200)] hover:bg-[var(--color-primary-300)] sm:flex"
        onClick={onClickWrite}
      >
        {/* <Icon width="14px" height="14px" left="-231px" top="-79px" /> */}
        <span className="w-full text-center font-medium dark:text-[var(--color-black)]">
          기록하기
        </span>
      </button>
    </div>
  );
}
