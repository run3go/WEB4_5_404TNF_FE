import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { getDiaryList } from '@/api/diary';

type Params = {
  petId?: number;
  recordAt?: string;
};

export const useGetDiaryList = ({ petId, recordAt }: Params) => {
  return useInfiniteQuery<
    DiaryListResponse,
    Error,
    InfiniteData<DiaryListResponse>,
    ['diaryList', number?, string?],
    number
  >({
    queryKey: ['diaryList', petId, recordAt],
    queryFn: ({ pageParam }) =>
      getDiaryList({ petId, recordAt, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 30,
  });
};
