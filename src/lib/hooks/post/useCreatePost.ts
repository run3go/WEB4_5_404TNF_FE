import { createPost } from '@/api/post';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreatePost = (boardType: 'FREE' | 'QUESTION') => {
  const router = useRouter();
  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      router.push(`/post/${boardType.toLowerCase()}/${data.data.articleId}`);
    },
  });
};
