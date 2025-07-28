import { deleteSchedule } from '@/api/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scheduleId,
      cycleLink,
    }: {
      scheduleId: number;
      cycleLink: boolean;
    }) => await deleteSchedule(scheduleId, cycleLink),

    onSuccess: () => {
      // 일정 다시 불러오기 (쿼리 무효화)
      queryClient.invalidateQueries({
        queryKey: ['schedules'],
      });

      // toast로 변경
      alert('일정이 삭제되었습니다.');
    },

    onError: () => {
      alert('일정 삭제 중 오류가 발생했습니다.');
    },
  });
};
