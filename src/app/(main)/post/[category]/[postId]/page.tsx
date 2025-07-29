import { getLikeCount, getPostDetail } from '@/api/post';
import PostDetailWrapper from '@/components/post/PostDetailWrapper';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string; postId: string }>;
}): Promise<Metadata> => {
  const { postId } = await params;
  const { data }: { data: CommunityPostDeatail } = await getPostDetail(
    Number(postId),
  );
  return {
    title: data.title,
  };
};

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
  const like = await getLikeCount(Number(postId));

  console.log(like);

  return (
    <>
      <PostDetailWrapper postDetail={data.data} />
    </>
  );
}
