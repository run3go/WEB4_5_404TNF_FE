'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import EditImageList from './EditImageList';
import MobileTitle from '@/components/common/MobileTitle';
import { usePathname, useRouter } from 'next/navigation';
import { useCreatePost } from '@/lib/hooks/post/useCreatePost';

export default function MobilePostCreate({
  pickedImages,
  setPickedImages,
}: {
  pickedImages: (File | string)[];
  setPickedImages: Dispatch<SetStateAction<(File | string)[]>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split('/').slice(0, -1).join('/');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardType, setBoardType] = useState<'FREE' | 'QUESTION'>('FREE');

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
    <div className="flex h-full flex-col bg-[var(--color-background)]">
      <MobileTitle
        title="게시글 작성"
        closePage={() => {
          router.push(path);
        }}
        onSave={() => {
          handleSubmit(title, content, pickedImages);
        }}
      />
      <div className="flex w-full flex-col gap-6">
        <div className="flex justify-center gap-[15px] pt-5 pb-3">
          <Button
            className="board__btn"
            onClick={() => setBoardType('QUESTION')}
          >
            <Icon
              width="20px"
              height="20px"
              left="-27px"
              top="-165px"
              className="scale-60"
            />
            <p className="text-[10px] sm:text-[18px]">질문게시판</p>
          </Button>
          <Button className="board__btn" onClick={() => setBoardType('FREE')}>
            <Icon
              width="20px"
              height="20px"
              left="-67px"
              top="-166px"
              className="scale-60"
            />
            <p className="text-[10px]">자유게시판</p>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            className="h-[44px] w-full border-b border-b-[#2B2926]/50 p-4 pr-6 text-[12px] font-medium focus:outline-none"
            placeholder="제목 입력"
            onChange={(e) => setTitle(e.target.value.trim())}
          />
          <textarea
            className="min-h-[300px] w-full resize-none overflow-hidden border-b border-b-[#2B2926]/50 p-4 text-[12px] font-medium focus:outline-none"
            placeholder="내용 입력"
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            onChange={(e) => setContent(e.target.value.trim())}
          />
        </div>

        <div className="min-w-[254px]">
          <EditImageList
            pickedImages={pickedImages}
            setPickedImages={setPickedImages}
          />
        </div>
      </div>
    </div>
  );
}
