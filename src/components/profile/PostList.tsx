import { twMerge } from 'tailwind-merge';
import Card from '../common/Card';
import SelectBox from '../common/SelectBox';

export default function PostList() {
  const options = [
    { value: 'recent', label: '최신순' },
    { value: 'like', label: '좋아요순' },
    { value: 'view', label: '조회수순' },
  ];
  return (
    <>
      <div className="flex justify-between">
        <div className="mb-6">
          <button
            className={twMerge(
              'cursor-pointer border-r-2 border-[var(--color-primary-500)] px-4 hover:text-[var(--color-primary-300)]',
              'text-[var(--color-primary-500)]',
            )}
          >
            작성 글
          </button>
          <button className="cursor-pointer border-r-2 border-[var(--color-primary-500)] px-4 hover:text-[var(--color-primary-300)]">
            좋아요한 글
          </button>
          <button className="cursor-pointer px-4 hover:text-[var(--color-primary-300)]">
            댓글 작성한 글
          </button>
        </div>
        <SelectBox options={options} width={100} />
      </div>
      {/* 게시글 카드 추가 */}
      <div className="flex flex-col gap-10">
        <Card className="h-60 w-full">게시물</Card>
        <Card className="h-60 w-full">게시물</Card>
        <Card className="h-60 w-full">게시물</Card>
      </div>
    </>
  );
}
