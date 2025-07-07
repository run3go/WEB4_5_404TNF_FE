import DogProfile from '@/components/profile/DogProfile';
import PostList from '@/components/profile/PostList';
import UserProfile from '@/components/profile/UserProfile';

export default async function Profile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  console.log(userId);
  return (
    <main
      className="scrollbar-hidden relative h-[calc(100vh-156px)] overflow-y-scroll bg-[var(--color-background)] px-30 py-17"
      id="profile-container"
    >
      <h1 className="mb-15 text-center text-[32px]">닉네임님의 페이지</h1>
      <UserProfile />
      <DogProfile />
      <PostList />
    </main>
  );
}
