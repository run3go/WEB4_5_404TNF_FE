import { createSchedule } from '@/api/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createData: CreateSchedule) =>
      await createSchedule(createData),

    onSuccess: () => {
      // toast로 변경
      alert('일정이 추가되었습니다.');
      // 일정 다시 불러오기 (쿼리 무효화)
      queryClient.invalidateQueries({
        queryKey: ['schedules'],
      });
    },

    onError: () => {
      alert('일정 추가 중 오류가 발생했습니다.');
    },
  });
};
