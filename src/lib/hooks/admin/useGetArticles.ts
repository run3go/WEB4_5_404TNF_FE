import { getArticles } from '@/api/admin';
import { useQuery } from '@tanstack/react-query';

export const useGetArticles = (unit: string) => {
  return useQuery<
    {
      viewDate: Date;
      stats: Article[];
    },
    Error,
    Article[]
  >({
    queryKey: ['articles', unit],
    queryFn: () => getArticles(unit),
    select: (res) => res?.stats,
    retry: 0,
  });
};
