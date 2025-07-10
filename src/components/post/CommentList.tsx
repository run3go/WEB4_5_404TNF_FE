'use client';
import { useState } from 'react';
import MeatballsMenu from '../common/MeatballsMenu';
import WriterInfo from '../common/WriterInfo';

const COMMENTS = [
  {
    id: '1',
    name: '유저닉네임',
    postedAt: '2025.06.20 12:34',
    content: '댓글 내용내용댓',
  },
  {
    id: '2',
    name: '유저닉네임',
    postedAt: '2025.06.20 12:34',
    content: '댓글 내용내용',
  },
  {
    id: '3',
    name: '유저닉네임',
    postedAt: '2025.06.20 12:34',
    content: '댓글 내용내용',
  },
  {
    id: '4',
    name: '유저닉네임',
    postedAt: '2025.06.20 12:34',
    content: '댓글 내용내용',
  },
];

export default function CommentList({
  onReportClick,
}: {
  onReportClick: () => void;
}) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  const handleEditClick = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  };

  const handleCancel = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };
  return (
    <>
      <div className="mb-8">
        <p className="pl-[34px] text-[16px] font-medium sm:pl-0 sm:text-[22px] sm:font-bold">{`댓글 (${COMMENTS.length})`}</p>
        {COMMENTS.map((comment) => {
          const isEditing = editingCommentId === comment.id;

          return (
            <div
              key={comment.id}
              className="mx-6 border-b border-b-[#FCC389] p-2 pb-3 sm:mx-0 sm:min-h-[128px] sm:w-[1308px] sm:border-b-[#2B2926]/50 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <WriterInfo name={comment.name} postedAt={comment.postedAt} />

                {isEditing ? (
                  <div className="flex gap-[17px] text-[16px] font-medium">
                    <div className="cursor-pointer text-[#FF9526]">저장</div>
                    <div
                      onClick={handleCancel}
                      className="cursor-pointer text-[#909090]"
                    >
                      취소
                    </div>
                  </div>
                ) : (
                  <MeatballsMenu
                    options={[
                      { id: '1', label: '수정', type: 'comment' },
                      { id: '2', label: '삭제', type: 'comment' },
                      { id: '3', label: '신고하기', type: 'comment' },
                    ]}
                    onReportClick={onReportClick}
                    onEditClick={() =>
                      handleEditClick(comment.id, comment.content)
                    }
                  />
                )}
              </div>

              <div className="pt-3 pb-1 text-[12px] font-medium sm:pt-6 sm:text-[16px]">
                {isEditing ? (
                  <textarea
                    className="scrollbar-hidden h-full w-full resize-none rounded-[12px] border border-[#2B2926]/50 p-4 text-[16px] font-medium text-[#2B2926] placeholder-[#909090] focus:outline-none"
                    onChange={(e) => setEditedContent(e.target.value)}
                    onInput={(e) => {
                      e.currentTarget.style.height = 'auto';
                      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                    value={editedContent}
                    placeholder="댓글을 작성해주세요."
                  />
                ) : (
                  comment.content
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
