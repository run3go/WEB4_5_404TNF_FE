'use client';
import chatbotImage from '@/assets/images/chatbot-icon.png';
import { useAuthStore } from '@/stores/authStoe';
import Image from 'next/image';
import { useState } from 'react';
import ChatbotPrompt from './ChatbotPrompt';

export default function ChatbotIcon() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);
  if (userInfo)
    return (
      <>
        <div className="absolute right-10 bottom-10 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-100)] transition-colors hover:bg-[var(--color-primary-200)]">
          <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <Image
              className="h-13 w-13"
              src={chatbotImage}
              alt="챗봇"
              width={52}
              height={52}
              priority
            />
          </div>
          {isModalOpen && <ChatbotPrompt />}
        </div>
      </>
    );
}
