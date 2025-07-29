'use client';

import { SEARCH_LIST, SORT } from '@/assets/data/post';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import SearchBar from '@/components/common/SearchBar';
import SelectBox from '@/components/common/SelectBox';
import PostCard from '@/components/post/PostCard';
import SearchButton from '@/components/post/SearchButton';
import { usePostList } from '@/lib/hooks/usePostList';
import { useAuthStore } from '@/stores/authStoe';
import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function PostList({
  boardType,
  initialData,
}: {
  boardType: 'free' | 'question';
  initialData: GetBoardPostsResponse;
}) {
  const [sortType, setSortType] = useState('DATE');
  const [searchType, setSearchType] = useState('TITLE_CONTENT');
  const [inputSearchType, setInputSearchType] = useState('TITLE_CONTENT');
  const [keyword, setKeyword] = useState('');
  const [inputKeyword, setInputKeyword] = useState('');

  const userInfo = useAuthStore((state) => state.userInfo);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    usePostList({
      boardType: boardType === 'free' ? 'FREE' : 'QUESTION',
      sortType,
      searchType,
      keyword,
      initialData,
    });

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const handleSearch = () => {
    setSearchType(inputSearchType);
    setKeyword(inputKeyword);
    refetch();
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col overflow-hidden rounded-[50px] bg-[var(--color-background)] px-5 sm:h-full sm:px-0 dark:bg-[#2B2926]">
        {/* 상단 버튼 영역 */}
        <div className="flex flex-none justify-center gap-3 pt-6 sm:gap-9 sm:pt-5">
          <Link href={'/post/question'}>
            <Button
              className={`board__btn ${boardType === 'question' ? '!bg-[var(--color-pink-300)]' : ''}`}
            >
              <Icon
                className="scale-60 sm:scale-100 dark:bg-[url('/images/sprite.svg')] sm:dark:bg-[url('/images/sprite.svg')]"
                width="20px"
                height="20px"
                left="-27px"
                top="-165px"
              />
              <p className="text-[10px] sm:pt-0.5 sm:text-[18px]">질문게시판</p>
            </Button>
          </Link>
          <Link href={'/post/free'}>
            <Button
              className={`board__btn ${boardType === 'free' ? '!bg-[var(--color-pink-300)]' : ''}`}
            >
              <div className="pt-1">
                <Icon
                  className="scale-60 sm:scale-100 dark:bg-[url('/images/sprite.svg')] sm:dark:bg-[url('/images/sprite.svg')]"
                  width="20px"
                  height="20px"
                  left="-67px"
                  top="-166px"
                />
              </div>
              <p className="pt-0.5 text-[10px] sm:pt-1 sm:text-[18px]">
                자유게시판
              </p>
            </Button>
          </Link>
        </div>

        {/* 검색 및 정렬 영역 */}
        <div className="mt-[31px] flex flex-none items-center justify-between sm:pl-[6.27vw]">
          <SearchBar
            options={SEARCH_LIST}
            setSearchType={setInputSearchType}
            setKeyword={setInputKeyword}
            keyword={inputKeyword}
            onSearch={handleSearch}
          />
          <div className="flex w-full items-center gap-6 pl-1 sm:w-auto sm:pr-[6.27vw] sm:pl-0">
            <div className="flex w-full items-center justify-between sm:w-auto">
              <div className="rounded-[12px] border border-[#FCC389] py-2 pl-4">
                <SelectBox
                  width={'90px'}
                  options={SORT}
                  isCenter
                  setValue={setSortType}
                />
              </div>

              <SearchButton
                setSearchType={setInputSearchType}
                setKeyword={setInputKeyword}
                keyword={inputKeyword}
                onSearch={handleSearch}
              />
            </div>

            <Link
              href={`${!!userInfo || !!sessionStorage.getItem('userId') ? `/post/${boardType}/create` : `/login`} `}
            >
              <div className="fixed right-4 bottom-4 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:static sm:right-auto sm:bottom-auto sm:z-auto">
                <Icon
                  width="20px"
                  height="20px"
                  left="-266px"
                  top="-75px"
                  className="dark:bg-[url('/images/sprite.svg')] sm:dark:bg-[url('/images/sprite.svg')]"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* 내부 스크롤 영역 */}
        <div className="scrollbar-hidden mt-[25px] flex-1 space-y-5 overflow-y-auto pt-2 pr-2 pb-[20px] sm:space-y-10 sm:px-[6.27vw]">
          {data?.pages &&
          data.pages.some((page) => page.articleList.length > 0) ? (
            data.pages.map((page) =>
              page.articleList.map((post: PostDetail) => (
                <PostCard
                  key={post.articleId}
                  post={post}
                  boardType={boardType}
                />
              )),
            )
          ) : (
            <p className="mt-50 text-center text-[18px] font-medium text-[#909090]">
              등록된 게시글이 없습니다
            </p>
          )}

          {hasNextPage && <div ref={ref} className="h-[1px] w-full" />}
        </div>
      </div>
    </>
  );
}
