import Card from '../common/Card';
import SelectBox from '../common/SelectBox';
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
          <SelectBox options={options} width={100} />
        </div>
      </div>
      {/* 게시글 카드 추가 */}
      <div className="flex flex-col gap-10">
        <Card className="h-60 w-full">게시물</Card>
        <Card className="h-60 w-full">게시물</Card>
        <Card className="h-60 w-full">게시물</Card>
      </div>
    </div>
  );
}
