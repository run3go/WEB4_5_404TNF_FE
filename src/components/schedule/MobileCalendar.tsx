'use client';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import CalendarNav from '../diary/CalendarNav';

export default function MobileCalendar({
  selectedDate,
  onDateSelect,
  onChangeMonth,
  scheduleDates,
}: {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  onChangeMonth: (date: Date) => void;
  scheduleDates: Date[];
}) {
  return (
    <div className="aspect-square w-full rounded-xl bg-[var(--color-background)] px-2 shadow-[0_3px_8px_rgba(0,0,0,0.24)] sm:hidden">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date: Date | undefined) => {
          if (date) {
            onDateSelect(date);
          }
        }}
        onMonthChange={(month) => onChangeMonth(month)}
        locale={ko}
        showOutsideDays
        modifiers={{
          hasSchedule: scheduleDates,
        }}
        modifiersClassNames={{
          hasSchedule: 'sm:hidden has-schedule relative',
        }}
        classNames={{
          month_caption:
            'font-medium mb-5 bg-[var(--color-primary-500)] -mx-2 rounded-t-xl py-2 h-[40px]',
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
  );
}
