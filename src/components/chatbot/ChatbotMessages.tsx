import { useChatbotStore } from '@/stores/chatbotStore';
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
  const [isLogBtnActive, setIsLogBtnActive] = useState(false);
  const [isInfoBtnActive, setIsInfoBtnActive] = useState(false);
  const addMessage = useChatbotStore((state) => state.addMessage);

  const messagesRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const greetingMessage = {
    id: 1,
    message:
      '안녕하세요! 저는 챗봇 멍멍이에요 궁금한게 있다면 언제든지 물어보세요!',
    sender: 'chatbot',
  };

  const getLogs = async () => {
    setIsLogBtnActive(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        addMessage(
          'guide',
          '📝 몸무게 | 수면시간 | 식사량 | 관찰노트 | 산책 시간 등 생활 기록을 확인할 수 있어요!',
        );
        resolve('');
      }, 100),
    );
    await new Promise((resolve) =>
      setTimeout(() => {
        addMessage('guide', '예) "바둑이 지난주 수요일에 얼마나 산책했어?"');
        resolve('');
      }, 700),
    );
  };

  const getInfo = async () => {
    setIsInfoBtnActive(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        addMessage('guide', '📌 반려견의 프로필 정보를 확인할 수 있어요!');
        resolve('');
      }, 100),
    );
    await new Promise((resolve) =>
      setTimeout(() => {
        addMessage('guide', '예) "바둑이랑 처음 만난 날이 언제였지?"');
        resolve('');
      }, 700),
    );
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
      className="scrollbar-hidden flex flex-col gap-6 overflow-y-scroll px-5 py-6 sm:max-h-119"
      ref={messagesRef}
    >
      <MessageItem msg={greetingMessage} />
      <li>
        <div className="flex gap-2 pl-9">
          <button
            type="button"
            className={`chatbot-btn ${isLogBtnActive && 'active'}`}
            onClick={() => !isLogBtnActive && getLogs()}
          >
            반려견 생활기록 확인
          </button>
          <button
            type="button"
            className={`chatbot-btn ${isInfoBtnActive && 'active'}`}
            onClick={() => !isInfoBtnActive && getInfo()}
          >
            반려견 정보 확인
          </button>
        </div>
      </li>
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
