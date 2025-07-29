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
      count: 3,
      messages: [],
      addMessage: (sender, message) =>
        set((state) => {
          state.messages.push({ id: state.count++, message, sender });
        }),
    })),
  ),
);
