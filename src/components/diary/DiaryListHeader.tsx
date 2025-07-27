'use client';

import DateInput from '@/components/common/DateInput';
import SelectBox from '@/components/common/SelectBox';
import Icon from '@/components/common/Icon';

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
  isMobile,
  onClickWrite,
}: Props) {
  return (
    <div className="mb-5 flex w-full justify-between sm:py-2">
      <div className="flex w-full justify-between gap-5 sm:justify-start sm:gap-6 sm:pl-3">
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
        <div className="flex-1 text-xs sm:w-[178px] sm:flex-none sm:text-base">
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
      <button
        className="hidden cursor-pointer items-center gap-1 sm:flex"
        onClick={onClickWrite}
      >
        <Icon width="14px" height="14px" left="-231px" top="-79px" />
        <span className="inline-block w-16 font-medium">기록하기</span>
      </button>
    </div>
  );
}
