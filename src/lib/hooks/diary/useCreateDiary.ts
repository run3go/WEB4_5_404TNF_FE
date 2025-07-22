import { useMutation } from '@tanstack/react-query';
import { createDiary } from '@/api/diary';

export const useCreateDiary = () => {
  return useMutation({
    mutationFn: createDiary,
  });
};
