'use client';
import { useAuthStore } from '@/stores/authStoe';
import { useState } from 'react';
import Icon from '../common/Icon';
import ChatbotWrapper from './ChatbotWrapper';

export default function ChatbotIcon() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (userInfo)
    return (
      <>
        <div className="fixed right-4 bottom-4 z-50 flex h-13 w-13 items-center justify-center rounded-full transition-colors sm:right-10 sm:bottom-10">
          <div
            className="flex h-13 w-13 cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary-200)] hover:bg-[var(--color-primary-300)]"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Icon width="27px" height="27px" left="-324px" top="-444px" />
          </div>
          {isModalOpen && <ChatbotWrapper onClose={handleClose} />}
        </div>
      </>
    );
}
