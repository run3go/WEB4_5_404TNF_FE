import { getMyPosts } from '@/api/user';
import { useInfiniteQuery } from '@tanstack/react-query';

const size = '10';

export const useMyPosts = (type: PostType, sortType: SortType) => {
  return useInfiniteQuery<Post>({
    queryFn: ({ pageParam }) =>
      getMyPosts(type, { sortType, page: pageParam as string, size }),
    queryKey: ['profile', 'post', sortType, type],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.isLast) {
        return undefined;
      } else {
        return lastPage.pageInfo.currentPage + 1;
      }
    },
  });
};
