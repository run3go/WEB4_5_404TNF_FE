import { formatDate, getMonth, getYear } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';
import CalendarNav from '../diary/CalendarNav';
import Icon from './Icon';

export default function DateInput({
  className,
  disableFuture = false,
  selected,
  setSelected,
  showAllDate = false,
  placeholder = '전체 날짜',
  placeholderClassName = '',
}: {
  className: string;
  disableFuture?: boolean;
  selected: Date | undefined;
  setSelected: (value: Date) => void;
  showAllDate?: boolean;
  placeholder?: string;
  placeholderClassName?: string;
}) {
  const [isDateInputOpen, setIsDateInputOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const thisYear = getYear(today);
  const thisMonth = getMonth(today);

  const handleSelectDate = (date: Date | undefined) => {
    setIsDateInputOpen(false);
    if (date) {
      setSelected(date);
    }
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
        {selected ? (
          formatDate(selected, 'yyyy. MM. dd')
        ) : showAllDate ? (
          <span className={placeholderClassName}>{placeholder}</span>
        ) : (
          formatDate(today, 'yyyy. MM. dd')
        )}
        <Icon
          className="scale-70 sm:scale-90"
          width="20px"
          height="20px"
          left="-188px"
          top="-123px"
        />
      </div>
      {isDateInputOpen && (
        <div
          className="absolute top-[100%] right-0 z-200 mt-1 h-55 w-full max-w-55 min-w-55 rounded-xl bg-[var(--color-background)] px-2 shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
          ref={inputRef}
        >
          <DayPicker
            mode="single"
            captionLayout="dropdown-years"
            selected={selected}
            startMonth={new Date(thisYear - 30, thisMonth)}
            onSelect={handleSelectDate}
            disabled={disableFuture && { after: new Date() }}
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
              day_button:
                'w-full h-full cursor-pointer hover:text-[var(--color-primary-500)]',
              outside: 'text-[var(--color-grey)]',
              selected: 'calendar-circle',
              disabled: 'text-[var(--color-grey)] pointer-events-none',
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
