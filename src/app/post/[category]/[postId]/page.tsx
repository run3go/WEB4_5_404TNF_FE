import CommentInput from '@/components/post/CommentInput';
import CommentList from '@/components/post/CommentList';
import PostDetailCard from '@/components/post/PostDetailCard';

export default async function PostDetail() {
  return (
    <>
      <div className="scrollbar-hidden h-[calc(100vh-176px)] w-[1548px] overflow-y-auto rounded-[50px] bg-[var(--color-background)] pr-[120px] pl-[88px]">
        <div className="flex w-[1308px] flex-col gap-8 pt-8">
          <PostDetailCard />
          <CommentInput />
          <CommentList />
        </div>
      </div>
    </>
  );
}
