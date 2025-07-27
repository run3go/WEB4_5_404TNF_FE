import PostCard from '@/components/post/PostCard';

export default function PostList({ page }: { page: Post }) {
  return (
    <>
      {page.articles.map((article) => (
        <PostCard key={article.articleId} />
      ))}
    </>
  );
}
