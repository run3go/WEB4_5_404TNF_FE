import { getSchedules } from '@/api/schedule';
import { Schedule } from '@/types/schedule';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addMonths, format, subMonths } from 'date-fns';

export const useGetSchedules = (userId?: number, currentDate?: Date) => {
  const queryClient = useQueryClient();
  const checkFetch = !!userId && !!currentDate;

  const formattedDate = currentDate ? format(currentDate, 'yyyy-MM-dd') : '';
  const prevDate = currentDate
    ? format(subMonths(currentDate!, 1), 'yyyy-MM-dd')
    : '';
  const nextDate = currentDate
    ? format(addMonths(currentDate!, 1), 'yyyy-MM-dd')
    : '';

  if (checkFetch) {
    // 이전 달 데이터
    queryClient.prefetchQuery({
      queryKey: ['schedules', userId, prevDate],
      queryFn: () => getSchedules(userId, prevDate),
      retry: 0,
    });

    // 다음 달 데이터
    queryClient.prefetchQuery({
      queryKey: ['schedules', userId, nextDate],
      queryFn: () => getSchedules(userId, nextDate),
      retry: 0,
    });
  }

  return useQuery<{ data: Schedule[] }, Error, Schedule[]>({
    queryKey: ['schedules', userId, formattedDate],
    queryFn: () => getSchedules(userId!, formattedDate),
    select: (res) => res?.data,
    retry: 0,
    enabled: checkFetch,
  });
};
