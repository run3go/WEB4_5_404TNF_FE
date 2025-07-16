import SelectBox from '@/components/common/SelectBox';
import DiaryCard from '../DiaryCard';
import Icon from '@/components/common/Icon';
type Props = {
  walkStartHour: string;
  setWalkStartHour: (value: string) => void;
  walkStartMinute: string;
  setWalkStartMinute: (value: string) => void;
  walkEndHour: string;
  setWalkEndHour: (value: string) => void;
  walkEndMinute: string;
  setWalkEndMinute: (value: string) => void;
  pace: string;
  setPace: (value: string) => void;
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
  pace,
  setPace,
}: Props) {
  const paceOptions = [
    { value: '1', label: '가볍게' },
    { value: '2', label: '적당히' },
    { value: '3', label: '힘차게' },
  ];
  return (
    <DiaryCard className="min-h-50 sm:h-71 sm:w-[456px]" title="산책" hasAddBtn>
      <div className="flex h-[38px] items-center justify-between text-xs sm:text-sm">
        <div>
          <input
            className="input-style mr-1 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)]"
            type="text"
            placeholder="시간"
            maxLength={2}
            value={walkStartHour}
            onChange={(e) => setWalkStartHour(e.target.value)}
          />
          <span className="mr-2">시</span>
          <input
            className="input-style mr-1 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)]"
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
            className="input-style mr-1 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)]"
            type="text"
            placeholder="시간"
            maxLength={2}
            value={walkEndHour}
            onChange={(e) => setWalkEndHour(e.target.value)}
          />
          <span className="mr-2">시</span>
          <input
            className="input-style mr-1 w-11 py-1 text-center leading-[1.2] focus:outline-[var(--color-primary-500)]"
            type="text"
            placeholder="분"
            maxLength={2}
            value={walkEndMinute}
            onChange={(e) => setWalkEndMinute(e.target.value)}
          />
          <span>분</span>
        </div>
        <SelectBox
          value={pace}
          setValue={setPace}
          options={paceOptions}
          width="75px"
          borderColor="var(--color-primary-500)"
          isCenter
        />
        <Icon
          className="cursor-pointer"
          width="20px"
          height="20px"
          left="-340px"
          top="-256px"
        />
      </div>
    </DiaryCard>
  );
}
