'use client';

import { useState } from 'react';
import PostDetailCard from './PostDetailCard';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ReportModal from './ReportModal';
import PostEditModal from './PostEditModal';
import MobilePostEditModal from './MobilePostEditModal';

export default function PostDetailWrapper() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div
      className={`scrollbar-hidden relative flex h-screen w-full max-w-[1548px] flex-col bg-[var(--color-background)] sm:mt-5 sm:h-[calc(100vh-176px)] sm:rounded-[50px] sm:px-[120px] ${
        isReportModalOpen ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
    >
      {isReportModalOpen && (
        <div
          className="fixed top-[116px] right-[49px] bottom-[60px] left-[315px] z-50 flex items-center justify-center rounded-[50px] bg-[#2B2926]/50"
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
            className="fixed top-[116px] right-[49px] bottom-[60px] left-[315px] z-50 hidden items-center justify-center rounded-[50px] bg-[#2B2926]/50 sm:flex"
            onClick={() => setIsEditModalOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <PostEditModal onClose={() => setIsEditModalOpen(false)} />
            </div>
          </div>
          <div className="fixed z-50 sm:hidden">
            <MobilePostEditModal />
          </div>
        </>
      )}

      <div className="flex w-full flex-col gap-2 sm:w-[1308px] sm:gap-8 sm:pt-8">
        <PostDetailCard
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
