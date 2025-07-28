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
        <div className="absolute right-10 bottom-10 flex h-13 w-13 items-center justify-center rounded-full bg-[var(--color-background)] transition-colors">
          <div
            className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary-300)] hover:bg-[var(--color-primary-500)]"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Icon width="24px" height="21px" left="-66px" top="-447px" />
          </div>
          {isModalOpen && <ChatbotWrapper onClose={handleClose} />}
        </div>
      </>
    );
}
