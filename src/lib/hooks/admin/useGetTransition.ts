import { getTransition } from '@/api/admin';
import { useQuery } from '@tanstack/react-query';

export const useGetTransition = (unit: string) => {
  return useQuery<
    {
      viewDate: Date;
      stats: Transition[];
    },
    Error,
    Transition[]
  >({
    queryKey: ['transition', unit],
    queryFn: () => getTransition(unit),
    select: (res) => res?.stats,
    retry: 0,
  });
};
