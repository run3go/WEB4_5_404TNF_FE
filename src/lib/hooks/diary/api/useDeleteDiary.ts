import { useMutation } from '@tanstack/react-query';
import { deleteDiary } from '@/api/diary';

export const useDeleteDiary = () => {
  return useMutation({
    mutationFn: (lifeRecordId: number) => deleteDiary(lifeRecordId),
  });
};
