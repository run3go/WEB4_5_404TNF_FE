import { getReportDetail } from '@/api/admin';
import { useQuery } from '@tanstack/react-query';

export const useGetReportDetail = (reportId: number) => {
  return useQuery<ReportDetail>({
    queryKey: ['reportDetail', reportId],
    queryFn: () => getReportDetail(reportId),
    retry: 0,
  });
};
