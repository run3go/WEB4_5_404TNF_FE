'use client';
import SelectBox from '@/components/common/SelectBox';
import Calendar from '@/components/diary/Calendar';
import FeedInput from '@/components/diary/create/FeedInput';
import Note from '@/components/diary/create/Note';
import SingleInput from '@/components/diary/create/SingleInput';
import WalkingInput from '@/components/diary/create/WalkingInput';

import diary from '@/assets/images/diary.svg';
import dog from '@/assets/images/dog_img.png';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
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
    <div className="flex h-200 w-full flex-col gap-6 bg-[var(--color-background)] px-19 py-8">
      <div className="self-end">
        <SelectBox options={options} width="105px" footstep />
      </div>
      <div className="flex gap-14">
        <div className="flex w-105 flex-col items-center gap-7">
          <div className="flex w-full justify-between">
            <Image src={diary} alt="오늘의 멍멍일지를 적어보아요!" />
            <Calendar selected={selected} setSelected={setSelected} />
          </div>
          <Card className="m-0 w-full p-0">
            <h3 className="rounded-t-[12px] bg-[var(--color-primary-300)] py-2 text-center text-lg">
              이마음
            </h3>
            <div className="flex gap-8 px-6 py-4">
              <Image
                className="h-30 w-30 rounded-[12px]"
                src={dog}
                alt="강아지 프로필"
                priority
              />
              <div className="flex flex-col justify-around text-sm sm:text-base">
                <span>골든 리트리버 (대형견)</span>
                <span>5년 6개월</span>
                <span>
                  가족이 된지
                  <strong className="font-medium text-[var(--color-primary-500)]">
                    1943
                  </strong>
                  일
                </span>
              </div>
            </div>
          </Card>
          <Card className="flex w-full flex-col gap-5 border border-[var(--color-primary-500)] text-lg">
            <div className="flex items-center justify-between border-b border-[var(--color-primary-500)] pb-3">
              <h2 className="text-base leading-[1.2] font-extrabold text-[var(--color-primary-500)]">
                오늘의 건강기록
              </h2>
              <Icon
                className="cursor-pointer"
                width="12px"
                height="12px"
                left="-262px"
                top="-259px"
              />
            </div>
            <SingleInput title="몸무게" id="weight" />
            <SingleInput title="수면시간" id="sleep" />
          </Card>
        </div>
        <div className="flex grow flex-col gap-12">
          <div className="flex w-full justify-between gap-14">
            <FeedInput />
            <WalkingInput />
          </div>
          <Note />
        </div>
      </div>
    </div>
  );
}
