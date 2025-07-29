import { editSchedule } from '@/api/schedule';
import { Toast } from '@/components/common/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: UpdateSchedule) =>
      await editSchedule(updateData),

    onSuccess: () => {
      Toast.success('일정이 수정되었습니다.');

      // 일정 다시 불러오기 (쿼리 무효화)
      queryClient.invalidateQueries({
        queryKey: ['schedules'],
      });
    },

    onError: () => {
      Toast.error('일정 수정 중 오류가 발생했습니다.');
    },
  });
};
