'use client';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { twMerge } from 'tailwind-merge';
import Button from '../common/Button';
import DogProfileEditMobile from './dog/DogProfileEditMobile';
import DogProfileList from './dog/DogProfileList';
import PostList from './PostList';
import UserProfile from './user/UserProfile';
import UserProfileEditMobile from './user/UserProfileEditMobile';

export default function ProfileClient({
  petProfiles,
  userProfile,
}: {
  petProfiles: PetProfile[];
  userProfile: UserProfile;
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const [isProfile, setIsProfile] = useState(true);
  const [isEditingDogProfile, setIsEditingDogProfile] = useState(false);
  const [isEditingUserProfile, setIsEditingUserProfile] = useState(false);

  const toggleEditUserProfile = () => {
    setIsEditingUserProfile((state) => !state);
  };
  const toggleEditDogProfile = () => {
    setIsEditingDogProfile((state) => !state);
  };

  if (isMobile && isEditingDogProfile) {
    return <DogProfileEditMobile togglePage={toggleEditDogProfile} />;
  } else if (isMobile && isEditingUserProfile) {
    return <UserProfileEditMobile togglePage={toggleEditUserProfile} />;
  } else {
    return (
      <main className="scrollbar-hidden relative h-screen w-screen overflow-y-scroll bg-[var(--color-background)] p-6 sm:h-[calc(100vh-156px)] sm:w-full sm:px-30 sm:py-17">
        <h1 className="mb-15 hidden text-center text-[32px] sm:block">
          닉네임님의 페이지
        </h1>
        <div className="mb-8 flex justify-center gap-4 sm:hidden">
          <Button
            className={twMerge(
              'w-[87px] bg-[var(--color-pink-100)] py-3 text-xs',
              isProfile && 'bg-[var(--color-pink-300)]',
            )}
            onClick={() => setIsProfile(true)}
          >
            프로필
          </Button>
          <Button
            className={twMerge(
              'w-[87px] bg-[var(--color-pink-100)] py-3 text-xs',
              !isProfile && 'bg-[var(--color-pink-300)]',
            )}
            onClick={() => setIsProfile(false)}
          >
            활동내역
          </Button>
        </div>
        <div className={isProfile ? '' : 'hidden sm:block'}>
          <UserProfile
            togglePage={toggleEditUserProfile}
            userProfile={userProfile}
          />
          <DogProfileList
            togglePage={toggleEditDogProfile}
            petProfiles={petProfiles}
          />
        </div>
        <div className={isProfile ? 'hidden sm:block' : ''}>
          <PostList />
        </div>
      </main>
    );
  }
}
