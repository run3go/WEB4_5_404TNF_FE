import { getPostDetail } from '@/api/post';
import PostDetailWrapper from '@/components/post/PostDetailWrapper';

export default async function PostDetail({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const data = await getPostDetail(Number((await params).postId));
  console.log(data.data);

  return (
    <>
      <PostDetailWrapper postDetail={data.data} />
    </>
  );
}
