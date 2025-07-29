import { deleteSchedule } from '@/api/schedule';
import { Toast } from '@/components/common/Toast';
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
      Toast.success('일정이 삭제되었습니다.');

      // 일정 다시 불러오기 (쿼리 무효화)
      queryClient.invalidateQueries({
        queryKey: ['schedules'],
      });
    },

    onError: () => {
      Toast.error('일정 삭제 중 오류가 발생했습니다.');
    },
  });
};
