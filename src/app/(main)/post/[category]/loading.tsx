'use client';
import { SEARCH_LIST, SORT } from '@/assets/data/post';
import Icon from '@/components/common/Icon';
import LoadingUI from '@/components/common/Loading';
import SelectBox from '@/components/common/SelectBox';
import LoadingButton from '@/components/post/LoadingButton';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { usePathname } from 'next/navigation';

export default function Loading() {
  const pathname = usePathname();
  if (pathname !== '/post/question' && pathname !== '/post/free')
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingUI />
      </div>
    );
  return (
    <>
      <div className="flex h-screen w-full flex-col overflow-hidden rounded-[50px] bg-[var(--color-background)] px-5 md:h-full md:px-0 dark:bg-[#2B2926]">
        {/* 상단 버튼 영역 */}
        <LoadingButton />

        {/* 검색 및 정렬 영역 */}
        <div className="mt-[31px] flex flex-none items-center justify-between md:pl-[6.27vw]">
          <div className="bg-opacity-100 relative hidden h-[40px] items-center rounded-[10px] border-[1px] border-[#FFDBAB] md:flex md:h-[42px] dark:ml-[3px] dark:border-0 dark:bg-[#FCC389]">
            <div className="pl-4">
              <SelectBox width={'120px'} options={SEARCH_LIST} isCenter />
            </div>
            <input
              className="h-[40px] w-40 pr-10 focus:outline-none lg:w-[250px] dark:text-[#2B2926]"
              placeholder="검색어를 입력해주세요"
            />

            <Icon
              width="18px"
              height="18px"
              left="-263px"
              top="-124px"
              className="block scale-90 cursor-pointer md:hidden"
            />
          </div>
          <div className="flex w-full items-center gap-2 pl-1 md:w-auto md:pr-[6.27vw] md:pl-0 lg:gap-6">
            <div className="flex w-full items-center justify-between">
              <div className="w-30">
                <SelectBox
                  width={'100%'}
                  options={SORT}
                  isCenter
                  hasBorder
                  borderColor="var(--color-primary-500)"
                />
              </div>
              <Icon
                width="18px"
                height="18px"
                left="-263px"
                top="-124px"
                className="block scale-90 cursor-pointer md:hidden"
              />
            </div>

            <div className="fixed right-4 bottom-19 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary-300)] hover:bg-[var(--color-primary-300)] active:bg-[var(--color-primary-500)] md:static md:right-auto md:bottom-auto md:z-auto md:h-[42px] md:w-[116px] md:rounded-[12px] md:bg-[#FFDBAB]">
              <Icon
                width="20px"
                height="20px"
                left="-266px"
                top="-75px"
                className="md:hidden dark:bg-[url('/images/sprite.svg')] md:dark:bg-[url('/images/sprite.svg')]"
              />
              <p className="hidden text-base font-medium md:block dark:text-[#2b2926]">
                작성하기
              </p>
            </div>
          </div>
        </div>

        {/* 내부 스크롤 영역 */}
        <div className="scrollbar-hidden mt-[25px] flex-1 space-y-5 overflow-y-auto pt-2 pr-2 pb-[20px] md:space-y-10 md:px-[6.27vw]">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      </div>
    </>
  );
}
