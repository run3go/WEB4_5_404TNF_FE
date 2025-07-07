'use client';
import SelectBox from '@/components/common/SelectBox';
import Calendar from '@/components/diary/Calendar';
import FeedInput from '@/components/diary/create/FeedInput';
import Note from '@/components/diary/create/Note';
import SingleInput from '@/components/diary/create/SingleInput';
import SnackInput from '@/components/diary/create/SnackInput';
import WalkingInput from '@/components/diary/create/WalkingInput';
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
    <div className="flex h-[904px] w-[1548px] flex-col gap-12 px-19 py-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-12">
          <Calendar selected={selected} setSelected={setSelected} />
          <div className="flex flex-col gap-5 text-lg">
            <SingleInput title="수면시간" id="sleep" />
            <SingleInput title="몸무게" id="weight" />
          </div>
        </div>
        <div className="self-start">
          <SelectBox
            options={options}
            width={105}
            expendMenuWidth={20}
            footstep
          />
        </div>
      </div>
      <div className="flex h-70 w-full gap-18">
        <FeedInput />
        <WalkingInput />
        <SnackInput />
      </div>
      <Note />
    </div>
  );
}
