import { useState } from 'react';

export function useDiaryState(initPetId?: string, initRecordAt?: string) {
  const [selected, setSelected] = useState<Date | undefined>(
    initRecordAt ? new Date(initRecordAt) : new Date(),
  );
  const [selectedPetId, setSelectedPetId] = useState<string>(initPetId || '');
  const [selectedUnit, setSelectedUnit] = useState('GRAM');
  const [weight, setWeight] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [note, setNote] = useState('');
  const [walkingList, setWalkingList] = useState<WalkEntry[]>([
    { startHour: '', startMinute: '', endHour: '', endMinute: '', pace: '1' },
  ]);
  const [feedingList, setFeedingList] = useState<FeedEntry[]>([
    { hour: '', minute: '', amount: '', unit: 'GRAM' },
  ]);

  return {
    selected,
    setSelected,
    selectedPetId,
    setSelectedPetId,
    selectedUnit,
    setSelectedUnit,
    weight,
    setWeight,
    sleepTime,
    setSleepTime,
    note,
    setNote,
    walkingList,
    setWalkingList,
    feedingList,
    setFeedingList,
  };
}
