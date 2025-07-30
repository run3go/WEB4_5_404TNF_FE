import { getMyPosts, getUserPosts } from '@/api/user';
import { useAuthStore } from '@/stores/authStoe';
import { useInfiniteQuery } from '@tanstack/react-query';

const size = '10';

export const useMyPosts = (
  userId: string,
  type: PostType,
  sortType: SortType,
) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const isMyProfile = userId === String(userInfo?.userId);
  return useInfiniteQuery<Post>({
    queryFn: ({ pageParam }) =>
      isMyProfile
        ? getMyPosts(type, { sortType, page: pageParam as string, size })
        : getUserPosts(userId, { sortType, page: pageParam as string, size }),
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
