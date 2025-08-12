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
    <div className="aspect-square rounded-xl bg-[var(--color-background)] px-2 shadow-[0_3px_8px_rgba(0,0,0,0.24)] sm:hidden dark:bg-[var(--color-black)]">
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
            'flex items-center justify-center font-medium mb-2 bg-[var(--color-primary-500)] text-sm -mx-2 rounded-t-xl py-2 h-[40px] leading-[1.2]',
          caption_label: 'text-black dark:text-[var(--color-background)]',
          months: 'w-full relative h-full',
          month_grid: 'w-full grow-1 max-h-110 mb-8',
          weekday: 'h-6 font-medium',
          root: 'h-full text-xs min-[560px]:text-sm text-center',
          day: 'w-1/7 ',
          day_button:
            'w-full h-full cursor-pointer flex justify-center items-center leading-none',
          outside: 'text-[var(--color-grey)]',
          selected: 'calendar-circle ',
          month: 'h-full flex flex-col',
          weeks: 'h-full',
        }}
        components={{
          Nav: CalendarNav,
        }}
      />
    </div>
  );
}
