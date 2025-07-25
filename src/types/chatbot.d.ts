type ActionObject = {
  keyword: string;
  petName?: string;
  date?: string;
  value?: string;
};

type ChatbotMessage = {
  sender: 'user' | 'chatbot';
  time: string;
  message: string;
};
