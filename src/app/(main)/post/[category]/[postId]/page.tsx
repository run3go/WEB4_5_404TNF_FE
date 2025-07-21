import { getPostDetail } from '@/api/post';
import PostDetailWrapper from '@/components/post/PostDetailWrapper';
import { notFound } from 'next/navigation';

export default async function PostDetail({
  params,
}: {
  params: Promise<{ category: string; postId: string }>;
}) {
  const { category, postId } = await params;
  if (category !== 'free' && category !== 'question') {
    notFound();
  }
  const data = await getPostDetail(Number(postId));

  return (
    <>
      <PostDetailWrapper postDetail={data.data} />
    </>
  );
}
