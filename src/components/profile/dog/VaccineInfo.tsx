import Card from '@/components/common/Card';
import { RefObject } from 'react';

export default function VaccineInfo({
  ref,
}: {
  ref: RefObject<HTMLDivElement | null>;
}) {
  return (
    <Card className="absolute top-15 left-20 z-200 mt-2 w-70 border-1 border-[var(--color-primary-300)] bg-[var(--color-background)] px-1 py-2 text-center text-[11px] shadow-sm sm:left-1/2 sm:w-80 sm:-translate-x-1/2 sm:px-4 sm:py-2 sm:text-xs">
      <div ref={ref}>
        <div className="flex w-full border-b-2 border-[var(--color-primary-300)] pb-2 font-semibold">
          <div className="basis-1/4" />
          <span className="basis-1/4">기초 접종</span>
          <span className="basis-1/4">추가 접종</span>
          <span className="basis-1/4">보강 접종</span>
        </div>
        <ul className="flex flex-col">
          <li className="flex w-full py-[6px]">
            <span className="basis-1/4 font-semibold">종합백신</span>
            <span className="basis-1/4">1회</span>
            <span className="basis-1/4">5회</span>
            <span className="basis-1/4">매년 1회</span>
          </li>
          <li className="flex w-full py-[6px]">
            <span className="basis-1/4 font-semibold">코로나 장염</span>
            <span className="basis-1/4">1회</span>
            <span className="basis-1/4">2회</span>
            <span className="basis-1/4">매년 1회</span>
          </li>
          <li className="flex w-full py-[6px]">
            <span className="basis-1/4 font-semibold">켄넬코프</span>
            <span className="basis-1/4">1회</span>
            <span className="basis-1/4">2회</span>
            <span className="basis-1/4">매년 1회</span>
          </li>
          <li className="flex w-full py-[6px]">
            <span className="basis-1/4 font-semibold">인플루엔자</span>
            <span className="basis-1/4">1회</span>
            <span className="basis-1/4">2회</span>
            <span className="basis-1/4">매년 1회</span>
          </li>
          <li className="flex w-full py-[6px]">
            <span className="basis-1/4 font-semibold">광견병</span>
            <span className="basis-1/4">1회</span>
            <span className="basis-1/4">1회</span>
            <span className="basis-1/4">매년 1회</span>
          </li>
        </ul>
      </div>
    </Card>
  );
}
