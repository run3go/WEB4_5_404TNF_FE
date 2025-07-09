import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import PostCard from '@/components/post/PostCard';

const SORT = [
  { value: '최신순', label: '최신순' },
  { value: '좋아요순', label: '좋아요순' },
  { value: '조회수순', label: '조회수순' },
];

const SEARCH_LIST = [
  { value: '제목 + 내용', label: '제목 + 내용' },
  { value: '제목', label: '제목' },
  { value: '내용', label: '내용' },
  { value: '작성자', label: '작성자' },
];

export default async function Board() {
  return (
    <>
      <div className="h-[calc(100vh-176px)] w-[1548px] rounded-[50px] bg-[var(--color-background)]">
        <div className="flex justify-center gap-9 pt-5">
          <Button className="board__btn">
            <Icon width="20px" height="20px" left="-27px" top="-165px" />
            <p className="text-[18px]">질문게시판</p>
          </Button>
          <Button className="board__btn">
            <Icon width="20px" height="20px" left="-67px" top="-166px" />
            <p className="text-[18px]">자유게시판</p>
          </Button>
        </div>
        <div className="mt-[31px] flex items-center justify-between pl-[120px]">
          <div className="relative flex h-[40px] items-center rounded-[10px] bg-[var(--color-primary-300)]">
            <SelectBox width={125} options={SEARCH_LIST} />
            <input className="h-[40px] w-[280px] focus:outline-none" />
            <Icon
              width="18px"
              height="18px"
              left="-263px"
              top="-124px"
              className="absolute right-3 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-8 pr-[139px]">
            <SelectBox width={110} options={SORT} />
            <div className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary-300)]">
              <Icon width="20px" height="20px" left="-266px" top="-75px" />
            </div>
          </div>
        </div>
        <div className="scrollbar-hidden mt-[25px] h-[calc(100vh-380px)] space-y-10 overflow-y-auto pb-[20px] pl-[120px]">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
}
