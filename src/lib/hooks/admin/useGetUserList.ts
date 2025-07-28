import { getUserList } from '@/api/admin';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetUserList = (getUserListInfo: GetListInfo) => {
  return useQuery<{ users: UserInfo[]; pageInfo: PageInfo }, Error>({
    queryKey: ['userList', getUserListInfo],
    queryFn: () => getUserList(getUserListInfo),
    retry: 0,
    placeholderData: keepPreviousData,
    // initialData: {
    //   users: [],
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
