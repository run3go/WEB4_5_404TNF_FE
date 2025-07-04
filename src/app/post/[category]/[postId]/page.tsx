export default async function PostDetail({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  return (
    <>
      <h1>{postId}</h1>
    </>
  );
}
