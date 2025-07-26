import { twMerge } from 'tailwind-merge';

export default function ChatbotMessages({
  messages,
}: {
  messages: ChatbotMessage[];
}) {
  return (
    <ul className="scrollbar-hidden flex flex-col gap-2 overflow-y-scroll py-2 text-[15px]">
      {messages &&
        messages.map((msg) => (
          <li
            key={msg.id}
            className={twMerge(
              'w-full',
              msg.sender !== 'chatbot' && 'self-end',
            )}
          >
            <div
              className={twMerge(
                'flex flex-col gap-2',
                msg.sender !== 'chatbot' && 'items-end',
              )}
            >
              <span className="font-bold">
                {msg.sender === 'chatbot' ? '챗봇' : msg.sender}
              </span>
              <div className="max-w-4/5 rounded-[12px] bg-[var(--color-background)] px-3 py-2">
                {msg.message}
              </div>
              <span className="text-xs text-[var(--color-grey)]">
                {msg.time}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}
