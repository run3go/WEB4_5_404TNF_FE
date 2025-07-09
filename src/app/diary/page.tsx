'use client';
import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import LogCard from '@/components/diary/LogCard';
import Link from 'next/link';

export default function Diary() {
  const options = [
    { value: 'all', label: '모든 강아지' },
    { value: '이마음', label: '이마음' },
    { value: '이구름', label: '이구름' },
    { value: '이솜', label: '이솜' },
  ];

  return (
    <div className="h-[calc(100vh-176px)] w-[1548px] bg-[var(--color-background)] p-10">
      <div className="mb-3 flex justify-between">
        <div className="flex gap-6 pl-3">
          <div className="flex h-12 w-[160px] items-center justify-between rounded-xl border-1 border-[var(--color-primary-500)] px-4">
            2025. 7. 3
            <Icon width="20px" height="20px" left="-188px" top="-123px" />
          </div>
          <SelectBox
            options={options}
            width="160px"
            borderColor="var(--color-primary-500)"
            footstep
            hasBorder
          />
        </div>
        <Link className="flex items-center gap-2" href={'/post/create'}>
          <Icon width="20px" height="20px" left="-266px" top="-75px" />
          <span className="font-medium">기록하기</span>
        </Link>
      </div>
      <ul className="scrollbar-hidden -mr-3 flex h-[700px] flex-wrap gap-[53px] overflow-y-scroll pt-10 pr-3 pb-4 pl-3">
        {Array(9)
          .fill(0)
          .map((item, i) => (
            <li key={i} className="basis-[calc(33%-31px)]">
              <LogCard />
            </li>
          ))}
      </ul>
    </div>
  );
}
