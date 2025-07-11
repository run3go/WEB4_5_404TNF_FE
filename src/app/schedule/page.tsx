'use client';
import alternative from '@/assets/images/alternative-image.svg';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import CalendarNav from '@/components/diary/CalendarNav';
import CustomCalendar from '@/components/schedule/CustomCalendar';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';

export default function Schedule() {
  const [selected, setSelected] = useState<Date | undefined>();
  const mainRef = useRef<HTMLElement | null>(null);

  return (
    <main
      ref={mainRef}
      className="h-[calc(100%-72px)] w-screen bg-[var(--color-background)] px-6 py-8 sm:h-200 sm:w-full sm:px-12 sm:pt-9 sm:pb-12"
    >
      <CustomCalendar />
      <div className="aspect-square w-full rounded-xl bg-[var(--color-background)] px-2 shadow-[0_3px_8px_rgba(0,0,0,0.24)] sm:hidden">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          locale={ko}
          showOutsideDays
          modifiers={{
            hasSchedule: [
              new Date(2025, 6, 1),
              new Date(2025, 6, 4),
              new Date(2025, 6, 5),
              new Date(2025, 6, 8),
              new Date(2025, 6, 10),
              new Date(2025, 6, 13),
              new Date(2025, 6, 14),
              new Date(2025, 6, 17),
            ],
          }}
          modifiersClassNames={{
            hasSchedule: 'sm:hidden has-schedule relative',
          }}
          classNames={{
            month_caption:
              'font-medium mb-2 bg-[var(--color-primary-500)] -mx-2 rounded-t-xl py-2',
            months: 'w-full relative',
            month_grid: 'w-full',
            weekday: 'h-6 font-medium',
            root: 'h-full text-xs text-center',
            day: 'w-1/7 sm:h-6 h-[45px] ',
            day_button: 'w-full h-full cursor-pointer calendar-day',
            outside: 'text-[var(--color-grey)]',
            selected: 'calendar-circle',
          }}
          components={{
            Nav: CalendarNav,
          }}
        />
      </div>
      <Card className="mt-8 max-h-70 min-h-31 w-full text-sm sm:hidden">
        <div className="mb-3 flex justify-between text-[var(--color-grey)]">
          <span>일정 목록</span>
          <span>2025. 7. 5</span>
        </div>
        <ul className="scrollbar-hidden flex max-h-55 flex-col items-center overflow-y-scroll">
          <Image
            className="mt-5"
            src={alternative}
            alt="대체 이미지"
            width={40}
            height={28}
            priority
          />
          <span className="mt-2 mb-3 text-[var(--color-grey)]">
            등록된 일정이 없습니다
          </span>
          {/* <li className="flex items-center justify-between border-b border-[var(--color-primary-300)] p-3">
            <span>할 일1</span>
            <div className="flex gap-3">
              <Icon width="14px" height="14px" left="-225px" top="-168px" />
              <Icon width="14px" height="14px" left="-266px" top="-167px" />
            </div>
          </li>
          <li className="flex items-center justify-between border-b border-[var(--color-primary-300)] p-3">
            <span>할 일2</span>
            <div className="flex gap-3">
              <Icon width="14px" height="14px" left="-225px" top="-168px" />
              <Icon width="14px" height="14px" left="-266px" top="-167px" />
            </div>
          </li>
          <li className="flex items-center justify-between border-b border-[var(--color-primary-300)] p-3">
            <span>할 일3</span>
            <div className="flex gap-3">
              <Icon width="14px" height="14px" left="-225px" top="-168px" />
              <Icon width="14px" height="14px" left="-266px" top="-167px" />
            </div>
          </li>
          <li className="flex items-center justify-between border-b border-[var(--color-primary-300)] p-3">
            <span>할 일3</span>
            <div className="flex gap-3">
              <Icon width="14px" height="14px" left="-225px" top="-168px" />
              <Icon width="14px" height="14px" left="-266px" top="-167px" />
            </div>
          </li>
          <li className="flex items-center justify-between border-b border-[var(--color-primary-300)] p-3">
            <span>할 일3</span>
            <div className="flex gap-3">
              <Icon width="14px" height="14px" left="-225px" top="-168px" />
              <Icon width="14px" height="14px" left="-266px" top="-167px" />
            </div>
          </li>
          <li className="flex items-center justify-between border-b border-[var(--color-primary-300)] p-3">
            <span>할 일3</span>
            <div className="flex gap-3">
              <Icon width="14px" height="14px" left="-225px" top="-168px" />
              <Icon width="14px" height="14px" left="-266px" top="-167px" />
            </div>
          </li>
          <li className="flex items-center justify-between border-b border-[var(--color-primary-300)] p-3">
            <span>할 일3</span>
            <div className="flex gap-3">
              <Icon width="14px" height="14px" left="-225px" top="-168px" />
              <Icon width="14px" height="14px" left="-266px" top="-167px" />
            </div>
          </li> */}
        </ul>
      </Card>
      <div className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden">
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
      {/* {mainRef.current && createPortal(<AddSchedule />, mainRef.current)} */}
    </main>
  );
}
