import { formatDate } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';
import CalendarNav from '../diary/CalendarNav';
import Icon from './Icon';

export default function DateInput({
  className,
  selected,
  setSelected,
}: {
  className: string;
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
}) {
  const [isDateInputOpen, setIsDateInputOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const today = new Date();

  const handleSelectDate = (date: Date | undefined) => {
    setIsDateInputOpen(false);
    setSelected(date);
  };
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsDateInputOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, []);
  return (
    <div className="relative">
      <div
        className={twMerge(
          'flex cursor-pointer items-center justify-between px-5 py-2',
          className,
        )}
        onClick={() => setIsDateInputOpen(true)}
      >
        {selected
          ? formatDate(selected, 'yyyy. MM. dd')
          : formatDate(today, 'yyyy. MM. dd')}
        <Icon
          className="scale-90"
          width="20px"
          height="20px"
          left="-188px"
          top="-123px"
        />
      </div>
      {isDateInputOpen && (
        <div
          className="absolute top-[100%] left-0 z-200 h-55 w-full min-w-55 rounded-xl bg-[var(--color-background)] px-2 shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
          ref={inputRef}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelectDate}
            locale={ko}
            showOutsideDays
            classNames={{
              month_caption:
                'font-medium mb-2 bg-[var(--color-primary-500)] -mx-2 rounded-t-xl py-2',
              months: 'w-full relative',
              month_grid: 'w-full',
              weekday: 'h-6 font-medium',
              root: 'h-full text-xs text-center',
              day: 'w-1/7 h-6',
              day_button: 'w-full h-full cursor-pointer ',
              outside: 'text-[var(--color-grey)]',
              selected: 'calendar-circle',
            }}
            components={{
              Nav: CalendarNav,
            }}
          />
        </div>
      )}
    </div>
  );
}
