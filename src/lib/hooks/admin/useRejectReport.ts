import { rejectReport } from '@/api/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRejectReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rejectInfo: RejectInfo) =>
      await rejectReport(rejectInfo),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reports'],
      });

      alert('처리되었습니다.');
    },

    onError: () => {
      alert('처리 중 오류가 발생했습니다.');
    },
  });
};
