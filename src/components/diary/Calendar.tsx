import { ko } from 'date-fns/locale';
import { Dispatch, SetStateAction } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import CalendarNav from './CalendarNav';

export default function Calendar({
  selected,
  setSelected,
}: {
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
}) {
  return (
    <div className="h-52 w-52 rounded-xl bg-[var(--color-primary-100)] p-[10px] shadow-[0_3px_8px_rgba(0,0,0,0.24)]">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        locale={ko}
        showOutsideDays
        classNames={{
          month_caption: 'font-medium mb-2',
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
  );
}
