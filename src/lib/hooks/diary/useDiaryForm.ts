import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useCreateDiary } from './useCreateDiary';
import { useGetPets } from './useGetPets';

export function useDiaryForm() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [selectedPetId, setSelectedPetId] = useState<string>('');
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
  const userId = Number(sessionStorage.getItem('userId')) || null;
  const { data: pets = [] } = useGetPets(userId);
  const createMutation = useCreateDiary();

  useEffect(() => {
    if (pets.length > 0) {
      setSelectedPetId(pets[0].petId.toString());
    }
  }, [pets]);

  const selectedPetName =
    pets.find((opt) => opt.petId.toString() === selectedPetId)?.name || '';

  const handleSubmit = async () => {
    const recordAt = selected ? format(selected, 'yyyy-MM-dd') : '';
    const body = {
      petId: Number(selectedPetId),
      recordAt,
      content: note,
      sleepTime: Number(sleepTime),
      weight: Number(weight),

      walkingList: walkingList.map((entry) => ({
        startTime: `${recordAt}T${entry.startHour.padStart(2, '0')}:${entry.startMinute.padStart(2, '0')}:00`,
        endTime: `${recordAt}T${entry.endHour.padStart(2, '0')}:${entry.endMinute.padStart(2, '0')}:00`,
        pace: Number(entry.pace),
      })),

      feedingList: feedingList.map((entry) => ({
        amount: Number(entry.amount),
        mealtime: `${recordAt}T${entry.hour.padStart(2, '0')}:${entry.minute.padStart(2, '0')}:00`,
        unit: entry.unit,
      })),
    };
    console.log(body);
    console.log(JSON.stringify(body, null, 2));
    createMutation.mutate(body, {
      onSuccess: (res) => {
        console.log(res);
        // detail 페이지로 이동 추가 예정
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return {
    selected,
    setSelected,
    pets,
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
    selectedPetName,
    handleSubmit,
  };
}
