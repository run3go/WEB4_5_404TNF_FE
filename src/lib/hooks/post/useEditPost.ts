import { updatePost } from '@/api/post';
import { Toast } from '@/components/common/Toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useEditPost = (
  boardType: 'FREE' | 'QUESTION',
  postId: number,
  onClose: () => void,
) => {
  const router = useRouter();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      onClose();
      router.push(`/post/${boardType.toLowerCase()}/${postId}`);
    },
    onError: () => {
      Toast.error('게시글 수정에 실패했습니다.');
    },
  });
};
