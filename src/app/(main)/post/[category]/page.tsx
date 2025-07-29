import { getPostList } from '@/api/post';
import PostList from '@/components/post/PostList';
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

export default async function Board({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (category !== 'free' && category !== 'question') {
    notFound();
  }

  const initialData = await getPostList({
    page: 1,
    size: 5,
    boardType: category.toUpperCase() as 'FREE' | 'QUESTION',
    sortType: 'DATE',
    searchType: 'TITLE',
    keyword: '',
  });

  return (
    <>
      <PostList boardType={category} initialData={initialData.data} />
    </>
  );
}
