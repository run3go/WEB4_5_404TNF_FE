'use client';

import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import Image from 'next/image';
import img from '@/assets/images/dog_img.png';
import Button from '@/components/common/Button';

export default function PostCreate() {
  return (
    <>
      <div className="flex h-[calc(100vh-100px)] w-[1548px] flex-col items-center rounded-[50px] bg-[var(--color-background)] py-8">
        <p className="text-center text-[24px] font-bold">게시물 작성</p>
        <Card className="scrollbar-hidden mt-8 h-[694px] w-[1320px] overflow-y-auto px-[160px] pt-16">
          <div className="flex gap-7 text-[20px] font-medium">
            <label className="shrink-0 text-[20px] font-medium" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              className="w-full placeholder:text-[#909090] focus:outline-none"
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className="flex gap-7 pt-7 text-[20px] font-medium">
            <label className="shrink-0" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              className="min-h-[240px] w-full resize-none placeholder:text-[#909090] focus:outline-none"
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              placeholder="내용을 입력해주세요"
            />
          </div>
          <div className="mt-6 ml-12 flex gap-6">
            <div className="flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] bg-[#E1E1E1]">
              <Icon width="22px" height="22px" left="-301px" top="-121px" />
              <p className="text-[16px] font-medium">1 / 5</p>
            </div>
            <div className="relative">
              <Image
                className="rounded-[20px]"
                src={img}
                alt="강아지"
                width={120}
                height={120}
                priority
              />
              <div className="absolute top-[-10px] right-[-10px] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-[#FCC389]">
                <Icon width="12px" height="12px" left="-72px" top="-126px" />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="mt-20 flex h-[68px] w-[200px] cursor-pointer items-center justify-center">
              저장하기
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
