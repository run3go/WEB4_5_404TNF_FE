'use client';

import { useState } from 'react';
import PostDetailCard from './PostDetailCard';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ReportModal from './ReportModal';
import PostEditModal from './PostEditModal';

export default function PostDetailWrapper() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div
      className={`scrollbar-hidden relative mt-5 h-[calc(100vh-176px)] w-[1548px] rounded-[50px] bg-[var(--color-background)] px-[120px] ${
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
        <div
          className="fixed top-[116px] right-[49px] bottom-[60px] left-[315px] z-50 flex items-center justify-center rounded-[50px] bg-[#2B2926]/50"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PostEditModal onClose={() => setIsEditModalOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex w-[1308px] flex-col gap-8 pt-8">
        <PostDetailCard
          onReportClick={() => setIsReportModalOpen(true)}
          onEditClick={() => setIsEditModalOpen(true)}
        />
        <CommentInput />
        <CommentList onReportClick={() => setIsReportModalOpen(true)} />
      </div>
    </div>
  );
}
