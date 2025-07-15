import DiaryCard from '../DiaryCard';
type Props = {
  walkStartHour: string;
  setWalkStartHour: (value: string) => void;
  walkStartMinute: string;
  setWalkStartMinute: (value: string) => void;
  walkEndHour: string;
  setWalkEndHour: (value: string) => void;
  walkEndMinute: string;
  setWalkEndMinute: (value: string) => void;
};

export default function WalkingInput({
  walkStartHour,
  setWalkStartHour,
  walkStartMinute,
  setWalkStartMinute,
  walkEndHour,
  setWalkEndHour,
  walkEndMinute,
  setWalkEndMinute,
}: Props) {
  return (
    <DiaryCard className="min-h-50 grow sm:h-71" title="산책" hasAddBtn>
      <div className="flex h-[38px] items-center justify-between text-xs sm:text-sm">
        <div>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="시간"
            maxLength={2}
            value={walkStartHour}
            onChange={(e) => setWalkStartHour(e.target.value)}
          />
          <span className="mr-3">시</span>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="분"
            maxLength={2}
            value={walkStartMinute}
            onChange={(e) => setWalkStartMinute(e.target.value)}
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
            value={walkEndHour}
            onChange={(e) => setWalkEndHour(e.target.value)}
          />
          <span className="mr-3">시</span>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="분"
            maxLength={2}
            value={walkEndMinute}
            onChange={(e) => setWalkEndMinute(e.target.value)}
          />
          <span>분</span>
        </div>
      </div>
    </DiaryCard>
  );
}
