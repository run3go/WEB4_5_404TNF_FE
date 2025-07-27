import { getPostList } from '@/api/post';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UsePostListProps {
  boardType: 'FREE' | 'QUESTION';
  sortType: string; // 'DATE' | 'LIKE' | 'VIEW';
  searchType: string; // 'TITLE_CONTENT' | 'TITLE' | 'CONTENT' | 'AUTHOR';
  keyword: string;
  initialData?: GetBoardPostsResponse;
}

export const usePostList = ({
  boardType,
  sortType,
  searchType,
  keyword,
  initialData,
}: UsePostListProps) => {
  return useInfiniteQuery({
    queryKey: ['posts', boardType, sortType, searchType, keyword],
    queryFn: ({ pageParam = 1 }) =>
      getPostList({
        boardType,
        page: pageParam,
        size: 5,
        sortType,
        searchType,
        keyword,
      }).then((res) => res.data),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pageInfo;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: initialData
      ? {
          pageParams: [1],
          pages: [initialData],
        }
      : undefined,
  });
};
