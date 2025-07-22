'use client';

import { useState } from 'react';
import PostDetailCard from './PostDetailCard';
import CommentInput from './comment/CommentInput';
import CommentList from './comment/CommentList';
import ReportModal from './ReportModal';
import PostEditModal from './PostEditModal';
import MobilePostEditModal from './MobilePostEditModal';
import MobileTitle from '../common/MobileTitle';
import { useMutation } from '@tanstack/react-query';
import { removePost } from '@/api/post';
import { usePathname, useRouter } from 'next/navigation';

export default function PostDetailWrapper({
  postDetail,
}: {
  postDetail: PostDeatail;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const removePostMutation = useMutation({
    mutationFn: removePost,
    onSuccess: () => {
      const path = pathname.split('/').slice(0, -1).join('/');
      router.push(path);
    },
  });

  const handleRemoveClick = () => {
    removePostMutation.mutate({ postId: postDetail.articleId });
  };

  return (
    <div
      className={`scrollbar-hidden relative flex w-screen flex-col bg-[var(--color-background)] sm:mt-5 sm:w-full sm:rounded-[50px] sm:px-[6.28vw] ${
        isReportModalOpen ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
    >
      {isReportModalOpen && (
        <div
          className="fixed inset-0 z-250 flex items-center justify-center bg-[#2B2926]/50"
          onClick={() => setIsReportModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ReportModal
              reportedName={postDetail.nickname}
              reportedId={postDetail.userId}
              reportType="BOARD"
              contentId={postDetail.articleId}
              onClose={() => setIsReportModalOpen(false)}
            />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <>
          <div
            className="fixed inset-0 z-250 hidden items-center justify-center bg-[#2B2926]/50 sm:flex"
            onClick={() => setIsEditModalOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <PostEditModal
                postDetail={postDetail}
                onClose={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
          <div className="fixed z-[120] sm:hidden">
            <MobilePostEditModal onClose={() => setIsEditModalOpen(false)} />
          </div>
        </>
      )}

      <div className="flex w-full flex-col gap-2 sm:w-full sm:gap-8 sm:pt-8">
        <MobileTitle title="게시글" closePage={() => {}} />
        <PostDetailCard
          postDetail={postDetail}
          onReportClick={() => setIsReportModalOpen(true)}
          onEditClick={() => setIsEditModalOpen(true)}
          onRemoveClick={handleRemoveClick}
        />
        <div className="flex flex-col-reverse sm:block">
          <CommentInput postId={postDetail.articleId} />
          <CommentList
            postId={postDetail.articleId}
            totalComment={postDetail.replies}
            onReportClick={() => setIsReportModalOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}
