import { getDiaryDetail } from '@/api/diary';
import { useQuery } from '@tanstack/react-query';

export const useGetDiaryDetail = (lifeRecordId: number) => {
  return useQuery({
    queryKey: ['diaryDetail', lifeRecordId],
    queryFn: () => getDiaryDetail(lifeRecordId),
    enabled: !!lifeRecordId,
    staleTime: 1000,
  });
};
