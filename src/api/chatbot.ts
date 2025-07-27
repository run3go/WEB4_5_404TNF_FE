import { formatDate } from 'date-fns';
import {
  getDashboardFeeding,
  getDashboardNote,
  getDashboardSleep,
  getDashboardWalking,
  getDashboardWeight,
} from './dashboard';
import { getPetProfiles, getVaccineData } from './pet';
import { getSchedules } from './schedule';
const today = formatDate(new Date(), 'yyyy-MM-dd');

export const askLLM = async (
  question: string,
  userId: string,
  recentPet?: string,
): Promise<ChatbotResponse> => {
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [
          {
            role: 'system',
            content: `넌 반려견의 정보를 기록하고 관리하는 서비스의 챗봇이야.
            유저가 입력한 정보들 중에 질문에 해당하는 특정 정보를 찾고 파싱해서 보여주는게 네 역할이야. 
            역할 :
            - 오직 JSON 객체만 출력해야해, 자연어 문장은 넣지 마
            - 반환되는 객체는 다음 네가지 속성만 가질 수 있어 date/keyword/petName/value 
            - 무조건 큰 따옴표를 사용해
            - 정보 전달에 필요한 특정 값이 있다면 네가 임의로 판단해서 value 속성의 값으로 넣어줘.
            - 질문에서 강아지 이름을 유추할 수 있다면 그걸 가져와서 petName 속성의 값으로 넣어줘.
              - 만약 일반적이지 않은 고유명사나 상황에 맞지 않은 단어가 끼어있다면 petName으로 추측해줘
              - 강아지 이름으로 예상되는 단어가 전혀 없다면 null값으로 보내줘
            - 특정 날짜가 있다면 그에 해당하는 값을 date 속성의 값으로 넣어줘. 오늘은 ${today}이야.
              - date는 반드시 "YYYY-MM-DD" 형식의 문자열로 써야 해
              - 절대 객체 형태로 넣지 마
            - 질문 내에 핵심 키워드 예시에 있는 단어를 찾아서 해당하는 keyword 속성의 값으로 넣어줘.
            - keyword 속성은 반드시 있어야돼
              - 핵심 키워드 : 
                - vaccine: 백신, 종합백신, 코로나, 인플루엔자, 광견병, 켄넬코프  
                - schedule: 언제, 일정, 할 일 
                - weight: 몸무게, 체중
                - sleep: 수면, 잠 
                - feed : 식사량, 먹이, 밥
                - note: 노트, 관찰
                - walking: 산책
                - 견종/나이/만난지 몇 일/성별/크기/중성화와 관련된 건 전부 keyword를 profile로 보내줘
              - 만약 핵심 키워드가 없다면 최대한 키워드에 연관된 단어를 연상해서 키워드를 도출해줘,
              - keyword의 값은 반드시 vaccine/schedule/weight/sleep/feed/note/walking/profile 중에 하나야
            - 아예 관련없는 질문이라 판단되면 예외로 처리해서 객체를 반환해줘
            - 빈 값은 무조건 문자열이 아닌 null값으로 보내줘
            - 문장에 어울리지 않는 특수문자 같은 게 있다면 무시해줘`,
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
  const jsonMatch = content.match(/\{[\s\S]*?\}/);

  if (!jsonMatch) {
    throw new Error('챗봇 응답에서 JSON 객체를 찾을 수 없습니다.');
  }

  const parsedCommand: ActionObject = JSON.parse(jsonMatch[0]);

  if (!parsedCommand.petName && recentPet) {
    parsedCommand.petName = recentPet;
  }
  console.log(parsedCommand);
  let res = {};
  const petProfiles = await getPetProfiles(userId);
  const petInfo =
    petProfiles.find((pet) => pet.name === parsedCommand.petName) ?? null;

  if (!petInfo) {
    throw new Error(`${parsedCommand.petName}은(는) 반려견 목록에 없어요`);
  }

  if (parsedCommand.keyword === 'vaccine' && parsedCommand.petName) {
    res = await getVaccineData(petInfo!.petId);
  }

  if (parsedCommand.keyword === 'schedule' && parsedCommand.date) {
    res = await getSchedules(parsedCommand.date);
  }

  if (parsedCommand.keyword === 'weight' && parsedCommand.petName) {
    res = await getDashboardWeight(petInfo!.petId);
  }

  if (parsedCommand.keyword === 'sleep' && parsedCommand.petName) {
    res = await getDashboardSleep(petInfo!.petId);
  }

  if (parsedCommand.keyword === 'feed' && parsedCommand.petName) {
    res = await getDashboardFeeding(petInfo!.petId);
  }

  if (parsedCommand.keyword === 'note' && parsedCommand.petName) {
    res = await getDashboardNote(petInfo!.petId);
  }

  if (parsedCommand.keyword === 'walking' && parsedCommand.petName) {
    res = await getDashboardWalking(petInfo!.petId);
  }

  if (
    (parsedCommand.keyword === 'profile' ||
      parsedCommand.keyword === 'age' ||
      parsedCommand.keyword === 'sex') &&
    parsedCommand.petName
  ) {
    res = petInfo;
  }

  if (res) {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-flash-1.5',
          messages: [
            {
              role: 'system',
              content: `넌 친절한 반려견 기록 관리 챗봇이야. 오늘은 ${today}이야
              질문과 함께 데이터가 너에게 들어올 텐데, 데이터로 전달된 JSON 객체를 읽고,
              질문에 해당하는 값을 찾아서 친절하게 사용자에게 알려줘
              만약 값이 60분 이상의 시간일 경우 사용자에게는 o시간 o분의 형태로 보여줘
              질문에 날짜와 관련된 내용이 있고, 데이터 객체에 date가 있다면 날짜는 date를 기준으로 답해줘`,
            },
            {
              role: 'user',
              content: `질문 : ${question}, 데이터 : ${JSON.stringify(res)} `,
            },
          ],
        }),
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || '답변을 불러오지 못했어요');
    }
    const data = await response.json();
    return {
      message: data.choices?.[0].message.content,
      pet: parsedCommand.petName,
    };
  }
  return { message: '질문을 이해하지 못 했어요' };
};
