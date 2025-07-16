import { getSchedules } from '@/api/schedule';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export const useSchedules = (userId: string, currentDate: Date) => {
  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  return useQuery({
    queryKey: ['schedules', userId, formattedDate],
    queryFn: () => getSchedules(userId, formattedDate),
    select: (res) => res?.data,
  });
};
