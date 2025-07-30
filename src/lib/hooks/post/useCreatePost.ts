import { createPost } from '@/api/post';
import { Toast } from '@/components/common/Toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreatePost = (boardType: 'FREE' | 'QUESTION') => {
  const router = useRouter();
  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      router.push(`/post/${boardType.toLowerCase()}/${data.data.articleId}`);
    },
    onError: (error) => {
      if (error instanceof Error) {
        Toast.error(error.message);
      } else {
        Toast.error('게시글 등록에 실패했습니다.');
      }
    },
  });
};
