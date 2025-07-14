import { useGuideStore } from '@/stores/guideStore';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import Icon from '../common/Icon';
import GuideList from './GuideList';

export default function RoadmapItem({
  month,
  className,
}: {
  month: number;
  className: string;
}) {
  const setMonth = useGuideStore((state) => state.setMonth);
  const selectedMonth = useGuideStore((state) => state.month);

  const isActive = selectedMonth === month;
  const container = document.querySelector('#guide-container');

  return (
    <li
      className={twMerge(
        'absolute bottom-[95%] left-[27%] sm:bottom-[89%] sm:left-[28%]',
        className,
      )}
    >
      <span
        className={`${isActive && 'text-[var(--color-primary-500)]'} relative mb-5 inline-block`}
      >
        {month}개월
      </span>
      {isActive ? (
        <div
          className={twMerge(
            'absolute top-[50%] left-1/2 -translate-x-1/2 scale-60 cursor-pointer sm:top-[60%] sm:scale-100',
          )}
          onMouseLeave={() => setMonth(0)}
        >
          <Icon
            className="sm:scale-80"
            width="50px"
            height="50px"
            left="-168px"
            top="-364px"
          />
          {container && createPortal(<GuideList />, container)}
        </div>
      ) : (
        <div
          className={twMerge(
            'absolute top-[80%] h-[15px] w-[15px] cursor-pointer rounded-full bg-[#d9d9d9] hover:bg-[var(--color-grey)] sm:h-[25px] sm:w-[25px]',
            `left-1/2 -translate-x-1/2`,
          )}
          onMouseEnter={() => setMonth(month)}
        />
      )}
    </li>
  );
}
