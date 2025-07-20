'use client';
import { useState } from 'react';
import MeatballsMenu from '../../common/MeatballsMenu';
import WriterInfo from '../../common/WriterInfo';
import { useQuery } from '@tanstack/react-query';
import { getCommentList } from '@/api/post';
import { useAuthStore } from '@/stores/authStoe';

export default function CommentList({
  postId,
  totalComment,
  onReportClick,
}: {
  postId: number;
  totalComment: number;
  onReportClick: () => void;
}) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const userInfo = useAuthStore((state) => state.userInfo);

  const { data } = useQuery({
    queryKey: ['comment-list', postId, totalComment],
    queryFn: () => getCommentList({ postId, totalComment }),
  });

  const handleEditClick = (commentId: number, currentContent: string) => {
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
        <p className="pl-[34px] text-[16px] font-medium sm:pl-0 sm:text-[22px] sm:font-bold">{`댓글 (${totalComment})`}</p>
        {data?.data?.replyList.map((comment: Comment) => {
          const isEditing = editingCommentId === comment.replyId;

          return (
            <div
              key={comment.replyId}
              className="mx-6 border-b border-b-[#FCC389] p-2 pb-3 sm:mx-0 sm:min-h-[128px] sm:w-full sm:border-b-[#2B2926]/50 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <WriterInfo
                  name={comment.nickname}
                  postedAt={comment.createdAt}
                  profileImage={comment.profileImgPath}
                />

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
                    onEditClick={() => {
                      if (userInfo) {
                        handleEditClick(comment.replyId, comment.content);
                      }
                    }}
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
