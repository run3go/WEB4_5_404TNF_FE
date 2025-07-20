import { twMerge } from 'tailwind-merge';
import Button from '../common/Button';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';
import DateInput from '../common/DateInput';
import { useEffect, useState } from 'react';
import { cycles } from '@/assets/data/schedule';
import { format, isBefore, parseISO } from 'date-fns';
import { Schedule } from '@/types/schedule';
import { useGetPets } from '@/lib/hooks/useGetPets';
import { useCreateSchedule } from '@/lib/hooks/schedule/useCreateSchedule';
import { useUpdateSchedule } from '@/lib/hooks/schedule/useUpdateSchedule';
import Lottie from 'lottie-react';
import loading from '../../assets/images/loading-footprint.json';

export default function AddSchedule({
  closeModal,
  isStart,
  isEdit,
  fullDate,
  schedule,
}: {
  closeModal?: () => void;
  isStart?: boolean;
  isEdit?: boolean;
  fullDate?: Date | undefined;
  schedule?: Schedule;
}) {
  // 애완견 리스트 불러오기
  const { data: petOptions, isPending } = useGetPets(10014);

  const { mutate: createSchedule } = useCreateSchedule();
  const { mutate: updateSchedule } = useUpdateSchedule();

  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>(fullDate);

  const [petId, setPetId] = useState<string>('');
  const [initialCycle, setinitialCycle] = useState('NONE');
  const [cycle, setCycle] = useState('NONE');
  const [cycleEnd, setCycleEnd] = useState<Date | undefined>(fullDate);

  const [cycleLink, setCycleLink] = useState(false);

  // 일정 추가 시
  useEffect(() => {
    if (!isEdit && petOptions?.length) {
      setPetId(String(petOptions[0].value));
    }
  }, [isEdit, petOptions]);

  // 일정 수정 시
  useEffect(() => {
    if (isEdit && schedule && petOptions?.length) {
      setName(schedule?.name);
      setDate(parseISO(schedule.date));
      setPetId(String(schedule.petId));
      setinitialCycle(schedule.cycle);
      setCycle(schedule.cycle);
      setCycleEnd(parseISO(schedule.cycleEnd));
    }
  }, [isEdit, schedule, petOptions]);

  // 수정하기 / 저장하기 클릭 시
  const handleSubmit = () => {
    // 필수값들 확인 후 alert
    if (name.length === 0) {
      alert('일정을 입력해주세요.');
      return;
    }

    if (!date) {
      alert('날짜를 입력해주세요.');
      return;
    }

    if (cycle !== 'NONE') {
      if (!cycleEnd) {
        alert('반복 종료일을 입력해주세요');
        return;
      }

      const checkDate = isBefore(cycleEnd, date);

      if (checkDate) {
        alert('반복 종료일은 일정 날짜 이후로 선택해주세요.');
        return;
      }
    }

    if (isEdit && schedule) {
      console.log(cycle, date);

      updateSchedule({
        scheduleId: schedule.scheduleId,
        userId: 10014, // api 확인 후 제거
        petId: Number(petId),
        name,
        date: format(date, 'yyyy-MM-dd'),
        cycleLink,
        cycle,
        cycleEnd:
          cycle !== 'NONE'
            ? format(cycleEnd!, 'yyyy-MM-dd')
            : format(date, 'yyyy-MM-dd'),
      });
    } else {
      createSchedule({
        name,
        date: format(date, 'yyyy-MM-dd'),
        cycle,
        cycleEnd: cycleEnd
          ? format(cycleEnd, 'yyyy-MM-dd')
          : format(date, 'yyyy-MM-dd'),
        userId: 10014, // api 확인 후 제거
        petId: Number(petId),
      });
    }

    closeModal?.();
  };

  return (
    <>
      <div
        className={twMerge(
          `fixed inset-0 z-500 bg-[var(--color-black)] opacity-50 ${isStart ? '' : 'sm:hidden'}`,
        )}
        onClick={closeModal}
      />

      <div className="fixed top-1/2 left-1/2 z-501 h-[400px] w-4/5 max-w-250 -translate-x-1/2 -translate-y-1/2 rounded-[30px] border-4 border-[var(--color-primary-200)] bg-[var(--color-background)] p-5 sm:h-[472px] sm:w-[570px] sm:p-8">
        {isPending && (
          <div className="flex h-full items-center justify-center">
            <Lottie animationData={loading} loop={true} className="h-70 w-70" />
          </div>
        )}

        {!isPending && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="relative flex h-full flex-col gap-4 text-sm leading-[1.2] sm:gap-7 sm:text-base"
          >
            <div className="mb-1 flex w-full items-center justify-between">
              <h2 className="cursor-default text-base font-extrabold">
                {isEdit ? '일정 수정' : '일정 추가'}
              </h2>
              <Icon
                className="mr-2 cursor-pointer"
                onClick={closeModal}
                width="16px"
                height="16px"
                left="-302px"
                top="-202px"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="block w-13 sm:w-20" htmlFor="todo">
                할 일
              </label>
              <input
                className="input-style w-full px-3 py-[11px]"
                type="text"
                placeholder="할 일을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                id="todo"
              />
            </div>
            <div className="flex">
              <span className="inline-block w-[57px] cursor-default sm:w-20">
                날짜
              </span>
              <DateInput
                selected={date}
                setSelected={setDate}
                className="w-33 p-0"
              />
            </div>
            <div className="flex items-center">
              <span className="inline-block w-[57px] cursor-default sm:w-20">
                강아지
              </span>
              <SelectBox
                options={petOptions || []}
                width="125px"
                footstep
                value={petId}
                setValue={setPetId}
                type="schedule"
              />
            </div>
            <div className="flex items-center">
              <span className="inline-block w-[57px] cursor-default sm:w-20">
                반복
              </span>
              <SelectBox
                options={cycles}
                width="80px"
                isCenter
                value={cycle}
                setValue={setCycle}
              />
            </div>
            {cycle !== 'NONE' && (
              <div className="flex items-center">
                <span className="mr-4">반복 종료일</span>
                <DateInput
                  selected={cycleEnd}
                  setSelected={setCycleEnd}
                  disabledRange={date && { before: date }}
                  className="w-33 p-0"
                />
              </div>
            )}
            {isEdit && initialCycle !== 'NONE' && (
              <div className="flex gap-4">
                <label className="flex items-center justify-center gap-2">
                  <input
                    type="radio"
                    name="cycleLink"
                    value="false"
                    checked={!cycleLink}
                    onChange={() => setCycleLink(false)}
                  />
                  이 일정에만 적용
                </label>

                <label className="flex items-center justify-center gap-2">
                  <input
                    type="radio"
                    name="cycleLink"
                    value="true"
                    checked={cycleLink}
                    onChange={() => setCycleLink(true)}
                  />
                  반복되는 모든 일정에 적용
                </label>
              </div>
            )}
            <Button
              // onClick={handleSubmit}
              type="submit"
              className="absolute bottom-0 h-10 w-25 self-center text-sm"
            >
              {isEdit ? '수정하기' : '저장하기'}
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
