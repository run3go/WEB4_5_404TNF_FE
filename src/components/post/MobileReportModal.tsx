'use client';

import Button from '../common/Button';
import SelectBox from '../common/SelectBox';
import MobileTitle from '@/components/common/MobileTitle';

const CATEGORY = [
  { value: '카테고리1', label: '카테고리1' },
  { value: '카테고리2', label: '카테고리2' },
  { value: '카테고리3', label: '카테고리3' },
];

export default function MobileReportModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="flex h-screen w-screen flex-col justify-center bg-[#FFFDF7] p-4">
      <MobileTitle title="신고하기" closePage={onClose} />

      <div className="mt-6 flex flex-col gap-5 text-[14px] font-medium">
        <div className="flex items-center gap-4">
          <p className="w-20 shrink-0">대상자</p>
          <p>유저6</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="w-20 shrink-0">카테고리</p>
          <div className="w-full">
            <SelectBox
              options={CATEGORY}
              width="100%"
              isCenter={true}
              hasBorder={true}
              thinBorder={true}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="mb-4">
            신고사유
          </label>
          <textarea
            id="content"
            className="scrollbar-hidden min-h-[200px] w-full resize-none overflow-y-auto rounded-[12px] border border-[#2B2926]/50 p-3 placeholder:text-[#909090] focus:outline-none"
            placeholder="내용을 입력해주세요"
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="h-[48px] w-[140px] text-[14px]">신고하기</Button>
      </div>
    </div>
  );
}
