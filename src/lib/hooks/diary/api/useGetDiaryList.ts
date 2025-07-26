import { useQuery } from '@tanstack/react-query';
import { getDiaryList } from '@/api/diary';

export const useGetDiaryList = ({
  petId,
  recordAt,
  page,
}: {
  petId?: number;
  recordAt?: string;
  page: number;
}) => {
  return useQuery<DiaryListResponse>({
    queryKey: ['diaryList', petId, recordAt, page],
    queryFn: () => getDiaryList({ petId, recordAt, page }),
    staleTime: 1000 * 30,
  });
};
