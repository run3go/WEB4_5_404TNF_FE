import DiaryCard from '../DiaryCard';
import WalkingInputItem from './WalkingInputItem';

type WalkEntry = {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  pace: string;
};

type Props = {
  walkingList: WalkEntry[];
  setWalkingList: (list: WalkEntry[]) => void;
};

export default function WalkingInput({ walkingList, setWalkingList }: Props) {
  const updateField = (
    index: number,
    field: keyof WalkEntry,
    value: string,
  ) => {
    const newList = [...walkingList];
    newList[index][field] = value;
    setWalkingList(newList);
  };

  const handleWalkingAddRow = () => {
    setWalkingList([
      ...walkingList,
      { startHour: '', startMinute: '', endHour: '', endMinute: '', pace: '1' },
    ]);
  };

  const handleDeleteWalkingRow = (index: number) => {
    const newList = [...walkingList];
    newList.splice(index, 1);
    setWalkingList(newList);
  };

  return (
    <DiaryCard
      className="min-h-50 sm:h-71"
      title="산책"
      hasAddBtn
      onAddBtnClick={handleWalkingAddRow}
    >
      <div className="scrollbar-hidden flex h-full flex-col gap-2 overflow-y-auto">
        {walkingList.map((entry, i) => (
          <WalkingInputItem
            key={i}
            startHour={entry.startHour}
            startMinute={entry.startMinute}
            endHour={entry.endHour}
            endMinute={entry.endMinute}
            pace={entry.pace}
            onChange={(field, value) => updateField(i, field, value)}
            onDelete={() => handleDeleteWalkingRow(i)}
          />
        ))}
      </div>
    </DiaryCard>
  );
}
