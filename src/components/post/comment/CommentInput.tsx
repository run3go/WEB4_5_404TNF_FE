import { useState } from 'react';
import Button from '../../common/Button';
import Card from '../../common/Card';
import user_default_image from '@/assets/images/default-profile.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '@/api/post';
import { useAuthStore } from '@/stores/authStoe';

export default function CommentInput({ postId }: { postId: number }) {
  const [comment, setComment] = useState('');
  const userInfo = useAuthStore((state) => state.userInfo);

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onMutate: async ({ postId, comment }) => {
      await queryClient.cancelQueries({ queryKey: ['comment-list', postId] });

      const previousData = queryClient.getQueryData(['comment-list', postId]);

      queryClient.setQueryData<CommentListResponse>(
        ['comment-list', postId],
        (oldData) => {
          if (!oldData) return oldData;

          if (!userInfo) return;
          const newReply: PostComment = {
            replyId: Math.random(),
            articleId: postId,
            userId: userInfo?.userId,
            nickname: userInfo?.nickname,
            profileImgPath: userInfo?.userImg || user_default_image,
            content: comment,
            createdAt: new Date().toISOString(),
            updatedAt: null,
          };

          return {
            ...oldData,
            data: {
              ...oldData.data,
              replyList: [newReply, ...oldData.data.replyList],
              pageInfo: {
                ...oldData.data.pageInfo,
                totalElements: oldData.data.pageInfo.totalElements + 1,
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
    onSettled: (post) => {
      queryClient.invalidateQueries({
        queryKey: ['comment-list', post.postId],
      });
    },
    onSuccess: () => {
      console.log('댓글 등록완료');
    },
  });

  const handleSubmit = () => {
    if (!comment) return;
    setComment('');
    createCommentMutation.mutate({ postId, comment });
  };
  if (!userInfo) return;

  return (
    <>
      <div className="hidden flex-col items-end gap-5 sm:flex">
        <Card className="min-h-[120px] w-full p-5">
          <textarea
            className="h-full w-full resize-none text-[18px] font-medium text-[#2B2926] placeholder-[#909090] focus:outline-none"
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            onChange={(e) => setComment(e.target.value.trim())}
            value={comment}
            placeholder="댓글을 작성해주세요."
          />
        </Card>
        <Button
          className="flex h-[60px] w-[152px] items-center justify-center"
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </div>

      <div className="sm:hidden">
        <textarea
          className="h-[52px] w-full resize-none rounded-t-[20px] bg-[#FFECD2] px-5 py-[14px] text-[12px] font-medium text-[#2B2926] placeholder-[#909090] focus:outline-none"
          onInput={(e) => {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          onChange={(e) => setComment(e.target.value.trim())}
          value={comment}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          placeholder="댓글을 남겨주세요"
        />
      </div>
    </>
  );
}
