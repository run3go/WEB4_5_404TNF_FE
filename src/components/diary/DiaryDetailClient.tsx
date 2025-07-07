'use client';

import { useState } from 'react';
import Card from '../common/Card';
import SelectBox from '../common/SelectBox';
import Calendar from './Calendar';

export default function DiaryDetailClient({ logId }: { logId: string }) {
  const [selected, setSelected] = useState<Date | undefined>();
  console.log(selected, logId);

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
            <div>
              <span className="inline-block w-[102px]">수면시간</span>
              <span>18</span>
              <span> 시간</span>
            </div>
            <div>
              <span className="inline-block w-[102px]">몸무게</span>
              <span>36.8</span>
              <span> kg</span>
            </div>
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
        <Card className="basis-1/3">
          <h2 className="mb-6">식사량</h2>
          <ul className="flex flex-col justify-between gap-4 text-xl">
            <li>
              <span className="inline-block w-[210px]">8시 00분</span>
              <span>1.5 컵</span>
            </li>
            <li>
              <span className="inline-block w-[210px]">19시 00분</span>
              <span>1.5 컵</span>
            </li>
          </ul>
        </Card>
        <Card className="basis-1/3">
          <h2 className="mb-6">산책</h2>
          <ul className="flex flex-col justify-between gap-4 text-xl">
            <li>8시 00분 ~ 8시 20분</li>
            <li>17시 00분 ~ 18시 30분</li>
            <li>23시 00분 ~ 23시 30분</li>
          </ul>
        </Card>
        <Card className="basis-1/3">
          <h2 className="mb-6">간식</h2>
          <ul className="flex flex-col justify-between gap-4 text-xl">
            <li>윔지스 1개</li>
            <li>고구마 말랭이 5개</li>
            <li>당근 머핀 1개</li>
          </ul>
        </Card>
      </div>
      <Card className="flex h-[270px] w-full flex-col">
        <h2 className="mb-4">관찰노트</h2>
        <p className="text-xl">
          날씨가 더워져서 힘들어하는 것 같음, 계속 귀를 긁음 ( 귀세정 당분간
          매일 해야함 ), 간식 좀 많이 먹어서 그런가 저녁밥 남김
        </p>
      </Card>
    </div>
  );
}
