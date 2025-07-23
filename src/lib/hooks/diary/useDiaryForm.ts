import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useCreateDiary } from './useCreateDiary';
import { useGetPets } from './useGetPets';
import { petBreedData, petSizeData } from '@/assets/data/pet';
import { useCheckDiary } from './useCheckDiary';
import { useUpdateDiary } from './useUpdateDiary';
import { useQueryClient } from '@tanstack/react-query';
import {
  validateFeedingList,
  validateWalkingList,
} from '@/lib/utils/diaryValidation';

export function useDiaryForm(initPetId?: string, initRecordAt?: string) {
  const router = useRouter();
  const [selected, setSelected] = useState<Date | undefined>(
    initRecordAt ? new Date(initRecordAt) : new Date(),
  );
  const [selectedPetId, setSelectedPetId] = useState<string>(initPetId || '');
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
  const queryClient = useQueryClient();

  // default pet
  useEffect(() => {
    if (!initPetId && pets.length > 0) {
      setSelectedPetId(pets[0].petId.toString());
    }
  }, [pets, initPetId]);

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

  // submit handler
  const handleSubmit = async (): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (isSubmitting) return Promise.reject('Submitting...');
      setIsSubmitting(true);

      // validation check
      const feedingError = validateFeedingList(feedingList);
      if (feedingError) {
        alert(feedingError);
        setIsSubmitting(false);
        return reject(feedingError);
      }

      const walkingError = validateWalkingList(walkingList);
      if (walkingError) {
        alert(walkingError);
        setIsSubmitting(false);
        return reject(walkingError);
      }

      if (weight.trim() !== '') {
        const weightNum = Number(weight);
        if (isNaN(weightNum) || weightNum > 200) {
          alert('200kg 이하의 몸무게를 입력해주세요');
          setIsSubmitting(false);
          return reject('몸무게 유효성 오류');
        }
      }

      if (sleepTime.trim() !== '') {
        const sleepNum = Number(sleepTime);
        if (isNaN(sleepNum) || sleepNum > 24) {
          alert('24시간 이하의 시간을 입력해주세요');
          setIsSubmitting(false);
          return reject('수면시간 유효성 오류');
        }
      }

      // check if all fields are empty
      const hasNote = note.trim() !== '';
      const hasWeight = weight.trim() !== '';
      const hasSleepTime = sleepTime.trim() !== '';
      const hasFeedingInput = feedingList.some(
        (f) =>
          f.hour.trim() !== '' ||
          f.minute.trim() !== '' ||
          f.amount.trim() !== '',
      );

      const hasWalkingInput = walkingList.some(
        (w) =>
          w.startHour.trim() !== '' ||
          w.startMinute.trim() !== '' ||
          w.endHour.trim() !== '' ||
          w.endMinute.trim() !== '',
      );

      if (
        !hasNote &&
        !hasWeight &&
        !hasSleepTime &&
        !hasFeedingInput &&
        !hasWalkingInput
      ) {
        alert('모든 항목이 비어있습니다. 한 가지 이상의 항목을 기록해주세요.');
        setIsSubmitting(false);
        return reject('모든 항목이 비어있음');
      }

      const transformedFeedingList = hasFeedingInput
        ? feedingList.map((entry) => ({
            amount: Number(entry.amount),
            mealtime: `${recordAt}T${entry.hour.padStart(2, '0')}:${entry.minute.padStart(2, '0')}:00`,
            unit: entry.unit,
          }))
        : [];

      const transformedWalkingList = hasWalkingInput
        ? walkingList.map((entry) => ({
            startTime: `${recordAt}T${entry.startHour.padStart(2, '0')}:${entry.startMinute.padStart(2, '0')}:00`,
            endTime: `${recordAt}T${entry.endHour.padStart(2, '0')}:${entry.endMinute.padStart(2, '0')}:00`,
            pace: Number(entry.pace),
          }))
        : [];

      // request body
      const body = {
        petId: numericPetId,
        recordAt,
        content: note,
        walkingList: transformedWalkingList,
        feedingList: transformedFeedingList,
        ...(weight.trim() !== '' && { weight: Number(weight) }),
        ...(sleepTime.trim() !== '' && { sleepTime: Number(sleepTime) }),
      };

      // disable submit button for 1.5s
      const onFinish = () => setTimeout(() => setIsSubmitting(false), 1500);

      if (hasDiary && diaryData?.lifeRecordId) {
        // update (PATCH)
        console.log(
          'PATCH Body:',
          JSON.stringify(
            { ...body, lifeRecordId: diaryData.lifeRecordId },
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
            onSuccess: async (res) => {
              console.log(res);
              alert('멍멍일지 수정 완료');
              // refresh diary data
              await queryClient.refetchQueries({
                queryKey: ['diaryDetail', res.lifeRecordId],
              });
              router.push(`/diary/${res.lifeRecordId}`);
              onFinish();
              resolve(res.lifeRecordId);
            },
            onError: (err) => {
              console.error(err);
              alert('멍멍일지 수정 실패');
              onFinish();
              reject(err);
            },
          },
        );
      } else {
        // create (POST)
        console.log('POST Body: ', JSON.stringify(body, null, 2));
        createMutation.mutate(body, {
          onSuccess: (res) => {
            console.log(res);
            alert('멍멍일지 등록 완료');
            onFinish();
            resolve(res.lifeRecordId);
          },
          onError: (err) => {
            console.error(err);
            alert('멍멍일지 등록 실패');
            onFinish();
            reject(err);
          },
        });
      }
    });
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
