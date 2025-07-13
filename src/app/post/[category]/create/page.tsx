'use client';

import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import Image from 'next/image';
import img from '@/assets/images/dog_img.png';
import Button from '@/components/common/Button';
import MobilePostCreate from '@/components/post/MobilePostCreate';

export default function PostCreate() {
  return (
    <>
      <div className="hidden h-full w-full flex-col items-center rounded-[50px] bg-[var(--color-background)] py-8 sm:flex">
        <p className="text-center text-[24px] font-bold">게시물 작성</p>
        <Card className="scrollbar-hidden mt-8 h-full w-[69vw] overflow-y-auto pt-16">
          <div className="flex gap-7 px-[8.37vw] text-[20px] font-medium">
            <label className="shrink-0 text-[20px] font-medium" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              className="w-full placeholder:text-[#909090] focus:outline-none"
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className="flex gap-7 px-[8.37vw] pt-7 text-[20px] font-medium">
            <label className="shrink-0" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              className="min-h-[236px] w-full resize-none placeholder:text-[#909090] focus:outline-none"
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              placeholder="내용을 입력해주세요"
            />
          </div>
          <div className="mt-6 ml-12 flex gap-6 px-[8.37vw]">
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
      <div className="scrollbar-hidden block h-full w-screen overflow-x-hidden sm:hidden">
        <MobilePostCreate />
      </div>
    </>
  );
}
