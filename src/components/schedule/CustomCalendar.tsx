'use client';
import { getDay, getMonth, getWeeksInMonth, getYear } from 'date-fns';
import Icon from '../common/Icon';
import DateItem from './DateItem';
import { useState } from 'react';

export default function CustomCalendar() {
  const data = [
    { scheduleId: 1, date: '2025-07-01', name: '병원진료', isDone: true },
    {
      scheduleId: 2,
      date: '2025-07-01',
      name: '아침에 약 먹이기',
      isDone: true,
    },
    {
      scheduleId: 3,
      date: '2025-07-01',
      name: '기쁨이 만나서 공원가기',
      isDone: true,
    },
    { scheduleId: 4, date: '2025-07-10', name: '사료 주문하기', isDone: true },
    { scheduleId: 5, date: '2025-07-15', name: '귀 세정', isDone: true },
    { scheduleId: 6, date: '2025-07-18', name: '병원진료', isDone: true },
    {
      scheduleId: 7,
      date: '2025-07-20',
      name: '아침에 약 먹이기',
      isDone: true,
    },
    {
      scheduleId: 8,
      date: '2025-07-28',
      name: '기쁨이 만나서 공원가기',
      isDone: true,
    },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = getYear(currentDate);
  const currentMonth = getMonth(currentDate);
  const firstDay = getDay(new Date(currentYear, currentMonth, 1));

  const today = new Date();
  // const thisMonth = getMonth(today);
  // const thisYear = getYear(today);

  // const firstDay = getDay(new Date(thisYear, thisMonth, 1));

  const weeksOfMonth = getWeeksInMonth(currentDate);
  const dateArray = Array.from(
    { length: weeksOfMonth * 7 },
    (_, i) => i - firstDay + 1,
  );

  // month 이동
  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };
  const goToPrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  return (
    <div className="hidden w-full flex-col items-center sm:flex">
      <div className="mb-8 flex items-center gap-14">
        <Icon
          onClick={goToPrevMonth}
          className="cursor-pointer"
          width="14px"
          height="22px"
          left="-108px"
          top="-122px"
        />
        <span className="text-[24px] leading-[1.2]">{currentMonth + 1}월</span>
        <Icon
          onClick={goToNextMonth}
          className="cursor-pointer"
          width="14px"
          height="22px"
          left="-155px"
          top="-122px"
        />
      </div>
      <div className="flex w-full">
        {['일', '월', '화', '수', '목', '금', '토'].map((week) => (
          <div
            key={week}
            className="basis-1/7 border-b-3 border-[var(--color-primary-300)] pb-4 text-center text-lg"
          >
            {week}
          </div>
        ))}
      </div>
      <div className="flex h-full w-full flex-wrap">
        {dateArray.map((date) => {
          const thisDate = new Date(currentYear, currentMonth, date);
          const isToday =
            thisDate.getFullYear() === today.getFullYear() &&
            thisDate.getMonth() === today.getMonth() &&
            thisDate.getDate() === today.getDate();

          return (
            <DateItem
              key={date}
              date={date}
              targetMonth={currentDate}
              schedules={data.filter(
                (schedule) =>
                  schedule.date ===
                  `${currentYear}-${currentMonth + 1 < 10 ? '0' + (currentMonth + 1) : currentMonth + 1}-${date + 1 < 10 ? '0' + date : date}`,
              )}
              isToday={isToday}
            />
          );
        })}
      </div>
    </div>
  );
}
