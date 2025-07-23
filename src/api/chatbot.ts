import { formatDate } from 'date-fns';
import { getPetProfiles, getVaccineData } from './pet';
import { getSchedules } from './schedule';

export const askLLM = async (question: string, userId: string) => {
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
            content: `넌 반려견의 정보를 기록하고 관리하는 서비스의 챗봇이야.
            유저가 입력한 정보들 중에 질문에 해당하는 특정 정보를 찾아서 보여주는게 네 역할이야. 
            사용자의 질문을 보고 핵심 키워드와 명령을 찾아서 액션 객체로 반환해줘. 
            그리고 정보 전달에 필요한 특정 수치가 있다면 네가 임의로 판단해서 객체에 넣어줘
            질문에 강아지 이름을 유추할 수 있다면 그걸 가져와서 petName 속성의 값으로 넣어줘.
            만약 핵심 키워드가 없다면 최대한 비슷한 단어를 연상해서 골라주고,
            아예 관련없는 질문이라 판단되면 예외로 처리해서 객체를 반환해줘
            핵심 키워드 : 
            - vaccine: 백신, 종합백신, 코로나, 인플루엔자, 광견병, 켄넬코프  
            - schedule: 언제, 일정, 할 일 
            - weight: 몸무게, 체중
            - sleep: 수면, 잠 
            - feed : 식사량, 먹이, 밥
            - note: 노트, 관찰
            - walking: 산책
            예: {"action": "get_next_vaccine_date", "keyword": 'vaccine', "petName": "마음이"}`,
          },
          {
            role: 'user',
            content: question,
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

  let petInfo: PetProfile | null;
  let res = {};

  if (parsedCommand.petName) {
    const petProfiles = await getPetProfiles(userId);
    petInfo =
      petProfiles.find((pet) => pet.name === parsedCommand.petName) ?? null;
  }

  if (parsedCommand.keyword === 'vaccine') {
    res = await getVaccineData(petInfo!.petId);
  }

  if (parsedCommand.keyword === 'schedule') {
    const today = new Date();
    res = await getSchedules(Number(userId), formatDate(today, 'yyyy-MM-dd'));
  }
  console.log(res);
};
