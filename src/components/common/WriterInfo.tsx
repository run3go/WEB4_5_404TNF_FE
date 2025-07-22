'use client';

import { useState, useRef } from 'react';
import PopupMenu from './PopupMenu';
import { usePathname, useRouter } from 'next/navigation';
import ReportModal from '../post/ReportModal';
import Image from 'next/image';
import user_default_image from '@/assets/images/default-profile.svg';
import { useAuthStore } from '@/stores/authStoe';

interface WriterInfoProps {
  authorId: number;
  postId?: number;
  name: string;
  postedAt: string;
  profileImage: string | null;
  size?: 'small' | 'big';
}

export default function WriterInfo({
  authorId,
  postId,
  name,
  postedAt,
  profileImage,
  size = 'small',
}: WriterInfoProps) {
  const isBig = size === 'big';
  const avatarSize = isBig
    ? 'sm:w-[52px] sm:h-[52px]'
    : 'sm:w-[42px] sm:h-[42px]';
  const textSize = isBig ? 'sm:text-[16px]' : 'sm:text-[14px]';
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const userInfo = useAuthStore((state) => state.userInfo);

  const handleSelect = (label: string) => {
    if (label === '신고하기') {
      console.log('qwe');
      setIsReportModalOpen(true);
    }

    if (label === '프로필 이동') {
      router.push(`/profile/${authorId}`);
    }
    setIsMenuOpen(false);
  };

  const isPostPage =
    pathname?.startsWith('/post/') &&
    (pathname.endsWith('/question') || pathname.endsWith('/free'));

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="flex w-fit cursor-pointer items-center gap-4"
        onClick={() => {
          if (authorId === userInfo?.userId) return;
          if (isPostPage) {
            setIsMenuOpen((prev) => !prev);
          } else {
            router.push(`/profile/${authorId}`);
          }
        }}
      >
        <Image
          src={profileImage || user_default_image}
          alt="유저 프로필 이미지"
          className={`h-9 w-9 rounded-full${avatarSize}`}
        />
        <div className={`font-medium sm:space-y-1`}>
          <p className={`text-[12px] ${textSize}`}>{name}</p>
          <p className={`text-[10px] text-[#909090] ${textSize}`}>{postedAt}</p>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 z-50 mt-2">
          <PopupMenu
            options={[
              { id: '1', label: '프로필 이동', type: 'link' },
              { id: '3', label: '신고하기', type: 'post', report: 'profile' },
            ]}
            onSelect={handleSelect}
            onClose={() => setIsMenuOpen(false)}
            isProfile={true}
          />
        </div>
      )}

      {isReportModalOpen && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-[#2B2926]/50"
          onClick={() => setIsReportModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ReportModal
              reportedId={userInfo!.userId}
              contentId={postId!}
              reportedName={name}
              reportType="BOARD"
              onClose={() => setIsReportModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
