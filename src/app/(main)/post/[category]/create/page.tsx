import PostCreate from '@/components/post/PostCreate';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> => {
  const { category } = await params;
  return {
    title: category === 'question' ? '질문게시판' : '자유게시판',
  };
};

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
