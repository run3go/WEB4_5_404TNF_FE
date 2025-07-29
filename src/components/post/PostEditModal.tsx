import Button from '../common/Button';
import Icon from '../common/Icon';
import { useEffect, useRef, useState } from 'react';
import PostCreateImages from './PostCreateImages';
import { usePathname } from 'next/navigation';
import { useEditPost } from '@/lib/hooks/post/useEditPost';

export default function PostEditModal({
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
  const [boardType, setBoardType] = useState<'FREE' | 'QUESTION'>('FREE');
  const [pickedImages, setPickedImages] = useState<(File | string)[]>(
    postDetail?.images?.map((img) => img.savePath),
  );
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const postUpdateMutation = useEditPost(boardType, Number(postId), onClose);

  const handleSubmit = (
    title: string,
    content: string,
    pickedImages: (File | string)[],
    postId: number,
  ) => {
    if (postUpdateMutation.isPending) return;
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
        postDetail?.images?.map(async (img, i) => {
          const res = await fetch(img.savePath);
          const blob = await res.blob();
          return new File([blob], `image${i}.jpg`, { type: blob.type });
        }),
      );
      setPickedImages(files);
    };

    convertImages();
  }, [postDetail.images]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <>
      <div className="hidden h-[73.6vh] w-[57.53vw] flex-col rounded-[20px] border-[3px] border-[#FCC389] bg-[#FFFDF7] px-8 pt-8 pr-15 sm:flex dark:bg-[#343434]">
        {postUpdateMutation.isPending ? (
          <p className="h-100 w-100">로딩중...</p>
        ) : (
          <>
            <div className="flex shrink-0 items-center justify-end gap-[21.55vw]">
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
                  onChange={(e) => setTitle(e.target.value.trim())}
                  value={title}
                />
              </div>

              <div className="flex gap-7 pt-7 text-[18px] font-medium">
                <label className="shrink-0 text-[#909090]" htmlFor="content">
                  내용
                </label>
                <textarea
                  id="content"
                  ref={contentRef}
                  className="min-h-[160px] w-full resize-none placeholder:text-[#909090] focus:outline-none"
                  onInput={(e) => {
                    e.currentTarget.style.height = 'auto';
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                  }}
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  placeholder="내용을 입력해주세요"
                />
              </div>

              <div className="mt-6 ml-12 flex gap-6">
                <PostCreateImages
                  pickedImages={pickedImages}
                  setPickedImages={setPickedImages}
                />
              </div>

              <div
                className="flex justify-center pb-8"
                onClick={() =>
                  handleSubmit(title, content, pickedImages, Number(postId))
                }
              >
                <Button
                  className="mt-15 flex h-[68px] w-[200px] cursor-pointer items-center justify-center disabled:bg-[#2B2926]/20 disabled:text-[#909090]"
                  disabled={title.length === 0 || content.length === 0}
                >
                  저장하기
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
