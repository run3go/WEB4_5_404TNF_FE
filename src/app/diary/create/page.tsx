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
import MobileTitle from '@/components/common/MobileTitle';
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
    <main className="flex w-screen flex-col bg-[var(--color-background)] px-4 pt-6 pb-5 text-sm sm:m-0 sm:block sm:w-full sm:p-0">
      <MobileTitle title="멍멍일지" />
      <div className="relative flex w-full flex-col gap-6 sm:h-200 sm:px-19">
        <div className="flex w-full justify-between gap-6 sm:hidden sm:justify-start sm:pl-3">
          <div className="flex w-[137px] items-center justify-between rounded-xl border-1 border-[var(--color-primary-500)] px-4 sm:w-[160px]">
            2025. 7. 3
            <Icon width="20px" height="20px" left="-188px" top="-123px" />
          </div>
          <SelectBox
            options={options}
            width="178px"
            borderColor="var(--color-primary-500)"
            footstep
            hasBorder
          />
        </div>
        <div className="absolute top-1 right-[65px] hidden self-end text-base sm:block">
          <SelectBox options={options} width="105px" footstep />
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14 sm:pt-15">
          <div className="flex w-full flex-col items-center gap-6 sm:w-105 sm:gap-7">
            <div className="hidden w-full justify-between sm:flex">
              <Image src={diary} alt="오늘의 멍멍일지를 적어보아요!" />
              <Calendar selected={selected} setSelected={setSelected} />
            </div>
            <Card className="m-0 w-full p-0 sm:p-0">
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
                <h2 className="text-sm leading-[1.2] font-extrabold text-[var(--color-primary-500)] sm:text-base">
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
          <div className="flex grow flex-col gap-6 sm:gap-12">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-14">
              <FeedInput />
              <WalkingInput />
            </div>
            <Note />
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col sm:hidden">
        <span className="cursor-pointer self-end pr-4 text-xs text-[var(--color-grey)] sm:hidden">
          댕댕일지 삭제하기
        </span>
        <div className="h-15" />
        <button className="fixed right-0 bottom-0 left-0 bg-[var(--color-primary-300)] py-5">
          저장하기
        </button>
      </div>
    </main>
  );
}
