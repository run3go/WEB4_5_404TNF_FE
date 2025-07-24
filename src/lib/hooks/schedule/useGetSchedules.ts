import { getSchedules } from '@/api/schedule';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addMonths, format, subMonths } from 'date-fns';

export const useGetSchedules = (currentDate?: Date) => {
  const queryClient = useQueryClient();
  const checkFetch = !!currentDate;

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
      queryKey: ['schedules', prevDate],
      queryFn: () => getSchedules(prevDate),
      retry: 0,
    });

    // 다음 달 데이터
    queryClient.prefetchQuery({
      queryKey: ['schedules', nextDate],
      queryFn: () => getSchedules(nextDate),
      retry: 0,
    });
  }

  return useQuery<{ data: Schedule[] }, Error, Schedule[]>({
    queryKey: ['schedules', formattedDate],
    queryFn: () => getSchedules(formattedDate),
    select: (res) => res?.data,
    retry: 0,
    enabled: checkFetch,
  });
};
