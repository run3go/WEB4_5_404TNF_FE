import SelectBox from '../common/SelectBox';
import PostCard from '../post/PostCard';
import PostTabs from './PostTabs';

export default function PostList() {
  const options = [
    { value: 'recent', label: '최신순' },
    { value: 'like', label: '좋아요순' },
    { value: 'view', label: '조회수순' },
  ];
  return (
    <div className="mb-10">
      <div className="flex w-full flex-col justify-between text-sm sm:flex-row sm:text-base">
        <PostTabs />
        <div className="mb-3 self-end text-xs sm:text-base">
          <SelectBox options={options} width="100px" isCenter />
        </div>
      </div>
      {/* 게시글 카드 추가 */}
      <div className="flex flex-col gap-10">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}
