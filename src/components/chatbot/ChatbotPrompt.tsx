import { askLLM } from '@/api/chatbot';
import { useAuthStore } from '@/stores/authStoe';
import { useState } from 'react';

export default function ChatbotPrompt() {
  const [value, setValue] = useState('');
  const userInfo = useAuthStore((state) => state.userInfo);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    askLLM(value, String(userInfo!.userId));
  };
  return (
    <div className="absolute right-25 bottom-5 h-150 w-100 rounded-[20px] border border-[var(--color-primary-500)] bg-[var(--color-primary-100)]">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="">입력</label>
        <input
          className="bg-[var(--color-background)]"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">보내기</button>
      </form>
    </div>
  );
}
