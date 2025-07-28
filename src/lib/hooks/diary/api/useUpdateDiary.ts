import { useMutation } from '@tanstack/react-query';
import { updateDiary } from '@/api/diary';

export const useUpdateDiary = () => {
  return useMutation({
    mutationFn: ({
      lifeRecordId,
      data,
    }: {
      lifeRecordId: number;
      data: DiarydPayload;
    }) => updateDiary(lifeRecordId, data),
  });
};
