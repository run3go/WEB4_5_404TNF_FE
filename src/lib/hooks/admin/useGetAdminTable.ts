import { getAdminTable } from '@/api/admin';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminTable = () => {
  return useQuery({
    queryKey: ['Table'],
    queryFn: () => getAdminTable(),
    // select: (res) => res?.stats,
    retry: 0,
  });
};
