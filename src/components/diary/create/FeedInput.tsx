import SelectBox from '@/components/common/SelectBox';
import DiaryCard from '../DiaryCard';

export default function FeedInput() {
  const options = [
    { label: 'g', value: 'g' },
    { label: '컵', value: '컵' },
    { label: '스푼', value: '스푼' },
  ];
  return (
    <DiaryCard className="min-h-50 grow sm:h-71" title="식사량" hasAddBtn>
      <div className="flex h-[38px] items-center justify-between text-xs sm:text-sm">
        <div>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="시간"
            maxLength={2}
          />
          <span className="mr-3">시</span>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="분"
            maxLength={2}
          />
          <span>분</span>
        </div>
        <div className="flex items-center gap-2 sm:pr-5">
          <input
            className="input-style w-23 py-1 text-center leading-[1.2] sm:w-[65px]"
            type="text"
            placeholder="급여량"
            maxLength={3}
          />
          <SelectBox
            width="65px"
            options={options}
            borderColor="var(--color-primary-500)"
            isCenter
          />
        </div>
      </div>
    </DiaryCard>
  );
}
