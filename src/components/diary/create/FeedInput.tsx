import SelectBox from '@/components/common/SelectBox';
import DiaryCard from '../DiaryCard';

type Props = {
  feedUnitOptions: { label: string; value: string }[];
  selectedUnit: string;
  setSelectedUnit: (value: string) => void;
  feedAmount: string;
  setFeedAmount: (value: string) => void;
  feedTimeHour: string;
  setFeedTimeHour: (value: string) => void;
  feedTimeMinute: string;
  setFeedTimeMinute: (value: string) => void;
};

export default function FeedInput({
  feedUnitOptions,
  selectedUnit,
  setSelectedUnit,
  feedAmount,
  setFeedAmount,
  feedTimeHour,
  setFeedTimeHour,
  feedTimeMinute,
  setFeedTimeMinute,
}: Props) {
  return (
    <DiaryCard className="min-h-50 grow sm:h-71" title="식사량" hasAddBtn>
      <div className="flex h-[38px] items-center justify-between text-xs sm:text-sm">
        <div>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="시간"
            maxLength={2}
            value={feedTimeHour}
            onChange={(e) => setFeedTimeHour(e.target.value)}
          />
          <span className="mr-3">시</span>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="분"
            maxLength={2}
            value={feedTimeMinute}
            onChange={(e) => setFeedTimeMinute(e.target.value)}
          />
          <span>분</span>
        </div>
        <div className="flex items-center gap-2 sm:pr-5">
          <input
            className="input-style w-23 py-1 text-center leading-[1.2] sm:w-[65px]"
            type="text"
            placeholder="급여량"
            maxLength={3}
            value={feedAmount}
            onChange={(e) => setFeedAmount(e.target.value)}
          />
          <SelectBox
            value={selectedUnit}
            setValue={setSelectedUnit}
            options={feedUnitOptions}
            width="65px"
            borderColor="var(--color-primary-500)"
            isCenter
          />
        </div>
      </div>
    </DiaryCard>
  );
}
