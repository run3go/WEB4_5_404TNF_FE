import Card from '@/components/common/Card';
import { RefObject } from 'react';

export default function VaccineInfo({
  ref,
  eng,
}: {
  ref?: RefObject<HTMLDivElement | null>;
  eng: VaccineName;
}) {
  return (
    <Card
      className="absolute z-200 mt-2 w-55 border-2 border-gray-200 bg-[var(--color-background)] px-1 py-2 text-[11px] shadow-sm sm:left-1/2 sm:w-70 sm:-translate-x-1/2 sm:px-4 sm:py-2 sm:text-xs"
      ref={ref}
    >
      <ul className="flex justify-around gap-1 sm:gap-1">
        <li className="flex flex-col items-center gap-1">
          <span>기초 접종</span>
          <span className="font-semibold text-[var(--color-primary-500)]">
            1회
          </span>
        </li>
        <li className="flex flex-col items-center gap-1">
          <span>추가 접종</span>
          <span className="font-semibold text-[var(--color-primary-500)]">
            {eng === 'DHPPL' ? '5' : eng === 'INFLUENZA' ? '1' : '2'}회
          </span>
        </li>
        <li className="flex flex-col items-center gap-1">
          <span>보강 접종</span>
          <span className="font-semibold text-[var(--color-primary-500)]">
            매년 1회
          </span>
        </li>
      </ul>
    </Card>
  );
}
