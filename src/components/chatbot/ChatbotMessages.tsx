import { useEffect, useRef, useState } from 'react';
import MessageItem from './MessageItem';

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
      className="scrollbar-hidden flex max-h-119 flex-col gap-7 overflow-y-scroll px-5 py-6"
      ref={messagesRef}
    >
      {messages &&
        messages.map((msg) => <MessageItem key={msg.id} msg={msg} />)}
      {isPending && (
        <MessageItem
          msg={{
            id: 0,
            message: `응답중${'.'.repeat(dots)}`,
            sender: 'chatbot',
          }}
        />
      )}
    </ul>
  );
}
