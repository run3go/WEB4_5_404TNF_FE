import PostCreate from '@/components/post/PostCreate';
import { notFound } from 'next/navigation';

export default async function PostCreatePage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (category !== 'free' && category !== 'question') {
    notFound();
  }
  return (
    <>
      <PostCreate />
    </>
  );
}
