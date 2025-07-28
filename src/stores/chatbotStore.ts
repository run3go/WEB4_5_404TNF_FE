import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ChatbotStore = {
  count: number;
  messages: ChatbotMessage[];
  addMessage: (sender: string, message: string) => void;
};
export const useChatbotStore = create<ChatbotStore>()(
  devtools(
    immer((set) => ({
      count: 2,
      messages: [
        {
          id: 1,
          message:
            '안녕하세요! 저는 챗봇 멍멍이에요 궁금한게 있다면 언제든지 물어보세요!',
          sender: 'chatbot',
        },
      ],
      addMessage: (sender, message) =>
        set((state) => {
          state.messages.push({ id: state.count++, message, sender });
        }),
    })),
  ),
);
