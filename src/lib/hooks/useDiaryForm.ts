import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { createLifeRecord, getPetsByUserId } from '@/api/diary';

export function useDiaryForm() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [pets, setPets] = useState<DiaryPet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState('GRAM');
  const [weight, setWeight] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [note, setNote] = useState('');
  const [walkStartHour, setWalkStartHour] = useState('');
  const [walkStartMinute, setWalkStartMinute] = useState('');
  const [walkEndHour, setWalkEndHour] = useState('');
  const [walkEndMinute, setWalkEndMinute] = useState('');
  const [pace, setPace] = useState('1');
  const [walkingList, setWalkingList] = useState([
    { startHour: '', startMinute: '', endHour: '', endMinute: '', pace: '1' },
  ]);
  const [feedingList, setFeedingList] = useState<FeedEntry[]>([
    { hour: '', minute: '', amount: '', unit: 'GRAM' },
  ]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetsByUserId(10004);
        setPets(res);
        setSelectedPetId(res[0]?.petId?.toString() || '');
      } catch (err) {
        console.error(err);
      }
    };
    fetchPets();
  }, []);

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

    try {
      const res = await createLifeRecord(body);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
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
    walkStartHour,
    setWalkStartHour,
    walkStartMinute,
    setWalkStartMinute,
    walkEndHour,
    setWalkEndHour,
    walkEndMinute,
    setWalkEndMinute,
    selectedPetName,
    handleSubmit,
    pace,
    setPace,
  };
}
