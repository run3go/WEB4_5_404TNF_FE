import { getUserProfile } from '@/api/auth';
import { getPetProfiles } from '@/api/pet';

import ProfileClient from '@/components/profile/ProfileClient';

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
