'use client';
import { useAuthStore } from '@/stores/authStoe';
import { useParams } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { twMerge } from 'tailwind-merge';

export default function PostTabs() {
  const params = useParams();
  const userId = params?.userId as string;
  const userInfo = useAuthStore((state) => state.userInfo);
  const isMyProfile = userInfo?.userId === Number(userId);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  if (isMobile) {
    return (
      <div className="mb-4 flex w-full">
        <button
          className={twMerge(
            'basis-1/3 cursor-pointer border-b border-[var(--color-input-border)] px-4 py-[7px]',
            'border-[var(--color-primary-500)] text-[var(--color-primary-500)]',
          )}
        >
          작성 글
        </button>
        {isMyProfile && (
          <>
            <button className="basis-1/3 cursor-pointer border-b border-[var(--color-input-border)] px-4 py-[7px]">
              좋아요한 글
            </button>
            <button className="basis-1/3 cursor-pointer border-b border-[var(--color-input-border)] px-4 py-[7px]">
              댓글 작성한 글
            </button>
          </>
        )}
      </div>
    );
  } else
    return (
      <div className="mb-6">
        <button
          className={twMerge(
            'cursor-pointer px-4 hover:text-[var(--color-primary-300)]',
            'text-[var(--color-primary-500)]',
          )}
        >
          작성 글
        </button>
        {isMyProfile && (
          <>
            <button className="cursor-pointer border-l-2 border-[var(--color-primary-500)] px-4 hover:text-[var(--color-primary-300)]">
              좋아요한 글
            </button>
            <button className="cursor-pointer border-l-2 border-[var(--color-primary-500)] px-4 hover:text-[var(--color-primary-300)]">
              댓글 작성한 글
            </button>
          </>
        )}
      </div>
    );
}
