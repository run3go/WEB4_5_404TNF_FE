import { askLLM } from '@/api/chatbot';
import { useAuthStore } from '@/stores/authStoe';
import { formatDate } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRef, useState } from 'react';
import ChatbotInput from './ChatbotInput';
import ChatbotMessages from './ChatbotMessages';

export default function ChatbotWrapper() {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const countRef = useRef(0);

  const addMessage = (sender: string, message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: countRef.current++,
        message,
        sender,
        time: formatDate(new Date(), 'a kk:mm', { locale: ko }),
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!userInfo) return;
    try {
      setMessage('');
      addMessage(userInfo.nickname, message);
      e.preventDefault();
      const answer = await askLLM(message, String(userInfo!.userId));
      addMessage('chatbot', answer);
    } catch (err) {
      console.error(err);
      addMessage('chatbot', '답변을 불러오지 못했어요');
    } finally {
    }
  };
  return (
    <div className="absolute right-25 bottom-5 z-300 h-150 w-100 rounded-[20px] border border-[var(--color-primary-500)] bg-[var(--color-primary-100)] p-4">
      <h2 className="text-lg font-bold">챗봇</h2>
      <form
        className="flex h-[calc(100%-28px)] flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <ChatbotMessages messages={messages} />
        <ChatbotInput
          value={message}
          handleChange={(message) => setMessage(message)}
        />
      </form>
    </div>
  );
}
