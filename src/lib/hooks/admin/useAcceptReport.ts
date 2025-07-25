import { acceptReport } from '@/api/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAcceptReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (acceptInfo: AcceptInfo) =>
      await acceptReport(acceptInfo),

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
