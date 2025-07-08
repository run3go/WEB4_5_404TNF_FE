'use client';
import { useMediaQuery } from 'react-responsive';
import { twMerge } from 'tailwind-merge';
import Button from '../common/Button';
import DogEditMobile from './DogEditMobile';
import DogProfile from './DogProfile';
import PostList from './PostList';
import UserProfile from './UserProfile';

export default function ProfileClient() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isEditing = false;
  const isProfile = false;
  if (isMobile && isEditing) {
    return <DogEditMobile />;
  } else {
    return (
      <main
        className="scrollbar-hidden relative w-screen overflow-y-scroll bg-[var(--color-background)] p-6 sm:h-[calc(100vh-156px)] sm:w-full sm:px-30 sm:py-17"
        id="profile-container"
      >
        <h1 className="mb-15 hidden text-center text-[32px] sm:block">
          닉네임님의 페이지
        </h1>
        <div className="mb-8 flex justify-center gap-4 sm:hidden">
          <Button
            className={twMerge(
              'w-[87px] bg-[var(--color-pink-100)] py-3 text-xs',
              isProfile && 'bg-[var(--color-pink-300)]',
            )}
          >
            프로필
          </Button>
          <Button
            className={twMerge(
              'w-[87px] bg-[var(--color-pink-100)] py-3 text-xs',
              !isProfile && 'bg-[var(--color-pink-300)]',
            )}
          >
            활동내역
          </Button>
        </div>
        <div className={isProfile ? '' : 'hidden sm:block'}>
          <UserProfile />
          <DogProfile />
        </div>
        <div className={isProfile ? 'hidden sm:block' : ''}>
          <PostList />
        </div>
      </main>
    );
  }
}
