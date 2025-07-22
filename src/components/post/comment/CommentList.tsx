'use client';
import { useState } from 'react';
import MeatballsMenu from '../../common/MeatballsMenu';
import WriterInfo from '../../common/WriterInfo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCommentList, removeComment, updateComment } from '@/api/post';
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

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['comment-list', postId],
    queryFn: () => getCommentList({ postId, totalComment }),
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onMutate: async ({ replyId, comment }) => {
      handleCancel();
      await queryClient.cancelQueries({ queryKey: ['comment-list', postId] });

      const previousData = queryClient.getQueryData(['comment-list', postId]);

      queryClient.setQueryData<CommentListResponse>(
        ['comment-list', postId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              replyList: oldData.data.replyList.map((reply) => {
                return reply.replyId === replyId
                  ? { ...reply, content: comment }
                  : reply;
              }),
            },
          };
        },
      );

      return { previousData };
    },
    onError: (_err, post, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['comment-list', post.postId],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comment-list', postId] });
    },
  });

  const removeCommentMutation = useMutation({
    mutationFn: removeComment,
    onMutate: async ({ postId, replyId }) => {
      await queryClient.cancelQueries({ queryKey: ['comment-list', postId] });

      const previousData = queryClient.getQueryData(['comment-list', postId]);

      queryClient.setQueryData<CommentListResponse>(
        ['comment-list', postId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              replyList: oldData.data.replyList.filter(
                (reply) => reply.replyId !== replyId,
              ),
              pageInfo: {
                ...oldData.data.pageInfo,
                totalElements: oldData.data.pageInfo.totalElements - 1,
              },
            },
          };
        },
      );

      return { previousData };
    },
    onError: (_err, post, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['comment-list', post.postId],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comment-list', postId] });
    },
  });

  const handleEditClick = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  };

  const handleCancel = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };

  const handleUpdateComment = (replyId: number, comment: string) => {
    updateCommentMutation.mutate({ postId, replyId, comment });
  };

  const handleRemoveComment = (postId: number, replyId: number) => {
    removeCommentMutation.mutate({ postId, replyId });
  };
  return (
    <>
      <div
        className={`${data?.data?.replyList.length === 0 ? 'mb-8' : 'mb-16'}`}
      >
        <p className="pl-[34px] text-[16px] font-medium sm:pl-0 sm:text-[22px] sm:font-bold">{`댓글 (${data?.data.pageInfo.totalElements ?? 0})`}</p>
        {data?.data?.replyList.length === 0 && (
          <p className="mt-20 text-center text-[18px] font-medium text-[#909090]">
            등록된 댓글이 없습니다.
          </p>
        )}

        {data?.data?.replyList.map((comment: PostComment) => {
          const isEditing = editingCommentId === comment.replyId;

          return (
            <div
              key={comment.replyId}
              className="mx-6 border-b border-b-[#FCC389] p-2 pb-3 sm:mx-0 sm:min-h-[128px] sm:w-full sm:border-b-[#2B2926]/50 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <WriterInfo
                  authorId={comment.userId}
                  name={comment.nickname}
                  postedAt={comment.createdAt}
                  profileImage={comment.profileImgPath}
                />

                {isEditing ? (
                  <div className="flex gap-[17px] text-[16px] font-medium">
                    <div
                      className="cursor-pointer text-[#FF9526]"
                      onClick={() =>
                        handleUpdateComment(comment.replyId, editedContent)
                      }
                    >
                      저장
                    </div>
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
                    onRemoveClick={() =>
                      handleRemoveComment(postId, comment.replyId)
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
