import dogImage from '@/assets/images/default-profile.svg';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export default function MessageItem({ msg }: { msg: ChatbotMessage }) {
  return (
    <li
      key={msg.id}
      className={twMerge(
        'flex w-full gap-2',
        msg.sender === 'user' && 'justify-end',
      )}
    >
      {msg.sender !== 'user' && (
        <Image
          className="h-7 w-7 self-end"
          src={dogImage}
          alt="챗봇 이미지"
          width={0}
          height={0}
        />
      )}
      <div
        className={twMerge(
          'max-w-[70%] rounded-[12px] p-3 break-words whitespace-normal',
          msg.sender === 'chatbot'
            ? 'rounded-bl-none bg-[var(--color-primary-100)]'
            : msg.sender === 'user'
              ? 'rounded-br-none bg-[var(--color-primary-200)]'
              : 'rounded-bl-none bg-[#CDEEFF]',
        )}
      >
        {msg.message}
      </div>
    </li>
  );
}
