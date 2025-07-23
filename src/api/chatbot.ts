// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const askLLM = async () => {
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content:
              '사용자의 질문을 보고 어떤 동작을 해야하는지 판단해서 명령 객체로 반환해줘 예: {"action": "get_next_vaccine_date", "petName": "마음이"}',
          },
          {
            role: 'user',
            content: '마음이 저번 주 평균 수면시간을 알려줘',
          },
        ],
      }),
    },
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '챗봇이 응답을 가져오는데 실패하였습니다');
  }
  const data = await response.json();
  const content = data.choices[0].message.content
    .replace(/```json|```/g, '')
    .trim();
  const parsedCommand = JSON.parse(content);
  console.log(parsedCommand);
};
