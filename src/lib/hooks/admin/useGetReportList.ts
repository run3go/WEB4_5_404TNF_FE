import { getReportList } from '@/api/admin';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetReportList = (getReportListInfo: GetListInfo) => {
  return useQuery({
    queryKey: ['reportList', getReportListInfo],
    queryFn: () => getReportList(getReportListInfo),
    retry: 0,
    placeholderData: keepPreviousData,
    // initialData: {
    //   reports: [],
    //   pageInfo: {
    //     currentPage: 1,
    //     totalPages: 1,
    //     totalElements: 0,
    //     isFirst: true,
    //     isLast: true,
    //   },
    // },
  });
};
