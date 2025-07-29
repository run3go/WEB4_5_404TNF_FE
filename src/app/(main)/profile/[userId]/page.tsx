import { getUserProfile } from '@/api/auth';
import { getPetProfiles } from '@/api/pet';

import ProfileClient from '@/components/profile/ProfileClient';
import { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: { userId: string };
}): Promise<Metadata> => {
  const userProfile: UserProfile = await getUserProfile(params.userId);
  return {
    title: `${userProfile.nickname}님의 프로필`,
  };
};

export default async function Profile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const petProfiles = await getPetProfiles(userId);
  const userProfile = await getUserProfile(userId);
  return <ProfileClient petProfiles={petProfiles} userProfile={userProfile} />;
}
