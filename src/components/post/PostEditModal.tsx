import Button from '../common/Button';
import Icon from '../common/Icon';
import Image from 'next/image';
import img from '@/assets/images/dog_img.png';

export default function PostEditModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="hidden h-[680px] w-[1100px] flex-col rounded-[20px] border-[3px] border-[#FCC389] bg-[#FFFDF7] px-8 pt-8 pr-15 sm:flex">
        <div className="flex shrink-0 items-center justify-end gap-[412px]">
          <div className="text-[20px] font-medium">게시글 수정</div>
          <Icon
            width="12px"
            height="12px"
            left="-72px"
            top="-126px"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="scrollbar-hidden mt-8 flex-1 overflow-y-auto pt-11 pl-[40px]">
          <div className="flex gap-7 text-[18px] font-medium">
            <label className="shrink-0 text-[#909090]" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              className="w-full text-[18px] font-medium placeholder:text-[#909090] focus:outline-none"
              placeholder="제목을 입력해주세요"
            />
          </div>

          <div className="flex gap-7 pt-7 text-[18px] font-medium">
            <label className="shrink-0 text-[#909090]" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              className="min-h-[160px] w-full resize-none placeholder:text-[#909090] focus:outline-none"
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
              <p className="text-[16px] font-medium">5 / 5</p>
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

          <div className="flex justify-center pb-8">
            <Button className="mt-15 flex h-[68px] w-[200px] cursor-pointer items-center justify-center">
              저장하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
