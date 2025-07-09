import DiaryCard from '../DiaryCard';

export default function WalkingInput() {
  return (
    <DiaryCard className="min-h-50 grow sm:h-71" title="산책" hasAddBtn>
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
        <span>~</span>
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
      </div>
    </DiaryCard>
  );
}
