import { getDay, getDaysInMonth, getMonth, getYear } from 'date-fns';
import Icon from '../common/Icon';

export default function CustomCalendar() {
  const today = new Date();
  const thisMonth = getMonth(today);
  const thisYear = getYear(today);

  const firstDay = getDay(new Date(thisYear, thisMonth, 1));
  const endOfMonth = getDaysInMonth(today);
  console.log(endOfMonth);
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-12 flex items-center gap-14">
        <Icon
          className="cursor-pointer"
          width="14px"
          height="22px"
          left="-108px"
          top="-122px"
        />
        <span className="text-[32px] leading-[1.2]">7월</span>
        <Icon
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
            className="basis-1/7 border-b-3 border-[var(--color-primary-300)] pb-6 text-center text-2xl"
          >
            {week}
          </div>
        ))}
      </div>
    </div>
  );
}
