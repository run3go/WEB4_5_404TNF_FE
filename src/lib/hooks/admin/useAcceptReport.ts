import { acceptReport } from '@/api/admin';
import { Toast } from '@/components/common/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAcceptReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (acceptInfo: AcceptInfo) =>
      await acceptReport(acceptInfo),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reportList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['reportDetail'],
      });

      // queryClient.invalidateQueries({ queryKey: ['reportList'], exact: false });
      // queryClient.refetchQueries({ queryKey: ['reportList'], exact: false });

      Toast.success('처리되었습니다.');
    },

    onError: () => {
      Toast.error('처리 중 오류가 발생했습니다.');
    },
  });
};
