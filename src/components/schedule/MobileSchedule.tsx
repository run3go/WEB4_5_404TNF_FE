'use client';
import { useState } from 'react';
import MobileCalendar from './MobileCalendar';
import TodoList from './TodoList';
import AddScheduleButton from './AddScheduleButton';
import { useGetSchedules } from '@/lib/hooks/schedule/useGetSchedules';
import { Schedule } from '@/types/schedule';
import NoPets from './NoPets';
import { useGetPets } from '@/lib/hooks/useGetPets';
import { isSameDay } from 'date-fns';

export default function MobileSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // 애완견 리스트 불러오기
  const { data: petOptions, isPending } = useGetPets(10014);

  // 월 바뀔 때마다 api 호출
  const { data: schedules }: { data?: Schedule[] } = useGetSchedules(
    10014,
    currentDate,
  );

  const scheduleDates =
    schedules?.map((schedule) => new Date(schedule.date)) ?? [];

  const daySchedules = selectedDate
    ? schedules?.filter((schedule) =>
        isSameDay(new Date(schedule.date), selectedDate),
      )
    : [];

  if (!isPending && petOptions) {
    if (petOptions?.length === 0) {
      return <NoPets />;
    } else {
      return (
        <>
          <MobileCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onChangeMonth={setCurrentDate}
            scheduleDates={scheduleDates}
          />
          <TodoList
            type="card"
            fullDate={selectedDate}
            schedules={daySchedules}
          />
          <AddScheduleButton date={selectedDate} />
        </>
      );
    }
  }
}
