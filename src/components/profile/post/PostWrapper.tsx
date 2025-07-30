import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { useMyPosts } from '@/lib/hooks/profile/usePostList';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SelectBox from '../../common/SelectBox';
import PostList from './PostList';
import PostTabs from './PostTabs';

export default function PostWrapper() {
  const parmas = useParams();
  const options = [
    { value: 'DATE', label: '최신순' },
    { value: 'LIKE', label: '좋아요순' },
    { value: 'VIEW', label: '조회수순' },
  ];

  const [type, setType] = useState<PostType>('WRITE');
  const [sortType, setSortType] = useState<SortType>('DATE');
  const [ref, inView] = useInView();

  const { data, isFetchingNextPage, hasNextPage, isPending, fetchNextPage } =
    useMyPosts(parmas.userId as string, type, sortType);
  const handleChangeTab = (type: PostType) => {
    setType(type);
  };

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  const allItems = data?.pages?.flat();
  return (
    <div className="mb-10">
      <div className="mb-6 flex w-full flex-col justify-between text-sm sm:flex-row sm:text-base">
        <PostTabs handleChangeTab={handleChangeTab} type={type} />
        {allItems && allItems[0].articles.length > 0 ? (
          <div className="mb-3 self-end text-xs sm:text-base">
            <SelectBox
              value={sortType}
              setValue={(newValue: string) => setSortType(newValue as SortType)}
              options={options}
              width="100px"
              isCenter
            />
          </div>
        ) : (
          <div className="mb-7 sm:mb-0" />
        )}
      </div>
      <div className="flex flex-col gap-10">
        {isPending ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : allItems && allItems[0].articles.length ? (
          allItems?.map((page) => (
            <PostList key={page.pageInfo.currentPage} page={page} />
          ))
        ) : (
          <div className="self-center text-[var(--color-grey)]">
            게시물이 존재하지 않습니다
          </div>
        )}
        {isFetchingNextPage && (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
        {data && hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
      </div>
    </div>
  );
}
