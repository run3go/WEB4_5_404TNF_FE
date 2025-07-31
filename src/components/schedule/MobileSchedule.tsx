'use client';
import { useState } from 'react';
import MobileCalendar from './MobileCalendar';
import TodoList from './TodoList';
import AddScheduleButton from './AddScheduleButton';
import { useGetSchedules } from '@/lib/hooks/schedule/useGetSchedules';
import NoPets from './NoPets';
import { useGetPets } from '@/lib/hooks/useGetPets';
import { isSameDay } from 'date-fns';
import { useAuthStore } from '@/stores/authStoe';
import Loading from '../common/Loading';

export default function MobileSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const { userInfo } = useAuthStore();

  // 애완견 리스트 불러오기
  const { data: petOptions, isPending: petLoading } = useGetPets(
    userInfo?.userId,
  );

  // 월 바뀔 때마다 api 호출
  const {
    data: schedules,
    isPending: scheduleLoading,
  }: { data?: Schedule[]; isPending: boolean } = useGetSchedules(currentDate);

  const scheduleDates =
    schedules?.map((schedule) => new Date(schedule.date)) ?? [];

  const daySchedules = selectedDate
    ? schedules?.filter((schedule) =>
        isSameDay(new Date(schedule.date), selectedDate),
      )
    : [];

  if (petLoading || scheduleLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center sm:hidden">
        <Loading className="h-100 w-100" />
      </div>
    );
  }

  if (!petOptions || petOptions?.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center sm:hidden">
        <NoPets />
      </div>
    );
  }

  return (
    <>
      <MobileCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        onChangeMonth={setCurrentDate}
        scheduleDates={scheduleDates}
      />
      <TodoList type="card" fullDate={selectedDate} schedules={daySchedules} />
      <AddScheduleButton date={selectedDate} />
    </>
  );
}
