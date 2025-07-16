import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { createLifeRecord, getPetsByUserId, Pet } from '@/api/diary';

export function useDiaryForm(
  petIdParam: string | null,
  dateParam: string | null,
) {
  const [selected, setSelected] = useState<Date | undefined>(
    dateParam ? parseISO(dateParam) : new Date(),
  );
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState('GRAM');
  const [weight, setWeight] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [note, setNote] = useState('');
  const [feedAmount, setFeedAmount] = useState('');
  const [feedTimeHour, setFeedTimeHour] = useState('');
  const [feedTimeMinute, setFeedTimeMinute] = useState('');
  const [walkStartHour, setWalkStartHour] = useState('');
  const [walkStartMinute, setWalkStartMinute] = useState('');
  const [walkEndHour, setWalkEndHour] = useState('');
  const [walkEndMinute, setWalkEndMinute] = useState('');
  const [pace, setPace] = useState('1');
  const [walkingList, setWalkingList] = useState([
    { startHour: '', startMinute: '', endHour: '', endMinute: '', pace: '1' },
  ]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetsByUserId(10004);
        setPets(res);
        const defaultId = petIdParam || res[0]?.petId?.toString();
        setSelectedPetId(defaultId || '');
      } catch (err) {
        console.error(err);
      }
    };
    fetchPets();
  }, [petIdParam]);

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
      feedingList: [
        {
          amount: Number(feedAmount),
          mealtime: `${recordAt}T${feedTimeHour.padStart(2, '0')}:${feedTimeMinute.padStart(2, '0')}:00`,
          unit: selectedUnit,
        },
      ],
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
    feedAmount,
    setFeedAmount,
    feedTimeHour,
    setFeedTimeHour,
    feedTimeMinute,
    setFeedTimeMinute,
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
    walkingList,
    setWalkingList,
  };
}
