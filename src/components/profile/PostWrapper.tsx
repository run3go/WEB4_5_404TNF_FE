import { useMyPosts } from '@/lib/hooks/profile/usePostList';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SelectBox from '../common/SelectBox';
import PostTabs from './PostTabs';
import PostList from './post/PostList';

export default function PostWrapper() {
  const options = [
    { value: 'DATE', label: '최신순' },
    { value: 'LIKE', label: '좋아요순' },
    { value: 'VIEW', label: '조회수순' },
  ];

  const [type, setType] = useState<PostType>('WRITE');
  const [sortType, setSortType] = useState<SortType>('DATE');
  const [ref, inView] = useInView();

  const { data, isFetchingNextPage, hasNextPage, isPending, fetchNextPage } =
    useMyPosts(type, sortType);
  const handleChangeTab = (type: PostType) => {
    setType(type);
  };

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  const allItems = data?.pages?.flat();

  return (
    <div className="mb-10">
      <div className="flex w-full flex-col justify-between text-sm sm:flex-row sm:text-base">
        <PostTabs handleChangeTab={handleChangeTab} type={type} />
        <div className="mb-3 self-end text-xs sm:text-base">
          <SelectBox
            value={sortType}
            setValue={(newValue: string) => setSortType(newValue as SortType)}
            options={options}
            width="100px"
            isCenter
          />
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {isPending ? (
          <>
            <div className="mx-1h-[192px] w-full rounded-[12px] bg-[var(--color-grey)] sm:h-[228px] sm:w-full"></div>
            <div className="mx-1h-[192px] w-full rounded-[12px] bg-[var(--color-grey)] sm:h-[228px] sm:w-full"></div>
            <div className="mx-1h-[192px] w-full rounded-[12px] bg-[var(--color-grey)] sm:h-[228px] sm:w-full"></div>
          </>
        ) : (
          allItems?.map((page) => (
            <PostList key={page.pageInfo.currentPage} page={page} />
          ))
        )}
        {isFetchingNextPage && (
          <>
            <div className="mx-1h-[192px] w-full rounded-[12px] bg-[var(--color-grey)] sm:h-[228px] sm:w-full"></div>
            <div className="mx-1h-[192px] w-full rounded-[12px] bg-[var(--color-grey)] sm:h-[228px] sm:w-full"></div>
            <div className="mx-1h-[192px] w-full rounded-[12px] bg-[var(--color-grey)] sm:h-[228px] sm:w-full"></div>
          </>
        )}
        {data && hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
      </div>
    </div>
  );
}
