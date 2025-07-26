import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function ChatbotMessages({
  messages,
  isPending,
}: {
  messages: ChatbotMessage[];
  isPending: boolean;
}) {
  const [dots, setDots] = useState(1);

  const messagesRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!isPending) {
      setDots(1);
      return;
    }
    const interval = setInterval(
      () => setDots((prev) => (prev >= 3 ? 1 : prev + 1)),
      700,
    );
    return () => clearInterval(interval);
  }, [isPending]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ul
      className="scrollbar-hidden flex flex-col gap-2 overflow-y-scroll py-2 text-[15px]"
      ref={messagesRef}
    >
      {messages &&
        messages.map((msg) => (
          <li
            key={msg.id}
            className={twMerge(
              'w-full self-start',
              msg.sender !== 'chatbot' && 'self-end',
            )}
          >
            <div
              className={twMerge(
                'flex flex-col items-start gap-2',
                msg.sender !== 'chatbot' && 'items-end',
              )}
            >
              {msg.sender === 'chatbot' && (
                <span className="font-bold">챗봇</span>
              )}
              <div className="max-w-4/5 rounded-[12px] bg-[var(--color-background)] px-3 py-2">
                {msg.message}
              </div>
              <span className="text-xs text-[var(--color-grey)]">
                {msg.time}
              </span>
            </div>
          </li>
        ))}
      {isPending && (
        <li className="w-full">
          <div className="flex flex-col items-start gap-2">
            <span className="font-bold">챗봇</span>
            <div className="rounded-[12px] bg-[var(--color-background)] px-3 py-2">
              응답중{'.'.repeat(dots)}
            </div>
          </div>
        </li>
      )}
    </ul>
  );
}
