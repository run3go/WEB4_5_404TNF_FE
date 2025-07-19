import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useCreateDiary } from './useCreateDiary';
import { useGetPets } from './useGetPets';
import { petBreedData, petSizeData } from '@/assets/data/pet';
import { useCheckDiary } from './useCheckDiary';
import { useUpdateDiary } from './useUpdateDiary';

export function useDiaryForm() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState('GRAM');
  const [weight, setWeight] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walkingList, setWalkingList] = useState<WalkEntry[]>([
    { startHour: '', startMinute: '', endHour: '', endMinute: '', pace: '1' },
  ]);
  const [feedingList, setFeedingList] = useState<FeedEntry[]>([
    { hour: '', minute: '', amount: '', unit: 'GRAM' },
  ]);
  const userId = Number(sessionStorage.getItem('userId')) || null;
  const { data: pets = [] } = useGetPets(userId);
  const createMutation = useCreateDiary();
  const updateMutation = useUpdateDiary();

  // default pet
  useEffect(() => {
    if (pets.length > 0) {
      setSelectedPetId(pets[0].petId.toString());
    }
  }, [pets]);

  // selected pet object
  const selectedPet = useMemo(
    () => pets.find((p) => p.petId.toString() === selectedPetId),
    [pets, selectedPetId],
  );

  const breedLabel =
    petBreedData.find((b) => b.value === selectedPet?.breed)?.label || '';

  const sizeLabel =
    petSizeData.find((s) => s.value === selectedPet?.size)?.label || '';

  const formatAge = (age: number) => {
    const years = Math.floor(age / 12);
    const months = age % 12;
    return `${years}년 ${months}개월`;
  };
  const selectedPetName = selectedPet?.name || '';
  const selectedPetAge = selectedPet?.age ? Number(selectedPet.age) : 0;
  const selectedPetDays = selectedPet?.days ?? 0;

  // check diary
  const recordAt = selected ? format(selected, 'yyyy-MM-dd') : '';
  const numericPetId = Number(selectedPetId);
  const { data: diaryData, isSuccess: hasDiary } = useCheckDiary(
    numericPetId,
    recordAt,
    !!(numericPetId && recordAt),
  );

  useEffect(() => {
    if (hasDiary && diaryData) {
      setNote(diaryData.content || '');
      setWeight(diaryData.weight?.toString() || '');
      setSleepTime(diaryData.sleepTime?.toString() || '');

      setFeedingList(
        diaryData.feedingList.map((f) => {
          const time = new Date(f.mealtime);
          return {
            hour: time.getHours().toString().padStart(2, '0'),
            minute: time.getMinutes().toString().padStart(2, '0'),
            amount: f.amount.toString(),
            unit: f.unit,
          };
        }),
      );

      setWalkingList(
        diaryData.walkingList.map((w) => {
          const start = new Date(w.startTime);
          const end = new Date(w.endTime);
          return {
            startHour: start.getHours().toString().padStart(2, '0'),
            startMinute: start.getMinutes().toString().padStart(2, '0'),
            endHour: end.getHours().toString().padStart(2, '0'),
            endMinute: end.getMinutes().toString().padStart(2, '0'),
            pace: w.pace.toString(),
          };
        }),
      );
    } else {
      // reset
      setNote('');
      setWeight('');
      setSleepTime('');
      setFeedingList([{ hour: '', minute: '', amount: '', unit: 'GRAM' }]);
      setWalkingList([
        {
          startHour: '',
          startMinute: '',
          endHour: '',
          endMinute: '',
          pace: '1',
        },
      ]);
    }
  }, [diaryData, hasDiary]);

  const handleSubmit = async () => {
    // prevent duplicate submissions
    if (isSubmitting) return;
    setIsSubmitting(true);
    const body = {
      petId: numericPetId,
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
    // disable submit button for 1.5s
    const onFinish = () => setTimeout(() => setIsSubmitting(false), 1500);

    if (hasDiary && diaryData?.lifeRecordId) {
      // update (PATCH)
      console.log(
        'PATCH Body:',
        JSON.stringify(
          { data: { ...body, lifeRecordId: diaryData.lifeRecordId } },
          null,
          2,
        ),
      );

      updateMutation.mutate(
        {
          lifeRecordId: diaryData.lifeRecordId,
          data: body,
        },
        {
          onSuccess: (res) => {
            console.log(res);
            alert('멍멍일지 수정 완료');
            onFinish();
            // move to detail & toast
          },
          onError: (err) => {
            console.error(err);
          },
        },
      );
    } else {
      // create (POST)
      createMutation.mutate(body, {
        onSuccess: (res) => {
          console.log(res);
          alert('멍멍일지 등록 완료');
          onFinish();
          // move to detail & toast
        },
        onError: (err) => {
          console.error(err);
          onFinish();
        },
      });
    }
  };

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
    pets,
    selectedPetName,
    selectedPetAge,
    selectedPetDays,
    breedLabel,
    sizeLabel,
    formatAge,
    handleSubmit,
    isSubmitting,
  };
}
