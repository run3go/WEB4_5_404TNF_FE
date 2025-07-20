'use client';

import { useState } from 'react';
import PostDetailCard from './PostDetailCard';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ReportModal from './ReportModal';
import PostEditModal from './PostEditModal';
import MobilePostEditModal from './MobilePostEditModal';
import MobileTitle from '../common/MobileTitle';

export default function PostDetailWrapper({
  postDetail,
}: {
  postDetail: PostDeatail;
}) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div
      className={`scrollbar-hidden relative flex w-screen flex-col bg-[var(--color-background)] sm:mt-5 sm:h-full sm:w-full sm:rounded-[50px] sm:px-[6.28vw] ${
        isReportModalOpen ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
    >
      {isReportModalOpen && (
        <div
          className="fixed inset-0 z-250 flex items-center justify-center bg-[#2B2926]/50"
          onClick={() => setIsReportModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ReportModal onClose={() => setIsReportModalOpen(false)} />
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
              <PostEditModal onClose={() => setIsEditModalOpen(false)} />
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
        />
        <div className="flex flex-col-reverse sm:block">
          <CommentInput />
          <CommentList onReportClick={() => setIsReportModalOpen(true)} />
        </div>
      </div>
    </div>
  );
}
