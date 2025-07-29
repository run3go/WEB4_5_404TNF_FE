import { rejectReport } from '@/api/admin';
import { Toast } from '@/components/common/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRejectReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rejectInfo: RejectInfo) =>
      await rejectReport(rejectInfo),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reportList'],
      });

      Toast.success('처리되었습니다.');
    },

    onError: () => {
      Toast.error('처리 중 오류가 발생했습니다.');
    },
  });
};
