import { deleteSchedule } from '@/api/schedule';
import { DeleteSchedule } from '@/types/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deleteData: DeleteSchedule) =>
      await deleteSchedule(deleteData),

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
