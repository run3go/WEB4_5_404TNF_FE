'use client';

import { usePathname } from 'next/navigation';
import Button from '../common/Button';
import Icon from '../common/Icon';
import EditImageList from './EditImageList';
import MobileTitle from '@/components/common/MobileTitle';
import { useEffect, useState } from 'react';
import { useEditPost } from '@/lib/hooks/post/useEditPost';

export default function MobilePostEditModal({
  postDetail,
  onClose,
}: {
  postDetail: CommunityPostDeatail;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const postId = pathname.split('/').pop();
  const [title, setTitle] = useState(postDetail.title);
  const [content, setContent] = useState(postDetail.content);
  const [boardType, setBoardType] = useState<'FREE' | 'QUESTION'>(
    pathname.includes('free') ? 'FREE' : 'QUESTION',
  );
  const [pickedImages, setPickedImages] = useState<(File | string)[]>(
    postDetail?.images?.map((img) => img.savePath),
  );

  const postUpdateMutation = useEditPost(boardType, Number(postId), onClose);

  const handleSubmit = (
    title: string,
    content: string,
    pickedImages: (File | string)[],
    postId: number,
  ) => {
    if (postUpdateMutation.isPending) return;
    if (title.length === 0 || content.length === 0) return;
    const filesOnly = pickedImages.filter(
      (img) => img instanceof File,
    ) as File[];

    postUpdateMutation.mutate({
      title,
      content,
      boardType,
      images: filesOnly,
      postId,
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

  useEffect(() => {
    const convertImages = async () => {
      const files = await Promise.all(
        postDetail?.images.map(async (img, i) => {
          const res = await fetch(img.savePath);
          const blob = await res.blob();
          return new File([blob], `image${i}.jpg`, { type: blob.type });
        }),
      );
      setPickedImages(files);
    };

    convertImages();
  }, [postDetail?.images]);

  return (
    <div className="flex h-screen flex-col bg-[var(--color-background)]">
      <MobileTitle
        title="게시글 수정"
        closePage={onClose}
        onSave={() =>
          handleSubmit(title, content, pickedImages, Number(postId))
        }
      />

      {postUpdateMutation.isPending ? (
        <p className="h-100 w-100">로딩중</p>
      ) : (
        <>
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-screen justify-center gap-[15px] pt-5 pb-3">
              <Button
                className={`board__btn ${boardType === 'QUESTION' ? '!bg-[var(--color-pink-300)]' : ''}`}
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
              <Button
                className={`board__btn ${boardType === 'FREE' ? '!bg-[var(--color-pink-300)]' : ''}`}
                onClick={() => setBoardType('FREE')}
              >
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
                value={title}
              />
              <textarea
                className="min-h-[300px] w-full resize-none overflow-hidden border-b border-b-[#2B2926]/50 p-4 text-[12px] font-medium focus:outline-none"
                placeholder="내용 입력"
                onInput={(e) => {
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                onChange={(e) => setContent(e.target.value.trim())}
                value={content}
              />
            </div>

            <div className="min-w-[254px]">
              <EditImageList
                pickedImages={pickedImages}
                setPickedImages={setPickedImages}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
