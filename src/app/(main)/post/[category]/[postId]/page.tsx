import { getPostDetail } from '@/api/post';
import PostDetailWrapper from '@/components/post/PostDetailWrapper';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: { category: string; postId: string };
}): Promise<Metadata> => {
  const { data }: { data: CommunityPostDeatail } = await getPostDetail(
    Number(params.postId),
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

  return (
    <>
      <PostDetailWrapper postDetail={data.data} />
    </>
  );
}
