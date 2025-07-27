'use client';
import dogImage from '@/assets/images/default-profile.svg';
import { useAuthStore } from '@/stores/authStoe';
import Image from 'next/image';
import { useState } from 'react';
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
            className="cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Image
              className="h-13 w-13"
              src={dogImage}
              alt="챗봇"
              width={52}
              height={52}
              priority
            />
          </div>
          {isModalOpen && <ChatbotWrapper onClose={handleClose} />}
        </div>
      </>
    );
}
