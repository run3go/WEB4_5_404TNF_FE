import ProfileClient from '@/components/profile/ProfileClient';

export default async function Profile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  console.log(userId);
  return <ProfileClient />;
}
