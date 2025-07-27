import { askLLM } from '@/api/chatbot';
import dogImage from '@/assets/images/default-profile.svg';
import { useAuthStore } from '@/stores/authStoe';
import { useChatbotStore } from '@/stores/chatbotStore';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ChatbotInput from './ChatbotInput';
import ChatbotMessages from './ChatbotMessages';

export default function ChatbotWrapper({ onClose }: { onClose: () => void }) {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [message, setMessage] = useState('');
  const { messages, addMessage } = useChatbotStore();
  const [isPending, setIsPending] = useState(false);
  const [recentPet, setRecentPet] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!userInfo) return;
    e.preventDefault();
    try {
      setIsPending(true);
      setMessage('');
      addMessage('user', message);

      const answer = await askLLM(message, String(userInfo!.userId), recentPet);
      addMessage('chatbot', answer.message);

      setRecentPet(answer.pet ?? '');
    } catch (err) {
      console.error(err);
      addMessage('chatbot', '답변을 불러오지 못했어요');
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="absolute right-25 bottom-5 z-300 flex h-150 w-100 flex-col rounded-[20px] border border-[var(--color-primary-500)] bg-[var(--color-background)]"
      ref={modalRef}
    >
      <div className="flex items-center gap-3 rounded-t-[20px] bg-[var(--color-primary-200)] px-6 py-[14px]">
        <Image src={dogImage} alt="챗봇 이미지" width={40} height={40} />
        <h2 className="font-bold">멍멍이</h2>
      </div>
      <form
        className="flex grow-1 flex-col justify-between text-sm"
        onSubmit={handleSubmit}
      >
        <ChatbotMessages messages={messages} isPending={isPending} />
        <ChatbotInput
          value={message}
          handleChange={(message) => setMessage(message)}
        />
      </form>
    </div>
  );
}
