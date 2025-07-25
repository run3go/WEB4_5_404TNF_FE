import { getTotalUsers } from '@/api/admin';
import { useQuery } from '@tanstack/react-query';

export const useGetTotalUsers = () => {
  return useQuery<{ date: Date; total: number }, Error, number>({
    queryKey: ['users'],
    queryFn: () => getTotalUsers(),
    select: (res) => res?.total,
    retry: 0,
  });
};
