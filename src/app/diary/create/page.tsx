'use client';
import SelectBox from '@/components/common/SelectBox';
import Calendar from '@/components/diary/Calendar';
import FeedInput from '@/components/diary/create/FeedInput';
import Note from '@/components/diary/create/Note';
import SingleInput from '@/components/diary/create/SingleInput';
import WalkingInput from '@/components/diary/create/WalkingInput';

import diary from '@/assets/images/diary.svg';
import Image from 'next/image';
import { useState } from 'react';

export default function DiaryCreate() {
  const [selected, setSelected] = useState<Date | undefined>();
  console.log(selected);

  const options = [
    { value: '이마음', label: '이마음' },
    { value: '이구름', label: '이구름' },
    { value: '이솜', label: '이솜' },
  ];

  return (
    <div className="flex h-200 w-full flex-col gap-8 bg-[var(--color-background)] px-19 py-8">
      <div className="self-end">
        <SelectBox options={options} width="105px" footstep />
      </div>
      <div className="flex gap-14">
        <div className="flex w-105 flex-col items-center gap-12">
          <div className="flex">
            <Image src={diary} alt="오늘의 멍멍일지를 적어보아요!" />
            <Calendar selected={selected} setSelected={setSelected} />
          </div>
          <div className="flex flex-col gap-5 text-lg">
            <SingleInput title="수면시간" id="sleep" />
            <SingleInput title="몸무게" id="weight" />
          </div>
        </div>
        <div className="flex h-70 w-full flex-col gap-18">
          <div className="flex">
            <FeedInput />
            <WalkingInput />
          </div>
          <Note />
        </div>
      </div>
    </div>
  );
}
