'use client';

import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import MobilePostCreate from '@/components/post/MobilePostCreate';
import PostCreateImages from '@/components/post/PostCreateImages';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useCreatePost } from '@/lib/hooks/post/useCreatePost';

export default function PostCreate() {
  const pathname = usePathname();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardType, setBoardType] = useState<'FREE' | 'QUESTION'>('FREE');
  const [pickedImages, setPickedImages] = useState<(File | string)[]>([]);

  const postCreateMutation = useCreatePost(boardType);

  const handleSubmit = (
    title: string,
    content: string,
    pickedImages: (File | string)[],
  ) => {
    if (postCreateMutation.isPending) return;
    postCreateMutation.mutate({
      title,
      content,
      boardType,
      images: pickedImages,
    });
  };

  useEffect(() => {
    if (pathname.includes('free')) {
      setBoardType('FREE');
    }
    if (pathname.includes('question')) {
      setBoardType('QUESTION');
    }
  }, [pathname]);

  return (
    <>
      <div className="hidden h-full w-full flex-col items-center rounded-[50px] bg-[var(--color-background)] py-8 sm:flex dark:bg-[#2B2926]">
        <p className="text-center text-[24px] font-bold">게시물 작성</p>
        <Card className="scrollbar-hidden mt-8 h-full w-[69vw] overflow-y-auto pt-16">
          <div className="flex gap-7 px-[8.37vw] text-[20px] font-medium sm:mt-8">
            <label className="shrink-0 text-[20px] font-medium" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              className="w-full placeholder:text-[#909090] focus:outline-none"
              placeholder="제목을 입력해주세요"
              onChange={(e) => setTitle(e.target.value.trim())}
            />
          </div>
          <div className="flex gap-7 px-[8.37vw] pt-7 text-[20px] font-medium">
            <label className="shrink-0" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              className="scrollbar-hidden min-h-[236px] w-full resize-none pb-8 placeholder:text-[#909090] focus:outline-none"
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              onChange={(e) => setContent(e.target.value.trim())}
              placeholder="내용을 입력해주세요"
            />
          </div>
          <PostCreateImages
            pickedImages={pickedImages}
            setPickedImages={setPickedImages}
          />
          <div
            className="flex justify-center"
            onClick={() => handleSubmit(title, content, pickedImages)}
          >
            <Button
              className="mt-20 flex h-[68px] w-[200px] cursor-pointer items-center justify-center disabled:bg-[#2B2926]/20 disabled:text-[#909090]"
              disabled={title.length === 0 || content.length === 0}
            >
              저장하기
            </Button>
          </div>
        </Card>
      </div>
      <div className="scrollbar-hidden block h-full w-screen overflow-x-hidden sm:hidden">
        <MobilePostCreate
          pickedImages={pickedImages}
          setPickedImages={setPickedImages}
        />
      </div>
    </>
  );
}
